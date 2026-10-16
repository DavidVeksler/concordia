// The unroll: a habitation rotor's ground plan wrapped on its drum, cut along one street and uncurled into the flat map
// (docs/specs/station-map-spec.md section 3.5). Plain WebGL2, no libraries, no network requests of its own beyond the
// texture files named in the markup. Loaded as <script type="module" src="/site/js/unroll.js"></script>.
//
// MOUNT CONTRACT
//   <figure class="map-unroll" id="map-unroll"
//     data-rotors='[{"n":1,"name":"<from the sim index>","tex":"/maps/rotor-1-tex.webp","spin":-1}, ...]'
//     data-industrial='{"name":"<from the sim index>","bands":[{"tex":"...","r":1925,"g":"0.35 to 0.45 g"}, ...],"spin":-1}'
//     data-steps="/maps/unroll-1-steps.webp"
//     data-pins='[{"s":1200,"a":900,"h":625,"g":0.75,"l":"0.75 g"}, {"f":1,"s":4000,"a":1200,"h":0}]'
//     data-skip="#rotor-1"  data-captions='["...x6"]'>
//     <img src="/maps/unroll-1-steps.webp" alt="...">   <!-- no-JS, reduced-motion, no-WebGL and print fallback -->
//     <figcaption>...</figcaption>
//   </figure>
//   Rotor entry:  n (1..4), name, tex (4096 x 652 plan raster), spin (+1 or -1, HABITATION_ROTOR_SPIN), optional x (rotor
//                 centre on the station axis, m; default -7800, -5000, -2200, 600), R (2500), len (2500), pins, omega.
//   Industrial:   name, bands[] outer first {tex, r (mid-band radius, m), g (label), len?}, spin, len (3500), x (4500), omega.
//   Pins:         array (applies to the first rotor) or object keyed "1".."4"/"industrial", or `pins` inside an entry. A pin is
//                 {s, a, h, g, l?, f?, b?}: s metres along the plan from the seam (0..circumference), a metres from the aft end,
//                 h height above the floor, g gravity there, l optional label shown while the stalks stand, f:1 draws the
//                 little standing figure instead of a stalk, b band index (industrial). Without data-pins nothing is drawn.
//   Tracks:       if the figure sits inside an element with [data-unroll-track] (a tall block, figure position: sticky) the
//                 sequence follows the scroll position through that block. Otherwise it plays once when half visible.
// EXPORTS  mountUnroll(el) -> controller; showRotor(n | 'industrial', {fast, instant}) (acts on the first mounted figure; instant skips the travelling).
// EVENTS (bubble from the figure)
//   unroll:handoff  {key, rects:[{x,y,w,h}]}  at t = 1: the map is flat. rects are fractions of the canvas box (0..1), one per
//                   layer (industrial: three strips), so the page can place its live SVG over exactly the last frame.
//   unroll:start    {key}                     the sequence left the flat state (fade the SVG out, show the canvas).
// ATTRIBUTE  figure[data-state] = idle | playing | flat | static (static: fallback strip shown, no canvas).
// Controller (also el.__unroll): seek(tau), play(), showRotor(), capture(tau, {w,h,plain,state}), loaded() (promise), bench(w,h,n), state(), T, BEATS, key.

const PI = Math.PI;
export const T = 6.4; // seconds of the full sequence
export const BEATS = [0, 1.0, 2.2, 3.0, 5.0, 5.9]; // drum, up is inward, the cut, the unroll, the join, hand-off
export const FOV = 26 * PI / 180;
const PSI0 = 84 * PI / 180, PITCH0 = 16 * PI / 180; // camera yaw off the flat view, pitch above the floor normal's horizon
const OMEGA = 0.0626, IND_OMEGA = 0.044; // rad/s, real rates (src/physics.ts)
const CENTERS = { 1: -7800, 2: -5000, 3: -2200, 4: 600, industrial: 4500 }; // rotor centres on the station axis (m)
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const seg = (x, a, b) => clamp((x - a) / (b - a));
const sm = (x) => (x = clamp(x)) * x * (3 - 2 * x);
const lerp = (a, b, t) => a + (b - a) * t;

// ---------------------------------------------------------------------------------------------------------- geometry
/** Arc-length-preserving bend, in the bend frame: floor arc length s from the fixed line, curvature k = (1 - t) / R.
 *  Returns [X, Z] = [sin(ks)/k, (1 - cos(ks))/k]; the small |ks| series covers k -> 0 (t = 1 gives exactly [s, 0]). */
export function bend(s, k) {
  const x = k * s;
  if (Math.abs(x) < 0.01) { const q = x * x; return [s * (1 - q / 6 + q * q / 120), k * s * s * 0.5 * (1 - q / 12 + q * q / 360)]; }
  return [Math.sin(x) / k, (1 - Math.cos(x)) / k];
}
/** Floor point [X, Y, Z] for arc length s, axial position a, progress t, radius R (Y is the axis, Z is the floor normal at s = 0). */
export function bendPoint(s, a, t, R) { const [x, z] = bend(s, (1 - t) / R); return [x, a, z]; }
/** Unit normal of the floor, pointing inward (toward the axis, "up"). */
export function bendNormal(s, t, R) { const x = (1 - t) / R * s; return [-Math.sin(x), 0, Math.cos(x)]; }

// ---------------------------------------------------------------------------------------------------------- layouts
const J = (s, f) => { try { return s ? JSON.parse(s) : f; } catch { return f; } };
const km = (m) => (m / 1000).toFixed(1);

