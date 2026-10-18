// Pure physics of the skyhook half-turn widget (no DOM). A plain-JavaScript port of src/skyhook-kinematics.ts (the site cannot import TypeScript),
// checked against the same numbers by scripts/site/widgets-test.mjs and docs/specs/earth-arrival-skyhook-output.txt.
// Planar, two-body, kilometres and kilometres per second. Time `tau` is seconds since the capture. Earth's centre is the origin; the capture
// happens on the +x axis and the orbit runs counter-clockwise (toward +y there).

export const EARTH_RADIUS_KM = 6371.0;
export const EARTH_GM_KM3_S2 = 398600.44;
export const G0_KM_S2 = 9.80665e-3;
/** The Concordia skyhook (docs/specs/earth-arrival-skyhook-spec.md section 1). */
export const SKYHOOK = { hubAltitudeKm: 450, armKm: 300, halfTurnSeconds: 480, stationPerigeeKm: 950, entryInterfaceKm: 120 };

const TAU = 2 * Math.PI;
const wrapPi = (a) => a - TAU * Math.round(a / TAU);

export const speedOf = (s) => Math.hypot(s.vx, s.vy);
export const radiusOf = (s) => Math.hypot(s.x, s.y);

function eccentricAnomaly(mean, e) {
  let x = e < 0.8 ? mean : Math.PI * Math.sign(mean || 1);
  for (let i = 0; i < 60; i++) {
    const dx = (x - e * Math.sin(x) - mean) / (1 - e * Math.cos(x));
    x -= dx;
    if (Math.abs(dx) < 1e-13) break;
  }
  return x;
}

/** The Kepler conic through state `s` at time `t0`. */
export function conicFromState(s, t0 = 0) {
  const sense = s.x * s.vy - s.y * s.vx >= 0 ? 1 : -1;
  const y = s.y * sense;
  const vy = s.vy * sense;
  const r = Math.hypot(s.x, y);
  const v2 = s.vx * s.vx + vy * vy;
  const rv = s.x * s.vx + y * vy;
  const ex = ((v2 - EARTH_GM_KM3_S2 / r) * s.x - rv * s.vx) / EARTH_GM_KM3_S2;
  const ey = ((v2 - EARTH_GM_KM3_S2 / r) * y - rv * vy) / EARTH_GM_KM3_S2;
  const e = Math.hypot(ex, ey);
  const a = -EARTH_GM_KM3_S2 / (v2 - (2 * EARTH_GM_KM3_S2) / r);
  const omega = e > 1e-12 ? Math.atan2(ey, ex) : Math.atan2(y, s.x);
  const nu = wrapPi(Math.atan2(y, s.x) - omega);
  const ecc = 2 * Math.atan2(Math.sqrt(1 - e) * Math.sin(nu / 2), Math.sqrt(1 + e) * Math.cos(nu / 2));
  const meanMotion = Math.sqrt(EARTH_GM_KM3_S2 / (a * a * a));
  return { t0, a, e, omega, sense, mean0: ecc - e * Math.sin(ecc), meanMotion, perigeeKm: a * (1 - e), apogeeKm: a * (1 + e), periodSeconds: TAU / meanMotion };
}

/** The state on conic `c` at time `t`. */
export function conicState(c, t) {
  const mean = wrapPi(c.mean0 + c.meanMotion * (t - c.t0));
  const ecc = eccentricAnomaly(mean, c.e);
  const cosE = Math.cos(ecc);
  const sinE = Math.sin(ecc);
  const root = Math.sqrt(1 - c.e * c.e);
  const k = 1 / (1 - c.e * cosE);
  const px = c.a * (cosE - c.e);
  const py = c.a * root * sinE;
  const pvx = -c.a * c.meanMotion * sinE * k;
  const pvy = c.a * c.meanMotion * root * cosE * k;
  const co = Math.cos(c.omega);
  const so = Math.sin(c.omega);
  return { x: co * px - so * py, y: c.sense * (so * px + co * py), vx: co * pvx - so * pvy, vy: c.sense * (so * pvx + co * pvy) };
}

/** Speed (km/s) and flight-path angle (degrees, negative while descending) where conic `c` is at `radiusKm`. */
export function atRadius(c, radiusKm) {
  const speedKmS = Math.sqrt(2 * (-EARTH_GM_KM3_S2 / (2 * c.a) + EARTH_GM_KM3_S2 / radiusKm));
  const h = Math.sqrt(EARTH_GM_KM3_S2 * c.a * (1 - c.e * c.e));
  return { speedKmS, pathDeg: (-Math.acos(Math.min(1, h / (radiusKm * speedKmS))) * 180) / Math.PI };
}

/** Seconds after the anchor of `c` at which it first reaches `radiusKm` on the descending branch. */
export function secondsToRadius(c, radiusKm) {
  const target = Math.acos(Math.min(1, Math.max(-1, (1 - radiusKm / c.a) / c.e)));
  const ecc = TAU - target;
  const mean = ecc - c.e * Math.sin(ecc);
  const wrap2 = (a) => a - TAU * Math.floor(a / TAU);
  return wrap2(mean - wrap2(c.mean0)) / c.meanMotion;
}

