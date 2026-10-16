---
title: Upper-habitat freight system study
crumb: Freight system
description: "A trade study of how cargo moves inside Concordia's rotors: rails, sealed shafts, cables and tugs compared on energy, Coriolis physics, failure and safety. Open for outside review."
lead: "How should freight move through the upper volume of a spinning city? The obvious answer, cargo hanging on cables inward of a rail, fails on rotating-frame physics. Rails on the existing frame, sealed paired shafts through the sky and short cable drops at the ends work. This is a design review draft, open for feedback."
nav: science
order: 51
updated: 2026-10-15
schema: TechArticle
related:
  - /research/
  - /science/artificial-gravity/
  - /science/moving-around/
---

{% callout "Draft for review" %}
This is a research draft, not canon, and it changes nothing in the simulation. Every number comes from [a script you can run](https://github.com/DavidVeksler/concordia/blob/main/scripts/analysis/freight_trade_study.py). To report an error or suggest a source, open an [issue on GitHub](https://github.com/DavidVeksler/concordia/issues/new/choose) naming the section.
{% endcallout %}

Evidence tags used throughout: **[E]** established physics, **[X]** engineering extrapolation from existing industrial practice, **[S]** speculative future technology, **[F]** fictional design choice for Concordia.

Consistency base (read from the repo, not redesigned): rotor radius 2,500 m, spin 0.0626 rad/s (100.4 s, 1.0 g at the floor) [physics.ts]; artificial sky about 450 m up (R = 2,050 m, 0.82 g), a non-pressure lightweight membrane hung from the structure, with pier penetrations ringed by a 49 m girdle and four ascender apertures [docs/13, 29]; megaframe piers 45 m wide to 625 m, then 28 m to 1,000 m, then 15 m to 1,500 m, each with an 8 m riser shaft; ring beams at 625, 1,000 and 1,500 m (R = 1,875 / 1,500 / 1,000) as 22 m box trusses with a 12 m maintenance gallery deck; axial girders on 654.5 m by 480 m bays; design pier load 2 GN, whole frame about 6 Mt per rotor [docs/25]; ascender towers to a hub at R = 140 m that de-spins into the stationary 120 m spine [docs/21, spec 23, 24]; the existing farm already moves freight pods on a rail deck at R = 1,500 m [docs/31]; rotor angular momentum about 1.2e17 N m s.

---

## 1. Executive recommendation

**Verdict on the hypothesis.** Rails, carriages and regenerative drives beat continuously powered free flight by a wide margin (section 5: 26x to 141x less electricity on horizontal routes, 4x to 8x on radial routes). But the specific proposal "cargo hangs on cables inward of its track, in the low-g zone" fails on physics, and a long roped radial hoist has a Coriolis problem that Earth elevators never meet. The recommended system keeps the useful half of the hypothesis and replaces the rest.

**Recommended architecture: a three-layer hybrid ("Grid, Shaft, Last Metre").**

1. **Horizontal layer: guided carriages on a rail grid built into the existing megaframe.** Rails run on the ring-beam gallery decks at R = 1,875 m (625 m level, freight level F1) and R = 1,500 m (1,000 m level, F2), and on the axial girders between them. The carriage rides on the rail (load above or beside the wheels, never inboard on a cable), and is driven by onboard motors with regeneration. This is the established-technology part of the system.
2. **Vertical layer: sealed, paired, rail-guided freight shafts inside selected piers.** They carry cargo between the upper volume and the floor through a closed pier sleeve that crosses the sky at the pier girdle, so freight never passes the sky through an open aperture. Cars are paired on one rope loop for balance, with intermediate rope guides (Coriolis bow), overspeed governors and progressive safety gear on rail. A rack-and-pinion or linear-motor self-climbing car is the alternative for 50 t modules and for any span longer than about 500 m.
3. **Last-metre layer: short suspended or tethered devices, used only at the end of a shaft or rail.** Cable robots and gantries inside halls and depots, and battery drones for loads of 100 kg or less. Free-flying heavy tugs are demoted to emergency and construction roles.

Cable suspension survives in one place: **short outboard drops (about 20 to 100 m) from a rail carriage to a platform below it**, where weight and tension are well understood. Winches are for those drops and for the shaft rope loop, not for a general-purpose "cargo cloud".

{% shot "fr-shaft-tower" "The nearest thing the simulation builds to a freight shaft: cabins on parallel guided tracks inside a pier lattice. The study pairs freight cars so one rises as the other descends, and they pass near R = 1,750 m." %}

**Why this and not the original:**

- A cable can only pull toward its anchor. Cargo is held by a cable only when it sits **outboard** (higher radius, heavier) than the anchor. A load "inward of its supporting track" would need compression members (a post), not a cable. Suspension therefore never lowers apparent weight; it raises it (section 2.1). Low apparent weight comes only from where the cargo is, and a track at R_t holds cargo at R_t or higher, so it always feels at least the track's gravity.
- Structure is not the constraint. A 50 t module at 0.75 g is 0.37 MN, which is 0.02 % of a pier's 2 GN design load and about 0.05 % of one developed 1e8 kg slot. The megaframe absorbs rails and carriages as a rounding error. Interference, fatigue, fire containment and sky protection are the real design drivers.
- Energy is dominated by one number, the centrifugal potential, and it is modest: **3.27 kWh per tonne** between R = 500 m and the floor (section 4). Lifting a tonne 2,000 m on Earth costs 5.45 kWh. Horizontal moves cost 0.02 to 0.2 kWh per tonne-kilometre.
- The binding hazards are kinetic. A released 10 t container releases 118 MJ (28 kg TNT equivalent) over a full-depth drop (section 6), and it does not "fall" radially: it flies on a tangent and lands up to 158 degrees (about 6.9 km) away. That is why the sky crossing must be a closed shaft with a catch, and why passive reliance on drag is rejected (terminal speeds of 60 to 173 m/s).

Three results that would be surprising to a terrestrial engineer, all validated numerically:

1. **Sway frequency is set by gravity at the pivot, not at the load.** A cable of length L hung outboard of a pivot at radius r_a swings at w = W sqrt(r_a / L), not sqrt(g_load / L). Inertial-frame simulation matches to 0.02 %; the naive formula is off by 3 % to 12 % for hangs of 100 to 500 m at R = 2,050 m and by up to a factor of two for 1.5 km hangs from low radii.
2. **A circumferential move changes apparent weight by (1 + v / (W r))^2.** At 20 m/s prograde on R = 1,875 m cargo weighs 1.37 times as much; retrograde 0.69 times.
3. **A hoist rope bows sideways from Coriolis force.** A 10 t car at 4 m/s over a 1,000 m span bows the rope 5.2 m; an 8 m riser shaft cannot hold that, so spans between rope guides must be 300 to 500 m (0.6 to 1.5 m of bow).

---

## 2. Physics model

All symbols: W = 0.0626 rad/s, r radius from the axis, g(r) = W² r, m cargo mass, v speed relative to the rotor (rotating frame), subscript r radial. Atmosphere is co-rotating, isothermal at 20 °C, so density follows rho(r) = rho0 exp(W² (r² - R²) / 2 R_gas T), which is 0.87 rho0 at R = 500 m and 0.95 rho0 at the sky: **drag is nearly uniform through the upper volume.**

### 2.1 Force environment [E]

| r (m) | Height above floor | g (m/s²) | g/g0 | rho/rho0 | Tangential speed | Coriolis lean per 1 m/s radial |
| --- | --- | --- | --- | --- | --- | --- |
| 70 | 2,430 | 0.274 | 0.028 | 0.865 | 4.4 m/s | 24.5° |
| 140 (hub skin) | 2,360 | 0.549 | 0.056 | 0.865 | 8.8 | 12.9° |
| 500 | 2,000 | 1.959 | 0.200 | 0.870 | 31.3 | 3.66° |
| 1,000 (ring 3) | 1,500 | 3.919 | 0.400 | 0.885 | 62.6 | 1.83° |
| 1,500 (ring 2) | 1,000 | 5.878 | 0.599 | 0.911 | 93.9 | 1.22° |
| 1,875 (ring 1) | 625 | 7.348 | 0.749 | 0.938 | 117.4 | 0.98° |
| 2,050 (sky) | 450 | 8.033 | 0.819 | 0.953 | 128.3 | 0.89° |
| 2,500 (floor) | 0 | 9.797 | 0.999 | 1.000 | 156.5 | 0.73° |

**Low weight is not low mass.** Weight scales with g(r); inertia does not. A 1 t pallet at R = 500 m weighs 1.96 kN but still needs 1 kN to accelerate at 1 m/s², and feels the same Coriolis acceleration 2Wv = 0.125 m/s² per m/s of radial speed as it would anywhere. Lateral forces during acceleration, swing and impact scale with m, not with g. So lower g cuts rolling loss, lift power and structural dead load, but does not cut collision energy, side loads or braking forces that are inertial.

**Cargo hangs outboard (key correction).** In the rotating frame the net body force on cargo points away from the axis. A cable can only transmit tension, so it must run from the load to an anchor at lower radius (inward of the load). Equivalent to hanging a weight below a ceiling. Thus cable-suspended cargo is always at larger radius than its anchor, and its apparent weight is larger than at the anchor. Cable-hung loads in the 0.2 g zone must be anchored at an even lower radius, near the axis. A load located inboard of the track requires a rigid mast or platform in compression.

**Circumferential motion changes weight.** Cargo moving at v around the ring (+ with rotation) has inertial speed W r + v and needs centripetal acceleration (W r + v)² / r. Apparent weight multiplier (1 + v / (W r))²:

| v | R = 1,875 prograde / retrograde | R = 2,050 prograde / retrograde |
| --- | --- | --- |
| 5 m/s | 1.087 / 0.917 | 1.079 / 0.924 |
| 10 m/s | 1.178 / 0.837 | 1.162 / 0.850 |
| 20 m/s | 1.370 / 0.688 | 1.336 / 0.713 |
| 40 m/s | 1.798 / 0.435 | 1.721 / 0.474 |

Retrograde at W r = 117.4 m/s (R = 1,875 m) the cargo is inertially stationary and weightless. Rails and cranes must be rated for the prograde case, and the sign differs between the two counter-rotating pairs (Tsiolkovsky and Noordung against Bernal and O'Neill).

### 2.2 Cable tension [E, X for rope data]

Cargo tension T = m g(r_load) plus cable self-weight, which integrates to lambda W² (r2² - r1²) / 2. A steel cable at one fifth of 1,770 MPa has taper ratio exp(W² (r2² - r1²) / 2 / (sigma/rho)) = 1.19 from R = 500 to 2,050 m, so **cable strength is not the limiting issue for a long span, dynamics are.** Sizing (6x36 grade 1770 rope, design factor 8 with one of four ropes lost; the formula used is conservative by about 8 % against a vendor figure of about 100 kN for a 12 mm 6x36WS rope):

| Cargo | Anchor / load radius | T at load (kN) | Rope diameter (mm) | Rope (kg/m, 4 ropes) | Self-weight add (kN) | T at anchor (kN) |
| --- | --- | --- | --- | --- | --- | --- |
| 100 kg | 2,050 / 2,150 | 0.8 | 2.0 | 0.07 | 0.1 | 0.9 |
| 1 t | 2,050 / 2,150 | 8.4 | 6.2 | 0.68 | 0.6 | 9.0 |
| 1 t | 500 / 2,000 | 7.8 | 6.0 | 0.63 | 4.6 | 12.5 |
| 10 t | 2,050 / 2,150 | 84.3 | 19.6 | 6.8 | 5.6 | 89.8 |
| 10 t | 500 / 2,000 | 78.4 | 18.9 | 6.3 | 46.3 | 124.6 |
| 50 t | 2,050 / 2,150 | 421 | 43.9 | 33.9 | 27.9 | 449 |
| 50 t | 500 / 2,000 | 392 | 42.3 | 31.5 | 231 | 623 |

### 2.3 Sway dynamics [E, validated]

Pendulum of length L hung outboard from a pivot fixed in the rotating frame at radius r_a, angle phi from the radial. The inertial-frame Lagrangian is

L = ½ m L² phidot² + m W (r_a L cos phi + L²) phidot + m W² r_a L cos phi + const,

and the Coriolis cross terms cancel, leaving **phi'' = -(W² r_a / L) sin phi**, so w_p = W sqrt(r_a / L). The earlier intuition (T times y/L with T = m W² r_load) is wrong because it omits the inertial coupling.

**Independent validation.** A Cartesian inertial-frame simulation (pivot moving on a circle, stiff spring rope, RK4, no rotating-frame equation used):

| r_a (m) | L (m) | Analytic period (s) | Simulated (s) | Error | Naive (g at load) |
| --- | --- | --- | --- | --- | --- |
| 2,050 | 100 | 22.17 | 22.17 | 0.02 % | 21.65 |
| 2,050 | 500 | 49.57 | 49.58 | 0.02 % | 44.44 |
| 500 | 300 | 77.75 | 77.76 | 0.02 % | 61.46 |

Selected sway periods (s) for the pivot at r_a: R = 2,050: L = 10 m 7.0, 100 m 22.2, 500 m 49.6, 1,500 m 85.9. R = 1,500: 8.2, 25.9, 57.9, 100.4. R = 500: 14.2, 44.9, 100.4 (at L = 500), 173.8 (at L = 1,500). A 1.5 km cable hung from R = 500 m swings slower than the rotor turns.

Consequences:

- **Anti-sway is needed at every length.** Industrial crane input shaping (ZV, ZVD, UMZV shapers, 1 t to 10 t cranes, 65 to 88 % sway reduction in published trials) is directly applicable once the pendulum frequency is set from r_a, not g_load. Shaper and feedback design is established practice [X].
- **Variable-length pendulum.** L phi'' + 2 L' phi' + W² r_a phi = 0. Paying out (L' > 0) damps; reeling in (L' < 0) pumps energy into the sway. Hoisting is the risky direction, as on Earth. Avoid modulating length at twice the sway frequency (for L = 100 m at R = 2,050 m that is a period of about 11 s).
- **Coriolis lean on a freely hanging load** moved radially at v: tan(alpha) = 2v / (W r):

| r (m) | 0.5 m/s | 1 m/s | 2 m/s | 5 m/s | 10 m/s |
| --- | --- | --- | --- | --- | --- |
| 500 | 1.8° | 3.7° | 7.3° | 17.7° | 32.6° |
| 1,500 | 0.6° | 1.2° | 2.4° | 6.1° | 12.0° |
| 2,050 | 0.4° | 0.9° | 1.8° | 4.5° | 8.9° |

Radial speed on an unguided cable is therefore limited to about 1 to 2 m/s. At 10 m/s in the 0.2 g zone the load leans 33 degrees. This is why radial freight needs rails.

- **A swivel gives yaw freedom only.** It removes torque transmission about the cable axis and does nothing for pendulum or Coriolis modes. A freight hook needs: yaw swivel (1 DOF), pendulum damping (active, by trolley motion or by a two-cable "bridle" that constrains tilt), mechanical stop at the hoist limit, and a positive latch, not friction, on the load.

### 2.4 Energy and angular momentum [E]

**Rotating-frame bookkeeping (what the machine sees).** Moving cargo radially in the rotating frame, with Coriolis force doing no work, the work is the centrifugal potential change: **W_ideal = ½ m W² (r_in² - r_out²)** to move inward, recovered moving outward. 

**Inertial-frame bookkeeping (what the rotor sees).** A body moving from r1 to r2 changes angular momentum by m W (r2² - r1²). The rotor supplies it as a torque through the guideway (the Coriolis side force). The rotor's energy cost is W x delta L = m W² (r2² - r1²), exactly twice the potential. Half becomes the cargo's inertial kinetic energy, half is recoverable at the winch. Check: 1 t from R = 500 to 2,500 m, rotor gives 6.53 kWh, winch can recover 3.27 kWh, cargo gains 3.27 kWh of rotating-frame-invisible kinetic energy.

**Energy per unit cargo, full height (R = 500 to 2,500 m):** 3.27 kWh/t. For comparison the same tonne lifted 2,000 m on Earth is 5.45 kWh. **Rotor ledger.** 1 t lowered 500 to 2,500 m takes 3.76e8 N m s from the rotor, 3.2e-9 of its angular momentum. For a 50 t module that is 1.6e-7. A sustained net flow of 1 Mt/yr to the floor changes the rotor by 0.32 % per year, which the counter-rotating pair and momentum rings absorb (docs/15). The freight system must therefore report its net radial mass flow to the ledger (section 7).

**Circumferential and axial moves.** Moving along the rotating frame at v needs only ½ m v² plus friction. The big inertial term m W r v is paid by the rotor through the wheel-rail reaction, and returns when braking. Net electricity is therefore small (section 4). Axial motion has zero Coriolis force because the velocity is parallel to the rotation axis.

### 2.5 Atmosphere and drag [E, X]

Frontal areas and drag coefficients used: 100 kg tool 0.3 m² x Cd 1.0; 1 t pallet 1.8 m² x 1.1; 10 t container 6.3 m² x 1.1; 50 t module 15 m² x 1.2. At 15 m/s a 10 t container sees 0.85 kN of drag (12.7 kW), which is minor. Terminal speed of a falling container in the upper volume is **124 m/s at R = 1,500 m for 10 t**, 173 m/s for 50 t, 60 m/s for a 100 kg tool. Drag does not stop a fall; it only caps the speed at a lethal value.

---

## 3. Structural topology

### 3.1 Attachment options

| Option | Load path | Verdict |
| --- | --- | --- |
| Directly on the primary pressure shell | Shell membrane, bands, endcaps | **Reject.** The shell carries pressure and band tension; point loads and fatigue from rails are out of scale and out of maintenance reach. |
| On the artificial sky framework | Sky hoops and stringers, cables to pier saddles | **Reject for load.** The sky is a lightweight, replaceable emitter membrane hung from the structure "never the other way" (docs/13). Allow only light inspection crawlers already on its rails. |
| Dedicated radial/axial freight trusses | New members to ring beams and piers | Credible but duplicates structure that exists. Use only for oversize (50 t) or short special spurs. |
| **Ring-beam gallery decks and axial girders at F1/F2** | Gallery deck into the 22 m box truss, chords, node, pier lattice to floor | **Prefer.** Steel on a deep truss, already a walkable maintenance gallery 12 m wide, nodes every 489 m. The load path is the plate-level path the frame already carries. |
| Multi-level networks | As above at 625, 1,000, 1,500 m | Prefer: F1 at R = 1,875 m (0.75 g, shortest drop to the sky), F2 at R = 1,500 m (0.6 g, farm and industry). F3 (R = 1,000 m) only where demand justifies. |
| Corridor near the axis (R about 100 to 500 m) | Ascender towers, hub, spine | Valuable for interface with the spine, not for local delivery: longitudinal energy is already negligible at any radius (section 4, B). Rolling loss would drop 3.7x at 0.2 g, from 0.43 to about 0.12 kWh for 10 t over 2.5 km. Not worth a dedicated corridor. |
| Rails plus limited robotic tugs | Hybrid | Prefer, as layer 3. |

**Load budget.** The frame designs for 1e8 kg per developed 625 m slot at 0.75 g (about 735 MN). One 50 t module is 0.37 MN. Even a 20-carriage convoy of 50 t modules on one ring-beam span is under 1 % of a slot's load. What needs study is **fatigue** (a carriage crossing 489 m spans many times a day for centuries), **moving-load dynamics** (a 50 t mass at 5 m/s against the truss modes) and **thermal expansion** at rail joints, not strength.

{% shot "fr-megaframe-grid" "The frame the rails would ride on: ring beams and axial girders cross the mid levels, with a service facility and its truss gallery. Freight rails and carriages are not modelled; this is the structure that would carry them." %}

### 3.2 Can a suspended carriage reach everywhere?

No, and it should not need to. A carriage hung from a rail reaches only the volume outboard of the rail down to the next structural level, because the next ring beam and girder at a different radius occupy the same cells. Moving the rail inward does not reach inboard cargo with a cable; it reaches only outboard cargo. The 654.5 x 480 m bays are open at the middle but the piers, the ascender towers, the farm hall (X -170 to 118, 96 m high on the 1,000 m ring beam) and the link bridge occupy fixed places. The workable pattern is **rail-to-dock**: every producer or consumer is a facility with a dock on a rail or shaft, and last-metre devices (layer 3) move cargo from the dock only. This matches the farm design, which already has a freight dock and pods on a rail.

---

## 4. Energy analysis

Assumptions [X]: motoring efficiency eta_D = 0.90, regeneration to storage eta_G = 0.85, rolling resistance coefficient 0.003 (steel wheel on rail, typical range 0.001 to 0.005), acceleration 0.3 m/s² (0.15 for 50 t), speeds in the first column of each table. Peak power is traction power at the drive. Guide-wheel friction on the Coriolis side load is 1 %. Regeneration figures from vendors are 20 to 40 % of total energy for elevators in buildings; the efficiency pair used here is the physical return on the potential only.

**A. Circumferential, R = 1,875 m, 11.8 km, prograde (worst case)**

| Cargo | v (m/s) | Time | Losses | Net electric | Peak power | Side force |
| --- | --- | --- | --- | --- | --- | --- |
| 100 kg | 20 | 656 s | 0.23 kWh | 0.26 kWh | 2.2 kW | 0.25 kN |
| 1 t | 15 | 835 s | 0.92 | 1.03 | 9.6 kW | 1.9 kN |
| 10 t | 10 | 1,211 s | 2.13 | 2.40 | 40 kW | 12.5 kN |
| 50 t | 5 | 2,390 s | 4.75 | 5.33 | 49 kW | 31 kN |

**B. Longitudinal, R = 1,875 m, 2.5 km** (no Coriolis force)

| Cargo | Time | Net electric | Peak |
| --- | --- | --- | --- |
| 100 kg | 192 s | 0.055 kWh | 2.2 kW |
| 1 t | 217 s | 0.219 | 9.6 kW |
| 10 t | 283 s | 0.508 | 40 kW |
| 50 t | 533 s | 1.09 | 49 kW |

**C. Radial, R = 500 m to the sky (R = 2,050 m), guided, outward then return**

| Cargo | v_r | Time | Potential (kWh) | Net electric out (negative = regenerated) | Net electric back (lift) | Peak | Side force |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 100 kg | 5 | 327 s | 0.215 | -0.18 | +0.24 | 4.6 kW | 0.06 kN |
| 1 t | 5 | 327 s | 2.15 | -1.82 | +2.41 | 46 kW | 0.63 kN |
| 10 t | 4 | 401 s | 21.5 | -18.2 | +24.0 | 370 kW | 5.0 kN |
| 50 t | 2 | 788 s | 107.6 | -91.4 | +119.6 | 909 kW | 12.5 kN |

**D. Upper volume to the floor through the sky**

| Route | 1 t | 10 t | 50 t | Time (10 t) |
| --- | --- | --- | --- | --- |
| D1: R = 1,500 to 2,500 (farm ring to floor) | -1.84 kWh | -18.5 | -92.5 | 263 s |
| D2: R = 500 to 2,500 (full height) | -2.76 | -27.7 | -138.7 | 513 s |

Peak regenerative power at the brake: 56 kW (1 t), 449 kW (10 t), 1.1 MW (50 t). **That brake must exist even if the grid cannot accept the power**: size a resistor bank and a flywheel or battery for 1.1 MW for 8.5 min per 50 t descent. Without regeneration the heat is 164 kWh per 50 t descent from R = 500 to 2,500 m (about 580 kW averaged over the 17-minute trip), a thermal design item rather than a catastrophe.

**E. Rotating habitat to the stationary spine** (R = 500 to 140 m inward, then the hub de-spin to zero tangential speed)

| Cargo | Time | Potential | Net electric | Peak | De-spin KE | Rotor gains dL |
| --- | --- | --- | --- | --- | --- | --- |
| 100 kg | 89 s | 0.013 kWh | 0.014 | 1.3 kW | 0.001 | 1.4e6 N m s |
| 1 t | 89 s | 0.125 | 0.138 | 12.6 kW | 0.011 | 1.4e7 |
| 10 t | 103 s | 1.25 | 1.40 | 100 kW | 0.107 | 1.4e8 |
| 50 t | 193 s | 6.27 | 6.98 | 234 kW | 0.533 | 7.2e8 |

The rotating-to-stationary transfer costs very little energy: tangential speed at the hub skin is 8.8 m/s. The de-spin energy, 0.1 kWh for a 10 t container, comes from the hub bearing and is a negligible heat load. The real cost is **operational** (docking a moving cabin to a stationary berth, sealing, a mass-flow entry in the angular-momentum ledger).

### Questions the task asked to separate

1. **Low apparent weight vs low inertial mass:** covered in 2.1. A 10 t module has the same inertia everywhere.
2. **Reduced energy vs reduced peak power or structural load:** moving in the 0.2 g zone cuts rolling loss 3.7x, but horizontal energy is only 0.5 kWh per 2.5 km for 10 t. The real benefit of low g is **lower required motor and rail rating**, not energy. For radial moves the energy is the potential; the power is m g_max v.
3. **Work against the centrifugal potential vs angular momentum exchange:** the machine pays or earns the potential (section 2.4). The rotor pays twice that, half of which becomes cargo kinetic energy that must be shed. Over a full cycle with balanced flows both cancel.
4. **Recoverable energy vs achievable system efficiency:** the whole potential is recoverable in principle. With eta_D x eta_G = 0.765, a regenerated round trip returns 76.5 % of the potential minus friction. A 10 t container sent down 500 to 2,050 m and an empty 3 t car back nets -11.0 kWh (net generation). Sending 10 t down and 10 t up on independent drives nets +5.7 kWh, losing 24 % of the 21.5 kWh potential each way.

**Paired shaft (counterbalance).** Two 10 t cars on one rope loop swapping positions between R = 1,000 and 2,500 m (section 9 of the script). The potential cancels end to end, but the motor sees a force swing of **+/-58.8 kN** (zero at mid travel), because the two cars sit at different radii. The drive passes 6.1 kWh per half stroke, losing 2.9 kWh per crossing at eta = 0.77, versus 6.7 kWh for an unbalanced car. Peak motor power falls from 435 kW to 261 kW. **Pairing helps by about 57 % in loss and 40 % in peak power; it does not zero the loss.** Equal masses at equal radii balance, and these do not stay at equal radii.

**Free-flying tug comparison** (disk loading 150 N/m², figure of merit 0.65, motor 0.9, tug mass 0.5 x payload + 150 kg; hovering thrust equals total weight at local g, which is the floor of the power problem):

| Cargo and route | Tug electricity | Rail or lift (section 4) | Ratio |
| --- | --- | --- | --- |
| 1 t, A circumferential 11.8 km | 36.8 kWh | 1.03 kWh | 36x |
| 10 t, A circumferential | 338 kWh | 2.40 kWh | 141x |
| 10 t, B axial 2.5 km | 71.8 kWh | 0.51 kWh | 141x |
| 1 t, C radial 500 to 2,050 inward | 10.0 kWh | 2.41 kWh | 4x |
| 10 t, C radial inward | 92.1 kWh | 24.0 kWh | 4x |

A 10 t tug needs about 1.55 MW of continuous electrical power at R = 1,875 m. The radial ratio is smaller because hover power falls as g^1.5 near the axis, but a tug cannot regenerate on the way back out. Hypothesis "structural support beats powered free flight" is confirmed [X].

---

## 5. Architecture comparison

Scores 1 (poor) to 5 (best), then notes. Quantities from sections 4 and 6.

| Criterion | A. Free-flying tugs | B. Cable carriages hung on rails (the hypothesis) | C. Rail grid + sealed paired shafts + last-metre (**recommended**) | D. Cable-driven parallel robots / gantries | E. Maglev or linear-motor rail grid | F. Axis-only spokes (radial lifts to the hub, everything else by tugs) |
| --- | --- | --- | --- | --- | --- | --- |
| Energy, horizontal 10 t | 1 (338 kWh) | 4 | 4 (2.4 kWh) | 4 (local only) | 4 | 1 |
| Energy, radial 10 t | 2 (92 kWh) | 3 | 4 (net -18 kWh out, 24 in; pairing) | 3 | 4 | 3 |
| Payload to 50 t | 1 | 3 | 5 | 2 (CoGiRo-class robots carry 300 kg) | 4 | 3 |
| Throughput | 2 | 3 | 5 (116 t/h per paired shaft; section 7) | 2 | 5 | 2 |
| Failure containment | 1 | 2 (load swings, 10 m class bow, release path to the city) | 4 | 3 | 4 | 2 |
| Structural complexity | 5 (none) | 3 | 3 (rails, sleeves, guides) | 3 | 2 (long-stator) | 3 |
| Maintainability over centuries | 2 (fans, batteries) | 3 | 4 (replaceable bogies, standard rails) | 3 | 3 | 3 |
| Flexibility | 5 | 3 | 4 | 3 | 3 | 5 |
| Sky-crossing safety | 1 | 2 | 5 | 2 | 4 | 1 |
| Maturity | 3 | 4 | 5 | 3 | 3 | 4 |

Notes:

- **A is the baseline for flexibility, not for freight.** 26x to 141x the electricity of rails on horizontal routes, 1 MW-class continuous loads for container tugs, no regeneration, uncontained failure. Keep for construction, emergency and 100 kg-class deliveries.
- **B fails on its premise.** The cargo is outboard of the anchor, it swings at W sqrt(r_a / L) with 50 to 170 s periods for hangs of 500 to 1,500 m from low radii, and it leans 6 to 18 degrees at 5 m/s. The retained piece is the short outboard drop from a rail.
- **D (CDPR) is a local tool.** Published large systems (CoGiRo, 15 x 11 x 6 m, above 300 kg payload; FASTKIT as a mobile logistics variant) are far below 10 t at hall scale. Use inside farm halls, depots and shipyards.
- **E (maglev, linear motors) is an upgrade path for the grid, not a different architecture.** At 5 to 20 m/s the energy case for contactless propulsion is weak (the total is 2.4 kWh for 10 t over 11.8 km); the case is maintenance (no wheel wear) and high-frequency headways. Retain as a track-technology option. Rolling-resistance and rope-wear data for wheeled systems are better known [X].
- **F saves structure and loses the point.** It leaves every horizontal and sky move to tugs.

A hybrid, C, wins on safety and energy; its cost is mechanical complexity and the capital to put 12 to 16 sealed shafts in a rotor.

---

## 6. Failure-mode analysis

### 6.1 Trajectories of an uncontrolled mass [E, validated by two frames]

A body released at rest in the rotating frame keeps its inertial tangential speed W r0 and flies a straight line. Time to reach radius R is sqrt(R² - r0²) / (W r0); in the rotating frame this looks like a curved path with a large Coriolis deflection. The integrator (rotating frame, co-rotating air drag) reproduces the inertial-frame impact time to 0.1 s. Results for a 10 t container, no drag:

| Release | Impact time | Landing offset (arc around the rotor) | Impact speed | KE | TNT eq. |
| --- | --- | --- | --- | --- | --- |
| R = 500 m to floor | 78.2 s | 158° (about 6.9 km) | 153 m/s | 118 MJ | 28 kg |
| R = 1,000 m | 36.6 s | 65° | 144 | 103 MJ | 25 kg |
| R = 2,050 m (sky) | 11.2 s | 5° | 90 | 40 MJ | 9.6 kg |

With co-rotating atmospheric drag (the fall is shorter in speed, not in time):

| Case | Impact time | Speed | KE | TNT eq. |
| --- | --- | --- | --- | --- |
| 100 kg tool, 500 m to floor | 83.8 s | 60 m/s | 0.18 MJ | 0.04 kg |
| 1 t pallet | 82.2 s | 68 | 2.3 | 0.56 kg |
| 10 t container | 81.9 s | 90 | 40.5 | 9.7 kg |
| 10 t container, 1,500 m | 23.1 s | 98 | 48.1 | 11.5 kg |
| 10 t container, sky to floor | 11.5 s | 81 | 32.9 | 7.9 kg |
| 50 t module, 500 m to floor | 82.5 s | 104 | 269 | 64 kg |

Drag cuts the energy by two thirds but leaves it in the "armour-piercing" class. A released cargo does not land where it started: it travels most of the way round the rotor during its flight, so **exclusion zones under the sky do not work**. Containment must be at the source: closed shafts, catch rails, tethers that cannot be released.

### 6.2 Failure table

| Failure | Consequence | Mitigation | Residual risk |
| --- | --- | --- | --- |
| Rope failure, car in a guided shaft | Runaway to terminal speed (124 m/s for 10 t at R = 1,500 m) | Overspeed governor (EN 81-20 style, trip at 115 % of rated speed), progressive safety gear on guide rails (mean decel 0.2 to 1.0 g), second independent rope set | Arrest distance at 0.5 g_local (R = 2,050 m): 2.6 m from trip, **199 m from a 40 m/s runaway**, 100 m at 1 g; keep governor trip close to rated speed |
| Rope failure, cable-hung load on a rail carriage | Release of mass above the city: from the sky it is 11 s to the floor at 90 m/s | Do not hang loads over residential space. Outboard drops only over lower service decks. Redundant ropes, catch frame under the load | Moderate; eliminate by routing |
| Loss of braking power | Unbalanced car accelerates | Fail-safe spring brakes, drum brakes on the rope sheave, rail clamps, regenerative resistor bank | Low |
| Derailment | Carriage hangs off the truss | Captive wheels on both sides of the rail, anti-lift hooks, side guide rollers on the Coriolis side, check rails | Low |
| Carriage or winch motor failure | Stuck load | Redundant motor sets, rescue carriage, manual brake release to creep to a berth | Low |
| Excessive Coriolis motion | Rope contact, car wedging | Speed limits from section 2.3 (spans <= 500 m between rope guides at 4 m/s), tension sensing, slow-down on high bow | Medium until a rope-guide design is verified |
| Load oscillation and collision | Impact with truss or neighbour | Input-shaped trajectories, swing sensors, outboard-drop limit of 100 m, clearance envelopes with 2 x the amplitude | Low to medium |
| Sky aperture accident | Dropped freight, dust, noise, light spill into the city | **No open freight apertures.** Freight crosses the sky only inside a sealed pier sleeve with a catch, double doors and a dust lock. The four ascender apertures stay passenger-only | Low |
| Fire and smoke | In a rotor, hot gas rises toward the axis (buoyancy points inward), so a shaft from the floor is a chimney into the upper volume, and a shaft from the upper volume is a chimney away from the fire | Fire-rated sleeves, door interlocks, smoke damper at the floor lobby and the crown, pressurised stair lobby, suppression in freight cars | Medium (handling lithium batteries and compounds in cargo) |
| Maintenance access and isolation | A damaged segment holds up the grid | Sectional isolation at every node, bypass loops on both ring beams, shaft pairs in separate piers, rescue crawler on the gallery deck | Low |
| Hub docking failure | Cabin cannot de-spin | Hold at R = 140 m, 8.8 m/s tangential, on guideway brakes; manual lock | Low |

Rope arrest in a shaft is the one design that must be proven by test. All other numbers rest on elevator and crane practice. The 199 m arrest distance from a 40 m/s runaway is a reason to hold cars to 4 m/s and trip close to rated speed rather than to design the safety gear for a free fall.

---

## 7. Operations

### 7.1 Roles of each layer

- **Floor to upper volume:** vertical shafts in the pier risers. 10 t standard unit load plus pallets. Each shaft crosses the sky at the pier girdle in a sealed sleeve. The sleeve doubles as the sky hardening: no cargo ever shares an aperture with residents.
- **Upper volume:** F1 and F2 carriages move cargo to the destination dock (factory, greenhouse, warehouse, repair shop) in cells of the bay grid. Crossovers are on ring-beam nodes (489 m apart) where an axial girder meets a ring beam; routing is by transfer switch at the node.
- **To the spine:** via the ascender towers, using a freight guideway in the tower bay and a freight drum at the hub (a change request to docs/21, not a redesign of the ascender; the hub already de-spins at 8.8 m/s).

### 7.2 Standard cargo interface [F]

A single **unit load device (ULD)** family so that every interface is generic: 1.2 x 1.0 m pallet, 2.4 x 2.4 x 3.0 m 1 t half-cube, 6.1 x 2.4 x 2.6 m container (10 t, matches an 8 m riser if a car carries one container lengthwise), and a 20 t to 50 t module on a dedicated skid. A common twist-lock and tag reader, the same everywhere. Standardising on the ISO container footprint lets Earth-built tooling interoperate with Concordia (assumption flagged in section 9).

### 7.3 Throughput model [illustrative demand, not forecast]

Assumed 200,000 residents per rotor and a per-resident mass flow between the upper volume and the floor.

| Scenario | t/day per rotor | 1 t pallets/day | 10 t containers/day |
| --- | --- | --- | --- |
| Lean (food, consumables) 3 kg per person per day | 600 | 600 | 60 |
| Typical Earth-city goods 8 kg | 1,600 | 1,600 | 160 |
| Industrial city 20 kg | 4,000 | 4,000 | 400 |

One paired shaft with 10 t cars (1,000 m rise at 4 m/s, 60 s dwell at each end, cycle 620 s) carries about **116 t/h or 2.8 kt/day running both ways at full payload**. Capacity is not the constraint for any scenario: 2 to 4 shafts cover even 4,000 t/day at 50 % duty. Twelve to sixteen shafts per rotor are driven by **failure containment, sectional isolation and distribution** (every district within a few hundred metres of a freight dock), not by tonnage.

### 7.4 A 10 t cargo module from an upper warehouse to a city depot

1. The warehouse at F2 (R = 1,500 m) loads a container on a carriage, tag read at the dock.
2. The carriage runs along the gallery deck to the freight pier's transfer node, up to 489 m at 10 m/s, about 50 s. A shaft gate interlocks.
3. The container rolls into one car of a paired shaft. The paired car moves the other way with whatever is going up.
4. The car descends 1,000 m at 4 m/s through the sky sleeve (263 s for 10 t at D1). The sleeve doors seal at the girdle; a dust lock vents.
5. At the plinth portal the car opens into the pier podium. Cargo transfers to the floor-level freight lift or the metro freight tram. The brake dissipates or stores 18.5 kWh.
6. The city depot confirms the load and records the angular-momentum ledger update.

Total time from the warehouse door to the depot door is about 8 to 12 minutes with no waiting.

### 7.5 Regeneration, ledger and growth

- Net mass flow is downward in the 500 to 2,500 m band (food, goods) and upward in the return flow (waste, recycling, raw material). Pair the cars to move return freight on the up stroke.
- Report net radial mass flow per rotor to the momentum controller (docs/15): 1 Mt/yr down is 0.32 % of rotor angular momentum per year.
- Growth: the grid adds branches at nodes, shafts are added in new piers. Rails are standardised so a segment can be replaced on one night.

---

## 8. Visual design brief [F, constrained by physics]

What the freight system looks like if it expresses the physics rather than copying Earth industry.

**Above the sky (upper service volume).**

- **Rails are visible geometry on the ring beams:** a twin steel rail on the gallery deck, with a Coriolis-side guard rail and an overhead check rail, painted bright at curves. Carriages are low, wide and heavy-looking: a bogie with a hood, a yellow beacon, the load strapped on top, not hanging below.
- **The signature mechanism is the paired car.** Two cars on one rope loop moving in opposite directions at the same pace. In the shaft they pass each other at mid travel (R about 1,750 m), where the rope force reverses. A passenger watching sees the cars meet and pass, a tangible expression of balance.
- **Short outboard drops on cables:** a carriage lowers a pallet 20 to 80 m to a deck below. The load has a **visible inclination from Coriolis** while descending (about 1 degree at 1 m/s at R = 1,875 m), and a sway that takes about 16 to 20 s to settle. Anti-sway reads as slow, careful motion.
- **Rope guide stations every 300 to 500 m** in the shafts: ring frames with grooved roller guides where the rope bundle is steadied, visible from the crown and under the sky. These stations make the Coriolis bow explicit.
- **Counterweights are cars**, not blocks. Visible as a second row of cabins.
- **Cranes and gantries** work inward of the rails in the farm and shipyards, stretching toward the axis with long outboard booms. A tall crane at the 0.2 g level has thin members: low weight allows slender structure (design cue).
- **Freight marks the Coriolis lean.** Anything moving radially leans in its direction of travel: rope stays angled, loads canted. Spawn this as a rendered effect on moving carriers and as a plotted overlay in the physics page.

**The sky transfer port [F].** A tall sealed sleeve through the pier girdle with a freight collar below the emitter membrane: a boxy bronze-and-grey airlock gallery lined with shuttered doors, lit from above by the sky itself through a narrow glazed slot. From the street you see the underside of the pier (the plinth portal, a 12 m gate with stencilled hazard frames); the doors open for a few seconds each cycle with a low bell and a rolling, boom-like sound of a container leaving its car. No cargo is visible against the sky, only the portal. A dust lock exhales a visible puff when the door cycles.

**What residents see and hear.**

- Residential districts see the sky and the piers. Rails, cables and carriages are **not visible** from the street: they are above the membrane. The pier plinth portal and its door signals are the only freight sign.
- The occasional rumble transmitted down the pier lattice (structure-borne sound), a low tone of the shaft cars (a pitch shift as the pair crosses), and a periodic bell at the dock.
- From the upper volume: steel-on-steel wheel rolling with a periodic joint click every 12 m rail section, motor whine rising with speed, brake hiss, the clank of ULD twist-locks, rope hum at the first string mode (a 10 to 30 s period), occasional air-handling boom.

**What distinguishes Concordia from an Earth industrial complex.**

1. Everything moving radially leans and swings from Coriolis, and a flat ground plan does not apply.
2. The same cargo weighs 0.2 to 1.0 times as much depending on height, so structure thins toward the axis.
3. Cars are paired and meet in the middle.
4. A circumferential move changes apparent weight: a carriage lighter when running retrograde.
5. At the hub, cargo is visibly slowed to a stop in a drum, and a sign counts the angular-momentum ledger.

---

## 9. Unresolved questions

Missing parameters and decisions, in priority order:

1. **Rope guide stations in a shaft.** A rope bundle bows 5.2 m over 1,000 m at 4 m/s (section 6); can intermediate guides be built in an 8 m riser without creating snag or friction hot spots? Decision needed: roped pair with guides vs rack-and-pinion cars vs linear-motor cars. A test model with a scale rope on a rotating rig would settle this.
2. **Shaft count and location.** 12 to 16 per rotor is a containment argument. Needs a risk model (probability times consequence of a shaft loss) and the megaframe's own placement rules.
3. **Do the pier riser shafts have room?** Is the 8 m square riser free of passenger and utility use? A 10 t car needs about 3 x 7 m plus guide rails and rope space, two cars side by side. The riser is likely too small for a pair plus the container footprint without the pier lattice's cooperation.
4. **Freight in the ascender towers.** The tower blades carry the cabin guideway; whether freight fits needs a docs/21 change request. The 50 t module may need a dedicated heavy shaft.
5. **Sky sleeve geometry.** Whether the pier girdle (49 m, 3 m tall) can become a freight collar without changing the cassette bays and hoops of the sky kit.
6. **Net mass flow.** Per-rotor mass flows (upward and downward), seasonal swings and the momentum-ring response.
7. **Atmosphere.** The assumption that the upper volume is at the cabin pressure and mix (docs say the vacuum wedges at the ends are closed off and the central bore remains open). Humidity, dust and fire load of the upper volume are not specified.
8. **Moving-load fatigue and dynamics on the 22 m box truss** over 100 years of 5 to 20 m/s traffic. Needs a frame model.
9. **Axial rail runs.** Axial girders at 625 m and 1,000 m exist only for u = 0 to 480 m in docs/21, and the axial spacing is 480 m. Confirm continuity across the 2.5 km rotor length.
10. **ISO footprint assumption.** Whether Concordia freight standardises on Earth intermodal dimensions.
11. **Power.** A 1.1 MW brake for a 50 t descent needs an energy-storage design (flywheel, battery or resistor bank); the grid at the pier is unspecified.
12. **Regulation.** There is no Earth standard for a rotating habitat; analogues (EN 81-20 elevators, ISO 4344 ropes, crane standards) apply with Coriolis and variable gravity as explicit extra load cases. Treat as an extrapolation [X].

What data would size the network: per-district goods and waste mass, peak-to-mean ratio, dock locations for each facility, container mix, the megaframe's real member sizes at the gallery, and the sky kit's aperture geometry.

---

## 10. Sources

Verified in this session (search results read, not the primary text unless noted):

- Elevator safety gear and the EN 81-20 numbers (progressive safety gear mean deceleration 0.2 to 1.0 g; governor trip at least 115 % of rated speed): [Firgelli explainer](https://www.firgelliauto.com/blogs/mechanisms/elevator-safety-gear), [PFB lift safety gear](https://pfb.it/en/news/325810/pws-leitoyrgei-to-alexiptwto), [Elevator World on progressive gear](https://elevatorworld.com/?p=77832). Secondary sources; **confirm against the current EN 81-20:2020 text** (clause numbers not checked).
- Regenerative elevator drives: [Otis ReGen](https://www.otis.com/documents/256045/6552829/Regen_Drive_UK.pdf), [KONE regenerative drives](https://architectureanddesign.com.au/suppliers/koneanz/introducing-kone-eco-efficient-regenerative-drives), [Green Elevators (Elevator World)](https://elevatorworld.com/?p=52670). Vendor claims of 20 to 40 % system energy recovery; not independent.
- Carbon-fibre hoist rope for 1,000 m rise: [Exel Composites on KONE UltraRope](https://exelcomposites.com/case-studies/kone-ultrarope/), [The Register, 2013](https://www.theregister.com/2013/06/18/ultrarope_to_enable_1000_meter_buildings/). Manufacturer figures.
- Cable-driven parallel robots: [CoGiRo and cable robots, LIRMM](https://hal-lirmm.ccsd.cnrs.fr/lirmm-03795204/document), [FASTKIT mobile CDPR for logistics](https://hal.archives-ouvertes.fr/hal-02296120), [adaptive preload control of CDPRs (arXiv)](https://arxiv.org/pdf/2403.19293). CoGiRo: payload above 300 kg, 15 x 11 x 6 m support structure.
- Crane anti-sway and input shaping: [Mahidol University industrial crane study](https://repository.li.mahidol.ac.th/signposting/describedby/788c40ce-f0bb-4379-a79c-17d70a730fab), [rotary crane input shaping](https://journals.utm.my/jurnalteknologi/article/view/10297), [double-pendulum gantry crane](https://umpir.ump.edu.my/id/eprint/36471/). Sorensen, Singhose and Dickerson tested shaping on a 10 t bridge crane.
- AS/RS regeneration: [Meneghetti and Monti on energy recovery](https://dl.ifip.org/hal-01472280v1), [Kasto DC-link gantry drives (computer-automation.de)](https://www.computer-automation.de/operate---monitor/electric--efficient--energy-saving.htm), [Hänel EcoDrive via PES Media](https://www.pesmedia.com/energy-efficient-storage-systems). Vendors claim up to 40 % recovery.
- Steel rope: [ISO 4344:2022 preview](https://webstore.ansi.org/preview-pages/ISO/preview_ISO+4344-2022.pdf), [6x36WS data sheet (Pfeifer)](https://www.pfeifer.info/out/assets/6X36WS-WC_SDB_EN_1.PDF). The breaking-force formula in the script is a simplified fit (conservative by about 8 %); use the standard's tables for design.

Not verified in this session (from engineering practice, links to be checked before publication): Landau and Lifshitz or Goldstein for the rotating-frame Lagrangian (section 2.3, which is also reproduced numerically here); Alimak and rack-and-pinion hoist data; linear synchronous motor and maglev freight practice; rolling-resistance range for steel wheels on rail.

Independently reproducible: [`scripts/analysis/freight_trade_study.py`](https://github.com/DavidVeksler/concordia/blob/main/scripts/analysis/freight_trade_study.py) and its [saved output](https://github.com/DavidVeksler/concordia/blob/main/docs/specs/freight-trade-study-output.txt). The inertial-frame pendulum check and the rotating-frame fall integrator agree with the analytic results (0.02 % and 0.1 s respectively).

Project design documents used: the engineering specification (sections 16, 20, 22 to 25) and the design notes on the upper city, the ascender, the megaframe, the artificial sky, the upper farm and counter-rotation, plus the simulation's physics constants.
