---
title: Power and heat
description: Concordia draws 20 to 25 GW from solar platforms parked far from the hull, sized toward 40 GW and delivered by HVDC at the aft end. Every watt ends as heat, which radiators shed.
lead: Concordia gets its power from the Sun, through solar platforms kilometres behind the station, and sheds all of it as heat through radiators. In space there is no air or water to carry heat away, so the radiator area sets how much power a city can use.
nav: science
order: 7
updated: 2026-10-10
related:
  - /science/light-and-sky/
  - /science/artificial-gravity/
  - /places/aft-works/
  - /places/exterior/
---

## Power from the Sun

Sunlight at Earth's distance delivers 1,360.8 watts to every square metre facing it. That number, the solar constant, comes from Kopp and Lean's 2011 reassessment of satellite measurements. In cislunar space there are no clouds and no weather, and the intensity barely changes. {% basis "physics" %}

Concordia uses about 20 to 25 GW on average, and its power system is sized toward 40 GW continuous. Solar cells deliver about 340 W per square metre of platform, a quarter of the light that lands on them. To make 40 GW takes about 118 km² of array, which is about 28 platforms of 4.2 km² each. The full build-out is 100 to 150 km² of photovoltaics. {% basis "design" %}

The platforms do not sit on the station. They track the Sun on their own structures, kept at a safe separation, and the farm hub sits about 7 km behind the aft end. The hull carries one small backup collector and nothing more.

{% shot "sci-solar-farm" "Power platform P1 from 4 km, on the sunward side." %}

## HVDC to the aft end

Power arrives at the aft end on four landing masts, each 500 m tall, standing 1,900 m from the axis. Eight tethers carry it from the farm hub. The line is {% term "HVDC" "high-voltage direct current" %}: four bipoles at plus and minus 1.2 MV, each conductor carrying 4.2 kA. At that voltage the line loses about 0.02 percent of the power in resistance. {% basis "design" %}

Behind the masts the spine holds the converter hall, rows of valve halls, breaker bays and capacitor banks that turn the line into the station's own grids.

{% shot "sci-power-landing" "The four landing masts at the aft end." %}

## Starting from nothing

If the solar link ever fails, the station needs a way to restart without it. Fission is the conservative baseline for this {% term "black start" %}. Two reactors stand on masts at the aft rim, 250 MWe each, behind shadow shields. Each makes about 700 MW of heat and rejects 450 MW of it through radiator petals held edge-on to the Sun. They are the lifeboat for the power system, not its main supply. {% basis "challenge" %}

{% shot "sci-reactor-mast" "A black-start reactor on its mast, behind the shadow shield." %}

## Where all the power goes

Almost every watt the station uses becomes {% term "waste heat" %}: lights, motors, computers, kettles, and the body heat of 400,000 people. A station that uses 40 GW must reject about 40 GW. In vacuum, the only way to do it is to glow. A hot surface sheds energy as infrared light, and a {% term "radiator" %} is a large flat panel made to do exactly that.

The {% term "Stefan-Boltzmann law" %} sets the price. Emitted power per square metre rises with the fourth power of temperature, so a hotter radiator needs far less area. At 450 K, typical for the station's banks, one face sheds about 2.1 kW per square metre. For 40 GW that is about 19 km² of panel. {% basis "physics" %} The station carries eight banks, 248 panel modules of 400 by 200 m, close to that figure. {% basis "design" %}

{% diagram "radiator-balance" "Hotter radiators need less area, because power grows with temperature to the fourth power." %}

Radiators run at 380 to 500 K. Heat from homes and farms is low-grade, so heat pumps lift it to a higher temperature before it is rejected, which shrinks the field. The panels turn slowly to keep their edges toward the Sun.

{% shot "sci-radiator-spine" "Under a radiator bank: headers on the panel backs carry hot fluid out from the hubs, and the panels give the heat away as infrared. At 450 K one face sheds about 2.1 kW per square metre." %}

{% explore viewpoint="radiator-field" overlay="thermal" label="Radiator bank, thermal overlay" %} {% explore viewpoint="sat-power-flagship" %} {% explore viewpoint="aft-power-landing" overlay="electrical" label="Power landing, electrical overlay" %}

## Heat out of a spinning city

The hard part is the hand-off. Heat is collected inside rotors that turn once every 100 seconds, and the radiators are stationary. Each rotor gathers its heat locally and passes it through large, redundant rotary fluid joints at its axial hubs into stationary loops. These couplings are the one piece of the thermal system that still counts as a technology-development program. {% basis "challenge" %}

{% shot "sci-radiator-field" "The whole station with the thermal overlay on: radiator banks stand off the hull and reject the heat of everything inside." %}

## Try it

{% widget "radiator-calculator" "Enter a heat load and a radiator temperature to see the panel area needed. The worked example below gives the same result for 40 GW at 380, 450 and 500 K." %}

{% deeper "Worked example: 40 GW at 450 K" basis="physics" %}
The power a surface radiates is

{% eq %}
P = ε × σ × A × T⁴
{% endeq %}

with σ = 5.670374 × 10⁻⁸ W m⁻² K⁻⁴ (the CODATA value), ε the emissivity (0.9 for a good radiator coating) and A the area of one face.

At 450 K: T⁴ = 4.10 × 10¹⁰ K⁴, so a perfect emitter gives σT⁴ = 2,325 W/m². With ε = 0.9 that is 2,093 W/m², or about 2.1 kW/m². The cold sky behind the panel sends back a few millionths of a watt per square metre, which can be ignored.

Area for 40 GW: A = 4 × 10¹⁰ ÷ 2,093 = 1.91 × 10⁷ m², or 19 km².

Raising the temperature by 10 percent raises the emission by 1.1⁴ = 1.46 times, which is why low-grade heat is lifted by heat pumps before it is rejected.

| Temperature | Emitted (ε = 0.9) | Area for 40 GW |
| --- | --- | --- |
| 380 K | 1.06 kW/m² | 38 km² |
| 450 K | 2.09 kW/m² | 19 km² |
| 500 K | 3.19 kW/m² | 12.5 km² |

Solar side: 40 GW ÷ 340 W/m² = 1.18 × 10⁸ m² = 118 km². HVDC side: each bipole carries 2.4 MV × 4.2 kA = 10.1 GW, so four carry 40 GW. Black start: 450 MW rejected at 700 K needs 450 MW ÷ (0.9 × σ × 700⁴) = about 37,000 m² of one-sided panel, and the reactor petals have two faces, so about 18,000 m².
{% enddeeper %}

<!-- facts: section 6 (Power, Thermal and radiators), section 4 (sky heat) -->

{% sources %}
- Greg Kopp and Judith L. Lean, "A new, lower value of total solar irradiance: Evidence and climate significance", Geophysical Research Letters 38, L01706 (2011): [doi.org/10.1029/2010GL045777](https://doi.org/10.1029/2010GL045777).
- NIST, "CODATA Value: Stefan-Boltzmann constant" (2022 values): [physics.nist.gov](https://physics.nist.gov/cgi-bin/cuu/Value?sigma).
- Concordia engineering specification, sections 33 to 37, and the exterior, satellite and aft-end design notes.
{% endsources %}
