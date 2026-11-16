// Orbital compute cost model: levelized cost of one kW-year of IT power on the ground and in orbit.
// Pure functions, no DOM: imported by site/js/widgets/orbit-compute.js, scripts/site/widgets-test.mjs and
// scripts/analysis/orbit_compute.mjs (which prints every number the page quotes).
// Spec: docs/specs/space-data-centers-spec.md section 5. Order-of-magnitude model; omissions are listed on the page.

export const SIGMA = 5.670374e-8; // W/m2/K4
export const SOLAR_CONSTANT = 1361; // W/m2 at 1 AU (Kopp and Lean 2011: 1360.8)
export const HOURS_PER_YEAR = 8760;
export const K_BOLTZMANN_EV = 8.617333e-5; // eV/K
export const LOAD_2026_TW = 0.06; // world data center average load, 2026 [DERIVED: IEA 415 TWh in 2024 = 47 GW, at about 15 %/yr]
export const START_YEAR = 2026;
export const ROCKET_ISP_S = 450; // hydrogen upper stage, used for the location launch multiplier
export const G0 = 9.80665;
export const TONNES_PER_LAUNCH = 100;
export const RESIDENT_SERVICING_FACTOR = 0.4; // resident technicians cut annual servicing to 40 % of the uncrewed figure [EST]
export const CHIP_EA_EV = 0.7; // activation energy for the Arrhenius life model (JEDEC JEP122 default range 0.5 to 0.9 eV) [EST]
export const CHIP_REF_JUNCTION_K = 358; // 85 C: physical life is quoted at this junction temperature
export const CHIP_REF_JUNCTION_HOT_K = 423; // 150 C with the high-temperature semiconductor toggle (speculative)
export const JUNCTION_RISE_K = 25; // junction runs about 25 K above the radiator
export const GROUND_JUNCTION_K = 353; // 80 C: liquid-cooled accelerators on the ground [EST: typical 60 to 85 C under load]
export const MAX_RETIREMENT_Y = 30; // the retirement scan never looks past this age

/** Where the orbital plant sits. Delta-v is from low Earth orbit; the multiplier is the rocket equation at ROCKET_ISP_S. */
export const LOCATIONS = {
  sso: { label: 'Sun-synchronous LEO', illumination: 0.98, roundTripS: 0.02, deltaVms: 0 },
  geo: { label: 'Geostationary', illumination: 0.99, roundTripS: 0.24, deltaVms: 4200 },
  l5: { label: 'Earth-Moon L5', illumination: 0.999, roundTripS: 2.56, deltaVms: 3900 },
};
export const locationMultiplier = (loc) => Math.exp((LOCATIONS[loc]?.deltaVms ?? 0) / (ROCKET_ISP_S * G0));

/** Terrestrial ceilings, TW. 'cap' takes the user's capTW. */
export const CEILINGS = {
  cap: { label: 'Political cap', tw: null },
  // 1 % of Earth's 1.49 x 10^14 m2 of land at about 12 W/m2 of average output per m2 of array land (LBNL, US 2019 medians): 18 TW.
  land1: { label: '1 % of land in solar', tw: 18 },
  land10: { label: '10 % of land in solar', tw: 180 },
  sun: { label: 'All sunlight reaching Earth', tw: 173000 },
};

/** Capital recovery factor: the annual payment that repays 1 unit of capital over n years at rate r. */
export function crf(r, n) {
  if (n <= 0) return Infinity;
  if (r === 0) return 1 / n;
  const f = (1 + r) ** n;
  return (r * f) / (f - 1);
}

