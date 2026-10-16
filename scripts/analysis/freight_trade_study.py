#!/usr/bin/env python3
"""Reproducible numbers for docs/specs/freight-system-trade-study.md.

Pure numpy, no scene code. Run: python scripts/analysis/freight_trade_study.py
Every table in the report comes from this output (saved as
docs/specs/freight-trade-study-output.txt). Units SI unless stated.
"""
import math
import numpy as np

# ---- Concordia constants (src/physics.ts, docs/Habitat_Engineering_Specification.md) -------------
W = 0.0626            # rad/s, habitation rotor spin (period 100.4 s)
R_FLOOR = 2500.0      # m, 1 g
R_SKY = 2050.0        # m, nominal artificial sky (450 m up)
R_RING1, R_RING2, R_RING3 = 1875.0, 1500.0, 1000.0   # megaframe ring beams (625/1000/1500 m up)
R_HUB, R_HUB_IN = 140.0, 70.0                          # ascender hub skin / terminal
ROTOR_LEN = 2500.0
G0 = 9.80665
RT_M = 287.05 * 293.15   # J/kg, isothermal atmosphere at 20 C
P0, RHO0 = 101325.0, 1.204
L_ROTOR = 3e11 * R_FLOOR**2 * W   # N m s, ~1.2e17 (docs say about 1e17)

def g(r): return W * W * r
def gg(r): return g(r) / G0
def rho(r): return RHO0 * math.exp(W * W * (r * r - R_FLOOR**2) / (2 * RT_M))   # co-rotating isothermal air

def hdr(t): print("\n" + "=" * 100 + "\n" + t + "\n" + "=" * 100)

# ---- 1. Force environment -------------------------------------------------------------------------
hdr("1. Apparent gravity, density, Coriolis lean per m/s of radial speed")
print(f"{'r (m)':>7} {'alt above floor':>16} {'g (m/s2)':>9} {'g/g0':>6} {'rho/rho0':>9} {'tangential speed':>17} {'lean/(1 m/s radial)':>20}")
for r in (R_HUB_IN, R_HUB, 500, R_RING3, R_RING2, R_RING1, R_SKY, 2300, R_FLOOR):
    print(f"{r:7.0f} {R_FLOOR-r:16.0f} {g(r):9.3f} {gg(r):6.3f} {rho(r)/RHO0:9.3f} {W*r:14.1f} m/s {math.degrees(math.atan(2/(W*r))):17.2f} deg")
print("Coriolis acceleration for radial speed v: a = 2 W v =", f"{2*W:.4f} m/s2 per m/s (independent of mass and radius).")
print("Circumferential speed v (prograde +, retrograde -) changes apparent weight by (1 + v/(W r))^2:")
for v in (5, 10, 20, 40):
    print(f"  v={v:3d} m/s at r=1875: prograde x{(1+v/(W*1875))**2:.3f}  retrograde x{(1-v/(W*1875))**2:.3f}   (at r=2050: x{(1+v/(W*2050))**2:.3f} / x{(1-v/(W*2050))**2:.3f})")
print(f"Retrograde speed that makes cargo inertially stationary (zero weight) at r=1875: {W*1875:.1f} m/s")

# ---- 2. Cables ------------------------------------------------------------------------------------
hdr("2. Cable tension and rope sizing (cargo hangs OUTBOARD of its anchor; see report 2.1)")
loads = [("100 kg tool", 100.0), ("1 t pallet", 1e3), ("10 t container", 1e4), ("50 t module", 5e4)]
def rope_d_mm(Treq_kN):          # 6x36 grade 1770: MBF[kN] ~ 0.330 d^2 * 1770/1000
    return math.sqrt(Treq_kN / (0.330 * 1.770))
