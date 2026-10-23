---
title: What happens when the hull is holed?
question: What happens when the hull is holed?
discover: true
description: "A hole in the hull of a rotor holding 45 million tonnes of air sounds like a disaster. For a hole a metre square it is a slow leak measured in weeks. See why, and what stops it sooner."
lead: "A hole in the hull of a rotor that holds 45 million tonnes of air sounds like a disaster. For a hole a metre square it is a slow leak measured in weeks, and the pressure districts shut behind it."
hero: sci-rad-hull
order: 6
updated: 2026-10-13
related:
  - /science/safety/
  - /science/structure/
---

## Predict

{% predict "A meteoroid punches a 1 m² hole through a rotor wall. How long until the rotor has lost 1 percent of its air?" correct=2 %}
A few minutes
About three weeks
About six years
---
About three weeks. At a clean opening, 22 days to lose 1 percent of the air and 230 days to lose 10 percent. The six years is the time constant, the time for the pressure to fall by a factor of e.
{% endpredict %}

## Observe

Open the pressure overlay. The rotors and the spine hold one atmosphere. The shell outside them and the industrial bay are vacuum, so every airtight boundary is a wall between the two.

{% explore viewpoint="complete-habitat" overlay="pressure" %}

{% shot "sci-awf-pressure" "The station with the pressure overlay: rotors and spine at 1 atm, the outer shell and the industrial bay in vacuum." %}

## Explain

Air that escapes into vacuum leaves at the speed of sound, and the speed does not change as the pressure falls. Engineers call this choked flow. At one atmosphere it is 239 kg of air per second through every square metre of hole. {% basis "physics" %} A rotor holds 45 Mt of air. {% basis "design" %} A 1 m² hole removes a small fraction of it each second, so the pressure falls on a time constant of about six years: 1 percent gone in 22 days, 10 percent in 230. A hole that cost 1 percent in a day would have to be 22 m².

Real losses are smaller still. Each rotor is split into pressure districts, with barriers that close when the pressure falls, so a breach empties one district and not the rotor. The calculator treats the whole rotor as one room. The 1975 NASA study, whose torus for 10,000 people held far less air, put a 1 m hole at once in 10 million years and reckoned at least a day to lose 60 percent of its atmosphere through it. [Safety](/science/safety/) covers how Concordia contains a failure.

A meteoroid hits the shield before it reaches the air. Up close the shield is cassettes of packed regolith set between ribs, with repair seams and a service rail where a robot swaps a cassette for a fresh one. [Fly down to the hull and watch it work](/explore/?viewpoint=exterior-hull-close).

The calculator leaves out local wind and cold at the hole, a hole that grows, and which compartment it opens into. Those decide how a breach feels, and only a test on real hardware settles them. {% basis "challenge" %}

{% deeper "The flow law" %}
Choked mass flow per square metre, for air at pressure P and temperature T into vacuum, then an exponential decay of the air mass.

{% eq %}
flux = Cd × P × √(γ / (R T)) × (2 / (γ + 1))^((γ + 1) / (2 (γ − 1)))
P = 101,325 Pa, T = 293 K, γ = 1.4, R = 287 J/kg/K: 239 kg/s/m² at Cd 1
τ = air mass / (flux × area) = 4.5 × 10¹⁰ kg / 239 kg/s = 5.96 years for 1 m²
time to lose 1 percent = 0.01005 × τ = 22 days
{% endeq %}
{% enddeeper %}

## Change a parameter

The calculator starts at a discharge coefficient of 0.8, a ragged opening, so 1 m² takes 27 days to lose 1 percent. Drag the hole to 100 m² and the same 1 percent goes in about 6.6 hours.

{% widget "breach-calculator" "A calculator for air loss through a hull breach. A hole of 1 m2 at a discharge coefficient of 1 loses 1 percent of a rotor's air in 22 days and 10 percent in 230 days." %}
