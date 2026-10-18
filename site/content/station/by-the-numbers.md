---
title: Concordia by the numbers
crumb: By the numbers
description: Every key Concordia value in one place, grouped by system. Each row gives the number, why it is that number, and the formula where one applies. Size, spin, air, power, heat and travel.
lead: The values that define Concordia, grouped by system. Each row says what the number is, why it is that number, and where a formula gives it. Rounded values are in the body of the site. These are the exact ones.
nav: station
order: 4
hero: film-cold-megaframe
updated: 2026-10-10
related:
  - /station/
  - /science/artificial-gravity/
  - /science/power-and-heat/
  - /science/moving-around/
---

These are the station's design values, plus quantities worked out from them. Rows marked "derived" are computed from other rows with the formula shown. The Basis column says what kind of number each row is: established physics, a design value, an engineering challenge or story. [What the tags mean](/about/#basis).

## Size and position

| Quantity | Value | Basis | Why | Formula |
| --- | --- | --- | --- | --- |
| Orbit | Earth-Moon L5 region, 384,400 km from Earth | {% basis "design" %} | Low-energy access to lunar material, room to build, a market within reach |  |
| Orbital speed | 1.018 km/s | {% basis "physics" %} | Same as the Moon's |  |
| Length | 21 km | {% basis "design" %} | Four rotors, industry, yard and port on one axis |  |
| Maximum diameter | 6.2 km (radius 3,100 m) | {% basis "design" %} | Shell sits outside 2,500 m rotors with room for shielding |  |
| Hull surface | about 470 km2 | {% basis "design" %} | Sets the shielding and radiator areas | 2 pi r L + 2 pi r^2 = 469 km2 (derived) |
| Population now | about 400,000 | {% basis "fiction" %} | Rotors fill one at a time |  |
| Design population | 1.0 to 1.2 million | {% basis "design" %} | Four rotors with elevated building |  |
| Finished mass | about 2.05 x 10^12 kg, two billion tonnes | {% basis "design" %} | Why Earth launch cannot supply it | sum of the mass budget below (derived) |

<!-- facts: sections 1, 4 -->

{% shot "st-complete-habitat" "Concordia from far off, with the aft end at left." %}

## Spin and gravity

| Quantity | Value | Basis | Why | Formula |
| --- | --- | --- | --- | --- |
| Rotor radius | 2,500 m | {% basis "design" %} | A big radius gives 1 g at a slow spin |  |
| Rotor length | 2,500 m | {% basis "design" %} | Room for a city in each rotor |  |
| Spin rate | 0.0626 rad/s (0.598 rpm) | {% basis "design" %} | Sets 1 g at the ground | w = 2 pi / T |
| Period | about 100.4 s | {% basis "physics" %} | One turn | T = 2 pi / w = 100.37 s (derived) |
| Rim speed | about 157 m/s | {% basis "physics" %} | How fast the ground moves | v = w r = 156.5 m/s (derived) |
| Ground gravity | 1.00 g | {% basis "physics" %} | Weight equals Earth's | g = w^2 r / 9.80665 = 0.999 (derived) |
| Gravity at height h | 1 - h / 2,500 m | {% basis "physics" %} | Weight falls in a straight line to the axis | g(h) = 1 - h / r |
| Sky level (450 m) | 0.82 g | {% basis "physics" %} | Where the artificial sky hangs | g = 1 - 450 / 2,500 = 0.82 |
| Farm level (1,000 m) | 0.60 g | {% basis "physics" %} | Partial-gravity growing | 1 - 1,000 / 2,500 |
| Hub terminal (r = 70 m) | 0.028 g | {% basis "physics" %} | Almost weightless at the axis | w^2 r / 9.80665 |
| Head-to-foot gradient (1.8 m) | 0.07 percent of 1 g | {% basis "physics" %} | Too small to feel | w^2 x 1.8 / 9.80665 = 0.0007 g (derived) |
| Rotor gap | 300 m | {% basis "design" %} | Space between neighbouring rotors |  |

<!-- facts: section 2 -->

## Structure, shielding and air