SF, N_ROPES, N_EFF = 8.0, 4, 3   # SF on total with one rope lost, 4 ropes, any 3 carry the load
print(f"Rope: 6x36 grade 1770, design factor {SF:g} on the load with {N_ROPES-N_EFF} of {N_ROPES} ropes lost.")
print(f"{'cargo':16} {'anchor r':>8} {'cargo r':>8} {'T cargo (kN)':>13} {'rope d (mm)':>12} {'rope kg/m':>10} {'rope self-wt T add (kN)':>24} {'T at anchor (kN)':>17}")
for name, m in loads:
    for ra, rl in ((R_SKY, 2150.0), (1500.0, 2000.0), (500.0, 2000.0)):
        T = m * g(rl)
        d = rope_d_mm(SF * T / N_EFF / 1e3)
        lam = 0.0044 * d * d * N_ROPES
        dT = lam * W * W * (rl**2 - ra**2) / 2
        print(f"{name:16} {ra:8.0f} {rl:8.0f} {T/1e3:13.1f} {d:12.1f} {lam:10.2f} {dT/1e3:24.1f} {(T+dT)/1e3:17.1f}")
sigma_over_rho = 1770e6 / 5 / 7850
print(f"Self-supporting taper ratio, steel at 1/5 of 1770 MPa, r 500 -> 2050: exp(W^2 (r2^2-r1^2)/2 / (sigma/rho)) = "
      f"{math.exp(W*W*(R_SKY**2-500**2)/2/sigma_over_rho):.3f}  (cable weight is a non-issue; 'long cable' problem is dynamics, not strength)")

# ---- 3. Pendulum dynamics: analytic + independent inertial-frame validation -----------------------
hdr("3. Sway: pendulum hung outboard of a pivot at radius r_a, cable length L")
print("Analytic (Lagrangian in rotating frame, derived in report 2.3): phi'' = -(W^2 r_a / L) sin(phi)  ->  w_p = W sqrt(r_a/L).")
print("Naive Earth formula with local g at the LOAD: w = sqrt(g(r_a+L)/L) = W sqrt((r_a+L)/L). The two differ; the first is right.")
print(f"{'r_a':>6} {'L':>6} {'T_sway (s) correct':>19} {'T naive (g at load)':>20} {'T/T_rotor':>10}")
for ra in (R_SKY, 1500, 500):
    for L in (10, 50, 100, 500, 1500):
        if L > ra and ra == 500 and L > 1500: continue
        Tc = 2 * math.pi / (W * math.sqrt(ra / L))
        Tn = 2 * math.pi / (W * math.sqrt((ra + L) / L))
        print(f"{ra:6.0f} {L:6.0f} {Tc:19.1f} {Tn:20.1f} {Tc/(2*math.pi/W):10.2f}")

def sim_pendulum(ra, L, phi0=0.05, m=1000.0, k=2e6, c_stretch=0.0, t_end=900.0, dt=1e-3):
    """Independent check: inertial-frame Cartesian point mass on a stiff spring-rope from a pivot that
    moves on a circle of radius ra at rate W. No rotating-frame equations used. Returns measured period."""
    def acc(t, x, y, vx, vy):
        px, py = ra * math.cos(W * t), ra * math.sin(W * t)
        pvx, pvy = -ra * W * math.sin(W * t), ra * W * math.cos(W * t)
        dx, dy = x - px, y - py
        d = math.hypot(dx, dy)
        ext = d - L
        fx = fy = 0.0
        if ext > 0:
            rv = ((vx - pvx) * dx + (vy - pvy) * dy) / d
            f = k * ext + c_stretch * rv
            fx, fy = -f * dx / d, -f * dy / d
        return fx / m, fy / m
    # rotating-frame rest at angle phi0 from the radial, measured at the pivot (corotating velocity)
    x0 = ra + L * math.cos(phi0); y0 = L * math.sin(phi0)
    s = np.array([x0, y0, -W * y0, W * x0])     # corotation velocity = W x r
    s[0] += 0.0
    # settle stretch: start with exact static extension
    t = 0.0
    ts, phis = [], []
    n = int(t_end / dt)
    for i in range(n):
        def f(tt, st):
            ax, ay = acc(tt, st[0], st[1], st[2], st[3])
            return np.array([st[2], st[3], ax, ay])
        k1 = f(t, s); k2 = f(t + dt / 2, s + dt / 2 * k1); k3 = f(t + dt / 2, s + dt / 2 * k2); k4 = f(t + dt, s + dt * k3)
        s = s + dt / 6 * (k1 + 2 * k2 + 2 * k3 + k4); t += dt
        if i % 20 == 0:
            ux, uy = s[0] - ra * math.cos(W * t), s[1] - ra * math.sin(W * t)
            # rotate into rotating frame
            rx = ux * math.cos(W * t) + uy * math.sin(W * t)
            ry = -ux * math.sin(W * t) + uy * math.cos(W * t)
            ts.append(t); phis.append(math.atan2(ry, rx))
    ts = np.array(ts); phis = np.array(phis)
    zc = [ts[i] - phis[i] * (ts[i+1] - ts[i]) / (phis[i+1] - phis[i]) for i in range(len(ts) - 1) if phis[i] > 0 >= phis[i+1]]
    if len(zc) < 2: return float('nan'), phis.max()
    return float(np.mean(np.diff(zc))), phis.max()