/** Builds the skyhook for a hub altitude, arm length and half-turn time (the defaults are Concordia's). */
export function skyhookModel({ hubAltitudeKm, armKm, halfTurnSeconds, stationPerigeeKm, entryInterfaceKm } = SKYHOOK) {
  const hubRadiusKm = EARTH_RADIUS_KM + hubAltitudeKm;
  const orbitRate = Math.sqrt(EARTH_GM_KM3_S2 / hubRadiusKm ** 3);
  const spinRelative = Math.PI / halfTurnSeconds;
  const spinInertial = spinRelative + orbitRate;
  const phaseOf = (tau, tip) => spinRelative * tau + (tip === 'B' ? Math.PI : 0);
  const hubState = (tau) => {
    const th = orbitRate * tau;
    return { x: hubRadiusKm * Math.cos(th), y: hubRadiusKm * Math.sin(th), vx: -orbitRate * hubRadiusKm * Math.sin(th), vy: orbitRate * hubRadiusKm * Math.cos(th) };
  };
  const tipState = (tau, tip) => {
    const th = orbitRate * tau;
    const ph = phaseOf(tau, tip);
    const hub = hubState(tau);
    const ur = [Math.cos(th), Math.sin(th)];
    const ut = [-Math.sin(th), Math.cos(th)];
    const c = Math.cos(ph);
    const s = Math.sin(ph);
    return {
      x: hub.x + armKm * (c * ur[0] + s * ut[0]), y: hub.y + armKm * (c * ur[1] + s * ut[1]),
      vx: hub.vx + armKm * spinInertial * (-s * ur[0] + c * ut[0]), vy: hub.vy + armKm * spinInertial * (-s * ur[1] + c * ut[1]),
    };
  };
  /** Load on a payload at the tip, in g, pointing away from the hub (the tidal term included). */
  const feltG = (tau, tip) => {
    const t = tipState(tau, tip);
    const hub = hubState(tau);
    const r = radiusOf(t);
    const ax = (-EARTH_GM_KM3_S2 * hub.x) / hubRadiusKm ** 3 - spinInertial ** 2 * (t.x - hub.x);
    const ay = (-EARTH_GM_KM3_S2 * hub.y) / hubRadiusKm ** 3 - spinInertial ** 2 * (t.y - hub.y);
    return Math.hypot(ax + (EARTH_GM_KM3_S2 * t.x) / r ** 3, ay + (EARTH_GM_KM3_S2 * t.y) / r ** 3) / G0_KM_S2;
  };

  const inbound = conicFromState(tipState(0, 'A'), 0); // craft A before capture: perigee state equals the upper tip
  const outboundPre = conicFromState(tipState(0, 'B'), 0); // craft B before capture: apogee state equals the lower tip
  const earthBound = conicFromState(tipState(halfTurnSeconds, 'A'), halfTurnSeconds);
  const outboundPost = conicFromState(tipState(halfTurnSeconds, 'B'), halfTurnSeconds);

  /** Inertial state of craft A (the family, upper tip first, released Earth-bound) or B (from Earth, released outbound). */
  const craftState = (tau, id) => {
    if (tau < 0) return conicState(id === 'A' ? inbound : outboundPre, tau);
    if (tau <= halfTurnSeconds) return tipState(tau, id);
    return conicState(id === 'A' ? earthBound : outboundPost, tau);
  };
  /** The same state in the hub's frame: x forward along the hub's motion, y up away from Earth (km, km/s). Velocities are relative to the hub. */
  const inHubFrame = (tau, s) => {
    const hub = hubState(tau);
    const th = orbitRate * tau;
    const ur = [Math.cos(th), Math.sin(th)];
    const ut = [-Math.sin(th), Math.cos(th)];
    const dx = s.x - hub.x;
    const dy = s.y - hub.y;
    const dvx = s.vx - hub.vx;
    const dvy = s.vy - hub.vy;
    return { x: dx * ut[0] + dy * ut[1], y: dx * ur[0] + dy * ur[1], vx: dvx * ut[0] + dvy * ut[1], vy: dvx * ur[0] + dvy * ur[1] };
  };
  const entry = () => {
    const radius = EARTH_RADIUS_KM + entryInterfaceKm;
    return { ...atRadius(earthBound, radius), secondsAfterRelease: secondsToRadius(earthBound, radius) };
  };
  // The station orbit shares the apogee of the upper release orbit; its perigee is the station's.
  const stationSemiMajor = (outboundPost.apogeeKm + EARTH_RADIUS_KM + stationPerigeeKm) / 2;
  const stationPeriodSeconds = TAU * Math.sqrt(stationSemiMajor ** 3 / EARTH_GM_KM3_S2);

  return {
    hubRadiusKm, armKm, halfTurnSeconds, orbitRate, spinRelative, spinInertial, inbound, outboundPre, earthBound, outboundPost,
    hubState, tipState, feltG, craftState, inHubFrame, entry, phaseOf, stationPeriodSeconds,
    /** Altitude above Earth's surface of an inertial state, km. */
    altitude: (s) => radiusOf(s) - EARTH_RADIUS_KM,
    /** Speed handed across by the time `tau` (km/s): how much craft A has lost, and craft B gained, since the capture. */
    handedAcross: (tau) => speedOf(craftState(0, 'A')) - speedOf(craftState(Math.min(Math.max(tau, 0), halfTurnSeconds), 'A')),
  };
}

/** Clock text for the mission clock: T-00:30, T+04:00. */
export function clock(tau) {
  const t = Math.round(Math.abs(tau));
  return `T${tau < 0 ? '-' : '+'}${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
}
