# kevinkeiper.com 4.0

Personal portfolio site. Plain HTML/CSS/JS, no framework, no build step.

Live at [keiperk.github.io](https://keiperk.github.io/). Hosted on GitHub Pages,
served directly from the `main` branch.

## Run locally

```
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Any static file server works, there's
nothing to install or build.

## Deploy

Push to `main`. GitHub Pages rebuilds automatically, usually live within a
minute or two.

## Structure

```
index.html                   Home page
work/opportunity-radar/      Case study
work/neux/                   Case study
work/impact-atlas/           Case study
work/kevinkeiper-com/        Case study (this site, about itself)
work/about/                  About page
css/styles.css               Single shared stylesheet for the whole site
js/main.js                   Scroll reveal, contact form, lightbox
assets/                      Home page card images, tool logos, resume
portfolio-images-processed/  Full-resolution source image library
```

Each case study page uses a shared "sticky rail" layout (left-column
section title stays pinned while its content scrolls past). Image sizing,
gallery, and layout rules for that pattern are documented in
`detail-pages-brief.md`.

## Design system

`design-system.md` is the source of truth for colors, type, spacing, and
component patterns, including a running log of deliberate exceptions to
those rules. Check it before making a visual change that looks like it
might contradict an existing pattern.

## Contact form

The homepage contact form posts to Formspree
(`https://formspree.io/f/xkjwwggp`). Submissions land in the Formspree
account tied to that form ID; only the account owner can view or
reconfigure it.

## Fonts

Loaded from Fontshare and Google Fonts via CDN `<link>` tags. No local font
files, an internet connection is required for fonts to render as intended.