| Quantity | Value | Basis | Why | Formula |
| --- | --- | --- | --- | --- |
| Atmosphere | about 1 atm (101 kPa) | {% basis "design" %} | Earth-like air in the rotors, spine and above the sky |  |
| Air volume | almost 200 km3 | {% basis "design" %} | Four rotors | pi r^2 L x 4 = 196 km3 (derived) |
| Air mass | 150 to 200 Mt; about 45 Mt per rotor | {% basis "physics" %} | Why volatiles are an industry |  |
| Rotor wall load from the air | about 250 MN per metre of length | {% basis "physics" %} | Tension bands carry the pressure, not a thin can | P x r = 101,325 x 2,500 = 253 MN/m (derived) |
| Megaframe | extends to 1,500 m, plates to 800 m | {% basis "design" %} | The prebuilt lattice that holds the elevated city |  |
| Megaframe mass | about 6 Mt per rotor (estimate) | {% basis "challenge" %} | About 150 kg per m2 of floor, about fifty times lighter than the same volume built solid | 300 Mt / 6 Mt = 50 (derived) |
| Shield example | 1 m at 1.6 t/m3 = about 750 Mt | {% basis "design" %} | Order of magnitude for regolith cover | 1 m x 1.6 t/m3 x 470 km2 |
| End wall | 2,436 m tall, 24 cells | {% basis "design" %} | An inhabited cliff at each rotor end | 2,500 m - 64 m bore |
| Spine | 120 m diameter, never rotates | {% basis "design" %} | Zero-g transport and utility core |  |
| Bridge | 300 m between end walls, 45 m above ground | {% basis "design" %} | Links same-spin neighbours |  |

<!-- facts: sections 2, 4, 5 -->

{% shot "sci-awf-pressure" "The pressure overlay: the rotors, the spine and the space above the sky hold about 1 atm, while the shell around them is vacuum." %}

## Mass budget

The finished station is about 2.05 x 10^12 kg, about two billion tonnes. The table lists what is included: the four habitation rotors with their air, Ehricke (the industrial rotor), and the shielding example. The spine, ports, radiators and yards are small next to these rows and are not itemised.

| Part | Mass | Basis | Why | Formula |
| --- | --- | --- | --- | --- |
| Four habitation rotors, air included | 1.2 x 10^12 kg | {% basis "design" %} | Each rotor is planned at 3 x 10^11 kg, about 45 Mt of it air | 4 x 3 x 10^11 kg |
| Ehricke (the industrial rotor) | 1 x 10^11 kg | {% basis "design" %} | The rotating mass of the industrial rotor |  |
| Stationary shielding | about 7.5 x 10^11 kg | {% basis "design" %} | One metre of regolith at 1.6 t/m3 over the hull | 1 m x 1,600 kg/m3 x 470 km2 (derived) |
| **Total** | **about 2.05 x 10^12 kg** | {% basis "design" %} | Still of the order of 10^12 kg | 1.2 + 0.1 + 0.75 = 2.05 x 10^12 kg (derived) |
| In International Space Stations | about 4.9 million | {% basis "design" %} | One ISS is 419,725 kg | 2.05 x 10^12 / 419,725 (derived) |
| Momentum rings, share of the total | about 0.35 percent | {% basis "design" %} | About 7 Mt of rim | 7 x 10^9 / 2.05 x 10^12 = 0.34 percent (derived) |

<!-- facts: section 4 -->

## Momentum and industry

| Quantity | Value | Basis | Why | Formula |
| --- | --- | --- | --- | --- |
| Net angular momentum | zero by construction | {% basis "physics" %} | A steerable station | Tsiolkovsky and Noordung (Rotors 1+2) = -50 percent, Bernal and O'Neill (Rotors 3+4) = +50 percent |
| Rotor angular momentum | 1.2 x 10^17 N m s each | {% basis "physics" %} | Cancelled in pairs | L = m r^2 w, with m = 3 x 10^11 kg |
| Ehricke (the industrial rotor) | radius 2,300 m, 3,500 m long | {% basis "design" %} | Heavy industry at partial gravity |  |
| Industrial spin | 0.044 rad/s, period 142.8 s | {% basis "design" %} | Opposes O'Neill (Rotor 4) | T = 2 pi / w (derived) |
| Industrial gravity | about 0.45 g | {% basis "physics" %} | Lower than the cities | w^2 r / 9.80665 = 0.454 g (derived) |
| Industrial momentum | 1.9 x 10^16 N m s, about 4 percent | {% basis "physics" %} | Cancelled by the momentum rings |  |
| Momentum rings | about 7 Mt total | {% basis "design" %} | Store what the pairs cannot cancel | m = L / (v r) at 1 km/s, 3,000 m |
| Net hold | within 0.1 percent | {% basis "design" %} | Cargo and launches move it |  |
| Shipyard | about 3,500 m long, zero g | {% basis "design" %} | Build without a floor |  |
| Example ship | 700 m long | {% basis "design" %} | Scale of the hero vessel |  |

<!-- facts: sections 2, 3, 6 -->

{% explore viewpoint="industrial-rotor-wide" %} {% explore viewpoint="momentum-control-bay" %}

## Power, heat and light