/** Continuous discount rate equivalent to an annual rate r: e^(-rho t) = (1 + r)^-t. */
export const contRate = (r) => Math.log(1 + r);
/** Capital recovery as a continuous flow: the yearly flow that repays 1 unit over n years at annual rate r. */
export function crfc(r, n) {
  if (n <= 0) return Infinity;
  const p = contRate(r);
  if (p === 0) return 1 / n;
  return p / (1 - Math.exp(-p * n));
}
/** Present value of a unit yearly flow over [0, R] at continuous rate k. */
export const pvFlow = (k, R) => (Math.abs(k * R) < 1e-12 ? R : (1 - Math.exp(-k * R)) / k);
/** Obsolescence rate a: a chip of age t delivers e^(-a t) of the frontier's useful work per watt. */
export const obsolescenceRate = (efficiencyGain) => Math.log(1 + efficiencyGain);
/** Doubling time of useful work per watt, years (Infinity with no gain). */
export const doublingYears = (efficiencyGain) => (efficiencyGain > 0 ? Math.LN2 / Math.log(1 + efficiencyGain) : Infinity);

/**
 * Samir Varma's benchmark (2026-11-15): no discounting, resale or failures. A kW slot costs h a year whatever chip sits in it,
 * a swap costs K, and a chip of age t delivers 2^(-t/D) of the frontier. Minimising (K + h R) over the work delivered gives
 * e^x - 1 - x = (ln 2 / D)(K / h) with x = R ln 2 / D. Returns R in years (Infinity when D is infinite).
 */
export function varmaRetirementAge(K, h, D) {
  if (!Number.isFinite(D)) return Infinity;
  const rhs = (Math.LN2 / D) * (K / h);
  let lo = 0;
  let hi = 1;
  while (Math.exp(hi) - 1 - hi < rhs) hi *= 2;
  for (let i = 0; i < 100; i++) {
    const x = (lo + hi) / 2;
    if (Math.exp(x) - 1 - x < rhs) lo = x; else hi = x;
  }
  return ((lo + hi) / 2) * D / Math.LN2;
}

/**
 * Levelized cost of a kW slot per frontier-equivalent kW-year (a kW-year of work by a new chip), for retirement age R.
 * Cycle of length R, repeated forever (the repeat factor cancels): a swap costs sum(swap) at the start, resale earns
 * resale0 e^(-a R) at the end, flows run at sum(flow) a year (hosting, servicing, repairs), and the slot delivers work
 * e^(-(a + deadRate) t) at age t, where deadRate is the rate at which failed boards stay dead. Everything discounted at rate.
 * Returns the total and its parts by key.
 */
export function slotCost(slot, R, rate) {
  const rho = contRate(rate);
  const disc = Math.exp(-rho * R);
  const work = pvFlow(rho + slot.a + slot.deadRate, R);
  const flowPv = pvFlow(rho, R);
  const parts = {};
  let total = 0;
  const add = (key, pv) => { parts[key] = (parts[key] ?? 0) + pv / work; total += pv / work; };
  for (const [key, amount] of Object.entries(slot.swap)) add(key, amount);
  for (const [key, perYear] of Object.entries(slot.flow)) add(key, perYear * flowPv);
  for (const [key, ratePv] of Object.entries(slot.agedFlow ?? {})) add(key, ratePv * pvFlow(rho + slot.a, R)); // flows that fall with the chip's value
  if (slot.resale0) add(slot.resaleKey ?? 'chips', -slot.resale0 * Math.exp(-slot.a * R) * disc);
  return { total, parts, work };
}

/** The retirement age that minimises slotCost on (0, cap]: a grid scan, then golden-section refinement around the best point. */
export function optimalRetirement(slot, rate, cap) {
  const hi = Math.min(cap, MAX_RETIREMENT_Y);
  const lo = Math.min(0.1, hi);
  const N = 240;
  let best = hi;
  let bestC = slotCost(slot, hi, rate).total;
  for (let i = 0; i <= N; i++) {
    const R = lo + ((hi - lo) * i) / N;
    const c = slotCost(slot, R, rate).total;
    if (c < bestC) { bestC = c; best = R; }
  }
  const step = (hi - lo) / N;
  let a = Math.max(lo, best - step);
  let b = Math.min(hi, best + step);
  const phi = (Math.sqrt(5) - 1) / 2;
  for (let i = 0; i < 40 && b - a > 1e-6; i++) {
    const c1 = b - phi * (b - a);
    const c2 = a + phi * (b - a);
    if (slotCost(slot, c1, rate).total < slotCost(slot, c2, rate).total) b = c2; else a = c1;
  }
  let R = (a + b) / 2;
  if (slotCost(slot, hi, rate).total <= slotCost(slot, R, rate).total) R = hi; // a monotone cost sits on the cap
  return { R, ...slotCost(slot, R, rate), capped: R >= hi - 1e-6 };
}

