// Tiny DOM helpers shared by the Concordia site widgets. Plain DOM, no libraries.

let uid = 0;
export const nextId = (p) => `${p}-${++uid}`;
const SVG_NS = 'http://www.w3.org/2000/svg';
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

function build(node, attrs, kids) {
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === false || v == null) continue;
    if (k === 'text') node.textContent = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v === true ? '' : String(v));
  }
  for (const kid of kids.flat()) {
    if (kid == null || kid === false) continue;
    node.append(kid instanceof Node ? kid : document.createTextNode(String(kid)));
  }
  return node;
}
export const h = (tag, attrs, ...kids) => build(document.createElement(tag), attrs, kids);
export const s = (tag, attrs, ...kids) => build(document.createElementNS(SVG_NS, tag), attrs, kids);

// ---- number formatting (en-US, thousands separators)
export const fixed = (n, d = 2) => Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
export const sig = (n, d = 3) => Number(n).toLocaleString('en-US', { maximumSignificantDigits: d });
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻' };
export function sci(n, d = 2) {
  if (n === 0) return '0';
  const e = Math.floor(Math.log10(Math.abs(n)));
  const m = n / 10 ** e;
  return `${m.toFixed(d - 1)} × 10${String(e).split('').map((c) => SUP[c]).join('')}`;
}
// Same as sci() but as DOM parts with a real <sup>, so it renders in any font.
export function sciParts(n, d = 2) {
  if (n === 0) return ['0'];
  const e = Math.floor(Math.log10(Math.abs(n)));
  return [`${(n / 10 ** e).toFixed(d - 1)} × 10`, h('sup', null, String(e))];
}
export function force(n) {
  const a = Math.abs(n);
  if (a >= 1e6) return `${sig(n / 1e6, 3)} MN`;
  if (a >= 1e3) return `${sig(n / 1e3, 3)} kN`;
  return `${sig(n, 3)} N`;
}

// ---- inputs
// Range + number input kept in sync. log:true maps the slider logarithmically between min and max.
export function field({ label, unit, min, max, step = 1, value, log = false, digits, hint, onChange }) {
  const id = nextId('w');
  const pos = (v) => (log ? (Math.log(v / min) / Math.log(max / min)) * 1000 : v);
  const unpos = (p) => (log ? min * Math.pow(max / min, p / 1000) : p);
  const round = (v) => {
    if (log) return Number(v.toPrecision(3));
    const q = 1 / step;
    return Math.round(v * q) / q;
  };
  const shown = (v) => (digits != null ? v.toFixed(digits) : String(v));
  let current = value;
  const range = h('input', { type: 'range', id, min: log ? 0 : min, max: log ? 1000 : max, step: log ? 1 : step, value: pos(value) });
  const num = h('input', { type: 'number', min, max, step: 'any', value: shown(value), inputmode: 'decimal', 'aria-label': `${label}, exact value in ${unit}` });
  const vt = () => range.setAttribute('aria-valuetext', `${shown(current)} ${unit}`);
  vt();
  range.addEventListener('input', () => {
    current = clamp(round(unpos(Number(range.value))), min, max);
    num.value = shown(current); vt();
    if (onChange) onChange(current);
  });
  num.addEventListener('input', () => {
    const v = Number(num.value);
    if (num.value === '' || !Number.isFinite(v) || v < min || v > max) return;
    current = v; range.value = pos(v); vt();
    if (onChange) onChange(current);
  });
  num.addEventListener('change', () => {
    const v = Number(num.value);
    current = Number.isFinite(v) ? clamp(v, min, max) : current;
    num.value = shown(current); range.value = pos(current); vt();
    if (onChange) onChange(current);
  });
  const el = h('div', { class: 'w-field' },
    h('label', { for: id }, label),
    h('div', { class: 'w-row' }, range, num, h('span', { class: 'w-unit' }, unit)),
    hint ? h('p', { class: 'w-hint' }, hint) : null);
  return {
    el,
    min,
    max,
    get value() { return current; },
    set(v, silent) {
      current = clamp(v, min, max); num.value = shown(current); range.value = pos(current); vt();
      if (!silent && onChange) onChange(current);
    },
  };
}

