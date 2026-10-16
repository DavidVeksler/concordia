// Pure physics for the glider widget (site/js/widgets/glider.js). No DOM, no globals: node imports this (scripts/site/widgets-test.mjs).
//
// The flight is integrated in the INERTIAL frame, where a rotor has no gravity at all. The air turns with the rotor (velocity omega x r),
// so the only forces are lift, drag and thrust, all set by the velocity relative to the air. "Weight" is what the wing has to
// supply to bend the path into the circle the floor is following. The resident view is a coordinate change, nothing more.
// Air: docs/site/facts.md section 2 and /science/air-water-food/ (isothermal, 293 K, 287 J/kg/K, 101.3 kPa at the ground).

import { CONCORDIA, G0, clamp } from './core.mjs';

export const R = CONCORDIA.radiusM; // floor radius, m
export const OMEGA = CONCORDIA.omega; // rad/s

export const AIR = { rhoGround: 1.204, gasJ: 287, tempK: 293 }; // 20 C dry air at 101.3 kPa

/** Air density at distance rM from the axis: the barometric rule with the centrifugal potential in place of g x h. */
export function airDensity(rM) {
  return AIR.rhoGround * Math.exp((-OMEGA * OMEGA * (R * R - rM * rM)) / (2 * AIR.gasJ * AIR.tempK));
}

/** A light electric hang glider: pilot 75 kg, wing, motor and battery 45 kg. */
export const GLIDER = {
  massKg: 120,
  areaM2: 16,
  cd0: 0.03, // parasite drag coefficient (wing, pilot, trike)
  k: 0.06, // induced drag factor, 1 / (pi x e x AR) with AR 6, e 0.88
  clMax: 1.4,
  clMin: -0.2,
  motorW: 4000, // shaft power
  propEff: 0.7,
  staticThrustN: 300,
  stallExtraCd: 0.25, // added drag once the pitch demand passes clMax
};

/** A 20 kg steel ball, 17 cm across: nearly drag-free for a fall of a few hundred metres. */
export const BALL = { massKg: 20, cdA: 0.0105 };

const SIDE = { spinward: 1, antispinward: -1 };
export const sideOf = (name) => SIDE[name] ?? 1;

// ---------------------------------------------------------------------------------------------- level flight (closed form)
/** Thrust available per unit throttle at airspeed V: static-thrust cap at low speed, propeller power over speed above it. */
export const thrustPerThrottle = (V, g = GLIDER) => Math.min(g.staticThrustN, (g.propEff * g.motorW) / Math.max(V, 1));

/**
 * Flying a circle at height hM above the ground, airspeed V (relative to the air), side +1 spinward or -1 antispinward.
 * Inertial tangential speed is omega r + side V, so the wing must supply (omega r + side V)^2 / r towards the axis.
 */
export function levelFlight(hM, V, side = 1, g = GLIDER) {
  const r = R - hM;
  const rho = airDensity(r);
  const vt = OMEGA * r + side * V;
  const aMs2 = (vt * vt) / r;
  const liftN = g.massKg * aMs2;
  const q = 0.5 * rho * V * V;
  const cl = liftN / (q * g.areaM2);
  const stalled = cl > g.clMax;
  const clUsed = Math.min(cl, g.clMax);
  const dragN = q * g.areaM2 * (g.cd0 + g.k * clUsed * clUsed + (stalled ? g.stallExtraCd : 0));
  const propW = dragN * V;
  const shaftW = propW / g.propEff;
  return {
    rM: r, rho, rhoRatio: rho / AIR.rhoGround,
    standingG: (OMEGA * OMEGA * r) / G0,
    feltG: aMs2 / G0,
    aMs2, liftN, cl, stalled, dragN, propW, shaftW,
    motorShare: shaftW / g.motorW,
    thrustN: dragN,
    ld: liftN / dragN,
  };
}

/** Airspeed at which the pitch demand of level flight reaches clMax: closed form, from CL = K (omega r / V + side)^2. */
export function stallSpeed(hM, side = 1, g = GLIDER) {
  const r = R - hM;
  const K = (2 * g.massKg) / (airDensity(r) * g.areaM2 * r);
  const root = Math.sqrt(g.clMax / K);
  if (side > 0) return root > 1 ? (OMEGA * r) / (root - 1) : Infinity;
  return (OMEGA * r) / (1 + root);
}

