---
title: Light and the artificial sky
description: Concordia has no giant windows. Its blue sky is a lit ceiling of panels 450 m up, bright enough for daylight at street level, running different day lengths in each rotor for 2.2 GW.
lead: Concordia has no big windows. The sky is a ceiling of light panels hung 450 m above the ground, and it is bright enough that the street below sits in daylight. Each rotor runs its own clock, its own weather and its own length of day.
nav: science
order: 6
updated: 2026-10-10
related:
  - /science/artificial-gravity/
  - /science/power-and-heat/
  - /places/ascenders-and-sky/
---

## Why there are no windows

The hull is thick on purpose. Its outer layers are regolith and slag cassettes, because that mass is what stops radiation and debris. A window big enough to light a city would be a hole in that shield. It would also face a Sun that sweeps around the rotor once every 100 seconds, flashing across the floor instead of lighting it. {% basis "physics" %}

So the shell stays opaque, and the city is lit from inside. The {% term "artificial sky" %} hangs about 450 m above the ground, give or take 100 m, as a light, segmented, replaceable structure. It is not a pressure boundary: the air above it is the same air as below. At that height your {% term "apparent weight" %} is about 82 percent of what it is on the ground.

{% shot "sci-sky-noon" "Noon under the sky of Tsiolkovsky (Rotor 1)." %}

## A ceiling that glows

From the street, the sky looks like a plain blue sky. From above it is a membrane of 8 m cassettes with a light emitter every 25 mm, about 51 billion emitters per rotor, over 31.8 km² of surface. It is a display, not a mirror and not a window, so the operators choose the colour, brightness and time of day. {% basis "challenge" %}

{% facts %}
900 cd/m² | average sky brightness | design
3,000 lx | light on the ground | design
31.8 km² | glowing membrane per rotor | design
2.2 GW | average power, all four rotors | design
{% endfacts %}

3,000 lux is bright, and it is meant to be. An overcast day is about 1,000 lux outdoors and full daylight in the shade about 10,000. Good office lighting is 500. {% basis "physics" %} Your street sits between the two outdoor figures, with a sky that is brightest at the horizon (about 1,300 cd/m²) and dimmer overhead (about 700).

The Sun is the hard part. A true-size Sun, half a degree wide, drawn at the membrane's brightness would add only 7 lux. So the sun is a broad patch instead: 18 degrees wide and 143 m across on the membrane. It reads as the Sun. {% basis "design" %}

{% shots "sci-park-noon" "The same lawn at noon. The sky is a display, so the operators choose its colour and brightness." "sci-sky-evening" "And in the evening. Nothing in the park moved: only the light from the ceiling changed." %}

{% explore viewpoint="artificial-sky-breakthrough" %} {% explore viewpoint="residential-street" %} {% explore chapter="ascender" label="Ride up through the sky" %}

## Days, weather and the clock

Each rotor runs its own local clock, offset 6 hours from its neighbours. Daylight lasts 12 hours in Tsiolkovsky, 14 in Noordung, 10 in Bernal and 12 in O'Neill, so a long summer-like day and a short winter-like one are always somewhere on the station. The station clock itself keeps a 24 hour day of 86,400 seconds. {% basis "fiction" %}

The sky has five weather types: clear, fair-weather cumulus, broken cloud, overcast and hazy cirrus. There is no rain. Clouds are drawn on the membrane. Along a street the sky is visible only above about 35 degrees of elevation, because buildings fill the rest.

{% shot "sci-sky-from-above" "The other side of the sky: process vaults and grow galleries above the opaque backing." %}

## What it costs

At noon one rotor's sky draws 1.5 GW. Because the four rotors run their days 6 hours apart, the total averages 2.2 GW and never goes above 2.6 GW. All of it ends as heat, and the sky's share is rejected by about 1.2 km² of radiator at 450 K (see [power and heat](/science/power-and-heat/)). Against a station built for 20 to 25 GW of average demand at first, lighting a world is about a tenth of its power. {% basis "design" %}

Four apertures, each about 154 by 210 m, pass the ascender towers through the membrane. That is where you break through the sky and see the machinery behind it.

{% deeper "Where the numbers come from" basis="physics" %}
One rotor's membrane is 31.8 km², and 1.5 GW over that area is 47 W/m² of electrical input. The emitters are 25 mm apart, so 31.8 × 10⁶ m² ÷ (0.025 m)² = 5.1 × 10¹⁰ of them.

A uniform ceiling of brightness L that fills the whole hemisphere overhead lights the floor to π × L. With the 900 cd/m² average that is about 2,800 lx, the same as the 3,000 lx design value for open ground.

Overall efficiency is the light delivered divided by the power drawn. The ground is 38.8 km² and gets 3,000 lx, so it receives 3,000 × 38.8 × 10⁶ = 1.16 × 10¹¹ lm. At 1.5 GW that is 78 lm/W for the whole system, panel to ground.

| Item | Value |
| --- | --- |
| Sky altitude | 450 m (350 to 550 m) |
| Mean luminance | 900 cd/m² |
| Zenith / horizon | 700 / 1,300 cd/m² |
| Ground illuminance | about 3,000 lx |
| Power per rotor at noon | 1.5 GW |
| Four rotors, 6 h apart | 2.2 GW average, 2.6 GW peak |
| Sun patch | 18 degrees, 143 m |
{% enddeeper %}

<!-- facts: section 4 (Windows and the artificial sky), section 5 -->

{% sources %}
- Engineering ToolBox, "Illuminance: Recommended Light Levels" (2004, updated): office 500 lx, overcast day about 1,075 lx, full daylight about 10,750 lx. [engineeringtoolbox.com](https://www.engineeringtoolbox.com/light-level-rooms-d_708.html)
- Concordia engineering specification, section 20, and the artificial-sky design note: sky altitude, emitter pitch, luminance, power and day lengths.
{% endsources %}

{% shot "sc-artificial-sky-breakthrough" "One of the four apertures in the membrane, where an ascender tower passes through. Above the glow you see the trusses and stay cables that hold the sky up." %}
