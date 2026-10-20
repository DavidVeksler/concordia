---
title: "Earth to L5 travel: launcher, shuttle, skyhook"
h1: "Getting there from L5"
description: Concordia sits at Earth-Moon L5. A 10 km launcher gives the first 540 m/s, then the shuttle falls for 5 days to a transfer station. A skyhook then cuts the entry to 5.4 km/s.
lead: Concordia floats in the Earth-Moon L5 region, 384,400 km from Earth. A passenger leaves on a 10 km electromagnetic launcher, which gives the first push for free, falls for 5 days to a transfer station in Earth orbit, and rides a spaceplane down. The launcher is only the first leg.
nav: science
order: 12
updated: 2026-10-18
related:
  - /science/skyhook/
  - /science/materials/
  - /science/moving-around/
  - /places/spaceport/
  - /journey/
---

## Why L5

A {% term "Lagrange point" %} is a spot where the pull of two bodies and the motion of the orbit balance. {% term "L5" %} trails the Moon by 60 degrees on its orbit, at the same 384,400 km from Earth, forming an equilateral triangle with Earth and Moon. In the idealised picture, with Earth and Moon on circular orbits and nothing else pulling, L4 and L5 are stable: a small push sends an object into a slow loop around the point instead of carrying it away. The other three points are not. L4 and L5 stay stable only because Earth is more than 25 times heavier than the Moon; it is 81 times heavier. {% basis "physics" %}

The real world is messier. The Sun pulls, the Moon's orbit is not circular, and ship traffic and cargo launches all push on a station of this size. So Concordia is station-kept: continuous navigation, and low-level correction by high-efficiency electric thrusters. Twelve thruster pods ring the aft face, with a combined power around 108 MW and a {% term "specific impulse" %} near 3,000 s. Large manoeuvres take days or weeks. {% basis "challenge" %}

L5 was chosen for five reasons: low-energy access to lunar material, access to Earth and the cislunar network, no planet below, a huge volume for construction, and a staging point for travel onward. The station moves around Earth at 1.018 km/s. {% basis "physics" %}

{% shot "st-earth-moon-context" "Concordia at L5 with the Moon far off in the black. The Moon is the quarry and Earth is the market, and this point gives low-energy access to both." %}

## The launcher: first leg only

The passenger launcher is a track about 10 km long on the outside of the hull. A carrier on a levitated keel accelerates at 1.5 g for 37 seconds and leaves the end at about 540 m/s. Nothing touches the track at speed. {% basis "challenge" %}

It costs 24 GJ per launch, 0.65 GW on average and 1.31 GW at the peak, a few percent of the station's power. In return the shuttle saves about 28 tonnes of propellant. It does not reach Earth by itself. 540 m/s is two thirds of the push the trip needs, and the rest comes from the shuttle's own engines. The station does not turn quickly, so launches go in scheduled windows. {% basis "design" %}

{% shots "sci-launch-track" "The track from outside: gantries and a levitated keel run 10 km along the hull. Nothing touches the track at speed." "sci-launcher-cabin" "The ride from inside: 98 couches, a window band and a shelter bulkhead, held at 1.5 g for 37 seconds." %}

{% widget "launch-calculator" "Set a track length and an acceleration to see launch time and exit speed. At 10 km and 1.5 g the answer is 37 seconds and about 540 m/s." %}

{% explore chapter="launch" label="Ride the launch" %} {% explore viewpoint="launcher-track-external" %} {% explore chapter="exterior" label="See the whole habitat" %}

## The delta-v budget

{% term "delta-v" "Delta-v" %} is the change in speed a ship can make, the standard currency of spaceflight. After the launcher, the shuttle spends about 847 m/s on a one-way trip to capture at the transfer station.

{% diagram "transfer-orbit" "Half an ellipse from L5 to capture on day 5, with the Moon far off the whole way. Not to scale." %}

| Step | Delta-v | Where |
| --- | --- | --- |
| Launcher | 540 m/s | The track, no propellant |
| Departure burn | 281 m/s | Leaving L5 |
| Midcourse | about 20 m/s | Trim |
| Station capture | 546 m/s | At 950 km perigee |

The return leg is estimated at 926 m/s; it still loops past the Moon, because a direct return would cost 1,447 m/s. With methane and oxygen engines at 380 s specific impulse, the shuttle needs 66 tonnes of propellant for a round trip and carries 68, 53 t of oxygen and 15 t of methane. The oxygen is the part that comes from the Moon. Only the carbon and hydrogen for the methane have to come from elsewhere (see [materials](/science/materials/)). {% basis "physics" %}

## Five days, straight down

The path takes 5 days. A {% term "transfer orbit" %} is a path from one orbit to another, and this one is the cheapest there is: half an ellipse whose top is at lunar distance and whose bottom grazes the transfer station's orbit, 950 km above Earth. The launcher and the departure burn together take 821 m/s off the station's 1,018 m/s around Earth, and the shuttle falls. Halfway, on day 2, a 20 m/s trim is the only burn until the capture. {% basis "physics" %}

The Moon never comes closer than 372,000 km, so it looks the size it does from Earth the whole trip. {% basis "physics" %}

A path past the Moon, a {% term "gravity assist" %}, saves 31 m/s but takes 15 days. Falling direct costs about 1.5 tonnes more propellant on a 165 tonne stack and saves 10 days. Faster gets expensive: 4 days costs another 2 tonnes, 3 days another 12. {% basis "design" %}