/** Two-sided panel flux, W/m2: 2 e sigma (T^4 - Tsink^4). */
export const radiatorFlux = (tempK, emissivity, sinkK = 0) => 2 * emissivity * SIGMA * (tempK ** 4 - sinkK ** 4);
/** Radiator area per kW of IT power, m2. Only the electrical power delivered to the chips needs radiating. */
export const radiatorAreaPerKw = (tempK, emissivity, sinkK = 0) => 1000 / radiatorFlux(tempK, emissivity, sinkK);
/** Array area per kW of average IT power, m2. */
export const arrayAreaPerKw = (efficiency, illumination) => 1000 / (SOLAR_CONSTANT * efficiency * illumination);

/** Arrhenius acceleration: life at junction T relative to life at Tref. Ea 0.7 eV is about a halving per 10 K near 350 K. */
export function chipPhysicalLife(refLifeY, junctionK, refJunctionK, eaEv = CHIP_EA_EV) {
  return refLifeY * Math.exp((eaEv / K_BOLTZMANN_EV) * (1 / junctionK - 1 / refJunctionK));
}
/** Temperature rise that halves life near T for a given activation energy (the rule-of-thumb check). */
export const halvingStepK = (tempK, eaEv = CHIP_EA_EV) => (Math.LN2 * K_BOLTZMANN_EV * tempK * tempK) / eaEv;

/** Years until demand at growth g reaches the ceiling, from the 2026 load. */
export function yearsToCeiling(ceilingTW, energyGrowth, loadTW = LOAD_2026_TW) {
  if (ceilingTW <= loadTW) return 0;
  if (energyGrowth <= 0) return Infinity;
  return Math.log(ceilingTW / loadTW) / Math.log(1 + energyGrowth);
}
export const energyGrowthOf = (demandGrowth, efficiencyGain) => (1 + demandGrowth) / (1 + efficiencyGain) - 1;

