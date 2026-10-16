# Concordia public site (content authoring reference)

Spec: `docs/specs/site-spec.md`. Canon and numbers: spec section 3 and `docs/site/facts.md`. House rules: present tense 2045, plain
language first, **no em dash anywhere** (the SEO gate fails the build on U+2014), no hedges.

## Commands

| Command | What it does |
| --- | --- |
| `npm run build` | `tsc -b`, `vite build`, then the site generator and the SEO gate. The full build. |
| `npm run site` | Generator only, into the existing `dist/` (`--allow-missing`: missing shot images become placeholder boxes). About 1 s. |
| `npm run site:serve` | `vite preview --port 5261 --strictPort` on `dist/`: home at `/`, the sim at `/explore/`. |
| `node scripts/site/seo-check.mjs [dist]` | Run the gate alone. |

The generator re-exports `site/data/sim-index.json` (viewpoints, chapters, overlays) from `src/` on every run; content validates against it.

## Layout

- `site/content/<path>.md` becomes `/<path>/`; `content/x/index.md` is the hub at `/x/` and gets an automatic card grid of its sibling pages.
- `site/shots/<section>.json` shot requests (spec section 6); images live in `public/site/shots/<id>-1600.webp` and `-800.webp`
  (`<id>-og.jpg` is used as the social image when the shot is the page `hero`).
- `site/diagrams/<name>.svg` inline diagrams; `site/js/widgets/<name>.js` widgets (export `mount(el)` and `EXPLORE`, the view "See it in the simulation" opens; state in the URL hash through `bindState` in `ui.mjs`). `site/js/predict.js` runs `{% predict %}`.
- `site/scenes.json` the scene atlas: `[{ "viewpoint": "id", "blurb": "...", "shot": "shot-id (optional)", "title": "optional" }]`, rendered on the
  page whose front matter has `type: scenes`, grouped by the sim's viewpoint groups.
- `site/llms-extra.md` appended to `llms.txt` and `llms-full.txt` (`{{origin}}` is replaced). `site/site.config.json`: origin is the only place the hostname lives.

## Front matter (YAML)

```yaml
---
title: Artificial gravity          # <title> is "<title> | Concordia" (suffix skipped if the title already says Concordia); total <= 60 chars
description: 150 to 200 characters # meta and social description; the gate enforces the length
lead: Plain-language lead, 2 to 4 sentences. Inline Markdown and {% term "x" %} allowed.
nav: science                       # header highlight: station | science | places | journey (defaults to the first path segment)
order: 1                           # sort order among siblings (hub grid, previous/next); default 999
hero: sky-breakthrough             # shot id: full-bleed hero image (and og image if public/site/shots/<id>-og.jpg exists)
updated: 2026-10-10                # default: date of the last git commit touching the file
related: [/science/counter-rotation/]   # "Related" list (paths with trailing slash)
h1: Optional different heading     # default: title
crumb: Optional breadcrumb name    # default: h1
blurb: Optional card text          # default: the lead, shortened
schema: TechArticle                # default; hubs and scenes are CollectionPage, /glossary/ is DefinedTermSet
type: scenes                       # only for the scene atlas page
titleSuffix: false                 # skip the " | Concordia" suffix
stub: true                         # marks placeholder pages (the build reports their count)
question: Why ...?                 # discovery pages only (with discover: true): the card title; see docs/content.md "Add a discovery"
hubGrid: discover                  # hub only: render the child pages as discovery cards (shot thumbnail + question)
---
```

The body never contains an H1 (the template renders it). Use `##` and `###`. A heading can carry an explicit anchor: `## Title {#anchor}`
(otherwise the id is the slugified text). The glossary page is `### Term` followed by one paragraph per term; `{% term "angular momentum" %}`
links to `/glossary/#angular-momentum`.

## Shortcodes

Written `{% name args %}`. Arguments are quoted strings (positional) or `key="value"`. Unknown names, unknown ids and missing end tags are build errors.

