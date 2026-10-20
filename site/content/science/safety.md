---
title: "Space habitat safety since the 1970s"
h1: "Safety: what changed since the 1970s"
crumb: Safety
description: "Concordia keeps the 1970s O'Neill cylinder and redesigns it for failure: no windows, a shield that stands still, four sealed cities, and no single part whose failure reaches everyone."
lead: "Gerard O'Neill and NASA's 1975 summer study showed that a city in space could be built. Concordia asks a second question: what happens when part of it breaks? The answer changed the shape of the station. There are no windows, the shield stands still, the city is four sealed cities, and no single failure can reach everyone."
nav: science
order: 13
hero: sci-safe-hero
updated: 2026-10-13
related:
  - /science/structure/
  - /science/radiation-and-debris/
  - /station/generations/
  - /science/counter-rotation/
---

## Two questions, fifty years apart

The 1970s asked whether a city in space could be built and pay its way. Gerard O'Neill and the 1975 NASA summer study answered yes, and Concordia keeps most of their answer.

Concordia adds a second question: what happens when part of it breaks? A million people cannot be evacuated, so the station shuts trouble in one place. The rule: rock is cheap, and a failure that hits everything at once is the expensive thing.

| Topic | 1970s | Concordia |
| --- | --- | --- |
| Daylight | Windows and hinged mirrors (Island Three) | An opaque shell and a display sky |
| Shield | A separate ring 1 to 2 m out (torus) | A stationary truss hundreds of metres out |
| Air | One room per cylinder (Island Three) | Four rotors, each split into districts |
| Atmosphere | About half sea-level pressure (torus) | Earth sea-level air |
| Spin machinery | Counter-rotating pairs | Independent rotors with backup catchers |
| Incoming mass | Payload stream named a hazard | Cargo caught far away, never aimed at the city |

{% facts %}
1 | room of air in Island Three's cylinder | physics
4 | sealed rotors at Concordia, each split into districts | design
1 to 2 m | gap between the 1975 torus and its shield | physics
hundreds of m | gap between Concordia's air and its shield | design
{% endfacts %}

{% diagram "habitat-sections" "Island Three, the 1975 Stanford torus and Concordia in cross-section. Each is drawn to its own scale, and the first two are schematic." %}

## A closed shell and a shield that stands still

Island Three is half window. Its wall alternates three strips of land with three of glass, and three hinged mirrors outside swing open to make day and shut to make night. Concordia has no exterior windows. Residents get a display sky 450 m up, powered by solar platforms far from the hull. Nothing transparent holds air, and no moving mirror can fail and end daylight. {% basis "design" %}

The stationary shield is not new. The 1975 torus already had one, "separated by only a meter or two" from the tube. Concordia stretches it. The stationary shell stands hundreds of metres outside the air, an open truss of removable cassettes that crawlers swap like roof tiles. The space inside is a service vacuum where robots work, so nobody in a suit has to. Island Three's cosmic-ray shield is its own air: O'Neill's 1974 design counted on the depth of the atmosphere. A hit on Concordia's skin costs shield, never air. {% basis "design" %}

The risk was always small and slow: the 1975 study put a 1 m meteoroid hole at once in 10 million years, and a day or more to lose most of the air through it. {% basis "physics" %} Concordia makes the outer layer replaceable and the inner layer unreachable.

{% shots "sci-safe-cassettes" "The hull from 200 m: shielding cassettes set between ribs, swapped one at a time." "sci-sky-from-above" "The back of the artificial sky: the window is a display." %}
{% explore viewpoint="exterior-hull-close" %}
{% explore viewpoint="exterior-5km-systems" overlay="shielding" label="Shielding overlay on the hull" %}

## Four cities, many rooms

Containment is nested. The station holds four rotors, each split into several pressure and fire districts. Large buildings add refuge halls, and refuge capsules run along the stationary spine. {% basis "design" %}

The 1975 study rated splitting a cylinder into separate pressure volumes "Difficult". {% basis "physics" %} Concordia answers it two ways. It is four vessels instead of one. And district walls are built into the megaframe before anyone moves in, disguised as ridges, transit complexes and civic buildings, with large passages that close behind pressure-rated barriers. A district barrier holds a pressure difference only after an emergency has closed it, so it never carries the city the way a rotor's skin does. {% basis "challenge" %}

Fire is the frequent threat. Materials are chosen not to burn, cooking is mostly electric, and suppression drones and water mist answer the first smoke. {% basis "design" %}

The air is different too. The 1975 torus breathed about half sea-level pressure with roughly 45 percent oxygen. Fire risk climbs with oxygen, and NASA certifies spacecraft materials only up to 30 percent. {% basis "physics" %} Concordia breathes Earth sea-level air.

{% diagram "containment" "How far does one failure reach? A single long room against nested rooms. The district count is illustrative." %}

{% explore viewpoint="spine-shelter" label="A refuge capsule in the spine" %}
{% explore viewpoint="complete-habitat" overlay="pressure" label="Pressure overlay" %}

## Parts that fail one at a time

Each of these failures stays small.