// ---------------------------------------------------------------------------------------------- inputs
// Every input: key, label, unit, min, max, step, group. Percentages are stored as fractions in the model and shown as % in the UI.
export const INPUTS = [
  // Economy
  { key: 'rate', group: 'economy', label: 'Discount rate', unit: '%', pct: true, min: 0, max: 20, step: 0.5 },
  { key: 'chipCost', group: 'economy', label: 'Chip cost per watt of IT power', unit: '$/W', min: 1, max: 80, step: 0.5 },
  { key: 'demandGrowth', group: 'economy', label: 'Compute demand growth', unit: '%/yr', pct: true, min: 0, max: 100, step: 1 },
  { key: 'efficiencyGain', group: 'economy', label: 'Efficiency gain of new chips (work per watt)', unit: '%/yr', pct: true, min: 0, max: 60, step: 1 },
  { key: 'failRate', group: 'economy', label: 'Board failure rate at 85 °C junction', unit: '%/yr', pct: true, min: 0, max: 30, step: 0.5 },
  { key: 'ceiling', group: 'economy', label: 'Terrestrial ceiling', kind: 'choice', options: Object.keys(CEILINGS) },
  { key: 'capTW', group: 'economy', label: 'Political cap', unit: 'TW', min: 0.1, max: 100, step: 0.1, log: true },
  { key: 'premium', group: 'economy', label: 'Scarcity premium once the ceiling binds', unit: '%', pct: true, min: 0, max: 500, step: 5 },
  // Ground
  { key: 'facility', group: 'ground', label: 'Facility capex', unit: '$/W', min: 1, max: 30, step: 0.5 },
  { key: 'price', group: 'ground', label: 'Electricity price', unit: '$/kWh', min: 0.01, max: 0.3, step: 0.005 },
  { key: 'surcharge', group: 'ground', label: 'Siting surcharge or tax', unit: '$/kWh', min: 0, max: 0.5, step: 0.005 },
  { key: 'pue', group: 'ground', label: 'PUE', unit: '', min: 1, max: 2, step: 0.01 },
  { key: 'resale', group: 'ground', label: 'Used-chip price per unit of remaining work', unit: '% of new', pct: true, min: 0, max: 150, step: 5 },
  // Orbit
  { key: 'location', group: 'orbit', label: 'Location', kind: 'choice', options: Object.keys(LOCATIONS) },
  { key: 'launch', group: 'orbit', label: 'Launch price to LEO', unit: '$/kg', min: 10, max: 10000, step: 10, log: true },
  { key: 'spaceShare', group: 'orbit', label: 'Non-chip mass made in space', unit: '%', pct: true, min: 0, max: 100, step: 1 },
  { key: 'spaceCost', group: 'orbit', label: 'Delivered cost of space-made mass', unit: '$/kg', min: 0.5, max: 5000, step: 0.5, log: true },
  { key: 'mArray', group: 'orbit', label: 'Solar array', unit: 'kg/kW', min: 0.5, max: 100, step: 0.5 },
  { key: 'mCompute', group: 'orbit', label: 'Compute payload (chips, boards, power supplies)', unit: 'kg/kW', min: 1, max: 40, step: 0.5 },
  { key: 'mStruct', group: 'orbit', label: 'Structure and shielding', unit: 'kg/kW', min: 0, max: 200, step: 0.5 },
  { key: 'radTemp', group: 'orbit', label: 'Radiator temperature', unit: 'K', min: 280, max: 500, step: 1 },
  { key: 'emissivity', group: 'orbit', label: 'Radiator emissivity', unit: '', min: 0.5, max: 1, step: 0.01 },
  { key: 'radDensity', group: 'orbit', label: 'Radiator areal density', unit: 'kg/m²', min: 0.5, max: 30, step: 0.5 },
  { key: 'cellEff', group: 'orbit', label: 'Solar array efficiency (system)', unit: '%', pct: true, min: 10, max: 50, step: 0.5 },
  { key: 'hwCost', group: 'orbit', label: 'Power and thermal hardware', unit: '$/W', min: 0.1, max: 100, step: 0.1, log: true },
  { key: 'qual', group: 'orbit', label: 'Space-qualification multiplier on chips', unit: '×', min: 1, max: 5, step: 0.05 },
  { key: 'refLife', group: 'orbit', label: 'Chip wear-out life at 85 °C junction (both sides)', unit: 'years', min: 1, max: 30, step: 0.5 },
  { key: 'hotChips', group: 'orbit', label: 'High-temperature semiconductors (rated to 150 °C)', kind: 'bool' },
  { key: 'infraLife', group: 'orbit', label: 'Power, thermal and structure life', unit: 'years', min: 3, max: 50, step: 1 },
  { key: 'servicing', group: 'orbit', label: 'Annual servicing', unit: '% of capex', pct: true, min: 0, max: 20, step: 0.25 },
  { key: 'swapCharge', group: 'orbit', label: 'Per-swap charge (install, disposal)', unit: '% of chip block', pct: true, min: 0, max: 100, step: 1 },
  { key: 'residents', group: 'orbit', label: 'Resident technicians', kind: 'bool' },
  // Scale
  { key: 'scaleGW', group: 'scale', label: 'Installed IT power', unit: 'GW', min: 0.01, max: 1000, step: 0.01, log: true },
];