Then comes the capture. At a {% term "perigee" %} of 950 km the shuttle fires its engines for 546 m/s and enters the transfer station's orbit, 950 by 47,527 km, one lap in about 14.8 hours. This burn is what turns a fly-by into an arrival. The perigee stays above 950 km because a skyhook sweeps everything below 750 km.

{% shot "sci-lunar-swingby" "Midcourse, day 2: the stack coasting toward Earth, one short trim burn on the way." %}

{% explore chapter="lunarSwingby" label="Ride the midcourse" %} {% explore chapter="earthTransfer" %} {% explore viewpoint="earth-moon-context" %}

## The station, the skyhook and the spaceplane

The Concordia shuttle never enters an atmosphere. It is a 64 m stack of two parts. The carrier holds propellant and four 160 kN methalox engines. A vacuum cabin module holds 98 couches, 96 passengers and 2 attendants. The stack weighs 165 tonnes at launch. {% basis "design" %}

The shuttle docks at a transfer station, a bare truss about 420 m long that does not spin, and the passengers cross to a spaceplane. The spaceplane is a lifting body that lands on a runway and never goes farther from Earth than the station. {% basis "design" %}

Its way down is a skyhook: a 600 km tether turning end over end, its centre in a 450 km orbit, its tips sweeping from 150 to 750 km up. The upper tip catches the spaceplane at 9.9 km/s while the lower tip catches one coming up from Earth. Eight minutes later, half a turn on, the tether lets go. The Earth-bound spaceplane leaves the lower tip at 5.3 km/s, 4.6 km/s slower than it arrived, and the spaceplane going up leaves 4.6 km/s faster. What one loses the other gains. {% basis "design" %} The [skyhook page](/science/skyhook/) goes through the swap, what riders feel and what is not settled, with a half-turn you can scrub.

The released spaceplane reaches the 120 km entry interface 110 seconds later at 5.4 km/s, 5.8 degrees below horizontal. Without the skyhook, the same trip from lunar distance meets the air at 11 km/s, almost Earth's escape speed, with about four times the heating. {% basis "physics" %}

{% shots "sci-skyhook-station" "The transfer station: a bare truss about 420 m long, with the Concordia shuttle docked at one end." "sci-skyhook-catch-cine" "The catch: the spaceplane hangs from the tether's upper terminal on a net of strands, Earth's limb behind it." %}

{% shot "sci-earth-arrival" "Earth filling the window on the way in." %}

{% explore chapter="transferStation" label="Dock at the transfer station" %} {% explore chapter="earthArrival" label="Arrive at Earth" %}

{% deeper "Worked example: launch, capture and the skyhook" basis="physics" %}
Launcher: a = 1.5 × 9.807 = 14.7 m/s². Over L = 10 km, v = √(2aL) = √(2 × 14.7 × 10,000) = 542 m/s, in t = v ÷ a = 36.9 s. The energy for a 165 t stack is ½mv² = 0.5 × 165,000 × 542² = 24.2 GJ, in line with 24 GJ over 37 s, an average of 0.65 GW.

Departure: the station moves round Earth at √(μ ÷ 384,400) = 1.018 km/s. At the top of an ellipse from 384,400 km down to r = 7,321 km (a = 195,861 km) the speed is √(μ × (2 ÷ 384,400 − 1 ÷ 195,861)) = 0.197 km/s, so the launcher and the departure burn must take off 1.018 − 0.197 = 0.821 km/s: 540 m/s from the track, 281 m/s from the engines. Half the ellipse takes π × √(a³ ÷ μ) = 431,000 s, 4.99 days.

Propellant: the exhaust speed of a 380 s engine is 380 × 9.807 = 3.73 km/s. By the rocket equation, Δv = vₑ ln(m₀ ÷ m₁), so 847 m/s needs m₀ ÷ m₁ = e^(0.847 ÷ 3.73) = 1.255, which is about 20 percent of the starting mass in propellant, one way, before the return.

Capture: a body falling from the Moon's distance to a perigee 950 km above the surface (r = 7,321 km) reaches, by the vis-viva equation,

{% eq %}
v = √( μ × (2 ÷ r - 1 ÷ a) )
{% endeq %}

with μ = 398,600 km³/s² and a = (7,321 + 384,400) ÷ 2 = 195,861 km, v = 10.34 km/s. The station's orbit has a = (7,321 + 53,898) ÷ 2 = 30,610 km, so the speed at its perigee is 9.79 km/s. The capture burn is the difference, 0.546 km/s.

Skyhook: the tether's upper tip moves at 9.94 km/s at the top of its swing and the lower tip at 5.34 km/s at the bottom. A spaceplane caught at one tip and released at the other changes speed by 9.94 − 5.34 = 4.60 km/s.
{% enddeeper %}

<!-- facts: section 7 (Transport outward), section 1 (Orbit), section 8 (chapters 12 to 17) -->

{% sources %}
- "Lagrange Points of the Earth-Moon System", HyperPhysics, Georgia State University: [hyperphysics.gsu.edu](https://hyperphysics.gsu.edu/hbase/Mechanics/lagpt.html).
- Concordia engineering specification, sections 2, 31, 32 and 42, and the Concordia shuttle and aft-end design notes.
- Grant, J., et al., "Hypersonic Airplane Space Tether Orbital Launch (HASTOL) Architecture Study, Phase II Final Report", Boeing and Tethers Unlimited for NIAC, 2001: [niac.usra.edu](https://www.niac.usra.edu/files/studies/final_report/391Grant.pdf). A 600 km tether with a 1,977 m/s tip speed and a Mach 19 catch.
{% endsources %}