| Syntax | Result |
| --- | --- |
| `{% shot "id" %}` or `{% shot "id" "Caption" %}` | Figure from the shot registry (webp 800/1600, alt from the registry) with an "Open this view" link. Missing image: build error unless `--allow-missing`. |
| `{% shots "id-a" "Caption a" "id-b" "Caption b" %}` (a third pair of arguments adds a third figure) | A deliberate comparison: two (or three) figures side by side, stacked on narrow screens, each with its own caption and "Open this view" link. Use only where the comparison is the point. |
| `{% explore viewpoint="id" %}`, `chapter="key"`, `viewpoint="id" overlay="slug"`, `overlay="slug"`, optional `label="..."` | Inline pill "Open in the simulation: label". Label defaults to the viewpoint name, chapter title or overlay name. Links: `/explore/?viewpoint=id`, `/explore/?chapter=key`, overlay adds `&mode=engineer&overlay=slug`. |
| `{% deeper "Title" %} ...Markdown... {% enddeeper %}` | Collapsible "Go deeper: Title" block (equations, tables, exact values). |
| `{% facts %}` lines `value \| label` `{% endfacts %}` | Stat strip. One stat per line. |
| `{% eq %} g = w² × r {% endeq %}` | Display equation, monospace, plain Unicode math (no TeX). |
| `{% diagram "name" %}` or `{% diagram "name" "Caption" %}` | Inlines `site/diagrams/name.svg` (use `currentColor` and CSS vars; include `<title>` and `<desc>`). |
| `{% widget "name" %}` or `{% widget "name" "fallback text" %}` | Mount point for `site/js/widgets/name.js` with a no-JS fallback paragraph. |
| `{% term "word" %}` or `{% term "word" "link text" %}` | Inline link to `/glossary/#word`. |
| `{% sources %} - list items {% endsources %}` | "Sources and further reading" list. Items citing the engineering specification, the fact sheet or a design note are split into "Concordia design documents"; the rest are "Real-world sources". |
| `{% basis "design" %}` (tags `physics`, `design`, `challenge`, `fiction`) | Inline basis chip linking to `/about/#basis`. Also `basis="tag"` on `{% deeper %}` and `{% facts %}` (or a third `\| tag` field per fact row). Unknown tags fail the build. See docs/content.md "Basis chips". |
| `{% callout "In 2045" %} ...Markdown... {% endcallout %}` | Boxed aside (rare). Tag defaults to "In 2045". |
| `{% chapter "key" %} ...Markdown... {% endchapter %}` | Journey chapter card: number and title from the sim, your body, a "Start the story here" button. The anchor is `#key`. |
| `{% cards %}` lines `/path/ \| Title \| Blurb` `{% endcards %}` | Card grid. Title and blurb are optional for existing pages; add `compact` (`{% cards compact %}`) for small cards. | `{% cards discover %}` adds a fourth field (a shot id, default the page's `hero`) and shows the question (`question:` front matter) over a thumbnail; the home page and `/scenes/` use it. |
| `{% whatsnew %}` | The home page "New aboard" block: newest three entries of `site/data/whats-new.json` younger than 120 days; nothing when none qualify. | `{% whatsnew %}` |
| `{% predict "Question?" correct=2 %}` option lines, `---`, reveal `{% endpredict %}` | Predict-first block: no-JS list plus `<details>`; with JS radio buttons, Check, right/wrong, `sessionStorage`, a `predict` DOM event. Used on `/discover/*` and `/science/artificial-gravity/`. See `docs/content.md`. |

Add `<!-- facts: section N -->` near dense numeric passages so reviewers can trace numbers to `docs/site/facts.md`.

## Generated

`/updates/` (git log, grouped by day, model pills), `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`, breadcrumbs, previous/next within a
section, hub grids, JSON-LD (WebSite, TechArticle, CollectionPage, BreadcrumbList, DefinedTermSet). The home page (`content/index.md`) gets the hero loop
(`public/site/media/hero-loop.mp4/.webm` + `hero-poster.webp`, falling back to the `hero` shot, then a gradient; a three-shot loop rebuilt by `node scripts/site/build-hero-loop.mjs` from the raw launch-film frames, shots listed in `site/shots/hero-loop.json`), the guided-tour and free-exploration buttons (`tourMinutes` in `site.config.json`; `{{tourMinutes}}` in a page, and `{{stat:<key>}}` for the model counts of `scripts/site/model-stats.mjs`), the six-questions strip (`{% cards discover %}`) and a "New aboard" block (`{% whatsnew %}`, `site/data/whats-new.json`). The commit changelog lives only at `/updates/`.
Any shot with `public/site/media/<id>-loop.mp4` (and optional `.webm`) renders as a muted looping `<video>` over its still (the still stays as poster and reduced-motion fallback). Today only `st-district-skyline`: `node scripts/site/build-skyline-loop.mjs` renders it from `scripts/site/skyline-loop.shots.json` (render mode on the R9700) and encodes it.
Old sim links such as `/?viewpoint=x` redirect to `/explore/?viewpoint=x` from an inline script in the home page head.
