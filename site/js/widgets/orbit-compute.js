// Orbital compute calculator: levelized cost of a kW-year of IT power on the ground and in orbit, and what has to change for orbit to win.
// Model and presets: orbit-compute-core.mjs. Spec: docs/specs/space-data-centers-spec.md section 5. State lives in the URL hash (oc.*).
import {
  INPUTS, PRESETS, LOCATIONS, CEILINGS, COMPONENTS, evaluate, bindingSentence, encodeState, decodeState, locationMultiplier,
  LOAD_2026_TW, TONNES_PER_LAUNCH, RESIDENT_SERVICING_FACTOR,
} from './orbit-compute-core.mjs';
import { h, s, field, segmented, checkbox, outputs, frame, fixed, sig, widgetHeader } from './ui.mjs';

export const EXPLORE = { viewpoint: 'compute-field' };
const PAGE = '/research/data-centers-in-space/';
const EMBED = '/site/embed/orbit-compute.html';

// Where each default comes from. One line per input; `p` overrides by preset. Ledger ids (SD n) are in docs/specs/space-data-centers-sources.md.
const SRC = {
  rate: { d: 'Assumption: a 10 % cost of capital for a risky new asset class.', p: { concordia: 'Concordia proposal: patient owners with no fixed payback date, 6 %.' } },
  chipCost: { d: 'About $35 of every watt of capacity goes to Nvidia hardware, out of $50 to 60 billion per GW all in (Huang, August 2025; SD32, SD33).', p: { concordia: 'Concordia proposal: chip margins fall once efficiency gains stall, $10 per watt.' } },
  econLife: { d: 'Accelerators are written off over about 5 years because newer chips do more work per watt.', p: { concordia: 'Concordia proposal: efficiency gains plateau in the 2040s and chips earn for 12 years.' } },
  demandGrowth: { d: 'IEA: data center electricity grew 12 % a year over the five years to 2024 and reaches about 945 TWh by 2030, about 15 % a year (SD1 to SD3). Split growth between demand and efficiency as you like.', p: { concordia: 'Concordia proposal: 36.5 % demand growth and 5 % efficiency gain give 30 % energy growth, the IEA projection for AI servers to 2030 (SD4).' } },
  efficiencyGain: { d: 'Set to 0 so the energy growth equals the IEA figure; raise both to keep it constant.' },
  ceiling: { d: '1 % of Earth’s 149 million km² of land at about 12 W of average output per m² of array land is about 18 TW (SD9 to SD11).', p: { concordia: 'Concordia proposal: a regulatory cap on data center power, 1 TW, long before any physical limit.' } },
  capTW: { d: 'A political cap is your number. World electricity use averages about 3.4 TW.' },
  premium: { d: 'Assumption: what buyers pay above today’s cost once new ground capacity cannot be sited.', p: { concordia: 'Concordia proposal: prices double, which reproduces the station’s revenue of about $6 billion per GW-year (facts section 16).' } },
  facility: { d: '$17.6 million per MW excluding chips, the US and Canada average (Cushman & Wakefield, 2026; SD26).', p: { concordia: 'Concordia proposal: automated construction brings it back to $11 per watt.' } },
  price: { d: 'New North American solar and wind power purchase agreements run about $0.05 to $0.06 per kWh (LevelTen, Q2 2026; SD36).' },
  surcharge: { d: 'Set to 0 today. Use it for a heat, land or carbon tax, or the cost of years of permitting delay.', p: { concordia: 'Concordia proposal: $0.03 per kWh of siting and heat levies by the 2040s.' } },
  pue: { d: 'Power usage effectiveness of a modern liquid-cooled hall, about 1.2.' },
  location: { d: 'Dawn-dusk sun-synchronous orbit, the orbit of Google’s Suncatcher design, stays in sunlight most of the year (SD19).', p: { concordia: 'Concordia sits at Earth-Moon L5 (canon).' } },
  launch: { d: 'Falcon 9 costs about $3,000 to $3,600 per kg to low orbit (SD25).', p: { cheap: 'Starship’s goal is about $100 to $200 per kg, not yet demonstrated; Google projects about $200 by the mid-2030s (SD21, SD35).', concordia: 'A mature Starship-class price, $100 per kg to low orbit (SD35), times the L5 multiplier.' } },
  spaceShare: { d: 'Today everything is launched from Earth.', p: { concordia: 'Canon: Earth sends the chips; Concordia makes panels, structure, shielding and radiators (economy page). 98 % here.' } },
  spaceCost: { d: 'Unused while nothing is made in space.', p: { concordia: 'Concordia proposal: $3 per kg delivered; the energy alone is under 10 cents (facts section 16).' } },
  mArray: { d: 'Flight roll-out arrays deliver about 70 to 125 W per kg, so about 10 kg per kW (Redwire ROSA; SD34).', p: { cheap: 'SpaceX says its satellites carry on the order of 100 kW per tonne allocated to computing (SD17): 10 kg per kW in all, split here as 3 array, 5 compute and 1 structure, plus radiator.', concordia: 'Concordia proposal: heavier arrays made from lunar material, 10 kg per kW.' } },
  mCompute: { d: 'A DGX H100 weighs 130 kg and draws up to 10.2 kW, about 13 kg per kW (SD27).', p: { cheap: 'See the array note: 5 kg per kW (SD17).', concordia: 'Concordia proposal: dense boards with no chassis, 5 kg per kW; shielding is local regolith, counted under structure.' } },
  mStruct: { d: 'Assumption: 4 kg per kW of truss and spot shielding, so the total lands near Samir Varma’s 30 t per MW (SD31).', p: { cheap: 'See the array note: 1 kg per kW (SD17).', concordia: 'Concordia proposal: 50 kg per kW of regolith cassettes and truss, all made locally.' } },
  radTemp: { d: 'Chips need coolant near 330 K (57 °C); canon for the compute field too (facts section 16).' },
  emissivity: { d: 'White or black radiator coatings reach about 0.9.' },
  radDensity: { d: 'About 5 kg per m², an aggressive assumption; metal flight radiators are about 10 and ISS panels 14 to 17 (SD28, SD29).', p: { cheap: 'Assumption: 2 kg per m², the carbon-carbon design goal (SD28).' } },
  cellEff: { d: 'System efficiency: about 30 % cells less losses, about 25 % overall. Canon for Concordia: 340 W/m² delivered (facts section 6).' },
  hwCost: { d: 'Assumption: mass-produced satellite power and thermal hardware at about $5 per watt.', p: { concordia: 'Concordia proposal: locally built, $0.60 per watt, about a cent per kWh with the mass (economy page).' } },
  qual: { d: 'Assumption: commercial chips with spot shielding and spares, 1.2 times the price.', p: { concordia: 'Concordia proposal: regolith shielding makes commercial chips adequate.' } },
  refLife: { d: 'Assumption: 10 years at an 85 °C junction; the H100 is qualified at 87 °C (SD41). Life follows Arrhenius at 0.7 eV, about a halving per 10 K near 350 K (SD40).' },
  hotChips: { d: 'Silicon carbide power switches are rated to a 175 °C junction (SD42); no data center logic is. The toggle moves the 10-year rating to 150 °C.' },
  infraLife: { d: 'Assumption: 10 years in low orbit (drag, debris, degradation).', p: { concordia: 'Concordia proposal: 30 years at L5 with resident repair.' } },
  servicing: { d: 'Assumption: 2 % of capex a year for spares and replacement flights.' },
  residents: { d: `Resident technicians cut servicing to ${RESIDENT_SERVICING_FACTOR * 100} % of the uncrewed figure (assumption).`, p: { concordia: 'Canon: Concordia’s residents service the field.' } },
  scaleGW: { d: 'Drives the totals only.', p: { concordia: 'Canon: the compute field draws 200 GW (facts section 16).' } },
};
const srcFor = (key, preset) => SRC[key]?.p?.[preset] ?? SRC[key]?.d ?? '';

