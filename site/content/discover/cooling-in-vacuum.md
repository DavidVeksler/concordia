---
title: How does a city cool itself in vacuum?
question: How does a city cool itself in vacuum?
discover: true
description: "A city of a million people makes about 40 GW of waste heat, and space has no air to carry it away. Concordia sheds it as light from radiators. See why hotter panels need far less area."
lead: "A city of a million people and its machines make about 40 GW of heat, and space is a thermos with no air to carry it off. The only way out is light, and the hotter the radiator, the less of it you need."
hero: st-radiator-field
order: 5
updated: 2026-10-13
related:
  - /science/power-and-heat/
  - /places/exterior/
---

## Predict

{% predict "You raise a radiator's temperature from 450 K to 500 K and the heat to reject stays the same. Does the panel area you need get smaller or larger?" correct=2 %}
Larger
Smaller
The same
---
Smaller, by about a third. Heat radiated rises with the fourth power of temperature, so 500 K sheds 1.52 times as much per square metre as 450 K, and the area needed falls to 0.66 of what it was.
{% endpredict %}

## Observe

Open the thermal overlay on the whole station. The radiator banks stand off the hull on long masts, so their light has somewhere to go.

{% explore viewpoint="complete-habitat" overlay="thermal" %}

{% shot "sci-radiator-field" "The station with the thermal overlay: eight radiator banks standing off the hull, and the heat they reject." %}

## Explain

In vacuum there is no air to carry heat away and no ground to conduct it into. A hot surface loses energy one way only: by radiating it. Each square metre of a panel at temperature T sheds ε × σ × T⁴ per side, where ε is how well the surface radiates and σ is Stefan's constant. {% basis "physics" %} At 450 K and ε of 0.9, that is 2.1 kW per square metre.

The temperature is a choice. Hotter panels shed more per square metre and need fewer square metres, but the heat has to be carried to them at that temperature. Concordia lifts heat from the 300 K city to the radiators with heat pumps and runs the panels at 380 to 500 K. {% basis "design" %} For 40 GW at 450 K that comes to 19 km² of panel on one side. The scene carries 248 modules of 400 by 200 m, 19.8 km² in all, in eight banks standing off the hull.

The calculator leaves out sunlight on the panels, the work the heat pumps do, and the rotary joints that pass heat out of the spinning rotors. Each of those needs development work before anyone builds it at this scale. {% basis "challenge" %}

{% deeper "The radiator equation" %}
Radiated power per square metre is set by temperature alone.

{% eq %}
flux = ε × σ × T⁴, σ = 5.67 × 10⁻⁸ W/m²/K⁴
450 K, ε 0.9: flux = 2.1 kW/m² per side
area = power / flux = 40 GW / 2.1 kW/m² = 19 km²
area ratio, 500 K against 450 K = (450 / 500)⁴ = 0.66
{% endeq %}

[Power and heat](/science/power-and-heat/) covers where the 40 GW goes and how the heat gets out of a rotor.
{% enddeeper %}

## Change a parameter

Set the temperature to 500 K and watch the area shrink by a third. Then drop it to 380 K and watch it nearly double.

{% widget "radiator-calculator" "A calculator for the radiator area needed to reject a given heat. For 40 GW at 450 K, one side, the area is about 19 km2; at 500 K it is about 12.5 km2." %}
