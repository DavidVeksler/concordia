---
title: "Games: fly a glider, a racer and a shuttle"
h1: "Three ways to fly Concordia"
crumb: Games
description: "Fly a hang glider inside a spinning city, race a rocket round the hull on a fixed fuel budget, or take the 155 t Concordia shuttle off its berth. Free in the browser, real physics."
lead: "Concordia is a place to fly as well as to walk. A hang glider over the city, a two-seat rocket racer outside the hull and the 64 m Earth shuttle all fly on the same physics the station is built on, in your browser, with no install."
nav: games
hero: gm-glider-cockpit
ctaViewpoint: glider-take-off
ctaLabel: Start with the glider · 3D
schema: WebPage
updated: 2026-11-13
related:
  - /science/gliding/
  - /science/racing/
  - /science/getting-there/
  - /places/spaceport/
---

<nav class="games-index" aria-label="Vehicles"><a href="#glider">Hang glider</a><a href="#racer">Rocket racer</a><a href="#shuttle">Concordia shuttle</a><a href="#controls">Controls</a></nav>

{% facts %}
120 kg | the glider with its pilot, on a 16 m² wing | design
2,300 m/s | the racer's whole fuel budget, start to stop | design
155 t | the shuttle on a ferry flight, 33 s to turn round | design
157 m/s | speed of the rotor floor the glider flies over | physics
{% endfacts %}

Each vehicle is a different lesson in the same physics. The glider flies in air that turns with the floor, so which way you point changes how much you weigh. The racer has no air at all, so every corner is paid for in propellant. The shuttle has the racer's physics at 56 times the mass, so it handles like a ship and plans its stops kilometres ahead.

## Hang glider: flying inside a spinning city {#glider}

{% shot "gm-glider-chase" "Chase view over Tsiolkovsky, the first rotor, 220 m up. The floor curves up ahead and overhead, and the glider follows that curve, held on it by its wing." %}

Take off from a street in the Arbor quarter, climb over the rooftops and fly the length of a city that curls up into the sky on both sides. The floor turns at 157 m/s, and the air turns with it, so flying with the spin makes you heavier and flying against it makes you lighter. Climb to 2,200 m, fly backward at 18.8 m/s and your wing needs no lift at all. {% basis "physics" %}

{% shots "gm-glider-takeoff" "The take-off run down the street: hold W to roll, Space to lift off." "gm-glider-high" "300 m up. From here the rotor is a 5 km tube with the city on its inside, and you feel 1.07 g." %}

What to try:

- **Drop the ball.** Press R over a street and watch it curve backward as it falls. From 450 m it takes 11.4 s and lands 221 m antispinward of the spot below.
- **Land it.** Push the nose down below 60 m and the autopilot flies the approach, holds the airbrakes out and rounds out onto the wheels.
- **Fly crabbed.** The air drifts up to 3 m/s along the axis, with gusts. Across it the glider flies 12 degrees off its track.
- **Loop it.** In manual flight (T) the glider loops and flies inverted. It can also crash.

<p class="game-actions"><a class="btn btn--primary" href="/explore/?viewpoint=glider-take-off">Fly the glider · 3D</a><a class="btn" href="/explore/?viewpoint=glider-over-city">Start in the air</a><a class="btn btn--ghost" href="/science/gliding/">How flying in a rotor works</a></p>

## Rocket racer: a race on a fuel budget {#racer}

{% shot "gm-racer-hull" "The racer at 120 m/s alongside the hull truss. With no drag there is no top speed: the tanks decide how fast a crew can fly the course." %}

The racer is a 2.7 t two-seat rocket that launches off its own dock on top of the spaceport and races through gates of four drone beacons along the hull. There is no air to turn against and no road to grip, so a turn is a burn sideways. Every crew gets the same 2,300 m/s of velocity change, and the cockpit tape shows, live, how much of it the remaining gates and the final stop will cost. {% basis "physics" %}

