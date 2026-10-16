// Breach calculator: how fast does a rotor lose air through a hole in the hull. Choked flow of air into vacuum (core.mjs breachRate).
import { breachRate, chokedFlux, ROTOR_AIR_KG } from './core.mjs';
import { h, s, field, button, outputs, frame, fixed, sig, bindState, widgetHeader } from './ui.mjs';

export const EXPLORE = { overlay: 'pressure' };

// Log time bar from 100 s to 10^11 s (about 3,200 years).
const LO = 2;
const HI = 11;
const X0 = 12;
const X1 = 328;
const xOf = (sec) => X0 + ((Math.log10(Math.min(Math.max(sec, 10 ** LO), 10 ** HI)) - LO) / (HI - LO)) * (X1 - X0);
const MARKS = [[3600, '1 hour'], [86400, '1 day'], [3.15576e7, '1 year'], [3.15576e9, '100 years']];

const YEAR = 3.15576e7;
export function duration(sec) {
  if (sec < 120) return `${fixed(sec, 0)} seconds`;
  if (sec < 7200) return `${fixed(sec / 60, 0)} minutes`;
  if (sec < 172800) return `${fixed(sec / 3600, 1)} hours`;
  if (sec < 60 * 86400) return `${fixed(sec / 86400, 1)} days`;
  if (sec < 2 * YEAR) return `${fixed(sec / (YEAR / 12), 1)} months`;
  return `${sig(sec / YEAR, 3)} years`;
}
const areaText = (m2) => (m2 < 0.01 ? `${sig(m2 * 1e4, 3)} cm²` : `${sig(m2, 3)} m²`);

export function mount(el) {
  const area = field({
    label: 'Hole area', unit: 'm²', min: 0.0001, max: 1000, value: 1, log: true,
    hint: '1 cm² is 0.0001 m². A doorway is about 2 m². The slider runs from 1 cm² to 1,000 m².', onChange: update,
  });
  const cd = field({ label: 'Discharge coefficient', unit: '', min: 0.6, max: 1, step: 0.01, value: 0.8, digits: 2, hint: 'How cleanly the air leaves: 1 for a perfect nozzle, about 0.6 for a ragged edge.', onChange: update });
  const st = bindState('breach-calculator', { a: area, c: cd }, () => update());
  const preset = (label, m2) => button(label, () => { area.set(m2, true); update(); });
  const concordia = button('Concordia: 1 m², Cd 0.8', () => { area.set(1, true); cd.set(0.8, true); update(); });

  const out = outputs([
    { key: 'one', label: 'Time to lose 1 percent of the air', big: true },
    { key: 'ten', label: 'Time to lose 10 percent' },
    { key: 'tau', label: 'Time constant, pressure falls by 1/e' },
    { key: 'flow', label: 'Air leaving at first' },
    { key: 'day', label: 'Hole that costs 1 percent a day' },
  ]);

  const bar = s('rect', { class: 'w-bar', x: X0, y: 38, width: 10, height: 14, rx: 3 });
  const line = s('line', { class: 'w-marker-line', x1: 0, y1: 30, x2: 0, y2: 58 });
  const text = s('text', { class: 'w-marktext', x: 0, y: 24 });
  const svg = s('svg', { class: 'w-svg', viewBox: '0 0 340 96', role: 'img', 'aria-label': 'Time to lose 1 percent of the air on a logarithmic scale' },
    s('rect', { class: 'w-track', x: X0, y: 38, width: X1 - X0, height: 14, rx: 3 }),
    bar,
    MARKS.map(([sec, name]) => s('g', null,
      s('line', { class: 'w-rule', x1: xOf(sec), y1: 52, x2: xOf(sec), y2: 58 }),
      s('text', { class: 'w-axis', x: Math.min(Math.max(xOf(sec), 22), 318), y: 70, 'text-anchor': 'middle' }, name))),
    s('text', { class: 'w-axis', x: (X0 + X1) / 2, y: 90, 'text-anchor': 'middle' }, 'time to lose 1 percent of the air, log scale'),
    line, text);

  frame(el, 'Breach calculator',
    widgetHeader({ explore: EXPLORE, state: st }),
    h('div', { class: 'w-grid' },
      h('div', { class: 'w-controls' }, area.el, cd.el,
        h('div', { class: 'w-btns', role: 'group', 'aria-label': 'Hole sizes' }, preset('1 cm² bolt hole', 0.0001), preset('1 m²', 1), preset('100 m²', 100)),
        h('p', { class: 'w-ref-line' }, 'Concordia: 45 Mt of air per rotor at 101 kPa and 293 K, the whole rotor draining. ', concordia)),
      h('div', { class: 'w-results' }, out.el)),
    svg,
    h('p', { class: 'w-hint' }, `Choked flow into vacuum: ${fixed(chokedFlux(), 0)} kg/s per m² at Cd 1, so the air mass falls as exp(−t / τ) with τ = ${fixed(ROTOR_AIR_KG / 1e9, 0)} Mt divided by the flow. District barriers close first, so a real loss stops at one district. The calculator leaves out local wind and cold at the hole, a hole that grows, and which compartment it opens into.`));

  function update() {
    const r = breachRate({ holeM2: area.value, cd: cd.value });
    out.update({
      one: duration(r.t1S),
      ten: duration(r.t10S),
      tau: duration(r.tauS),
      flow: r.flowKgS >= 1e3 ? `${sig(r.flowKgS / 1e3, 3)} t/s` : `${sig(r.flowKgS, 3)} kg/s`,
      day: r.oneDayM2 >= 0.01 ? `${sig(r.oneDayM2, 3)} m² at this coefficient` : `${sig(r.oneDayM2 * 1e4, 3)} cm²`,
    });
    const x = xOf(r.t1S);
    bar.setAttribute('width', Math.max(2, x - X0));
    line.setAttribute('x1', x); line.setAttribute('x2', x);
    text.setAttribute('x', x);
    text.setAttribute('text-anchor', x > 240 ? 'end' : x < 60 ? 'start' : 'middle');
    text.textContent = duration(r.t1S);
    svg.setAttribute('aria-label', `A ${areaText(area.value)} hole at Cd ${fixed(cd.value, 2)} takes ${duration(r.t1S)} to lose 1 percent of a rotor's air`);
    st.save();
  }
  update();
}
