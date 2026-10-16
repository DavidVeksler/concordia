---
title: Why we build in space
crumb: Why space
description: "The commercial case for a city at L5: continuous sunlight, a shallow gravity well on the Moon, room to grow, factories that work better in zero g, and a propellant market. With the numbers."
lead: Concordia exists because it pays. Sunlight is steady, the Moon is easy to leave, and some industries work better without a floor. A city follows once the industry is there.
nav: station
order: 5
hero: film-shipyard
updated: 2026-10-10
related:
  - /station/building-concordia/
  - /science/materials/
  - /science/getting-there/
  - /places/shipyard/
---

## Sunlight all day

Above the atmosphere sunlight is steady: about 1,361 W/m2 at Earth's distance. At L5 there is almost no night, no cloud and no season. A solar panel in space collects almost around the clock, so a factory does not wait for morning.

Concordia draws 20 to 25 GW and is sized for about 40 GW. At 340 W/m2 delivered, that is about 118 km2 of panel, roughly 28 platforms of 4.2 km2, parked away from the hull and linked by tether and power line. That electricity runs furnaces, mass drivers, farms, the artificial sky and four cities. It also leaves as heat, which is why the station carries radiators covering tens of square kilometres. {% explore viewpoint="solar-infrastructure" %} {% explore viewpoint="radiator-field" %}

{% shot "st-solar-infrastructure" "Solar power platforms beyond the aft end." %}

## A shallow gravity well

Getting mass off Earth is the expensive step. Earth's escape velocity is 11.2 km/s. The Moon's is 2.38 km/s, and its surface gravity is 1.62 m/s2 against 9.80. The energy to escape one kilogram is about 22 times lower from the Moon: 2.8 MJ against 62.7 MJ.

Launch prices have fallen a lot. NASA's Harry Jones compared them in 2018: about $54,500 per kg to low Earth orbit on the Space Shuttle, about $2,720 on Falcon 9. Fully reusable heavy launchers, refuelled in orbit, then took it to about $20 per kg to low orbit and about $100 per kg delivered to L5. Cheap launch is how the first factory, the asteroid haulers and the crews got up. It is still $200 trillion to launch a station of two billion tonnes. The Moon and the asteroids, not a bigger rocket, supply the bulk of Concordia. Earth supplies what is light and rare: chips, instruments, specialist parts and people.

## Room

The four rotors enclose almost 200 km3 of air and about 157 km2 of ground at 1 g, before any elevated building. The megaframe raises usable floor area many times beyond that. The land is new, flat and built where it is needed, and the station is designed to be expanded and rebuilt for centuries.

{% shot "st-district-skyline" "A district of Tsiolkovsky (Rotor 1). The megaframe carries the floors above the street." %}

## Industry that works better in zero g

A floor is a constraint. A 700 m ship built on a floor must carry its own weight. In the Concordia shipyard it floats, held by soft-capture rings, and builders work all the way around it. Large tanks, truss assemblies, telescopes, vacuum metallurgy and oversized additive manufacturing all gain from weightlessness or hard vacuum. Ehricke (the industrial rotor) adds partial gravity where flow helps and vacuum where heat has to leave.

{% shot "sci-shipyard-close" "A ship built in zero g: Meridian 04 hangs in capture rings with builders reaching her from every side, and no floor takes her weight." %}

Real microgravity work is already under way. NASA reports that the International Space Station supports fluid-behaviour studies, biomedical research on bone loss, vaccines and drugs, and commercial product development. Concordia scales that from a lab to a yard.

{% explore viewpoint="zero-g-shipyard" %} {% explore viewpoint="industrial-rotor-wide" %}

## Propellant is a market

Every ship in cislunar space needs fuel, and most of a chemical rocket's propellant is oxygen. The shuttle that carries 96 passengers to Earth burns methane and oxygen, 68 tonnes on a round trip: 53 tonnes of oxygen and 15 of methane. Oxygen is about 78 percent of that mass, and lunar rock is 43 percent oxygen. Only the carbon and hydrogen in the methane come from elsewhere, mostly from asteroids. Every tonne of oxygen a ship loads here is a tonne that did not climb out of Earth's gravity, which at 2018 Falcon 9 prices cost $2.7 million.

