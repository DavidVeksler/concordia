---
title: "Artificial gravity: how spin makes 1 g in space"
h1: "Artificial gravity"
description: "Spin makes weight. See how a rotor 5 km wide gives a space habitat a full 1 g at the ground, how weight fades to zero at the axis, and what the Coriolis effect does to a dropped coin."
lead: "Concordia makes gravity by turning. Each city rotor is a cylinder 5 km wide that spins once every 100 seconds, and the floor is the inside of its outer wall. Climb toward the axis and your weight drains away until you float."
hero: sky-breakthrough
nav: science
order: 1
updated: 2026-10-10
related:
  - /science/gliding/
  - /science/counter-rotation/
  - /science/structure/
  - /station/
---

{% predict "A cylinder 2.5 km in radius gives 1 g at the ground. How fast does it turn?" correct=2 %}
Once every 10 seconds
Once every 100 seconds
Once every 15 minutes
---
Once every 100 seconds, 0.6 turns a minute. The ground then moves at 157 m/s, and you feel it as ordinary weight.
{% endpredict %}

Want the numbers first? [Jump to the calculators](#try-it).

## How artificial gravity works: weight from motion {#weight-from-motion}

Ride in a car through a sharp bend and you slide toward the door. Nothing pulled you sideways. The car turned, you tried to go straight, and the door pushed you back into the curve. That push is all weight is. On Earth the ground pushes up against gravity. In a rotor the floor pushes you around the circle, and the push feels the same.

Swing a bucket of water over your head and the water stays in. The bucket bottom is the "floor" and the water presses on it. A rotor is the same bucket with a city inside. Your {% term "apparent weight" %} is the push of the floor, set by how fast the floor moves in its circle. Physicists call the sideways-turning acceleration {% term "centripetal acceleration" %}, and it is the only gravity Concordia has.

{% facts %}
2,500 m | rotor radius | design
100 s | one full turn | design
157 m/s | speed of the ground | physics
1.00 g | weight at the ground | physics
{% endfacts %}

The ground moves at about 560 km/h. You never notice, because everything inside the rotor moves with it, air included. Seen from the {% term "axis station" "axis" %}, the whole city turns slowly around you. Seen from the street, the horizon curves up ahead of you: the ground climbs away along the ring until it meets a bright sky.

{% shot "sci-grav-park" "A lakeside park on the rotor floor. The ground curves upward in the distance." %}

## Why the rotor is so big

Spin faster and a smaller cylinder gives the same weight, so why not build small? Because people feel the spin when they move their heads. Turn your head in a fast rotor and the {% term "Coriolis effect" %} twists the fluid in your inner ear. You get dizzy.

The 1975 NASA summer study, published as SP-413, set 1 turn per minute as the limit for living quarters. In 2017 Al Globus and Theodore Hall reviewed the experiments and recommended up to 2 turns per minute as no problem for residents and little adaptation for visitors, and up to 4 with some training or a few hours to a day for visitors. {% basis "physics" %} Concordia turns at 0.6 per minute, below all three limits, so the spin is expected to go unnoticed. {% basis "design" %}

The size has a second payoff. The {% term "gravity gradient" %} across a standing adult, head to foot, is 7 parts in 10,000. Your head weighs almost exactly what your feet do. In a ring of 56 m radius turning 4 times a minute the difference is 3 percent, enough to feel. {% basis "physics" %}

## Weight fades with height

Weight depends on how fast you go around, and that falls as you move toward the axis. It falls in a straight line. At the 450 m sky you weigh 82 percent of your ground weight. At 1,000 m, 60 percent. At 2,000 m, 20 percent. At the axis you float. {% basis "physics" %}

{% diagram "gravity-vs-height" "Gravity falls in a straight line from 1 g at the ground to zero at the axis." %}

This line decides where things go. Houses, schools, parks and hospitals sit near the ground, where bones and balance work as they always have. Offices and low-gravity entertainment climb higher. Crop galleries and process halls sit at 1,000 m, in the upper fringe above the housing plates. The axis, with no weight at all, is where you transfer between rotors and the stationary {% term "spine" %}. {% basis "design" %}

{% shots "sc-residential-street" "A street at the ground: weight is the full 1 g, so stairs, cups and bicycles behave as they do on Earth." "pl-megaframe-plate" "A plate at 625 m: weight here is 0.75 g, so the same staircase is a quarter easier to climb. The street below has not moved; only your distance from the axis has." %}

{% explore viewpoint="complete-habitat" overlay="gravity" label="Gravity overlay" %}
{% explore viewpoint="artificial-sky-breakthrough" %}
{% explore chapter="ascender" %}

## What it feels like

Mostly nothing. Gravity is steady, down is down, and stairs are stairs. The differences show up in small ways.

- **Dropped things curve.** Let go of a coin at head height and it lands about 5 cm to one side, against the direction of spin. The coin keeps its sideways speed while the floor swings away.
- **Walking changes your weight a little.** Walk in the direction of spin and you weigh about 2 percent more. Walk against it and you weigh about 2 percent less. On an 80 kg person that is about 1.4 kg, a bag of groceries.
- **Fast travel changes it a lot.** On the ring metro at 100 km/h against the spin you weigh 0.66 of normal. Going with the spin at 90 km/h you weigh 1.33. The axial lines run along the spin axis, where this effect vanishes, and weigh 0.98 g throughout.
- **The ascender leans.** The {% term "ascender" %} cabin rises 2,380 m in about 10 minutes. It tilts to follow the changing direction of down: 4 degrees 150 m above the deck, 6.7 degrees at 1,000 m, 15 degrees within 656 m of the axis. {% basis "design" %}

{% shot "sci-grav-ascender-cabin" "Inside the ascender cabin at 650 m, where weight has fallen to 0.74 g." %}

{% callout "In 2045" %}
Children and routine healthcare stay in the 1 g cities, so the farms higher up are workplaces, not homes. {% basis "design" %} [Building Concordia](/station/building-concordia/) explains why.
{% endcallout %}

## Try it

Set a radius and a target gravity, and see how fast the cylinder has to turn. Then slide up the height scale and read off your weight.

{% widget "spin-calculator" "A calculator for the spin rate needed for a given radius and gravity. For Concordia: radius 2,500 m, 1 g, 0.598 turns per minute, 100.4 s per turn." %}

{% widget "gravity-at-height" "A slider for gravity against height above the ground. Weight is 1 minus height divided by 2,500 m: 0.82 g at 450 m, 0.60 g at 1,000 m, 0.20 g at 2,000 m, zero at the axis." %}

{% deeper "The equation" basis="physics" %}
Centripetal acceleration at radius r, for angular rate ω, is the weight you feel.

{% eq %}
g = ω² × r
ω = 2π / T
v = ω × r
{% endeq %}

For Concordia's rotors T is 100.4 s, so ω is 0.0626 rad/s. At r = 2,500 m, g = 0.0626² × 2,500 = 9.8 m/s², one Earth gravity. The ground speed is v = 0.0626 × 2,500 = 157 m/s. The rate in turns per minute is 60 / 100.4 = 0.598.

Because g is proportional to r, gravity falls linearly with height h above the ground:

{% eq %}
g(h) = 1 g × (2,500 − h) / 2,500
{% endeq %}

| Height | Radius | Gravity |
| --- | --- | --- |
| Ground | 2,500 m | 1.00 g |
| Sky | 2,050 m | 0.82 g |
| Plate quarters | 1,875 m | 0.75 g |
| Crop galleries | 1,500 m | 0.60 g |
| Upper frame | 500 m | 0.20 g |
| Hub terminal | 70 m | 0.028 g |

<!-- facts: section 2 (gravity versus height table), section 5 (ascender) -->
{% enddeeper %}

{% deeper "Worked example: a dropped coin" basis="physics" %}
Drop a coin from 2 m at the ground. It falls for t = √(2h / g) = √(4 / 9.8) = 0.64 s. While it falls it moves toward the floor, and in the rotating frame that motion picks up a sideways push of 2ω × v, called the Coriolis acceleration. Integrating a radial speed of g × t gives a sideways shift of:

{% eq %}
x = ω × g × t³ / 3
x = 0.0626 × 9.8 × 0.64³ / 3 = 0.053 m
{% endeq %}

The coin lands 5 cm from where it would on Earth, against the spin.

Walking has a smaller effect. At 1.4 m/s the Coriolis acceleration is 2 × 0.0626 × 1.4 = 0.175 m/s², which is 1.8 percent of g. Head to foot, a 1.8 m person sees 0.0626² × 1.8 = 0.007 m/s², or 0.07 percent of g.
{% enddeeper %}

{% deeper "Why not spin faster?" basis="physics" %}
The radius for 1 g at a given rate is r = g / ω².

| Turns per minute | Radius for 1 g |
| --- | --- |
| 0.6 (Concordia) | 2,500 m |
| 1 | 894 m |
| 2 | 224 m |
| 4 | 56 m |

The 1975 NASA study set the comfort limit at 1 turn per minute, which forces a radius near 900 m. Globus and Hall recommend up to 2 turns per minute with little adaptation for visitors (a radius near 225 m) and up to 4 with some training for visitors, which would allow a 56 m radius. Concordia chooses the slow end on purpose. A million people include children, the elderly and the unwell, so the design stays under the lowest published limit. {% basis "design" %} The published comfort limits, with the rim speed, gravity gradient and Coriolis figure for any radius, are laid out in the [spin tolerance table of the CheatSheets artificial gravity calculator](https://cheatsheets.davidveksler.com/artificial-gravity-calculator.html?utm_source=concordia&utm_medium=referral&utm_campaign=cheatsheets_crosslink&utm_content=science-artificial-gravity#tolerance).
{% enddeeper %}

{% sources %}
- Gerard K. O'Neill, "The Colonization of Space", Physics Today 27(9), September 1974: [physicstoday.aip.org/features/the-colonization-of-space](https://physicstoday.aip.org/features/the-colonization-of-space).
- Richard D. Johnson and Charles Holbrow (eds.), Space Settlements: A Design Study, NASA SP-413, 1977: [ntrs.nasa.gov/citations/19770014162](https://ntrs.nasa.gov/citations/19770014162). The 1 turn per minute limit and the design population are in the design basis chapter: [nss.org/settlement/nasa/75SummerStudy/Chapt3.html](https://nss.org/settlement/nasa/75SummerStudy/Chapt3.html).
- Al Globus and Theodore Hall, "Space Settlement Population Rotation Tolerance", NSS Space Settlement Journal, June 2017: [nss.org PDF](https://nss.org/wp-content/uploads/NSS-JOURNAL-Space-Settlement-Population-Rotation-Tolerance.pdf).
- Concordia engineering specification, sections 8 to 11, and the ascender design note.
{% endsources %}