function layer(url, R, len, g) { return { url, R, L: 2 * PI * R, len, g, flat: 0 }; }
function layout(key, name, label, spin, omega, cx, layers, pins) {
  const gap = layers.length > 1 ? 0.1 * layers[0].len : 0;
  const total = layers.reduce((a, l) => a + l.len, 0) + gap * (layers.length - 1);
  let y = total / 2;
  for (const l of layers) { l.flat = y - l.len / 2; y -= l.len + gap; }
  return { key, name, label, spin, omega, cx, layers, pins, Rmax: Math.max(...layers.map((l) => l.R)), len: Math.max(...layers.map((l) => l.len)), flatW: Math.max(...layers.map((l) => l.L)), flatH: total };
}
function readLayouts(el) {
  const D = el.dataset, out = new Map(), pinsAll = J(D.pins, null);
  const pick = (key, own) => own || (Array.isArray(pinsAll) ? (out.size === 0 ? pinsAll : []) : pinsAll && pinsAll[key]) || [];
  for (const r of J(D.rotors, [])) {
    const key = String(r.n);
    out.set(key, layout(key, r.name || `Rotor ${r.n}`, `${r.name || 'Rotor'} (Rotor ${r.n})`, r.spin || -1, r.omega || OMEGA, r.x ?? CENTERS[key] ?? 0,
      [layer(r.tex, r.R || 2500, r.len || 2500)], pick(key, r.pins)));
  }
  const ind = J(D.industrial, null);
  if (ind && ind.bands) {
    const len = ind.len || 3500;
    out.set('industrial', layout('industrial', ind.name || 'Industrial rotor', `${ind.name || 'Industrial'} (the industrial rotor)`, ind.spin || -1, ind.omega || IND_OMEGA, ind.x ?? CENTERS.industrial,
      ind.bands.map((b) => layer(b.tex, b.r, b.len || len, b.g)), pick('industrial', ind.pins)));
  }
  return out;
}
export function captionsFor(lay, custom) {
  const hab = lay.layers.length === 1, l0 = lay.layers[0];
  const base = hab ? [
    `Each rotor is a city on the inside of a drum ${km(2 * l0.R)} km across.`,
    'Gravity pulls outward, so up points at the axis.',
    'Cut the floor along one street...',
    `...and lay it flat: a strip ${km(l0.L)} km long and ${km(l0.len)} km wide.`,
    'The left and right edges are the same street.',
    'Now the map is live: every pin is a view you can open.',
    `${lay.label}: a drum ${km(2 * l0.R)} km across, unrolled to ${km(l0.L)} km by ${km(l0.len)} km.`,
  ] : [
    `${lay.name}, the industrial rotor, is three drums nested one inside another.`,
    `Up is inward here too: weight falls from ${lay.layers[0].g || 'the rim'} on the outer band to ${lay.layers[lay.layers.length - 1].g || 'almost nothing'} on the inner one.`,
    'Cut each drum along one line...',
    `...and lay them flat: strips ${lay.layers.map((l) => km(l.L)).join(', ').replace(/, ([^,]*)$/, ' and $1')} km around, all ${km(l0.len)} km long.`,
    'Each strip closes on itself: its left and right edges are the same line.',
    'Now the drawing is live: every pin is a view you can open.',
    `${lay.label}: three drums, unrolled to three strips.`,
  ];
  return Array.isArray(custom) && custom.length === 6 ? [...custom, base[6]] : base;
}