/** Airspeed that needs the least motor power for level flight, scanned from just above the stall to 30 m/s. */
export function bestSpeed(hM, side = 1, g = GLIDER) {
  let best = null;
  for (let V = Math.max(4, stallSpeed(hM, side, g) * 1.02); V <= 30; V += 0.1) {
    const f = levelFlight(hM, V, side, g);
    if (f.stalled) continue;
    if (!best || f.shaftW < best.shaftW) best = { V, ...f };
  }
  return best;
}

/** Airspeed at which a glider flying against the spin hangs motionless in inertial space and feels no weight. */
export const weightlessSpeed = (hM) => OMEGA * (R - hM);

// ---------------------------------------------------------------------------------------------- flying backward: required lift
// Three different numbers get called "gravity" in a rotor; keep them apart:
//   standingAccel: what a person turning with the floor at radius r feels, omega^2 r (the floor or a structure supplies it);
//   requiredAccel: the push towards the axis a craft needs to fly a steady circle at radius r with airspeed V, (omega r + side V)^2 / r;
//   the push actually felt: lift + thrust + drag divided by mass (gliderForces), which equals requiredAccel only in steady level flight.
export const standingAccel = (rM) => OMEGA * OMEGA * rM;

/** Centripetal acceleration for a steady circle at radius rM, airspeed V, side +1 spinward / -1 antispinward, air turning rigidly. */
export function requiredAccel(rM, V, side = 1) {
  const vt = OMEGA * rM + side * V;
  return rM > 0 ? (vt * vt) / rM : 0;
}

/** Velocities along the circle, positive spinward (m/s): the air, the craft relative to the air, and the craft relative to the stars. */
export function velocityTriangle(hM, V, side = 1) {
  const air = OMEGA * (R - hM);
  const rel = side * V;
  return { air, rel, inertial: air + rel, reversed: air + rel < 0 };
}

/** Lowest and highest airspeeds at which the 4 kW glider can hold level flight here (not stalled, shaft power within the motor). */
export function flightEnvelope(hM, side = 1, g = GLIDER, vTop = 80) {
  let lo = null;
  let hi = null;
  for (let V = 1; V <= vTop + 1e-9; V += 0.05) {
    const f = levelFlight(hM, V, side, g);
    if (f.stalled || f.shaftW > g.motorW) { if (lo !== null) break; continue; }
    if (lo === null) lo = V;
    hi = V;
  }
  return lo === null ? null : { lo, hi };
}

/** The cancellation point: antispinward at omega r. No lift needed, but drag at that airspeed still has to be paid for. */
export function cancellation(hM, g = GLIDER) {
  const V = weightlessSpeed(hM);
  const f = levelFlight(hM, V, -1, g);
  const env = flightEnvelope(hM, -1, g, Math.max(80, V + 1));
  return {
    V, kmh: V * 3.6, dragN: f.dragN, shaftW: f.shaftW, motorMultiple: f.shaftW / g.motorW,
    flyable: !!env && V >= env.lo && V <= env.hi,
  };
}

/** Required-acceleration curves for a chart: points from V = 0 to vMax, both headings, in g, with the glider's flyable flags. */
export function liftCurve(hM, vMax, n = 240, g = GLIDER) {
  const r = R - hM;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const V = (vMax * i) / n;
    const ok = (side) => V >= 1 && (() => { const f = levelFlight(hM, V, side, g); return !f.stalled && f.shaftW <= g.motorW; })();
    pts.push({ V, anti: requiredAccel(r, V, -1) / G0, spin: requiredAccel(r, V, 1) / G0, antiOk: ok(-1), spinOk: ok(1) });
  }
  return pts;
}

// ---------------------------------------------------------------------------------------------- forces
const hyp = Math.hypot;

/** Rotating-frame coordinates of an inertial point at time t. */
export function toRotating(x, y, t) {
  const c = Math.cos(OMEGA * t);
  const s = Math.sin(OMEGA * t);
  return [x * c + y * s, -x * s + y * c];
}

/** Inertial coordinates of a rotating-frame point at time t (inverse of toRotating). */
export function fromRotating(x, y, t) {
  const c = Math.cos(OMEGA * t);
  const s = Math.sin(OMEGA * t);
  return [x * c - y * s, x * s + y * c];
}

/** Velocity of the air (and the floor) at inertial position p: omega x p. */
export const airVelocity = (p) => [-OMEGA * p[1], OMEGA * p[0]];