// ---------------------------------------------------------------------------------------------- presets
// Values only. Sources for each default live in SOURCES (keyed by input key and preset) and in docs/specs/space-data-centers-sources.md.
export const PRESETS = {
  today: {
    label: 'Today (2026)',
    v: {
      rate: 0.10, chipCost: 35, demandGrowth: 0.45, efficiencyGain: 0.26, failRate: 0.05, ceiling: 'land1', capTW: 1, premium: 0.5,
      facility: 17.6, price: 0.05, surcharge: 0, pue: 1.2, resale: 0.5,
      location: 'sso', launch: 3000, spaceShare: 0, spaceCost: 1000,
      mArray: 10, mCompute: 13, mStruct: 4, radTemp: 330, emissivity: 0.9, radDensity: 5, cellEff: 0.25,
      hwCost: 5, qual: 1.2, refLife: 10, hotChips: false, infraLife: 10, servicing: 0.02, swapCharge: 0, residents: false, scaleGW: 1,
    },
  },
  cheap: {
    label: 'Cheap launch',
    v: {
      rate: 0.10, chipCost: 35, demandGrowth: 0.45, efficiencyGain: 0.26, failRate: 0.05, ceiling: 'land1', capTW: 1, premium: 0.5,
      facility: 17.6, price: 0.05, surcharge: 0, pue: 1.2, resale: 0.5,
      location: 'sso', launch: 200, spaceShare: 0, spaceCost: 1000,
      mArray: 3, mCompute: 5, mStruct: 1, radTemp: 330, emissivity: 0.9, radDensity: 2, cellEff: 0.25,
      hwCost: 5, qual: 1.2, refLife: 10, hotChips: false, infraLife: 10, servicing: 0.02, swapCharge: 0, residents: false, scaleGW: 1,
    },
  },
  concordia: {
    label: 'Concordia era',
    v: {
      rate: 0.06, chipCost: 10, demandGrowth: 0.365, efficiencyGain: 0.05, failRate: 0.05, ceiling: 'cap', capTW: 1, premium: 1,
      facility: 11, price: 0.05, surcharge: 0.03, pue: 1.2, resale: 0.5,
      location: 'l5', launch: 100, spaceShare: 0.98, spaceCost: 3,
      mArray: 10, mCompute: 5, mStruct: 50, radTemp: 330, emissivity: 0.9, radDensity: 5, cellEff: 0.25,
      hwCost: 0.6, qual: 1, refLife: 10, hotChips: false, infraLife: 30, servicing: 0.02, swapCharge: 0, residents: true, scaleGW: 200,
    },
  },
};

// ---------------------------------------------------------------------------------------------- model
export const COMPONENTS = {
  ground: [
    { key: 'chips', label: 'Chips' },
    { key: 'facility', label: 'Facility' },
    { key: 'energy', label: 'Energy and siting' },
  ],
  orbit: [
    { key: 'chips', label: 'Buying the chips' },
    { key: 'computeLaunch', label: 'Launching the chips' },
    { key: 'infraMass', label: 'Delivering the array, radiator and structure' },
    { key: 'hardware', label: 'Building the power and thermal hardware' },
    { key: 'servicing', label: 'Servicing' },
  ],
};

/** Ground wear-out life: Arrhenius at the ground junction (the high-temperature toggle is orbit-only). */
export const groundPhysLife = (v) => chipPhysicalLife(v.refLife, GROUND_JUNCTION_K, CHIP_REF_JUNCTION_K);

/**
 * The ground slot: chips swapped every R years and resold at the used price for their remaining work, failed boards
 * replaced from the used market (a like-for-like board of the same age), facility and energy as hosting.
 * Ground chips run at GROUND_JUNCTION_K; wear-out caps the age and Arrhenius scales the failure rate, as in orbit.
 */
export function groundSlot(v) {
  const chipCapex = v.chipCost * 1000;
  return {
    a: obsolescenceRate(v.efficiencyGain),
    deadRate: 0,
    swap: { chips: chipCapex },
    flow: {
      facility: crfc(v.rate, 20) * v.facility * 1000,
      energy: HOURS_PER_YEAR * v.pue * (v.price + v.surcharge),
    },
    agedFlow: { chips: (v.failRate ?? 0) * (v.refLife / groundPhysLife(v)) * (v.resale ?? 0) * chipCapex },
    resale0: (v.resale ?? 0) * chipCapex,
    cap: groundPhysLife(v),
  };
}