const GROUPS = [
  { id: 'economy', title: 'Economy and demand' },
  { id: 'ground', title: 'Ground data center' },
  { id: 'orbit', title: 'Orbital data center' },
  { id: 'scale', title: 'Scale' },
];
const CEILING_LABEL = { cap: 'Political cap', land1: '1 % of land', land10: '10 % of land', sun: 'All sunlight' };

const money = (n) => (Number.isFinite(n) ? `$${sig(n, 3)}` : 'n/a');
const perKwYr = (n) => `${money(n)} per kW-year`;
const yearText = (y) => (Number.isFinite(y) ? String(Math.round(y)) : 'never at these inputs');

export function mount(el) {
  let presetKey = 'today';
  let v = { ...PRESETS.today.v };
  const controls = {};
  const notes = {};
  let saveTimer = 0;

  // ---- read the hash first: oc.preset names the base, the rest overrides it
  function readHash() {
    const ownParts = (location.hash || '').replace(/^#/, '').split('&').filter((p) => p.startsWith('oc.'));
    if (!ownParts.length) return false;
    const pre = ownParts.find((p) => p.startsWith('oc.preset='));
    let pk = '';
    try { pk = pre ? decodeURIComponent(pre.split('=')[1] ?? '') : ''; } catch { pk = ''; } // malformed escape: keep the current preset
    if (Object.hasOwn(PRESETS, pk)) presetKey = pk;
    v = decodeState(ownParts.filter((p) => !p.startsWith('oc.preset=')).join('&'), PRESETS[presetKey].v);
    return true;
  }
  readHash();
  window.addEventListener('hashchange', () => {
    if (location.hash.includes(stateText())) return; // our own write
    if (!readHash()) return;
    for (const { inp, ctl } of Object.values(controls)) ctl.set(inp.kind ? v[inp.key] : shown(inp, v[inp.key]), true);
    update();
  });

  // ---- presets
  const presetBtns = Object.entries(PRESETS).map(([k, p]) => {
    const b = h('button', { type: 'button', class: 'w-btn oc-preset', 'aria-pressed': String(k === presetKey) }, p.label);
    b.addEventListener('click', () => applyPreset(k));
    return [k, b];
  });
  const presetRow = h('div', { class: 'w-btns oc-presets', role: 'group', 'aria-label': 'Presets' }, presetBtns.map(([, b]) => b));
  const presetNote = h('p', { class: 'w-hint oc-preset-note' });

  // ---- inputs
  const shown = (inp, x) => (inp.pct ? Number((x * 100).toPrecision(6)) : x);
  const toModel = (inp, x) => (inp.pct ? x / 100 : x);
  const groupBodies = Object.fromEntries(GROUPS.map((g) => [g.id, h('div', { class: 'oc-group__body' })]));
  for (const inp of INPUTS) {
    const onChange = (x) => { v[inp.key] = inp.kind ? x : toModel(inp, x); changed(); };
    let ctl;
    if (inp.kind === 'choice') {
      const labels = inp.key === 'location' ? LOCATIONS : CEILINGS;
      ctl = segmented({ name: `oc-${inp.key}`, label: inp.label, value: v[inp.key], onChange,
        options: inp.options.map((o) => ({ value: o, label: inp.key === 'ceiling' ? CEILING_LABEL[o] : labels[o].label })) });
    } else if (inp.kind === 'bool') {
      ctl = checkbox({ label: inp.label, checked: v[inp.key], onChange });
    } else {
      // No fixed display precision: the exact-value box shows the value the model uses (36.5 stays 36.5); the step only drives the slider.
      ctl = field({ label: inp.label, unit: inp.unit, min: inp.min, max: inp.max, step: inp.step, log: !!inp.log,
        value: shown(inp, v[inp.key]), onChange });
    }
    const note = h('p', { class: 'w-hint oc-src', hidden: true });
    const toggle = h('button', { type: 'button', class: 'oc-src-btn', 'aria-expanded': 'false', 'aria-label': `Source for ${inp.label}` }, 'Source');
    toggle.addEventListener('click', () => {
      const open = note.hidden;
      note.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
    });
    const wrap = h('div', { class: 'oc-input' }, ctl.el, toggle, note);
    controls[inp.key] = { inp, ctl, wrap, toggle };
    notes[inp.key] = note;
    groupBodies[inp.group].append(wrap);
  }
  const groups = GROUPS.map((g) => h('details', { class: 'oc-group' }, h('summary', null, g.title), groupBodies[g.id]));

  // ---- outputs
  const out = outputs([
    { key: 'ratio', label: 'Orbit as a multiple of ground', big: true },
    { key: 'ground', label: 'Ground' },
    { key: 'orbit', label: 'Orbit' },
    { key: 'power', label: 'Power in orbit (array, radiator, structure)' },
    { key: 'beNow', label: 'Break-even launch price, today’s market' },
    { key: 'beAfter', label: 'Break-even launch price, once the ceiling binds' },
    { key: 'ceilingYear', label: 'Year the terrestrial ceiling binds' },
    { key: 'beYear', label: 'Year orbit breaks even' },
    { key: 'payback', label: 'Payback of an orbital build (undiscounted, with replacements)' },
    { key: 'life', label: 'Chip life in orbit' },
    { key: 'latency', label: 'Round trip to Earth' },
  ]);
  const totals = outputs([
    { key: 'radiator', label: 'Radiator area' },
    { key: 'array', label: 'Solar array area' },
    { key: 'mass', label: 'Total mass in orbit' },
    { key: 'launches', label: `Launches from Earth at ${TONNES_PER_LAUNCH} t` },
  ]);
  const binding = h('p', { class: 'oc-binding', 'aria-live': 'polite' });

  // ---- stacked bars
  const BAR_X = 96; const BAR_W = 232; const ROW = [22, 64];
  const svg = s('svg', { class: 'w-svg oc-bars', viewBox: '0 0 340 120', role: 'img' });
  const legend = h('ul', { class: 'oc-legend' });

  // ---- state header, embed and cite
  const state = { href: () => `${location.origin}${PAGE}#${stateText()}` };
  const embedBox = h('textarea', { class: 'oc-embed', readonly: true, rows: 3, 'aria-label': 'Embed code for this calculator' });
  const cite = h('p', { class: 'w-hint oc-cite' });

  frame(el, 'Orbital compute cost calculator',
    widgetHeader({ explore: EXPLORE, state }),
    h('p', { class: 'oc-lede' }, 'Pick a preset, then open a group to change any input.'),
    presetRow, presetNote,
    h('div', { class: 'w-grid' },
      h('div', { class: 'w-controls' }, groups),
      h('div', { class: 'w-results' }, out.el, binding)),
    svg, legend,
    h('h3', { class: 'oc-sub' }, 'At the chosen scale'),
    totals.el,
    h('details', { class: 'oc-group oc-omits' }, h('summary', null, 'What this model leaves out'),
      h('p', { class: 'w-hint' }, 'An order-of-magnitude model. It omits heat pumps, eclipse storage, orbital debris, insurance, radiation-driven failure rates, communications cost and ground stations. Ground sites pay no servicing line; their upkeep sits inside facility capex and PUE.')),
    h('details', { class: 'oc-group' }, h('summary', null, 'Embed or cite this calculator'),
      h('p', { class: 'w-hint' }, 'Paste this into a page to embed the calculator with the current inputs:'), embedBox, cite));

  function stateText() {
    return `oc.preset=${presetKey}&` + encodeState(v).split('&').map((p) => `oc.${p}`).join('&');
  }
  function applyPreset(k) {
    presetKey = k;
    v = { ...PRESETS[k].v };
    for (const { inp, ctl } of Object.values(controls)) ctl.set(inp.kind ? v[inp.key] : shown(inp, v[inp.key]), true);
    changed();
  }
  function changed() {
    update();
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      const rest = (location.hash || '').replace(/^#/, '').split('&').filter((p) => p && !p.startsWith('oc.'));
      const text = [...rest, stateText()].join('&');
      try { history.replaceState(history.state, '', location.pathname + location.search + '#' + text); } catch { /* sandboxed frame */ }
    }, 300);
  }

  function update() {
    const r = evaluate(v);
    for (const [k, b] of presetBtns) b.setAttribute('aria-pressed', String(k === presetKey));
    const custom = JSON.stringify(v) !== JSON.stringify(PRESETS[presetKey].v);
    presetNote.textContent = `${PRESETS[presetKey].label}${custom ? ', with your changes' : ''}. ${presetKey === 'concordia' ? 'Concordia values are story canon or flagged proposals; see each Source.' : ''}`.trim();
    for (const [key, { wrap, toggle }] of Object.entries(controls)) {
      const text = srcFor(key, presetKey);
      notes[key].textContent = text;
      toggle.title = text;
      if (key === 'capTW') wrap.hidden = v.ceiling !== 'cap';
      if (key === 'spaceCost') wrap.classList.toggle('oc-input--idle', v.spaceShare === 0);
    }
    const loc = LOCATIONS[v.location];
    out.update({
      ratio: `${fixed(r.ratio, 2)} ×`,
      ground: perKwYr(r.ground.total),
      orbit: perKwYr(r.orbit.total),
      power: `$${fixed(r.orbit.powerPerKwh, 3)} per kWh (ground pays $${fixed(v.price + v.surcharge, 3)})`,
      beNow: r.breakEvenLaunchNow > 0 ? `${money(r.breakEvenLaunchNow)} per kg to LEO` : `none: with free launch orbit still costs ${perKwYr(r.orbit.a)}`,
      beAfter: r.breakEvenLaunchAfter > 0 ? `${money(r.breakEvenLaunchAfter)} per kg to LEO` : `none: with free launch orbit still costs ${perKwYr(r.orbit.a)}`,
      ceilingYear: `${yearText(r.ceilingYear)} (${sig(r.ceilingTW, 3)} TW at ${fixed(r.energyGrowth * 100, 1)} % a year from ${LOAD_2026_TW * 1000} GW)`,
      beYear: r.breakEvenYear === 2026 ? 'already: orbit is cheaper at these inputs' : yearText(r.breakEvenYear),
      payback: Number.isFinite(r.paybackAfter)
        ? `${Number.isFinite(r.paybackNow) ? fixed(r.paybackNow, 1) : 'never'} years at today’s price, ${fixed(r.paybackAfter, 1)} after the ceiling`
        : 'never: replacements cost more than the revenue',
      life: `${fixed(r.orbit.orbitLife, 1)} years (physical ${fixed(r.orbit.physLife, 1)} at a ${Math.round(r.orbit.junctionK)} K junction)`,
      latency: `${loc.roundTripS < 0.1 ? 'about 0.02' : fixed(loc.roundTripS, 2)} s (${loc.label}; launch ${fixed(locationMultiplier(v.location), 2)} × the LEO price)`,
    });
    totals.update({
      radiator: `${sig(r.totals.radiatorKm2, 3)} km² (${fixed(r.orbit.radAreaKw, 2)} m² and ${fixed(r.orbit.mRad, 1)} kg per kW)`,
      array: `${sig(r.totals.arrayKm2, 3)} km²`,
      mass: `${sig(r.totals.massT, 3)} t (${fixed(r.orbit.massKw, 1)} kg per kW)`,
      launches: sig(r.totals.launches, 3),
    });
    binding.textContent = bindingSentence(r);
    drawBars(r);
    const href = state.href();
    embedBox.value = `<iframe src="${location.origin}${EMBED}#${stateText()}" title="Orbital compute cost calculator" width="100%" height="900" loading="lazy" style="border:0"></iframe>`;
    cite.textContent = `Cite: Veksler, D. “Orbital compute cost calculator.” Concordia, 2026. ${href}`;
  }

  function drawBars(r) {
    const max = Math.max(r.ground.total, r.orbit.total);
    const scale = BAR_W / max;
    const rows = [
      { label: 'Ground', parts: COMPONENTS.ground.map((c, i) => ({ ...c, val: r.ground.parts[c.key], cls: `oc-g${i}` })), total: r.ground.total },
      { label: 'Orbit', parts: COMPONENTS.orbit.map((c, i) => ({ ...c, val: r.orbit.parts[c.key], cls: `oc-o${i}` })), total: r.orbit.total },
    ];
    const kids = [];
    rows.forEach((row, ri) => {
      let x = BAR_X;
      kids.push(s('text', { x: BAR_X - 8, y: ROW[ri] + 15, 'text-anchor': 'end' }, row.label));
      for (const p of row.parts) {
        const w = p.val * scale;
        if (w > 0.2) kids.push(s('rect', { class: `oc-seg ${p.cls}`, x, y: ROW[ri], width: w, height: 22 }, s('title', null, `${row.label}, ${p.label}: ${perKwYr(p.val)}`)));
        x += w;
      }
      kids.push(s('text', { class: 'w-axis', x: BAR_X, y: ROW[ri] + 34 }, perKwYr(row.total)));
    });
    svg.replaceChildren(...kids);
    svg.setAttribute('aria-label', `Levelized cost per kW-year: ground ${perKwYr(r.ground.total)}, orbit ${perKwYr(r.orbit.total)}, ${fixed(r.ratio, 2)} times ground. ${bindingSentence(r)}`);
    legend.replaceChildren(...rows.flatMap((row) => row.parts.map((p) => h('li', null, h('span', { class: `oc-swatch ${p.cls}`, 'aria-hidden': 'true' }), `${row.label}: ${p.label}, ${money(p.val)}`))));
  }

  update();
}