/** Velocity seen in the rotating frame (by a resident), expressed in rotating-frame axes: rotate v - omega x p by -omega t. */
export function rotatingVelocity(p, v, t) {
  const u = airVelocity(p);
  return toRotating(v[0] - u[0], v[1] - u[1], t);
}

/** Split a vector into the local floor directions at position p: spinward along the circle and up (towards the axis). */
export function localComponents(p, vec) {
  const r = hyp(p[0], p[1]) || 1;
  const rx = p[0] / r;
  const ry = p[1] / r;
  return { spinward: vec[0] * -ry + vec[1] * rx, up: -(vec[0] * rx + vec[1] * ry) };
}

/** Forces on the glider. cl is the pitch demand, throttle 0 to 1. Returns the acceleration and the parts the HUD shows. */
export function gliderForces(p, v, cl, throttle, g = GLIDER) {
  const r = hyp(p[0], p[1]);
  const rx = p[0] / r;
  const ry = p[1] / r;
  const wx = v[0] + OMEGA * p[1]; // velocity relative to the air: v - omega x p, with omega x p = omega (-y, x)
  const wy = v[1] - OMEGA * p[0];
  const V = Math.max(hyp(wx, wy), 0.3);
  const ex = wx / V;
  const ey = wy / V;
  const vt = wx * -ry + wy * rx;
  const sgn = vt >= 0 ? 1 : -1; // upright: lift always has the larger share towards the axis
  const lx = -ey * sgn;
  const ly = ex * sgn;
  const rho = airDensity(r);
  const q = 0.5 * rho * V * V;
  const stalled = cl > g.clMax;
  const clUsed = clamp(cl, g.clMin, g.clMax);
  const lift = q * g.areaM2 * clUsed;
  const drag = q * g.areaM2 * (g.cd0 + g.k * clUsed * clUsed + (stalled ? g.stallExtraCd : 0));
  const thrust = clamp(throttle, 0, 1) * thrustPerThrottle(V, g);
  const along = thrust - drag;
  const ax = (lift * lx + along * ex) / g.massKg;
  const ay = (lift * ly + along * ey) / g.massKg;
  return { a: [ax, ay], V, ex, ey, lx, ly, rx, ry, rho, lift, drag, thrust, stalled, clUsed, lr: lx * rx + ly * ry };
}

/**
 * Acceleration of a free body (the ball by default): air drag only, quadratic in the velocity relative to the local air,
 * F = -1/2 rho(r) CdA |w| w with w = v - omega x p. In vacuum it is zero and the path is a straight line.
 */
export function ballAccel(p, v, drag = true, body = BALL) {
  if (!drag) return [0, 0];
  const r = hyp(p[0], p[1]);
  const wx = v[0] + OMEGA * p[1];
  const wy = v[1] - OMEGA * p[0];
  const V = hyp(wx, wy);
  const k = (0.5 * airDensity(r) * body.cdA * V) / body.massKg;
  return [-k * wx, -k * wy];
}

/**
 * Free bodies for the release lab. Drag areas CdA = Cd x frontal area [EST]: sphere Cd 0.47, cube face-on 1.05 (standard drag
 * coefficient tables); a person spread flat about 0.5 m2, which gives the familiar 50 to 55 m/s terminal speed on Earth at 80 kg.
 */
export const BODIES = {
  ball: { label: 'steel ball', massKg: 20, cdA: 0.0105 },
  parcel: { label: 'cargo parcel', massKg: 10, cdA: 1.05 * 0.3 * 0.3 },
  person: { label: 'person', massKg: 80, cdA: 0.5 },
};

/** Specific angular momentum about the axis (m2/s), positive spinward. Conserved in vacuum; air drag changes it. */
export const angularMomentum = (p, v) => p[0] * v[1] - p[1] * v[0];
/** Share of the local air's spin a body has: 1 turns with the air, 0 is still against the stars, negative turns the other way. */
export const coRotation = (p, v) => { const r2 = p[0] * p[0] + p[1] * p[1]; return r2 > 0 ? angularMomentum(p, v) / (OMEGA * r2) : 0; };