/** Levelized ground cost per frontier-equivalent kW-year, at its own optimal retirement age. */
export function groundCost(v) {
  const slot = groundSlot(v);
  const opt = optimalRetirement(slot, v.rate, slot.cap);
  const parts = { chips: opt.parts.chips ?? 0, facility: opt.parts.facility ?? 0, energy: opt.parts.energy ?? 0 };
  return {
    parts,
    total: opt.total,
    retireAge: opt.R,
    capped: opt.capped,
    chipCapex: slot.swap.chips,
    hostingPerYear: slot.flow.facility + slot.flow.energy,
    workShare: opt.work / pvFlow(contRate(v.rate), opt.R), // discounted work delivered relative to always-new chips
  };
}

/** Orbital physical constants for a parameter set (independent of launch price). */
function orbitGeometry(v) {
  const loc = LOCATIONS[v.location];
  const radAreaKw = radiatorAreaPerKw(v.radTemp, v.emissivity);
  const mRad = radAreaKw * v.radDensity;
  const mArrayAvg = v.mArray / loc.illumination; // the array is sized for average output
  const mInfra = mArrayAvg + mRad + v.mStruct;
  const junctionK = v.radTemp + JUNCTION_RISE_K;
  const refJ = v.hotChips ? CHIP_REF_JUNCTION_HOT_K : CHIP_REF_JUNCTION_K;
  const physLife = chipPhysicalLife(v.refLife, junctionK, refJ);
  // Arrhenius as a reliability input: the random failure rate scales by the same acceleration factor as wear-out.
  const accel = v.refLife / physLife;
  return { loc, radAreaKw, mRad, mInfra, junctionK, physLife, accel, mult: locationMultiplier(v.location) };
}

/**
 * The orbital slot at launch price P. A swap buys and launches the chips (plus the per-swap charge); resale is zero.
 * Hosting is the array, radiator, structure and hardware, annualised over their life, plus annual servicing.
 * Without resident technicians failed boards stay dead until the next swap; with them, spares are launched and fitted.
 */
export function orbitSlot(v, P, geo = orbitGeometry(v)) {
  const chipCapex = v.chipCost * 1000 * v.qual;
  const chipLaunch = v.mCompute * geo.mult * P;
  const infraCapex = geo.mInfra * v.spaceShare * v.spaceCost + geo.mInfra * (1 - v.spaceShare) * geo.mult * P;
  const hwCapex = v.hwCost * 1000;
  const servRate = v.servicing * (v.residents ? RESIDENT_SERVICING_FACTOR : 1);
  const crfInfra = crfc(v.rate, v.infraLife);
  const capex = chipCapex + chipLaunch + infraCapex + hwCapex;
  const fail = (v.failRate ?? 0) * geo.accel;
  const swapCharge = (v.swapCharge ?? 0) * (chipCapex + chipLaunch);
  return {
    a: obsolescenceRate(v.efficiencyGain),
    deadRate: v.residents ? 0 : fail,
    swap: { chips: chipCapex, computeLaunch: chipLaunch, servicing: swapCharge },
    flow: {
      infraMass: crfInfra * infraCapex,
      hardware: crfInfra * hwCapex,
      servicing: servRate * capex,
      chips: v.residents ? fail * chipCapex : 0,
      computeLaunch: v.residents ? fail * chipLaunch : 0,
    },
    resale0: 0,
    cap: Math.min(geo.physLife, MAX_RETIREMENT_Y),
    chipBlock: chipCapex + chipLaunch + swapCharge,
    infraBlock: infraCapex + hwCapex,
    capex,
    servRate,
    fail,
    // Power cost: what the array, radiator, structure and their hardware cost per kWh delivered, servicing included.
    powerPerKwh: (crfInfra * (infraCapex + hwCapex) + servRate * (infraCapex + hwCapex)) / HOURS_PER_YEAR,
  };
}

/** Levelized orbital cost per frontier-equivalent kW-year at launch price P, at its own optimal retirement age. */
export function orbitTotalAt(v, P, geo = orbitGeometry(v)) {
  const slot = orbitSlot(v, P, geo);
  return optimalRetirement(slot, v.rate, slot.cap).total;
}

