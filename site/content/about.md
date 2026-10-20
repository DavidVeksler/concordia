---
title: "About Concordia: a speculative space habitat"
h1: "About this site"
description: Concordia is a speculative design built as an interactive simulation. The physics is real, the numbers come from its engineering specification, and the 2045 history is fiction. Credits and licence.
lead: Concordia is a speculative design, built as an interactive simulation. The physics is real, the numbers come from the station's engineering specification, and the 2045 history is fiction.
nav: station
order: 98
updated: 2026-10-16
related:
  - /guide/
  - /glossary/
  - /station/
---

## The one note out of universe

Everything else on this site is written as if Concordia were built and inhabited in 2045. That is the design brief. It is a way to make the engineering concrete: when the station exists, you can ask what it sounds like, what it weighs and what it costs to run. The real science runs underneath. The station's numbers are chosen values from its engineering specification, and the story of how it came to be is invented.

## The model in numbers {#numbers}

Concordia is simulated end to end at full scale, from the aft radiators to the spaceport, with the Earth, Moon and Sun where they would really be. Nothing below is a mock-up: every building is generated, placed and drawn by the simulation you can open from any page.

### What the simulation holds

{% facts %}
{{stat:lengthKm}} km | modelled end to end at full scale
{{stat:rotors}} | rotors, each spinning on its own axis
{{stat:buildings}} | city buildings, generated and placed one by one
{{stat:trees}} | trees in the parks, streets and courtyards
{{stat:metroStations}} | metro stations on the ring and axial lines
{{stat:earthKm}} km | to Earth, and you can fly there
{% endfacts %}

### What you can visit

{% facts %}
{{stat:scenes}} | scenes in the atlas
{{stat:chapters}} | chapters in the {{tourMinutes}}-minute guided tour
{{stat:overlays}} | engineering overlays
{{stat:hotspots}} | labels in the scene that open a page here
{% endfacts %}

Every scene is listed in [the atlas](/scenes/), with a link straight into the simulation.

### What it is built from

{% facts %}
{{stat:tsLines}} | lines of TypeScript in {{stat:tsModules}} modules
{{stat:scriptLines}} | lines of build, asset and test scripts
{{stat:models}} | 3D models, built by {{stat:blenderScripts}} Blender scripts
{{stat:sounds}} | sound clips
{{stat:docWords}} | words of engineering specification and design notes
{{stat:commits}} | commits since the first line of code
{% endfacts %}

The scene runs on Three.js. The models are made in Blender, the sound effects are generated with Woosh from Sony AI, the rooms you see through the residential windows are sixteen images generated with Krea 2 Turbo and lit by the engine, and the launch film is finished in DaVinci Resolve. [The updates page](/updates/) lists every commit.

## What is real and what is styled {#styled}

The station is drawn at full scale: 21 km long, 100 m per scene unit, every street at its modelled width. Where looks or playability beat accuracy, this is the list. Like the note above, it is out of universe.

<!-- facts: section 17 -->

- **Space is compressed.** In the scene Earth is about 590 km away, not 384,400 km, about 650 times closer. Earth, Moon and Sun are shrunk by the same factor, so they keep their real apparent sizes: Earth 1.9 degrees across, Moon and Sun 0.5. The Sun sits 389 lunar distances out, the true ratio.
- **Flight and orbit are not physical.** Exterior speed is capped at 100 km/s (500 km/s with boost far out), and orbit capture is a scripted six second burn, not a simulated trajectory.
- **Story time is compressed.** The 5 day Earth transfer plays in about 15 seconds. The 10 hour fall to Earth keeps the real orbit shape (70,000 km to 400 km) and plays in 24 seconds. The landfall and the lighting on it are chosen.
- **The sky is a display, and its sun is a patch.** A true size sun would give the city 7 lx, so the sky shows an 18 degree glow. One directional light lights the city, and filtering stands in for the soft shadow edge.
- **The stars are not a catalogue.** Both star fields are seeded random points, so the constellations are not real. Exposure adapts as you look, and stars fade toward the Sun.
- **The Sun's surface is illustrative artwork.** Earth and Moon use NASA and Solar System Scope maps.
- **The street crowd is a sample.** About 18,000 to 21,000 pedestrians per rotor walk fixed loops, from four body types. The rooms behind residential windows are sixteen painted images.

## What the basis tags mean {#basis}

Numbers and claims across the site carry a small tag that says what kind of claim they are. This section is out of universe, like the note above. The tags do not hedge the text. They say where each claim comes from, so you can tell a measured fact from a design choice. Turn them off with "Show basis" at the top of any page that has them.

| Tag | What it means |
| --- | --- |
| {% basis "physics" %} | Equations and demonstrated principles, with a real source |
| {% basis "design" %} | A number chosen for Concordia, from the project's specifications |
| {% basis "challenge" %} | Needs development beyond today's demonstrated capability |
| {% basis "fiction" %} | The 2045 setting: history, people and events |

## Author

Concordia is designed and built by [David Veksler](https://davidveksler.com). The source of this site and the issue tracker are public: [concordia on GitHub](https://github.com/DavidVeksler/concordia). Corrections and questions go there as issues.

## Credits and licence

The code is released under the MIT licence. Bundled models, textures, sounds and imagery carry their own licences and are credited on their own pages.

- [Asset credits](/credits.html)
- [Audio credits](/audio-credits.html)
- [Celestial credits](/celestial-credits.html)
