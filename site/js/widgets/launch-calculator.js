// Launch calculator: constant acceleration along a track gives exit speed, time and energy.
import { launchRun, speedAt, CONCORDIA } from './core.mjs';
import { h, s, field, button, outputs, frame, fixed, bindState, widgetHeader } from './ui.mjs';

export const EXPLORE = { chapter: 'launch' };
// chart: x 0 to 20 km, y 0 to 1,100 m/s
const PX0 = 42;
const PX1 = 326;
const PY0 = 148;
const PY1 = 12;
const MAXD = 20000;
const MAXV = 1100;
const cx = (d) => PX0 + (d / MAXD) * (PX1 - PX0);
const cy = (v) => PY0 - (v / MAXV) * (PY0 - PY1);
function curve(accelG, lengthM) {
  const pts = [];
  const n = 48;
  for (let i = 0; i <= n; i++) { const d = (lengthM * i) / n; pts.push(`${i ? 'L' : 'M'}${cx(d).toFixed(1)} ${cy(speedAt(accelG, d)).toFixed(1)}`); }
  return pts.join(' ');
}

export function mount(el) {
  const accel = field({ label: 'Acceleration along the track', unit: 'g', min: 0.5, max: 3, step: 0.1, value: 1.5, digits: 1, onChange: update });
  const length = field({ label: 'Track length', unit: 'km', min: 1, max: 20, step: 0.5, value: 10, digits: 1, onChange: update });
  const st = bindState('launch-calculator', { a: accel, l: length }, () => update());
  const concordia = button('Concordia: 1.5 g, 10 km', () => { accel.set(1.5, true); length.set(10, true); update(); });

  const out = outputs([
    { key: 'time', label: 'Time on the track', big: true },
    { key: 'speed', label: 'Exit speed' },
    { key: 'energy', label: 'Energy per tonne' },
    { key: 'shuttle', label: 'A 165 t Concordia shuttle' },
  ]);

  const refPath = s('path', { class: 'w-curve w-curve--ref', d: curve(CONCORDIA.launchAccelG, CONCORDIA.launchLengthM) });
  const path = s('path', { class: 'w-curve' });
  const dot = s('circle', { class: 'w-dot', r: 5 });
  const dotText = s('text', { class: 'w-marktext' });
  const svg = s('svg', { class: 'w-svg', viewBox: '0 0 340 184', role: 'img', 'aria-label': 'Speed along the track' },
    [0, 500, 1000].map((v) => s('g', null, s('line', { class: 'w-rule', x1: PX0, y1: cy(v), x2: PX1, y2: cy(v) }), s('text', { class: 'w-axis', x: PX0 - 6, y: cy(v) + 3.5, 'text-anchor': 'end' }, v))),
    [0, 5, 10, 15, 20].map((k) => s('text', { class: 'w-axis', x: cx(k * 1000), y: 166, 'text-anchor': 'middle' }, k)),
    s('text', { class: 'w-axis', x: (PX0 + PX1) / 2, y: 181, 'text-anchor': 'middle' }, 'kilometres along the track'),
    s('text', { class: 'w-axis', x: PX0 - 6, y: 8, 'text-anchor': 'end' }, 'speed, m/s'),
    refPath, path, dot, dotText);

  frame(el, 'Launch calculator',
    widgetHeader({ explore: EXPLORE, state: st }),
    h('div', { class: 'w-grid' },
      h('div', { class: 'w-controls' }, accel.el, length.el,
        h('p', { class: 'w-ref-line' }, 'Concordia: 1.5 g over 10 km, 37 s, 540 m/s. ', concordia)),
      h('div', { class: 'w-results' }, out.el)),
    svg,
    h('p', { class: 'w-hint' }, 'Constant acceleration: time = √(2d / a), speed = √(2ad). The dashed curve is Concordia’s track. The launcher supplies part of the speed a ship needs; the rest comes from its own engines.'));

  function update() {
    const g = accel.value;
    const dM = length.value * 1000;
    const r = launchRun(g, dM);
    const mj = r.energyPerTonneJ / 1e6;
    out.update({
      time: `${fixed(r.timeS, 1)} s`,
      speed: `${fixed(r.exitSpeedMs, 0)} m/s (${fixed(r.exitSpeedMs * 3.6, 0)} km/h, Mach ${fixed(r.exitSpeedMs / 343, 1)})`,
      energy: `${fixed(mj, mj < 100 ? 1 : 0)} MJ (${fixed(mj / 3.6, 1)} kWh)`,
      shuttle: `${fixed((165 * r.energyPerTonneJ) / 1e9, 1)} GJ`,
    });
    path.setAttribute('d', curve(g, dM));
    const x = cx(dM);
    const y = cy(r.exitSpeedMs);
    dot.setAttribute('cx', x); dot.setAttribute('cy', y);
    dotText.setAttribute('x', x > 250 ? x - 8 : x + 8);
    dotText.setAttribute('text-anchor', x > 250 ? 'end' : 'start');
    dotText.setAttribute('y', y > 30 ? y - 8 : y + 16);
    dotText.textContent = `${fixed(r.exitSpeedMs, 0)} m/s`;
    svg.setAttribute('aria-label', `Speed along the track reaches ${fixed(r.exitSpeedMs, 0)} metres per second after ${fixed(r.timeS, 1)} seconds`);
    st.save();
  }
  update();
}
