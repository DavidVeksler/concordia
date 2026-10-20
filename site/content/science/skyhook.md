---
title: "Rotating skyhook vs space elevator explained"
description: "A 600 km orbiting tether, not a space elevator, turns half a revolution in 8 minutes and hands 4.6 km/s between spaceplanes, cutting Earth entry from 11 to 5.4 km/s. Scrub the half-turn."
lead: A spinning tether 600 km long catches one spaceplane as it arrives and another as it leaves, turns half a revolution in 8 minutes, and lets both go. What the arriving craft loses, the departing craft gains. No propellant buys the speed, and the family's entry into the air starts at 5.4 km/s instead of 11.
h1: The rotating skyhook
crumb: Skyhook
hero: sci-skyhook-half-turn
nav: science
order: 13
updated: 2026-10-18
related:
  - /science/getting-there/
  - /science/artificial-gravity/
  - /science/moving-around/
  - /journey/
---

{% predict "A spaceplane is caught at the tether's upper tip at 9.94 km/s and released at the lower tip half a turn later. How much speed does it lose, with no engine firing?" correct=2 %}
About 1 km/s
About 4.6 km/s
About 7.6 km/s
---
It gives up 4.6 km/s, and the spaceplane leaves the lower tip at 5.34 km/s. The same tether hands the other spaceplane the same 4.6 km/s, so the pair swaps speeds. {% basis "physics" %}
{% endpredict %}

## Skyhook or space elevator? {#not-an-elevator}

A space elevator is a fixed cable from the ground up to geostationary orbit, about 35,786 km above the equator, with riders climbing it. The skyhook is a different machine. It is 600 km long, it orbits Earth at the hub's 450 km and turns end over end, and it never touches the ground. Spaceplanes fly up to it and are caught, so nobody climbs anything. It trades a 35,786 km cable for a 600 km one that moves, and the price is a tether heavy enough to need a facility many times the payload. {% basis "design" %}

## Why the arrival splits across two vehicles {#two-vehicles}

The Concordia shuttle never touches air. It is a carrier with four engines and a vacuum cabin module with 98 couches, 165 tonnes at launch. A shuttle built to land would haul wings, flaps and a heat shield to L5 and back on every trip. The cabin module weighs 27 tonnes dry, 0.28 tonnes per seat, against 0.6 for the old lifting-body coach. {% basis "design" %}

So the trip is cut in two. The shuttle falls for 5 days from L5 and docks at a transfer station, a bare truss 420 m long in a 950 by 47,527 km orbit, one lap in 14.8 hours. Passengers cross to a spaceplane: a lifting body that lands on a runway and never goes farther from Earth than the station. The skyhook is the way down. {% basis "design" %}

{% explore chapter="transferStation" label="Dock at the transfer station" %} {% explore chapter="earthArrival" label="Ride the arrival" %}

## One tether, two craft {#swap}

A tether turning end over end is a lever in orbit. The hub sits in a circular orbit 450 km up, moving at 7.644 km/s. Two arms of 300 km each carry a terminal at the end. At the top of its swing the upper terminal is at 750 km and moves at 9.94 km/s, 2.30 km/s faster than the hub. Half a turn later the same terminal is at the bottom, at 150 km, moving at 5.34 km/s, 2.30 km/s slower. {% basis "design" %}

A spaceplane arriving from the station falls onto the upper terminal on an orbit whose lowest point is exactly that tip, so it meets the tip tangentially. A spaceplane climbing from Earth coasts up onto the lower terminal the same way. Both are caught at the same moment, one at each end. Eight minutes and half a turn later the tether lets go. The family's craft leaves the bottom at 5.34 km/s, 4.60 km/s slower than it arrived. The other leaves the top at 9.94 km/s, 4.60 km/s faster. {% basis "physics" %}

This is conservation of momentum, nothing else. The two craft weigh about the same, so one gives and the other takes, and the hub's orbit barely moves.

## Keeping the hub in its orbit {#reboost}