// ---------------------------------------------------------------------------------------------------------- timelines
// A state S = {ly, t (unroll 0..1), dphi (spin angle, rad), grow, cut, join, arc, fade, cy, zoom, alpha, cap}; the renderer is a pure function of S.
function spinPhase(ly, tau, stop) { // material angle: spins at the real rate, eases to rest at `stop`, ends exactly at zero
  const e1 = 1.0, span = stop - e1;
  const E = (x) => (x <= e1 ? x : e1 + 0.5 * (Math.min(x, stop) - e1) + 0.5 * span / PI * Math.sin(PI * (Math.min(x, stop) - e1) / span));
  return -ly.spin * ly.omega * (E(tau) - E(stop));
}
export function mainState(ly, tau) {
  const t = sm(seg(tau, BEATS[3], BEATS[4]));
  let cap = 0; BEATS.forEach((b, i) => { if (tau >= b - 1e-9) cap = i; });
  return { ly, t, dphi: spinPhase(ly, tau, BEATS[2]), grow: sm(seg(tau, 1.0, 2.0)) * (1 - sm(seg(tau, 5.6, 6.2))), cut: seg(tau, BEATS[2], 2.9) * (1 - sm(seg(tau, 5.9, 6.4))), join: sm(seg(tau, 4.6, 5.2)) * (1 - sm(seg(tau, 5.9, 6.4))),
    arc: seg(tau, 5.0, 5.7) * (1 - sm(seg(tau, 5.9, 6.4))), cy: ly.cx, zoom: 1, alpha: 1, cap, tau };
}
const TAB = [0.35, 0.65, 1.2]; // roll back, slide, unroll (about 1.2 s)
function tabState(a, b, t0, tau) {
  const sl = sm(seg(tau, TAB[0], TAB[1])), ly = tau < 0.5 ? a : b;
  const dist = Math.abs(a.cx - b.cx);
  const t = tau < TAB[0] ? t0 * (1 - sm(tau / TAB[0])) : tau < TAB[1] ? 0 : sm(seg(tau, TAB[1], TAB[2]));
  return { ly, t, dphi: -b.spin * b.omega * 0.3 * (1 - sm(seg(tau, 0.5, 0.95))), grow: 0, cut: 0, join: 0, arc: 0, cy: lerp(a.cx, b.cx, sl),
    zoom: 1 + 0.25 * Math.sin(PI * seg(tau, TAB[0], TAB[1])) * clamp(dist / 5000, 0.3, 1.2), alpha: tau < TAB[0] || tau > TAB[1] ? 1 : 0.2 + 0.8 * Math.abs(1 - 2 * sl), cap: 6, tau };
}
function fitFor(ly, aspect) { // visible height (m) at the focal plane for the drum and for the flat map
  const rm = ly.Rmax;
  return { Hd: Math.max((ly.len * Math.cos(PITCH0) + 2 * rm * Math.sin(PITCH0)) * 1.15, 2 * rm * 1.15 / aspect) * (ly.layers.length > 1 ? 1.1 : 1),
    Hf: Math.max(ly.flatH * 1.04 / 0.84, ly.flatW * 1.04 / aspect) }; // flat: 4 percent margin, the bottom 16 percent is the caption's
}
const LIFT = 0.04; // the flat map sits this fraction of the canvas height above centre
// ---------------------------------------------------------------------------------------------------------- matrices
function mat(aspect, near, far) { const f = 1 / Math.tan(FOV / 2); return [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) / (near - far), -1, 0, 0, 2 * far * near / (near - far), 0]; }
function look(p, t) { // up is +Y (the plan's forward direction)
  const f = norm(t.map((v, i) => v - p[i])), r = norm(cross(f, [0, 1, 0])), u = cross(r, f);
  return [r[0], u[0], -f[0], 0, r[1], u[1], -f[1], 0, r[2], u[2], -f[2], 0, -dot(r, p), -dot(u, p), dot(f, p), 1];
}
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a) => { const l = Math.hypot(...a) || 1; return a.map((v) => v / l); };
function mul(a, b) { const o = new Array(16); for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3]; return o; }
function camera(S, aspect) {
  const ly = S.ly, t = S.t, fit = fitFor(ly, aspect), sw = sm(t / 0.55);
  const H = Math.exp(lerp(Math.log(fit.Hd), Math.log(fit.Hf), sm(t))) * S.zoom * (1 + 0.3 * Math.sin(PI * t)), d = H / (2 * Math.tan(FOV / 2)); // the bump keeps the curled sheet in frame
  const psi = PSI0 * (1 - sw), pit = PITCH0 * (1 - sw);
  const v = [Math.cos(pit) * Math.sin(psi), Math.sin(pit), Math.cos(pit) * Math.cos(psi)];
  const tg = [0, S.cy - (0.09 - 0.05 * sw) * H, ly.Rmax * (1 - sm(t / 0.7))]; // the drum rides a little high, clear of the caption
  let pos = tg.map((x, i) => x + v[i] * d), vp = mul(mat(aspect, d * 0.1, d * 6), look(pos, tg));
  const l0 = ly.layers[0], k = (1 - t) / l0.R, z0 = (ly.Rmax - l0.R) * (1 - t); // pan so the visible part of the sheet is centred
  let lo = 9, hi = -9;
  for (let i = 0; i <= 16; i++) {
    const s = (i / 16 - 0.5) * l0.L, [x, z] = bend(s, k), n = [-Math.sin(k * s), 0, Math.cos(k * s)], p = [x, S.cy, z0 + z];
    if (dot(n, norm(pos.map((c, j) => c - p[j]))) < 0.05) continue;
    const q = project(vp, p, 2, 2)[0] - 1; lo = Math.min(lo, q); hi = Math.max(hi, q);
  }
  if (hi > lo) {
    const r = norm(cross(tg.map((c, j) => c - pos[j]), [0, 1, 0])), sh = (lo + hi) / 2 * (H * aspect / 2);
    pos = pos.map((c, j) => c + r[j] * sh); tg[0] += r[0] * sh; tg[1] += r[1] * sh; tg[2] += r[2] * sh; vp = mul(mat(aspect, d * 0.1, d * 6), look(pos, tg));
  }
  return { vp, pos, d, H };
}
const project = (vp, p, w, h) => { const x = vp[0] * p[0] + vp[4] * p[1] + vp[8] * p[2] + vp[12], y = vp[1] * p[0] + vp[5] * p[1] + vp[9] * p[2] + vp[13], q = vp[3] * p[0] + vp[7] * p[1] + vp[11] * p[2] + vp[15]; return [(x / q * 0.5 + 0.5) * w, (1 - (y / q * 0.5 + 0.5)) * h]; };
/** Fractions of the canvas box covered by each flat layer in the final frame (the page places its SVG on these). */
export function flatRects(ly, aspect) {
  const H = fitFor(ly, aspect).Hf, W = H * aspect;
  return ly.layers.map((l) => ({ x: 0.5 - l.L / 2 / W, y: 0.5 - LIFT - (l.flat + l.len / 2) / H, w: l.L / W, h: l.len / H }));
}