/** First crossing of the floor circle on the straight segment a -> b (0 to 1), or null. Exact for the segment, so vacuum paths land exactly. */
function floorCrossing(a, b) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const A = dx * dx + dy * dy;
  const B = 2 * (a[0] * dx + a[1] * dy);
  const C = a[0] * a[0] + a[1] * a[1] - R * R;
  if (A === 0) return null;
  const disc = B * B - 4 * A * C;
  if (disc < 0) return null;
  const s = (-B + Math.sqrt(disc)) / (2 * A);
  return s >= 0 && s <= 1 ? s : null;
}

/**
 * Release a body hM above the ground, starting at the floor point (0, -r). start: 'corotating' (moving with the floor and the air,
 * like letting go from a tower) or 'still' (motionless against the stars, like a craft at the cancellation point), or an explicit
 * inertial velocity [vx, vy]. Integrates with RK4 and a step that resolves the drag time constant. Returns the inertial path
 * [x, y, t, coRotation], whether and where it lands, and the impact velocity relative to the floor.
 */
export function release({ hM, start = 'corotating', body = BODIES.ball, air = true, tMax = 6000, maxPoints = 1600 } = {}) {
  const r0 = R - hM;
  const p0 = [0, -r0];
  const v0 = Array.isArray(start) ? start.slice() : start === 'still' ? [0, 0] : [OMEGA * r0, 0];
  let p = p0.slice();
  let v = v0.slice();
  let t = 0;
  let theta = 0; // inertial angle swept, unwrapped
  let peakA = 0;
  const raw = [[p[0], p[1], 0, coRotation(p, v)]];
  const accel = (pp, vv) => ballAccel(pp, vv, air, body);
  const finish = (landed, extra = {}) => {
    const stride = Math.max(1, Math.ceil(raw.length / maxPoints));
    const path = raw.filter((_, i) => i % stride === 0 || i === raw.length - 1);
    return { landed, path, p0, v0, peakDragG: peakA / G0, h0: angularMomentum(p0, v0), ...extra };
  };
  if (r0 < 1e-9 && hyp(v[0], v[1]) === 0) return finish(false, { reason: 'axis', tEnd: tMax, pEnd: p, vEnd: v });
  while (t < tMax) {
    const wx = v[0] + OMEGA * p[1];
    const wy = v[1] - OMEGA * p[0];
    const kDrag = air ? (0.5 * airDensity(hyp(p[0], p[1])) * body.cdA * hyp(wx, wy)) / body.massKg : 0;
    peakA = Math.max(peakA, kDrag * hyp(wx, wy));
    const dt = Math.min(0.25, 0.1 / Math.max(kDrag, 1e-9), tMax - t);
    const n = rk4(p, v, accel, dt);
    const s = floorCrossing(p, n.p);
    const a0 = Math.atan2(p[1], p[0]);
    if (s !== null) {
      const pl = [p[0] + s * (n.p[0] - p[0]), p[1] + s * (n.p[1] - p[1])];
      const vl = [v[0] + s * (n.v[0] - v[0]), v[1] + s * (n.v[1] - v[1])];
      const tl = t + s * dt;
      theta += wrap(Math.atan2(pl[1], pl[0]) - a0);
      raw.push([pl[0], pl[1], tl, coRotation(pl, vl)]);
      const u = airVelocity(pl);
      const rel = localComponents(pl, [vl[0] - u[0], vl[1] - u[1]]);
      const shiftRad = theta - OMEGA * tl; // floor angle of the landing minus the floor angle under the release
      return finish(true, {
        fallS: tl, pLand: pl, vLand: vl, theta,
        shiftM: shiftRad * R,
        shiftWrappedM: wrap(shiftRad) * R,
        floorTurns: (OMEGA * tl) / (2 * Math.PI),
        impactMs: hyp(rel.spinward, rel.up),
        impactAlongMs: rel.spinward, // floor-relative, positive spinward
        impactIntoMs: -rel.up, // towards the floor
        coRotationAtImpact: coRotation(pl, vl),
        hLand: angularMomentum(pl, vl),
      });
    }
    theta += wrap(Math.atan2(n.p[1], n.p[0]) - a0);
    p = n.p; v = n.v; t += dt;
    raw.push([p[0], p[1], t, coRotation(p, v)]);
  }
  return finish(false, { reason: 'time', tEnd: t, pEnd: p, vEnd: v });
}

