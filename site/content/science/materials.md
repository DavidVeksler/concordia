---
title: Materials from the Moon and asteroids
description: Concordia is built from lunar regolith and from carbonaceous asteroids moved into cislunar orbit. See what the Moon supplies, what it lacks, and how both streams reach the industrial rotor.
lead: Concordia is made almost entirely of the Moon and of asteroids. The Moon supplies oxygen, metals, glass and bulk stone. It has almost no carbon, nitrogen or hydrogen. Small asteroids are steered into cislunar orbit for carbon, hydrogen and water, and the nitrogen in the air is skimmed from Earth's upper atmosphere.
nav: science
order: 10
updated: 2026-11-14
related:
  - /science/mining/
  - /station/building-concordia/
  - /science/air-water-food/
  - /places/industrial-rotor/
---

## What the Moon gives

The Moon's surface is covered in {% term "regolith" %}, a fine broken rock. About 43 percent of it is oxygen by mass, locked into minerals along with silicon, aluminium, iron and some titanium. The oxygen content makes regolith useful for several products. A tonne of moon dirt holds over 400 kg of oxygen for air and rocket oxidiser, plus the metal and stone to build with. {% basis "physics" %}

From regolith the station makes aluminium alloys and steel, glass, basalt-like mineral fibres, glass-ceramics and ceramics. Heated until the grains fuse, it becomes {% term "sintered regolith" %}, the pale warm-grey stone that city blocks and the megaframe are made of. Compacted regolith and slag fill the cartridges of the hull shield. This is {% term "in-situ resource utilization" %} at city scale: almost all bulk material is extraterrestrial, and Earth launch is kept for high-value, low-mass items. {% basis "design" %}

{% shot "sci-hull-cartridges" "Shielding cartridges of compacted regolith on the hull." %}

## What the Moon lacks

Three things the city needs are scarce on the Moon: carbon, hydrogen and nitrogen. Without them there is no water, no plastic, no food, and no inert gas to dilute the oxygen in the air.

Prospecting in the 2030s found the first partial answer. Water ice sits at a few percent by mass in the upper metres of {% term "permanently shadowed region" "permanently shadowed" %} regolith across several hundred square kilometres of the lunar poles. {% basis "fiction" %} This is consistent with the earlier measurement: when NASA's LCROSS probe struck the crater Cabeus in 2009, Colaprete and colleagues estimated the ejecta was 5.6 percent water ice by mass. {% basis "physics" %} The ice is enough for propellant and for early life support. It is not enough for a million people's air and water, so most of the volatiles come from asteroids.

## What asteroids bring

The first asteroids hauled to L5 were metal-rich: almost pure iron-nickel that went to the yard without smelting, before the lunar mass driver ran at scale ([how the haulers work](/science/mining/)). The volatiles came next. A {% term "carbonaceous asteroid" %} is a dark, primitive body that never melted. The ones Concordia's haulers capture are small, tens of metres across, and measure roughly 10 percent water and a few percent carbon by mass, like the CI and CM meteorites. They also carry nitrogen compounds and metals. {% basis "fiction" %}