Water ice from the lunar poles and from asteroids is the other half. Split it and you have hydrogen and oxygen for engines. Concordia's tank farm sits beyond the forward end, and ships top up there without carrying fuel for the whole trip from Earth. The launch track cuts the propellant a departing ship must carry by about 30 tonnes.

## Cities follow industry

Cities grew around ports, mills and mines. Concordia follows the same pattern, one step out. Gerard O'Neill made the case in Physics Today in 1974: build from lunar material, run on constant sunlight, and pay the way with what the settlement makes. Concordia is that argument with the industry in place. Revenue is output sold across cislunar space and to Earth: energy and computation, structural materials, propellant, ships and services. The factory came first, and it needed few hands. Its owners and the people who direct its machines came next, then schools, parks, farms and neighbours ([who pays for Concordia](/station/economy/)). Rotors fill one at a time: tens of thousands of residents at the start, about 400,000 today, room for a million.

{% shot "st-spaceport-pier" "A pier at the spaceport. Ships dock, refuel and leave from here." %}

{% deeper "The arithmetic" %}
Escape energy per kilogram is half the square of escape velocity.

{% eq %}
E = 0.5 x v^2
Earth: 0.5 x (11,200 m/s)^2 = 62.7 MJ/kg
Moon:  0.5 x (2,380 m/s)^2 = 2.8 MJ/kg
Ratio: 22
{% endeq %}

Launch cost for the whole station with fully reusable heavy launchers (about $2 million and 100 t a flight, four tankers per load bound for L5):

{% eq %}
$2 million / 100,000 kg = $20 per kg to low orbit
5 flights x $2 million / 100,000 kg = $100 per kg to L5
$100 per kg x 2.05 x 10^12 kg = $2 x 10^14
2.05 x 10^12 kg / 100,000 kg per load = 2 x 10^7 loads
{% endeq %}

At the 2018 Falcon 9 price the same mass would have cost $2,720 x 2.05 x 10^12 = $5.6 x 10^15.

Solar area for 40 GW at 340 W/m2 delivered: 40 x 10^9 / 340 = 1.18 x 10^8 m2, or 118 km2.

Oxygen share of the shuttle's methane and oxygen: 53 / 68 = 78 percent. Price of one tonne delivered to L5 at $100 per kg: $100,000.
{% enddeeper %}

<!-- facts: sections 2, 6, 7 -->

{% sources %}
- Mike Brown, "SpaceX Starship: Elon Musk outlines an ultra-low price tag for launches", Inverse, 2019 (about $2 million per flight and at least 100 t to orbit, the stated goal used here as the launch baseline): [inverse.com](https://www.inverse.com/article/60712-spacex-starship-elon-musk-outlines-cost-for-launches).
- Harry W. Jones, NASA Ames, "The Recent Large Reduction in Space Launch Cost", ICES 2018 ($54,500/kg Space Shuttle, $2,720/kg Falcon 9): [ntrs.nasa.gov](https://ntrs.nasa.gov/citations/20200001093).
- NASA, Moon fact sheet (escape velocity 2.38 km/s, gravity 1.62 m/s2; Earth 11.2 km/s, 9.80 m/s2): [nssdc.gsfc.nasa.gov](https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html).
- Kopp and Lean, "A new, lower value of total solar irradiance: Evidence and climate significance", Geophysical Research Letters 38, 2011 (about 1,361 W/m2): [doi.org/10.1029/2010GL045777](https://doi.org/10.1029/2010GL045777).
- NASA, "International Space Station research" (microgravity fluid, biomedical and commercial work): [nasa.gov](https://www.nasa.gov/missions/station/iss-research/).
- Gerard K. O'Neill, "The Colonization of Space", Physics Today 27(9), September 1974: [physicstoday.aip.org/features/the-colonization-of-space](https://physicstoday.aip.org/features/the-colonization-of-space).
- Universe Today, "Air From Moonrocks": 43 percent of lunar soil by mass is oxygen (NASA Goddard work on oxygen extraction): [universetoday.com](https://universetoday.com/8166/air-from-moonrocks).
{% endsources %}
