---
title: "Radiation shielding and debris in space habitats"
h1: "Radiation and debris"
description: "Space sends fast particles and small rocks at every habitat. See how Concordia answers with mass: a layered shield stack, storm shelters and a watch for anything bigger than a fist."
lead: "Space is full of fast particles and drifting rocks. Concordia answers with mass: a thick layered shell of regolith and water, shelters for solar storms, and a layered watch for anything big enough to matter."
hero: sci-rad-hull
nav: science
order: 4
updated: 2026-10-10
related:
  - /science/structure/
  - /science/artificial-gravity/
  - /station/building-concordia/
  - /science/safety/
---

## Two kinds of radiation

Space radiation comes in two kinds, and they need different answers.

{% term "galactic cosmic rays" %} are a constant rain of fast protons and heavy atomic nuclei from outside the solar system. They arrive from every direction all the time. They are strongest when the Sun is quiet. Thin shielding does little against them, because a cosmic ray that hits a wall breaks into a shower of smaller particles. NASA puts the average cut from aluminium or polyethylene at about 7 percent. {% basis "physics" %}

A {% term "solar particle event" %} is a storm. The Sun throws out a burst of protons that is lower in energy than a cosmic ray and easier to stop. Storms are infrequent and peak around solar maximum. The same NASA brief says 5 to 20 grams per square centimetre of aluminium or polyethylene works against them, and that warning plus a shelter is the main defence. {% basis "physics" %}

## Mass is the shield

The best shield is a lot of stuff. Earth wears one: the air above your head is about 1,000 grams of material over every square centimetre. A spacecraft has a few grams. NASA recommends at least 20 g/cm² for missions longer than six months. {% basis "physics" %}