/** Orbit cost at v.launch, with parts, the retirement age, and the cost at free launch (a). */
export function orbitCost(v) {
  const geo = orbitGeometry(v);
  const slot = orbitSlot(v, v.launch, geo);
  const opt = optimalRetirement(slot, v.rate, slot.cap);
  const keys = ['chips', 'computeLaunch', 'infraMass', 'hardware', 'servicing'];
  const parts = Object.fromEntries(keys.map((k) => [k, opt.parts[k] ?? 0]));
  return {
    parts,
    total: opt.total,
    a: orbitTotalAt(v, 0, geo),
    capex: slot.capex,
    chipBlock: slot.chipBlock,
    infraBlock: slot.infraBlock,
    powerPerKwh: slot.powerPerKwh,
    mult: geo.mult,
    radAreaKw: geo.radAreaKw,
    arrayAreaKw: arrayAreaPerKw(v.cellEff, geo.loc.illumination),
    mRad: geo.mRad,
    mInfra: geo.mInfra,
    massKw: geo.mInfra + v.mCompute,
    junctionK: geo.junctionK,
    physLife: geo.physLife,
    orbitLife: opt.R,
    capped: opt.capped,
    failRate: slot.fail,
    servRate: slot.servRate,
    hostingPerYear: slot.flow.infraMass + slot.flow.hardware + slot.flow.servicing,
    roundTripS: geo.loc.roundTripS,
    slot,
  };
}

/**
 * Undiscounted payback of an orbital build at a market price per frontier-equivalent kW-year, counting replacements:
 * revenue falls with the chips' relative work (and dead boards), chips with their launch are re-bought every retirement
 * age and the infrastructure every infrastructure life; servicing and spares run as yearly flows. Infinity if never.
 */
export function orbitPayback(price, slot, retireAge, infraLife, horizonY = 100, dt = 0.005) {
  const flow = slot.flow.servicing + slot.flow.chips + slot.flow.computeLaunch;
  const k = slot.a + slot.deadRate;
  let cash = 0;
  let nextChip = 0;
  let nextInfra = 0;
  for (let t = 0; t < horizonY; t += dt) {
    if (t >= nextChip - 1e-9) { cash -= slot.chipBlock; nextChip += retireAge; }
    if (t >= nextInfra - 1e-9) { cash -= slot.infraBlock; nextInfra += infraLife; }
    const age = t - (nextChip - retireAge);
    const step = (price * Math.exp(-k * (age + dt / 2)) - flow) * dt;
    if (cash < 0 && cash + step >= 0) return t + (dt * -cash) / step;
    cash += step;
  }
  return Infinity;
}

/** First year cumulative cash (net income per year, minus each block re-bought at the start of its every life) is >= 0; Infinity if never. */
export function paybackYears(netPerYear, chipBlock, chipLife, infraBlock, infraLife, horizonY = 100) {
  if (!(netPerYear > 0)) return Infinity;
  // Purchase events, ascending; the cumulative balance only drops at them, so payback is reached on a straight run between two events.
  const events = [];
  for (let t = 0; t < horizonY; t += chipLife) events.push([t, chipBlock]);
  for (let t = 0; t < horizonY; t += infraLife) events.push([t, infraBlock]);
  events.sort((x, y) => x[0] - y[0]);
  let spent = 0;
  for (let i = 0; i < events.length; i++) {
    spent += events[i][1];
    const next = i + 1 < events.length ? events[i + 1][0] : horizonY;
    if (next === events[i][0]) continue; // another purchase at the same moment
    const t = spent / netPerYear;
    if (t <= next) return Math.max(t, events[i][0]);
  }
  return Infinity;
}