// Radio group styled as a segmented control. Keyboard: Tab to the group, arrows to change (native radios).
export function segmented({ name, label, options, value, onChange }) {
  const group = nextId('seg');
  let current = value;
  const inputs = options.map((o) => {
    const input = h('input', { type: 'radio', name: `${name}-${group}`, value: o.value, checked: o.value === value });
    input.addEventListener('change', () => { if (input.checked) { current = o.value; if (onChange) onChange(current); } });
    return { o, input, label: h('label', { class: 'w-seg__opt' }, input, h('span', null, o.label)) };
  });
  const el = h('fieldset', { class: 'w-seg' }, h('legend', null, label), h('div', { class: 'w-seg__row' }, inputs.map((i) => i.label)));
  return {
    el,
    values: options.map((o) => String(o.value)),
    get value() { return current; },
    set(v, silent) {
      current = v;
      inputs.forEach((i) => { i.input.checked = i.o.value === v; });
      if (!silent && onChange) onChange(current);
    },
  };
}

export function checkbox({ label, checked, onChange }) {
  const id = nextId('chk');
  const input = h('input', { type: 'checkbox', id, checked });
  input.addEventListener('change', () => { if (onChange) onChange(input.checked); });
  return {
    el: h('div', { class: 'w-check' }, input, h('label', { for: id }, label)),
    get value() { return input.checked; },
    set(v, silent) { input.checked = v; if (!silent && onChange) onChange(v); },
  };
}

export function button(label, onClick, cls = '') {
  return h('button', { type: 'button', class: `w-btn ${cls}`.trim(), onclick: onClick }, label);
}

// Definition list in an aria-live region. rows: [{ key, label, big? }]. update({ key: 'text' }).
export function outputs(rows) {
  const dl = h('dl', { class: 'w-out', 'aria-live': 'polite', 'aria-atomic': 'false' });
  const dd = {};
  for (const r of rows) {
    dd[r.key] = h('dd', { class: r.big ? 'w-out__big' : '' });
    dl.append(h('div', { class: 'w-out__row' }, h('dt', null, r.label), dd[r.key]));
  }
  return { el: dl, update(map) { for (const [k, v] of Object.entries(map)) if (dd[k]) { if (Array.isArray(v)) dd[k].replaceChildren(...v); else dd[k].textContent = v; } } };
}

// Standard widget frame: group role, label, then children.
export function frame(el, name, ...kids) {
  el.setAttribute('role', 'group');
  el.setAttribute('aria-label', name);
  el.classList.add('widget--live');
  el.replaceChildren(...kids);
}

