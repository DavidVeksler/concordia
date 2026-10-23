---
title: "Rocket racing in space: why each turn costs fuel"
h1: "Racing where there is no air"
crumb: Racing
description: "Concordia's two-seat rocket racer has no top speed and no grip. Every turn is paid for in propellant, so a space race is a fuel budget flown under a 3 g limit. Watch it, then fly it."
lead: "Out past the hull there is no air to lean on and no road to grip. The racer can go as fast as it likes, but every change of direction burns propellant it cannot get back. A race here is not won on the straight. It is won by spending the tanks better than the other crew."
nav: science
order: 9.5
hero: sci-racer-hull
ctaViewpoint: racer-pit
ctaLabel: Fly the racer · 3D
updated: 2026-10-23
related:
  - /science/gliding/
  - /science/moving-around/
  - /places/spaceport/
  - /places/exterior/
---

{% facts %}
2,300 m/s | velocity change the class rules allow per race, start to stop | design
3 g | most the crew feel in assisted flight | design
2.7 s | to flip end over end, nose to tail | design
12.9 km | the sprint course, flown in about 100 s | design
{% endfacts %}

{% video "jjThEIMtSLM" "Concordia racer trailer" "Rendered in Blender from the simulation's own geometry: the racer lifts off its dock on the spaceport, swings round the forward end, runs the hull past the rotor names and pulls away from the whole station. Time is compressed for the film." %}

## What does a corner cost?

On Earth a race car turns by pushing on the road, and a plane by pushing on the air. The racer has neither. To turn, it points its engine sideways and burns. Changing direction is a velocity change, and a velocity change is paid for in propellant, the same currency as going faster. {% basis "physics" %}

{% predict "The racer coasts at 100 m/s and must turn 150 degrees at the next gate. Which way of turning uses the least propellant?" correct=2 %}
Brake to a stop, turn the nose, then speed back up
One hard kick sideways at the gate
A smooth curve, burning sideways all the way round
All three cost the same
---
The single kick: 193 m/s of velocity change. Braking and starting again costs 200 m/s, and the smooth curve costs 262 m/s. In space a gentle racing line is the most expensive way round a corner.
{% endpredict %}

A kick that turns a velocity v through an angle θ costs 2v sin(θ/2). A steady curve through the same angle costs vθ, which is always more. Stopping and starting costs 2v whatever the angle. So the rules of driving turn upside down: {% basis "physics" %}

- **Coast straight, then kick hard at the gate.** There is no racing line in the aircraft sense.
- **Never brake for a corner.** Turning at speed costs at most 2v. Slowing first never saves anything.
- **Fewer, sharper turns are cheaper.** A closed lap must turn through 360 degrees. Two hairpins cost 4v, a square 5.7v, a circle 6.3v.

| Turn | One kick | Smooth curve | Stop and go |
| --- | --- | --- | --- |
| 30° | 0.52 v | 0.52 v | 2 v |
| 90° | 1.41 v | 1.57 v | 2 v |
| 150° | 1.93 v | 2.62 v | 2 v |
| 180° | 2.00 v | 3.14 v | 2 v |

## Speed comes from the tanks

With no drag there is no top speed. What limits a lap is how much velocity change is left. If a course turns through a total cost of C times your speed per lap, you fly N laps, and you spend one v getting up to speed and one stopping, the fastest you can go is v = B / (N C + 2), where B is the budget. Double the propellant and the lap time halves. The engine does not set the pace; the tanks do. {% basis "physics" %}

The class rules fix the {% term "delta-v" %} budget at 2,300 m/s for every crew: 85 to launch, 150 held in reserve and 2,065 to race. {% basis "design" %} The cockpit shows it as a tape, worked out live from the rocket equation at the craft's current mass: red for the reserve, blue for the kicks the remaining gates will cost at the current speed, amber for the final stop, and green for what is left to spend on going faster. Beside the speed it shows one number, "can afford 92 m/s", that turns the budget into a strategy.

## A second limit: how fast you can turn