{% shots "gm-racer-launch" "Launch: the racer pushes up off its table on its belly thrusters and lights the engine 28 m above the deck. The rings are the gates." "gm-racer-cockpit" "From the cockpit, past the bronze canopy bow: speed, the delta-v tape and what you can afford to spend on going faster." "gm-racer-flare" "The red flare at the right was struck with F. Nothing pushes it, so it flies on in a straight line while you turn away." %}

What to try:

- **Fly the sprint.** 12.9 km through the gates in about 100 s. Coast straight and kick hard at each gate; a smooth curve is the most expensive way round a corner.
- **Use the space brake.** X turns the craft round and burns until it is at rest. From 100 m/s that takes 440 m.
- **Go manual.** T drops the 3 g cap and the safety net. Near dry, a free spin about the middle axis turns into a tumble on its own: the {% term "Dzhanibekov effect" %}.

<p class="game-actions"><a class="btn btn--primary" href="/explore/?viewpoint=racer-pit">Fly the racer · 3D</a><a class="btn btn--ghost" href="/science/racing/">Why each turn costs fuel</a></p>

## Concordia shuttle: a 64 m ship by hand {#shuttle}

{% shot "gm-shuttle-flight" "The Concordia shuttle at 250 m/s past the station's domed end. On four engines it pulls 0.42 g, and a full turn takes 33 s." %}

The shuttle is the vehicle that carries passengers to the transfer station in Earth orbit, flown here empty with full tanks. It uses the racer's physics at 155 t, so everything takes longer: 4.5 km to stop from 100 m/s, most of it spent turning round. The HUD marks where you would come to rest if you braked now, and that marker is how you fly it. {% basis "physics" %}

{% shots "gm-shuttle-rail" "The launch rail: a sled on the 14.7 km guideway along the hull throws the shuttle out at 100, 250 or 540 m/s." "gm-shuttle-arrays" "Arrays out. F unfolds the solar arrays and radiators once you are clear of the station." %}

Two ways out:

- **From the dock.** The shuttle backs out of its berth and turns, then hands you the controls on thrusters only. Thread 64 m of ship out of the port at 0.1 m/s², then light the main engines once the plume is clear of the glass.
- **From the rail.** The sled runs the shuttle down the guideway at 1 g and lets go. At 540 m/s you are on the Earth departure line, and coming back costs half your fuel.

<p class="game-actions"><a class="btn btn--primary" href="/explore/?viewpoint=shuttle-a03">Fly from the dock · 3D</a><a class="btn" href="/explore/?viewpoint=shuttle-rail">Launch from the rail</a><a class="btn btn--ghost" href="/science/getting-there/">The real trip to Earth</a></p>

At the dock or the rail, press B to launch. From anywhere in Space mode, B opens the vehicle picker: 1 for the racer, 2 for the shuttle at the dock, 3 for the shuttle on the rail.

## Controls {#controls}

The racer and the shuttle share one layout. The glider flies like a small aircraft. Press ? in the simulation for every key in every mode.

| Key | Glider | Racer and shuttle |
| --- | --- | --- |
| Mouse | look around | point the nose |
| W / S | nose down / up | burn / brake |
| A / D | turn | slide left / right |
| Space / C | power up / down | slide up / down |
| Q / E | rudder | roll |
| Arrows | nose and turn | pitch and yaw |
| Shift | airbrakes, wheel brake | double the turn rate |
| X | | space brake: turn round and stop |
| F | flare | racer: flare; shuttle: arrays |
| R | drop the ball | hold to relaunch |
| T | assisted / manual | assisted / manual |
| Y | cockpit / chase view | cockpit / chase view |
| B | board or stow | launch, or open the picker |

On a phone or tablet the simulation shows a thumb stick and buttons for each vehicle instead.

## How each one works

{% cards discover %}
/science/gliding/ | Flying in a spinning world | Why flying backward fast enough makes your weight disappear, and where a dropped ball really goes. | sci-glider-over-city
/science/racing/ | Racing where there is no air | What a corner costs, why the tanks set the top speed and how the racer is built. | sci-racer-closeup
/science/getting-there/ | Getting there from L5 | The launcher, the five-day fall to Earth orbit and the skyhook that the shuttle hands its passengers to. | sc-shuttle-bay-external
{% endcards %}
