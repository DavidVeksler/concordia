#!/usr/bin/env node
// Content lint for the Concordia site source. Runs in the public repo's CI on every PR and in the private repo before an import.
// It is the cheap subset of `npm run site:check`: no sim build needed, one dependency (yaml). The full build still runs privately before deploy.
//   node scripts/public/lint.mjs
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const content = join(root, 'site', 'content');
const EM_DASH = String.fromCharCode(0x2014);
const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

const walk = (dir, pred, out = []) => {
  if (!existsSync(dir)) return out;
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p, pred, out); else if (pred(p)) out.push(p);
  }
  return out;
};
const readJson = (f) => JSON.parse(readFileSync(f, 'utf8'));
const config = readJson(join(root, 'site', 'site.config.json'));
const sim = readJson(join(root, 'site', 'data', 'sim-index.json'));
const viewpoints = new Set(sim.viewpoints.map((v) => v.id));
const chapters = new Set(sim.chapters.map((c) => c.key));
const overlays = new Set(sim.overlays.map((o) => o.slug));

const shots = new Set();
for (const f of walk(join(root, 'site', 'shots'), (p) => p.endsWith('.json') && !p.endsWith('hero-loop.json'))) {
  const rel = relative(root, f).replace(/\\/g, '/');
  let list;
  try { list = readJson(f); } catch (e) { err(rel, `invalid JSON: ${e.message}`); continue; }
  for (const s of list) {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s.id ?? '')) err(rel, `bad shot id "${s.id}" (kebab-case)`);
    if (shots.has(s.id)) err(rel, `duplicate shot id "${s.id}"`);
    shots.add(s.id);
    const words = String(s.alt ?? '').split(/\s+/).filter(Boolean).length;
    if (words < 8 || words > 25) warn(rel, `shot "${s.id}": alt text must be 8 to 25 words (has ${words})`);
    if (!s.static && !viewpoints.has(s.viewpoint) && !chapters.has(s.chapter)) err(rel, `shot "${s.id}": unknown viewpoint or chapter`);
  }
}

const pages = new Map();
for (const file of walk(content, (p) => p.endsWith('.md'))) {
  const sub = relative(content, file).replace(/\\/g, '/').replace(/\.md$/, '').split('/');
  const segs = sub.at(-1) === 'index' ? sub.slice(0, -1) : sub;
  pages.set(segs.length ? `/${segs.join('/')}/` : '/', file);
}
const generated = new Set(['/explore/', '/updates/', '/llms.txt', '/llms-full.txt', '/sitemap.xml', '/robots.txt', '/']);
const linkOk = (href) => {
  const path = href.split('#')[0].split('?')[0];
  if (!path || generated.has(path) || pages.has(path.endsWith('/') ? path : `${path}/`)) return true;
  return existsSync(join(root, 'public', path.slice(1)));
};

for (const [path, file] of pages) {
  const rel = relative(root, file).replace(/\\/g, '/');
  const raw = readFileSync(file, 'utf8').replace(/\r\n?/g, '\n');
  if (raw.includes(EM_DASH)) err(rel, 'contains an em dash (U+2014); use a colon, comma or full stop');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) { err(rel, 'missing front matter'); continue; }
  let fm;
  try { fm = YAML.parse(m[1]) ?? {}; } catch (e) { err(rel, `front matter is not valid YAML: ${e.message.split('\n')[0]}`); continue; }
  const body = raw.slice(m[0].length);
  if (!fm.title) err(rel, 'front matter needs a title');
  const desc = String(fm.description ?? '').replace(/\s+/g, ' ').trim();
  if (!desc) err(rel, 'front matter needs a description (150 to 200 characters)');
  else if (!desc.includes('{{') && (desc.length < 150 || desc.length > 200)) err(rel, `description is ${desc.length} characters; the range is 150 to 200`);
  if (fm.title && !/concordia/i.test(fm.title) && fm.titleSuffix !== false && `${fm.title}${config.titleSuffix}`.length > 60) err(rel, `title plus suffix is over 60 characters`);
  if (fm.hero && !shots.has(fm.hero)) err(rel, `hero shot "${fm.hero}" is not in site/shots/*.json`);
  for (const r of fm.related ?? []) if (!pages.has(r)) err(rel, `related page ${r} does not exist`);
  if (/^#\s/m.test(body.replace(/```[\s\S]*?```/g, ''))) err(rel, 'the body must not contain an H1 (the template renders it)');
  for (const sc of body.matchAll(/\{%\s*shot\s+"([^"]+)"/g)) if (!shots.has(sc[1])) err(rel, `{% shot "${sc[1]}" %}: no such shot`);
  for (const sc of body.matchAll(/\{%\s*shots\s+([^%]*)%\}/g)) {
    const strs = [...sc[1].matchAll(/"([^"]*)"/g)].map((x) => x[1]);
    for (let i = 0; i < strs.length; i += 2) if (!shots.has(strs[i])) err(rel, `{% shots %}: no such shot "${strs[i]}"`);
  }
  for (const sc of body.matchAll(/\{%\s*explore\s+([^%]*)%\}/g)) {
    const v = sc[1].match(/viewpoint="([^"]+)"/)?.[1], c = sc[1].match(/chapter="([^"]+)"/)?.[1], o = sc[1].match(/overlay="([^"]+)"/)?.[1];
    if (v && !viewpoints.has(v)) err(rel, `{% explore %}: unknown viewpoint "${v}"`);
    if (c && !chapters.has(c)) err(rel, `{% explore %}: unknown chapter "${c}"`);
    if (o && !overlays.has(o)) err(rel, `{% explore %}: unknown overlay "${o}"`);
  }
  for (const l of body.matchAll(/\]\((\/[^)\s]*)\)/g)) if (!linkOk(l[1])) err(rel, `link ${l[1]} does not resolve to a page or file`);
}

for (const f of ['scenes.json', 'llms-extra.md']) {
  const p = join(root, 'site', f);
  if (existsSync(p) && readFileSync(p, 'utf8').includes(EM_DASH)) err(`site/${f}`, 'contains an em dash');
}

if (warnings.length) console.warn(['content lint warnings:', ...warnings].join('\n  '));
if (errors.length) {
  console.error(`content lint: ${errors.length} problem(s)\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(`content lint: ${pages.size} pages, ${shots.size} shots, clean`);
