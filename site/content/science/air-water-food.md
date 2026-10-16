---
title: Air, water and food
description: "Concordia breathes sea-level air, drinks recycled water and eats food grown in the upper city. See how the loops close, what leaks, and how the Moon and asteroids top them up."
lead: "Concordia breathes air at Earth sea-level pressure, drinks water it has used many times and eats food grown in the upper city. The loops are almost closed. What leaks out is replaced from the Moon and the asteroids."
hero: sci-awf-farm
nav: science
order: 5
updated: 2026-10-10
related:
  - /science/structure/
  - /science/radiation-and-debris/
  - /places/upper-city-farms/
---

## The air

The air in Concordia is Earth's air. The pressure is 101 kPa, the same as sea level, and the gas is oxygen plus an inert diluent, as on Earth. Nitrogen is the natural diluent. NASA's reference sea-level air is 78 percent nitrogen and 21 percent oxygen, and the International Space Station keeps the same pressure and oxygen share. NASA's standard allows crews to live indefinitely anywhere from 34.5 to 103 kPa with at least 30 percent diluent. {% basis "physics" %} Concordia sits near the top of that range. {% basis "design" %}

That air fills about 200 km³ across four rotors. It adds up to some 150 to 200 million tonnes. Oxygen is easy to get, because the Moon's rock is full of it. Nitrogen is scarce on the Moon, and carbonaceous asteroids supply it. (See [how Concordia was built](/station/building-concordia/).)

The air above the artificial sky is the same air as the air below, and the sky is not a pressure boundary. There is no weather except what the sky schedules ([light and sky](/science/light-and-sky/)), and it never rains. Air movement is engineered, and fire protection is built in: low-flammability materials, smoke detection, suppression drones, water mist, mostly electric cooking, and independent refuge zones in large buildings.

Because the air spins with the rotor, it thins slightly toward the axis, the way air thins on a mountain. The ground has the full 101 kPa. At the farms, 1,000 m up, the pressure is about 9 percent lower. {% basis "physics" %}

{% shot "sci-awf-pressure" "A view of the whole habitat with the pressure overlay showing the 1 atm rotors, the spine and the vacuum shell." %}
{% explore viewpoint="complete-habitat" overlay="pressure" label="Pressure overlay" %}

## Water

Water does more than quench thirst. In Concordia it is shielding, ballast, fire protection and scenery, and it is stored everywhere: in lakes, in structural tanks, in the shielding layers, on the farms, in the reservoirs that balance each rotor, and in the shelters. The inventory is tens of millions of tonnes.

Each rotor holds between 72 and 114 lakes, with the largest about 300 m on a side. Open space takes about a third of the ground in Tsiolkovsky (Rotor 1). The lakes are the visible part of a system that runs continuously: water is collected, cleaned and returned. {% basis "design" %}

The recovery rate matters more than the volume. The best real-world benchmark is the International Space Station, whose life support recovered 93 to 94 percent of its water until a brine processor was added, and has since demonstrated 98 percent. {% basis "physics" %} Concordia's design target is the same kind of number: extremely high recovery rather than an absolutely closed loop. Whatever slips away is replaced with ice from the Moon's poles and from asteroids. {% basis "challenge" %}

{% shot "sc-rotor3-lakeside-promenade" "A lake in Bernal. Each rotor holds 72 to 114 of them, and the water is also ballast, shielding and fire protection." %}

## Waste is inventory

There is no landfill. Every kind of waste is a stock of elements, tracked by inventory: water, carbon, nitrogen, phosphorus, metals, glass, polymers and biological nutrients. Recycling lines in Ehricke (the industrial rotor) sort and refine what households and factories send back. This is {% term "closed-loop life support" %} on the scale of a city, and the books balance the way a company's do, element by element. {% basis "challenge" %}

A station that recovers 99 percent still loses 1 percent a cycle, so imports never reach zero. The Moon supplies oxygen, silicon, aluminium and iron without strain. The scarce items are carbon, hydrogen and nitrogen, and the {% term "volatiles" %} that carry them come from {% term "carbonaceous asteroid" "carbonaceous asteroids" %}.

## Food in the upper city

Food grows at the top of the city, in the upper fringe above about 800 m. Housing stops there. What sits above is an atmospheric service district: crop galleries, nutrient vessels, process halls and utility plants. The air is the shared air of the rotor, and the gravity is 0.6 g at 1,000 m, where rotor 1's farm stands.