| Quantity | Value | Basis | Why | Formula |
| --- | --- | --- | --- | --- |
| Average power draw | 20 to 25 GW | {% basis "design" %} | Four cities, industry, the skies and the launcher |  |
| Power system sized for | about 40 GW continuous | {% basis "challenge" %} | Room for industry to grow |  |
| Solar area | about 118 km2, about 28 platforms | {% basis "design" %} | Platforms sit away from the hull | 40 GW / 340 W/m2 (derived) |
| Main power line | 4 bipoles at +/-1.2 MV, 4.2 kA per conductor | {% basis "design" %} | Low loss over 7 km | loss about 0.02 percent |
| Black start | 2 reactors, 250 MWe each | {% basis "challenge" %} | Restarts the grid from nothing |  |
| Heat to reject | up to 40 GW at 380 to 500 K | {% basis "physics" %} | All power ends up as heat | P = emissivity x sigma x A x T^4 |
| Radiator flux at 450 K | about 2.1 kW/m2 | {% basis "physics" %} | One-sided panel | q = emissivity x sigma x T^4, emissivity about 0.9 (derived) |
| Radiator area | about 19 km2 at 450 K | {% basis "physics" %} | What the heat needs | 40 GW / 2.1 kW/m2 (derived) |
| Sky brightness | 900 cd/m2 mean | {% basis "design" %} | Daylight feel |  |
| Sky power | 2.2 GW average | {% basis "design" %} | Four rotors, day phases 6 h apart | up to 2.6 GW |
| Day length | 10 to 14 h by rotor | {% basis "design" %} | Each rotor keeps its own clock |  |

<!-- facts: sections 4, 6 -->

{% shot "st-radiator-field" "A radiator field. Every watt the station uses leaves this way." %}

## Moving around and leaving

| Quantity | Value | Basis | Why | Formula |
| --- | --- | --- | --- | --- |
| Metro height | 45 m above the street | {% basis "design" %} | Viaducts, not tunnels |  |
| Metro Coriolis | 0.66 g antispinward at 100 km/h, 1.33 g spinward at 90 km/h | {% basis "physics" %} | Weight changes with direction | 2 w v = 3.5 m/s2 at 100 km/h |
| Axial metro | 0.98 g | {% basis "physics" %} | No Coriolis along the axis |  |
| Ascender | 2,380 m in about 595 s; 150 passengers | {% basis "design" %} | Ground to hub | avg 4.0 m/s |
| Hub spin transfer | about 602 s per cycle | {% basis "challenge" %} | De-spin, couple, spin up |  |
| Spine express | 140 m/s | {% basis "design" %} | Hub to spaceport in minutes |  |
| Launch track | about 10 km at 1.5 g for about 37 s | {% basis "challenge" %} | Cuts the propellant for departure | v = a t = 544 m/s (derived) |
| Exit speed | about 540 m/s | {% basis "design" %} | First leg of the trip |  |
| Launch energy | about 146 MJ per tonne | {% basis "physics" %} | Kinetic energy at exit | 0.5 m v^2 (derived) |
| Earth transfer | about 5 days | {% basis "physics" %} | Direct fall, one midcourse trim on day 2 |  |
| Capture burn | 395 m/s at 400 km perigee | {% basis "physics" %} | Into a 21 h orbit |  |

<!-- facts: sections 5, 7 -->

{% explore chapter="ascender" label="Ride the ascender" %} {% explore viewpoint="passenger-launcher-interior" %}

{% shot "sci-ov-transport" "The transportation overlay: ascenders, the spine express, the metro ring and the launcher, each with its headline number." %}

{% deeper "Check any row yourself" %}
Almost every gravity and speed value follows from two numbers: the spin rate and the radius.

{% eq %}
g = w^2 x r / 9.80665
v = w x r
T = 2 pi / w
{% endeq %}

With w = 0.0626 rad/s and r = 2,500 m: g = 0.0039188 x 2,500 / 9.80665 = 0.999, v = 156.5 m/s, T = 100.37 s. The Coriolis acceleration on something moving at speed v along the ground is 2 x w x v. At 100 km/h (27.8 m/s) that is 2 x 0.0626 x 27.8 = 3.5 m/s2, or 0.36 g. The exact weight on the ring viaduct (r = 2,455 m, floor speed 153.7 m/s) is (w r +/- v)^2 / r: 0.98 g standing, (153.7 - 27.8)^2 / 2,455 = 6.46 m/s2 = 0.66 g against the spin at 100 km/h, and (153.7 + 25.0)^2 / 2,455 = 13.0 m/s2 = 1.33 g with the spin at 90 km/h.
{% enddeeper %}