| If this fails | What happens |
| --- | --- |
| One tension band | Its neighbours carry the load; the tear does not spread |
| A magnetic bearing's control | Catchers hold the rotor while it is slowed |
| One rotary coolant coupling | The others carry on; thermal storage rides through {% basis "challenge" %} |
| A radiator panel is punctured | The loop isolates it; routine maintenance |
| Sunlight or the solar platforms | Two 250 MWe fission masts restart the essentials |
| A bad software command | Hard interlocks: no one command can vent every habitat, stop every bearing, cut all cooling or all power |
| A bridge during a speed change | Traffic stops, doors close, the bridge retracts first |

Each rotor is brought to speed once, empty, in small steps. The rotors then fill one at a time, so a defect found in Tsiolkovsky (Rotor 1) in 2041 is fixed before the others fill. {% basis "fiction" %} See [Building Concordia](/station/building-concordia/). The two places are described on [the axis and spine](/places/axis-and-spine/#bridges-and-the-gap) and [Aft Works](/places/aft-works/#inside-the-aft-end).

{% shots "sci-safe-catchers" "The aft bearing gallery of Tsiolkovsky (Rotor 1), where the mechanical catchers sit behind the magnetic bearing." "sci-safe-interface" "The service gap between Noordung and Bernal (Rotors 2 and 3), where nothing rotating crosses." %}
{% explore viewpoint="aft-bearing-gallery" %}
{% explore viewpoint="counter-rotating-interface" %}
{% explore viewpoint="complete-habitat" overlay="structural" label="Structural overlay" %}

{% deeper "What fifty years of flight taught" basis="physics" %}
- **Apollo 1, 27 January 1967.** A fire in a pure-oxygen cabin on the pad killed three astronauts. Oxygen fraction is a fire decision, so Concordia breathes ordinary air.
- **Mir, 25 June 1997.** A cargo ship hit the Spektr module. The crew sealed it off and Mir kept its air. A breach can be shut inside one compartment, the idea behind pressure districts.
- **Aloha Airlines Flight 243, 28 April 1988.** Part of the cabin roof tore away in flight and the aircraft landed. One failed panel must not unzip a shell, so Concordia's airtight liner is separate from its tension bands.
{% enddeeper %}

## Nothing aimed at the city

The 1975 study already named the payload stream of a mass driver as a hazard, "the danger of damage if any of the payloads strike a colony or a spacecraft". Concordia answers by geometry. Cargo is caught tens to hundreds of kilometres out and never aimed at the habitat. Anything over about 10 cm is watched for and intercepted in layers. {% basis "design" %} See [radiation and debris](/science/radiation-and-debris/#debris).

{% explore viewpoint="complete-habitat" overlay="defence" label="Defence overlay" %}

## What Concordia kept

The 1970s designers got the big things right:

- **Moon rock and mass drivers.**
- **The Earth-Moon L5 region.**
- **A big radius for slow spin.** At 2,500 m, 0.6 turns a minute gives 1 g.
- **Counter-rotating pairs**, so the station's spin cancels.
- **A shield apart from the spinning city.** The torus did it first.
- **Farms in their own volume.** Island Three put them in a ring around the end cap. Concordia grows food in the upper-city farms and in Ehricke (the industrial rotor).
- **Redundancy as a rule.** The study called for "diversification and redundance" of food supplies, energy sources and environmental control.

The idea of a landscape wrapped around the inside of a spinning shell is theirs too.

{% shots "sci-safe-1975-interior" "The 1975 torus interior, painted by Don Davis for NASA Ames (NASA image ARC-1975-AC75-2621, from SP-413). Cropped." "sci-safe-concordia-interior" "Concordia's Groundside Park: the same idea, with the ground climbing away along the ring to a bright sky." %}

See [five generations](/station/generations/) and [why space](/why-space/).

<!-- facts: sections 2, 3, 4, 6, 14 -->

{% sources %}
- Johnson and Holbrow (eds.), Space Settlements, NASA SP-413, 1977: [chapter 2](https://nss.org/settlement/nasa/75SummerStudy/Chapt.2.html), [chapter 3](https://nss.org/settlement/nasa/75SummerStudy/Chapt3.html), [chapter 4](https://nss.org/settlement/nasa/75SummerStudy/Chapt4.html).
- National Space Society, [O'Neill Cylinder Space Settlement](https://nss.org/o-neill-cylinder-space-settlement/).
- Concordia engineering specification, sections 6 to 9, 14, 17 to 19, 35 to 38, 43, 45, 48, 49 and 52.
- Don Davis, painting of the Stanford torus interior, 1975, NASA Ames, [ARC-1975-AC75-2621](https://images.nasa.gov/details/ARC-1975-AC75-2621).
- Gerard K. O'Neill, [The Colonization of Space](https://nss.org/the-colonization-of-space-gerard-k-o-neill-physics-today-1974/), Physics Today, 1974.
- NASA, [Recommendations for Exploration Spacecraft Internal Atmospheres](https://www.nasa.gov/wp-content/uploads/2023/03/henninger-8.2-34-atm-tp216134-2010.pdf), TP-2010-216134.
- NASA, [Apollo 1 fire](https://www.nasa.gov/history/55-years-ago-the-apollo-1-fire-and-its-aftermath/); NASA, [Mir 1997 summary](https://www.nasa.gov/history/SP-4225/documentation/mir-summaries/mir23/wr.htm); NTSB, [Aloha 243 report](https://www.ntsb.gov/investigations/AccidentReports/Reports/AAR8903.pdf), 1989.
{% endsources %}
