// Release lab: let something go inside a rotor and watch it twice, from outside (the stars hold still, the rotor turns) and as a
// resident (the floor holds still). In vacuum the path is a straight line; with air, quadratic drag against the turning air
// (F = -1/2 rho CdA |w| w) adds spin. Physics: glider-core.mjs release(), checked by npm run site:widgets-test; facts section 13.
import { clamp } from './core.mjs';
import { R, OMEGA, BODIES, release, toRotating, earthFall } from './glider-core.mjs';
import { h, field, segmented, button, outputs, frame, fixed, bindState, widgetHeader } from './ui.mjs';

export const EXPLORE = { chapter: 'axisTransfer' }; // the axis, where a still object floats
const SKY_M = 450;
const CIRC = 2 * Math.PI * R;
const side = (m) => (m < 0 ? 'antispinward' : 'spinward');

export function mount(el) {
  let main = null;
  let ghost = null;
  let tNow = 0;
  let tEnd = 1;
  let playing = false;
  let raf = 0;
  let last = 0;
  let visible = true;
  let pal = null;

  const height = field({ label: 'Let go at this height above the ground', unit: 'm', min: 10, max: 2500, step: 10, value: SKY_M, onChange: recompute,
    hint: '2,500 m is the axis itself.' });
  const start = segmented({
    name: 'release-start', label: 'Moving at release', value: 'corotating',
    options: [{ value: 'corotating', label: 'With the floor' }, { value: 'still', label: 'Still against the stars' }], onChange: recompute,
  });
  const body = segmented({
    name: 'release-body', label: 'Object', value: 'ball',
    options: Object.entries(BODIES).map(([value, b]) => ({ value, label: b.label[0].toUpperCase() + b.label.slice(1) })), onChange: recompute,
  });
  const air = segmented({
    name: 'release-air', label: 'Atmosphere', value: 'air',
    options: [{ value: 'air', label: 'Air (turns with the floor)' }, { value: 'vacuum', label: 'Vacuum' }], onChange: recompute,
  });
  const st = bindState('release-lab', { h: height, s: start, b: body, a: air }, () => recompute());

  const playBtn = button('Let go', () => { if (playing) pause(); else play(); });
  const scrub = h('input', { type: 'range', class: 'w-scrub', min: 0, max: 1000, step: 1, value: 0, 'aria-label': 'Time since release' });
  scrub.addEventListener('input', () => { pause(); tNow = (Number(scrub.value) / 1000) * tEnd; draw(); });

  const preset = (label, hM, s, b, a) => button(label, () => {
    height.set(hM, true); start.set(s, true); body.set(b, true); air.set(a, true); recompute(); play();
    // the views pause while off screen: bring them back into sight
    twin.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
  const presets = h('div', { class: 'w-btns', role: 'group', 'aria-label': 'Experiments' },
    preset('Drop from the sky', SKY_M, 'corotating', 'ball', 'air'),
    preset('Release cargo near the axis', 2450, 'corotating', 'parcel', 'air'),
    preset('Same cargo, no air', 2450, 'corotating', 'parcel', 'vacuum'),
    preset('Standing still relative to the stars', 2200, 'still', 'person', 'air'));

  const out = outputs([
    { key: 'when', label: 'Reaches the floor', big: true },
    { key: 'where', label: 'Lands' },
    { key: 'hit', label: 'Speed against the floor at impact' },
    { key: 'felt', label: 'Push felt on the way' },
    { key: 'spin', label: 'Share of the air\'s spin it has' },
    { key: 'other', label: 'With the atmosphere switched' },
  ]);
  const note = h('p', { class: 'w-note', 'aria-live': 'polite' });
  const clock = h('p', { class: 'w-hint' });

  const cvOut = h('canvas', { class: 'w-canvas', 'aria-hidden': 'true' });
  const cvRes = h('canvas', { class: 'w-canvas', 'aria-hidden': 'true' });
  const fig = (cv, cap) => h('figure', null, h('figcaption', null, cap), h('div', { class: 'w-stage' }, cv));
  const twin = h('div', { class: 'w-twin' }, fig(cvOut, 'Outside: the stars hold still, the rotor turns'), fig(cvRes, 'Resident: the floor holds still'));

  frame(el, 'Release lab',
    widgetHeader({ explore: EXPLORE, state: st }),
    twin,
    h('div', { class: 'w-btns' }, playBtn, button('Replay', () => { tNow = 0; play(); })),
    scrub, clock, presets, note,
    h('div', { class: 'w-grid' },
      h('div', { class: 'w-controls' }, height.el, start.el, body.el, air.el),
      h('div', { class: 'w-results' }, out.el)),
    h('p', { class: 'w-hint' }, 'Solid: the path with the setting you chose. Dashed: the same release with the atmosphere switched. Orange flag: the floor spot that was directly below at release. '
      + 'Drag model: quadratic, against the velocity through the local air, air density thinning towards the axis; sphere Cd 0.47, cube 1.05, a person spread flat 0.5 m².'));

  // ---------------------------------------------------------------- model
  function run(withAir) {
    return release({ hM: height.value, start: start.value, body: BODIES[body.value], air: withAir, tMax: 6000 });
  }
  function endOf(r) {
    if (r.landed) return r.fallS;
    return Math.min(r.tEnd ?? 200, 2 * Math.PI / OMEGA); // one turn of the floor when nothing happens
  }

  function recompute() {
    pause();
    main = run(air.value === 'air');
    ghost = run(air.value !== 'air');
    tEnd = Math.max(endOf(main), 1e-3);
    for (const r of [main, ghost]) r.rot = r.path.map((p) => toRotating(p[0], p[1], p[2]));
    tNow = 0;
    fitViews();
    readouts();
    draw();
    st.save();
  }

  function readouts() {
    const hM = height.value;
    const m = main;
    const g = ghost;
    const bodyName = BODIES[body.value].label;
    const describe = (r) => (r.landed ? `lands after ${fixed(r.fallS, r.fallS < 100 ? 1 : 0)} s at ${fixed(r.impactMs, 0)} m/s` : 'never reaches the floor');
    if (!m.landed) {
      out.update({
        when: m.reason === 'axis' ? 'Never: it stays on the axis' : 'Never: it hangs still while the floor turns past',
        where: 'nowhere', hit: 'none', felt: 'nothing: weightless', spin: `${fixed(m.path[0][3] * 100, 0)}%`,
        other: `${air.value === 'air' ? 'In vacuum' : 'With air'} it ${describe(g)}`,
      });
      note.textContent = m.reason === 'axis'
        ? 'At the axis the air does not move, so nothing pushes on a still object, with air or without. It floats.'
        : 'Nothing pushes on it: no gravity, no air. It hangs in place while the floor sweeps past at the speed of the rotor. Switch the air on and see what the headwind does.';
      return;
    }
    const wrapped = ((m.shiftM % CIRC) + CIRC * 1.5) % CIRC - CIRC / 2;
    const turns = m.floorTurns;
    out.update({
      when: `after ${fixed(m.fallS, m.fallS < 100 ? 1 : 0)} s${hM <= 2400 ? ` (Earth: ${fixed(earthFall(hM), 1)} s)` : ''}`,
      where: turns > 0.5 ? `the floor turned ${fixed(turns, 1)} times meanwhile; it lands ${fixed(Math.abs(wrapped), 0)} m ${side(wrapped)} of the spot below` : `${fixed(Math.abs(wrapped), 0)} m ${side(wrapped)} of the spot below`,
      hit: `${fixed(m.impactMs, 0)} m/s: ${fixed(Math.abs(m.impactAlongMs), 0)} sideways (the floor sweeping into it), ${fixed(m.impactIntoMs, 0)} down into it`,
      felt: m.peakDragG < 1e-6 ? 'nothing: weightless all the way down' : `air drag only, up to ${fixed(m.peakDragG, 2)} g`,
      spin: `${fixed(m.path[0][3] * 100, 0)}% at release, ${fixed(m.coRotationAtImpact * 100, 0)}% at impact`,
      other: `${air.value === 'air' ? 'In vacuum' : 'With air'} the ${bodyName} ${describe(g)}`,
    });
    const nearAxis = hM >= 2000;
    note.textContent = air.value === 'vacuum'
      ? `No force acts on the ${bodyName}: it flies a straight line at ${fixed(Math.hypot(...m.v0), 1)} m/s. The floor catches up with it${nearAxis ? ', almost sideways, at nearly the full floor speed' : ''}.`
      : nearAxis
        ? `The air turns faster than the ${bodyName} as it drifts out, so the headwind spins it up. That spin is what carries it to the floor, and the drag caps its speed at ${fixed(m.impactMs, 0)} m/s.`
        : `The ${bodyName} flies almost straight; the air only trims it. It lands ${fixed(Math.abs(wrapped), 0)} m ${side(wrapped)} because the floor moved on while it was in the air.`;
  }

  // ---------------------------------------------------------------- views
  let views = null;
  function fitBox(pts) {
    let x0 = Infinity; let x1 = -Infinity; let y0 = Infinity; let y1 = -Infinity;
    for (const [x, y] of pts) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    const span = Math.max(x1 - x0, y1 - y0);
    if (span > 1500 || !Number.isFinite(span)) return { cx: 0, cy: 0, half: R * 1.06, whole: true };
    return { cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, half: Math.max(span * 0.62, 160), whole: false };
  }
  function fitViews() {
    const r0 = R - height.value;
    const below = [0, -R];
    const inert = main.path.map((p) => [p[0], p[1]]).concat(ghost.landed ? [ghost.path.at(-1)] : [], [below, [0, -r0]]);
    const resid = main.rot.concat(ghost.landed ? [ghost.rot.at(-1)] : [], [below]);
    // when the object never moves, still show a stretch of the floor around it
    if (!main.landed) inert.push([R * 0.4, -R], [-R * 0.4, -R]);
    views = { out: fitBox(inert), res: fitBox(resid) };
  }

  function colors() {
    if (pal) return pal;
    const cs = getComputedStyle(document.documentElement);
    const c = (n, d) => cs.getPropertyValue(n).trim() || d;
    pal = { bg: c('--surface-2', '#16242b'), text: c('--text', '#e6eef0'), muted: c('--muted', '#9fb3ba'), accent: c('--accent', '#9cdae9'), warm: c('--accent-2', '#e8b86a'), rule: c('--rule', 'rgba(156,218,233,.2)'), floor: c('--surface', '#111b20') };
    return pal;
  }

  /** Index of the last path point at or before time t. */
  const at = (path, t) => { let lo = 0; let hi = path.length - 1; while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (path[mid][2] <= t) lo = mid; else hi = mid - 1; } return lo; };

  function drawPanel(cv, frameName) {
    const w = cv.clientWidth; const hh = cv.clientHeight;
    if (!w || !hh) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (cv.width !== Math.round(w * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(hh * dpr); }
    const ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const c = colors();
    const v = views[frameName];
    const k = Math.min(w, hh) / (2 * v.half);
    const X = (x) => w / 2 + (x - v.cx) * k;
    const Y = (y) => hh / 2 - (y - v.cy) * k;
    const rot = frameName === 'out' ? OMEGA * tNow : 0; // floor angle offset at the current time
    ctx.fillStyle = c.bg; ctx.fillRect(0, 0, w, hh);
    // floor: the region outside the floor circle is solid
    ctx.fillStyle = c.floor; ctx.beginPath(); ctx.rect(0, 0, w, hh); ctx.arc(X(0), Y(0), R * k, 0, Math.PI * 2, true); ctx.fill('evenodd');
    ctx.strokeStyle = c.accent; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(X(0), Y(0), R * k, 0, Math.PI * 2); ctx.stroke();
    // ticks every 100 m of floor (every 500 m when the whole rotor is shown) so the floor's motion is visible
    const step = (v.whole ? 500 : 100) / R;
    ctx.strokeStyle = c.muted; ctx.lineWidth = 1.2;
    for (let a = 0; a < Math.PI * 2; a += step) {
      const ang = a + rot;
      const len = v.whole ? 7 : 10;
      ctx.beginPath(); ctx.moveTo(X(R * Math.cos(ang)), Y(R * Math.sin(ang))); ctx.lineTo(X((R - len / k) * Math.cos(ang)), Y((R - len / k) * Math.sin(ang))); ctx.stroke();
    }
    ctx.setLineDash([5, 5]); ctx.strokeStyle = c.rule; ctx.beginPath(); ctx.arc(X(0), Y(0), (R - SKY_M) * k, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = c.muted; ctx.beginPath(); ctx.arc(X(0), Y(0), 3, 0, Math.PI * 2); ctx.fill();
    ctx.font = '500 11px "DM Mono", ui-monospace, Consolas, monospace';
    if (X(0) > 0 && X(0) < w && Y(0) > 0 && Y(0) < hh) { ctx.fillText('axis', X(0) + 6, Y(0) - 6); }
    // the floor spot that was below the release
    const flagAng = -Math.PI / 2 + rot;
    const fx = X(R * Math.cos(flagAng)); const fy = Y(R * Math.sin(flagAng));
    const ix = -Math.cos(flagAng); const iy = Math.sin(flagAng); // screen direction towards the axis
    ctx.strokeStyle = c.warm; ctx.fillStyle = c.warm; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx + ix * 16, fy + iy * 16); ctx.stroke();
    ctx.beginPath(); ctx.arc(fx + ix * 16, fy + iy * 16, 3.5, 0, Math.PI * 2); ctx.fill();

    const pts = (r) => (frameName === 'out' ? r.path : r.rot);
    const trace = (r, upto, color, width, dash) => {
      const P = pts(r);
      const n = upto == null ? P.length - 1 : at(r.path, upto);
      ctx.strokeStyle = color; ctx.lineWidth = width; ctx.setLineDash(dash || []);
      ctx.beginPath();
      for (let i = 0; i <= n; i++) { const x = X(P[i][0]); const y = Y(P[i][1]); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
      ctx.stroke(); ctx.setLineDash([]);
      return n;
    };
    trace(ghost, null, c.muted, 1.3, [4, 4]);
    const n = trace(main, tNow, c.warm, 2.2);
    // the object now: interpolate inside the current step
    const P = main.path;
    const i1 = Math.min(n + 1, P.length - 1);
    const f = P[i1][2] > P[n][2] ? clamp((tNow - P[n][2]) / (P[i1][2] - P[n][2]), 0, 1) : 0;
    let q = [P[n][0] + f * (P[i1][0] - P[n][0]), P[n][1] + f * (P[i1][1] - P[n][1])];
    if (frameName === 'res') q = toRotating(q[0], q[1], tNow);
    const landed = main.landed && tNow >= main.fallS - 1e-9;
    ctx.fillStyle = landed ? c.accent : c.text;
    ctx.beginPath(); ctx.arc(X(q[0]), Y(q[1]), landed ? 6 : 4.5, 0, Math.PI * 2); ctx.fill();
    if (landed) {
      ctx.strokeStyle = c.accent; ctx.lineWidth = 1.5;
      for (let a = 0; a < 8; a++) { const ca = Math.cos(a * Math.PI / 4); const sa = Math.sin(a * Math.PI / 4); ctx.beginPath(); ctx.moveTo(X(q[0]) + ca * 9, Y(q[1]) + sa * 9); ctx.lineTo(X(q[0]) + ca * 15, Y(q[1]) + sa * 15); ctx.stroke(); }
      ctx.fillStyle = c.accent; ctx.textAlign = 'left'; ctx.fillText('impact', clamp(X(q[0]) + 14, 4, w - 50), clamp(Y(q[1]) - 12, 12, hh - 4));
    }
    ctx.fillStyle = c.muted; ctx.textAlign = 'right';
    ctx.fillText(frameName === 'out' ? 'floor turns anticlockwise' : 'floor still', w - 8, hh - 8);
    ctx.textAlign = 'left';
  }

  function draw() {
    if (!views) return;
    drawPanel(cvOut, 'out');
    drawPanel(cvRes, 'res');
    scrub.value = String(Math.round((tNow / tEnd) * 1000));
    clock.textContent = `t = ${fixed(tNow, tNow < 100 ? 1 : 0)} s of ${fixed(tEnd, tEnd < 100 ? 1 : 0)} s. The floor has turned ${fixed((OMEGA * tNow * 180) / Math.PI, 0)} degrees. Played ${fixed(rate(), 0)} times faster than real time.`;
  }

  // ---------------------------------------------------------------- playback: the whole event in about 8 seconds
  const rate = () => Math.max(1, tEnd / 8);
  function play() {
    if (tNow >= tEnd - 1e-9) tNow = 0;
    playing = true; playBtn.textContent = 'Pause'; last = performance.now();
    if (visible && !raf) raf = requestAnimationFrame(tick);
  }
  function pause() {
    playing = false; playBtn.textContent = 'Let go';
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
  }
  function tick(now) {
    raf = 0;
    if (!playing || !visible) return;
    tNow = Math.min(tEnd, tNow + (Math.min(0.1, (now - last) / 1000)) * rate());
    last = now;
    draw();
    if (tNow >= tEnd) { pause(); return; }
    raf = requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && playing && !raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
    }).observe(cvOut);
  }
  if ('ResizeObserver' in window) new ResizeObserver(() => draw()).observe(cvOut);
  new MutationObserver(() => { pal = null; draw(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  window.matchMedia?.('(prefers-color-scheme: light)').addEventListener?.('change', () => { pal = null; draw(); });

  recompute();
}