Traffic is not always balanced. When more mass leaves Earth than arrives, the tether gives away more momentum than it takes in, and the hub sinks. When more arrives, the hub climbs. A 10 tonne mismatch in one swap moves 23 m/s into a 2,000 tonne facility and lowers the far side of the hub orbit by about 82 km. The skyhook corrects this two ways. {% basis "physics" %}

**Electrodynamic thrust.** Aluminium conductors braided into the strands carry a current from the hub's solar arrays. A current through a long wire in Earth's magnetic field feels a push, so the tether itself becomes the engine, with no propellant. Run the current one way and the hub climbs; reverse it and the hub descends while the tether makes power. This is the slow, steady method, working between catches, and the one the HASTOL phase I report proposed (Bogar et al. 2000, PDF p. 8). {% basis "design" %}

**Ion thrusters on the hub.** A cluster of electric thrusters at the hub, run on the same solar power, handles the faster corrections and the trims the magnetic field cannot give in every direction. At an exhaust speed of 30 km/s, making up that whole 23 m/s with ions alone would take about 1.5 tonnes of propellant, against 13 tonnes for a chemical rocket. In practice the electrodynamic push carries most of the load and the ion thrusters top it up. {% basis "design" %}

## What the skyhook is for {#purpose}

The skyhook is an orbital power bank. Every arriving craft deposits its extra speed in the tether, and every departing craft withdraws it, so the same momentum is spent again and again. Only the difference between what comes in and what goes out has to be paid for, and it is paid in sunlight and a little ion propellant. {% basis "design" %}

That is the trade: expensive rocket propellant for cheap solar power. Giving or taking 4.6 km/s with a methane and oxygen rocket costs about 2.6 tonnes of propellant for every tonne of spaceplane, and all of it has to be lifted out of Earth's gravity first. The tether hands over the same 4.6 km/s with no propellant at all, and its solar arrays and ion thrusters cover the imbalance. {% basis "physics" %}

{% facts basis="design" %}
450 km | Hub orbit, 7.644 km/s
150 to 750 km | Tips sweep this band
480 s | One half-turn
9.94 km/s | Upper tip at the top
5.34 km/s | Lower tip at the bottom
4.60 km/s | Handed across, each way
{% endfacts %}

{% widget "skyhook-half-turn" "At capture the family's spaceplane is at the top at 9.94 km/s and the spaceplane from Earth is at the bottom at 5.34 km/s. Eight minutes later they have swapped: 5.34 and 9.94 km/s." %}

In the widget, the family's craft is amber and the one from Earth is teal. Drag to the left of capture to see them approach, one from behind and above and one from ahead and below. Drag to the right of release and the family's craft drops away behind and below, the other climbs away ahead. That is what losing and gaining speed looks like from the hub. {% basis "physics" %}

{% shot "sci-skyhook-half-turn" "The tether 70 percent of the way through the half-turn, seen from the side. The brackets mark the two spaceplanes at its ends; the line itself is a thin glint, drawn about one pixel wide." %}

## What the riders feel {#riders}

Captured passengers feel 1.87 g at the top of the swing, 1.76 g when the tether is level and 1.88 g at the bottom, for the full 8 minutes. The pull points away from the hub, toward the belly and the cabin floor, so riders sit pressed into their seats the whole way. Concordia residents live at 1 g, so 1.87 g for 8 minutes, seated, is tolerable. {% basis "design" %}

The catch itself is gentle by geometry. At contact the tip moves almost straight up or down relative to the arriving craft: 9 m of separation one second before contact, 37 m at two seconds, 229 m at five. A grapple head on a short free-running line follows the spaceplane's path, latches its dorsal fixture, and the line brakes over about 5 seconds, so the load rises smoothly from nothing to 1.87 g. {% basis "design" %}

{% shot "sci-skyhook-capture" "Twenty seconds after capture, the spaceplane hangs under the upper terminal on a fan of strands, belly out. Near the craft the tether is drawn as an open net; farther away it merges into one line." %}

