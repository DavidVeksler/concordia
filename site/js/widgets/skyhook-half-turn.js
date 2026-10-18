// Skyhook half-turn: the tether seen from the hub, a time scrubber, and the two craft's inertial speeds swapping.
// Physics in skyhook-core.mjs (a port of src/skyhook-kinematics.ts). Hub frame: x forward along the hub's motion, y up away from Earth.
import { skyhookModel, speedOf, clock, EARTH_RADIUS_KM, SKYHOOK } from './skyhook-core.mjs';
import { h, s, field, button, outputs, frame, fixed, bindState, widgetHeader } from './ui.mjs';

export const EXPLORE = { chapter: 'earthArrival' };

const T_MIN = -90;
const T_MAX = 570;
// hub-frame diagram: x -430 to 430 km, y -450 (Earth's surface) to 336 km
const VW = 360;
const VH = 372;
const SC = VW / 860;
const OX = VW / 2;
const OY = 336 * SC;
const px = (xKm) => OX + xKm * SC;
const py = (yKm) => OY - yKm * SC;
// speed chart: tau T_MIN to T_MAX, 5 to 10.2 km/s
const C0 = 38;
const C1 = 346;
const CY0 = 128;
const CY1 = 14;
const cx = (t) => C0 + ((t - T_MIN) / (T_MAX - T_MIN)) * (C1 - C0);
const cy = (v) => CY0 - ((v - 5) / 5.2) * (CY0 - CY1);

function earthPath() {
  const pts = [];
  for (let x = -430; x <= 430; x += 43) pts.push(`${pts.length ? 'L' : 'M'}${px(x).toFixed(1)} ${py(-6821 + Math.sqrt(EARTH_RADIUS_KM ** 2 - x * x)).toFixed(1)}`);
  return `${pts.join(' ')} L${px(430).toFixed(1)} ${VH} L${px(-430).toFixed(1)} ${VH} Z`;
}

