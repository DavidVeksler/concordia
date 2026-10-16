---
title: Why does the ground curve upward?
question: Why does the ground curve upward?
discover: true
description: "Walk straight along a Concordia street and the ground climbs ahead of you, yet it never feels like a hill. Find out why the floor is the inside of a cylinder and where the ring brings you back."
lead: "Look down a Concordia street and the road rises ahead of you until it meets the sky. You are standing on the inside of a cylinder 5 km wide, and the street is a circle you can walk all the way around."
hero: sci-grav-park
order: 1
updated: 2026-10-13
related:
  - /science/artificial-gravity/
  - /science/moving-around/
---

## Predict

{% predict "You walk 8 km along a ring street. Are you upside down compared with where you started?" correct=2 %}
No, the street is flat
Yes, and you never feel it
Only your head feels it
---
Yes. The ring is 15.7 km around, so 8 km carries you just past halfway: your feet point the way your head did at the start. The floor pushed on your feet the whole way, so nothing felt different.
{% endpredict %}

## Observe

Open the park view and face down the long lawn. The far end of the ground does not drop away to a horizon. It climbs.

{% explore viewpoint="groundside-park" %}

{% shot "jr-neighborhood" "An Arbor Quarter street. The ground at the far end of the ring climbs toward the sky instead of falling to a horizon." %}

## Explain

On Earth the ground falls away at the horizon because you stand on the outside of a ball. In Concordia you stand on the inside of a cylinder, so the ground curves up instead. The street never feels like a hill, because down always points away from the spin axis, 2,500 m from your feet. Your head points at the axis, and the floor pushes on you with the same force at every point of the ring. {% basis "physics" %}

Keep walking and the circle closes. The ring is 15.7 km around at the ground, so 8 km is 183 degrees of arc: half a turn and a little more. There the floor under you faces the floor you started on, across 5 km of air. Nobody can feel that, because the push of the floor is the only up there is.

The same shape gives the view. Along the ring the street climbs away until the bright sky closes it off. Along the axis the street runs level to the end wall. {% basis "design" %}

{% deeper "The circle in numbers" %}
The ground is a circle of radius r. Distance along it turns into an angle.

{% eq %}
circumference = 2π × r = 2π × 2,500 m = 15.7 km
angle = distance / r = 8,000 m / 2,500 m = 3.2 rad = 183°
{% endeq %}

At a walking pace of 1.4 m/s the 8 km takes 95 minutes. [Artificial gravity](/science/artificial-gravity/) has the full derivation, and [moving around](/science/moving-around/) covers the ring metro that does the same trip in minutes.
{% enddeeper %}

## Change a parameter

Slide the height to 2,000 m. The circle you stand on shrinks to 500 m in radius, 3.1 km around, and your weight falls to 0.20 g. The nearer you are to the axis, the faster the ground curves.

{% widget "gravity-at-height" "A slider for gravity against height above the ground. At 2,000 m the circle is 500 m in radius, 3.1 km around, and weight is 0.20 g." %}
