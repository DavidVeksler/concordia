---
title: Why doesn't the whole station spin?
question: Why doesn't the whole station spin?
discover: true
description: "Concordia's four city rotors spin, yet the station holds still. Their spins cancel in pairs, which spares it a gyroscope's resistance. See what turning the station would cost without that."
lead: "Four rotors turn at the heart of Concordia, but the station as a whole does not. The rotors spin in opposite pairs so their angular momentum cancels, and the station stays pointed where it is pointed."
hero: sci-cr-momentum-bay
order: 4
updated: 2026-10-13
related:
  - /science/counter-rotation/
  - /places/axis-and-spine/
---

## Predict

{% predict "Suppose all four city rotors spun the same way. How hard would each end of the station have to push to turn it 1 degree a day?" correct=3 %}
About 4 thousand newtons
About 400 thousand newtons
About 4 million newtons
---
About 4 million newtons at each end, continuously: 4.1 MN with the industrial rotor, Ehricke, and the rings already working against it. The station as built needs at most 4.5 kN. The difference is a factor of about a thousand.
{% endpredict %}

## Observe

Open the momentum overlay on the whole station. Tsiolkovsky and Noordung carry one sign, Bernal and O'Neill the other, and the net is zero.

{% explore viewpoint="complete-habitat" overlay="momentum" %}

{% shot "sci-ov-momentum-station" "The station with the momentum overlay: rotors one and two against three and four, the industrial rotor, and a net of zero." %}

## Explain

A spinning rotor is a gyroscope. Push on it to turn it and it pushes back at a right angle. Each rotor holds 1.17 × 10¹⁷ N·m·s of angular momentum, so four spinning the same way would hold 4.7 × 10¹⁷ and resist every turn. {% basis "physics" %}

Concordia avoids that by pairing. Tsiolkovsky and Noordung turn one way and Bernal and O'Neill the other, so the habitation rotors sum to zero. The industrial rotor turns against rotor four and holds about 4 percent of the total. Momentum rings trim whatever is left, to within 0.1 percent. {% basis "design" %} The pairs spin against each other at the spine, so the spine, hull and ports sit still between them.

That is the answer to the title. The rotors do spin, once every 100 seconds. The station frame does not, and it can turn on a few kilonewtons of electric thrust. Momentum is traded between rotors and rings, not thrown away, so turning costs electricity and not propellant.

{% deeper "The thrust arithmetic" %}
Turning a body with angular momentum L at rate W takes a torque L × W. A couple across the 21 km hull supplies it.

{% eq %}
W = 1° / day = 2.02 × 10⁻⁷ rad/s
all four one way (net 4.28 × 10¹⁷ N·m·s):
torque = 4.28 × 10¹⁷ × 2.02 × 10⁻⁷ = 8.6 × 10¹⁰ N·m
force at each end = 8.6 × 10¹⁰ / 21,000 m = 4.1 MN
as built (inside the 0.1 percent band): 4.5 kN
{% endeq %}

[Counter-rotation](/science/counter-rotation/) has the full ledger, including the rings.
{% enddeeper %}

## Change a parameter

Press All four spin one way in the ledger and read the thrust. Then press Concordia as built and watch it fall to a few kilonewtons.

{% widget "momentum-ledger" "A ledger of angular momentum for the four rotors, the industrial rotor and the rings. As built the net is zero; with all four rotors spinning one way the thrust to turn the station is 4.1 MN at each end." %}
