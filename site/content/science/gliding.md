---
title: Flying in a spinning world
crumb: Flying
description: Fly backward fast enough inside a Concordia rotor and your wing needs no lift at all. Test it, see why it happens, and watch what a released object really does near the axis.
lead: "Inside a rotor, weight is not a pull. It is the push it takes to bend your path into a circle. Fly against the spin at the speed the floor turns and there is no circle left to bend: your wing needs no lift, and you hang still against the stars while the city turns around you."
nav: science
order: 9
hero: sci-sky-from-above
updated: 2026-10-15
related:
  - /science/artificial-gravity/
  - /science/moving-around/
  - /science/air-water-food/
  - /science/light-and-sky/
---

{% facts %}
157 m/s | speed of the floor, against the stars | physics
18.8 m/s | flying backward at this speed 2,200 m up needs no lift | physics
563 km/h | the same trick at the ground | physics
13 min | for cargo let go near the axis to reach the floor, in vacuum | physics
{% endfacts %}

## What if you flew backward fast enough?

The floor of a rotor moves at 157 m/s. So does the air, because it turns with the floor. Everything that sits still on the street is really racing round a circle 5 km across, and the floor has to push it inward the whole time. That push is what you feel as weight. {% basis "physics" %}

A glider is the same. Its wing pushes it inward to hold it on its circle. Now fly against the spin, which residents call antispinward.

{% predict "A glider 2,200 m up, where the floor turns at 18.8 m/s, flies antispinward at 18.8 m/s. How much lift does its wing need?" correct=3 %}
The standing weight there, 0.12 g, like any level flight
More than standing, because it is fighting the spin
None at all
Half the standing weight
---
None. Against the stars the glider is not moving: the floor goes one way at 18.8 m/s and the glider goes the other way through the air at 18.8 m/s. With no motion there is no circle to bend, so the wing has nothing to do. The glider hangs still while the rotor turns around it.
{% endpredict %}

## Try it

Pick a height, then slide the airspeed. The dot is the lift your wing needs, the dashed line is the same speed flown spinward.

{% widget "flying-backward" "A chart of the lift a wing needs to fly level inside the rotor, against antispinward airspeed. At 2,200 m the lift needed falls from 0.12 g at rest to zero at 18.8 m/s, then rises again, back to 0.12 g at 37.6 m/s. At the ground the zero is at 156.5 m/s, 563 km/h." %}

Three things to notice:

- **The zero moves with height.** The floor turns at 0.0626 rad/s everywhere, so its speed is that rate times your distance from the axis. At the ground that is 156.5 m/s, at the sky 128 m/s, at 2,200 m only 18.8 m/s. The cancellation speed shrinks in the same proportion.
- **Past the zero, lift comes back.** Fly faster than the floor and you circle the axis backwards. At twice the floor speed you need exactly your standing weight again.
- **The glider can only reach it near the axis.** Its 4 kW motor tops out around 21 m/s. Cancelling at the ground would mean 563 km/h and about 1.6 MW against 7 kN of drag. Above about 2,150 m the cancellation speed drops inside the glider's reach. {% basis "design" %}

## Why your required lift reaches zero

There are three numbers here that all get called gravity, and they are different things. {% basis "physics" %}

1. **Standing weight**, ω²r: what you feel turning with the floor at radius r. The floor or a building supplies it.
2. **Lift needed for level flight**, (ωr ± V)²/r: the inward push needed to fly a steady circle at airspeed V, plus with the spin and minus against it. It depends on where you are and how you move.
3. **The push you actually feel**: lift plus thrust minus drag, divided by your mass. It equals the second number only in steady level flight. Climb, dive or turn and it differs.

The key term is ωr ± V. That is your speed against the stars. Flying antispinward subtracts your airspeed from the floor's speed. When the two match, your speed against the stars is zero, and a body that is not moving needs no push to stay where it is.

## Zero lift is not zero force

At the cancellation point the wing makes no lift, but the air still streams past at 18.8 m/s. That is a headwind of 18.8 m/s, and it costs drag: 88 N, which the propeller must match at about 2.4 kW. {% basis "physics" %}

So three states that sound alike are different:

- **Zero-lift flight**: the wing makes no lift, but drag and thrust still act. The glider at the cancellation point.
- **Zero-net-force flight**: all forces cancel, so you move in a straight line at constant speed. The same glider is in this state too, because its thrust exactly cancels its drag, and its straight line happens to be standing still.
- **Ballistic motion**: no thrust at all, just whatever the air does to you. Cut the motor and the glider becomes this, which is the next experiment.