/** Vacuum release while turning with the floor at radius r0: a straight line at omega r0. Closed forms for the checks. */
export function vacuumReleaseClosedForm(hM) {
  const r0 = R - hM;
  const fallS = Math.sqrt(R * R - r0 * r0) / (OMEGA * r0);
  const theta = Math.atan2(Math.sqrt(R * R - r0 * r0), r0); // angle swept from the axis
  return { fallS, shiftM: (theta - OMEGA * fallS) * R, impactMs: OMEGA * Math.sqrt(R * R - r0 * r0), impactIntoMs: (OMEGA * r0 * Math.sqrt(R * R - r0 * r0)) / R };
}

// ---------------------------------------------------------------------------------------------- autopilot
export const PILOT = { kh: 0.12, kd: 0.7, kv: 0.6, maxRate: 1.2, maxAcc: 0.8, ke: 0.5, maxGlideRate: 15 }; // height loop 0.35 rad/s critically damped; airspeed time constant 1.7 s

/** Pitch demand and throttle that hold target height and airspeed: inverse dynamics on the radial and along-path equations. */
export function autopilot(p, v, target, last, g = GLIDER) {
  const r = hyp(p[0], p[1]);
  const rx = p[0] / r;
  const ry = p[1] / r;
  const hM = R - r;
  const hDot = -(v[0] * rx + v[1] * ry);
  const vtI = v[0] * -ry + v[1] * rx; // inertial tangential speed
  // Rate-limited height loop: a sink or climb rate command (at most 1.2 m/s), then a vertical acceleration (at most 0.8 m/s2).
  let hDotCmd = clamp((PILOT.kh / PILOT.kd) * (target.hM - hM), -PILOT.maxRate, PILOT.maxRate);
  // No climbing on an empty motor: with full throttle and the airspeed sagging, ask for level flight instead.
  const speed = hyp(v[0] + OMEGA * p[1], v[1] - OMEGA * p[0]);
  if (last.throttle > 0.98 && speed < target.vMs - 0.5) hDotCmd = Math.min(hDotCmd, 0);
  if (target.glide) {
    // Motor off: hold airspeed by trading height. In the frame turning with the air, the only force that does work on the glider
    // besides drag is the centrifugal one (Coriolis is sideways), so the steady sink rate is drag x airspeed / (m omega^2 r).
    const f0 = gliderForces(p, v, last.cl, 0, g);
    const sink = (f0.drag * f0.V) / (g.massKg * OMEGA * OMEGA * r);
    hDotCmd = clamp(-sink - PILOT.ke * (target.vMs - speed), -PILOT.maxGlideRate, PILOT.maxRate);
  }
  const rddDesired = -clamp(PILOT.kd * (hDotCmd - hDot), -PILOT.maxAcc, PILOT.maxAcc);
  const aRadial = rddDesired - (vtI * vtI) / r; // a . rhat that gives the wanted r double dot
  let cl = last.cl;
  let throttle = last.throttle;
  for (let i = 0; i < 3; i++) {
    const f = gliderForces(p, v, cl, 0, g);
    const q = 0.5 * f.rho * f.V * f.V;
    const clUsed = clamp(cl, g.clMin, g.clMax);
    const drag = q * g.areaM2 * (g.cd0 + g.k * clUsed * clUsed);
    const eR = f.ex * rx + f.ey * ry;
    const tReq = drag - g.massKg * OMEGA * OMEGA * r * eR + g.massKg * PILOT.kv * (target.vMs - f.V);
    throttle = target.glide ? 0 : clamp(tReq / thrustPerThrottle(f.V, g), 0, 1);
    const thrust = throttle * thrustPerThrottle(f.V, g);
    if (Math.abs(f.lr) > 0.3) {
      const liftReq = (g.massKg * aRadial - (thrust - drag) * eR) / f.lr;
      cl = clamp(liftReq / (q * g.areaM2), g.clMin, g.clMax + 0.3);
    }
  }
  return { cl, throttle };
}

