---
title: What is above the sky?
question: What is above the sky?
discover: true
description: "From the street the sky looks like a sky. Ride the ascender through it at 450 m and it turns into lit machinery, with the rest of the rotor opening out above. See what hangs across the interior."
lead: "From the street the sky looks like a sky. The ascender takes you through it at 450 m, and it turns out to be machinery: lit panels on frames, with the whole width of the rotor opening out above."
hero: sky-breakthrough
order: 3
updated: 2026-10-13
related:
  - /science/light-and-sky/
  - /places/ascenders-and-sky/
---

## Predict

{% predict "You ride the ascender up through the artificial sky. What fills the view once you are above it?" correct=2 %}
Stars
The far side of the city, upside down
Empty vacuum
---
The far side of the city, upside down. Above the sky the rotor opens out to its full 5 km width, and the opposite floor faces you across the air with its streets and towers pointing at the axis.
{% endpredict %}

## Observe

Open the breakthrough view. The cabin has just passed through a permanent opening in the sky, and the backs of the sky panels fill the window.

{% explore viewpoint="artificial-sky-breakthrough" %}

{% shot "sci-sky-from-above" "Above the sky: frames, catwalks and the lit backs of the panels, with the city on the far side of the rotor beyond." %}

## Explain

The sky is a ceiling of lit panels at 450 m, built to look like open air from the street. From below it is opaque, so from the street you cannot see past it. Each ascender tower passes through a permanent opening, about 154 m by 210 m, and the cabin slides through. {% basis "design" %}

Above the panels the picture changes. You see frames, maintenance paths and stay cables, then the rest of the cylinder. The air above the sky is the same air as the air below it, because the sky is a ceiling and not a seal. The far side of the rotor is 4,550 m from the sky and 2,500 m from the axis, a second city whose floor faces yours. It reads as upside down because its down points away from you, toward the outer wall behind it. {% basis "physics" %}

Weight is already falling as you rise. At the sky you weigh 0.82 g, and it keeps draining until the axis, where you float. This is why the reveal comes from the ascender and not from the street: the sky hides the far side until you are above it. {% basis "design" %}

{% deeper "How far is the far side?" %}
Distances along a diameter of the rotor, which is 5,000 m across at the ground.

{% eq %}
sky (r = 2,050 m) to the far ground = 2,050 + 2,500 = 4,550 m
axis to the far ground = 2,500 m
gravity at the sky = 0.0626² × 2,050 / 9.81 = 0.82 g
{% endeq %}

The [ascenders and sky](/places/ascenders-and-sky/) page has the tower numbers, and [light and sky](/science/light-and-sky/) explains how the panels make a day.
{% enddeeper %}

## Change a parameter

Slide the height to 450 m and note 0.82 g, the sky. Then slide on to 2,500 m. The ascender covers this climb in about ten minutes.

{% widget "gravity-at-height" "A slider for gravity against height above the ground. At the 450 m sky you weigh 0.82 g, at 1,000 m 0.60 g, and at the axis nothing." %}