Cut the motor and the headwind slows the glider through the air. It drifts spinward against the stars, starts to circle again, and needs lift again. With no motor its only energy source is moving outward, so it glides down. From 2,200 m the glider in the model is down to 1,830 m after a minute and lands about 13 minutes later, at the same 18.8 m/s airspeed but carrying 0.76 g by then.

## Fly it

The glider is a light electric hang glider: 120 kg with its pilot, a 16 m² wing and a 4 kW motor. {% basis "design" %} Pick a height, a heading and an airspeed, press Fly, and the autopilot holds them. Try **Cancel your weight**, then **What happens if the motor stops?** The inset in the corner draws the three velocities: the air, the glider through the air, and their sum, the glider against the stars.

The full simulation has the same glider in the city. Start with {% explore viewpoint="glider-take-off" label="a take-off run on the road" %} or {% explore viewpoint="glider-over-city" label="a flight 300 m above the city" %}; both are in the atlas under Glider. Or in Explore mode, inside a habitation rotor, press B to board it, fly it between the towers, and drop the ball over a street.

{% widget "glider" "A glider flown inside the rotor, with a ball you can drop and a motor you can cut. At the ground, at 14 m/s, the glider needs 1.19 g of lift flying with the spin and 0.83 g against it. At 2,200 m, flying antispinward at 18.8 m/s, it needs none and hangs still against the stars." %}

Switch between the two views. In the Outside view the rotor turns once every 100 seconds and the ball flies a straight line. In the Resident view the floor holds still and the same ball curves backward. That curve is the {% term "Coriolis effect" %}: the price of describing a straight line from a turning point of view.

{% shot "sci-glider-over-city" "The view from the hang glider, 300 m above the floor. The ground of the rotor curves up ahead and overhead, and the glider flies along the same curve, bent into it by its wing." %}

## What happens when you let go

Nothing in a rotor pulls things toward the floor. Let go of something and the only forces left are from the air. {% basis "physics" %}

- **At the exact axis, a still object stays put.** The air there does not move, so nothing pushes it, with air or without.
- **Anywhere else, it keeps the speed it had.** Let go from a tower and it moves at the floor's speed at that height, sideways, in a straight line. The floor curves up to meet it. A resident sees it fall and curve backward.
- **Near the axis that straight line is slow and long.** Cargo let go 50 m from the axis moves at only 3.1 m/s. In vacuum it coasts for 13 minutes, then the floor sweeps into it almost sideways at 156 m/s. It barely falls at all: the floor catches it.
- **The air changes that.** The air turns faster than the drifting cargo, so the headwind pushes it spinward and spins it up. More spin carries it outward faster, and drag caps its speed. The same parcel in air lands in under 4 minutes at 38 m/s.

{% widget "release-lab" "Two views of an object let go inside the rotor, from outside and from the floor, with air or in vacuum. A steel ball let go at the 450 m sky lands 221 m antispinward of the spot below after 11.4 s. Cargo let go 50 m from the axis takes 13 minutes in vacuum and is hit sideways at 156 m/s; with air it lands after 220 s at 38 m/s." %}

Where do the spin and the energy come from? From the air, and the air gets them from the rotor. Drag pushes the object toward the air's own motion, so it hands over angular momentum. The rotor's air holds 45 million tonnes and is kept turning by the floor and the walls, so the share one parcel takes is far too small to measure. {% basis "physics" %}

## Heading and height

Direction matters even at ordinary speeds. At the ground at 14 m/s the glider moves against the stars at 157 + 14 = 171 m/s flying spinward and needs 1.19 g of lift, a lift coefficient of 0.74 and 2.4 kW. Antispinward it moves at 143 m/s and needs 0.83 g, 0.52 and 1.7 kW. The same sum runs the [ring metro](/science/moving-around/), where 100 km/h against the spin weighs 0.66 g.

Climb and both weight and air thin out: 0.82 g and 95 percent of ground density at the sky ([the table](/science/air-water-food/)). The least power the glider needs falls from about 2.0 kW at the ground to about 250 W 2,000 m up.

{% deeper "The equations, the model and its assumptions" basis="physics" %}
The flight is integrated in the inertial frame, where a rotor has no gravity. The air turns rigidly with the rotor, so at position **r** it moves at **u** = **ω** × **r**. A body's velocity relative to the air is **w** = **v** − **u**, and the only forces are aerodynamic (and thrust, for the glider):

{% eq %}
q = ½ ρ(r) w²
lift = q S C_L, perpendicular to w, upright
drag = q S (C_D0 + k C_L²), along −w
thrust = throttle × min(300 N, η P / w)
{% endeq %}