Propellant is not the only limit. A kick takes time. At 3 g, the crew limit, a kick of 100 m/s takes 3.4 s, and the nose has to swing onto the new direction first. Gates closer together than the distance covered in that time cannot be made cleanly. {% basis "physics" %}

On the sprint this, not propellant, sets the speed. The budget alone would allow 358 m/s through its slalom. At 175 m/s the kicks start to miss gates, and at 191 m/s each kick lasts 6 s and outlasts the 1,500 m between gates. The clean speed is about 166 m/s, 12.9 km in about 100 s. {% basis "design" %}

Stopping is not instant either. From 100 m/s the racer needs 440 m to flip and brake at 3 g. That is why the lanes run parallel to the hull and never at it: 500 m out, 110 m/s is the most a racer can close on the hull and still stop. {% basis "physics" %}

## The machine

The racer is a wide, flat craft 5.4 m long, 4.4 m wide and 1.9 m tall, with two seats side by side under a large canopy. The pilot sits on the left and flies. The navigator sits on the right, as in a rally, and runs the budget: which kick, how big, how much margin to the stop. {% basis "design" %}

Its shape comes from where the mass sits, not from air. The oxygen tanks sit in the two side pods, level with the crew, and the methane tanks sit in pairs fore and aft of them. As the tanks drain the centre of mass stays put to within 3 cm, so a pitch command never drags a yaw with it. Racing near structure is flown by eye, so the canopy is big. {% basis "design" %}

- **Engine:** 80 kN, liquid oxygen and methane, electric pumps, a 10 to 1 throttle and at least 100 restarts a race. Full thrust gives 3 g full and 5.9 g nearly empty, so the assisted cap throttles back as the tanks drain.
- **Steering:** the engine swings 6 degrees each way, and 24 small thrusters of 445 N, fed from the same tanks, turn and nudge the craft. A 180 degree flip takes 2.7 s.
- **Mass:** 2,749 kg full, half of it propellant.
- **Crew:** the cabin holds station air, so there is nothing to prebreathe. The crew still race in pressure suits with visors down, the way a driver wears a helmet.

Why methane and not hydrogen? Hydrogen gives the same mass but needs almost twice the tank volume, a chilldown to 20 K before each of 100 restarts and a second cold temperature. Methane and oxygen both stay between 90 and 112 K, so one insulation design covers both. Carbon is scarce at Concordia, but a race burns about 310 kg of it, a rounding error against one asteroid delivery. {% basis "design" %}

## Leaving the dock

The racer lives on its own dock on top of the spaceport, with a ready room, a lock tower and a boarding gangway that swings away before launch. It has no thrusters pointing straight back, so it cannot back out. Instead it pushes off upward on its belly thrusters, pitches its nose up to 45 degrees while it coasts, and lights the engine 28 m above the deck, beyond the 25 m rule that keeps hot exhaust off the dock. Sixteen and a half seconds after the launch starts it is 164 m out at 84 m/s, and the crew have control. {% basis "design" %}

## Racing safely next to a city

A full racer at 150 m/s carries 31 MJ, the energy of about 7 kg of explosive. The rules exist so that never meets the hull. {% basis "physics" %}

- **Bingo.** When the remaining budget only covers the reserve and the stop, the race ends and the computer flies the stop.
- **Stop margin.** Time to the nearest surface must stay above 1.3 times the time to stop. Below that, assisted flight takes over and flips and brakes, or sidesteps.
- **No exhaust on glass.** No main-engine burn may point its 30 degree plume at windows, radiators, solar arrays or sensors within 300 m.
- **Gates are four drones.** Each gate is four beacons on the corners of an 80 m square with nothing between them, so there is nothing to hit. Missing one costs 10 s, two is out.

The sense of speed comes from what is close. At 73 m/s the hull 500 m below sweeps past at 8 degrees a second and feels slow. A gate drone 40 m off the line goes by at 105 degrees a second. {% basis "design" %}

## Fly it