// ---------------------------------------------------------------------------------------------- integrator
function rk4(p, v, accel, dt) {
  const f = (pp, vv) => accel(pp, vv);
  const a1 = f(p, v);
  const p2 = [p[0] + 0.5 * dt * v[0], p[1] + 0.5 * dt * v[1]];
  const v2 = [v[0] + 0.5 * dt * a1[0], v[1] + 0.5 * dt * a1[1]];
  const a2 = f(p2, v2);
  const p3 = [p[0] + 0.5 * dt * v2[0], p[1] + 0.5 * dt * v2[1]];
  const v3 = [v[0] + 0.5 * dt * a2[0], v[1] + 0.5 * dt * a2[1]];
  const a3 = f(p3, v3);
  const p4 = [p[0] + dt * v3[0], p[1] + dt * v3[1]];
  const v4 = [v[0] + dt * a3[0], v[1] + dt * a3[1]];
  const a4 = f(p4, v4);
  return {
    p: [p[0] + (dt / 6) * (v[0] + 2 * v2[0] + 2 * v3[0] + v4[0]), p[1] + (dt / 6) * (v[1] + 2 * v2[1] + 2 * v3[1] + v4[1])],
    v: [v[0] + (dt / 6) * (a1[0] + 2 * a2[0] + 2 * a3[0] + a4[0]), v[1] + (dt / 6) * (a1[1] + 2 * a2[1] + 2 * a3[1] + a4[1])],
  };
}

/** Where the floor point under an inertial position is, as an angle in the rotating frame (radians, positive spinward). */
export const floorAngle = (p, t) => Math.atan2(p[1], p[0]) - OMEGA * t;
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));

/** Ball released at p with velocity v at time t0. Integrates to the floor. Returns the landing relative to the point below the release. */
export function dropBall(p0, v0, t0 = 0, { drag = true, dt = 0.02 } = {}) {
  let p = p0;
  let v = v0;
  let t = 0;
  const path = [[p0[0], p0[1], t0]];
  for (let i = 0; i < 20000; i++) {
    const n = rk4(p, v, (pp, vv) => ballAccel(pp, vv, drag), dt);
    const r1 = hyp(n.p[0], n.p[1]);
    if (r1 >= R) {
      const r0 = hyp(p[0], p[1]);
      const f = (R - r0) / (r1 - r0);
      const pl = [p[0] + f * (n.p[0] - p[0]), p[1] + f * (n.p[1] - p[1])];
      const tl = t + f * dt;
      path.push([pl[0], pl[1], t0 + tl]);
      // Inertial angle swept by the straight fall (under half a turn) minus the angle the floor turns meanwhile: not wrapped, so a long
      // fall near the axis reports the true lag, which can be most of the way round the floor.
      const dIn = wrap(Math.atan2(pl[1], pl[0]) - Math.atan2(p0[1], p0[0]));
      const shift = dIn - OMEGA * tl;
      return { fallS: tl, shiftM: shift * R, pLand: pl, path, impactMs: hyp(n.v[0] + OMEGA * n.p[1], n.v[1] - OMEGA * n.p[0]) };
    }
    p = n.p; v = n.v; t += dt;
    if (i % 5 === 0) path.push([p[0], p[1], t0 + t]);
  }
  return null;
}

/** A ball let go at rest relative to the floor, hM above the ground. */
export function dropFromRest(hM, opts) {
  const r = R - hM;
  const p0 = [0, -r];
  const v0 = [OMEGA * r, 0];
  return dropBall(p0, v0, 0, opts);
}

/** The same fall on Earth, for comparison. */
export const earthFall = (hM) => Math.sqrt((2 * hM) / G0);

/** +1 if the motion relative to the air is spinward, -1 if antispinward (for the level-flight comparison). */
function sideAlong(p, v) {
  const u = airVelocity(p);
  return localComponents(p, [v[0] - u[0], v[1] - u[1]]).spinward >= 0 ? 1 : -1;
}

// ---------------------------------------------------------------------------------------------- the flight
export class Flight {
  /** hM: start height; vMs: airspeed; side: +1 spinward, -1 antispinward. Starts upright in level flight at the floor point (0, -r). */
  constructor({ hM = 300, vMs = 14, side = 1, hold = true } = {}) {
    const r = R - hM;
    this.t = 0;
    this.p = [0, -r];
    this.v = [OMEGA * r + side * vMs, 0];
    this.target = { hM, vMs };
    this.side = side;
    this.hold = hold;
    this.cl = levelFlight(hM, vMs, side).cl;
    this.throttle = clamp(levelFlight(hM, vMs, side).shaftW / GLIDER.motorW, 0, 1);
    this.ended = null; // 'touchdown' | 'hub'
    this.ball = null;
    this.landing = null;
    this.trail = [[this.p[0], this.p[1], 0]]; // [x, y, t] inertial, every 0.1 s
    this.felt = [0, 0];
    this.last = gliderForces(this.p, this.v, this.cl, this.throttle);
    this.felt = this.last.a;
  }

