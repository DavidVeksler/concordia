// Wall cutaway (structure-page-spec 4.1, decision P1): a poster of the rotor wall, a caption and one button. Only a tap loads the 3D scene,
// /explore/?scene=rotor-wall&embed=1, in a frame on the page (16:10 on desktop, 4:5 on phones), with a link to open it full screen.
// Nothing is requested from /explore/ before the tap. Not a calculator: it marks itself data-widget-kind="embed" so the calculator
// checks in scripts/site/browser-check.mjs (controls, outputs, hash state) skip it and run a short embed check instead.
import { h, exploreUrl } from './ui.mjs';

export const EXPLORE = { viewpoint: 'megaframe-base', overlay: 'structural' };
export const SCENE = '/explore/?scene=rotor-wall';
export const EMBED = `${SCENE}&embed=1`;

// Poster. The still `sci-st-wall-cutaway` (site/shots/science-a.json, static) is captured from the scene itself:
// `node scripts/rotor-wall-poster.mjs`, then `python scripts/site/convert-shots.py <png> sci-st-wall-cutaway`. With SHOT_READY false the
// poster falls back to the rotor-wall-section diagram.
const SHOT_ID = 'sci-st-wall-cutaway';
const SHOT_READY = true;
const SHOT_EXT = 'avif';
export const POSTER = SHOT_READY
  ? {
      src: `/site/shots/${SHOT_ID}-1600.${SHOT_EXT}`,
      srcset: `/site/shots/${SHOT_ID}-800.${SHOT_EXT} 800w, /site/shots/${SHOT_ID}-1600.${SHOT_EXT} 1600w`,
      fit: 'cover',
      alt: 'A cut-away block of the rotor wall: lawn, tree and building on the ground deck, three decks of underframe, liner, bands and outer skin.',
    }
  : {
      src: '/site/diagrams/rotor-wall-section.svg',
      srcset: null,
      fit: 'contain',
      alt: 'Section through the rotor wall to scale: ground deck, utility, transit and root decks, liner, tension bands and outer skin.',
    };

const CAPTION = 'A model of the rotor wall. Fly from the whole wheel to one megaframe bay and down to a block of wall cut open on two faces, '
  + 'then take the layers apart and follow the loads.';

export function mount(el) {
  el.setAttribute('data-widget-kind', 'embed');
  el.setAttribute('role', 'group');
  el.setAttribute('aria-label', 'Rotor wall cutaway, 3D model');
  el.classList.add('widget--live', 'w-cutaway');

  const img = h('img', {
    class: `w-cutaway__poster w-cutaway__poster--${POSTER.fit}`,
    src: POSTER.src,
    srcset: POSTER.srcset,
    sizes: POSTER.srcset ? '(min-width: 1264px) 1160px, calc(100vw - 64px)' : null,
    alt: POSTER.alt,
    loading: 'lazy',
    decoding: 'async',
  });
  const open = h('button', { type: 'button', class: 'w-btn w-cutaway__open' }, 'Open the 3D cutaway');
  const stage = h('div', { class: 'w-cutaway__stage' }, img, open);
  const status = h('p', { class: 'w-cutaway__status', 'aria-live': 'polite' });
  const full = h('a', { class: 'w-cutaway__full', href: SCENE, hidden: true }, 'Open full screen');
  const meta = h('div', { class: 'w-meta' },
    h('p', { class: 'w-meta__text' }, '3D model. It loads only when you open it.'),
    h('div', { class: 'w-meta__links' }, full, h('a', { href: exploreUrl(EXPLORE) }, 'See it in the simulation')));

  open.addEventListener('click', () => {
    const frame = h('iframe', {
      class: 'w-cutaway__frame',
      src: EMBED,
      title: 'Rotor wall cutaway, 3D model',
      allow: 'fullscreen',
      allowfullscreen: true,
    });
    stage.replaceChildren(frame);
    stage.classList.add('w-cutaway__stage--live');
    full.hidden = false;
    status.textContent = 'The model is loading in the frame above.';
    frame.focus();
  }, { once: true });

  el.replaceChildren(meta, stage, h('p', { class: 'w-cutaway__caption' }, CAPTION), status);
}