// ---- state in the URL hash (discovery-engagement-spec section 5.1)
// Hash form: #spin-calculator.r=1000&spin-calculator.g=1 (several widgets per page coexist; each owns the keys with its own prefix).
// fields: { key: control } where a control has `value` and `set(v, silent)`. Numbers are checked against the control's min/max, strings
// against its `values`, booleans are 1 or 0. Invalid or out-of-range hash values are ignored. Writes use history.replaceState, debounced 300 ms,
// and only happen once the state differs from the page's defaults (or the hash already holds this widget's keys), so merely viewing a page
// leaves its address alone. bindState restores immediately: create it after the controls and before the first update.
const parseHash = () => {
  const out = new Map();
  const raw = (location.hash || '').replace(/^#/, '');
  if (!raw.includes('=')) return out;
  for (const part of raw.split('&')) {
    const i = part.indexOf('=');
    if (i < 1) continue;
    try { out.set(decodeURIComponent(part.slice(0, i)), decodeURIComponent(part.slice(i + 1))); } catch { /* malformed escape: skip */ }
  }
  return out;
};
const encodeValue = (v) => (typeof v === 'boolean' ? (v ? '1' : '0') : typeof v === 'number' ? String(Number(v.toPrecision(6))) : String(v));
function readValue(ctl, text) {
  const kind = typeof ctl.value;
  if (kind === 'boolean') return text === '1' ? true : text === '0' ? false : undefined;
  if (kind === 'number') {
    if (text.trim() === '') return undefined;
    const n = Number(text);
    if (!Number.isFinite(n)) return undefined;
    if ((ctl.min != null && n < ctl.min) || (ctl.max != null && n > ctl.max)) return undefined;
    return n;
  }
  if (ctl.values) return ctl.values.includes(text) ? text : undefined;
  return undefined;
}

export function bindState(name, fields, onApply) {
  const keys = Object.keys(fields);
  const defaults = Object.fromEntries(keys.map((k) => [k, encodeValue(fields[k].value)]));
  const own = (k) => `${name}.${k}`;
  let timer = 0;

  function restore() {
    const hash = parseHash();
    let applied = 0;
    for (const k of keys) {
      if (!hash.has(own(k))) continue;
      const v = readValue(fields[k], hash.get(own(k)));
      if (v === undefined) continue;
      fields[k].set(v, true);
      applied++;
    }
    return applied;
  }
  const pairs = () => keys.map((k) => [own(k), encodeValue(fields[k].value)]);
  const hasOwn = () => { const hash = parseHash(); return keys.some((k) => hash.has(own(k))); };
  function write() {
    timer = 0;
    const hash = parseHash();
    for (const k of keys) hash.delete(own(k));
    const changed = keys.some((k) => encodeValue(fields[k].value) !== defaults[k]);
    if (changed) for (const [key, value] of pairs()) hash.set(key, value);
    const text = [...hash].map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
    try { history.replaceState(history.state, '', location.pathname + location.search + (text ? `#${text}` : '')); } catch { /* sandboxed frame: the link button still works */ }
  }
  const state = {
    restored: restore(),
    /** Call after every change. Debounced; a no-op while the state is the page default and the hash holds nothing of ours. */
    save() {
      if (!hasOwn() && keys.every((k) => encodeValue(fields[k].value) === defaults[k])) return;
      clearTimeout(timer);
      timer = setTimeout(write, 300);
    },
    /** Absolute URL for this widget's current state. */
    href() { return location.origin + location.pathname + location.search + '#' + pairs().map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&'); },
  };
  if (onApply) window.addEventListener('hashchange', () => { if (restore()) onApply(); });
  return state;
}

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch { /* not allowed here: fall through */ }
  try {
    const box = h('textarea', { 'aria-hidden': 'true', tabindex: '-1', style: 'position:fixed;left:-9999px;top:0' });
    box.value = text;
    document.body.append(box);
    box.select();
    const ok = document.execCommand('copy');
    box.remove();
    return ok;
  } catch { return false; }
}

// Header strip every widget carries (discovery-engagement-spec section 5.2): says it is a calculator, links to the matching view in the
// simulation when there is one, and copies a link to the current result. `explore` is the widget's own mapping, e.g. { overlay: 'gravity' }.
export function exploreUrl({ viewpoint, chapter, overlay } = {}) {
  const q = [];
  if (viewpoint) q.push(`viewpoint=${encodeURIComponent(viewpoint)}`);
  if (chapter) q.push(`chapter=${encodeURIComponent(chapter)}`);
  if (overlay) q.push('mode=engineer', `overlay=${encodeURIComponent(overlay)}`);
  return '/explore/' + (q.length ? '?' + q.join('&') : '');
}
export function widgetHeader({ explore, state } = {}) {
  const links = h('div', { class: 'w-meta__links' });
  if (explore) links.append(h('a', { href: exploreUrl(explore) }, 'See it in the simulation'));
  if (state) {
    const toast = h('span', { class: 'w-toast', role: 'status' });
    let gone = 0;
    const copy = h('button', { type: 'button', class: 'w-copy' }, 'Copy link to this result');
    copy.addEventListener('click', async () => {
      const ok = await copyText(state.href());
      toast.textContent = ok ? 'Link copied' : 'Copy failed: use the address bar';
      clearTimeout(gone);
      gone = setTimeout(() => { toast.textContent = ''; }, 2600);
    });
    links.append(copy, toast);
  }
  return h('div', { class: 'w-meta' }, h('p', { class: 'w-meta__text' }, 'Calculator. It does not change the simulation.'), links);
}