/** Everything the calculator shows. */
export function evaluate(v) {
  const g = groundCost(v);
  const o = orbitCost(v);
  const energyGrowth = energyGrowthOf(v.demandGrowth, v.efficiencyGain);
  const ceilingTW = v.ceiling === 'cap' ? v.capTW : CEILINGS[v.ceiling].tw;
  const yrs = yearsToCeiling(ceilingTW, energyGrowth);
  const ceilingYear = Number.isFinite(yrs) ? START_YEAR + yrs : Infinity;
  const marketNow = g.total;
  const marketAfter = g.total * (1 + v.premium);
  const ratio = o.total / g.total;
  // Break-even launch price: orbit cost rises with launch price, so bisect. Below zero when free launch is still too dear.
  const breakEven = (target) => {
    if (o.a > target) return -Infinity;
    let lo = 0;
    let hi = 1e6;
    if (orbitTotalAt(v, hi) < target) return Infinity;
    for (let i = 0; i < 80; i++) {
      const mid = (lo + hi) / 2;
      if (orbitTotalAt(v, mid) < target) lo = mid; else hi = mid;
    }
    return (lo + hi) / 2;
  };
  const beNow = breakEven(marketNow);
  const beAfter = breakEven(marketAfter);
  let breakEvenYear;
  if (o.total <= marketNow) breakEvenYear = START_YEAR;
  else if (o.total <= marketAfter && Number.isFinite(ceilingYear)) breakEvenYear = ceilingYear;
  else breakEvenYear = Infinity;
  // Undiscounted payback at a market price, counting replacements (orbitPayback).
  const payback = (price) => orbitPayback(price, o.slot, o.orbitLife, v.infraLife);
  // Binding constraint: the largest orbital component.
  const entries = Object.entries(o.parts).sort((x, y) => y[1] - x[1]);
  const [topKey, topVal] = entries[0];
  const topLabel = COMPONENTS.orbit.find((c) => c.key === topKey).label;
  const scaleKw = v.scaleGW * 1e6;
  return {
    ground: g,
    orbit: o,
    ratio,
    energyGrowth,
    ceilingTW,
    yearsToCeiling: yrs,
    ceilingYear,
    marketNow,
    marketAfter,
    breakEvenLaunchNow: beNow,
    breakEvenLaunchAfter: beAfter,
    breakEvenYear,
    paybackNow: payback(marketNow),
    paybackAfter: payback(marketAfter),
    binding: { key: topKey, label: topLabel, share: topVal / o.total },
    totals: {
      radiatorKm2: (o.radAreaKw * scaleKw) / 1e6,
      arrayKm2: (o.arrayAreaKw * scaleKw) / 1e6,
      massT: (o.massKw * scaleKw) / 1000,
      launches: ((o.massKw * scaleKw) / 1000) * (1 - v.spaceShare * (o.mInfra / o.massKw)) / TONNES_PER_LAUNCH,
    },
  };
}

/** One plain-language sentence naming the binding constraint. */
export function bindingSentence(r) {
  const pct = Math.round(r.binding.share * 100);
  const name = r.binding.label.charAt(0).toLowerCase() + r.binding.label.slice(1);
  return `At these inputs, ${name} is ${pct} percent of the orbital cost.`;
}

// ---------------------------------------------------------------------------------------------- URL state
// Compact, stable keys so a scenario link survives later additions. Unknown or out-of-range values are ignored.
export function encodeState(v) {
  const parts = [];
  for (const inp of INPUTS) {
    const x = v[inp.key];
    if (inp.kind === 'bool') parts.push(`${inp.key}=${x ? 1 : 0}`);
    else if (inp.kind === 'choice') parts.push(`${inp.key}=${x}`);
    else parts.push(`${inp.key}=${Number((inp.pct ? x * 100 : x).toPrecision(6))}`);
  }
  return parts.join('&');
}
export function decodeState(text, base) {
  const v = { ...base };
  for (const part of String(text).replace(/^[#?]/, '').split('&')) {
    const i = part.indexOf('=');
    if (i < 1) continue;
    let key;
    let raw;
    try { key = decodeURIComponent(part.slice(0, i)); raw = decodeURIComponent(part.slice(i + 1)); } catch { continue; }
    key = key.replace(/^oc\./, '');
    const inp = INPUTS.find((x) => x.key === key);
    if (!inp) continue;
    if (inp.kind === 'bool') { if (raw === '1' || raw === '0') v[key] = raw === '1'; continue; }
    if (inp.kind === 'choice') { if (inp.options.includes(raw)) v[key] = raw; continue; }
    const n = Number(raw);
    if (raw.trim() === '' || !Number.isFinite(n) || n < inp.min || n > inp.max) continue;
    v[key] = inp.pct ? n / 100 : n;
  }
  return v;
}
