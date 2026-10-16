// Pure physics for the Concordia site widgets. No DOM, no globals: node can import this (scripts/site/widgets-test.mjs).
// Reference values: docs/site/facts.md sections 2, 3, 5, 6 and 7.

export const G0 = 9.80665; // m/s2
export const SIGMA = 5.670374e-8; // W/m2/K4

export const CONCORDIA = {
  radiusM: 2500,
  omega: 0.0626, // rad/s, habitation rotors
  metroRadiusM: 2455, // metro rail head
  hullLengthM: 21000, // lever arm between the two hull ends
  rotorL: 1.17e17, // N m s per rotor: 3e11 kg x 2,500 m squared x 0.0626 rad/s
  industrialL: 1.9e16, // N m s, retrograde
  ringCapL: 2.1e16, // N m s: 6.3 Mt holds 1.9e16, about 7 Mt with trim headroom
  netBand: 0.001, // PHY MOMENTUM_NET_BAND, fraction of the four-rotor magnitude
  radiatorPanelsM2: 248 * 400 * 200, // 248 panel modules of 400 x 200 m
  launchAccelG: 1.5,
  launchLengthM: 10000,
};

export const PITCH_M2 = 105 * 68; // a football pitch

const TAU = 2 * Math.PI;
export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
export const rpmOf = (omega) => (60 * omega) / TAU;

// ---------------------------------------------------------------------------------------------- spin
export function spinDesign(radiusM, gTarget, personM = 1.8, walkMs = 1.4) {
  const omega = Math.sqrt((gTarget * G0) / radiusM);
  const gradientG = (omega * omega * personM) / G0;
  const coriolisMs2 = 2 * omega * walkMs;
  return {
    omega,
    rpm: rpmOf(omega),
    periodS: TAU / omega,
    rimSpeedMs: omega * radiusM,
    gradientG,
    gradientPct: (gradientG / gTarget) * 100,
    coriolisMs2,
    coriolisG: coriolisMs2 / G0,
    coriolisPctOfLocal: (coriolisMs2 / G0 / gTarget) * 100,
  };
}

// Globus and Hall 2017, "Space Settlement Population Rotation Tolerance", NSS Space Settlement Journal, recommendations 1 to 4.
export function comfortBand(rpm) {
  if (rpm <= 2) return { id: 1, upTo: 2, text: 'Up to 2 rpm: expected to be no problem for residents, with little adaptation for visitors.' };
  if (rpm <= 4) return { id: 2, upTo: 4, text: '2 to 4 rpm: expected to be no problem for residents; visitors need some training or a few hours to a day.' };
  if (rpm <= 6) return { id: 3, upTo: 6, text: '4 to 6 rpm: unlikely to trouble residents; visitors may need days, and susceptible people may struggle.' };
  return { id: 4, upTo: 30, text: 'Above 6 rpm: adaptation has been achieved only with specific training, and few would want to live there permanently.' };
}

// ---------------------------------------------------------------------------------------------- gravity versus height
export function radiusAtHeight(hM) { return CONCORDIA.radiusM - hM; }
export function gravityAtHeight(hM) { return (CONCORDIA.omega ** 2 * radiusAtHeight(hM)) / G0; }

// from/to are heights above the ground in a Concordia rotor (m).
export const LANDMARKS = [
  { id: 'ground', name: 'Ground', from: 0, to: 0, note: 'Street level and the groundside residential band (to 150 m).' },
  { id: 'sky', name: 'Sky', from: 450, to: 450, note: 'The artificial sky and its windows, 450 m up.' },
  { id: 'plates', name: 'Plates', from: 625, to: 800, note: 'The plate quarters hung from the 625 m ring beam, up to 800 m.' },
  { id: 'farms', name: 'Farms', from: 1000, to: 1000, note: 'Crop galleries and process halls on the 1,000 m ring level.' },
  { id: 'frame', name: 'Frame top', from: 1500, to: 1500, note: 'Top of the megaframe: specialist process and crop research.' },
  { id: 'hub', name: 'Hub terminal', from: 2430, to: 2430, note: 'The ascender terminal at the hub, radius 70 m. Transfer to zero g starts here.' },
];

export function landmarkAt(hM, tolM = 25) {
  for (const l of LANDMARKS) {
    if (hM >= l.from - tolM && hM <= l.to + tolM) return { kind: 'at', landmark: l };
  }
  let below = null;
  let above = null;
  for (const l of LANDMARKS) {
    if (l.to < hM) below = l;
    else if (l.from > hM && !above) above = l;
  }
  return { kind: 'between', below, above };
}