// ---------------------------------------------------------------------------------------------------------- shaders
const VS = `#version 300 es
precision highp float;
in vec2 aUV;uniform mat4 uVP;uniform vec4 uA;uniform vec2 uB;out vec3 vW,vN;out vec2 vUV,vT;
vec2 bend(float s,float k){float x=k*s;if(abs(x)<.01){float q=x*x;return vec2(s*(1.-q/6.+q*q/120.),k*s*s*.5*(1.-q/12.+q*q/360.));}return vec2(sin(x),1.-cos(x))/k;}
void main(){float s=(aUV.x-.5)*uA.y,x=uA.x*s;vec2 b=bend(s,uA.x);vec3 p=vec3(b.x,uB.x+aUV.y*uA.z,uB.y+b.y);
vW=p;vN=vec3(-sin(x),0.,cos(x));vUV=aUV;vT=vec2(aUV.x-uA.w,1.-aUV.y);gl_Position=uVP*vec4(p,1.);}`;
const FS = `#version 300 es
precision highp float;
in vec3 vW,vN;in vec2 vUV,vT;uniform sampler2D uTex;uniform vec3 uCam;uniform vec4 uF,uG;out vec4 o;
void main(){vec3 n=normalize(vN);float fc=dot(n,normalize(uCam-vW));if(fc<0.)discard;
vec3 c;if(uF.x>.5)c=texture(uTex,vT).rgb;else{vec2 g=vUV*uG.yz/1000.;vec2 f=abs(fract(g-.5)-.5)/fwidth(g);c=mix(vec3(.2,.28,.33),vec3(.07,.11,.14),min(min(f.x,f.y),1.));}
float sh=(.4+.6*smoothstep(0.,.5,fc))*(.8+.2*sin(3.14159*vUV.y));c*=mix(1.,sh,uF.y);
float ey=min(vUV.y,1.-vUV.y)*uG.z;c=mix(c,vec3(.61,.85,.91),(1.-smoothstep(0.,2.2*fwidth(ey)+1e-4,ey))*.5*uF.y);
float ds=min(vUV.x,1.-vUV.x)*uG.y,w=fwidth(ds)+1e-5,m=1.-smoothstep(uG.x*1.02-.02,uG.x*1.02,vUV.y);
float sg=(1.-smoothstep(0.,2.6*w,ds))*m,ha=(1.-smoothstep(0.,18.*w,ds))*m*.3;
c=min(c+vec3(1.,.78,.36)*(sg*1.1+ha)*(.8+.4*uF.w),1.);o=vec4(c*uF.z,uF.z);}`;
const LVS = `#version 300 es
precision highp float;
in vec2 aC;in vec3 iA,iB;in vec4 iC;in float iW;uniform mat4 uVP;uniform vec2 uRes;out vec4 vC;out vec2 vL;out vec2 vS;
void main(){vec4 a=uVP*vec4(iA,1.),b=uVP*vec4(iB,1.);vec2 pa=(a.xy/a.w*.5+.5)*uRes,pb=(b.xy/b.w*.5+.5)*uRes,d=pb-pa;float len=length(d);
vec2 dir=len>1e-3?d/len:vec2(1.,0.),nr=vec2(-dir.y,dir.x);float hw=iW*.5+1.,al=aC.x>.5?len+hw:-hw;
vec2 px=pa+dir*al+nr*aC.y*hw;gl_Position=vec4(px/uRes*2.-1.,mix(a.z/a.w,b.z/b.w,aC.x),1.);vC=iC;vL=vec2(al,aC.y*hw);vS=vec2(len,iW);}`;
const LFS = `#version 300 es
precision highp float;
in vec4 vC;in vec2 vL,vS;out vec4 o;
void main(){float d=length(vec2(vL.x-clamp(vL.x,0.,vS.x),vL.y));float a=1.-smoothstep(vS.y*.5-.5,vS.y*.5+.5,d);o=vec4(vC.rgb*vC.a*a,vC.a*a);}`;

const GRID = [256, 32], MAXL = 2048, LF = 11;
const gcol = (g) => (g >= 0.9 ? [0.91, 0.72, 0.42] : g >= 0.7 ? [0.78, 0.84, 0.47] : g >= 0.45 ? [0.47, 0.81, 0.71] : g >= 0.2 ? [0.61, 0.85, 0.91] : [0.75, 0.71, 1]);

const CSS = `.map-unroll{position:relative;margin:0}.unroll-stage{position:relative;aspect-ratio:2/1;background:radial-gradient(ellipse at 50% 40%,#10202a,#060b0e 70%);border-radius:var(--radius,10px);overflow:hidden}
.unroll-stage canvas,.unroll-arc{position:absolute;inset:0;width:100%;height:100%;display:block}.unroll-arc{pointer-events:none}
.unroll-arc path{fill:none;stroke:#f2c76e;stroke-width:2.5;stroke-dasharray:7 6;stroke-linecap:round}
.unroll-cap{position:absolute;left:0;right:0;bottom:0;margin:0;padding:34px 16px 12px;text-align:center;color:#e6eef0;font:500 clamp(14px,2.3vw,19px)/1.35 var(--font-head,system-ui,sans-serif);text-wrap:balance;background:linear-gradient(transparent,rgba(6,11,14,.88))}
.unroll-lbl{position:absolute;left:0;top:0;padding:1px 6px;border-radius:4px;font:600 12px/1.3 var(--font-mono,monospace);color:#06222b;background:#e8b86a;white-space:nowrap;pointer-events:none;opacity:0;will-change:transform}
.unroll-g{background:var(--accent,#9cdae9)}.unroll-ctl{display:flex;align-items:center;gap:12px;padding:10px 0;font:14px var(--font-body,system-ui,sans-serif);color:var(--muted,#9fb3ba)}
.unroll-ctl button{font:inherit;font-weight:600;padding:6px 14px;border-radius:999px;border:1px solid var(--accent,#9cdae9);background:transparent;color:var(--accent,#9cdae9);cursor:pointer}.unroll-ctl button:focus-visible,.unroll-ctl input:focus-visible,.unroll-ctl a:focus-visible{outline:2px solid var(--accent-2,#e8b86a);outline-offset:2px}
.unroll-ctl input{flex:1;min-width:0;accent-color:var(--accent,#9cdae9)}.unroll-ctl a{color:inherit;white-space:nowrap}
.unroll-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.unroll-steps{margin:8px 0 0;padding-left:1.2em;color:var(--muted,#9fb3ba);font-size:14px}
@media(max-width:640px){.unroll-stage{aspect-ratio:4/3}}@media print{.unroll-stage,.unroll-ctl{display:none}.map-unroll img{display:block!important}}`;

