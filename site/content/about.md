---
title: "About Concordia: a speculative space habitat"
h1: "About this site"
description: Concordia is a speculative design built as an interactive simulation. The physics is real, the numbers come from its engineering specification, and the 2045 history is fiction. Credits and licence.
lead: Concordia is a speculative design, built as an interactive simulation. The physics is real, the numbers come from the station's engineering specification, and the 2045 history is fiction.
nav: station
order: 98
updated: 2026-10-31
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

The scene runs on Three.js. The models are made in Blender, the sound effects are generated with Woosh from Sony AI, the rooms you see through the residential and shop windows are forty-two images generated with Krea 2 Turbo and lit by the engine, and the launch film is finished in DaVinci Resolve. [The updates page](/updates/) lists every commit.

Five editorial images are image-to-image artistic studies made with ChatGPT Images, using actual Three.js captures as references. Their captions identify the process. The exterior station and shipyard images are unmodified Three.js captures. The city panorama reworks foreground planting and distant detail for its composition.

## How a 21 km station runs in a browser {#performance}

The question we hear most is how the whole station fits in a browser tab. Like the note above, this section is out of universe. The short answer: almost nothing is drawn, downloaded or computed until you can see it, and most of the detail you see is painted by the graphics card instead of stored as geometry. The figures below were measured on the development desktops (an RTX 3060 and a Radeon AI PRO R9700) in October 2026.

<!-- sources: docs/18_qa_performance.md, docs/performance/street-2026-10-25.md, docs/performance/viewpoint-sweep-2026-10-29.md, docs/specs/asset-streaming-spec.md, docs/specs/lean-mode-spec.md, docs/specs/graphics-settings-spec.md -->

### Download only what the next minute needs

- **The first view is under 8 MB over the wire.** The station's models, textures and sounds total about 67 MB, split into fifteen groups. The home and street load first; the rest follow the story two chapters ahead, the place you jump to, or a slow background trickle while nothing else is loading. Loading everything up front used to cost about 75 MB before the first frame.
- **Textures stay compressed on the graphics card.** Every texture with mipmaps ships as KTX2 (Basis Universal), so it is never unpacked to raw pixels. Uncompressed, the same maps would need about 2 GB of video memory.
- **Models are meshopt-compressed, then brotli on top.** The models are served with a content type Cloudflare compresses, which took one hardware kit from 2.56 MB to 1.74 MB.
- **Every file has a byte ceiling.** A git hook refuses a push that makes any model bigger than its budget. Shrink passes then halved normal maps, stripped unused texture coordinates and moved maps to smaller formats; together they took the first-view set from 16 MB to 9 MB on disk. Each swap had to pass a side-by-side image comparison first.

### Draw calls: thousands of things, a few hundred draws

- **Buildings are instances, and the windows are a shader.** Each of the {{stat:buildings}} buildings is a few stretched boxes drawn as instances. Floors, bays, panels and window reveals are generated per pixel from the box's size. Real 3D window frames appear only within about 56 m, shopfronts within about 150 m.
- **The rooms behind the windows are pictures.** One 2 MB atlas of painted rooms is projected into each window as a box with depth. Thousands of lit apartments cost no extra draw calls and no lights.
- **Trees come from pools.** The {{stat:trees}} trees are four species at four levels of detail, kept in one set of instanced meshes per rotor, so the number of draws does not grow with the number of trees in range. Far trees become a 100-triangle crown, then disappear.
- **The crowd is baked into textures.** Each body type is posed once in the browser and its walk and idle frames are written to a texture. After that a pedestrian is one instance and the graphics card animates it. Each person's position is computed from the station clock, so no walker carries state between frames. Of about 20,000 residents per rotor, at most about 2,400 are near enough to draw.
- **Kits draw as batches.** Parks, water, the metro, the farm, the shipyard and the spaceport use batched meshes, so a whole city cell of planting is one draw. Empty batches are hidden; in the spaceport that alone saved 1.5 to 3 ms a frame.

A street view at High quality submits about 800 draw calls and 3.7 million triangles. Across the 107 canonical viewpoints the average is about 425 draws.

### Do not draw what you cannot see

- **Only your rotor exists while you stand in it.** From a street, the other habitation rotors, Ehricke (the industrial rotor), the shipyard, the spaceport and the axial spine are skipped in the colour, shadow and ambient-occlusion passes. In one canyon view in O'Neill, rotor 4, that took the frame from 29.7 ms to 13.6 ms.
- **The city is 144 cells per rotor, each with its own level of detail.** Detailed buildings switch to one box per block between 700 m and 1.6 km, depending on quality, with a margin so they do not flicker at the boundary.
- **Hidden objects skip the scene-graph update.** At a street view about 7,800 of 9,600 scene nodes are hidden. Updating only the visible ones saved 8 to 9 ms a frame.
- **Lights are a pool of eight.** Only four point lights and four spotlights are ever real, given to whichever fixtures are nearest. Lighting that never moves, like the floodlights on the end walls, is computed once into a texture.

### No freezes from shader compiling

A browser compiles a graphics program the first time it draws a new combination of material and lighting, and that can freeze the screen for seconds. The sim compiles in parallel before the first frame, then precompiles every combination the story will reach (with and without shadows, with and without fog) on calm frames in the background. Turning material settings into shader inputs cut the program count from 156 to 110. Before the light pool, one late-loading lamp could freeze a frame for 7.8 seconds; it now costs 17 ms.