  get hM() { return R - hyp(this.p[0], this.p[1]); }

  /** Motor stops: the autopilot (if on) now holds airspeed by gliding down instead of holding height. */
  cutMotor() {
    this.motorOff = true;
    this.throttle = 0;
    this.target = { ...this.target, glide: true };
  }

  /** Releases the ball with the glider's own velocity. */
  drop() {
    if (this.ended) return;
    this.landing = null;
    this.ball = { p: this.p.slice(), v: this.v.slice(), t0: this.t, release: this.p.slice(), path: [[this.p[0], this.p[1], this.t]], done: false };
  }

  step(dt) {
    if (this.ended) return;
    if (this.hold) {
      const c = autopilot(this.p, this.v, this.target, { cl: this.cl, throttle: this.throttle });
      this.cl = c.cl; this.throttle = c.throttle;
    }
    if (this.motorOff) this.throttle = 0;
    const cl = this.cl;
    const th = this.throttle;
    const n = rk4(this.p, this.v, (pp, vv) => gliderForces(pp, vv, cl, th).a, dt);
    const f = gliderForces(this.p, this.v, cl, th);
    this.last = f;
    this.felt = f.a;
    this.p = n.p; this.v = n.v; this.t += dt;
    const r = hyp(this.p[0], this.p[1]);
    if (r >= R) { this.ended = 'touchdown'; this.p = [this.p[0] * R / r, this.p[1] * R / r]; }
    else if (r < 25) this.ended = 'hub';
    if (Math.floor(this.t / 0.1) !== Math.floor((this.t - dt) / 0.1)) { this.trail.push([this.p[0], this.p[1], this.t]); if (this.trail.length > 1500) this.trail.shift(); }
    if (this.ball && !this.ball.done) {
      const b = this.ball;
      const nb = rk4(b.p, b.v, ballAccel, dt);
      const rb = hyp(nb.p[0], nb.p[1]);
      if (rb >= R) {
        const r0 = hyp(b.p[0], b.p[1]);
        const fr = (R - r0) / (rb - r0);
        const pl = [b.p[0] + fr * (nb.p[0] - b.p[0]), b.p[1] + fr * (nb.p[1] - b.p[1])];
        const tl = this.t - dt + fr * dt;
        b.p = pl; b.done = true; b.path.push([pl[0], pl[1], tl]);
        const dIn = wrap(Math.atan2(pl[1], pl[0]) - Math.atan2(b.release[1], b.release[0]));
        const shift = (dIn - OMEGA * (tl - b.t0)) * R;
        const rest = dropFromRest(R - hyp(b.release[0], b.release[1]));
        this.landing = {
          fallS: tl - b.t0, shiftM: shift,
          restShiftM: rest ? rest.shiftM : NaN, restFallS: rest ? rest.fallS : NaN,
          floorAngle: floorAngle(pl, tl), releaseFloorAngle: floorAngle(b.release, b.t0),
        };
      } else {
        b.p = nb.p; b.v = nb.v;
        if (Math.floor(this.t / 0.1) !== Math.floor((this.t - dt) / 0.1)) b.path.push([b.p[0], b.p[1], this.t]);
      }
    }
  }

  /** Numbers for the HUD. */
  telemetry() {
    const f = this.last ?? gliderForces(this.p, this.v, this.cl, this.throttle);
    const sh = f.thrust * f.V / GLIDER.propEff;
    return {
      t: this.t, hM: this.hM, V: f.V, feltG: hyp(this.felt[0], this.felt[1]) / G0,
      cl: f.clUsed, stalled: f.stalled, throttle: this.throttle, shaftW: sh,
      standingG: (OMEGA * OMEGA * hyp(this.p[0], this.p[1])) / G0,
      levelG: requiredAccel(hyp(this.p[0], this.p[1]), f.V, sideAlong(this.p, this.v)) / G0,
      vectors: this.vectors(),
      motorOff: !!this.motorOff,
    };
  }

  /** The three velocities in local floor directions (spinward, up): the air here, the glider relative to the air, and relative to the stars. */
  vectors() {
    const u = airVelocity(this.p);
    return {
      air: localComponents(this.p, u),
      rel: localComponents(this.p, [this.v[0] - u[0], this.v[1] - u[1]]),
      inertial: localComponents(this.p, this.v),
    };
  }
}