The Resident view is the same motion with the coordinates rotated by ω t. Nothing is added to the physics to draw it; in that frame the motion obeys **a**_rot = ω² **r** − 2 **ω** × **v**_rot + forces / m, and the checks confirm the drawn paths do.

**Level flight.** Assume steady flight at constant radius r = 2,500 − h, constant airspeed V along the circle (no climb, no acceleration, no motion along the axis), thrust balancing drag along the path, and lift pointing at the axis. Then the craft moves against the stars at ωr ± V and the wing must supply:

{% eq %}
a_required = (ω r ± V)² / r
C_L = 2 m a_required / (ρ S V²)
{% endeq %}

Antispinward (−), a_required falls to zero at V = ωr and rises again past it: at V = 2ωr it equals the standing weight ω²r, with the craft circling backwards. The cancellation speed is proportional to r: 156.5 m/s at the ground, 18.8 m/s at r = 300 m. At zero lift the drag is still q S C_D0, so holding the cancellation costs ½ ρ (ωr)³ S C_D0 / η: about 2.4 kW at r = 300 m and about 1.6 MW at the ground.

Setting C_L to its limit gives the stall speed in closed form. With K = 2 m / (ρ S r) and C_Lmax = 1.4:

{% eq %}
V_stall (with the spin) = ω r / (√(C_Lmax / K) − 1)
V_stall (against) = ω r / (√(C_Lmax / K) + 1)
{% endeq %}

**Gliding with the motor off.** In the frame turning with the air, lift and the Coriolis force are perpendicular to the motion and do no work, so energy changes only by drag and the centrifugal term: d/dt(½ w² − ½ ω² r²) = −D w / m. Holding airspeed then needs a sink rate of D w / (m ω² r). The standing weight sets the glide, not the lift needed.

**Release.** In vacuum a body let go while turning with the floor at r₀ flies a straight line at ω r₀. It reaches the floor after t = √(R² − r₀²) / (ω r₀) and meets it at ω √(R² − r₀²) relative to the floor, almost all of it sideways when r₀ is small. Its angular momentum per kilogram, r₀ × ω r₀, never changes, so its share of the floor's spin falls to (r₀ / R)² by the time it lands. In air, drag is quadratic against the local air:

{% eq %}
F_drag = −½ ρ(r) C_D A |w| w
{% endeq %}

A body lagging the air feels a spinward push, which adds angular momentum; that is what carries it outward. Drag areas: sphere C_D 0.47, cube face-on 1.05, a person spread flat about 0.5 m² (50 to 55 m/s terminal speed on Earth at 80 kg).

Air density follows the barometric rule with the centrifugal potential in place of g h, as on the [air page](/science/air-water-food/):

{% eq %}
ρ(r) = ρ_ground × exp( −ω² (R² − r²) / (2 R_gas T) )
{% endeq %}

with R = 2,500 m, ω = 0.0626 rad/s, R_gas = 287 J/(kg K), T = 293 K and ρ_ground = 1.204 kg/m³.

| Design value | Glider |
| --- | --- |
| Mass, pilot and craft | 120 kg |
| Wing area | 16 m² |
| Parasite drag C_D0 | 0.03 |
| Induced drag factor k | 0.06 (aspect ratio 6, efficiency 0.88) |
| Lift coefficient limit | 1.4 |
| Motor | 4 kW shaft, 70 percent propeller efficiency, 300 N static thrust |
| Best glide ratio | about 12 |
| Fastest level flight | about 21 m/s at the ground, 22 m/s near the axis |

| Free body | Mass | Drag area C_D A |
| --- | --- | --- |
| Steel ball, 17 cm | 20 kg | 0.0105 m² |
| Cargo parcel, 30 cm cube | 10 kg | 0.095 m² |
| Person, spread flat | 80 kg | 0.5 m² |

These are design values for the widgets, not measurements of real craft. {% basis "design" %} What the model leaves out: flight along the axis (no Coriolis effect there, the glider behaves as on Earth with less weight), turbulence, wind, buildings, ground effect, a tumbling body's changing drag, and any slowing of the rotor's air by what it pushes. The air is assumed to turn exactly with the floor; real air near the axis may lag slightly.

<!-- facts: section 2 (gravity versus height, atmosphere), section 13 (glider model, cancelling weight, release lab) -->
{% enddeeper %}

{% sources %}
- Concordia fact sheet section 13 (glider model, cancellation and release results, and the checks that guard them: `npm run site:widgets-test`) and the engineering specification, sections 8 to 11.
- Air density from the same exponent as the pressure table on [Air, water and food](/science/air-water-food/).
- Drag coefficients for a sphere (0.47) and a cube (1.05): the measured values tabled in Wikipedia, "Drag coefficient" (checked 2026-10-15).
{% endsources %}
