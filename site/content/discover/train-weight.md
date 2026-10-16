---
title: Can a train change your weight?
question: Can a train change your weight?
discover: true
description: "On Concordia the ring metro changes how much you weigh. Ride against the spin at 100 km/h and you drop to 0.66 g; ride with it and you gain a third. See the Coriolis effect in a train car."
lead: "On Concordia the ring metro changes how much you weigh without changing where you stand. Ride against the spin at 100 km/h and you weigh 0.66 g. Ride with it at 90 km/h and you weigh 1.33 g."
hero: jr-metro
order: 2
updated: 2026-10-13
related:
  - /science/moving-around/
  - /science/artificial-gravity/
---

## Predict

{% predict "The ring metro runs at 100 km/h against the direction the station spins. Compared with standing on the platform, do you weigh more, less or the same?" correct=2 %}
More
Less
The same
---
Less. Standing on the platform you weigh 0.98 g. Against the spin at 100 km/h you weigh 0.66 g, a third lighter, so a 70 kg rider feels like 46 kg.
{% endpredict %}

## Observe

Open the viaduct view on the ring line, where the metro runs 45 m above the street. In the story the family rides the axial line instead, which runs along the spin axis, and their weight does not change. This page is about the ring.

{% explore viewpoint="metro-viaduct-street" %}

{% shot "sci-metro-viaduct" "The ring metro viaduct above an Arbor street. The train runs on this line at 100 km/h against the spin and 90 km/h with it." %}

## Explain

Weight is the push of the floor, and the floor pushes you around a circle. How hard it pushes depends on how fast you go around that circle, measured from outside. The metro rail turns with the station at 153 m/s. A train running against the spin at 100 km/h (27.8 m/s) moves through space at only 126 m/s. It makes the same circle more slowly, so the floor pushes less. Run with the spin and the same sum goes the other way. {% basis "physics" %}

The effect has a name, the {% term "Coriolis effect" %}, and a size: 2ωv, which is 3.5 m/s² or 0.36 g at 100 km/h. A small term in v²/r gives some of it back. The axial lines run along the spin axis instead of around it, so they do not change your speed around the circle and you weigh 0.98 g on all of them. {% basis "design" %}

The metro is built for this. Rings run 100 km/h antispinward and 90 km/h spinward, so riders get a lighter ride one way and a heavier one the other, never more than a third off. {% basis "design" %}

{% deeper "The weight equation" %}
A rider at rail radius r moves at v along the ring, with the floor turning at ω.

{% eq %}
a = (ωr ± v)² / r
ωr = 0.0626 × 2,455 = 153.7 m/s
antispinward, 100 km/h: (153.7 − 27.8)² / 2,455 = 6.46 m/s² = 0.66 g
spinward, 90 km/h: (153.7 + 25.0)² / 2,455 = 13.0 m/s² = 1.33 g
{% endeq %}

Standing still the same sum gives 0.98 g, because the metro rail sits 45 m above the street. [Moving around](/science/moving-around/) covers the whole network.
{% enddeeper %}

## Change a parameter

Press the spinward ring preset in the calculator: 90 km/h with the spin gives 1.33 g. Then drop the speed to zero and the weight returns to 0.98 g.

{% widget "metro-coriolis" "A calculator for apparent weight on the ring metro. At 100 km/h against the spin the weight is 0.66 g, at 90 km/h with the spin 1.33 g, and along the axis 0.98 g." %}
