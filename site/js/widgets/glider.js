// Glider in the rotor: a small electric hang glider flown inside a Concordia rotor. The physics runs in the inertial frame
// (glider-core.mjs); the Resident view is the rotating frame, the Outside view is the inertial one.
import { G0, clamp } from './core.mjs';
import {
  R, OMEGA, GLIDER, Flight, levelFlight, stallSpeed, bestSpeed, weightlessSpeed, dropFromRest, earthFall, toRotating, sideOf,
} from './glider-core.mjs';
import { h, field, segmented, checkbox, button, outputs, frame, fixed, bindState, widgetHeader } from './ui.mjs';

export const EXPLORE = { viewpoint: 'glider-take-off' };
const STEP = 0.02; // s of simulated time per integrator step
const SKY_M = 450;
const spinName = (side) => (side > 0 ? 'spinward' : 'antispinward');
const kw = (w) => (w >= 995 ? `${fixed(w / 1000, 2)} kW` : `${fixed(w, 0)} W`);
const metres = (m) => `${fixed(Math.abs(m), 0)} m`;

export function mount(el) {
  let flight = null;
  let playing = false;
  let raf = 0;
  let lastNow = 0;
  let acc = 0;
  let timeScale = 1;
  let view = 'resident';
  let visible = true;
  let stallSeen = false;
  let mpp = 2; // metres per pixel in the Resident view
  let lastTele = 0;
  let pal = null;
  let palAt = 0;

  // ---------------------------------------------------------------- controls
  const height = field({ label: 'Start height above the ground', unit: 'm', min: 10, max: 2300, step: 10, value: 450, onChange: restart });
  const heading = segmented({
    name: 'glider-heading', label: 'Heading', value: 'spinward',
    options: [{ value: 'spinward', label: 'Spinward' }, { value: 'antispinward', label: 'Antispinward' }],
    onChange: restart,
  });
  const speed = field({ label: 'Airspeed', unit: 'm/s', min: 5, max: 30, step: 0.5, value: 14, digits: 1, onChange: restart });
  const st = bindState('glider', { h: height, d: heading, v: speed }, () => restart());
  const hold = checkbox({ label: 'Autopilot holds height and airspeed', checked: true, onChange: (on) => { setHold(on); } });
  const pitch = field({ label: 'Pitch demand (lift coefficient)', unit: 'CL', min: 0, max: 1.6, step: 0.01, value: 0.7, digits: 2, onChange: (v) => manual(() => { if (flight) flight.cl = v; }) });
  const power = field({ label: 'Throttle', unit: '%', min: 0, max: 100, step: 1, value: 50, digits: 0, onChange: (v) => manual(() => { if (flight) flight.throttle = v / 100; }) });
  const setDisabled = (f, on) => f.el.querySelectorAll('input').forEach((i) => { i.disabled = on; });
  setDisabled(pitch, true); setDisabled(power, true);

  const flyBtn = button('Fly', toggle);
  const dropBtn = button('Drop the ball', () => { ensureFlight(); if (!playing) play(); flight.drop(); say('Ball away. It leaves with your speed and nothing pushing it.'); });
  const resetBtn = button('Reset', () => restart());
  const motorBtn = button('Cut the motor', () => cutMotor());
  const viewSeg = segmented({
    name: 'glider-view', label: 'View', value: 'resident',
    options: [{ value: 'resident', label: 'Resident' }, { value: 'outside', label: 'Outside' }],
    onChange: (v) => { view = v; draw(); },
  });
  const speedSeg = segmented({
    name: 'glider-speed', label: 'Time', value: '1',
    options: [{ value: '1', label: '1×' }, { value: '4', label: '4×' }],
    onChange: (v) => { timeScale = Number(v); },
  });

  const preset = (label, hM, side, v, then) => button(label, () => {
    height.set(hM, true); heading.set(side > 0 ? 'spinward' : 'antispinward', true);
    speed.set(clamp(v, 5, 30), true); restart(); play();
    if (then) then();
    // presets sit below the view, and the view pauses while off screen: bring it back into sight
    stage.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
  let cutAt = null; // simulated time at which a preset cuts the motor

  function cutMotor() {
    ensureFlight();
    if (flight.motorOff || flight.ended) return;
    flight.cutMotor();
    if (!flight.hold) { hold.set(true, true); flight.hold = true; setDisabled(pitch, true); setDisabled(power, true); }
    motorBtn.disabled = true;
    power.set(0, true);
    if (!playing) play();
    say(`Motor off at ${fixed(flight.hM, 0)} m. The autopilot now holds ${fixed(flight.target.vMs, 1)} m/s by gliding down: moving outward is the only energy source left, so the glider sinks.`);
  }

  // ---------------------------------------------------------------- readouts
  const plan = outputs([
    { key: 'weight', label: 'Standing weight here (turning with the floor)', big: true },
    { key: 'felt', label: 'Lift needed for level flight at your speed' },
    { key: 'air', label: 'Air density' },
    { key: 'stall', label: 'Stall speed' },
    { key: 'cl', label: 'Pitch needed' },
    { key: 'pow', label: 'Motor power to hold level' },
    { key: 'best', label: 'Least-power speed' },
    { key: 'drop', label: 'Ball let go at rest lands' },
  ]);
  const tele = outputs([
    { key: 't', label: 'Flight time' },
    { key: 'h', label: 'Height' },
    { key: 'v', label: 'Airspeed' },
    { key: 'g', label: 'Push you feel now (wing and motor)' },
    { key: 'lv', label: 'Level flight here would need' },
    { key: 'vi', label: 'Speed against the stars' },
    { key: 'cl', label: 'Pitch demand' },
    { key: 'pw', label: 'Motor power' },
  ]);
  tele.el.removeAttribute('aria-live'); // updates four times a second; the status line below carries the events
  const status = h('p', { class: 'w-note', 'aria-live': 'polite' }, 'Press Fly. The autopilot holds your start height; the ball and the views show where gravity comes from.');
  const say = (text) => { status.textContent = text; };

  const canvas = h('canvas', { class: 'w-canvas', 'aria-hidden': 'true' });
  const stage = h('div', {
    class: 'w-stage', tabindex: '0', role: 'group',
    'aria-label': 'Glider flight view. Space flies or pauses, D drops the ball, R resets, arrow keys take manual control: up and down pitch, left and right throttle.',
  }, canvas);

  frame(el, 'Glider in the rotor',
    widgetHeader({ explore: EXPLORE, state: st }),
    stage,
    h('div', { class: 'w-btns' }, flyBtn, dropBtn, motorBtn, resetBtn),
    h('div', { class: 'w-segs' }, viewSeg.el, speedSeg.el),
    status,
    h('div', { class: 'w-grid' },
      h('div', { class: 'w-controls' }, height.el, heading.el, speed.el,
        h('div', { class: 'w-btns', role: 'group', 'aria-label': 'Starting points' },
          preset('Sky, with the spin', 450, 1, 14),
          preset('Sky, against the spin', 450, -1, 14),
          preset('Cancel your weight', 2200, -1, weightlessSpeed(2200)),
          preset('What happens if the motor stops?', 2200, -1, weightlessSpeed(2200), () => { cutAt = 4; })),
        hold.el, pitch.el, power.el),
      h('div', { class: 'w-results' }, plan.el, tele.el)),
    h('p', { class: 'w-hint' }, `Glider: ${GLIDER.massKg} kg with pilot, ${GLIDER.areaM2} m² wing, lift-to-drag about 12, ${GLIDER.motorW / 1000} kW electric motor. The air turns with the rotor, so airspeed is the same as speed over the floor. `
      + 'Resident view: the floor holds still and the ball curves. Outside view: the rotor turns and the ball flies straight.'));

  // ---------------------------------------------------------------- state
  function startFlight() {
    const side = sideOf(heading.value);
    flight = new Flight({ hM: height.value, vMs: speed.value, side, hold: hold.value });
    stallSeen = false;
    cutAt = null;
    motorBtn.disabled = false;
    // Resident-view scale: fit the floor in the frame at the start height, never closer than 1.5 m per pixel.
    const hpx = Math.max(120, canvas.clientHeight || 270);
    mpp = clamp((height.value + 70) / (hpx * 0.62), 1.5, 14);
    syncControls();
  }
  const ensureFlight = () => { if (!flight) startFlight(); };

  function restart() {
    pause();
    flight = null;
    startFlight();
    updatePlan();
    updateTele(true);
    say('Ready. Press Fly.');
    draw();
    st.save();
  }

  function syncControls() {
    if (!flight) return;
    pitch.set(flight.cl, true);
    power.set(flight.throttle * 100, true);
  }

  function setHold(on) {
    ensureFlight();
    flight.hold = on;
    if (on) flight.target = { hM: Math.max(10, flight.hM), vMs: speed.value, glide: !!flight.motorOff };
    setDisabled(pitch, on); setDisabled(power, on);
    syncControls();
    say(on ? 'Autopilot on.' : 'Manual flight. Pitch and throttle are yours.');
  }

  function manual(apply) {
    ensureFlight();
    if (flight.hold) { hold.set(false, true); flight.hold = false; setDisabled(pitch, false); setDisabled(power, false); }
    apply();
  }

  // ---------------------------------------------------------------- plan numbers
  function updatePlan() {
    const hM = height.value;
    const V = speed.value;
    const side = sideOf(heading.value);
    const f = levelFlight(hM, V, side);
    const best = bestSpeed(hM, side);
    const vs = stallSpeed(hM, side);
    const rest = dropFromRest(hM);
    const over = f.stalled || f.shaftW > GLIDER.motorW;
    plan.update({
      weight: `${fixed(f.standingG, 2)} g (${fixed(f.standingG * G0, 1)} m/s²)`,
      felt: `${fixed(f.feltG, 2)} g flying ${spinName(side)} at ${fixed(V, 1)} m/s`,
      air: `${fixed(f.rhoRatio * 100, 0)}% of the ground (${fixed(f.rho, 2)} kg/m³)`,
      stall: Number.isFinite(vs) ? `${fixed(vs, 1)} m/s` : 'any speed stalls',
      cl: f.stalled ? `${fixed(f.cl, 2)}, over the ${GLIDER.clMax} limit: stalls` : f.cl < 0.01 ? 'none: the wing carries no weight' : `${fixed(f.cl, 2)} of ${GLIDER.clMax} (${fixed(f.ld, 1)}:1 glide)`,
      pow: over ? `${kw(f.shaftW)}${f.stalled ? ', cannot hold level' : ', over the 4 kW motor'}` : `${kw(f.shaftW)} (${fixed(f.motorShare * 100, 0)}% of the motor)`,
      best: best ? `${fixed(best.V, 1)} m/s, ${kw(best.shaftW)}` : 'none',
      drop: rest ? `${metres(rest.shiftM)} ${rest.shiftM < 0 ? 'antispinward' : 'spinward'} of the spot below, after ${fixed(rest.fallS, 1)} s (Earth: 0 m, ${fixed(earthFall(hM), 1)} s)` : 'n/a',
    });
  }

  function updateTele(force) {
    if (!flight) return;
    const now = performance.now();
    if (!force && now - lastTele < 250) return;
    lastTele = now;
    const t = flight.telemetry();
    tele.update({
      t: `${fixed(t.t, 1)} s`,
      h: `${fixed(t.hM, 0)} m`,
      v: `${fixed(t.V, 1)} m/s${t.stalled ? ' STALL' : ''}`,
      g: `${fixed(t.feltG, 3)} g (standing here ${fixed(t.standingG, 2)} g)`,
      lv: `${fixed(t.levelG, 3)} g`,
      vi: `${fixed(Math.abs(t.vectors.inertial.spinward), 1)} m/s ${t.vectors.inertial.spinward >= 0 ? 'spinward' : 'antispinward'}${Math.abs(t.vectors.inertial.up) > 0.5 ? `, ${fixed(Math.abs(t.vectors.inertial.up), 1)} m/s ${t.vectors.inertial.up > 0 ? 'up' : 'down'}` : ''}`,
      cl: `${fixed(t.cl, 2)} of ${GLIDER.clMax}`,
      pw: t.motorOff ? 'off: gliding' : `${kw(t.shaftW)} (${fixed(t.throttle * 100, 0)}% throttle)`,
    });
    if (!flight.hold) syncControls();
  }

  // ---------------------------------------------------------------- loop
  function toggle() { if (playing) pause(); else play(); }
  function play() {
    ensureFlight();
    if (flight.ended) restart();
    playing = true; flyBtn.textContent = 'Pause'; lastNow = performance.now(); acc = 0;
    if (visible && !raf) raf = requestAnimationFrame(tick);
    say(flight.hold ? `Flying ${spinName(flight.side)}. Autopilot holds ${fixed(flight.target.hM, 0)} m.` : 'Flying, manual.');
  }
  function pause() {
    playing = false; flyBtn.textContent = 'Fly';
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
  }
  function tick(now) {
    raf = 0;
    if (!playing || !visible) return;
    const dt = Math.min(0.1, (now - lastNow) / 1000);
    lastNow = now;
    acc += dt * timeScale;
    let n = 0;
    while (acc >= STEP && n < 400) { flight.step(STEP); acc -= STEP; n++; if (flight.ended) break; }
    if (cutAt !== null && flight.t >= cutAt) { cutAt = null; cutMotor(); }
    events();
    updateTele(false);
    draw();
    if (flight.ended) { pause(); updateTele(true); draw(); return; }
    raf = requestAnimationFrame(tick);
  }

  let landingSaid = null;
  function events() {
    const t = flight.last;
    if (t && t.stalled && !stallSeen) { stallSeen = true; say('Stall. The wing cannot make the lift this speed and weight ask for. Add speed or lighten the load.'); }
    if (t && !t.stalled) stallSeen = false;
    if (flight.landing && flight.landing !== landingSaid) {
      landingSaid = flight.landing;
      const L = flight.landing;
      say(`Ball down after ${fixed(L.fallS, 1)} s, ${metres(L.shiftM)} ${L.shiftM < 0 ? 'antispinward' : 'spinward'} of the spot below where you let go. Let go at rest it would land ${metres(L.restShiftM)} antispinward; your own speed carried it the rest of the way.`);
    }
    if (flight.ended === 'touchdown') say(`Touched down after ${fixed(flight.t, 0)} s at ${fixed(flight.telemetry().V, 1)} m/s.`);
    if (flight.ended === 'hub') say('You reached the hub. Flight ended.');
  }

  // ---------------------------------------------------------------- drawing
  function colors() {
    const now = performance.now();
    if (pal && now - palAt < 800) return pal;
    const cs = getComputedStyle(document.documentElement);
    const c = (n, d) => cs.getPropertyValue(n).trim() || d;
    pal = { bg: c('--surface-2', '#16242b'), text: c('--text', '#e6eef0'), muted: c('--muted', '#9fb3ba'), accent: c('--accent', '#9cdae9'), warm: c('--accent-2', '#e8b86a'), rule: c('--rule', 'rgba(156,218,233,.2)'), floor: c('--surface', '#111b20') };
    palAt = now;
    return pal;
  }

  let ctx = null;
  let cw = 0;
  let ch = 0;
  function sizeCanvas() {
    const w = canvas.clientWidth;
    const hh = canvas.clientHeight;
    if (!w || !hh) return false;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(hh * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(hh * dpr); }
    ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cw = w; ch = hh;
    return true;
  }

  function draw() {
    if (!sizeCanvas()) return;
    ensureFlight();
    const c = colors();
    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = c.bg; ctx.fillRect(0, 0, cw, ch);
    if (view === 'resident') drawResident(c); else drawOutside(c);
    drawVectors(c);
    canvas.parentElement.setAttribute('data-view', view);
  }

  const label = (c, text, x, y, align = 'left', color) => {
    ctx.font = '500 11px "DM Mono", ui-monospace, Consolas, monospace';
    ctx.fillStyle = color || c.muted; ctx.textAlign = align; ctx.textBaseline = 'alphabetic';
    ctx.fillText(text, x, y);
  };

  function arrow(x0, y0, x1, y1, color, w = 2) {
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
    const a = Math.atan2(y1 - y0, x1 - x0);
    ctx.beginPath(); ctx.moveTo(x1, y1);
    ctx.lineTo(x1 - 7 * Math.cos(a - 0.45), y1 - 7 * Math.sin(a - 0.45));
    ctx.lineTo(x1 - 7 * Math.cos(a + 0.45), y1 - 7 * Math.sin(a + 0.45)); ctx.closePath(); ctx.fill();
  }

  function drawResident(c) {
    const f = flight;
    const g = toRotating(f.p[0], f.p[1], f.t);
    const gr = Math.hypot(g[0], g[1]);
    const ux = -g[0] / gr; const uy = -g[1] / gr; // up, towards the axis
    const ex = -g[1] / gr; const ey = g[0] / gr; // spinward, to the right
    const cx = cw * 0.5;
    const cy = ch * 0.4;
    const sx = (q) => cx + (((q[0] - g[0]) * ex + (q[1] - g[1]) * ey) / mpp);
    const sy = (q) => cy - (((q[0] - g[0]) * ux + (q[1] - g[1]) * uy) / mpp);
    const at = (rad, phi) => [rad * Math.cos(phi), rad * Math.sin(phi)];
    const phiG = Math.atan2(g[1], g[0]);
    const span = Math.min(3.1, (cw * mpp) / R * 0.8 + 0.02);
    const segs = Math.max(40, Math.ceil(span * 60));

    // altitude arcs
    ctx.lineWidth = 1; ctx.setLineDash([]);
    const stepH = mpp < 3 ? 100 : mpp < 7 ? 250 : 500;
    for (let hh = stepH; hh < R; hh += stepH) {
      const rad = R - hh;
      if (Math.abs(rad - gr) / mpp > ch * 0.9) continue;
      ctx.strokeStyle = hh === SKY_M ? c.warm : c.rule;
      ctx.setLineDash(hh === SKY_M ? [6, 5] : []);
      ctx.beginPath();
      for (let i = 0; i <= segs; i++) { const q = at(rad, phiG - span + (2 * span * i) / segs); const x = sx(q); const y = sy(q); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
      ctx.stroke();
      if (hh === SKY_M || stepH >= 250 || hh % 200 === 0) label(c, hh === SKY_M ? 'sky 450 m' : `${hh} m`, 6, sy(at(rad, phiG)) - 3, 'left', hh === SKY_M ? c.warm : c.muted);
    }
    ctx.setLineDash([]);

    // floor and buildings
    ctx.fillStyle = c.floor; ctx.strokeStyle = c.accent; ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= segs; i++) { const q = at(R, phiG - span + (2 * span * i) / segs); const x = sx(q); const y = sy(q); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
    ctx.stroke();
    // the solid floor is everything outside the floor circle (a rotation and scale of the rotor, so still a circle on screen)
    ctx.beginPath(); ctx.rect(-20, -20, cw + 40, ch + 40); ctx.arc(sx([0, 0]), sy([0, 0]), R / mpp, 0, Math.PI * 2, true); ctx.fill('evenodd');
    ctx.strokeStyle = c.muted; ctx.lineWidth = 1;
    const dphi = 160 / R; // a block every 160 m
    for (let k = Math.floor((phiG - span) / dphi); k <= Math.ceil((phiG + span) / dphi); k++) {
      const hash = ((Math.imul(k, 2654435761) >>> 0) % 1000) / 1000;
      const tall = 18 + hash * hash * 90;
      const a = at(R, k * dphi); const b = at(R - tall, k * dphi);
      ctx.beginPath(); ctx.moveTo(sx(a), sy(a)); ctx.lineTo(sx(b), sy(b)); ctx.stroke();
    }
    label(c, 'floor', 6, Math.min(ch - 6, sy(at(R, phiG)) - 6), 'left', c.accent);

    // markers on the floor: where the ball was let go (the spot below) and where it landed
    const mark = (ang, text, color, row = 0, align = 'left') => {
      const q = at(R, ang); const x = sx(q); const y = sy(q);
      if (x < -10 || x > cw + 10) return;
      ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 18); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, y - 18); ctx.lineTo(x + 9, y - 14); ctx.lineTo(x, y - 10); ctx.fill();
      label(c, text, align === 'left' ? x + 12 : x - 6, y - 4 - row * 16, align, color);
    };
    const b = f.ball;
    if (b) mark(Math.atan2(b.release[1], b.release[0]) - OMEGA * b.t0, 'below release', c.warm, 1);
    if (b && b.done && f.landing) mark(f.landing.floorAngle, 'ball landed', c.accent, 0, 'right');

    // trails in the rotating frame
    const trace = (pts, color, width, tail) => {
      ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineJoin = 'round';
      ctx.beginPath();
      const all = tail ? pts.concat([tail]) : pts;
      all.forEach((pt, i) => { const q = toRotating(pt[0], pt[1], pt[2]); const x = sx(q); const y = sy(q); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
      ctx.stroke();
    };
    trace(f.trail, c.muted, 1.5, [f.p[0], f.p[1], f.t]);
    if (b) {
      trace(b.path, c.warm, 2, b.done ? null : [b.p[0], b.p[1], f.t]);
      const q = b.done ? at(R, f.landing.floorAngle) : toRotating(b.p[0], b.p[1], f.t);
      ctx.fillStyle = c.warm; ctx.beginPath(); ctx.arc(sx(q), sy(q), 4.5, 0, Math.PI * 2); ctx.fill();
    }

    // glider: wing along the airflow, pilot hanging in the direction the weight pulls, weight arrow with the felt g
    const l = f.last;
    const dirI = l ? toRotating(l.ex, l.ey, f.t) : [1, 0]; // inertial vectors rotated into the frame the floor holds still in
    const fx = dirI[0];
    const fy = dirI[1];
    const nx = fx * ex + fy * ey; // flight direction on the screen
    const ny = -(fx * ux + fy * uy);
    const fa = toRotating(f.felt[0], f.felt[1], f.t);
    const fl = Math.hypot(fa[0], fa[1]);
    let dnx = 0; let dny = 1; // screen direction of the weight
    if (fl > 0.01) {
      const dx = -(fa[0] * ex + fa[1] * ey); const dy = -(fa[0] * ux + fa[1] * uy);
      const dl = Math.hypot(dx, dy) || 1;
      dnx = dx / dl; dny = -dy / dl;
    }
    ctx.strokeStyle = c.text; ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(cx - nx * 15, cy - ny * 15); ctx.lineTo(cx + nx * 15, cy + ny * 15); ctx.stroke();
    ctx.fillStyle = c.text; ctx.beginPath(); ctx.arc(cx + dnx * 9, cy + dny * 9, 3, 0, Math.PI * 2); ctx.fill();
    if (fl > 0.01) {
      const len = Math.min(70, 6 + (fl / G0) * 34);
      arrow(cx + dnx * 13, cy + dny * 13, cx + dnx * (13 + len), cy + dny * (13 + len), c.warm, 2.5);
    }
    label(c, `${fixed(fl / G0, 2)} g`, cx + 12, cy + 44, 'left', c.warm);
    label(c, `${fixed(f.hM, 0)} m up  ${fixed(f.telemetry().V, 1)} m/s ${f.ended ? '(ended)' : ''}`, cw - 8, 16, 'right', c.text);
    label(c, 'spinward  →', cw - 8, ch - 8, 'right', c.muted);
    stage.setAttribute('data-ended', f.ended || '');
  }

  // Inset: the three velocities at the glider, in floor directions (spinward right, towards the axis up), drawn head to tail:
  // air (turns with the floor) + glider through the air = glider against the stars.
  function drawVectors(c) {
    const v = flight.telemetry().vectors;
    const box = { x: 8, y: 8, w: 168, h: 116 };
    ctx.fillStyle = c.bg; ctx.globalAlpha = 0.9; ctx.fillRect(box.x, box.y, box.w, box.h); ctx.globalAlpha = 1;
    ctx.strokeStyle = c.rule; ctx.lineWidth = 1; ctx.strokeRect(box.x, box.y, box.w, box.h);
    const m = Math.max(Math.hypot(v.air.spinward, v.air.up), Math.hypot(v.rel.spinward, v.rel.up), Math.hypot(v.inertial.spinward, v.inertial.up), 1);
    const k = (box.w / 2 - 14) / m;
    const ox = box.x + box.w / 2; const oy = box.y + 30;
    const P = (q) => [ox + q.spinward * k, oy - q.up * k * 0.5];
    const a = P(v.air); const b = P({ spinward: v.air.spinward + v.rel.spinward, up: v.air.up + v.rel.up });
    if (Math.hypot(a[0] - ox, a[1] - oy) > 3) arrow(ox, oy, a[0], a[1], c.accent, 2);
    if (Math.hypot(b[0] - a[0], b[1] - a[1]) > 3) arrow(a[0], a[1], b[0], b[1], c.text, 2);
    if (Math.hypot(b[0] - ox, b[1] - oy) > 3) arrow(ox, oy, b[0], b[1], c.warm, 2); else { ctx.fillStyle = c.warm; ctx.beginPath(); ctx.arc(ox, oy, 3, 0, Math.PI * 2); ctx.fill(); }
    const sp = (q) => fixed(Math.hypot(q.spinward, q.up), 1);
    label(c, `air, floor  ${sp(v.air)} m/s`, box.x + 6, box.y + 64, 'left', c.accent);
    label(c, `through air ${sp(v.rel)} m/s`, box.x + 6, box.y + 79, 'left', c.text);
    label(c, `vs stars    ${sp(v.inertial)} m/s`, box.x + 6, box.y + 94, 'left', c.warm);
    label(c, 'spinward →', box.x + box.w - 6, box.y + 110, 'right', c.muted);
  }

  function drawOutside(c) {
    const f = flight;
    const m = (R * 2.35) / ch; // metres per pixel: the rotor fills the frame height
    const cx = cw * 0.5; const cy = ch * 0.5;
    const X = (x) => cx + x / m; const Y = (y) => cy - y / m;
    ctx.lineWidth = 1;
    // floor ring and spin ticks
    ctx.strokeStyle = c.accent; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(cx, cy, R / m, 0, Math.PI * 2); ctx.stroke();
    ctx.lineWidth = 1.5; ctx.strokeStyle = c.muted;
    for (let k = 0; k < 72; k++) {
      const a = (k * Math.PI) / 36 + OMEGA * f.t;
      const len = k % 18 === 0 ? 20 : k % 2 === 0 ? 11 : 6;
      ctx.beginPath(); ctx.moveTo(X((R - 4) * Math.cos(a)), Y((R - 4) * Math.sin(a))); ctx.lineTo(X((R - 4 - len * m) * Math.cos(a)), Y((R - 4 - len * m) * Math.sin(a))); ctx.stroke();
    }
    ctx.strokeStyle = c.warm; ctx.setLineDash([6, 5]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, (R - SKY_M) / m, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = c.muted; ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
    label(c, 'axis', cx + 7, cy - 6);
    label(c, 'floor', cx + R / m * 0.72, cy + R / m * 0.72 + 14, 'left', c.accent);
    label(c, 'sky', cx - (R - SKY_M) / m * 0.7 - 4, cy - (R - SKY_M) / m * 0.7 - 4, 'right', c.warm);

    // release spot on the turning floor
    const b = f.ball;
    const pin = (ang, color) => {
      const x0 = X(R * Math.cos(ang)); const y0 = Y(R * Math.sin(ang));
      ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x0, y0, 5, 0, Math.PI * 2); ctx.fill();
    };
    if (b) pin(Math.atan2(b.release[1], b.release[0]) - OMEGA * b.t0 + OMEGA * f.t, c.warm);
    if (b && b.done && f.landing) pin(f.landing.floorAngle + OMEGA * f.t, c.accent);

    const trace = (pts, color, width, extra) => {
      ctx.strokeStyle = color; ctx.lineWidth = width; ctx.beginPath();
      pts.forEach((pt, i) => { if (i) ctx.lineTo(X(pt[0]), Y(pt[1])); else ctx.moveTo(X(pt[0]), Y(pt[1])); });
      if (extra) ctx.lineTo(X(extra[0]), Y(extra[1]));
      ctx.stroke();
    };
    trace(f.trail, c.muted, 1.5, f.p);
    if (b) { trace(b.path, c.warm, 2, b.done ? null : b.p); ctx.fillStyle = c.warm; ctx.beginPath(); ctx.arc(X(b.p[0]), Y(b.p[1]), 4, 0, Math.PI * 2); ctx.fill(); }
    // the glider and its inertial velocity
    ctx.fillStyle = c.text; ctx.beginPath(); ctx.arc(X(f.p[0]), Y(f.p[1]), 5, 0, Math.PI * 2); ctx.fill();
    arrow(X(f.p[0]), Y(f.p[1]), X(f.p[0]) + f.v[0] / m * 2.2, Y(f.p[1]) - f.v[1] / m * 2.2, c.text, 2);
    const vi = Math.hypot(f.v[0], f.v[1]);
    label(c, `speed through space ${fixed(vi, 1)} m/s`, cw - 8, 16, 'right', c.text);
    label(c, `floor turns at ${fixed(OMEGA * R, 0)} m/s`, cw - 8, 32, 'right', c.muted);
    label(c, 'turning anticlockwise', cw - 8, ch - 8, 'right', c.muted);
  }

  // ---------------------------------------------------------------- input and lifecycle
  stage.addEventListener('keydown', (e) => {
    const k = e.key;
    const used = () => { e.preventDefault(); };
    if (k === ' ' || k === 'Enter') { used(); toggle(); }
    else if (k === 'd' || k === 'D') { used(); dropBtn.click(); }
    else if (k === 'r' || k === 'R') { used(); restart(); }
    else if (k === 'ArrowUp' || k === 'ArrowDown') { used(); ensureFlight(); manual(() => { flight.cl = clamp(flight.cl + (k === 'ArrowUp' ? 0.05 : -0.05), 0, 1.6); syncControls(); }); }
    else if (k === 'ArrowLeft' || k === 'ArrowRight') { used(); ensureFlight(); manual(() => { flight.throttle = clamp(flight.throttle + (k === 'ArrowRight' ? 0.05 : -0.05), 0, 1); syncControls(); }); }
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && playing && !raf) { lastNow = performance.now(); raf = requestAnimationFrame(tick); }
    }).observe(stage);
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
    else if (playing && visible && !raf) { lastNow = performance.now(); raf = requestAnimationFrame(tick); }
  });
  if ('ResizeObserver' in window) new ResizeObserver(() => draw()).observe(canvas);
  new MutationObserver(() => { palAt = 0; draw(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  window.matchMedia?.('(prefers-color-scheme: light)').addEventListener?.('change', () => { palAt = 0; draw(); });

  startFlight();
  updatePlan();
  updateTele(true);
  draw();
}