// ---------------------------------------------------------------------------------------------- momentum
// spins: +1 prograde, -1 retrograde, rotors 1 to 4. The industrial rotor is retrograde as built.
export function momentumLedger({ spins = [-1, -1, 1, 1], industrial = true, rings = true } = {}) {
  const rotors = spins.map((s) => s * CONCORDIA.rotorL);
  const ind = industrial ? -CONCORDIA.industrialL : 0;
  const subtotal = rotors.reduce((a, b) => a + b, 0) + ind;
  const ringL = rings ? clamp(-subtotal, -CONCORDIA.ringCapL, CONCORDIA.ringCapL) : 0;
  const net = subtotal + ringL;
  const total = 4 * CONCORDIA.rotorL;
  return { rotors, industrial: ind, rings: ringL, net, total, share: Math.abs(net) / total };
}

// Force at each hull end (a couple across the hull length) to slew the station degPerDay: torque = W x L.
export function slewThrust(netL, degPerDay = 1, leverM = CONCORDIA.hullLengthM) {
  const w = (degPerDay * Math.PI) / 180 / 86400;
  const torque = Math.abs(netL) * w;
  return { omega: w, torqueNm: torque, forceN: torque / leverM };
}

// ---------------------------------------------------------------------------------------------- radiators
export function radiatorFlux(tempK, emissivity, sides = 1) { return sides * emissivity * SIGMA * tempK ** 4; }
export function radiatorArea({ powerW, tempK, emissivity = 0.9, sides = 1 }) {
  const flux = radiatorFlux(tempK, emissivity, sides);
  const areaM2 = powerW / flux;
  return {
    fluxWm2: flux,
    areaM2,
    areaKm2: areaM2 / 1e6,
    pitches: areaM2 / PITCH_M2,
    vsConcordia: areaM2 / CONCORDIA.radiatorPanelsM2,
    sideM: Math.sqrt(areaM2),
  };
}

// ---------------------------------------------------------------------------------------------- metro
// Apparent weight of a standing rider: a = (w r +/- v)^2 / r. Travelling spinward adds to the rider's inertial speed.
export function metroWeight(speedKmh, direction) {
  const { omega, metroRadiusM: r } = CONCORDIA;
  const v = speedKmh / 3.6;
  const sign = direction === 'spinward' ? 1 : direction === 'antispinward' ? -1 : 0;
  const a = (omega * r + sign * v) ** 2 / r;
  const cor = sign === 0 ? 0 : 2 * omega * v;
  return { speedMs: v, weightG: a / G0, weightMs2: a, coriolisMs2: cor, coriolisG: cor / G0 };
}

// ---------------------------------------------------------------------------------------------- launch track
export function launchRun(accelG, lengthM) {
  const a = accelG * G0;
  const t = Math.sqrt((2 * lengthM) / a);
  const v = a * t;
  return { accelMs2: a, timeS: t, exitSpeedMs: v, energyPerTonneJ: ((v * v) / 2) * 1000 };
}
export const speedAt = (accelG, distM) => Math.sqrt(2 * accelG * G0 * distM);

// ---------------------------------------------------------------------------------------------- hull breach
// Choked flow of air into vacuum through a hole (docs/site/facts.md section 15). Mass falls as exp(-t / tau) at constant temperature,
// because choked flow is proportional to pressure. airKg defaults to one rotor's air, 45 Mt (facts section 2, Atmosphere).
export const AIR_GAMMA = 1.4;
export const AIR_R = 287; // J/kg/K
export const ROTOR_AIR_KG = 4.5e10;
/** Mass flux of air through a choked opening, kg/s per m2, at discharge coefficient 1. */
export function chokedFlux(pPa = 101325, tK = 293) {
  const g = AIR_GAMMA;
  return pPa * Math.sqrt(g / (AIR_R * tK)) * Math.pow(2 / (g + 1), (g + 1) / (2 * (g - 1)));
}
export function breachRate({ holeM2, cd = 0.8, pPa = 101325, tK = 293, airKg = ROTOR_AIR_KG }) {
  const flowKgS = chokedFlux(pPa, tK) * cd * holeM2; // at the start; it falls with the pressure
  const tauS = airKg / flowKgS;
  const lose = (frac) => -Math.log(1 - frac) * tauS;
  return {
    flowKgS,
    tauS,
    t1S: lose(0.01),
    t10S: lose(0.1),
    // hole that drops the pressure 1 percent in one day at this Cd
    oneDayM2: (-Math.log(0.99) * airKg) / (chokedFlux(pPa, tK) * cd * 86400),
  };
}