print("\nValidation (inertial-frame Cartesian simulation, stiff rope k=2e6 N/m, 1 t mass, 0.05 rad start):")
print(f"{'r_a':>6} {'L':>6} {'analytic T (s)':>15} {'simulated T (s)':>16} {'error %':>8} {'naive T (s)':>12}")
for ra, L in ((2050, 100), (2050, 500), (500, 300)):
    Ta = 2 * math.pi / (W * math.sqrt(ra / L)); Tn = 2 * math.pi / (W * math.sqrt((ra + L) / L))
    Ts, _ = sim_pendulum(ra, L, t_end=max(900, 6 * Ta), dt=2e-3)
    print(f"{ra:6.0f} {L:6.0f} {Ta:15.2f} {Ts:16.2f} {100*(Ts-Ta)/Ta:8.2f} {Tn:12.2f}")

print("\nSteady Coriolis lean of a cargo lowered/raised radially at v on a free cable: tan(alpha) = 2v/(W r)")
for r in (500, 1000, 1500, 2050):
    print(f"  r={r:5d}: " + "   ".join(f"v={v} m/s -> {math.degrees(math.atan(2*v/(W*r))):5.1f} deg" for v in (0.5, 1, 2, 5, 10)))
print("Variable-length pendulum: L phi'' + 2 L' phi' + (W^2 r_a) phi = 0 (small angle). Paying out (L'>0) damps with rate L'/L; reeling in (L'<0) pumps energy in.")
print("Parametric resonance risk when the length is modulated at twice the sway frequency (e.g. 2 x 0.29 rad/s for L=100 m at r_a=2050, i.e. a 11 s period).")

# ---- 4. Energy tables -----------------------------------------------------------------------------
hdr("4. Energy, power and time for routes A to E")
ETA_D, ETA_G = 0.90, 0.85       # motoring (grid to shaft) and generating (shaft to storage) efficiencies
CRR = 0.003                      # steel wheel on rail, rolling resistance coefficient
Cd_A = {"100 kg tool": (1.0, 0.3), "1 t pallet": (1.1, 1.8), "10 t container": (1.1, 6.3), "50 t module": (1.2, 15.0)}
J2KWH = 1 / 3.6e6

def drag_work_radial(m, CdA, r0, r1, v, n=400):
    rs = np.linspace(min(r0, r1), max(r0, r1), n); return float(np.trapezoid([0.5 * rho(r) * CdA * v * v for r in rs], rs)) if hasattr(np, 'trapezoid') else float(np.trapz([0.5 * rho(r) * CdA * v * v for r in rs], rs))

