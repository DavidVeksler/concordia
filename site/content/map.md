---
title: "Space station map: a 21 km rotating city"
h1: "Station map"
description: Concordia as a map, with the whole 21 km station from the side, each rotor's city unrolled into a flat plan, the industrial rotor in three bands and a pin for every public view.
lead: A rotor's floor is the inside of a cylinder. Cut it along one street and lay it flat and you get a strip 15.7 km long and 2.5 km wide, and its left and right edges are the same street. This page maps all of Concordia that way, with a pin for every view you can open in the simulation.
nav: map
type: map
schema: CollectionPage
order: 5
related: [/station/, /places/, /scenes/]
---

## The whole station {#side-view}

Concordia is 21 km long. Four city rotors sit aft, Ehricke (the industrial rotor) in the middle, the shipyard and the spaceport forward. Tsiolkovsky (Rotor 1) and Noordung (Rotor 2) turn one way and Bernal (Rotor 3) and O'Neill (Rotor 4) the other, so the pairs cancel each other's angular momentum. Select a rotor to jump to its plan, or a pin to preview a view.

{% map "side" %}

## From drum to map {#unroll}

The plan on the drum wall and the flat map below are the same drawing. Lengths along the floor never change as it unrolls, so a lake keeps its shape and every pin keeps its place. Scroll through the animation or press play.

{% map "unroll" %}

{% deeper "Unrolling a cylinder" %}
A floor point at arc length s from the cut, on a rotor of radius R = 2,500 m, bends with unroll progress t from 0 (the drum) to 1 (flat). The curvature is k = (1 - t) / R.

{% eq %}
x = sin(k s) / k
z = (1 - cos(k s)) / k
{% endeq %}

At t = 1 the curvature is zero and the point sits at (s, 0), so the circumference 2 π R = 15,708 m becomes the width of the map. Up is toward the axis, because gravity points outward: a pin at 625 m stands a quarter of the way in, where the weight is 0.75 g. The stalks in the animation stay perpendicular to the floor all the way down.

A habitation rotor turns once every 100 seconds, in the sense given by its spin pair. The industrial rotor has no floor, so its three gravity bands unroll as three separate cylinders of different radius: the strips come apart, and their different widths are the point.
{% enddeeper %}

## The rotors {#rotors}

Each rotor is generated from its own seed, with 72 to 114 lakes, about 40 districts and 30 to 35 percent of its floor given to parks, lakes and plazas. Pick one. Zoom in to read a single park, and pins close together gather into a count.

{% map "tabs" %}

{% mapsection "rotor-1" %}
Tsiolkovsky was the first rotor to be spun up, and the first residents arrived in 2041. The Arbor Quarter, home of the story family, sits at the left edge of the plan, where the cut runs straight down its main street. The rotor turns retrograde, seen from the spaceport end, and is paired with Noordung through rotating bridges. Parks, lakes and plazas cover 32 percent of its floor.

{% shot "pl-arbor-street" "Tsiolkovsky: the main street of the Arbor Quarter, the street the plan is cut along." %}
{% endmapsection %}

{% mapsection "rotor-2" %}
Noordung turns the same way as Tsiolkovsky and is locked in step with it. Its forward end wall faces Bernal's aft wall across the counter-rotating interface, where the two walls pass each other at about 313 m/s, so no bridge crosses that gap. Its sky runs a 14 hour day, the longest on the station. The Exchange, Charter Hall and the Court stand on its streets: see [the capital quarter](/places/capital-quarter/).

{% shot "sc-rotor2-crowned-towers" "Noordung from 120 m up: copper-crowned towers and spires at arm's length, the megaframe and the far side of the world beyond." %}
{% endmapsection %}

{% mapsection "rotor-3" %}
Bernal turns the opposite way from the first two rotors, prograde seen from the spaceport end, and forms the second spin pair with O'Neill. Its aft wall is the far side of the counter-rotating interface. Its sky runs a 10 hour day, the shortest of the four.

{% shot "sc-rotor3-rooftop-panorama" "Bernal from 120 m up: parkland, lakes and mid-rise blocks, with megaframe towers rising to the sky." %}
{% endmapsection %}

{% mapsection "rotor-4" %}
O'Neill is the forward rotor and the last one built; it reached full spin in 2044. Beyond its forward wall lie the momentum bay and the bearing gallery, where its hub faces the industrial rotor's and the two turn against each other. Its day is 12 hours.

{% shot "sc-rotor4-tower-field" "O'Neill from 120 m up: a field of crowned towers and spires. Same generator as the other rotors, a different seed and a different city." %}
{% endmapsection %}

{% mapsection "industrial" %}
Ehricke is an open lattice in vacuum, not a floor, so it is drawn as three strips, one for each gravity band: 0.35 to 0.45 g in the outer band, 0.2 to 0.3 g in the middle and under 0.15 g in the inner band. Each strip is drawn at its own radius, so they narrow toward the axis. The rotor turns once every 143 seconds, the same way as Tsiolkovsky and Noordung, and most of its volume is left empty on purpose.
{% endmapsection %}

## Off the map {#off-the-map}

A few views sit too far from the drawings to pin: the satellites, the aft power field and the wide shots from cislunar space. They open in the simulation like any other.

{% map "off" %}

## Why these names {#names}

The rotors are named for the people who drew the idea first, in the order they drew it.

- Konstantin Tsiolkovsky wrote about rotating settlements in space in 1903.
- Herman Potočnik, who wrote as Noordung, published a rotating wheel station in *The Problem of Space Travel* in 1929.
- J. D. Bernal proposed the sphere that bears his name in *The World, the Flesh and the Devil*, also in 1929.
- Gerard K. O'Neill published "The Colonization of Space" in *Physics Today* in 1974.
- Krafft Ehricke spent decades studying the industrial development of the Moon.

{% sources %}
- Wikipedia, "Space habitat", history section (Tsiolkovsky 1903, Bernal 1929, O'Neill 1974): https://en.wikipedia.org/wiki/Space_habitat
- Wikipedia, "Herman Potočnik", on *The Problem of Space Travel* (1929) and the Wohnrad: https://en.wikipedia.org/wiki/Herman_Poto%C4%8Dnik
- Wikipedia, "Bernal sphere", first proposed by J. D. Bernal in 1929: https://en.wikipedia.org/wiki/Bernal_sphere
- Gerard K. O'Neill, "The Colonization of Space", *Physics Today* 27(9), 1974: https://physicstoday.aip.org/features/the-colonization-of-space
- Wikipedia, "Krafft Ehricke", on his multi-decade study of the industrial development of the Moon: https://en.wikipedia.org/wiki/Krafft_Ehricke
{% endsources %}