Crops grow without soil, in water ({% term "hydroponics" %}) or in a mist around bare roots ({% term "aeroponics" %}), stacked on decks. Its grow hall is 288 m long, 124 m wide and 96 m tall, with 12 decks in 24 bays, and four aeroponic towers 72 m tall stand beside it. Next to the crops sit fermentation vessels that make protein and other food from microbes, and a process wing: wash, sort, pack, bakery, bottling and cold store. A bridge joins the farm to the ascender tower, and ordinary freight carries the food down. {% basis "design" %}

{% shot "sci-awf-farm" "Racks of lettuce and basil on a grow deck, seen from the visitor gallery of the grow hall." %}
{% explore viewpoint="farm-grow-deck" %}
{% explore viewpoint="upper-city-fringe" overlay="material-flow" label="Material flow overlay at the upper fringe" %}
{% explore chapter="agriculture" %}

Partial gravity is preferred to zero gravity for crops and for the workers who tend them. Children and routine healthcare stay in the 1 g cities, so the farm is a workplace, a short ride up the ascender. {% basis "design" %}

## What it feels like

The smell of basil on a grow deck. A gallery window onto racks of lettuce rising 96 m. At the dispatch dock, crates of salad, trays of loaves and wrapped pallets leave on freight. Food looks like food. Back at street level, no one thinks about the loop. A tap runs, a lake sits flat under the sky, and a market stall sells salad that was grown a ride up the ascender. {% basis "fiction" %}

{% deeper "Pressure up and down the rotor" basis="physics" %}
The air co-rotates with the rotor. For air at a constant temperature T with specific gas constant R, pressure rises toward the rim by the same exponential rule as the barometric formula, with the centrifugal potential ω² r² / 2 in place of g × h:

{% eq %}
p(r) = p_axis × exp( ω² r² / (2 R T) )
{% endeq %}

With ω = 0.0626 rad/s, R = 287 J/(kg·K) and T = 293 K, the exponent at the ground is (0.0626 × 2,500)² / (2 × 287 × 293) = 0.146, so the ground pressure is 1.157 times the axis pressure.

| Height | Radius | Pressure |
| --- | --- | --- |
| Ground | 2,500 m | 101.3 kPa |
| Sky | 2,050 m | 96.6 kPa |
| Crop galleries | 1,500 m | 92.3 kPa |
| Upper frame | 500 m | 88.1 kPa |
| Axis | 0 m | 87.6 kPa |

At the axis the air is as thin as in a town 1,200 m above sea level on Earth. Oxygen keeps its share, so the partial pressure at the axis is 21 percent of 87.6, about 18 kPa. The ground value, 101 kPa, is the one quoted as the habitat pressure.

<!-- facts: section 2 (atmosphere) -->
{% enddeeper %}

{% deeper "Why recovery rate dominates" basis="physics" %}
Suppose a water molecule survives each pass through the recycling system with probability R. After n passes the original water remaining is R^n.

| Recovery per pass | After 10 passes | After 50 passes |
| --- | --- | --- |
| 93% | 48% | 3% |
| 98% | 82% | 36% |
| 99.9% | 99% | 95% |

Each point of recovery matters. The ISS jump from 93 to 98 percent cut its water losses by about 70 percent. A city of a million people that loses 0.1 percent per pass needs only a small top-up.
{% enddeeper %}

{% deeper "Farm sizing, order of magnitude" basis="design" %}
Rotor 1's grow hall has 12 decks, each 288 m × 124 m:

{% eq %}
area = 12 × 288 × 124 = 4.3 × 10⁵ m²
at 60 kg/m²/year of lettuce-type crop: 2.6 × 10⁴ t/year
{% endeq %}

Spread over a quarter of a million people that is about 100 kg of leafy greens each per year. This is a scale check, not a nutritional plan: calories come from other crops, fermentation and imports. A fermenter of 150 m³ makes about 2 tonnes of product an hour.
{% enddeeper %}

{% sources %}
- NASA Office of the Chief Health and Medical Officer, "Habitable Atmosphere", NASA-STD-3001 Technical Brief OCHMO-TB-003 Rev A: [nasa.gov PDF](https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-003-habitable-atmosphere.pdf). Sea-level air composition, the 34.5 to 103 kPa range, the 30 percent diluent requirement and ISS pressure.
- NASA, "NASA Achieves Water Recovery Milestone on International Space Station", June 2023: [nasa.gov](https://www.nasa.gov/missions/station/iss-research/nasa-achieves-water-recovery-milestone-on-international-space-station/). 93 to 94 percent recovery before the brine processor, 98 percent after.
- Barometric formula, isothermal atmosphere: [en.wikipedia.org/wiki/Barometric_formula](https://en.wikipedia.org/wiki/Barometric_formula).
- Concordia engineering specification, sections 9, 10, 26, 39 and 40, and the upper-city farm design note.
{% endsources %}