{% shot "sci-skyhook-terminal" "Two seconds after the catch, the strands pull taut between the spaceplane's dorsal fixture and the terminal. The load has only begun to build." %}

The real tether is thinner than any pixel the simulation can draw. At 2 to 12 cm equivalent diameter and 300 km an arm, its aspect ratio is about 6,000,000 to 1. The simulation draws it as a sunlit glint of constant screen width, the way you would see it from another spacecraft. {% basis "challenge" %}

## Why the entry is gentler {#entry}

Released at the bottom, the family's spaceplane is on a suborbital path: 5.34 km/s at 150 km, 2.47 km/s below the speed that would keep it in orbit there. It reaches the 120 km entry interface 110 seconds later at 5.40 km/s, 5.8 degrees below horizontal. {% basis "physics" %}

Without the skyhook, a craft from lunar distance meets the air at 11.0 km/s. The kinetic energy to shed per kilogram goes with the square of speed, and (5.4 ÷ 11)² is 0.24: about a quarter. The ballistic upper bound on peak deceleration is 7.7 g, and lift brings it lower. {% basis "physics" %}

The 150 km tip is chosen for this angle. A tip at 200 km gives a 9.4 degree entry and a 12.7 g bound, steep for passengers. The bottom of the swing is the shallowest release available: letting go earlier or later steepens the path. {% basis "design" %}

The final burn in the story is not a deorbit burn, since the path already meets the air. It is an entry trim burn of about 30 m/s at 40 seconds after release, 0.5 g for 6 seconds, which moves the entry point downrange onto the runway's approach corridor. The tip rises off the spaceplane by itself, 9 m after one second and 15 km after forty, so no burn is needed for clearance. {% basis "design" %}

{% shot "sci-skyhook-release-cine" "The release at the lower tip: the spaceplane lets go and the strands fall away behind it. From here it is on a suborbital path." %}

{% shots "sci-skyhook-release" "Twelve seconds after release, the dashed amber arc is the family's path, falling away from the tether's lower end toward the atmosphere." "sci-skyhook-ignition" "The entry trim burn 40 seconds after release: two plumes on a small white spaceplane over a dusk Earth. This is where the story ends." %}

## What is not settled {#open}

**The ascent from the ground.** The spaceplane from Earth must reach the lower tip at 5.34 km/s and 150 km. That needs a booster stage or a hypersonic carrier aircraft of the kind HASTOL proposed, and Concordia does not choose between them. This page covers the arrival, not the climb. {% basis "challenge" %}

**Simultaneous catches.** HASTOL does not propose catching a payload going up while another comes down; its authors handled the two on adjacent orbits (Grant et al. 2001, PDF p. 25). Concordia keeps the paired catch, because a symmetric tether makes the swap clean and the momentum exchange visible. If one catch is missed, the other is a single catch, which is the case HASTOL designed for. HASTOL also arranged its throw so that a craft that misses its catch still re-enters. {% basis "challenge" %}

**How the station schedules pairs.** A swap of equal masses leaves the hub's orbit unchanged to first order, so the station books arrivals and departures in matched pairs when traffic allows and leaves the rest to the reboost described above. The booking rules and the reboost power budget are not designed. {% basis "challenge" %}

**The tether's mass.** For a 60 tonne spaceplane, an ideal tapered arm weighs 478 tonnes in Zylon at a safety factor of 2, and 1,695 tonnes in Spectra at a safety factor of 3, 8 to 28 times the payload. The gravity gradient adds roughly 25 percent. HASTOL's 600 km case settled at a facility 26 times the payload. Concordia's tether is sized by the same method and is not a materials design. {% basis "challenge" %}

**Orbit planes.** The hub's low orbit and the station's high one precess at different rates, so a real departure waits for the planes and timing to line up. The simulation fixes them by hand. {% basis "challenge" %}

{% explore chapter="earthArrival" label="See the arrival in the simulation" %}

