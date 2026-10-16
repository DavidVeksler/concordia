# Contributing

## Issues

Use the forms. A good issue names the page URL, quotes the claim and says what it should be. One claim per issue.

## Pull requests

1. Fork, branch, edit files under `site/` (or the other paths in the README).
2. Run `npm install` and `npm run lint`. It must pass.
3. Open a pull request and say what changed and why. Link the issue it fixes.

A merged pull request is imported into the private repository, built in full, and deployed by the maintainer. You will see it live after the next deploy, and your commit stays in this repository's history.

## House style

- Plain language first. The reader is curious, not a specialist. Define a term the first time it appears or use `{% term "word" %}`.
- No em dashes anywhere. Use a colon, a comma or a full stop. The lint fails on them.
- No hedges or disclaimers. State the claim, cite the source if it needs one, and stop.
- Present tense, 2045. The station exists; the history is told as fact inside the fiction.
- Every number carries a basis: physics, design value, engineering challenge or story. Use `{% basis "design" %}` and friends. The legend is at [/about/#basis](https://concordia.davidveksler.com/about/#basis).
- Front matter: description 150 to 200 characters; title no longer than 60 characters with the " | Concordia" suffix; no H1 in the body.
- Alt text for every shot: 8 to 25 words, says what is in the picture.

## What this repository cannot change

The simulation (`/explore/`), its code and its assets are not here. Report simulation bugs as issues and they are fixed privately. Numbers that come from the simulation's model (building counts, rotor counts, line counts) are computed there, so a change to `site/data/model-stats.json` is overwritten on the next sync; open an issue instead.
