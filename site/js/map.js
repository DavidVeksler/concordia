// /map/: pan, zoom, popovers, tabs, hash routes, unroll hand-off (docs/specs/station-map-spec.md 4.3)
(() => {
  var D = document, $ = (s, r) => (r || D).querySelector(s), $$ = (s, r) => [].slice.call((r || D).querySelectorAll(s));
  var nums = (s) => s.split(' ').map(Number), reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var el = (tag, cls, text) => { var n = D.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };
  var frames = [], pop, popFor = null, popTimer = 0, unroll = null;

  function Frame(root, live) {
    var view = $('.map-view', root), stage = $('.map-stage', root), svg = $('.map-pins', root), vb = nums(root.dataset.vb), bd = nums(root.dataset.bounds);
    var maxZ = 12, W = 0, H = 0, k0 = 1, z = 1, tx = 0, ty = 0, ptrs = {}, drag = null, pinch = null, chips = [];
    var self = { live: live };
    root.classList.add('is-live'); root.style.setProperty('--ar', bd[2] / bd[3]);
    function clamp(k) {
      var f = (v, size, b0, bs) => { var c = bs * k; return c <= size ? (size - c) / 2 - b0 * k : Math.min(-b0 * k, Math.max(size - (b0 + bs) * k, v)); };
      tx = f(tx, W, bd[0], bd[2]); ty = f(ty, H, bd[1], bd[3]);
    }
    function apply(recluster) {
      var k = k0 * z; clamp(k);
      stage.style.width = vb[2] * k + 'px'; stage.style.height = vb[3] * k + 'px'; stage.style.transform = 'translate(' + tx + 'px,' + ty + 'px)';
      svg.style.setProperty('--ps', 1 / k); root.toggleAttribute('data-zoomed', z > 1.02);
      if (recluster !== false) cluster();
    }
    function layout() {
      var r = view.getBoundingClientRect(); if (!r.width) return; W = r.width; H = r.height;
      k0 = W < 640 && !live ? H / bd[3] : Math.min(W / bd[2], H / bd[3]);
      if (!self.laidOut) { self.laidOut = true; tx = -bd[0] * k0; ty = -bd[1] * k0; }
      apply();
    }
    function zoomAt(nz, px, py) {
      nz = Math.min(maxZ, Math.max(1, nz)); var k = k0 * z, ux = (px - tx) / k, uy = (py - ty) / k; z = nz; k = k0 * z; tx = px - ux * k; ty = py - uy * k; apply();
    }
    function focusOn(x, y, nz) { z = Math.min(maxZ, nz || Math.max(z, 4)); var k = k0 * z; tx = W / 2 - x * k; ty = H / 2 - y * k; apply(); }
    function cluster() {
      chips.forEach((c) => c.remove()); chips = []; var k = k0 * z, groups = [];
      $$('a.map-pin', svg).forEach((a) => {
        a.style.display = ''; var x = +a.dataset.x * k, y = +a.dataset.y * k;
        var g = groups.filter((g) => Math.abs(g.x - x) < 24 && Math.abs(g.y - y) < 24)[0];
        if (g) g.m.push(a); else groups.push({ x: x, y: y, m: [a] });
      });
      groups.forEach((g) => {
        if (g.m.length < 2) return;
        var cx = g.m.reduce((s, a) => s + +a.dataset.x, 0) / g.m.length, cy = g.m.reduce((s, a) => s + +a.dataset.y, 0) / g.m.length;
        g.m.forEach((a) => a.style.display = 'none');
        var c = D.createElementNS('http://www.w3.org/2000/svg', 'g'); c.setAttribute('class', 'map-chip'); c.setAttribute('role', 'button'); c.setAttribute('tabindex', live ? -1 : 0);
        c.setAttribute('aria-label', g.m.length + ' views here: open the list'); c.setAttribute('transform', 'translate(' + cx + ' ' + cy + ')');
        c.innerHTML = '<g class="map-pin__s"><circle r="13"/><text y="4" text-anchor="middle">' + g.m.length + '</text></g>';
        c.__ids = g.m.map((a) => a.dataset.id); svg.appendChild(c); chips.push(c);
      });
    }
    view.addEventListener('pointerdown', (e) => {
      if (e.button > 0) return; ptrs[e.pointerId] = { x: e.clientX, y: e.clientY };
      var ids = Object.keys(ptrs);
      if (ids.length === 1) drag = { x: e.clientX, y: e.clientY, tx: tx, ty: ty, moved: false };
      else if (ids.length === 2) { var p = ptrs[ids[0]], q = ptrs[ids[1]]; pinch = { d: Math.hypot(p.x - q.x, p.y - q.y), z: z }; drag = null; }
    });
    view.addEventListener('pointermove', (e) => {
      if (!ptrs[e.pointerId]) return; ptrs[e.pointerId] = { x: e.clientX, y: e.clientY }; var ids = Object.keys(ptrs);
      if (ids.length === 2 && pinch) {
        var p = ptrs[ids[0]], q = ptrs[ids[1]], r = view.getBoundingClientRect(); zoomAt(pinch.z * Math.hypot(p.x - q.x, p.y - q.y) / pinch.d, (p.x + q.x) / 2 - r.left, (p.y + q.y) / 2 - r.top);
      } else if (drag) {
        var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        if (!drag.moved && Math.hypot(dx, dy) > 5) { drag.moved = true; try { view.setPointerCapture(e.pointerId); } catch (x) {} closePop(); }
        if (drag.moved) { tx = drag.tx + dx; ty = drag.ty + dy; apply(false); }
      }
    });
    var up = (e) => { delete ptrs[e.pointerId]; pinch = null; drag = null; };
    view.addEventListener('pointerup', up); view.addEventListener('pointercancel', up);
    view.addEventListener('wheel', (e) => {
      if (!(e.ctrlKey || e.metaKey || D.activeElement === root)) return; e.preventDefault();
      var r = view.getBoundingClientRect(); zoomAt(z * Math.exp(-e.deltaY * 0.0016), e.clientX - r.left, e.clientY - r.top);
    }, { passive: false });
    root.addEventListener('keydown', (e) => {
      if (e.target !== root) return; var s = 0.15, m = { ArrowLeft: [s, 0], ArrowRight: [-s, 0], ArrowUp: [0, s], ArrowDown: [0, -s] }[e.key];
      if (m) { tx += m[0] * W; ty += m[1] * H; apply(false); } else if (e.key === '+' || e.key === '=') zoomAt(z * 1.5, W / 2, H / 2); else if (e.key === '-' || e.key === '_') zoomAt(z / 1.5, W / 2, H / 2);
      else if (e.key === '0') reset(); else return; e.preventDefault();
    });
    function reset() { z = 1; self.laidOut = false; layout(); }
    self.layout = layout; self.focusOn = focusOn; self.reset = reset; self.zoomBy = (f) => { zoomAt(z * f, W / 2, H / 2); };
    if (window.ResizeObserver) new ResizeObserver(() => { if (!live) layout(); }).observe(view);
    layout(); frames.push(self); root.__frame = self; return self;
  }

  function closePop() { if (pop) { pop.hidden = true; popFor = null; } }
  function info(id) {
    var li = D.getElementById('vp-' + id); if (!li) return null; var d = li.dataset;
    return { id, title: d.title, meta: d.meta, place: d.place, thumb: d.thumb, scene: d.scene, href: $('.map-item__title', li).getAttribute('href'), blurb: ($('.map-item__blurb', li) || {}).textContent || '' };
  }
  function place(anchor) {
    var host = anchor.closest('[data-map-figure]') || anchor.closest('figure') || D.body, fr = host.getBoundingClientRect(), r = anchor.getBoundingClientRect();
    if (pop.parentNode !== host) host.appendChild(pop);
    pop.hidden = false; var w = pop.offsetWidth, h = pop.offsetHeight, left = r.left - fr.left + r.width / 2 - w / 2;
    left = Math.max(4, Math.min(fr.width - w - 4, left)); var below = r.bottom - fr.top + 10, above = r.top - fr.top - h - 10;
    pop.style.left = left + 'px'; pop.style.top = (r.top - fr.top > fr.height * 0.55 && above > -80 ? above : below) + 'px';
  }
  function mk() {
    if (pop) return; pop = el('div', 'map-pop'); pop.setAttribute('role', 'group'); pop.hidden = true;
    pop.addEventListener('pointerenter', () => clearTimeout(popTimer));
    pop.addEventListener('pointerleave', () => { if (!pop.__kb) popTimer = setTimeout(closePop, 350); });
  }
  function show(anchor, focus) {
    var i = info(anchor.dataset.id); if (!i) return; mk();
    pop.replaceChildren(); pop.setAttribute('aria-label', i.title); pop.__kb = !!focus;
    if (i.thumb) { var im = el('img'); im.src = i.thumb; im.alt = ''; im.width = 400; im.height = 225; pop.append(im); }
    var b = el('div', 'map-pop__body'), x = el('button', 'map-pop__x', '×'), act = el('p', 'map-pop__act'), go = el('a', 'btn btn--primary', 'Open this view'), sc = el('a', '', 'On the scenes page');
    x.type = 'button'; x.setAttribute('aria-label', 'Close'); x.onclick = () => { closePop(); anchor.focus(); };
    go.href = i.href; sc.href = i.scene; act.append(go, sc);
    b.append(el('p', 'map-pop__place', i.place), el('h4', '', i.title), el('p', 'map-pop__meta', i.meta));
    if (i.blurb) b.append(el('p', '', i.blurb)); b.append(act); pop.append(x, b);
    popFor = i.id; place(anchor); if (focus) go.focus();
  }
  function showList(chip, focus) {
    mk(); pop.replaceChildren(); pop.__kb = !!focus; popFor = null; pop.setAttribute('aria-label', 'Views here');
    var ul = el('ul', 'map-pop__list'); chip.__ids.forEach((id) => {
      var i = info(id), li = el('li'), btn = el('button', '', i.title); btn.type = 'button'; btn.append(el('span', '', i.meta));
      btn.onclick = () => { var a = D.getElementById('pin-' + id); a.style.display = ''; show(a, true); }; li.append(btn); ul.append(li);
    });
    pop.append(el('h4', '', chip.__ids.length + ' views here'), ul); place(chip); if (focus) ul.querySelector('button').focus();
  }
  D.addEventListener('click', (e) => {
    var t = e.target, a = t.closest('a.map-pin'), c = t.closest('.map-chip');
    if (c) { e.preventDefault(); showList(c, e.detail === 0); } else if (a && !a.hasAttribute('aria-hidden')) { if (popFor === a.dataset.id && !pop.hidden) return; e.preventDefault(); show(a, e.detail === 0); } else if (pop && !pop.hidden && !t.closest('.map-pop')) closePop();
  });
  D.addEventListener('keydown', (e) => {
    var c = e.target.closest('.map-chip');
    if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); showList(c, true); }
    if (e.key === 'Escape' && pop && !pop.hidden) { var f = D.getElementById('pin-' + popFor); closePop(); if (f) f.focus(); }
  });
  ['over', 'out'].forEach((k) => {
    D.addEventListener('pointer' + k, (e) => {
      var a = e.pointerType === 'mouse' && e.target.closest('a.map-pin'); if (!a || a.hasAttribute('aria-hidden')) return; clearTimeout(popTimer);
      popTimer = setTimeout(() => { if (k === 'over') show(a); else if (pop && !pop.__kb) closePop(); }, k === 'over' ? 140 : 350);
    });
  });

  var sections = $$('.map-section'), tabs = $$('.map-tabs a'), figEl = null;
  function activate(key) {
    sections.forEach((s) => s.hidden = s.dataset.section !== key);
    tabs.forEach((t) => { if (t.dataset.section === key) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current'); });
    frames.forEach((f) => { if (!f.live) f.layout(); });
    if (unroll && figEl && figEl.dataset.state !== 'static') {
      var r = figEl.getBoundingClientRect(), vis = r.bottom > 0 && r.top < innerHeight;
      unroll.showRotor(key === 'industrial' ? key : key.slice(6), { fast: true, instant: !vis || reduce });
    }
  }
  function hold(fn) {
    var n = 0, t = setInterval(() => { fn(); if (++n > 4) clearInterval(t); }, 250); fn();
    ['wheel', 'touchstart', 'keydown'].forEach((k) => addEventListener(k, () => clearInterval(t), { once: true }));
  }
  function pulse(a) { a.classList.add('is-pulse'); setTimeout(() => a.classList.remove('is-pulse'), 2200); }
  function route(first) {
    var h = ''; try { h = decodeURIComponent(location.hash.slice(1)); } catch (x) {}
    var sec = sections.filter((s) => s.id === h)[0], m = /^vp-(.+)$/.exec(h);
    if (sec) { activate(sec.dataset.section); hold(() => sec.scrollIntoView({ behavior: 'instant' })); return; }
    if (!m) { if (first) activate('rotor-1'); return; }
    var li = D.getElementById(h), pin = D.getElementById('pin-' + m[1]);
    if (!li) { if (first) activate('rotor-1'); return; }
    var own = li.closest('.map-section'); activate(own ? own.dataset.section : 'rotor-1');
    var det = li.closest('details'); if (det && !pin) det.open = true;
    if (!pin) { hold(() => li.scrollIntoView({ block: 'center', behavior: 'instant' })); return; }
    var fr = pin.closest('[data-map-frame]'), f = fr.__frame; if (f) { f.layout(); f.focusOn(+pin.dataset.x, +pin.dataset.y); }
    hold(() => fr.scrollIntoView({ block: 'center', behavior: 'instant' })); setTimeout(() => { pulse(pin); show(pin); }, 120);
  }
  tabs.forEach((t) => t.addEventListener('click', (e) => { e.preventDefault(); history.pushState(null, '', t.getAttribute('href')); activate(t.dataset.section); }));
  addEventListener('hashchange', () => route(false));

  var live = [];
  function hideLive() { live.forEach((n) => n.remove()); live = []; }
  function showLive(d) {
    hideLive(); var stage = $('.unroll-stage', figEl); if (!stage) return;
    var key = d.key, src = key === 'industrial' ? $('#industrial .map-frame') : $('#rotor-' + key + ' .map-frame'); if (!src) return;
    var strips = src.dataset.strips ? src.dataset.strips.split(';') : null;
    d.rects.forEach((r, i) => {
      var c = src.cloneNode(true), bounds = strips ? strips[i] : src.dataset.plan, box = nums(bounds);
      $$('[id]', c).forEach((n) => n.removeAttribute('id')); c.removeAttribute('id'); c.setAttribute('aria-hidden', 'true'); c.removeAttribute('tabindex'); c.dataset.bounds = bounds;
      $$('img', c).forEach((n) => { n.loading = 'eager'; n.alt = ''; }); $$('a.map-pin', c).forEach((a) => {
        var y = +a.dataset.y; a.removeAttribute('aria-label'); a.setAttribute('aria-hidden', 'true'); a.tabIndex = -1;
        if (strips && (y < box[1] || y > box[1] + box[3])) a.remove();
      });
      $$('.map-chip', c).forEach((n) => n.remove());
      var wrap = el('div', 'map-live'); wrap.style.cssText = 'left:' + r.x * 100 + '%;top:' + r.y * 100 + '%;width:' + r.w * 100 + '%;height:' + r.h * 100 + '%'; wrap.append(c);
      stage.append(wrap); live.push(wrap); Frame(c, true); requestAnimationFrame(() => wrap.classList.add('is-on'));
    });
  }
  function setupUnroll() {
    var fig = figEl = $('#map-unroll'), track = $('.map-track'); if (!fig) return;
    fig.addEventListener('unroll:handoff', (e) => { showLive(e.detail); });
    fig.addEventListener('unroll:start', hideLive);
    var gl; try { gl = D.createElement('canvas').getContext('webgl2'); } catch (x) {}
    var stat = () => { track.classList.toggle('is-static', fig.dataset.state === 'static' || !gl || reduce); }; stat();
    new MutationObserver(stat).observe(fig, { attributes: true, attributeFilter: ['data-state'] });
    if (reduce || !gl || !window.IntersectionObserver) return;
    var io = new IntersectionObserver((es) => {
      if (!es.some((e) => e.isIntersecting)) return; io.disconnect();
      import('/site/js/unroll.js').then((m) => { unroll = m; var t = $('.map-tabs a[aria-current]'); if (t && t.dataset.section !== 'rotor-1') m.showRotor(t.dataset.section === 'industrial' ? 'industrial' : t.dataset.section.slice(6), { fast: true, instant: true }); }).catch(() => {});
    }, { rootMargin: '700px 0px' });
    io.observe(track || fig);
  }

  $$('[data-map-frame]').forEach((root) => {
    var f = Frame(root, false), fig = root.closest('[data-map-figure]'), bar = el('div', 'map-ctl');
    [['+', 'Zoom in', () => f.zoomBy(1.6)], ['−', 'Zoom out', () => f.zoomBy(1 / 1.6)], ['Reset', 'Reset the view', f.reset]].forEach((b) => {
      var btn = el('button', '', b[0]); btn.type = 'button'; btn.setAttribute('aria-label', b[1]); btn.onclick = b[2]; bar.append(btn);
    });
    if (fig) fig.append(bar);
  });
  setupUnroll(); route(true);
})();