Concordia has the Moon. A layer of {% term "regolith" %} one metre thick at 1.6 tonnes per cubic metre is 160 g/cm², eight times NASA's guideline for a long mission. Covering the 470 km² of the station's surface at that thickness takes about 750 million tonnes. {% basis "design" %} For the same hazards at the scale of a crewed vehicle or a lunar base, see the [radiation and shielding table of the CheatSheets space habitat guide](https://cheatsheets.davidveksler.com/space-habitats-life-support.html?utm_source=concordia&utm_medium=referral&utm_campaign=cheatsheets_crosslink&utm_content=science-radiation-and-debris#radiation-shielding). That is why the station was built factory-first: asteroid haulers brought the first metal, and lunar mining and a mass driver were running at scale ahead of the first rotor (see [how Concordia was built](/station/building-concordia/)). {% basis "fiction" %}

{% diagram "shield-stack" "Seven layers from space to the air: impact layer, vacuum, regolith cassettes, structural shell, service vacuum, water, pressure vessel." %}

The stack has seven layers. A sacrificial layer on the outside breaks up small debris. A vacuum gap lets the fragments spread. The thick regolith and slag cassettes stop what is left and thin the radiation. A structural shell carries the load. Behind it lies a service vacuum for robots and plumbing, then a layer of water and other hydrogen-rich material, which stops particles well. The rotating pressure vessel with the air is the last layer, hundreds of metres inward. {% basis "design" %}

The thickness is not one number. Particle-transport calculations set it, and the shield is thickest where people sleep or heal: over bedrooms, hospitals, command centres and shelters. The 1 m example gives the scale.

The shield has gaps by design. The open industrial bay and the shipyard cage are not shielded, because robots do most of the work there and people go in pressurised capsules. And there are no large windows to space anywhere in a rotor. A window is a hole in the shield. The sky overhead is a display. {% basis "design" %}

{% shots "sci-rad-hull" "Up close the shield is a mosaic of regolith and slag cassettes, with repair seams and a rail for the crawlers that swap them." "sci-ov-shielding" "From 5 km with the shielding overlay: the same cassettes form the outer layer, with a standoff vacuum behind. The open industrial bay is one of the shield's two planned gaps." %}
{% explore viewpoint="exterior-hull-close" %}
{% explore viewpoint="exterior-5km-systems" overlay="shielding" label="Shielding overlay" %}

## Storm shelters

A solar storm is stopped by shelter, not by thickness everywhere. People who are away from the thickest shielding go to a dedicated storm shelter when the alert sounds. Concordia has them in the terminal citadel and at the roots of the piers. Pressure refuges along the stationary spine cover a different emergency, a loss of air. [Safety](/science/safety/) shows how the refuges, pressure districts and shield fit together. {% basis "design" %}

NASA's rule of thumb gives the scale. A vehicle with 20 g/cm² of aluminium keeps a once-in-a-decade storm under the limit. For a storm that comes once in a century, add a shelter with 10 cm of water or its equivalent. For one in a thousand years, add 20 cm. About 95 percent of storms never approach dose limits. {% basis "physics" %}

The numbers on the other side matter too. NASA limits an astronaut's whole career to 600 millisieverts and a single storm to 250. The 1975 NASA settlement study set a design target of 0.5 rem a year, 5 millisieverts, for the general population of a settlement. A city of children has a stricter standard than a mission. {% basis "design" %}

{% shot "sci-rad-pier" "A freighter alongside a spaceport pier at the forward end of the station. Storm shelters sit at the pier roots." %}
{% explore viewpoint="spaceport-pier" %}
{% explore viewpoint="spine-shelter" label="A pressure refuge in the spine" %}

## Debris

Small rocks are rarely a surprise. The engineering question is how big. Around Earth, radar tracks objects larger than about 10 cm. Between 1 and 10 cm, objects are numerous and not individually tracked. Below 1 cm, shielding handles them. The International Space Station withstands impacts up to about 1 cm on its critical parts. {% basis "physics" %}

The trick behind that shielding is the {% term "Whipple shield" %}: a thin outer bumper spaced out from the wall. The bumper breaks a fast projectile into a cloud, and the cloud spreads its energy over a wide patch of the wall behind. Concordia's thick stack works this way. The 1 to 10 cm range, which a catalogue cannot see and a thin shield cannot stop, is covered by metres of sintered regolith with bumper layers in front.

Anything larger than 10 cm gets a watch. Four defence sites, two at each end of the station, carry radar fences, an 85 m tracking dish, survey telescopes and lidar masts. Launcher batteries behind them hold heavy interceptors, rapid interceptors, point-defence guns and net launchers. The logic is layered detection and intercept, not shooting every particle. Directed-energy weapons are left out on purpose. The cargo mass drivers stay separate from defence, and incoming shipments from the Moon and asteroids are caught tens to hundreds of kilometres away, never aimed at the habitat. {% basis "challenge" %}

{% shot "sci-rad-battery" "The forward defence battery: armoured housing, reload magazine and interceptor cells on the hull." %}
{% explore viewpoint="defence-forward-battery" %}
{% explore viewpoint="complete-habitat" overlay="defence" label="Defence overlay" %}

## What it feels like

Nothing. That is the point. The sky is a display, the shell is opaque and the air feels like air. You meet the shield in small ways: a shelter hatch in a terminal, a serial number stencilled on a cassette on a hull tour. A resident thinks about radiation about as often as anyone on Earth thinks about cosmic rays. {% basis "fiction" %}

{% deeper "Shielding arithmetic" basis="physics" %}
Shielding is measured in areal density, mass per unit area: ρ × t.

{% eq %}
Regolith: 1,600 kg/m³ × 1 m = 1,600 kg/m² = 160 g/cm²
Station surface: A ≈ 470 km² = 4.7 × 10⁸ m²
Mass: 1,600 × 4.7 × 10⁸ = 7.5 × 10¹¹ kg = 750 million tonnes
{% endeq %}

For scale, a column of sea-level air is P / g:

{% eq %}
101,325 Pa / 9.81 m/s² = 10,330 kg/m² = 1,033 g/cm²
Aluminium for 20 g/cm²: 20 / 2.7 g/cm³ = 7.4 cm
Water for 10 g/cm²: 10 cm
{% endeq %}

| Reference | Areal density |
| --- | --- |
| NASA guideline for storms, long missions | 20 g/cm² |
| Storm shelter, extra for a 1-in-100-year storm | 10 g/cm² (10 cm water) |
| One metre of regolith | 160 g/cm² |
| Earth's atmosphere | about 1,000 g/cm² |

<!-- facts: section 4 (shell and shielding; debris and defence) -->
{% enddeeper %}

{% deeper "Worked example: what a small rock carries" basis="physics" %}
A 1 cm aluminium sphere has a mass of ρ × 4/3 × π × r³ = 2,700 × 4.19 × (0.005)³ = 1.4 g. At an illustrative closing speed of 10 km/s:

{% eq %}
E = ½ × m × v² = 0.5 × 0.0014 kg × (10,000 m/s)² = 71 kJ
{% endeq %}

That is the energy of a 1,000 kg car at 43 km/h, concentrated in a point the size of a fingertip. Make the sphere 10 cm and its mass grows with the cube of the radius, so the energy is 1,000 times larger: 71 MJ, about 17 kg of TNT. This is why the line between shielding and interception falls near 10 cm.
{% enddeeper %}

{% deeper "The layered defence" basis="design" %}
Two defence sites sit forward, at about 9,700 m along the axis, and two aft, at about −9,500 m. The layers run from long range to short: detection and tracking, cargo capture far from the station, heavy interceptors for large objects, rapid interceptors, then point defence close in. Civilian mass drivers share no hardware with them.
{% enddeeper %}

{% sources %}
- NASA Office of the Chief Health and Medical Officer, "Design for Ionizing Radiation Protection", NASA-STD-3001 Technical Brief OCHMO-TB-020 Rev G, June 2025: [nasa.gov PDF](https://www.nasa.gov/sites/default/files/atoms/files/radiation_protection_technical_brief_ochmo.pdf). Source of the GCR and storm descriptions, the 7 percent, 5 to 20 g/cm², 20 g/cm², 10 cm and 20 cm water figures, and the 600 and 250 millisievert limits.
- Richard D. Johnson and Charles Holbrow (eds.), Space Settlements: A Design Study, NASA SP-413, 1977: [ntrs.nasa.gov/citations/19770014162](https://ntrs.nasa.gov/citations/19770014162). The 0.5 rem a year population target is in the design basis chapter: [nss.org/settlement/nasa/75SummerStudy/Chapt3.html](https://nss.org/settlement/nasa/75SummerStudy/Chapt3.html).
- NASA Orbital Debris Program Office, "Frequently Asked Questions": [orbitaldebris.jsc.nasa.gov/faq](https://orbitaldebris.jsc.nasa.gov/faq/). Tracking above 10 cm, about 500,000 untracked objects of 1 to 10 cm, and ISS protection up to 1 cm.
- National Research Council, Protecting the Space Station from Meteoroids and Orbital Debris, 1997, chapter 4, "Shielding the International Space Station": [nationalacademies.org/read/5532/chapter/6](https://www.nationalacademies.org/read/5532/chapter/6). The bumper concept and the 1 cm design threat.
- Concordia engineering specification, sections 4, 6, 7 and 43, and the exterior defence design note.
{% endsources %}
