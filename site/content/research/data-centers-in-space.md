---
title: "Data centers in space: when do they pay off?"
h1: "Why build data centers in space?"
crumb: Data centers in space
description: "Data centers in space beat the ground only when launch cost, chip prices and the ground's power limits cross clear thresholds. A sourced cost model and calculator show where."
lead: "For training, rendering and simulation, the results of a computation are small next to the energy used to make them. That makes computing a candidate export from space: it needs electricity, a way to reject heat and a data link. This page sets out the physics and the costs, names the conditions under which orbit beats the ground in one cost model, and gives a calculator to test them."
nav: science
order: 52
updated: 2026-11-14
schema: TechArticle
about: Space-based data centers
faq: faq
ogImage: /site/og/data-centers-in-space.jpg
ogImageAlt: "2.9 times: the baseline model's cost of a kilowatt-year of computing in orbit at 2026 prices, against the same kilowatt-year on the ground."
webApp:
  name: Orbital compute cost calculator
  anchor: calculator
  description: "Compares the levelized cost of one kW-year of IT power on the ground and in orbit. Inputs include launch price, radiator temperature, chip life, space-made mass and a terrestrial power ceiling."
related:
  - /station/economy/
  - /science/power-and-heat/
  - /discover/cooling-in-vacuum/
  - /why-space/
---

