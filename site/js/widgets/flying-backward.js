// Flying backward: how much lift a craft needs to fly a level circle in a rotor, against its antispinward airspeed. The lift needed
// falls to zero where the airspeed cancels the floor's speed (omega r), then rises again. Physics: glider-core.mjs (requiredAccel,
// velocityTriangle, cancellation, liftCurve), checked by npm run site:widgets-test; numbers in docs/site/facts.md section 13.
import { G0, clamp } from './core.mjs';
import { R, OMEGA, GLIDER, requiredAccel, standingAccel, velocityTriangle, cancellation, liftCurve, levelFlight } from './glider-core.mjs';
import { h, field, button, outputs, frame, fixed, bindState, widgetHeader } from './ui.mjs';

export const EXPLORE = { viewpoint: 'glider-over-city' };
const SVG_NS = 'http://www.w3.org/2000/svg';
const kmh = (v) => `${fixed(v * 3.6, 0)} km/h`;
const power = (w) => (w >= 1e6 ? `${fixed(w / 1e6, 1)} MW` : w >= 995 ? `${fixed(w / 1000, 1)} kW` : `${fixed(w, 0)} W`);

export function mount(el) {
  const height = field({ label: 'Height above the ground', unit: 'm', min: 0, max: 2450, step: 10, value: 2200, onChange: update,
    hint: 'Radius is 2,500 m minus the height. The sky is at 450 m, the axis at 2,500 m.' });
  const speed = field({ label: 'Airspeed, flying antispinward', unit: 'm/s', min: 1, max: 350, log: true, value: 8, digits: 1, onChange: update });
  const st = bindState('flying-backward', { h: height, v: speed }, () => update());

  const preset = (label, hM, v) => button(label, () => { height.set(hM, true); speed.set(clamp(v(hM), 1, 350), true); update(); });
  const presets = h('div', { class: 'w-btns', role: 'group', 'aria-label': 'Experiments' },
    preset('Cancel your weight', 2200, (hM) => OMEGA * (R - hM)),
    preset('Try it at the ground', 0, (hM) => OMEGA * (R - hM)),
    preset('Fly twice as fast', 2200, (hM) => 2 * OMEGA * (R - hM)),
    preset('Ordinary glider speed', 450, () => 14));

  const chart = document.createElementNS(SVG_NS, 'svg');
  chart.setAttribute('class', 'w-svgchart');
  chart.setAttribute('role', 'img');
  const vectors = document.createElementNS(SVG_NS, 'svg');
  vectors.setAttribute('class', 'w-svgchart');
  vectors.setAttribute('role', 'img');
  const chartBox = h('div', { class: 'w-stage w-stage--plain' }, chart);
  const vecBox = h('div', { class: 'w-stage w-stage--plain' }, vectors);

  const out = outputs([
    { key: 'need', label: 'Lift needed for level flight', big: true },
    { key: 'stand', label: 'Standing weight here (turning with the floor)' },
    { key: 'floor', label: 'Floor and air speed here' },
    { key: 'stars', label: 'Your speed against the stars' },
    { key: 'cancel', label: 'Weightless at' },
    { key: 'glider', label: 'Can the 4 kW glider do this?' },
  ]);
  const note = h('p', { class: 'w-note', 'aria-live': 'polite' });
  const flyLink = h('a', { class: 'w-link', href: '#glider' }, 'Fly this in the glider below');

  frame(el, 'Flying backward: lift needed against airspeed',
    widgetHeader({ explore: EXPLORE, state: st }),
    chartBox, vecBox, presets, note,
    h('div', { class: 'w-grid' },
      h('div', { class: 'w-controls' }, height.el, speed.el, h('p', { class: 'w-hint' }, flyLink)),
      h('div', { class: 'w-results' }, out.el)),
    h('p', { class: 'w-hint' }, 'Chart: the lift a wing must supply to fly a level circle at this height, as a share of Earth gravity, against airspeed. '
      + 'Solid: flying antispinward. Dashed: the same airspeed spinward. Thick: speeds the 4 kW glider can actually hold. '
      + 'Model: steady level flight, air turning with the floor, flight across the axis. Click the chart to pick an airspeed.'));

  // ---------------------------------------------------------------- drawing
  const W = () => Math.max(300, chartBox.clientWidth || 640);
  let geom = null;

  function drawChart(hM, V) {
    const w = W();
    const hh = clamp(Math.round(w * 0.5), 220, 320);
    const pad = { l: 46, r: 14, t: 18, b: 40 };
    const r = R - hM;
    const vc = OMEGA * r;
    const vMax = Math.max(2.3 * vc, 30, V * 1.08);
    const stand = standingAccel(r) / G0;
    const yMax = Math.max(stand * 2.2, 0.02);
    const X = (v) => pad.l + (v / vMax) * (w - pad.l - pad.r);
    const Y = (g) => pad.t + (1 - Math.min(g, yMax * 1.05) / yMax) * (hh - pad.t - pad.b);
    geom = { pad, w, vMax };
    const pts = liftCurve(hM, vMax, 260);
    const line = (key, okKey, onlyOk) => {
      let d = '';
      let pen = false;
      for (const p of pts) {
        if (p[key] > yMax * 1.05 || (onlyOk && !p[okKey])) { pen = false; continue; }
        d += `${pen ? 'L' : 'M'}${X(p.V).toFixed(1)},${Y(p[key]).toFixed(1)}`;
        pen = true;
      }
      return d;
    };
    const ticks = [];
    const yStep = niceStep(yMax / 4);
    for (let g = 0; g <= yMax + 1e-9; g += yStep) ticks.push(`<line x1="${pad.l}" x2="${w - pad.r}" y1="${Y(g)}" y2="${Y(g)}" class="grid"/><text x="${pad.l - 6}" y="${Y(g) + 4}" text-anchor="end">${fmtG(g, yStep)}</text>`);
    const xStep = niceStep(vMax / 5);
    for (let v = 0; v <= vMax + 1e-9; v += xStep) ticks.push(`<text x="${X(v)}" y="${hh - pad.b + 16}" text-anchor="middle">${fixed(v, xStep < 1 ? 1 : 0)}</text>`);
    const need = requiredAccel(r, V, -1) / G0;
    const tri = velocityTriangle(hM, V, -1);
    chart.setAttribute('width', w); chart.setAttribute('height', hh); chart.setAttribute('viewBox', `0 0 ${w} ${hh}`);
    chart.setAttribute('aria-label', `Chart. At ${fixed(hM, 0)} m the lift needed flying antispinward falls from ${fixed(stand, 2)} g at rest to zero at ${fixed(vc, 1)} m/s, then rises again. At ${fixed(V, 1)} m/s it is ${fixed(need, 3)} g.`);
    chart.innerHTML = `
      ${ticks.join('')}
      <line x1="${pad.l}" x2="${pad.l}" y1="${pad.t}" y2="${hh - pad.b}" class="axis"/>
      <line x1="${pad.l}" x2="${w - pad.r}" y1="${Y(0)}" y2="${Y(0)}" class="axis"/>
      <line x1="${pad.l}" x2="${w - pad.r}" y1="${Y(stand)}" y2="${Y(stand)}" class="stand"/>
      <text x="${w - pad.r}" y="${Y(stand) - 5}" text-anchor="end" class="stand-t">standing weight here, ${fixed(stand, 2)} g</text>
      <path d="${line('spin', 'spinOk', false)}" class="spin"/>
      <path d="${line('anti', 'antiOk', false)}" class="anti"/>
      <path d="${line('anti', 'antiOk', true)}" class="ok"/>
      <path d="${line('spin', 'spinOk', true)}" class="ok ok--spin"/>
      <line x1="${X(vc)}" x2="${X(vc)}" y1="${pad.t}" y2="${hh - pad.b}" class="cancel"/>
      <text x="${X(vc) + 5}" y="${pad.t + 10}" class="cancel-t">${fixed(vc, 1)} m/s: no lift needed</text>
      <circle cx="${X(V)}" cy="${Y(need)}" r="6" class="you"/>
      <text x="${pad.l + (w - pad.l - pad.r) / 2}" y="${hh - 6}" text-anchor="middle">airspeed, m/s (antispinward solid, spinward dashed)</text>
      <text x="12" y="${pad.t + (hh - pad.t - pad.b) / 2}" text-anchor="middle" transform="rotate(-90 12 ${pad.t + (hh - pad.t - pad.b) / 2})">lift needed, g</text>`;
    return { need, tri, stand, vc };
  }

  function drawVectors(tri) {
    const w = W();
    const hh = 150;
    const mid = w / 2;
    const span = Math.max(Math.abs(tri.air), Math.abs(tri.rel), Math.abs(tri.inertial), 1);
    const sc = (w / 2 - 30) / span;
    const row = (y, from, val, cls, text) => {
      const x0 = mid + from * sc;
      const x1 = mid + (from + val) * sc;
      const dir = Math.sign(x1 - x0) || 1;
      const head = Math.abs(x1 - x0) > 8 ? `<path d="M${x1},${y} L${x1 - dir * 9},${y - 5} L${x1 - dir * 9},${y + 5} Z" class="${cls} head"/>` : `<circle cx="${x1}" cy="${y}" r="4" class="${cls} head"/>`;
      const tx = clamp((x0 + x1) / 2, 70, w - 70);
      return `<line x1="${x0}" x2="${x1}" y1="${y}" y2="${y}" class="${cls}"/>${head}<text x="${tx}" y="${y - 9}" text-anchor="middle" class="${cls}-t">${text}</text>`;
    };
    vectors.setAttribute('width', w); vectors.setAttribute('height', hh); vectors.setAttribute('viewBox', `0 0 ${w} ${hh}`);
    vectors.setAttribute('aria-label', `Velocities along the circle. Air ${fixed(tri.air, 1)} m/s spinward. Glider ${fixed(Math.abs(tri.rel), 1)} m/s antispinward through the air. Sum against the stars ${fixed(Math.abs(tri.inertial), 1)} m/s ${tri.inertial >= 0 ? 'spinward' : 'antispinward'}.`);
    vectors.innerHTML = `
      <line x1="${mid}" x2="${mid}" y1="14" y2="${hh - 22}" class="grid"/>
      <text x="10" y="${hh - 6}">← antispinward</text><text x="${w - 10}" y="${hh - 6}" text-anchor="end">spinward, the way the floor turns →</text>
      ${row(32, 0, tri.air, 'air', `air and floor: ${fixed(tri.air, 1)} m/s`)}
      ${row(72, tri.air, tri.rel, 'rel', `glider through the air: ${fixed(Math.abs(tri.rel), 1)} m/s`)}
      ${row(112, 0, tri.inertial, 'net', `against the stars: ${fixed(Math.abs(tri.inertial), 1)} m/s${Math.abs(tri.inertial) < 0.05 ? ' (still)' : tri.reversed ? ' backward' : ''}`)}`;
  }

  // ---------------------------------------------------------------- numbers
  function update() {
    const hM = height.value;
    const V = speed.value;
    const r = R - hM;
    const { need, tri, stand, vc } = drawChart(hM, V);
    drawVectors(tri);
    const c = cancellation(hM);
    const f = levelFlight(hM, V, -1);
    const can = !f.stalled && f.shaftW <= GLIDER.motorW;
    out.update({
      need: `${fixed(need, 3)} g (${fixed(need * G0, 2)} m/s²)`,
      stand: `${fixed(stand, 3)} g`,
      floor: `${fixed(vc, 1)} m/s (${kmh(vc)}) spinward`,
      stars: Math.abs(tri.inertial) < 0.05 ? 'still: the rotor turns around you' : `${fixed(Math.abs(tri.inertial), 1)} m/s ${tri.inertial > 0 ? 'spinward' : 'antispinward, going round backwards'}`,
      cancel: `${fixed(c.V, 1)} m/s (${kmh(c.V)}) antispinward${c.flyable ? ', within the glider\'s reach' : `, ${power(c.shaftW)} of drag power: out of reach`}`,
      glider: f.stalled ? `No: the wing stalls (needs lift coefficient ${fixed(f.cl, 2)}, limit ${GLIDER.clMax})` : can ? `Yes: ${power(f.shaftW)}, ${fixed(f.motorShare * 100, 0)}% of the motor` : `No: ${power(f.shaftW)} of drag, the motor gives 4 kW`,
    });
    const rel = need / Math.max(stand, 1e-12);
    note.textContent = Math.abs(tri.inertial) < 0.05
      ? `You are motionless against the stars. The wing needs no lift at all, yet the air still streams past at ${fixed(V, 1)} m/s, so you still pay for drag.`
      : tri.reversed
        ? `You fly faster than the floor turns, so you circle the axis backwards. The wing needs lift again: ${fixed(rel * 100, 0)}% of the standing weight${Math.abs(V - 2 * vc) < 0.02 * vc ? ', the same as standing still' : ''}.`
        : `Flying antispinward cancels ${fixed((V / vc) * 100, 0)}% of your speed against the stars, so the wing needs ${fixed(rel * 100, 0)}% of the standing weight.`;
    const flyable = hM <= 2300 && V >= 5 && V <= 30;
    flyLink.hidden = !flyable;
    flyLink.href = `#glider.h=${Math.round(hM / 10) * 10}&glider.d=antispinward&glider.v=${Math.round(V * 2) / 2}`;
    st.save();
  }

  // The glider widget restores its state from the hash (bindState listens to hashchange); bring it into view as well.
  flyLink.addEventListener('click', (e) => {
    e.preventDefault();
    location.hash = flyLink.getAttribute('href').slice(1);
    document.querySelector('[data-widget="glider"]')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  chart.addEventListener('click', (e) => {
    if (!geom) return;
    const box = chart.getBoundingClientRect();
    const x = ((e.clientX - box.left) / box.width) * geom.w;
    const v = ((x - geom.pad.l) / (geom.w - geom.pad.l - geom.pad.r)) * geom.vMax;
    if (v > 0) { speed.set(clamp(v, 1, 350), true); update(); }
  });
  if ('ResizeObserver' in window) {
    let lastW = 0;
    new ResizeObserver(() => { const w = W(); if (w !== lastW) { lastW = w; update(); } }).observe(chartBox);
  }
  update();
}

function niceStep(x) {
  const p = 10 ** Math.floor(Math.log10(x));
  const m = x / p;
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
}
function fmtG(g, step) {
  const d = step >= 0.1 ? 1 : step >= 0.01 ? 2 : 3;
  return fixed(g, d);
}