### Keep the main thread free

- **The city is planned in a worker.** Up to two background threads generate each rotor's buildings, roads and planting and hand back typed arrays without copying.
- **Building is sliced.** Cells are built in 12 ms slices per frame, more after a jump. Street surfaces build in 2 to 3 ms steps; the worst slice fell from 157 ms to 7 ms.
- **The 8k Earth is decoded off thread and uploaded in sixteen strips.** Decoding left the main thread at about 20 ms instead of 220 to 330 ms. The 8k map loads only on High or Ultra, and only while Earth is close.
- **Motion is a function of time.** Rotor angles, trains, trams and pedestrians are all computed from one clock (angle equals spin rate times time), never added up frame by frame, so nothing drifts and a skipped frame costs nothing.

### Scale and depth

One scene unit is 100 m, and Earth sits about 590 km away in the scene. A camera that sees a doorknob 10 cm away and Earth in the same frame needs depth precision that the default depth buffer cannot give. The sim uses a reversed floating-point depth buffer where the browser supports it, and logarithmic depth where it does not.

### Quality that adjusts itself

Graphics start on Auto. Auto watches the median frame time, ignores one-off stalls, and gives up detail before resolution: seven steps from Low at half resolution to Ultra at full. It waits 8 seconds before stepping down and 45 before stepping up. If three steps down did not help, it undoes them, because the bottleneck was not the graphics card. Ambient occlusion runs at half resolution, which took it from 3.3 ms to 1.3 ms on the Ultra street. On the RTX 3060, Auto now holds a 1080p street at Ultra at about 47 fps; before these passes it settled at Low.

### Phones

On a touch-only device a lean mode starts on its own. It caps textures at 1024 pixels, builds the sky hardware of each rotor only when you first see it, and stops the background trickle. That cut the memory held after entering from 1.36 GB to 0.91 GB.

### How it is measured, and what did not work

Every check runs on a real graphics card; the test harness refuses software rendering. A sweep times all 107 viewpoints, and each optimization ships behind a URL switch so its before and after can be compared on the same machine. Plenty of ideas failed that test and were dropped: redrawing shadows every other frame (geometry slid out of its shadow), splitting the sky hardware into spatial tiles (draws rose from 422 to 658), simplifying sky frame meshes (0.9 percent fewer triangles, a bigger file), and holding the frame while a jump compiles (the jump got slower).

## What is real and what is styled {#styled}

The station is drawn at full scale: 21 km long, 100 m per scene unit, every street at its modelled width. Where looks or playability beat accuracy, this is the list. Like the note above, it is out of universe.

<!-- facts: section 17 -->

- **Space is compressed.** In the scene Earth is about 590 km away, not 384,400 km, about 650 times closer. Earth, Moon and Sun are shrunk by the same factor, so they keep their real apparent sizes: Earth 1.9 degrees across, Moon and Sun 0.5. The Sun sits 389 lunar distances out, the true ratio.
- **Flight and orbit are not physical.** Exterior speed is capped at 100 km/s (500 km/s with boost far out), and orbit capture is a scripted six second burn, not a simulated trajectory.
- **Story time is compressed.** The 5 day Earth transfer plays in about 15 seconds. The 10 hour fall to Earth keeps the real orbit shape (70,000 km to 400 km) and plays in 24 seconds. The landfall and the lighting on it are chosen.
- **The sky is a display, and its sun is a patch.** A true size sun would give the city 7 lx, so the sky shows an 18 degree glow. One directional light lights the city, and filtering stands in for the soft shadow edge.
- **The stars are not a catalogue.** Both star fields are seeded random points, so the constellations are not real. Exposure adapts as you look, and stars fade toward the Sun.
- **The Sun's surface is illustrative artwork.** Earth and Moon use NASA and Solar System Scope maps.
- **The street crowd is a sample.** About 18,000 to 21,000 pedestrians per rotor walk fixed loops, from four body types. The rooms behind residential and shop windows are forty-two painted images.

## What the basis tags mean {#basis}

Numbers and claims across the site carry a small tag that says what kind of claim they are. This section is out of universe, like the note above. The tags do not hedge the text. They say where each claim comes from, so you can tell a measured fact from a design choice. Turn them off with "Show basis" at the top of any page that has them.

| Tag | What it means |
| --- | --- |
| {% basis "physics" %} | Equations and demonstrated principles, with a real source |
| {% basis "design" %} | A number chosen for Concordia, from the project's specifications |
| {% basis "challenge" %} | Needs development beyond today's demonstrated capability |
| {% basis "fiction" %} | The 2045 setting: history, people and events |
| {% basis "law" %} | Real treaties, statutes and court decisions in force in 2026, with a source |

## Author

Concordia is designed and built by [David Veksler](https://davidveksler.com). The source of this site and the issue tracker are public: [concordia on GitHub](https://github.com/DavidVeksler/concordia). Corrections and questions go there as issues.

## Credits and licence

The code is released under the MIT licence. Bundled models, textures, sounds and imagery carry their own licences and are credited on their own pages.

- [Asset credits](/credits.html)
- [Audio credits](/audio-credits.html)
- [Celestial credits](/celestial-credits.html)
