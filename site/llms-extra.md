## The simulation

The simulation at [/explore/]({{origin}}/explore/) runs in the browser (three.js, WebGL). One simulation clock drives every rotor, camera and story move, so motion stays consistent. Any view can be opened by link, for example /explore/?viewpoint=artificial-sky-breakthrough or /explore/?chapter=ascender.

- Story: follow a family from their home through the city, the metro, the ascender, the spine, the shipyard, the spaceport and the launcher, out to cislunar space.
- Explore: free movement anywhere in the station and outside it.
- Engineer: system overlays (gravity, rotational frame, pressure, shielding, thermal, electrical, transportation, material flow, structural, momentum, defence, satellites), rendering quality and live renderer metrics.

Controls: Walk, Fly and Space modes are chosen by where you are (Walk on a rotor floor, Fly elsewhere inside the station, Space outside the hull). WASD moves, Space jumps or climbs, C descends, Shift boosts, V takes off, Z and X roll, H levels the view. Drag to look; the wheel dollies toward the cursor; L toggles pointer-locked mouselook. M opens the atlas with chapter fast travel, viewpoints and the Orbit tab for Earth, the Moon and the Sun. The music note button turns sound on or off.

## Source and licences

- [Site source and issue tracker](https://github.com/DavidVeksler/concordia): the text and images are CC BY 4.0, the site scripts MIT. Report a wrong number or sentence as an issue.
- [Licences](https://github.com/DavidVeksler/concordia/blob/main/LICENSE.md)
- [Credits]({{origin}}/credits.html), [sound credits]({{origin}}/audio-credits.html), [celestial imagery credits]({{origin}}/celestial-credits.html)

## Calculators

- [Orbital compute cost calculator]({{origin}}/research/data-centers-in-space/#calculator): levelized cost of a kW-year of computing on the ground and in orbit, with launch price, radiator temperature, chip life, space-made mass and a terrestrial power ceiling as inputs. Presets: Today (2026), Cheap launch, Concordia era. Full scenario state lives in the URL hash (`#oc.preset=today&oc.launch=500`). Model source: site/js/widgets/orbit-compute-core.mjs; every page number is printed by scripts/analysis/orbit_compute.mjs.