def leg(name, m, kind, r0, r1, dist, v, a, CdA):
    """kind: 'circ' (fixed radius r0, prograde), 'axial' (fixed radius r0), 'radial' (r0 -> r1, guided shaft).
    Returns dict. Energies in J at the shaft unless noted. U = rotating-frame potential change."""
    if kind == 'radial':
        dU = -0.5 * m * W * W * (r1 * r1 - r0 * r0)           # negative = outward = released
        rm = max(r0, r1)
        E_fric = drag_work_radial(m, CdA, r0, r1, v) + 0.01 * (2 * m * W * v) * abs(r1 - r0)   # drag + guide-wheel friction on Coriolis side load
        F_pot_peak = m * g(rm)
        cor = 2 * m * W * v
    else:
        dU = 0.0
        N = m * g(r0) * (1 + v / (W * r0))**2 if kind == 'circ' else m * g(r0)
        E_fric = CRR * N * dist + 0.5 * rho(r0) * CdA * v * v * dist
        F_pot_peak = 0.0
        cor = 2 * m * W * v if kind == 'circ' else 0.0
    tacc = v / a
    dacc = v * v / a
    t = (dist / v + v / a) if dist > dacc else 2 * math.sqrt(dist / a)
    # shaft work for the transit (excluding the speed-up KE)
    shaft = dU + E_fric
    E_ke = 0.5 * m * v * v
    if shaft >= 0: e_el = shaft / ETA_D
    else:          e_el = shaft * ETA_G           # negative = regenerated
    e_el += E_ke * (1 / ETA_D - ETA_G)           # accelerate (motoring) then brake (regenerating)
    if kind == 'radial' and dU > 0:
        e_el = e_el  # inward lift already positive
    Ppeak = (F_pot_peak + m * a + (CRR * m * g(r0) if kind != 'radial' else 0) + (0.5 * rho(r0) * CdA * v * v if kind != 'radial' else 0)) * v
    Ppeak = Ppeak / ETA_D
    return dict(name=name, m=m, kind=kind, dU=dU, fric=E_fric, ke=E_ke, el=e_el, t=t, P=Ppeak, cor=cor, dL=m * W * abs(r1 * r1 - r0 * r0) if kind == 'radial' else 0.0)

routes = {
    "A circumferential at ring-1 level r=1875, 11.8 km, prograde": ("circ", 1875.0, 1875.0, 2 * math.pi * 1875, {"100 kg tool": 20, "1 t pallet": 15, "10 t container": 10, "50 t module": 5}),
    "B longitudinal along rotor at r=1875, 2.5 km": ("axial", 1875.0, 1875.0, ROTOR_LEN, {"100 kg tool": 20, "1 t pallet": 15, "10 t container": 10, "50 t module": 5}),
    "C radial r=500 -> 2050 (0.2 g zone to sky), outward, guided": ("radial", 500.0, R_SKY, R_SKY - 500, {"100 kg tool": 5, "1 t pallet": 5, "10 t container": 4, "50 t module": 2}),
    "C' radial r=2050 -> 500, inward (the return)": ("radial", R_SKY, 500.0, R_SKY - 500, {"100 kg tool": 5, "1 t pallet": 5, "10 t container": 4, "50 t module": 2}),
    "D1 r=1500 (farm ring) -> 2500 floor, outward, through the sky": ("radial", 1500.0, R_FLOOR, 1000.0, {"100 kg tool": 5, "1 t pallet": 5, "10 t container": 4, "50 t module": 2}),
    "D2 r=500 -> 2500 floor, outward (full height)": ("radial", 500.0, R_FLOOR, 2000.0, {"100 kg tool": 5, "1 t pallet": 5, "10 t container": 4, "50 t module": 2}),
    "E r=500 -> 140 hub skin (inward) incl. despin to the spine": ("radial", 500.0, R_HUB, 360.0, {"100 kg tool": 5, "1 t pallet": 5, "10 t container": 4, "50 t module": 2}),
}
rows = []
for rname, (kind, r0, r1, dist, vs) in routes.items():
    print(f"\n--- {rname}")
    print(f"{'cargo':16} {'v m/s':>6} {'time s':>8} {'U change kWh':>13} {'losses kWh':>11} {'KE kWh':>8} {'net electric kWh':>17} {'peak kW':>9} {'side force kN':>14} {'dL (Nms)':>10}")
    for name, m in loads:
        CdA = Cd_A[name][0] * Cd_A[name][1]
        v = vs[name]; a = 0.3 if m < 5e4 else 0.15
        res = leg(rname, m, kind, r0, r1, dist, v, a, CdA)
        extra = ""
        if rname.startswith("E"):
            e_despin = 0.5 * m * (W * R_HUB)**2   # rotating-frame KE of the stationary spine seen from the hub: shed at the despin transfer
            res['el'] += e_despin * (1 / ETA_D - 0) * 0   # reported separately, below
            extra = f"   despin KE {e_despin*J2KWH:.4f} kWh"
        print(f"{name:16} {v:6.1f} {res['t']:8.0f} {res['dU']*J2KWH:13.3f} {res['fric']*J2KWH:11.3f} {res['ke']*J2KWH:8.4f} {res['el']*J2KWH:17.3f} {res['P']/1e3:9.1f} {res['cor']/1e3:14.2f} {res['dL']:10.2e}{extra}")

