---
title: "Driving on a spinning floor in a space habitat"
h1: "Driving on a spinning floor"
crumb: Driving
description: "On Concordia's rotating floor a car weighs more driving spinward and less driving the other way. Grip, braking and top speed all follow, and cold-gas thrusters push the tyres down. Drive it."
lead: "The floor of a Concordia rotor moves at 560 km/h. A car that drives with the spin weighs more, and a car that drives against it weighs less. Everything a driver feels follows from that one fact."
nav: science
order: 9.7
hero: sci-grav-park
ctaViewpoint: complete-habitat
ctaLabel: Drive the Roadster · 3D
updated: 2026-11-21
related:
  - /science/artificial-gravity/
  - /science/racing/
  - /science/gliding/
  - /science/moving-around/
---

{% facts %}
156 m/s | speed of the floor, 560 km/h, the spin's rim speed | physics
2.74 g | what a car feels at 370 km/h spinward | design
0.12 g | what it feels at 370 km/h antispinward | design
2.1 s | full down thrust from the cold-gas store | design
{% endfacts %}

## Weight depends on your ground speed

Standing still on the floor you weigh 1 g. Drive spinward at speed v and your speed around the axis becomes ωρ + v, so the weight your tyres feel is (ωρ + v)² / ρ. Drive the other way and it falls. {% basis "physics" %}

| Speed | Spinward | Antispinward |
| --- | --- | --- |
| 30 km/h | 1.11 g | 0.90 g |
| 100 km/h | 1.39 g | 0.68 g |
| 200 km/h | 1.83 g | 0.42 g |
| 300 km/h | 2.35 g | 0.22 g |
| 370 km/h | 2.74 g | 0.12 g |

At 563 km/h antispinward the car matches the floor's speed and floats. Spinward it would weigh 4 g there.

## What it does to the car

Tyre grip scales with the load. The same car launches to 100 km/h in 2.47 s spinward, 2.79 s along the axis and 3.27 s antispinward, and stops from 100 km/h in 30 m, 36 m and 45 m. {% basis "design" %} Driving against the spin is the dangerous direction: a 200 km/h car leaves the road at any crest tighter than 757 m radius, while spinward the figure is 172 m.

The Roadster has four defences. Suspension and an adaptive ride height follow the felt weight. Assisted mode caps speed so the felt weight stays between 0.5 g and 2.0 g, which is 234 km/h spinward and 165 km/h antispinward. Eight cold-gas thrusters push the car down onto the road: full down thrust adds 0.52 g of tyre load, and it lasts 2.1 s from the 40 kg store. And the stability system steers the wheels on its own when the car yaws.

At 370 km/h antispinward the tyres carry 0.15 g without thrust and 0.67 g with it. {% basis "design" %}

## The sideways kick

A moving object in a rotating frame is pushed sideways by the Coriolis force. A 0.6 m hop at speed lands about 3.5 cm spinward of where it left. Over a crest, a driver feels the car drift.

## Where to drive

The five ring arterials, 36 m wide, run the full 15.7 km ring through a 30 m pier gateway every 654 m. They are the top-speed route. The Brook Park lawns and gravel paths are drivable too, at a fraction of the grip, and the brook has a shallow ford. Lakes, deep water and planting beds block the car. {% basis "design" %}

<p class="game-actions"><a class="btn btn--primary" href="/explore/?mode=explore&roadster=drive">Take the Roadster out · 3D</a></p>

Four bays, two cars each, wait on the hero street, at Brook Park and on two points of the ring arterials. Walk up to a car and press G, or press B anywhere and then 5 for the nearest one.

{% sources %}
- The felt-weight table, launch and braking figures, thruster endurance and crest radii are printed by `scripts/analysis/roadster_table.py` in the Concordia repository (`docs/specs/roadster-output.txt`); design note `docs/specs/roadster-spec.md`.
- The rotating-frame effective weight, g = (ωρ + v)² / ρ, is textbook mechanics: Wikipedia, "Coriolis force" and "Rotating reference frame".
{% endsources %}