{% deeper "Worked example: tip speeds, load and the swap" basis="physics" %}
The hub's orbit radius is 6,371 + 450 = 6,821 km. Its speed is v = √(μ ÷ r) with μ = 398,600 km³/s², so v = 7.644 km/s, and its orbital rate is n = v ÷ r = 0.001121 rad/s (a 93.4 minute lap).

The tether turns half a revolution against the local vertical in 480 s, so ω = π ÷ 480 = 0.006545 rad/s. Measured against the stars the turn is faster by the orbit's own rate: ω + n = 0.007666 rad/s. A tip 300 km from the hub then moves relative to the hub at

{% eq %}
(ω + n) × L = 0.007666 × 300 = 2.300 km/s
{% endeq %}

so the top tip moves at 7.644 + 2.300 = 9.944 km/s and the bottom tip at 7.644 − 2.300 = 5.345 km/s. One swap hands across 9.944 − 5.345 = 4.599 km/s, and the other craft gains the same.

Load: the turn alone gives (ω + n)² × L = 0.017630 km/s², which is 1.80 g. Earth's pull is a little weaker at the upper tip than at the hub (7.85 m/s² at the upper tip against 8.55 at the hub), and the tether carries the difference, 0.07 g. The sum is 1.87 g at the top, 1.76 g level and 1.88 g at the bottom, always pointing away from the hub.

Entry: the lower tip is 150 km up at 5.345 km/s. A circular orbit there needs 7.818 km/s, so the craft is 2.47 km/s short and its orbit dips inside Earth. From the vis-viva equation, v = √(μ × (2 ÷ r − 1 ÷ a)), the speed at the 120 km interface is 5.397 km/s, 110 s later. The energy ratio against an 11.0 km/s entry is (5.397 ÷ 11.0)² = 0.24.

The half-turn takes the hub 30.8 degrees along its orbit, 3,669 km, in 480 s. Numbers: `scripts/analysis/skyhook_arrival.py`, outputs 1, 2 and 4.
{% enddeeper %}

<!-- facts: section 7 (Transport outward), skyhook analysis outputs 1 to 6 in docs/specs/earth-arrival-skyhook-output.txt -->

{% sources %}
- Concordia engineering specification, the Concordia shuttle design notes, and the skyhook and spaceplane numbers in `scripts/analysis/skyhook_arrival.py` (docs/specs/earth-arrival-skyhook-spec.md, sections 1 and 2).
- Grant, J., et al., "Hypersonic Airplane Space Tether Orbital Launch (HASTOL) Architecture Study, Phase II Final Report", Boeing and Tethers Unlimited for NIAC, 2001: [niac.usra.edu](https://www.niac.usra.edu/files/studies/final_report/391Grant.pdf) (read 2026-10-17). A 600 km tether with a 1,977 m/s tip speed, Mach 19 catch and a facility 26 times the payload (Table 3-1, PDF pp. 35 to 36); the free-running grapple and near-vertical approach (PDF pp. 13 to 14); no simultaneous up and down catches, and a missed catch still re-enters (PDF p. 25).
- Bogar, T. J., Bangham, M. E., Forward, R. L., Lewis, M. J., et al., "Hypersonic Airplane Space Tether Orbital Launch System, Phase I Final Report", Boeing for NIAC, 2000: [niac.usra.edu](https://www.niac.usra.edu/files/studies/final_report/355Bogar.pdf) (read 2026-10-17). A 600 km tapered tether, a multi-strand tether that survives impacts, and aluminium conductors braided in for electrodynamic reboost (PDF pp. 7 to 8).
- Moravec, H., "A Non-Synchronous Orbital Skyhook", Journal of the Astronautical Sciences 25(4), 307 to 322, December 1977: [ri.cmu.edu](https://www.ri.cmu.edu/publications/a-non-synchronous-orbital-skyhook) (read 2026-10-18). The rotating tether and its taper, the scaling behind the tether-mass figures above.
{% endsources %}