print("Round trips, 10 t container, r 500 <-> 2050, 4 m/s (net electric kWh, negative = net regeneration):")
def _el(mm, r0, r1): return leg('x', mm, 'radial', r0, r1, 1550, 4, .3, 1.1 * 6.3)['el'] * J2KWH
print(f"  10 t down + empty 3 t car up, independent drives: {_el(1e4, 500.0, R_SKY) + _el(3000, R_SKY, 500.0):7.2f}")
print(f"  10 t down + 10 t up, independent drives with grid regeneration: {_el(1e4, 500.0, R_SKY) + _el(1e4, R_SKY, 500.0):7.2f}  (eta_D x eta_G loses {100*(1-ETA_D*ETA_G):.0f} % of the {0.5*1e4*W*W*(R_SKY**2-500.0**2)*J2KWH:.1f} kWh potential each way)")
d_ = leg('x', 1e4, 'radial', 500.0, R_SKY, 1550, 4, .3, 1.1 * 6.3)
print("  10 t down + 10 t up on a rope-coupled pair: end-to-end potential cancels, but the drive still sees a +/-F swing (section 9 gives the circulating energy and loss)")

print("\nEfficiency framing for 1 t moved from r=500 to the floor (2500) against what it would cost to lift 1 t 2000 m on Earth:")
print(f"  rotating-frame potential released lowering 500 -> 2500: {0.5*1e3*W*W*(R_FLOOR**2-500**2)*J2KWH:.2f} kWh/t;  Earth lift of 1 t by 2000 m: {1e3*G0*2000*J2KWH:.2f} kWh/t (5.4 kWh)")
print("Round-trip efficiency of a regenerated radial cycle with no counterweight: eta_D x eta_G =", f"{ETA_D*ETA_G:.3f}", "of the potential is returned minus friction.")

# ---- 5. Angular momentum bookkeeping --------------------------------------------------------------
hdr("5. Angular momentum and the rotor ledger")
print(f"Rotor angular momentum L = {L_ROTOR:.3e} N m s (3e11 kg at 2500 m).")
for name, m in loads:
    dL = m * W * (R_FLOOR**2 - 500.0**2)
    print(f"  {name:16}: lowering 500 -> 2500 m takes dL = {dL:.3e} N m s from the rotor ({dL/L_ROTOR:.2e} of L); energy ledger: rotor gives m W^2 (r2^2-r1^2) = {m*W*W*(R_FLOOR**2-500.0**2)*J2KWH:.2f} kWh, of which the winch can recover half ({0.5*m*W*W*(R_FLOOR**2-500.0**2)*J2KWH:.2f}) and the cargo's inertial KE is the other half.")