{% callout "How to read this page" %}
The analysis is present-day and sourced; the numbered sources (SD1 and on) are listed in [the method section](#method). Cost ratios are outputs of the page's model for stated inputs, not measured costs. Boxes marked **Fiction** are excerpts from Concordia, a space city set in 2045, and every number in them comes from the calculator's Concordia preset.
{% endcallout %}

## Do data centers in space make sense? {#short-answer}

Not yet. In this page's baseline model, built from 2026 prices, a kilowatt-year of computing costs about 2.9 times as much in orbit as on the ground. That is a modelled ratio, not a measured one: nobody runs an orbital data center at scale, and the model leaves out communications, insurance and radiation-driven failures. In the model, orbit competes when launch falls to a few hundred dollars per kilogram, chips get cheaper, chips in orbit last as long as chips on the ground, and the ground runs short of sites and power. The last condition decides when the others matter.

The orbital case rests on a property of some computing work. A steel mill or a chip fab ships tonnes of product. A training run, a render or a simulation returns results that are small next to the energy used to compute them, and a laser link can carry them. Not every workload fits: uploading training data, moving model checkpoints and serving interactive users need far more bandwidth, and the model does not price the link. The inputs are electricity, heat rejection and a link. Space supplies the first and makes the second hard.

## Who is building data centers in space in 2026? {#state-of-play}

Status on 14 November 2026. This block is dated and is refreshed as the field moves.

- **Starcloud** (formerly Lumen Orbit) launched the 60 kg Starcloud-1 on 2 November 2025 carrying an Nvidia H100, which Nvidia called the first data-center-class GPU in space (SD13, SD14). In February 2026 it applied to the FCC for up to 88,000 satellites in sun-synchronous orbit (SD15).
- **SpaceX** applied to the FCC on 30 January 2026 for an orbital data center system of up to one million satellites at 500 to 2,000 km (SD16). SpaceX says the system could deliver on the order of 100 kW of power per tonne allocated to computing (SD17). The satellite bus SpaceX flies today, generation by generation, is in the [Starlink satellite anatomy sheet](https://cheatsheets.davidveksler.com/starlink-satellite-anatomy.html?utm_source=concordia&utm_medium=referral&utm_campaign=cheatsheets_crosslink&utm_content=dc-space-state-of-play#v3-size).
- **Google's Project Suncatcher** plans two prototype satellites with Planet by early 2027. Google estimates that a panel in the right orbit collects up to eight times the energy of one at mid-latitudes on Earth (SD18, SD19).
- **The critics** argue from today's costs. Engineer Andrew McCalip's public model put a 1 GW orbital facility at about three times the ground cost over five years: $51 billion against $16 billion in the version IEEE Spectrum reported in February 2026, chips excluded (SD22, SD23). Others point to radiator area, radiation, and chips that are obsolete before a satellite pays back (CA1 to CA5).

The funded players argue that low Earth orbit works this decade. The critics show that it does not at today's prices. This page asks a third question: under what conditions do the critics stop being right?

## How do you power and cool a data center in space? {#physics}

**Power is easy.** Above the atmosphere sunlight delivers 1,361 W/m² with no cloud or night (SD7). A dawn-dusk sun-synchronous orbit keeps panels lit almost all year; a high orbit or a Lagrange point keeps them lit almost all the time. How a flight satellite's arrays, batteries and power distribution fit together is in the [power section of the Starlink anatomy sheet](https://cheatsheets.davidveksler.com/starlink-satellite-anatomy.html?utm_source=concordia&utm_medium=referral&utm_campaign=cheatsheets_crosslink&utm_content=dc-space-physics-power#power).

**Cooling is the hard part.** A ground data center dumps heat into air or water, and the point at which air stops working is in the [cooling thresholds sheet](https://cheatsheets.davidveksler.com/datacenter-cooling-thresholds.html?utm_source=concordia&utm_medium=referral&utm_campaign=cheatsheets_crosslink&utm_content=dc-space-physics-cooling#regimes). In vacuum there is nothing to carry it away, so every watt the chips use must leave as infrared light from a {% term "radiator" %}. Radiated power follows the Stefan-Boltzmann law:

{% eq %}
P / A = 2 × ε × σ × T⁴     (two faces, σ = 5.67 × 10⁻⁸ W/m²/K⁴)
{% endeq %}

### Is space cold enough to cool computers? {#is-space-cold}

Space is cold, but it is also empty, and emptiness insulates. The 3 K background helps only as a sink for radiation. What matters is how hot the radiator can run. A panel at 330 K (57 °C) with emissivity 0.9, radiating from both faces, sheds about 1,210 W/m². A solar array at 25 percent system efficiency turns the 1,361 W/m² of sunlight into about 340 W/m² of electricity, so the radiator needs about 28 percent of the array's area: 826 m² of radiator against about 2,900 m² of array per megawatt. The ISS radiators, which run near room temperature, reject about 150 to 330 W per m² of panel (SD30).

### How big is the radiator for a megawatt? {#radiator-size}

At 330 K the radiator for 1 MW of chips is about 826 m², an eighth of a football pitch; a gigawatt needs 0.83 km². At 5 kg/m², an aggressive figure for flight radiators, that is 4.1 kg per kW; at the 14 to 17 kg/m² of ISS panels it is about 12 kg per kW (SD28, SD29). How radiators are sized and fouled on real stations is in the [thermal section of the CheatSheets space habitat guide](https://cheatsheets.davidveksler.com/space-habitats-life-support.html?utm_source=concordia&utm_medium=referral&utm_campaign=cheatsheets_crosslink&utm_content=dc-space-radiator-size#thermal-power). Only the electrical power delivered to the chips needs radiating: solar arrays shed their own waste heat.

Running the radiator hotter shrinks it with the fourth power of temperature: 400 K needs less than half the area of 330 K. The catch is the chips. A 400 K radiator puts the chip junctions near 425 K (152 °C). The H100 is qualified at 87 °C (SD41), and wear-out follows the Arrhenius law: near 350 K each 10 K of extra heat roughly halves a chip's life (SD40).

{% diagram "oc-radiator-trade" "The trade at the heart of orbital computing. A hotter radiator is lighter, but today's chips wear out fast above an 85 °C junction. Chips rated for 150 °C would move the life curve far to the right." %}

## What would make orbital data centers cheaper than the ground? {#conditions}

Six near-term conditions and three longer-range levers, each testable in the [calculator](#calculator). The near-term conditions need cheaper versions of hardware that exists; the levers need technology or infrastructure that does not exist yet.

1. **Cheap launch.** Launch falls to a few hundred dollars per kilogram.
2. **Cheaper chips.** Once launch is cheap, buying the chips is most of the orbital bill, and space qualification marks them up further. What today's accelerators draw and cost is compared in the [AI accelerator comparison](https://cheatsheets.davidveksler.com/ai-accelerator-comparison.html?utm_source=concordia&utm_medium=referral&utm_campaign=cheatsheets_crosslink&utm_content=dc-space-conditions-chips#comparison).
3. **Chips in orbit retire on the ground's schedule.** A longer chip life helps both sides, so by itself it barely moves the ratio: in the model, going from 5 to 12 years takes the Today preset from 2.87 to 3.17 times the ground, and the $200-per-kilogram case from 1.20 to 1.17. What hurts orbit is a shorter life than the ground's, because every replacement chip is launched and heat or radiation can retire chips early. With 12-year chips and $200 launch, running the radiator at 350 K instead of 330 K cuts chip life to 3.6 years and raises the ratio from 1.17 to 2.31. Samir Varma argues that the orbital bet is a bet that efficiency gains slow down (CA1); in this model slower gains lengthen chip life on both sides, so they matter mainly through the ground ceiling below.
4. **Radiation tolerance.** Shielding, error correction and spares must keep failure rates near ground levels without a large price premium.
5. **Workloads that tolerate delay and return little data.** Training, batch inference, rendering and simulation can wait a fraction of a second or a few seconds. Interactive serving stays near its users, and work that moves large datasets needs a link budget the model does not include.
6. **A terrestrial constraint.** Orbit does not need to be cheaper than the ground. It needs to be within the premium the ground would charge if it ran short of sites and power, and able to keep growing if the ground cannot.

Longer-range levers:

7. **Space-made mass.** The heavy parts (arrays, radiators, structure, shielding) are made in space from lunar or asteroid material instead of launched.
8. **High-temperature electronics.** Silicon carbide power switches are rated to a 175 °C junction (SD42). Logic chips that ran reliably that hot would let radiators run hotter and lighter. None exist today.
9. **Servicing.** Something has to replace failed boards: robots, or people living nearby. Nothing services satellites at this scale yet.

The calculator's Today preset shows how the near-term conditions stack in the model. At 2026 prices orbit costs 2.9 times the ground. Cut launch to $200 per kilogram and the ratio falls to 1.2, with the chips now 78 percent of the orbital bill. Keeping the chips for 12 years on both sides leaves it at 1.2. Add $10-per-watt chips and orbit reaches parity; add a five-cent siting surcharge on ground power and orbit is 12 percent cheaper. These are model outputs for one sequence of assumptions, not forecasts.

### What launch price per kilogram is the threshold? {#launch-threshold}

It depends on the chips. In the model, at today's chip and hardware prices no launch price makes orbit cheaper: with free launch, the space-qualified accelerators, power hardware and servicing still cost about $12,800 per kW-year against $11,800 for a whole ground kilowatt. If ground capacity runs out and prices rise 50 percent, today's designs break even at about $700 per kilogram and lighter SpaceX-style satellites at about $2,000. Google projects launch prices below about $200 per kilogram by the mid-2030s (SD21); Falcon 9 costs about $3,000 to $3,600 per kilogram today (SD25). The launch vehicles that set those prices are compared side by side in the [orbital rocket specifications table](https://cheatsheets.davidveksler.com/orbital-rockets-comparison.html?utm_source=concordia&utm_medium=referral&utm_campaign=cheatsheets_crosslink&utm_content=dc-space-launch-threshold#specs).

## How much computing can Earth support? {#ceiling}

Data centers used about 415 TWh of electricity in 2024, about 1.5 percent of the world's total and an average load near 47 GW (SD1). The International Energy Agency's base case more than doubles that to about 945 TWh by 2030, about 15 percent a year; it projects 30 percent a year for AI servers (SD2 to SD4). At that pace 2026 starts near 60 GW. The per-rack, per-GPU and per-megawatt figures behind these totals are in the [AI infrastructure numbers sheet](https://cheatsheets.davidveksler.com/ai-infrastructure-numbers.html?utm_source=concordia&utm_medium=referral&utm_campaign=cheatsheets_crosslink&utm_content=dc-space-ceiling-numbers#numbers).

The table below is a scenario, not a forecast. It shows when demand would reach each ceiling if growth held at a constant rate, and growth may slow long before any of these dates. What the arithmetic does show is that under sustained exponential growth the size of the ceiling barely moves the date:

| Ceiling on data center power | Size | If growth holds at 15 % a year | At 30 % a year |
| --- | --- | --- | --- |
| A political cap | 1 TW | 2046 | 2037 |
| 1 % of Earth's land in solar | 18 TW | 2067 | 2048 |
| 10 % of Earth's land in solar | 180 TW | 2083 | 2057 |
| All sunlight reaching Earth | 173,000 TW | 2132 | 2083 |

A ceiling 9,600 times larger buys 35 more years at 30 percent growth. The land figures use about 12 W of average output per m² of solar farm, the median of recent US plants (SD10, SD11).

{% diagram "oc-ceiling" "Years until data center demand would reach each ceiling if growth held constant, starting from 60 GW in 2026." %}

The binding constraint on the ground is not sunlight. It is the rate at which grid connections, land, permits and cooling water can be found. Large data centers in Northern Virginia wait up to seven years for a grid connection, and London's queue runs 7 to 13 years (SD37). The steps between the grid and a rack are in the [data center power chain](https://cheatsheets.davidveksler.com/datacenter-power-chain.html?utm_source=concordia&utm_medium=referral&utm_campaign=cheatsheets_crosslink&utm_content=dc-space-ceiling-grid#chain), and the evidence on interconnection queues is in the [grid-interconnection ledger at Who Pays for AI](https://whopaysforai.org/resources/interconnection?utm_source=concordia&utm_medium=referral&utm_campaign=cheatsheets_crosslink&utm_content=dc-space-ceiling-queue). Heat is local before it is global: all human energy use adds about 0.03 W/m² averaged over the planet, but 0.4 to 0.7 W/m² over the United States and western Europe (SD12). If anything limits data center power on the ground, these local limits will bind long before any physical one. Whether they harden into a cap is a policy question this page does not forecast; the calculator lets you set one and see what follows.

## What does a kW-year of compute cost on Earth and in orbit? {#calculator}

The calculator compares the levelized cost of one kilowatt of IT power for one year: the chips, the building or satellite around them, the power and the servicing, each spread over its life at a discount rate. Pick a preset, then change any input. Every default shows its source, and the link button saves the whole scenario in the address.

{% widget "orbit-compute" "The orbital compute calculator needs JavaScript. Its equations are in the method section below, and the three presets are summarised in the cost chart." %}

{% diagram "oc-cost-stack" "The three presets. Once launch is cheap, buying the chips is most of the bill on both sides." %}

## Why not just build more data centers on Earth? {#counter-case}

The case against orbit, at full strength:

- **Ground power is cheaper.** New solar and wind contracts in North America cost about 5 to 6 cents per kWh (SD36). Orbital panels collect more light, but every kilogram of panel has to be launched. The whole ground stack, from chip to cooling to grid, is mapped in the [AI data center infrastructure guide](https://cheatsheets.davidveksler.com/ai-datacenter-infrastructure.html?utm_source=concordia&utm_medium=referral&utm_campaign=cheatsheets_crosslink&utm_content=dc-space-counter-case#stack).
- **Radiators are heavy.** At chip-friendly temperatures a radiator weighs about 4 kg per kilowatt even at an aggressive 5 kg/m², 40 percent of the mass of today's solar arrays, and 12 kg at ISS areal density (CA5).
- **There are no radiation-hardened GPUs.** Commercial accelerators were never designed for cosmic rays. Shielding adds mass and spares add cost (CA3, CA4).
- **Refresh cycles force relaunch.** A ground operator swaps a rack in an afternoon. An orbital operator launches a new satellite.
- **Cadence, debris and servicing.** A million satellites at 60 per Starship flight is about 16,700 launches, against SpaceX's record of 165 orbital launches in 2025 (CA7). Nothing services satellites in orbit yet.
- **Links cost money.** Optical downlinks need clear sky at the receiving station, so a working system needs several ground stations. Uploading training data and moving checkpoints takes far more bandwidth than returning results. This page's model prices none of it.

What answers each objection:

| Objection | What answers it | Status |
| --- | --- | --- |
| Ground power is cheaper | A terrestrial constraint: orbit only needs to be within about 2× | Open: depends on how fast siting runs out |
| Radiators are heavy | Space-made radiators, or hotter chips | Open: needs in-space manufacturing or new semiconductors |
| No rad-hard GPUs | Shielding, error tolerance, spares | Partly answered: a Google TPU survived 15 krad in a proton beam (SD20); no on-orbit data yet |
| Refresh cycles | Cheap relaunch, and chips in orbit that last as long as chips on the ground | Open: depends on radiator temperature and radiation |
| Cadence, debris, servicing | High orbits or Lagrange points; material made in space; resident technicians | Open: none of it exists |
| Links cost money | Workloads that return little data; several ground stations | Open: not in this model |

### Should space beam power down or send bits? {#power-or-bits}

Gerard O'Neill's 1970s space colonies paid for themselves by building solar power satellites that beamed energy to Earth. Beaming power needs a receiving antenna kilometres across and loses energy at both ends. Sending the results of a computation needs a laser terminal: NASA sent 622 megabits per second from lunar orbit in 2013, and its TBIRD cubesat reached 200 gigabits per second from low orbit in 2022, in short passes over a ground station. For workloads that return little data, shipping bits instead of watts removes the hardest part of space solar power. The link is still a real cost, with clear-sky ground stations and capacity for any data sent up, and this page's model leaves it out.

## Why does Concordia export compute? {#concordia}

Concordia is a fictional space city at the Earth-Moon L5 point, explorable in [the simulation](/explore/). Its economy rests on the argument above: compute is the anchor tenant that pays for the habitat, and the residents solve the servicing problem that uncrewed designs cannot.

{% callout "From the Concordia prospectus, 2045" story="1" %}
The compute field around the station draws 200 GW from 588 km² of locally made arrays and rejects its heat from 165 km² of radiators at 330 K. Earth sends the chips, about 5 kg per kW, and a small share of the specialised hardware. Concordia makes everything heavy: 98 percent of the arrays, radiators, structure and shielding, 91 percent of the field's whole mass, is lunar regolith, glass and metal delivered at about $3 per kilogram.

A kW-year from the field costs about $1,500 against about $3,000 on Earth, where siting levies add three cents to every kWh. Power in the field costs about a cent per kWh. Chips earn for 12 years because efficiency gains slowed in the 2040s, and at a 355 K junction they physically last that long. Resident technicians cut servicing to 40 percent of what an uncrewed field would need.
{% endcallout %}

{% callout "From the residents' authority annual report, 2045" story="1" %}
Terrestrial data center power was capped at 1 TW. Demand growing 30 percent a year reached the cap in 2037. Prices doubled to about $6,000 per kW-year, about $6 billion per GW-year, and the field's 200 GW earns about $1.2 trillion a year. A new kilowatt in the field pays back its build cost in about two years.
{% endcallout %}

Every number in these boxes reproduces with the calculator's **Concordia era** preset. Where Concordia's canon is silent, the preset uses proposals flagged in each input's source note: a regulatory cap of 1 TW, efficiency gains plateauing in the 2040s, $10-per-watt chips and automated ground construction at $11 per watt.

### Why at L5 and not low Earth orbit? {#why-l5}

L5 trades latency for room and material. A round trip between Earth and L5 takes 2.56 seconds, against 0.24 s to geostationary orbit and a few milliseconds to low orbit (SD38, SD39). Training runs, rendering and simulation tolerate that delay; chat and search do not. In return L5 has no drag, almost no debris, nearly constant sunlight, and a short haul from the Moon, whose mass driver supplies the heavy material. The [economy page](/station/economy/) covers the rest of Concordia's business.

## What else do people ask about data centers in space? {#faq}

### Is space cold enough to cool computers?

Not by itself. Vacuum carries no heat away, so a computer in orbit cools only by radiating infrared from a radiator. At 330 K a two-sided panel sheds about 1.2 kW per square metre, so a data center needs radiators about 28 percent of the area of its solar array, which delivers about 340 W per square metre.

### How big a radiator does a 1 MW data center in space need?

About 830 m² at 330 K and emissivity 0.9, radiating from both faces: about 4 tonnes at 5 kg/m², or about 12 tonnes at the areal density of ISS panels. A hotter radiator is smaller, but today's chips do not tolerate the heat.

### What launch cost would make space data centers economical?

It depends on the chips. In this page's cost model, at today's chip prices no launch price makes orbit cheaper than the ground. If ground capacity runs short and prices rise 50 percent, today's designs break even near $700 per kilogram and lighter satellite designs near $2,000.

### Why do critics say space data centers won't work?

Ground power is cheaper, radiators are heavy, commercial GPUs are not radiation-hardened, chips go obsolete in about five years and must be relaunched, and no rocket fleet can yet launch a million satellites. At 2026 prices those objections hold: this page's baseline model puts orbit at about 2.9 times the ground.

### Does radiation destroy GPUs in orbit?

Not quickly, as far as tests show. Google exposed a Trillium TPU to a proton beam with no hard failures up to 15 krad, twenty times the dose expected over five years behind shielding; its memory showed errors after 2 krad (SD20). Starcloud has not published radiation data from the H100 on Starcloud-1 (SD44).

### How would a space data center send its results back to Earth?

By laser. NASA's TBIRD reached 200 gigabits per second from low Earth orbit in 2022, and a lunar laser link sent 622 megabits per second in 2013. For training, rendering and simulation the results are small next to the energy used to make them. Work that moves large datasets needs far more capacity, and optical links need several ground stations to work around cloud.

### Is it better to beam solar power to Earth or put the computers in orbit?

Putting the computers in orbit avoids the kilometre-wide receiving antennas and the conversion losses of power beaming. It sends bits, which need a laser terminal and clear-sky ground stations. For work that returns little data, that makes the case for orbital computing stronger than the old case for space solar power.

### What would a space colony export?

Computation. It needs energy, heat rejection and a data link, all of which a colony has, and for work such as training and rendering its results weigh nothing and need little bandwidth. In Concordia's fictional economy a 200 GW compute field is the anchor tenant that pays for the habitat.

## Where do these numbers come from? {#method}

The calculator and this page run the same model, `site/js/widgets/orbit-compute-core.mjs`. A script, [orbit_compute.mjs](https://github.com/DavidVeksler/concordia/blob/main/scripts/analysis/orbit_compute.mjs), prints every number on the page and regenerates the three diagrams, and an automated test checks the model against hand-worked values on every push. It is an order-of-magnitude model, and the ratios it prints are scenario outputs, not measured costs. It leaves out heat pumps, eclipse storage, debris, insurance, radiation-driven failure rates, communications cost and ground stations.

{% deeper "Model equations" %}
Capital recovery factor, the yearly payment that repays one dollar over n years at rate r:

{% eq %}
CRF(r, n) = r (1 + r)ⁿ / ((1 + r)ⁿ − 1)        CRF(10 %, 5) = 0.2638
{% endeq %}

Ground, per kW-year: chips CRF(r, L) × chip cost; facility CRF(r, 20) × facility capex; energy 8,760 h × PUE × (price + siting surcharge). Today preset: $35 per watt of chips over 5 years, a $17.6 per watt facility, $0.05 per kWh and a PUE of 1.2 at 10 percent give 9,233 + 2,067 + 526 = $11,826.

Orbit, per kW-year: chips CRF(r, L_orbit) × chip cost × qualification multiplier; chip launch CRF(r, L_orbit) × compute mass × launch price × location multiplier, repeated every refresh; array, radiator and structure mass CRF(r, L_infra) × mass × blended cost per kg, where blended = space share × space cost + (1 − space share) × launch price × location multiplier; power and thermal hardware CRF(r, L_infra) × hardware cost; servicing a percentage of capex per year.

Radiator: flux = 2 ε σ T⁴ per m² of two-sided panel; area per kW = 1,000 W / flux; mass = area × areal density. Array area per kW = 1,000 / (1,361 × efficiency × illumination fraction).

Chip life in orbit is the lesser of the economic life and the physical life. Physical life follows Arrhenius: L = L₀ exp((Eₐ / k)(1/T_j − 1/T₀)) with Eₐ = 0.7 eV, L₀ = 10 years at T₀ = 358 K (85 °C) and the junction 25 K above the radiator. Near 350 K that halves life every 10.5 K, which is where the rule of thumb of halving per 10 degrees comes from.

Location multiplier on the low-orbit launch price: exp(Δv / (450 s × 9.81 m/s²)), with Δv 4.2 km/s to geostationary orbit (2.59×) and 3.9 km/s to L5 (2.42×).

Ceiling: energy growth = (1 + demand growth) / (1 + efficiency gain) − 1; years to ceiling = ln(ceiling / 60 GW) / ln(1 + energy growth). The market price is the ground cost below the ceiling and the ground cost times (1 + scarcity premium) after it. Orbital cost is linear in launch price, so the break-even launch price has a closed form.

1 % of land in solar: 1.49 × 10¹⁴ m² of land × 1 % × 12 W/m² of average output = 18 TW. Sunlight intercepted: π × (6,371 km)² × 1,361 W/m² = 173,500 TW. Data center load in 2024: 415 TWh / 8,760 h = 47 GW.
{% enddeeper %}

Changelog: 14 November 2026, first version. 14 November 2026, revised: chip life restated as a retirement-schedule condition (a longer life helps both sides; a shorter life in orbit hurts orbit), link and bandwidth assumptions qualified, ratios and growth dates labelled as model outputs and scenarios, longer-range levers moved after the near-term conditions.

{% sources %}
- SD1 to SD4. IEA, "Energy and AI", 2025, chapter "Energy demand from AI" (415 TWh and 1.5 % in 2024; 945 TWh by 2030; 12 % a year over five years; AI servers 30 % a year to 2030), accessed 14 November 2026: [iea.org](https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai).
- SD7. Kopp and Lean, "A new, lower value of total solar irradiance", Geophysical Research Letters 38, L01706, 2011 (1,360.8 W/m²): [espo.nasa.gov](https://espo.nasa.gov/node/30086).
- SD9. CIA World Factbook, "Area" (land 148.94 million km², total 510.07 million km²), MIT mirror: [start.csail.mit.edu](https://start.csail.mit.edu/mirror/cia.gov/library/publications/the-world-factbook/fields/2147.html).
- SD10, SD11. Bolinger and Bolinger, "Land Requirements for Utility-Scale PV", LBNL, 2022 (447 and 394 MWh per acre per year, 11 to 13 W/m²): [emp.lbl.gov](https://emp.lbl.gov/sites/default/files/emp-files/land_requirements_for_utility-scale_pv.pdf).
- SD12. Flanner, "Integrating anthropogenic heat flux with global climate models", Geophysical Research Letters 36, L02801, 2009: [NCAR library record](https://ckanprod.data-commons.k8s.ucar.edu/dataset/251dce25-af33-4e20-9325-e0b49d30e840).
- SD13. Spaceflight Now, Bandwagon-4 launch coverage with Starcloud-1, 1 to 2 November 2025: [spaceflightnow.com](https://spaceflightnow.com/2025/11/01/live-coverage-commercial-space-station-demo-data-center-precursor-to-launch-on-spacex-bandwagon-mission).
- SD14. DatacenterDynamics, "Lumen Orbit rebrands to Starcloud", 2025: [datacenterdynamics.com](https://datacenterdynamics.com/en/news/lumen-orbit-rebrands-to-starcloud-raises-another-10m-for-in-orbit-data-centers).
- SD15. FCC Space Bureau, Report No. SAT-01982, 13 March 2026 (Starcloud, SAT-LOA-20260202-00073, up to 88,000 satellites): [docs.fcc.gov](https://docs.fcc.gov/public/attachments/DOC-419509A1.txt).
- SD16. FCC, Public Notice DA 26-113, 4 February 2026 (SpaceX, SAT-LOA-20260108-00016, filed 30 January 2026, up to one million satellites): [docs.fcc.gov](https://docs.fcc.gov/public/attachments/DA-26-113A1.pdf).
- SD17. The Register, "SpaceX wants to fill Earth orbit with a million datacenter satellites", 5 February 2026: [theregister.com](https://www.theregister.com/2026/02/05/spacex_1m_satellite_datacenter/).
- SD18. Google Research, "Exploring a space-based, scalable AI infrastructure system design", 4 November 2025: [research.google](https://research.google/blog/exploring-a-space-based-scalable-ai-infrastructure-system-design/).
- SD19 to SD21. Agüera y Arcas and others, "Towards a future space-based, highly scalable AI infrastructure system design", arXiv:2511.19468, November 2025: [arxiv.org](https://arxiv.org/abs/2511.19468).
- SD22. IEEE Spectrum, "How Stupid Would It Be to Put Data Centers in Space?", 26 February 2026: [spectrum.ieee.org](https://spectrum.ieee.org/orbital-data-centers).
- SD23. Andrew McCalip, "Economics of Orbital vs Terrestrial Data Centers" (interactive model), accessed 14 November 2026: [andrewmccalip.com](https://andrewmccalip.com/space-datacenters).
- SD25. Harry W. Jones, "The Recent Large Reduction in Space Launch Cost", NASA Ames, 2018 ($62 million for 22,800 kg, $2,720 per kg): [ntrs.nasa.gov](https://ntrs.nasa.gov/citations/20200001093); Tim Fernholz, "Why the economics of orbital AI are so brutal", TechCrunch, 11 February 2026 (about $3,600 per kg): [techcrunch.com](https://techcrunch.com/2026/02/11/why-the-economics-of-orbital-ai-are-so-brutal).
- SD26. Cushman & Wakefield, "2026 Data Center Development Cost Guide" ($17.6 million per MW excluding chips): [cushmanwakefield.com](https://www.cushmanwakefield.com/en/united-states/insights/data-center-development-cost-guide).
- SD27. NVIDIA, "DGX H100/H200 User Guide" (130.45 kg, 10.2 kW max): [docs.nvidia.com](https://docs.nvidia.com/dgx/dgxh100-user-guide/introduction-to-dgxh100.html).
- SD28. NASA Glenn, "Lightweight Carbon-Carbon High-Temperature Space Radiator", NASA Tech Briefs, 2008: [techbriefs.com](https://www.techbriefs.com/component/content/article/3156-lew-18210-1).
- SD29, SD30. Boeing and NASA, "Active Thermal Control System (ATCS) Overview" (panel sizes, masses and heat rejection): [nasa.gov](https://www.nasa.gov/wp-content/uploads/2021/02/473486main_iss_atcs_overview.pdf).
- SD31, CA1. Samir Varma, "Musk's Space Data Centers Are a Bet That Moore's Law Stays Slow", 15 June 2026: [samirvarma.substack.com](https://samirvarma.substack.com/p/musks-space-data-centers-are-a-bet).
- SD32, SD33. CNBC, "Nvidia plans to invest up to $100 billion in OpenAI", 22 September 2025 ($50 to 60 billion per GW, about $35 billion of it Nvidia hardware): [cnbc.com](https://www.cnbc.com/2025/09/22/nvidia-openai-data-center.html).
- SD34. Redwire, "ROSA" roll-out solar array product table: [rdw.com](https://rdw.com/product-archive/power/rosa/).
- SD35. CNBC, "Elon Musk, defending the value of space travel, presents SpaceX's Starship as the 'holy grail'", 11 February 2022: [cnbc.com](https://www.cnbc.com/2022/02/11/elon-musk-spacexs-starship-is-solution-to-efficient-space-travel.html).
- SD36. pv magazine USA, LevelTen North American PPA price index for Q2 2026, 27 July 2026: [pv-magazine-usa.com](https://pv-magazine-usa.com/2026/07/27/solar-ppa-prices-dip-in-q2-while-wind-climbs-as-july-4-tax-credit-deadline-looms-reports-levelten/).
- SD37. Bloomberg Law, "Data Centers Face Seven-Year Wait for Dominion Power Hookups", 30 August 2024: [news.bloomberglaw.com](https://news.bloomberglaw.com/environment-and-energy/data-centers-face-seven-year-wait-for-power-hookups-in-virginia); PBC Today, "Powering the AI economy", 8 September 2026 (London, 7 to 13 years): [pbctoday.co.uk](https://www.pbctoday.co.uk/news/digital-construction-news/powering-ai-economy-how-can-london-meet-soaring-data-centre-demand/165476/).
- SD38. NASA NSSDCA, "Moon Fact Sheet" (384,400 km): [nssdc.gsfc.nasa.gov](https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html).
- SD39. ESA, "Geostationary orbit" (35,786 km): [esa.int](https://esa.int/ESA_Multimedia/Images/2020/03/Geostationary_orbit).
- SD40. EESemi, "Reliability Models for Failure Mechanisms" (Arrhenius and Black's equation): [eesemi.com](https://eesemi.com/relmodels.htm).
- SD41. NVIDIA, H100 PCIe GPU Product Brief PB-11133-001, 2022 (thermal qualification 87 °C), mirror: [openzeka.com](https://openzeka.com/wp-content/uploads/2023/12/PB-11133-001_v01.pdf).
- SD42. Wolfspeed, CAB525F12XM3 SiC module data sheet, 2024 (175 °C junction): [wolfspeed.com](https://assets.wolfspeed.com/uploads/2025/02/Wolfspeed_CAB525F12XM3_data_sheet.pdf).
- CA2. Angadh Nanjangud, "No way Starcloud's putting a data centre in space" and "Notes on Google's Space Data Centers", revised July 2026: [angadh.com](https://angadh.com/space-data-centers-1), [angadh.com](https://angadh.com/space-data-centers-2).
- CA3. Ryan Alimento, "Data Centers Won't Be In Space Anytime Soon", Breakthrough Institute, 17 February 2026: [thebreakthrough.org](https://thebreakthrough.org/issues/energy/data-centers-wont-be-in-space-anytime-soon).
- CA4. Douglas Natelson, "Data centers in space make no sense to me", nanoscale views, 8 February 2026: [nanoscale.blogspot.com](https://nanoscale.blogspot.com/2026/02/data-centers-in-space-make-no-sense-to.html).
- CA5. Andrew Cavalier, "Why Orbital Data Centers Are Harder Than Silicon Valley Thinks", IEEE Spectrum, 11 June 2026: [spectrum.ieee.org](https://spectrum.ieee.org/orbital-data-centers-heat).
- CA7. Harry Goldstein, "The Space-based Data Center Hype Machine Is Already in Orbit", IEEE Spectrum, 1 July 2026: [spectrum.ieee.org](https://spectrum.ieee.org/orbital-data-center-hype).
- NASA, Lunar Laser Communications Demonstration (622 Mbps, 2013): [nasa.gov](https://www.nasa.gov/mission/lunar-laser-communications-demonstration-llcd/). MIT Lincoln Laboratory and NASA, TBIRD 200 Gbps results, 2023: [ntrs.nasa.gov](https://ntrs.nasa.gov/citations/20230007959).
- Concordia fact sheet, section 20 (the Concordia preset and the compute field).
{% endsources %}

The full verification ledger, with the corrected and unverified figures, is in the [repository](https://github.com/DavidVeksler/concordia/blob/main/docs/specs/space-data-centers-sources.md).

## Can I see Concordia's compute field? {#see-it}

Yes. The simulation draws the field as rafts of dark-blue solar platforms in a band around the station, with optical downlinks aimed at Earth.

{% explore viewpoint="compute-field" label="Fly to the compute field" %} {% explore viewpoint="compute-downlink" label="See the optical downlink" %}
