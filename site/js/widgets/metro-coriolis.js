// Metro Coriolis: your weight on the ring line depends on which way the train runs.
import { metroWeight, CONCORDIA } from './core.mjs';
import { h, s, field, segmented, button, outputs, frame, fixed, bindState, widgetHeader } from './ui.mjs';

export const EXPLORE = { chapter: 'metro' };
const MAXG = 1.6;
const X0 = 12;
const X1 = 328;
const xOf = (g) => X0 + (Math.min(g, MAXG) / MAXG) * (X1 - X0);
const NAMES = { spinward: 'spinward', antispinward: 'antispinward', axial: 'axial' };

export function mount(el) {
  const speed = field({ label: 'Train speed', unit: 'km/h', min: 0, max: 120, step: 1, value: 100, onChange: update });
  const dir = segmented({
    name: 'dir', label: 'Direction of travel', value: 'antispinward',
    options: [{ value: 'antispinward', label: 'Antispinward' }, { value: 'spinward', label: 'Spinward' }, { value: 'axial', label: 'Axial' }],
    onChange: update,
  });
  const preset = (v, d) => button(`${d === 'axial' ? 'Axial line' : d === 'spinward' ? 'Spinward ring' : 'Antispinward ring'}, ${v} km/h`, () => { speed.set(v, true); dir.set(d, true); update(); });

  const st = bindState('metro-coriolis', { v: speed, d: dir }, () => update());
  const out = outputs([
    { key: 'g', label: 'Apparent weight', big: true },
    { key: 'ms2', label: 'Floor push' },
    { key: 'cor', label: 'Coriolis, 2ωv' },
    { key: 'feel', label: 'A 70 kg rider feels like' },
  ]);

  const bar = s('rect', { class: 'w-bar', x: X0, y: 30, width: 10, height: 14, rx: 3 });
  const mark = s('line', { class: 'w-marker-line', x1: 0, y1: 24, x2: 0, y2: 50 });
  const markText = s('text', { class: 'w-marktext', x: 0, y: 18 });
  const svg = s('svg', { class: 'w-svg', viewBox: '0 0 340 84', role: 'img', 'aria-label': 'Apparent weight gauge' },
    s('rect', { class: 'w-track', x: X0, y: 30, width: X1 - X0, height: 14, rx: 3 }),
    bar,
    [0, 0.5, 1, 1.5].map((g) => s('g', null, s('line', { class: 'w-rule', x1: xOf(g), y1: 44, x2: xOf(g), y2: 50 }),
      s('text', { class: 'w-axis', x: Math.min(Math.max(xOf(g), 16), 324), y: 62, 'text-anchor': 'middle' }, `${g} g`))),
    s('line', { class: 'w-ref', x1: xOf(1), y1: 28, x2: xOf(1), y2: 46 }),
    s('text', { class: 'w-reftext', x: xOf(1), y: 78, 'text-anchor': 'middle' }, 'Earth 1 g'),
    mark, markText);

  frame(el, 'Metro Coriolis calculator',
    widgetHeader({ explore: EXPLORE, state: st }),
    h('div', { class: 'w-grid' },
      h('div', { class: 'w-controls' }, speed.el, dir.el,
        h('div', { class: 'w-btns' }, preset(100, 'antispinward'), preset(90, 'spinward'), preset(80, 'axial')),
        h('p', { class: 'w-ref-line' }, `Concordia: metro rail at radius ${CONCORDIA.metroRadiusM.toLocaleString('en-US')} m, standing weight 0.98 g. Spinward means the way the floor is turning.`)),
      h('div', { class: 'w-results' }, out.el)),
    svg,
    h('p', { class: 'w-hint' }, 'Weight = (ωr ± v)² / r. Riding against the spin slows you down in space, so you weigh less; riding with it speeds you up, so you weigh more. Along the axis nothing changes.'));

  function update() {
    const w = metroWeight(speed.value, dir.value);
    const d = NAMES[dir.value]; // used in the gauge label
    out.update({
      g: `${fixed(w.weightG, 2)} g`,
      ms2: `${fixed(w.weightMs2, 2)} m/s²`,
      cor: dir.value === 'axial' ? '0 (no Coriolis along the spin axis)' : `${fixed(w.coriolisMs2, 2)} m/s² (${fixed(w.coriolisG, 2)} g)`,
      feel: `${fixed(70 * w.weightG, 0)} kg`,
    });
    const x = xOf(w.weightG);
    bar.setAttribute('width', Math.max(2, x - X0));
    mark.setAttribute('x1', x); mark.setAttribute('x2', x);
    markText.setAttribute('x', x);
    markText.setAttribute('text-anchor', x > 290 ? 'end' : x < 40 ? 'start' : 'middle');
    markText.textContent = `${fixed(w.weightG, 2)} g`;
    svg.setAttribute('aria-label', `Apparent weight ${fixed(w.weightG, 2)} g on the metro, ${d} at ${fixed(speed.value, 0)} km/h`);
    st.save();
  }
  update();
}