print("Net transfer: 1 Mt/yr moved from r=500 to the floor shifts the rotor by")
dLyr = 1e9 * W * (R_FLOOR**2 - 500.0**2)
print(f"  dL = {dLyr:.2e} N m s per year = {dLyr/L_ROTOR*100:.3f} % of L per year; opposite-spin pairs and the momentum rings trim this (docs/15).")
print("Tangential force the guideway must supply to change the cargo's angular momentum (= Coriolis force) for v_r = 4 m/s, 10 t:", f"{2*1e4*W*4/1e3:.2f} kN")

# ---- 6. Uncontrolled descents (rotating-frame integration; air co-rotates) ----------------------
hdr("6. Uncontrolled trajectories, released at rest in the rotating frame, free flight with co-rotating air drag")
def free_flight(r0, m, CdA, t_end=400.0, dt=2e-3, drag=True, r_stop=R_FLOOR):
    """Rotating frame, x radial, y tangential. a = W^2 r + 2W (vy, -vx)... (Coriolis -2 W x v) - drag/m v_rel."""
    x, y, vx, vy = r0, 0.0, 0.0, 0.0
    t = 0.0; vmax = 0.0
    while t < t_end:
        r = math.hypot(x, y)
        if r >= r_stop: break
        sp = math.hypot(vx, vy)
        k = (0.5 * rho(r) * CdA * sp / m) if drag else 0.0
        ax = W * W * x + 2 * W * vy - k * vx
        ay = W * W * y - 2 * W * vx - k * vy
        vx += ax * dt; vy += ay * dt; x += vx * dt; y += vy * dt; t += dt
        vmax = max(vmax, math.hypot(vx, vy))
    r = math.hypot(x, y)
    return t, r, math.atan2(y, x), math.hypot(vx, vy), vmax

print("Inertial-frame check (no drag): body keeps tangential speed W r0 in a straight line; reaches radius R at t = sqrt(R^2-r0^2)/(W r0) and has rotated away from the release meridian by")
print(f"{'case':44} {'t_impact s':>11} {'lateral (deg of arc)':>21} {'speed (m/s)':>12} {'KE (MJ)':>9} {'kg TNT':>7} {'inertial t':>11}")
for (lab, r0, rs, m, CdA) in (("500 -> floor 2500 vacuum-like (no drag)", 500.0, R_FLOOR, 1e4, 0),
                              ("1000 -> floor 2500 no drag", 1000.0, R_FLOOR, 1e4, 0),
                              ("2050 sky -> floor 2500 no drag", R_SKY, R_FLOOR, 1e4, 0)):
    t, r, ang, v, vm = free_flight(r0, m, 1.0, drag=False, r_stop=rs)
    ti = math.sqrt(rs**2 - r0**2) / (W * r0)
    print(f"{lab:44} {t:11.1f} {math.degrees(ang):21.1f} {v:12.1f} {0.5*m*v*v/1e6:9.1f} {0.5*m*v*v/4.184e6:7.1f} {ti:11.1f}")
print("\nWith co-rotating atmospheric drag (Cd 1.1):")
print(f"{'case':44} {'t_impact s':>11} {'lateral (deg of arc)':>21} {'speed (m/s)':>12} {'KE (MJ)':>9} {'kg TNT':>7} {'v_max':>7}")
for (lab, r0, rs, m, CdA) in (("100 kg tool, 500 -> floor, drag A=0.3", 500.0, R_FLOOR, 100.0, 1.0*0.3),
                              ("1 t pallet, 500 -> floor, A=1.8", 500.0, R_FLOOR, 1e3, 1.1*1.8),
                              ("10 t container, 500 -> floor, A=6.3", 500.0, R_FLOOR, 1e4, 1.1*6.3),
                              ("10 t container, 1500 -> floor", 1500.0, R_FLOOR, 1e4, 1.1*6.3),
                              ("10 t container, 2050 sky -> floor", R_SKY, R_FLOOR, 1e4, 1.1*6.3),
                              ("50 t module, 500 -> floor, A=15", 500.0, R_FLOOR, 5e4, 1.2*15.0),
                              ("10 t container, 500 -> sky level 2050", 500.0, R_SKY, 1e4, 1.1*6.3)):
    t, r, ang, v, vm = free_flight(r0, m, CdA, r_stop=rs)
    print(f"{lab:44} {t:11.1f} {math.degrees(ang):21.1f} {v:12.1f} {0.5*m*v*v/1e6:9.2f} {0.5*m*v*v/4.184e6:7.2f} {vm:7.1f}")