In the simulation the racer sits on its dock. Open {% explore viewpoint="racer-pit" label="the racer dock" %}, or from anywhere in Space mode press B and then 1: the camera is carried to the dock and the launch begins. The default race is the sprint.

- **Mouse** points the nose. **W** burns along it, **S** brakes. **A**, **D**, **Space** and **C** slide on the thrusters, **Q** and **E** roll.
- **X** is the space brake: the craft turns round and burns until it is at rest.
- **T** switches assisted and manual flight. Manual has no 3 g cap and no safety net, and it can crash.
- **F** strikes a flare and lets it go. Nothing pushes it, so it flies on in a straight line at the speed it left with while you burn and turn away from it.
- **Y** switches the cockpit and chase views. Hold **R** to relaunch.

In manual flight with the tanks nearly dry, try a free spin about the middle axis. It will not stay put: the craft starts to tumble, end over end, by itself. That is the {% term "Dzhanibekov effect" %}, and assisted flight never lets it start. {% basis "physics" %}

{% deeper "Why gravity is left out, and the numbers behind the craft" basis="physics" %}
**No gravity in the flight model.** Concordia sits at L5, where nothing nearby is massive. Over a 15 minute race the station's own gravity bends a path by 1.5 m, tidal effects by 0.17 m and sunlight pressure by 3 cm. The simulation flies straight lines and kicks. The same race in low Earth orbit would drift by hundreds of metres.

**Turn cost.** Turning a velocity v through θ with one impulse changes the velocity vector by

{% eq %}
Δv = 2 v sin(θ / 2)
{% endeq %}

and with steady sideways thrust by v θ. Because 2 sin(θ/2) is concave, two turns of θ/2 always cost more than one of θ.

**Race speed.** With budget B, turn cost C × v per lap, N laps and one v each to start and stop:

{% eq %}
v = B / (N C + 2)
{% endeq %}

**Budget.** The tape total is the rocket equation at the current mass, with a planning efficiency of 341.9 s (the main engine at 345 s blended with the thrusters at 300 s for the 6 percent they burn):

{% eq %}
Δv = Isp × g0 × ln(m / m_dry)
2,300 m/s = 341.9 s × 9.807 m/s² × ln(2,749 kg / 1,384 kg)
{% endeq %}

**Stopping.** Stop distance is v t_flip + v² / 2a: 440 m from 100 m/s at 3 g with a 2.7 s flip.

| Design value | Racer |
| --- | --- |
| Size | 5.4 × 4.4 × 1.9 m |
| Mass full / empty with crew | 2,749 kg / 1,384 kg |
| Propellant | 1,054 kg oxygen, 310 kg methane |
| Main engine | 80 kN, 345 s, gimbal ±6°, 10:1 throttle |
| Thrusters | 24 × 445 N, oxygen and methane gas, 300 s |
| Flip (pitch 180°), full | 2.7 s |
| Crew limit, assisted | 3 g chest to back, 1 g the other ways |
| Class budget | 2,300 m/s: launch 85, reserve 150, race 2,065 |

| Course | Length | Speed | Time |
| --- | --- | --- | --- |
| Sprint, start gate to gate A6 | 12.9 km | 166 m/s | about 100 s |
| Circuit, one lap and the run-up | 25.4 km a lap | 69 m/s | about 7 min |

These are Concordia design values. {% basis "design" %} Every one is reproduced by `scripts/analysis/exo_racer.py` in the Concordia repository.

<!-- facts: section 18 (racer) -->
{% enddeeper %}

{% sources %}
- Concordia fact sheet section 18 and the racer design note (`docs/specs/exo-racer-spec.md`), with every number printed by `scripts/analysis/exo_racer.py` and checked by `npm run racer:check`.
- The trailer: rendered in Blender from the simulation's exported geometry and the racer kit (`scripts/assets/build-racer-trailer.ps1`).
- The rocket equation and the intermediate axis theorem are textbook mechanics: Wikipedia, "Tsiolkovsky rocket equation" and "Tennis racket theorem" (checked 2026-10-23).
{% endsources %}