Their {% term "volatiles" %} supply elements scarce on the Moon. Water gives drinking water, farm water and hydrogen. Carbon gives plastics, fibre and the CO₂ plants breathe. Fixed nitrogen compounds feed the farms and the chemical plants; the nitrogen that fills the air comes from [Earth's sky](#nitrogen). A small asteroid cannot arrive on its own. A hauler bags it whole and pushes it, slowly and steadily, into the L5 region, where it is processed far from the station. The 2012 Keck Institute study for asteroid retrieval found that a roughly 7 m body of 250 to 1,000 tonnes is within reach of a robotic mission with a solar-electric tug. {% basis "physics" %} Concordia's captures are larger, tens of metres across.

{% shot "sci-depot-dock" "A volatiles depot: a white water tank, a tug port for the tugs that bring in captured material, and a mesh dish. Water, carbon and nitrogen compounds wait here until the farms and the chemical plants ask for them." %}

This chain was running before anyone lived on the station. The first asteroid captures came in the mid 2030s, metal-rich bodies first, with lunar mining and an electromagnetic mass driver close behind. The station started as its own factory. How the rock is found, bagged and mined is on [Mining the Moon and asteroids](/science/mining/); the full build is on [Building Concordia](/station/building-concordia/). {% basis "fiction" %}

## Nitrogen from Earth's sky {#nitrogen}

Asteroids cannot supply the nitrogen in the air. One rotor holds 45 million tonnes of air, 75.5 percent nitrogen by mass: 34 million tonnes per rotor, 136 million for four. Bennu, the asteroid OSIRIS-REx sampled, is 0.24 percent nitrogen and weighs 73 million tonnes, so it holds 0.18 million tonnes. One rotor's air is 193 Bennus of rock. Four rotors need 57 billion tonnes, about 1.9 million hauls of 30,000 tonnes, against 20,700 hauls for the whole hull shield. At 1 percent, the figure Pekka Janhunen estimates for Ceres, it is still 453,000 hauls. {% basis "design" %}

The air comes from Earth. The atmosphere holds 3.9 x 10^18 kg of nitrogen and four rotors take 35 parts in a billion of it. Collectors fly a circular orbit at 120 km, ram the air in at 7.8 km/s, liquefy it, and cancel the drag with electric thrusters at 3,000 s specific impulse. The catch is 77 percent nitrogen and 22 percent oxygen by mass. The thrusters burn the oxygen first and need 27 percent of the catch in all, so 73 percent is kept. Electric tugs spiral the liquid nitrogen out to L5, burning some of it on the way, so each tonne delivered takes 1.7 tonnes caught. {% basis "design" %}

The campaign runs 2034 to 2044, so Tsiolkovsky (rotor 1) has its air before the first residents arrive in 2041 and O'Neill (rotor 4) before full spin. It catches 740 kg/s, 233 million tonnes in all, over an intake area of 4.3 km² at perfect capture and 11 km² at 40 percent. The drag is 5.8 meganewtons. Collectors carry no large arrays, because arrays add drag; power platforms in higher orbit beam it to them. Collectors and tugs draw 223 GW while the campaign runs, 5.6 times the station's own 40 GW, and the electricity costs about $7 per kilogram delivered against $100 per kilogram launched. Afterwards the fleet drops to make-up duty and supplies the next station. {% basis "design" %}

The collector is the hard part. It needs a hypersonic rarefied intake, compression and liquefaction at 5 kW/m² of ram heating, and a fleet of square-kilometre scale flying at 120 km under the satellite traffic. {% basis "challenge" %} Sterge Demetriades proposed the idea in 1959 as PROFAC, and a Georgia Tech team revisited it in 2010 as PHARO. {% basis "physics" %}

{% deeper "The arithmetic" basis="design" %}
Every figure comes from `scripts/analysis/nitrogen_supply.py`.

| Step | Value |
| --- | --- |
| Nitrogen per rotor, four rotors | 34.0 Mt, 135.9 Mt |
| Rock at Bennu's 0.24 percent, per rotor, four rotors | 14.2 Gt, 56.6 Gt |
| Orbital speed at 120 km, air density | 7.83 km/s, 2.2 x 10⁻⁸ kg/m³ |
| Burned in the thrusters (v ÷ ve, ve = 29.4 km/s) | 26.6 percent of the catch |
| Tug loading for 6.8 km/s at 3,000 s | 1.26 kg per kg delivered |
| Catch for 135.9 Mt delivered | 233.4 Mt |
| Electricity per delivered kilogram | 144 kWh, $7.20 at $0.05/kWh |
{% enddeeper %}

## Remote cargo capture {#catching-cargo-not-receiving-it}

A {% term "mass driver" %} is an electromagnetic catapult. On the Moon it reaches the 2.4 km/s escape speed with no propellant, so packaged feedstock leaves the surface on electricity alone and arrives fast. {% basis "challenge" %} So the station never receives cargo directly. Capture facilities tens or even hundreds of kilometres away catch each shipment, slow it, and hand it to tugs that bring it in gently. Nothing high-speed is ever aimed at the habitat.

The station launches cargo too, on two mass-driver tracks about 15 to 16 km long on opposite sides of the stationary exterior. Launches go out in opposing pairs, and the momentum rings absorb any imbalance (see [counter-rotation](/science/counter-rotation/)).

{% diagram "material-streams" "Three sources, one set of stores in Ehricke (the industrial rotor): the Moon supplies oxygen, metals and glass, asteroids supply iron-nickel, water, carbon and fixed nitrogen, and Earth's upper atmosphere supplies the air's nitrogen." %}

## The stores in the industrial rotor

The lunar and asteroid streams end in Ehricke (the industrial rotor), 3,500 m long and 2,300 m in radius, turning slowly enough that its rim has 0.45 g. It is mostly an open framework carrying pressurized modules: refineries, chemical plants, a recycling line, a cargo rail yard, and a water and volatile tank farm of spherical tanks. Robots do the work. {% basis "design" %}

The lunar stores hold sintered regolith billets, aluminium and iron ingots, glass and basalt fibre, and oxygen. The asteroid stores hold water ice, carbon feedstock, nitrogen compounds and metal concentrates. The air's nitrogen arrives as a liquid from Earth's sky. Everything is semi-processed, ready for the shipyard, the hull shield, the farms and the recycling loop. Nothing is thrown away: the station tracks water, carbon, nitrogen, phosphorus, metals and glass by element and recovers them.

{% shot "sc-exterior-industrial-open-bay" "The open industrial bay from outside: a framework in vacuum holding pressurized modules and stores of feedstock." %}

{% explore viewpoint="industrial-rotor-wide" overlay="material-flow" label="Material-flow overlay" %} {% explore viewpoint="exterior-25m-materials" %} {% explore chapter="counterRotation" label="Visit the industrial hub" %}

{% shot "sci-shipyard" "A large vessel built unsupported in the zero-g shipyard from the industrial stores." %}

{% deeper "Scale and arithmetic" basis="physics" %}
Shielding is the biggest single use. One metre of regolith at 1.6 t/m³ over the 388 km² hull is roughly 621 million tonnes. The air of the four rotors is 150 to 200 million tonnes of gas, and the water inventory is tens of millions of tonnes spread over lakes, tanks, farms and shielding.

If the water comes from asteroids that are 10 percent water by mass, every 10 million tonnes of water needs 100 million tonnes of carbonaceous rock. Lunar ice at 5.6 percent gives 56 kg of water per tonne of regolith, asteroids at 10 percent give 100 kg per tonne of rock.

| Element or product | Mostly from |
| --- | --- |
| Oxygen | Moon (about 43 % of regolith) |
| Silicon, aluminium, iron, titanium | Moon |
| Glass, ceramics, sintered stone | Moon |
| Hydrogen and water | Asteroids, plus lunar polar ice |
| Carbon | Asteroids |
| Nitrogen for the air | Earth's upper atmosphere, skimmed from 120 km |
| Fixed nitrogen for farms and chemistry | Asteroids |
| Specialty alloy constituents | Earth, in small amounts |

Lunar escape speed is v = √(2GM ÷ R) = √(2 × 4,902.8 km³/s² ÷ 1,737 km) = 2.38 km/s.
{% enddeeper %}

<!-- facts: section 10 (Lunar regolith and asteroids), section 11 (Nitrogen supply), section 6 (Industrial rotor), spec 3.3 -->

{% sources %}
- Anthony Colaprete et al., "Detection of Water in the LCROSS Ejecta Plume", Science 330, 463 to 468 (2010): [experts.arizona.edu](https://experts.arizona.edu/en/publications/detection-of-water-in-the-lcross-ejecta-plume/).
- John R. Brophy, Fred Culick and Louis Friedman et al., "Asteroid Retrieval Feasibility Study", Keck Institute for Space Studies, Caltech and JPL (2012): [final report](https://kiss.caltech.edu/final_reports/Asteroid_final_report.pdf) and the interim paper [Asteroid retrieval feasibility](https://authors.library.caltech.edu/records/kqeqz-18608).
- Universe Today, "Air From Moonrocks": 43 percent of lunar soil by mass is oxygen (NASA Goddard work on oxygen extraction): [universetoday.com](https://universetoday.com/8166/air-from-moonrocks).
- Sterge T. Demetriades, "Preliminary study of propulsive fluid accumulator systems", Journal of the British Interplanetary Society 18(10), 392 (1962), the PROFAC concept first proposed in 1959: [ADS record](https://ui.adsabs.harvard.edu/abs/1962JBIS...18..392D) and the summary at [Wikipedia](https://en.wikipedia.org/wiki/Propulsive_fluid_accumulator).
- Christopher Jones, David Masse, Christopher Glass, Alan Wilhite and Mitchell Walker, "PHARO: Propellant harvesting of atmospheric resources in orbit", 2010 IEEE Aerospace Conference: [paper](https://mwalker.gatech.edu/papers/IEEE_AerospaceConference_PHARO_2010.pdf), doi [10.1109/AERO.2010.5447034](https://doi.org/10.1109/AERO.2010.5447034).
- Daniel P. Glavin, Jason P. Dworkin et al., "Abundant ammonia and nitrogen-rich soluble organic matter in samples from asteroid (101955) Bennu", Nature Astronomy (2025): [doi 10.1038/s41550-024-02472-9](https://doi.org/10.1038/s41550-024-02472-9). Aggregate samples hold 0.23 to 0.25 wt% nitrogen.
- Daniel J. Scheeres et al., "The dynamic geophysical environment of (101955) Bennu based on OSIRIS-REx measurements", Nature Astronomy 3, 352 (2019): mass 7.329 x 10¹⁰ kg, [doi 10.1038/s41550-019-0721-3](https://doi.org/10.1038/s41550-019-0721-3).
- Pekka Janhunen, "Terraforming the dwarf planet: interconnected and growable Ceres megasatellite world" (2021): Ceres is chosen for its nitrogen, with about 0.75 percent as the minimum the plan needs: [arXiv 2011.07487](https://arxiv.org/abs/2011.07487).
- U.S. Standard Atmosphere 1976, NASA-TM-X-74335, density of 2.222 x 10⁻⁸ kg/m³ at 120 km and species densities: [NASA NTRS](https://ntrs.nasa.gov/citations/19770009539).
- Kevin Trenberth and Lesley Smith, "The mass of the atmosphere: a constraint on global analyses", Journal of Climate 18, 864 (2005): 5.148 x 10¹⁸ kg, [doi 10.1175/JCLI-3299.1](https://doi.org/10.1175/JCLI-3299.1).
- Concordia engineering specification, sections 5, 30, 31 and 47, and the industrial rotor design note.
{% endsources %}