print("\nTerminal speed in guided shaft with a failed brake (drag only, no Coriolis wall contact), 10 t, r=1500 : v_t =",
      f"{math.sqrt(2*1e4*g(1500)/(rho(1500)*1.1*6.3)):.0f} m/s; 50 t: {math.sqrt(2*5e4*g(1500)/(rho(1500)*1.2*15)):.0f} m/s; 100 kg: {math.sqrt(2*100*g(1500)/(rho(1500)*0.3)):.0f} m/s")
print("Safety-gear arrest distance, 10 t at 115 % of 4 m/s overspeed trip (4.6 m/s), mean decel 0.5 g_local(r=2050):",
      f"{4.6**2/(2*0.5*g(2050)):.2f} m; from runaway 40 m/s: {40**2/(2*0.5*g(2050)):.1f} m (1 g_local: {40**2/(2*g(2050)):.1f} m)")
print("Cargo hung at 2150 m on a failed-and-released cable above the city (50 m clear fall to 2500 is 350 m): time ~", f"{math.sqrt(2*350/g(2300)):.1f} s, impact speed ~ {math.sqrt(2*350*g(2300)):.0f} m/s without drag.")
print("Kinetic energy released by a full-depth release 10 t (500 -> 2500, no drag):", f"{0.5*1e4*W*W*(R_FLOOR**2-500.0**2)/1e6:.0f} MJ (rotating-frame potential) ; inertial-frame KE gain is the same number, plus the rotor's share.")

# ---- 7. Throughput and fleet sizing sketch -----------------------------------------------------
hdr("7. Throughput scenarios (illustrative demand, not a forecast)")
POP = 200_000      # per rotor
for label, kg_pp_day in (("lean (food + consumables up to the city)", 3.0), ("typical Earth city 8 kg/person/day goods incl. waste", 8.0), ("industrial city 20 kg/person/day", 20.0)):
    t_day = POP * kg_pp_day / 1000
    n_pal = t_day / 1.0
    n_cont = t_day / 10.0
    print(f"{label:55}: {t_day:7.0f} t/day per rotor = {n_pal:6.0f} pallets/day or {n_cont:5.0f} 10-t containers/day")
print("Sky-crossing lift sizing: 10 t container cycle in a 1000 m shaft at 4 m/s = 250 s + 2x60 s dock; one shaft with two paired cars carries about")
cyc = 250 * 2 + 120
print(f"  {2*10*3600/cyc:.0f} t/h per shaft at full payload, {2*10*24*3600/cyc/1000:.1f} kt/day if the shaft runs continuously both ways.")

# ---- 8. Free-flying tug baseline ------------------------------------------------------------------
hdr("8. Free-flying tug baseline (ducted fans in the co-rotating atmosphere), same routes")
FOM, ETA_M, DISK = 0.65, 0.90, 150.0     # figure of merit, motor+ESC, disk loading N/m2 (low, large rotors)
def hover_kw(mass, r):
    T = mass * g(r); A = T / DISK
    return T**1.5 / math.sqrt(2 * rho(r) * A) / FOM / ETA_M / 1e3
