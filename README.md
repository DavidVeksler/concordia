# Concordia

[Concordia](https://concordia.davidveksler.com) is a 21 km rotating space city at the Earth-Moon L5 region that you can walk through in a browser, with a guide of plain-language science pages written as if it were 2045.

This repository is the public side of the project: the **website source** and the **issue tracker**. The simulation itself is developed privately and ships at [concordia.davidveksler.com/explore/](https://concordia.davidveksler.com/explore/).

## What is here

| Path | What it is |
| --- | --- |
| `site/content/` | Every page of the guide, one Markdown file each. The path is the URL. |
| `site/shots/` | The registry of images: id, alt text and which view of the simulation each one captures. |
| `site/data/` | Glossary terms, the scene index, map pins and the model statistics the pages quote. |
| `site/css/`, `site/js/`, `site/diagrams/` | Styles, widgets and inline diagrams. |
| `site/README.md` | Front matter fields and every shortcode. Read this before writing a page. |
| `public/site/` | The published images and loops. |
| `public/press/` | The press kit images. |
| `scripts/analysis/` | The script behind the freight research page; it prints every table on that page. |

## Report a problem

[Open an issue.](../../issues/new/choose) The most useful ones name a page and a claim:

- **Challenge a claim.** A number, a sentence or a basis chip that looks wrong. A short calculation and a source are the best form. Every figure on the site is labelled physics, design value, engineering challenge or story, so say which label you dispute.
- **Report a bug.** Something broken in the guide or the simulation, with the browser and graphics card.

## Fix it yourself

Pull requests that change text, alt text, captions, glossary entries or research pages are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md). `npm run lint` checks front matter, shot ids, links and the house style before you push.

## How this repository is kept

The site is built and deployed from the private project repository. After each deploy, a script copies the site source here so this repository always matches what is live. When a pull request here is merged, the maintainer imports it back into the private repository, the full build runs, and the next deploy ships it. Commits here that start with "Sync from" are the mirror; everything else is a contribution.

## Licence

Text and images: [CC BY 4.0](LICENSE.md). Code in this repository: MIT. Details and third-party credits are in [LICENSE.md](LICENSE.md) and on the [credits page](https://concordia.davidveksler.com/credits.html).
