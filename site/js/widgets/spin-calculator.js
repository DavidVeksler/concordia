// Spin calculator: radius and target gravity in, spin rate and what it feels like out.
import { spinDesign, comfortBand } from './core.mjs';
import { h, s, field, button, outputs, frame, fixed, sig, bindState, widgetHeader } from './ui.mjs';

const MAX_RPM = 12;
const BARX = 10;
const BARW = 320;
const xOf = (rpm) => BARX + (Math.min(rpm, MAX_RPM) / MAX_RPM) * BARW;
export const EXPLORE = { overlay: 'gravity' };
const SOURCE = 'https://nss.org/wp-content/uploads/2018/01/NSS-JOURNAL-Space-Settlement-Population-Rotation-Tolerance.pdf';

export function mount(el) {
  const radius = field({ label: 'Radius of the habitat floor', unit: 'm', min: 10, max: 10000, value: 2500, log: true, onChange: update });
  const gees = field({ label: 'Gravity you want at the floor', unit: 'g', min: 0.1, max: 1.5, step: 0.01, value: 1, digits: 2, onChange: update });
  const st = bindState('spin-calculator', { r: radius, g: gees }, () => update());
  const out = outputs([
    { key: 'rpm', label: 'Spin rate', big: true },
    { key: 'period', label: 'One turn takes' },
    { key: 'rim', label: 'Floor speed' },
    { key: 'grad', label: 'Head to foot (1.8 m)' },
    { key: 'cor', label: 'Coriolis, walking 1.4 m/s' },
  ]);

  // rpm bar with the comfort bands
  const bandLabels = [[0, 2, 'up to 2'], [2, 4, '2 to 4'], [4, 6, '4 to 6'], [6, MAX_RPM, '6+']];
  const marker = s('g', { class: 'w-marker' }, s('path', { d: 'M0 6 L-6 -4 L6 -4 Z' }), s('line', { x1: 0, y1: 6, x2: 0, y2: 22 }));
  const svg = s('svg', { class: 'w-svg', viewBox: '0 0 340 92', role: 'img', 'aria-label': 'Spin rate against comfort bands' },
    bandLabels.map(([a, b, t], i) => s('g', null,
      s('rect', { class: `w-band w-band--${i + 1}`, x: xOf(a), y: 24, width: xOf(b) - xOf(a), height: 20 }),
      s('text', { x: (xOf(a) + xOf(b)) / 2, y: 60, 'text-anchor': 'middle' }, t === '6+' ? '6+' : t)),
    ),
    s('line', { class: 'w-ref', x1: xOf(0.598), y1: 20, x2: xOf(0.598), y2: 48 }),
    s('text', { class: 'w-reftext', x: xOf(0.598) - 2, y: 82, 'text-anchor': 'start' }, 'Concordia 0.6'),
    marker);
  const note = h('p', { class: 'w-note', 'aria-live': 'polite' });
  const concordia = button('Set to Concordia', () => { radius.set(2500, true); gees.set(1, true); update(); });

  frame(el, 'Spin calculator',
    widgetHeader({ explore: EXPLORE, state: st }),
    h('div', { class: 'w-grid' },
      h('div', { class: 'w-controls' }, radius.el, gees.el,
        h('p', { class: 'w-ref-line' }, 'Concordia: 2,500 m, 0.598 rpm, 1 g. ', concordia)),
      h('div', { class: 'w-results' }, out.el)),
    svg, note,
    h('p', { class: 'w-hint' }, 'Comfort bands follow ', h('a', { href: SOURCE }, 'Globus and Hall, 2017'), '. The Coriolis force is the sideways push you feel when you move; the gradient is how much heavier your feet are than your head.'));

  function update() {
    const d = spinDesign(radius.value, gees.value);
    const band = comfortBand(d.rpm);
    out.update({
      rpm: `${d.rpm < 1 ? fixed(d.rpm, 3) : fixed(d.rpm, 2)} rpm (${fixed(d.omega, 4)} rad/s)`,
      period: `${d.periodS >= 100 ? fixed(d.periodS, 1) : fixed(d.periodS, 2)} s`,
      rim: `${sig(d.rimSpeedMs, 3)} m/s (${fixed(d.rimSpeedMs * 3.6, 0)} km/h)`,
      grad: `${d.gradientG < 0.01 ? fixed(d.gradientG, 4) : fixed(d.gradientG, 3)} g (${fixed(d.gradientPct, d.gradientPct < 1 ? 2 : 1)} percent)`,
      cor: `${fixed(d.coriolisMs2, 2)} m/s² (${fixed(d.coriolisG, 3)} g, ${fixed(d.coriolisPctOfLocal, 1)} percent of your weight)`,
    });
    marker.setAttribute('transform', `translate(${xOf(d.rpm)} 22)`);
    svg.setAttribute('aria-label', `Spin rate ${fixed(d.rpm, 2)} rpm. ${band.text}`);
    note.textContent = band.text;
    note.dataset.band = band.id;
    st.save();
  }
  update();
}
