// Gravity at height: climb a Concordia rotor and watch weight fall to zero at the axis.
import { gravityAtHeight, radiusAtHeight, landmarkAt, LANDMARKS, CONCORDIA, G0 } from './core.mjs';
import { h, s, field, button, outputs, frame, fixed, bindState, widgetHeader } from './ui.mjs';

export const EXPLORE = { chapter: 'ascender' };
const TOP = 16;
const BOTTOM = 364;
const COLX = 150;
const COLW = 22;
const yOf = (hM) => BOTTOM - (hM / CONCORDIA.radiusM) * (BOTTOM - TOP);
const heightLabel = (l) => (l.from === l.to ? `${l.from.toLocaleString('en-US')} m` : `${l.from.toLocaleString('en-US')}-${l.to.toLocaleString('en-US')} m`);

export function mount(el) {
  const height = field({ label: 'Height above the ground', unit: 'm', min: 0, max: 2500, step: 5, value: 0, onChange: update });
  const st = bindState('gravity-at-height', { h: height }, () => update());
  const out = outputs([
    { key: 'g', label: 'Gravity', big: true },
    { key: 'acc', label: 'Acceleration' },
    { key: 'radius', label: 'Distance from the axis' },
    { key: 'weight', label: 'A 70 kg person weighs' },
    { key: 'where', label: 'You are' },
  ]);
  const where = h('p', { class: 'w-note', 'aria-live': 'polite' });

  const defs = s('defs', null,
    s('linearGradient', { id: 'w-gh-grad', x1: 0, y1: 1, x2: 0, y2: 0 },
      s('stop', { offset: '0%', class: 'w-stop-a' }), s('stop', { offset: '100%', class: 'w-stop-b' })));
  const column = s('rect', { x: COLX, y: TOP, width: COLW, height: BOTTOM - TOP, rx: 3, fill: 'url(#w-gh-grad)', class: 'w-col' });
  const ticks = LANDMARKS.map((l) => {
    const y = yOf((l.from + l.to) / 2);
    return s('g', { class: 'w-tick' },
      l.from !== l.to ? s('rect', { class: 'w-span', x: COLX - 5, y: yOf(l.to), width: COLW + 10, height: yOf(l.from) - yOf(l.to), rx: 2 }) : null,
      s('line', { x1: COLX - 8, y1: y, x2: COLX, y2: y }),
      s('text', { x: COLX - 12, y: y + 3.5, 'text-anchor': 'end' }, `${l.name} ${heightLabel(l)}`),
      s('text', { class: 'w-tick__g', x: COLX + COLW + 8, y: y + 3.5 }, `${fixed(gravityAtHeight((l.from + l.to) / 2), 2)} g`));
  });
  const mark = s('g', { class: 'w-marker' },
    s('line', { x1: COLX - 6, y1: 0, x2: 336, y2: 0 }), s('circle', { cx: COLX + COLW / 2, cy: 0, r: 5 }));
  const markText = s('text', { class: 'w-marktext', x: 336, y: -6, 'text-anchor': 'end' });
  mark.append(markText);
  const svg = s('svg', { class: 'w-svg w-svg--tall', viewBox: '0 0 340 380', role: 'img', 'aria-label': 'Gravity gauge' },
    defs, s('text', { class: 'w-axis', x: COLX + COLW / 2, y: 10, 'text-anchor': 'middle' }, 'axis, 0 g'), column, ticks, mark);

  const jumps = h('div', { class: 'w-btns', role: 'group', 'aria-label': 'Jump to a level' },
    LANDMARKS.map((l) => button(l.name, () => height.set(Math.round((l.from + l.to) / 2))))
  );

  frame(el, 'Gravity at height',
    widgetHeader({ explore: EXPLORE, state: st }),
    h('div', { class: 'w-grid' },
      h('div', { class: 'w-controls' }, height.el, jumps,
        h('p', { class: 'w-ref-line' }, 'Concordia: 1 g at the ground (2,500 m from the axis), 0.82 g under the sky, 0.60 g at the farms.'),
        out.el, where),
      h('div', { class: 'w-figure' }, svg)));

  function update() {
    const hM = height.value;
    const g = gravityAtHeight(hM);
    const r = radiusAtHeight(hM);
    const loc = landmarkAt(hM);
    let text;
    if (loc.kind === 'at') text = `At: ${loc.landmark.name}. ${loc.landmark.note}`;
    else if (loc.below && loc.above) text = `Between ${loc.below.name} (${heightLabel(loc.below)}) and ${loc.above.name} (${heightLabel(loc.above)}).`;
    else if (loc.above) text = `Below ${loc.above.name} (${heightLabel(loc.above)}).`;
    else text = hM >= 2500 ? 'On the spin axis: weightless.' : `Between ${loc.below.name} and the spin axis. Almost weightless.`;
    out.update({
      g: `${fixed(g, 3)} g`,
      acc: `${fixed(g * G0, 2)} m/s²`,
      radius: `${fixed(r, 0)} m`,
      weight: `${fixed(70 * g, 1)} kg-force (${fixed(70 * g * G0, 0)} N)`,
      where: loc.kind === 'at' ? loc.landmark.name : (loc.below && loc.above ? `${loc.below.name} to ${loc.above.name}` : hM >= 2500 ? 'On the axis' : 'Near the axis'),
    });
    where.textContent = text;
    const y = yOf(hM);
    mark.setAttribute('transform', `translate(0 ${y})`);
    markText.textContent = `${fixed(hM, 0)} m: ${fixed(g, 2)} g`;
    markText.setAttribute('y', hM > 2400 ? 16 : -6);
    svg.setAttribute('aria-label', `Gravity gauge: ${fixed(hM, 0)} m up is ${fixed(g, 2)} g`);
    st.save();
  }
  update();
}
