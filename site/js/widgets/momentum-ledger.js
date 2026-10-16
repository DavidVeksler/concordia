// Momentum ledger: spin four rotors and see why Concordia's pairs, industrial rotor and rings add up to zero.
import { momentumLedger, slewThrust, CONCORDIA } from './core.mjs';
import { h, s, segmented, checkbox, button, outputs, frame, sci, sciParts, fixed, force, bindState, widgetHeader } from './ui.mjs';

export const EXPLORE = { overlay: 'momentum' };
const CX = 205;
const UNIT = 34; // px per rotor's worth of angular momentum
const ROWS = ['Rotor 1', 'Rotor 2', 'Rotor 3', 'Rotor 4', 'Industrial', 'Rings', 'Net'];
const ROWY = (i) => 20 + i * 30 + (i === 6 ? 8 : 0);

export function mount(el) {
  const state = { spins: [-1, -1, 1, 1], industrial: true, rings: true };
  const rotorCtl = state.spins.map((_, i) => segmented({
    name: `rotor${i + 1}`, label: `Rotor ${i + 1}`, value: String(state.spins[i]),
    options: [{ value: '-1', label: 'Retrograde' }, { value: '1', label: 'Prograde' }],
    onChange: (v) => { state.spins[i] = Number(v); update(); },
  }));
  const ind = checkbox({ label: 'Industrial rotor spinning (retrograde)', checked: true, onChange: (v) => { state.industrial = v; update(); } });
  const rings = checkbox({ label: 'Momentum rings trimming the leftover', checked: true, onChange: (v) => { state.rings = v; update(); } });
  const st = bindState('momentum-ledger', { r1: rotorCtl[0], r2: rotorCtl[1], r3: rotorCtl[2], r4: rotorCtl[3], ind, rings }, () => { syncState(); update(); });
  function syncState() { state.spins = rotorCtl.map((c) => Number(c.value)); state.industrial = ind.value; state.rings = rings.value; }
  syncState();
  const asBuilt = button('Concordia as built', () => preset([-1, -1, 1, 1]));
  const allOne = button('All four spin one way', () => preset([1, 1, 1, 1]));
  function preset(spins) {
    state.spins = spins.slice(); state.industrial = true; state.rings = true;
    rotorCtl.forEach((c, i) => c.set(String(spins[i]), true)); ind.set(true, true); rings.set(true, true); update();
  }

  const out = outputs([
    { key: 'net', label: 'Net angular momentum', big: true },
    { key: 'share', label: 'Share of the four-rotor total' },
    { key: 'thrust', label: 'Thrust at each hull end to turn 1° a day' },
    { key: 'verdict', label: 'Verdict' },
  ]);

  const arrows = ROWS.map((name, i) => {
    const y = ROWY(i);
    const line = s('line', { y1: y, y2: y, x1: CX, x2: CX });
    const head = s('path', { d: '' });
    const g = s('g', { class: `w-arrow${i === 6 ? ' w-arrow--net' : ''}` }, line, head);
    return { g, line, head, y };
  });
  const svg = s('svg', { class: 'w-svg', viewBox: '0 0 340 244', role: 'img', 'aria-label': 'Angular momentum of each rotor' },
    s('line', { class: 'w-axisline', x1: CX, y1: 6, x2: CX, y2: 236 }),
    s('text', { class: 'w-axis', x: CX - 6, y: 10, 'text-anchor': 'end' }, '← retrograde'),
    s('text', { class: 'w-axis', x: CX + 6, y: 10 }, 'prograde →'),
    ROWS.map((n, i) => s('text', { x: 2, y: ROWY(i) + 4 }, n)),
    s('line', { class: 'w-rule', x1: 2, y1: ROWY(6) - 16, x2: 338, y2: ROWY(6) - 16 }),
    arrows.map((a) => a.g));

  function arrow(a, L) {
    const len = (L / CONCORDIA.rotorL) * UNIT;
    const x2 = CX + len;
    a.line.setAttribute('x2', x2);
    if (Math.abs(len) < 0.5) { a.head.setAttribute('d', `M${CX - 3} ${a.y - 3} L${CX + 3} ${a.y + 3} M${CX - 3} ${a.y + 3} L${CX + 3} ${a.y - 3}`); a.head.setAttribute('class', 'w-zero'); return; }
    const d = Math.sign(len);
    a.head.removeAttribute('class');
    a.head.setAttribute('d', `M${x2} ${a.y} L${x2 - d * 8} ${a.y - 5} L${x2 - d * 8} ${a.y + 5} Z`);
    a.g.classList.toggle('w-arrow--pro', d > 0);
    a.g.classList.toggle('w-arrow--retro', d < 0);
  }

  frame(el, 'Momentum ledger',
    widgetHeader({ explore: EXPLORE, state: st }),
    h('div', { class: 'w-grid' },
      h('div', { class: 'w-controls' },
        h('div', { class: 'w-btns' }, asBuilt, allOne),
        h('div', { class: 'w-segs' }, rotorCtl.map((c) => c.el)),
        ind.el, rings.el,
        h('p', { class: 'w-ref-line' }, 'Concordia: rotors 1 and 2 retrograde, 3 and 4 prograde, net zero. Each rotor holds about 1.17e17 N·m·s; the industrial rotor 1.9e16.')),
      h('div', { class: 'w-results' }, svg, out.el)));

  function update() {
    const L = momentumLedger(state);
    const parts = [...L.rotors, L.industrial, L.rings, L.net];
    parts.forEach((v, i) => arrow(arrows[i], v));
    const thrust = slewThrust(L.net, 1);
    const band = slewThrust(CONCORDIA.netBand * L.total, 1);
    const inBand = L.share <= CONCORDIA.netBand;
    out.update({
      net: L.net === 0 ? ['0 N·m·s'] : [L.net < 0 ? 'retrograde ' : 'prograde ', ...sciParts(Math.abs(L.net)), ' N·m·s'],
      share: [`${fixed(L.share * 100, L.share < 0.01 ? 3 : 1)} percent of `, ...sciParts(L.total, 2), ' N·m·s'],
      thrust: inBand ? `0 N now; at most ${force(band.forceN)} inside the 0.1 percent control band` : force(thrust.forceN),
      verdict: inBand
        ? 'Balanced. The station can turn on a few kilonewtons, using electricity rather than propellant.'
        : (L.share < 0.1
          ? 'Mostly balanced. The leftover is a gyroscope the thrusters must fight.'
          : 'Unbalanced. The station would behave like a giant gyroscope and resist every turn.'),
    });
    svg.setAttribute('aria-label', `Angular momentum: rotors ${state.spins.map((v) => (v < 0 ? 'retrograde' : 'prograde')).join(', ')}; net ${sci(L.net)} newton metre seconds`);
    st.save();
  }
  update();
}
