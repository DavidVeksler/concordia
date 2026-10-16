// Radiator calculator: how much radiating surface does it take to throw away a given amount of heat in vacuum.
import { radiatorArea, CONCORDIA, PITCH_M2 } from './core.mjs';
import { h, s, field, segmented, button, outputs, frame, fixed, sig, bindState, widgetHeader } from './ui.mjs';

export const EXPLORE = { overlay: 'thermal' };
// Log scale bar from 10 m2 to 1,000 km2 (1e9 m2).
const LO = 1;
const HI = 9;
const X0 = 12;
const X1 = 328;
const xOf = (m2) => X0 + ((Math.log10(Math.max(m2, 10 ** LO)) - LO) / (HI - LO)) * (X1 - X0);
const areaText = (m2) => (m2 >= 1e6 ? `${sig(m2 / 1e6, 3)} km²` : `${sig(m2, 3)} m²`);

export function mount(el) {
  const power = field({ label: 'Heat to reject', unit: 'MW', min: 1, max: 40000, value: 40000, log: true, hint: '1,000 MW is 1 GW. Concordia’s 40 GW is the top of the slider.', onChange: update });
  const temp = field({ label: 'Radiator temperature', unit: 'K', min: 300, max: 700, step: 5, value: 450, onChange: update });
  const emis = field({ label: 'Emissivity', unit: '', min: 0.5, max: 1, step: 0.01, value: 0.9, digits: 2, onChange: update });
  const sides = segmented({ name: 'sides', label: 'Radiating faces', value: '1', options: [{ value: '1', label: 'One side' }, { value: '2', label: 'Both sides' }], onChange: update });
  const st = bindState('radiator-calculator', { p: power, t: temp, e: emis, s: sides }, () => update());
  const concordia = button('Concordia: 40 GW at 450 K', () => { power.set(40000, true); temp.set(450, true); emis.set(0.9, true); sides.set('1', true); update(); });

  const out = outputs([
    { key: 'area', label: 'Radiator area needed', big: true },
    { key: 'flux', label: 'Heat shed per m²' },
    { key: 'pitch', label: 'Football pitches (105 × 68 m)' },
    { key: 'conc', label: 'Concordia’s radiator panels' },
    { key: 'side', label: 'As one square' },
  ]);

  const bar = s('rect', { class: 'w-bar', x: X0, y: 38, width: 10, height: 14, rx: 3 });
  const resLine = s('line', { class: 'w-marker-line', x1: 0, y1: 30, x2: 0, y2: 58 });
  const resText = s('text', { class: 'w-marktext', x: 0, y: 24 });
  const decades = [1, 3, 5, 7, 9].map((e) => [e, e === 1 ? '10 m²' : e === 3 ? '1,000 m²' : e === 5 ? '0.1 km²' : e === 7 ? '10 km²' : '1,000 km²']);
  const svg = s('svg', { class: 'w-svg', viewBox: '0 0 340 112', role: 'img', 'aria-label': 'Radiator area on a logarithmic scale' },
    s('rect', { class: 'w-track', x: X0, y: 38, width: X1 - X0, height: 14, rx: 3 }),
    bar,
    decades.map(([e, t]) => s('g', null, s('line', { class: 'w-rule', x1: xOf(10 ** e), y1: 52, x2: xOf(10 ** e), y2: 58 }),
      s('text', { class: 'w-axis', x: Math.min(Math.max(xOf(10 ** e), 24), 316), y: 70, 'text-anchor': 'middle' }, t))),
    s('line', { class: 'w-ref', x1: xOf(PITCH_M2), y1: 36, x2: xOf(PITCH_M2), y2: 82 }),
    s('text', { class: 'w-reftext', x: xOf(PITCH_M2), y: 94, 'text-anchor': 'middle' }, 'a pitch'),
    s('line', { class: 'w-ref', x1: xOf(CONCORDIA.radiatorPanelsM2), y1: 36, x2: xOf(CONCORDIA.radiatorPanelsM2), y2: 82 }),
    s('text', { class: 'w-reftext', x: xOf(CONCORDIA.radiatorPanelsM2), y: 94, 'text-anchor': 'middle' }, 'Concordia 19.8 km²'),
    resLine, resText);

  frame(el, 'Radiator calculator',
    widgetHeader({ explore: EXPLORE, state: st }),
    h('div', { class: 'w-grid' },
      h('div', { class: 'w-controls' }, power.el, temp.el, emis.el, sides.el,
        h('p', { class: 'w-ref-line' }, 'Concordia: about 19 km² at 450 K for 40 GW, one side. ', concordia)),
      h('div', { class: 'w-results' }, out.el)),
    svg,
    h('p', { class: 'w-hint' }, 'Stefan-Boltzmann: power = emissivity × 5.670 × 10⁻⁸ W/m²/K⁴ × area × T⁴, doubled for two faces. Sunlight falling on the panels is ignored. The bar is a log scale.'));

  function update() {
    const r = radiatorArea({ powerW: power.value * 1e6, tempK: temp.value, emissivity: emis.value, sides: Number(sides.value) });
    const pct = r.vsConcordia * 100;
    out.update({
      area: `${fixed(r.areaM2, 0)} m² (${r.areaKm2 >= 0.1 ? fixed(r.areaKm2, 2) : fixed(r.areaKm2, 4)} km²)`,
      flux: `${fixed(r.fluxWm2 / 1000, 2)} kW/m²`,
      pitch: `${r.pitches >= 100 ? fixed(r.pitches, 0) : fixed(r.pitches, 1)} pitches`,
      conc: pct >= 1000 ? `${fixed(r.vsConcordia, 1)} × the 19.8 km² modelled` : `${fixed(pct, pct < 10 ? 1 : 0)} percent of the 19.8 km² modelled`,
      side: r.sideM >= 1000 ? `${fixed(r.sideM / 1000, 2)} km on a side` : `${fixed(r.sideM, 0)} m on a side`,
    });
    const x = xOf(r.areaM2);
    bar.setAttribute('width', Math.max(2, x - X0));
    resLine.setAttribute('x1', x); resLine.setAttribute('x2', x);
    resText.setAttribute('x', x);
    resText.setAttribute('text-anchor', x > 240 ? 'end' : x < 60 ? 'start' : 'middle');
    resText.textContent = areaText(r.areaM2);
    svg.setAttribute('aria-label', `Radiator area ${areaText(r.areaM2)} on a logarithmic scale; a pitch is 7,140 m² and Concordia’s panels 19.8 km²`);
    st.save();
  }
  update();
}