print("Assumptions: tug dry mass = 0.5 x payload + 150 kg, hover thrust = total weight at local g, no regeneration.")
print(f"{'cargo':16} {'route':34} {'time s':>7} {'mean kW':>8} {'tug kWh':>8} {'rail/lift kWh (sec.4)':>22} {'ratio':>6}")
refs = {"A": {"100 kg tool": 0.259, "1 t pallet": 1.025, "10 t container": 2.404},
        "B": {"100 kg tool": 0.055, "1 t pallet": 0.219, "10 t container": 0.508},
        "C": {"100 kg tool": 0.237, "1 t pallet": 2.407, "10 t container": 23.96}}
for name, m in loads[:3]:
    mt = m + 0.5 * m + 150
    for rt, label, dist, v, r0, r1 in (("A", "A circumferential 11.8 km r=1875", 2 * math.pi * 1875, 15.0, 1875, 1875), ("B", "B axial 2.5 km r=1875", 2500.0, 15.0, 1875, 1875), ("C", "C' radial inward 500 <- 2050 (lift)", 1550.0, 5.0, 2050, 500)):
        t = dist / v
        rs = np.linspace(min(r0, r1), max(r0, r1), 50)
        kw = float(np.mean([hover_kw(mt, r) for r in rs]))
        ekwh = kw * t / 3600
        print(f"{name:16} {label:34} {t:7.0f} {kw:8.1f} {ekwh:8.1f} {refs[rt][name]:22.3f} {ekwh/refs[rt][name]:6.0f}")

# ---- 9. Roped radial shaft physics ----------------------------------------------------------------
hdr("9. Paired roped shaft: force profile, circulating energy, and Coriolis rope bow")
m, r1_, r2_, v = 1e4, 1000.0, 2500.0, 4.0
Lr = r2_ - r1_
Fpk = m * W * W * Lr
Ecirc = m * W * W * Lr * Lr / 4
print(f"Two 10 t cars on one rope loop; car A runs {r1_:.0f} -> {r2_:.0f} while car B runs {r2_:.0f} -> {r1_:.0f}.")
print(f"Net drive force F(x) = m W^2 (2x - L) swings from {-Fpk/1e3:.1f} to +{Fpk/1e3:.1f} kN (zero at mid travel); peak motor power at 4 m/s = {Fpk*v/ETA_D/1e3:.0f} kW")
print(f"(a single unbalanced 10 t car at r=2500: {m*g(2500)/1e3:.0f} kN, {m*g(2500)*v/ETA_D/1e3:.0f} kW)")
print(f"Energy circulated through the drive: {Ecirc*J2KWH:.2f} kWh each half; electrical loss at eta_D*eta_G = {ETA_D*ETA_G:.2f}: {Ecirc*J2KWH*2*(1-ETA_D*ETA_G):.2f} kWh per crossing, versus {0.5*m*W*W*(r2_**2-r1_**2)*J2KWH:.1f} kWh potential an unbalanced car moves (loss {(1-ETA_D*ETA_G)*0.5*m*W*W*(r2_**2-r1_**2)*J2KWH:.1f} kWh).")
print("\nCoriolis bow of a hoist rope bundle between guide stations: q = 2 lambda W v, sag = q L^2 / (8 T)   (4 ropes sized for 10 t, lambda ~ 6.5 kg/m, T = m g(r))")
print(f"{'span L (m)':>10} " + " ".join(f"{'v='+str(vv)+' m/s':>11}" for vv in (1, 2, 4, 8)) + "   at r=1500 (g=5.9); sag in metres")
for L in (100, 200, 300, 500, 1000, 1500):
    T = m * g(1500) + 6.5 * g(1500) * L * 0.5
    print(f"{L:10d} " + " ".join(f"{2*6.5*W*vv*L*L/(8*T):11.2f}" for vv in (1, 2, 4, 8)))
print("String first mode (T=m g(1500)=59 kN, lambda 6.5, L=500 m):", f"period {2*500/math.sqrt(m*g(1500)/6.5):.1f} s; for L=1500: {2*1500/math.sqrt(m*g(1500)/6.5):.1f} s")
