// Concordia public site: screenshot lightbox. Every figure screenshot gets an enlarge button; a native <dialog> shows the 1600 px file
// fit to the window, a click toggles actual size (scroll to pan), arrows and swipe step through the page's screenshots.
// Plain script; without it the figures are ordinary images.
(function () {
  'use strict';
  var SEL = 'img[src*="/site/shots/"], img[data-art-image]';
  var figs = Array.prototype.filter.call(document.querySelectorAll('figure.figure'), function (f) { return f.querySelector(SEL); });
  if (!figs.length || typeof HTMLDialogElement === 'undefined') return;
  var paintingPage = document.body.getAttribute('data-page') === '/art/';
  var dlg = null, imgEl, capEl, countEl, openEl, stage, prevBtn, nextBtn, index = 0, opener = null, touchX = null;

  function make(tag, cls, attrs) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    for (var k in (attrs || {})) el.setAttribute(k, attrs[k]);
    return el;
  }
  function srcOf(fig) { return fig && fig.querySelector(SEL); }
  function fullSrc(img) { return img.getAttribute('data-full') || img.getAttribute('src'); }

  function build() {
    dlg = make('dialog', 'lightbox', { 'aria-label': paintingPage ? 'Painting viewer' : 'Screenshot viewer' });
    var bar = make('div', 'lightbox__bar');
    countEl = make('span', 'lightbox__count', { 'aria-live': 'polite' });
    var close = make('button', 'lightbox__btn', { type: 'button', 'aria-label': 'Close viewer' });
    close.textContent = '×';
    close.addEventListener('click', function () { dlg.close(); });
    bar.appendChild(countEl);
    bar.appendChild(close);

    stage = make('div', 'lightbox__stage');
    imgEl = make('img', 'lightbox__img');
    imgEl.addEventListener('click', toggleZoom);
    stage.appendChild(imgEl);
    stage.addEventListener('click', function (e) { if (e.target === stage) dlg.close(); });

    prevBtn = make('button', 'lightbox__btn lightbox__nav lightbox__nav--prev', { type: 'button', 'aria-label': paintingPage ? 'Previous painting' : 'Previous screenshot' });
    prevBtn.textContent = '‹';
    nextBtn = make('button', 'lightbox__btn lightbox__nav lightbox__nav--next', { type: 'button', 'aria-label': paintingPage ? 'Next painting' : 'Next screenshot' });
    nextBtn.textContent = '›';
    prevBtn.addEventListener('click', function () { show(index - 1); });
    nextBtn.addEventListener('click', function () { show(index + 1); });

    var foot = make('div', 'lightbox__foot');
    capEl = make('p', 'lightbox__cap');
    openEl = make('a', 'lightbox__open');
    openEl.textContent = 'Open this view in the simulation';
    foot.appendChild(capEl);
    foot.appendChild(openEl);

    [bar, stage, prevBtn, nextBtn, foot].forEach(function (el) { dlg.appendChild(el); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', function () {
      document.documentElement.classList.remove('lightbox-open');
      imgEl.removeAttribute('src');
      if (opener && opener.focus) opener.focus();
    });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
      else if (e.key === 'Home') { e.preventDefault(); show(0); }
      else if (e.key === 'End') { e.preventDefault(); show(figs.length - 1); }
      else if (e.key === '+' || e.key === '=' || e.key === '-' || e.key === '0') { e.preventDefault(); toggleZoom(); }
    });
    dlg.addEventListener('touchstart', function (e) {
      touchX = e.touches.length === 1 && !stage.classList.contains('is-actual') ? e.touches[0].clientX : null;
    }, { passive: true });
    dlg.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 60) show(index + (dx < 0 ? 1 : -1));
    }, { passive: true });
    document.body.appendChild(dlg);
  }

  function toggleZoom() {
    var actual = stage.classList.toggle('is-actual');
    imgEl.setAttribute('title', actual ? 'Click to fit the window' : 'Click for actual size');
    if (actual) {
      stage.scrollLeft = (stage.scrollWidth - stage.clientWidth) / 2;
      stage.scrollTop = (stage.scrollHeight - stage.clientHeight) / 2;
    }
  }

  function show(i) {
    if (i < 0 || i >= figs.length) return;
    index = i;
    var fig = figs[i], src = srcOf(fig);
    stage.classList.remove('is-actual');
    imgEl.setAttribute('title', 'Click for actual size');
    imgEl.src = fullSrc(src);
    imgEl.alt = src.getAttribute('alt') || '';
    var cap = fig.querySelector('figcaption > span');
    capEl.textContent = cap ? (src.hasAttribute('data-art-image') ? Array.prototype.map.call(cap.children, function (part) { return part.textContent.trim(); }).join(': ') : cap.textContent) : (src.getAttribute('alt') || '');
    var link = fig.querySelector('.figure__open');
    if (link) { openEl.href = link.getAttribute('href'); openEl.textContent = src.hasAttribute('data-art-image') ? 'Explore the place' : 'Open this view in the simulation'; openEl.hidden = false; } else { openEl.removeAttribute('href'); openEl.hidden = true; }
    countEl.textContent = figs.length > 1 ? (i + 1) + ' / ' + figs.length : '';
    prevBtn.hidden = nextBtn.hidden = figs.length < 2;
    prevBtn.disabled = i === 0;
    nextBtn.disabled = i === figs.length - 1;
    stage.scrollTop = 0;
    stage.scrollLeft = 0;
    [i - 1, i + 1].forEach(function (j) {
      var n = srcOf(figs[j]);
      if (n) new Image().src = fullSrc(n);
    });
  }

  function open(i, btn) {
    if (!dlg) build();
    opener = btn;
    show(i);
    document.documentElement.classList.add('lightbox-open');
    if (!dlg.open) dlg.showModal();
  }

  figs.forEach(function (fig, i) {
    var img = srcOf(fig);
    var frame = fig.querySelector('.figure__frame');
    if (!frame) {
      frame = make('div', 'figure__frame');
      img.parentNode.insertBefore(frame, img);
      frame.appendChild(img);
    }
    var btn = make('button', 'figure__zoom', { type: 'button', 'aria-label': (img.hasAttribute('data-art-image') ? 'Enlarge painting: ' : 'Enlarge screenshot: ') + (img.getAttribute('alt') || '') });
    btn.addEventListener('click', function () { open(i, btn); });
    frame.appendChild(btn);
  });
})();
