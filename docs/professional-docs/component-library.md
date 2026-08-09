# Component Library

The reusable pieces of `css/styles.css`, with the canonical markup for
each — copy from here instead of inventing a new variant. Built from
[[design-tokens]] (the values) applying the patterns in
[[design-system]] (the rules).

## Layout

**`.wrap`** — page-width container, wraps section content.

**`.rail-row`** — the left-label / right-content row used for every case
study section (`aside.rail-item` + `.rail-content`):
```html
<section class="rail-row">
  <aside class="rail-item">
    <span class="section-label rail-item__index">01</span>
    <h2 class="detail-section__title"><svg class="rail-item__icon">...</svg>Section title</h2>
  </aside>
  <div class="rail-content">
    <div class="detail-section__body"><p>...</p></div>
  </div>
</section>
```

## Navigation

**`.detail-nav`** — bordered pill CTA row, bottom of a case study.
Add `.detail-nav--top` for the mirrored version under the header.
Left link always "Back to work"; right link always advances to the
next case study (loops at the end).
```html
<nav class="detail-nav wrap detail-nav--top">
  <a href="../../index.html#work">&larr; Back to work</a>
  <a href="../next-case-study/index.html">Next Case Study &rarr;</a>
</nav>
```

## Media

**`.detail-gallery--masonry`** — grid of images with captions:
```html
<div class="detail-gallery detail-gallery--masonry">
  <figure class="detail-gallery__item reveal">
    <img src="images/x.jpg" alt="...">
    <figcaption class="detail-gallery__caption">...</figcaption>
  </figure>
</div>
```
`.detail-gallery--4up` — fixed 4-column variant. `.detail-gallery__item--plain`
— no border/frame, for full-bleed shots (e.g. device montages).

**`.detail-lead-image`** — single hero-weight image; `--crop` variant
for a fixed-ratio crop; wrap in `<a>` to link out to a full PDF/asset.

**Lightbox** — any `<img>` with `data-full="images/full-size.jpg"` opens
that larger file in `.lightbox-overlay` on click (see `js/main.js`).
Use when the inline image is a compressed/cropped stand-in.

## Badges, tags, stats

**`.tool-badge`** (in a `.tool-row`) — icon + label pill, used for
tools/skills and asset links alike:
```html
<ul class="tool-row">
  <li class="tool-badge"><svg viewBox="0 0 16 16">...</svg>Label</li>
</ul>
```

**`.tag`** (in a `.tag-row`) — plain text pill, no icon, used for
case-study topic tags.

**`.stat-tile`** (in a `.stat-grid`) — big number + label, used in
case-study hero stat blocks.

**`.cert-badge`** (in a `.cert-row`) — thumbnail + label, links to a PDF.

## Content

**`.doc-quote`** — pulled-quote block citing a source file
(`.doc-quote__text` + `.doc-quote__file`).

**`.exchange`** (in `.exchange-grid`) — prompt/result pair
(`.exchange__prompt` + `.exchange__result`).

## Header/footer/hero

**`.site-header`**, **`.site-footer`** — fixed site chrome, present on
every page unchanged.

**`.hero`** — homepage-only: `.hero__marquee` (looping ticker),
`.hero__headline`, `.hero__meta` (two-column intro).

---

**When something doesn't fit an existing pattern**, that's a real
signal to stop and design it deliberately rather than bend one of
these — but check here first. Most "new" needs turn out to already
exist under a slightly different name.