function h(tag, props, ...kids) { const n = document.createElement(tag); Object.assign(n, props); n.append(...kids); return n; }

// ---------------------------------------------------------------------------------------------------------- the widget
const mounted = [];
export function mountUnroll(el) {
  if (el.__unroll) return el.__unroll;
  const layouts = readLayouts(el), keys = [...layouts.keys()], img = el.querySelector('img');
  const reduce = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  let key = keys[0], fn = null, tau = 0, dur = T, playing = false, dirty = true, live = false, started = false, raf = 0, last = 0;
  let gl, cv, sizeOverride = null, wasFlat = false, lowW = 0, lowH = 0, dpr = 1;
  const ctl = { el, T, BEATS, loaded, get key() { return key; }, layouts, seek, play, showRotor, capture, bench, state: () => fn(tau) };
  el.__unroll = ctl; mounted.push(ctl);
  if (!layouts.size) return fallback();
  const customCaps = J(el.dataset.captions, null), capsFor = (ly) => captionsFor(ly, customCaps);
  const setMain = (k, at) => { key = k; fn = (x) => mainState(layouts.get(k), x); dur = T; tau = at; };
  setMain(key, 0);
  if (reduce) return fallback(true);

  if (!document.getElementById('unroll-css')) { const st = document.head.appendChild(h('style', { id: 'unroll-css' })); st.textContent = CSS; }
  const stage = h('div', { className: 'unroll-stage' }), arcs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  arcs.setAttribute('class', 'unroll-arc'); arcs.setAttribute('aria-hidden', 'true');
  const cap = h('p', { className: 'unroll-cap' }), lbls = h('div', { ariaHidden: 'true' });
  cv = h('canvas', {}); cv.setAttribute('role', 'img'); cv.setAttribute('aria-label', (img && img.alt) || 'A rotor floor plan unrolling from a drum into a flat map.');
  stage.append(cv, arcs, lbls, cap);
  const btn = h('button', { type: 'button', textContent: 'Play' }), rng = h('input', { type: 'range', min: 0, max: 1000, value: 0, ariaLabel: 'Unroll progress' });
  const ctrl = h('div', { className: 'unroll-ctl' }, btn, rng);
  if (el.dataset.skip) ctrl.append(h('a', { href: el.dataset.skip, textContent: 'Skip to the live map' }));
  const sr = h('ol', { className: 'unroll-sr' });
  el.prepend(stage, ctrl, sr); // the fallback <img> and figcaption stay in the DOM, the image hidden while the canvas runs
  const refreshSr = () => { sr.replaceChildren(...capsFor(layouts.get(key)).slice(0, 6).map((c) => h('li', { textContent: c }))); };
  refreshSr();
  const track = el.closest('[data-unroll-track]');

  // ---- WebGL
  let progL, progS, vaoS, vaoL, lineBuf, lineData = new Float32Array(MAXL * LF), nLines = 0, ib, texs = new Map(), ui = {};
  function initGL() {
    gl = cv.getContext('webgl2', { antialias: true, alpha: true, premultipliedAlpha: true, powerPreference: 'high-performance' });
    if (!gl) return false;
    const prog = (v, f) => { const p = gl.createProgram(); for (const [ty, src] of [[gl.VERTEX_SHADER, v], [gl.FRAGMENT_SHADER, f]]) { const s = gl.createShader(ty); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); gl.attachShader(p, s); } gl.linkProgram(p); if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p)); return p; };
    try { progS = prog(VS, FS); progL = prog(LVS, LFS); } catch (e) { console.warn('unroll: shader failed', e); return false; }
    const loc = (p, ...n) => n.map((x) => gl.getUniformLocation(p, x));
    ui = { s: loc(progS, 'uVP', 'uA', 'uB', 'uTex', 'uCam', 'uF', 'uG'), l: loc(progL, 'uVP', 'uRes') };
    const [nu, nv] = GRID, uv = new Float32Array((nu + 1) * (nv + 1) * 2), idx = new Uint16Array(nu * nv * 6);
    for (let j = 0, o = 0; j <= nv; j++) for (let i = 0; i <= nu; i++, o += 2) { uv[o] = i / nu; uv[o + 1] = j / nv; }
    for (let j = 0, o = 0; j < nv; j++) for (let i = 0; i < nu; i++, o += 6) { const a = j * (nu + 1) + i, b = a + 1, c = a + nu + 1, d = c + 1; idx.set([a, b, c, b, d, c], o); }
    vaoS = gl.createVertexArray(); gl.bindVertexArray(vaoS);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, uv, gl.STATIC_DRAW);
    const a = gl.getAttribLocation(progS, 'aUV'); gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
    ib = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
    vaoL = gl.createVertexArray(); gl.bindVertexArray(vaoL);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, -1, 1, -1, 0, 1, 1, 1]), gl.STATIC_DRAW);
    const ac = gl.getAttribLocation(progL, 'aC'); gl.enableVertexAttribArray(ac); gl.vertexAttribPointer(ac, 2, gl.FLOAT, false, 0, 0);
    lineBuf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, lineBuf); gl.bufferData(gl.ARRAY_BUFFER, lineData.byteLength, gl.DYNAMIC_DRAW);
    [['iA', 3, 0], ['iB', 3, 3], ['iC', 4, 6], ['iW', 1, 10]].forEach(([n, sz, off]) => { const l = gl.getAttribLocation(progL, n); gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l, sz, gl.FLOAT, false, LF * 4, off * 4); gl.vertexAttribDivisor(l, 1); });
    cv.addEventListener('webglcontextlost', (e) => { e.preventDefault(); live = false; });
    cv.addEventListener('webglcontextrestored', () => { texs = new Map(); initGL(); live = true; dirty = true; kick(); });
    return true;
  }
  function tex(url) {
    if (!url) return null;
    let t = texs.get(url); if (t) { t.use = ++tick; return t; }
    t = { url, ready: false, use: ++tick, h: gl.createTexture() }; texs.set(url, t);
    const im = new Image(); im.decoding = 'async';
    const up = () => { // decoded off the main thread first, so the upload itself is short
      if (!texs.has(url)) return;
      gl.bindTexture(gl.TEXTURE_2D, t.h); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im); gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const an = gl.getExtension('EXT_texture_filter_anisotropic'); if (an) gl.texParameterf(gl.TEXTURE_2D, an.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(8, gl.getParameter(an.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));
      t.ready = true; dirty = true; kick();
    };
    im.src = url; im.decode().then(up, () => { t.failed = true; });
    while (texs.size > 5) { const old = [...texs.values()].sort((a, b) => a.use - b.use)[0]; if (old === t) break; gl.deleteTexture(old.h); texs.delete(old.url); }
    return t;
  }
  let tick = 0;
  function loaded() { return new Promise((res) => { // resolves when the current layout's textures are in (or failed)
    const t = () => { const ls = layouts.get(key).layers; if (live) ls.forEach((l) => tex(l.url)); if (live && ls.every((l) => { const x = texs.get(l.url); return !l.url || (x && (x.ready || x.failed)); })) res(true); else setTimeout(t, 40); };
    t();
  }); }

  // ---- frame
  function size() {
    const w = sizeOverride ? sizeOverride[0] : stage.clientWidth, hh = sizeOverride ? sizeOverride[1] : stage.clientHeight;
    dpr = sizeOverride ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    const pw = Math.max(2, Math.round(w * dpr)), ph = Math.max(2, Math.round(hh * dpr));
    if (cv.width !== pw || cv.height !== ph) { cv.width = pw; cv.height = ph; }
    lowW = w; lowH = hh;
  }
  const wrap = (x, L) => ((((x + L / 2) % L) + L) % L) - L / 2;
  function lp(S, l) { return { k: (1 - S.t) / l.R, ax: S.cy - l.len / 2 + l.flat * sm(seg(S.t, 0.25, 0.9)), z: (S.ly.Rmax - l.R) * (1 - S.t) }; }
  function surf(S, l, s, a, hgt) { // world point of plan position (s from the seam, a) at height hgt
    const { k, ax, z } = lp(S, l), sc = wrap(s - l.L / 2 + S.dphi * l.R, l.L), [x, zz] = bend(sc, k), n = [-Math.sin(k * sc), 0, Math.cos(k * sc)];
    return { p: [x + n[0] * hgt, ax + a, z + zz + n[2] * hgt], n, sc };
  }
  function line(a, b, c, w) { if (nLines >= MAXL) return; lineData.set([a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2], c[3], w], nLines++ * LF); }
  function render(S = fn(tau), plain = false) {
    if (!live || !gl) return;
    size(); const aspect = lowW / lowH, cm = camera(S, aspect), W = cv.width, Hh = cv.height, ly = S.ly, g1 = plain ? 0 : 1;
    gl.viewport(0, 0, W, Hh); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST); gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); gl.enable(gl.POLYGON_OFFSET_FILL); gl.polygonOffset(2, 4);
    gl.useProgram(progS); gl.bindVertexArray(vaoS);
    gl.uniformMatrix4fv(ui.s[0], false, cm.vp); gl.uniform3fv(ui.s[4], cm.pos);
    for (const l of ly.layers) {
      const q = lp(S, l), tx = tex(l.url);
      gl.uniform4f(ui.s[1], q.k, l.L, l.len, S.dphi / (2 * PI)); gl.uniform2f(ui.s[2], q.ax, q.z);
      gl.uniform4f(ui.s[5], tx && tx.ready ? 1 : 0, 1 - sm(seg(S.t, 0.7, 1)), S.alpha, S.join * g1); gl.uniform4f(ui.s[6], S.cut * g1, l.L, l.len, 0);
      if (tx && tx.ready) { gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tx.h); gl.uniform1i(ui.s[3], 0); }
      gl.drawElements(gl.TRIANGLES, GRID[0] * GRID[1] * 6, gl.UNSIGNED_SHORT, 0);
    }
    // lines: ghost rings of the other rotors, the axis light, stalks, the standing figure
    nLines = 0; const drum = 1 - sm(S.t / 0.2), zc = ly.Rmax;
    if (drum > 0.01 && !plain) {
      const spine = [0.61, 0.85, 0.91, 0.22 * drum];
      line([0, -9500, zc], [0, 6500, zc], spine, 1);
      for (const [kk, cx] of Object.entries(CENTERS)) for (const e of [-1, 1]) {
        const half = (kk === 'industrial' ? 1750 : 1250) * e, R = kk === 'industrial' ? 2150 : 2500;
        for (let i = 0; i < 48; i++) { const a0 = i / 48 * 2 * PI, a1 = (i + 1) / 48 * 2 * PI; line([R * Math.sin(a0), cx + half, zc - R * Math.cos(a0)], [R * Math.sin(a1), cx + half, zc - R * Math.cos(a1)], [0.61, 0.85, 0.91, 0.2 * drum], 1); }
      }
      const q0 = lp(S, ly.layers[0]), axz = q0.z + 1 / q0.k;
      line([0, S.cy - ly.len / 2, axz], [0, S.cy + ly.len / 2, axz], [1, 0.95, 0.8, 0.6 * drum * S.alpha], 3);
    }
    const wpp = cm.H / lowH; // metres per CSS pixel at the focal plane
    const labels = [];
    if (S.grow > 0.001 && !plain) for (const pin of ly.pins) {
      const l = ly.layers[pin.b || 0] || ly.layers[0], base = surf(S, l, pin.s, pin.a, 0), n = base.n, c = gcol(pin.g ?? 1), al = 0.95 * S.alpha;
      if (dot(n, norm(cm.pos.map((v, i) => v - base.p[i]))) < 0.02) continue; // far side of the drum or hidden behind the shell
      if (pin.f) { // the standing figure: head toward the axis, 30 px tall
        const u = 30 * wpp, tg = [Math.cos(base.sc * lp(S, l).k), 0, Math.sin(base.sc * lp(S, l).k)], at = (f, sd) => base.p.map((v, i) => v + n[i] * u * f + tg[i] * u * sd), w = 2.6 * dpr, fc = [1, 1, 1, al * S.grow];
        line(base.p, at(0.62, 0), fc, w); line(base.p, at(0.34, 0.16), fc, w); line(base.p, at(0.34, -0.16), fc, w); line(at(0.5, 0.2), at(0.5, -0.2), fc, w); line(at(0.88, 0), at(0.88, 0), fc, 7 * dpr);
      } else {
        const tip = surf(S, l, pin.s, pin.a, pin.h * S.grow).p; line(base.p, tip, [c[0], c[1], c[2], al], 2.4 * dpr); line(tip, tip, [c[0], c[1], c[2], al], 7 * dpr);
        if (pin.l) labels.push([tip, pin.l, 0]);
      }
    }
    if (ly.layers.length > 1 && !plain) ly.layers.forEach((l, i) => l.g && labels.push([surf(S, l, 0, l.len, 0).p, l.g, 1 - sm(seg(S.tau, 5.9, 6.4))]));
    if (nLines) {
      gl.useProgram(progL); gl.bindVertexArray(vaoL); gl.uniformMatrix4fv(ui.l[0], false, cm.vp); gl.uniform2f(ui.l[1], W, Hh);
      gl.bindBuffer(gl.ARRAY_BUFFER, lineBuf); gl.bufferSubData(gl.ARRAY_BUFFER, 0, lineData.subarray(0, nLines * LF)); gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, nLines);
    }
    // DOM overlay: pin labels, join arcs, caption, controls
    while (lbls.children.length < 8) lbls.append(h('div', { className: 'unroll-lbl' }));
    [...lbls.children].forEach((n, i) => {
      const L = labels[i]; if (!L) { n.style.opacity = 0; return; }
      const [x, y] = project(cm.vp, L[0], lowW, lowH), g = L[2] > 0; n.textContent = L[1]; n.className = g ? 'unroll-lbl unroll-g' : 'unroll-lbl';
      n.style.opacity = g ? sm(seg(S.t, 0.35, 0.7)) * L[2] : clamp(S.grow * 2 - 1) * (1 - sm(S.t / 0.2)); n.style.transform = g ? `translate(${x + 6}px,${y + 6}px)` : `translate(${x + 6}px,${y - 22}px)`;
    });
    arcDraw(S, cm);
    cap.textContent = capsFor(ly)[S.cap]; rng.value = Math.round(tau / dur * 1000);
    const flat = !fn.tab && tau >= dur - 1e-6;
    el.dataset.state = playing ? 'playing' : flat ? 'flat' : 'idle';
    if (flat && !wasFlat && !sizeOverride) fire('unroll:handoff', { key, rects: flatRects(ly, aspect) });
    if (!flat && wasFlat && !sizeOverride) fire('unroll:start', { key });
    wasFlat = flat;
  }
  function arcDraw(S, cm) {
    const ly = S.ly; while (arcs.children.length < ly.layers.length) arcs.append(document.createElementNS('http://www.w3.org/2000/svg', 'path'));
    [...arcs.children].forEach((pth, i) => {
      const l = ly.layers[i]; if (!l || S.arc <= 0.001) { pth.setAttribute('d', ''); return; }
      const a = project(cm.vp, surf(S, l, 0, l.len / 2, 0).p, lowW, lowH), b = project(cm.vp, surf(S, l, l.L - 1e-3, l.len / 2, 0).p, lowW, lowH);
      const up = clamp(0.2 * Math.hypot(b[0] - a[0], b[1] - a[1]), 6, Math.max(8, 0.75 * l.len / cm.H * lowH + 20)), c = [(a[0] + b[0]) / 2, Math.min(a[1], b[1]) - 2 * up], u = Math.min(1, S.arc * 1.4);
      const q = [lerp(a[0], c[0], u), lerp(a[1], c[1], u)], e = [lerp(lerp(a[0], c[0], u), lerp(c[0], b[0], u), u), lerp(lerp(a[1], c[1], u), lerp(c[1], b[1], u), u)];
      pth.setAttribute('d', `M${a[0]} ${a[1]}Q${q[0]} ${q[1]} ${e[0]} ${e[1]}`); pth.style.opacity = Math.min(1, S.arc * 3);
    });
  }
  const fire = (name, detail) => el.dispatchEvent(new CustomEvent(name, { detail, bubbles: true }));

  // ---- control
  function loop(now) {
    raf = 0; if (!live) return;
    if (playing) { tau = Math.min(dur, tau + Math.min(0.05, (now - last) / 1000)); dirty = true; if (tau >= dur) { playing = false; finish(); } }
    last = now; if (dirty) { dirty = false; render(); }
    if (playing || dirty) raf = requestAnimationFrame(loop);
  }
  function kick() { if (live && !raf) { last = performance.now(); raf = requestAnimationFrame(loop); } }
  function finish() { if (fn.tab) { const k = fn.next; setMain(k, T); refreshSr(); } btn.textContent = 'Replay'; dirty = true; }
  function seek(x) { tau = clamp(x, 0, dur); playing = false; dirty = true; kick(); if (!raf || !live) render(); }
  function play(from = 0) { started = true; if (fn.tab) finish(); tau = from; playing = true; btn.textContent = 'Pause'; kick(); }
  function showRotor(k, o = {}) {
    k = String(k); if (!layouts.has(k)) return;
    const fast = o.fast !== false;
    if (k === key && !fn.tab) { if (!fast) play(); return; }
    if (o.instant || !live || !started || !fast) { // not on screen yet, a full re-run asked for, or an instant jump: no travelling
      setMain(k, fast ? T : 0); refreshSr(); dirty = true; playing = false;
      if (fast) started = true; else if (live) play();
      if (live && fast) render();
      return;
    }
    const cur = fn(tau), next = layouts.get(k);
    key = k; fn = (x) => tabState(cur.ly, next, cur.t, x); fn.tab = true; fn.next = k; dur = TAB[2]; tau = 0; playing = true; refreshSr(); kick();
  }
  btn.addEventListener('click', () => { if (playing) { playing = false; btn.textContent = 'Play'; } else play(tau >= dur - 1e-6 || fn.tab ? 0 : tau); });
  rng.addEventListener('input', () => { if (fn.tab) finish(); seek(rng.value / 1000 * dur); btn.textContent = tau >= dur - 1e-6 ? 'Replay' : 'Play'; });
  const onScroll = () => { if (!track || !live) return; const r = track.getBoundingClientRect(), p = clamp(-r.top / Math.max(1, r.height - innerHeight)); started = true; if (fn.tab) finish(); seek((p > 0.995 ? 1 : p < 0.005 ? 0 : p) * T); }; // the ends snap, so a fractional pixel short of the end still hands off
  if (track) addEventListener('scroll', onScroll, { passive: true });
  new ResizeObserver(() => { dirty = true; kick(); }).observe(stage);

  async function capture(x, o = {}) { // a frame as a data URL at an exact size (the steps and Open Graph captures)
    await loaded(); sizeOverride = [o.w || 960, o.h || 480]; const S = o.state || fn(x); render(S, o.plain);
    const url = cv.toDataURL('image/png'); sizeOverride = null; dirty = true; return url;
  }
  function bench(w, hh, n) { // dev aid: ms per frame including GPU completion, over the whole sequence
    sizeOverride = [w, hh]; const px = new Uint8Array(4); const t0 = performance.now();
    for (let i = 0; i < n; i++) { render(fn(i / n * dur)); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); }
    const ms = (performance.now() - t0) / n; sizeOverride = null; dirty = true; return ms;
  }
  const io = new IntersectionObserver((es) => { // lazy: WebGL starts only when the figure nears the viewport
    const near = es[es.length - 1].isIntersecting;
    if (near && !gl) { if (initGL()) { live = true; if (img) img.hidden = true; el.dataset.state = 'idle'; for (const l of layouts.get(key).layers) tex(l.url); render(); } else { fallback(); io.disconnect(); po.disconnect(); return; } }
    live = !!gl && near && !gl.isContextLost();
    if (!live) { cancelAnimationFrame(raf); raf = 0; playing = false; return; }
    dirty = true; kick();
  }, { rootMargin: '300px 0px' });
  const po = new IntersectionObserver((es) => { // autoplay once when half of it is really on screen (unless scroll drives it)
    if (es[es.length - 1].intersectionRatio >= 0.5 && live && !started && !track) { started = true; play(); }
  }, { threshold: [0.5] });
  io.observe(el); po.observe(el);
  function prefetch() { const c = navigator.connection; if (c && (c.saveData || /2g/.test(c.effectiveType))) return; for (const ly of layouts.values()) for (const l of ly.layers) if (texs.size < 5) tex(l.url); }
  const idle = window.requestIdleCallback || ((f) => setTimeout(f, 2500));
  el.addEventListener('unroll:handoff', () => idle(prefetch), { once: true });
  function fallback(show) {
    el.dataset.state = 'static'; if (img) img.hidden = false;
    if (show) { el.querySelector('.unroll-steps') || el.append(h('ol', { className: 'unroll-steps' }, ...capsFor(layouts.get(key)).slice(0, 6).map((c) => h('li', { textContent: c })))); }
    return ctl;
  }
  return ctl;
}
export function showRotor(key, opts) { const c = mounted[0]; if (c && c.showRotor) c.showRotor(key, opts); }

if (typeof document !== 'undefined') { // the page only includes the module; it mounts every figure.map-unroll
  const go = () => document.querySelectorAll('.map-unroll').forEach((e) => mountUnroll(e));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
}
