// Concordia public site: mobile nav, theme toggle, widget loader, hero video motion preference. Plain script; the site reads fine without it.
(function () {
  'use strict';
  var root = document.documentElement;

  // Mobile navigation.
  var navToggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  if (navToggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    navToggle.addEventListener('click', function () { setOpen(navToggle.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') { setOpen(false); navToggle.focus(); }
    });
    nav.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('a')) setOpen(false); });
  }

  // Theme toggle: flips the effective theme and remembers it (storage may be blocked, so every access is guarded).
  var themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      if (!current) current = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      var next = current === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
    });
  }

  // Basis chips: the page-level "Show basis" switch (default on, spec section 6.2). The stored choice is applied before paint by the head script.
  var basisToggle = document.getElementById('basis-toggle');
  if (basisToggle) {
    basisToggle.checked = root.getAttribute('data-basis') !== 'off';
    basisToggle.addEventListener('change', function () {
      if (basisToggle.checked) root.removeAttribute('data-basis'); else root.setAttribute('data-basis', 'off');
      try { localStorage.setItem('basis', basisToggle.checked ? 'on' : 'off'); } catch (e) { /* ignore */ }
    });
  }

  // Home hero (discovery-engagement-spec 3.1). The loop starts here, never under reduced motion (the poster stays); a device the 3D world refuses
  // gets "Read the tour" -> /journey/ and a one-line hardware note. The checks below mirror src/fallback.ts (hasWebGL2, isTouchOnly), and
  // site:check fails if the two drift apart.
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var heroVideo = document.querySelector('.hero__video');
  if (heroVideo) {
    if (reduce) heroVideo.remove();
    else { heroVideo.muted = true; var started = heroVideo.play(); if (started && started.catch) started.catch(function () { /* blocked: the poster stays */ }); }
  }
  var heroTour = document.getElementById('hero-tour');
  var heroNote = document.getElementById('hero-note');
  if (heroTour && heroNote) {
    var mm = function (q) { return typeof window.matchMedia === 'function' && window.matchMedia(q).matches; };
    var webgl2 = false;
    try {
      var gl = document.createElement('canvas').getContext('webgl2');
      if (gl) { webgl2 = true; var lose = gl.getExtension('WEBGL_lose_context'); if (lose) lose.loseContext(); }
    } catch (e) { webgl2 = false; }
    var touchOnly = mm('(pointer: coarse)') && mm('(hover: none)') && navigator.maxTouchPoints > 0 && !mm('(any-pointer: fine)');
    var why = !webgl2 ? 'no-webgl2' : touchOnly ? 'touch-only' : '';
    if (why) {
      var label = heroTour.querySelector('[data-tour-label]');
      var minutes = heroTour.querySelector('[data-tour-min]');
      heroTour.setAttribute('href', '/journey/');
      if (label) label.textContent = 'Read the tour';
      if (minutes) minutes.remove();
      heroNote.textContent = why === 'no-webgl2'
        ? 'This browser has no WebGL 2, so the 3D world cannot run here. The tour reads here instead.'
        : 'The 3D world is built for a mouse and keyboard. On this device the tour reads here instead.';
      heroNote.hidden = false;
      var hero = document.querySelector('[data-hero]');
      if (hero) hero.setAttribute('data-hero', why);
    }
  }

  // Widgets (card 5): each exports mount(el) from /site/js/widgets/<name>.js; the static fallback paragraph stays if loading fails.
  var widgets = document.querySelectorAll('[data-widget]');
  Array.prototype.forEach.call(widgets, function (el) {
    var name = el.getAttribute('data-widget');
    if (!/^[a-z0-9-]+$/.test(name)) return;
    import('/site/js/widgets/' + name + '.js').then(function (m) {
      if (m && typeof m.mount === 'function') { el.innerHTML = ''; m.mount(el); }
    }).catch(function () { /* fallback paragraph remains */ });
  });
})();