export function mount(el) {
  const t = field({ label: 'Time from capture', unit: 's', min: T_MIN, max: T_MAX, step: 1, value: 240, digits: 0, onChange: () => update() });
  const half = field({ label: 'Half-turn time', unit: 's', min: 400, max: 560, step: 10, value: SKYHOOK.halfTurnSeconds, digits: 0, onChange: () => { rebuild(); update(); },
    hint: 'Concordia turns the tether half a revolution in 480 s. A slower turn throws less speed.' });
  const st = bindState('skyhook-half-turn', { t, h: half }, () => { rebuild(); update(); });

  let model = skyhookModel();
  const pathA = s('path', { class: 'sk-path sk-path--a sk-ghost' });
  const pathB = s('path', { class: 'sk-path sk-path--b sk-ghost' });
  const trailA = s('path', { class: 'sk-path sk-path--a' });
  const trailB = s('path', { class: 'sk-path sk-path--b' });
  const tether = s('line', { class: 'sk-tether' });
  const hub = s('circle', { class: 'sk-hub', cx: px(0), cy: py(0), r: 3.5 });
  const dotA = s('circle', { class: 'sk-dot sk-dot--a', r: 5.5 });
  const dotB = s('circle', { class: 'sk-dot sk-dot--b', r: 5.5 });
  const labA = s('text', { class: 'sk-label sk-label--a' }, 'Family');
  const labB = s('text', { class: 'sk-label sk-label--b' }, 'From Earth');
  const svg = s('svg', { class: 'w-svg sk-svg', viewBox: `0 0 ${VW} ${VH}`, role: 'img', 'aria-label': 'The tether turning, seen from the hub' },
    s('rect', { class: 'sk-bg', x: 0, y: 0, width: VW, height: VH, rx: 8 }),
    s('path', { class: 'sk-earth', d: earthPath() }),
    s('text', { class: 'w-axis', x: VW / 2, y: VH - 14, 'text-anchor': 'middle' }, 'Earth below'),
    s('circle', { class: 'sk-ring', cx: px(0), cy: py(0), r: SKYHOOK.armKm * SC }),
    s('text', { class: 'w-axis', x: 8, y: py(300) + 4 }, '750 km'),
    s('text', { class: 'w-axis', x: 8, y: py(-300) + 4 }, '150 km'),
    s('text', { class: 'w-axis', x: VW - 8, y: 16, 'text-anchor': 'end' }, 'hub moves →'),
    pathA, pathB, trailA, trailB, tether, hub, dotA, dotB, labA, labB);

  // speed chart
  const curveA = s('path', { class: 'sk-path sk-path--a' });
  const curveB = s('path', { class: 'sk-path sk-path--b' });
  const markCapture = s('line', { class: 'sk-mark', y1: CY1, y2: CY0 });
  const markRelease = s('line', { class: 'sk-mark', y1: CY1, y2: CY0 });
  const textRelease = s('text', { class: 'w-axis', y: CY0 + 15, 'text-anchor': 'middle' }, 'release');
  const cursor = s('line', { class: 'sk-cursor', y1: CY1, y2: CY0 });
  const chartA = s('circle', { class: 'sk-dot sk-dot--a', r: 4.5 });
  const chartB = s('circle', { class: 'sk-dot sk-dot--b', r: 4.5 });
  const chart = s('svg', { class: 'w-svg sk-chart', viewBox: '0 0 360 164', role: 'img', 'aria-label': 'Inertial speed of the two craft' },
    [5, 6, 7, 8, 9, 10].map((v) => s('g', null, s('line', { class: 'w-rule', x1: C0, y1: cy(v), x2: C1, y2: cy(v) }), s('text', { class: 'w-axis', x: C0 - 6, y: cy(v) + 3.5, 'text-anchor': 'end' }, v))),
    s('text', { class: 'w-axis', x: C0 - 6, y: 8, 'text-anchor': 'end' }, 'km/s'),
    markCapture, markRelease,
    s('text', { class: 'w-axis', x: cx(0), y: CY0 + 15, 'text-anchor': 'middle' }, 'capture'),
    textRelease,
    s('text', { class: 'w-axis', x: (C0 + C1) / 2, y: 158, 'text-anchor': 'middle' }, 'seconds from capture, inertial speed of each craft'),
    curveA, curveB, cursor, chartA, chartB);

  const out = outputs([
    { key: 'clock', label: 'Mission clock', big: true },
    { key: 'a', label: 'Family spaceplane (amber)' },
    { key: 'b', label: 'Spaceplane from Earth (teal)' },
    { key: 'handed', label: 'Speed handed across so far' },
    { key: 'load', label: 'Load on riders' },
    { key: 'entry', label: 'Earth-bound release' },
    { key: 'apogee', label: 'Outbound release, apogee' },
  ]);

  const jump = (label, tau) => button(label, () => { t.set(tau); });
  let playing = false;
  let last = 0;
  const play = button('Play', () => {
    if (playing) { playing = false; play.textContent = 'Play'; return; }
    if (t.value >= T_MAX - 1) t.set(T_MIN, true);
    playing = true; play.textContent = 'Pause'; last = 0;
    const tick = (now) => {
      if (!playing) return;
      if (last) t.set(Math.min(T_MAX, t.value + ((now - last) / 1000) * 30));
      last = now;
      if (t.value >= T_MAX) { playing = false; play.textContent = 'Play'; return; }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });

  frame(el, 'Skyhook half-turn',
    widgetHeader({ explore: EXPLORE, state: st }),
    h('div', { class: 'w-grid' },
      h('div', { class: 'w-controls' }, t.el, h('div', { class: 'w-btns' }, play, jump('Approach', -60), jump('Capture', 0), button('Mid-turn', () => t.set(model.halfTurnSeconds / 2)), button('Release', () => t.set(model.halfTurnSeconds))), half.el),
      h('div', { class: 'w-results' }, out.el)),
    svg, chart,
    h('p', { class: 'w-hint' }, 'Hub frame: the hub sits still, the tether turns clockwise, and Earth is below. The dashed lines are the two spaceplanes’ paths seen from the hub. Speeds are inertial, measured against the stars. One craft gives up exactly the speed the other gains.'));

  function rebuild() {
    model = skyhookModel({ ...SKYHOOK, halfTurnSeconds: half.value });
    const a = [];
    const b = [];
    const va = [];
    const vb = [];
    for (let tau = T_MIN; tau <= T_MAX + 0.5; tau += 3) {
      const sa = model.craftState(tau, 'A');
      const sb = model.craftState(tau, 'B');
      const ha = model.inHubFrame(tau, sa);
      const hb = model.inHubFrame(tau, sb);
      const k = a.length ? 'L' : 'M';
      a.push(`${k}${px(ha.x).toFixed(1)} ${py(ha.y).toFixed(1)}`);
      b.push(`${k}${px(hb.x).toFixed(1)} ${py(hb.y).toFixed(1)}`);
      va.push(`${k}${cx(tau).toFixed(1)} ${cy(speedOf(sa)).toFixed(1)}`);
      vb.push(`${k}${cx(tau).toFixed(1)} ${cy(speedOf(sb)).toFixed(1)}`);
    }
    pathA.setAttribute('d', a.join(' '));
    pathB.setAttribute('d', b.join(' '));
    curveA.setAttribute('d', va.join(' '));
    curveB.setAttribute('d', vb.join(' '));
    for (const m of [markCapture]) { m.setAttribute('x1', cx(0)); m.setAttribute('x2', cx(0)); }
    markRelease.setAttribute('x1', cx(model.halfTurnSeconds)); markRelease.setAttribute('x2', cx(model.halfTurnSeconds));
    textRelease.setAttribute('x', cx(model.halfTurnSeconds));
  }

  function trail(tau, id) {
    const pts = [];
    for (let u = T_MIN; u <= tau + 1e-9; u += 3) {
      const p = model.inHubFrame(u, model.craftState(u, id));
      pts.push(`${pts.length ? 'L' : 'M'}${px(p.x).toFixed(1)} ${py(p.y).toFixed(1)}`);
    }
    return pts.join(' ');
  }

  function update() {
    const tau = t.value;
    const H = model.halfTurnSeconds;
    const sa = model.craftState(tau, 'A');
    const sb = model.craftState(tau, 'B');
    const ha = model.inHubFrame(tau, sa);
    const hb = model.inHubFrame(tau, sb);
    const phase = tau < 0 ? 'approaching the tips' : tau <= H ? 'captured, turning' : 'released';
    // tether line: the two tips at this time (the tether keeps turning in the diagram after release)
    const tipA = model.inHubFrame(tau, model.tipState(tau, 'A'));
    const tipB = model.inHubFrame(tau, model.tipState(tau, 'B'));
    tether.setAttribute('x1', px(tipA.x)); tether.setAttribute('y1', py(tipA.y));
    tether.setAttribute('x2', px(tipB.x)); tether.setAttribute('y2', py(tipB.y));
    trailA.setAttribute('d', trail(tau, 'A'));
    trailB.setAttribute('d', trail(tau, 'B'));
    dotA.setAttribute('cx', px(ha.x)); dotA.setAttribute('cy', py(ha.y));
    dotB.setAttribute('cx', px(hb.x)); dotB.setAttribute('cy', py(hb.y));
    const place = (lab, p, above) => {
      const x = px(p.x);
      const right = x < VW - 70;
      lab.setAttribute('x', right ? x + 9 : x - 9);
      lab.setAttribute('text-anchor', right ? 'start' : 'end');
      lab.setAttribute('y', py(p.y) + (above ? -8 : 15));
    };
    place(labA, ha, ha.y > hb.y);
    place(labB, hb, hb.y > ha.y);
    cursor.setAttribute('x1', cx(tau)); cursor.setAttribute('x2', cx(tau));
    chartA.setAttribute('cx', cx(tau)); chartA.setAttribute('cy', cy(speedOf(sa)));
    chartB.setAttribute('cx', cx(tau)); chartB.setAttribute('cy', cy(speedOf(sb)));

    const captured = tau >= 0 && tau <= H;
    const entry = model.entry();
    out.update({
      clock: `${clock(tau)} · ${phase}`,
      a: `${fixed(speedOf(sa), 2)} km/s at ${fixed(model.altitude(sa), 0)} km`,
      b: `${fixed(speedOf(sb), 2)} km/s at ${fixed(model.altitude(sb), 0)} km`,
      handed: `${fixed(model.handedAcross(tau), 2)} km/s`,
      load: captured ? `${fixed(model.feltG(tau, 'A'), 2)} g, pointing away from the hub` : 'weightless in free fall',
      entry: `${fixed(entry.speedKmS, 2)} km/s at 120 km, ${fixed(entry.pathDeg, 1)}°, ${fixed(entry.secondsAfterRelease, 0)} s after release`,
      apogee: `${fixed(model.outboundPost.apogeeKm - EARTH_RADIUS_KM, 0)} km altitude`,
    });
    svg.setAttribute('aria-label', `${clock(tau)}, ${phase}. The family spaceplane moves at ${fixed(speedOf(sa), 2)} kilometres per second, the spaceplane from Earth at ${fixed(speedOf(sb), 2)}.`);
    st.save();
  }
  rebuild();
  update();
}
