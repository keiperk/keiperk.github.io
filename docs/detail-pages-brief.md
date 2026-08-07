# Case study detail pages — Design Brief

Companion to `kevinkeiper-4.0-design-brief.md`. Covers the 4 detail pages linked from the home
page cards (Opportunity Radar, NeU/X, kevinkeiper.com, Impact Atlas).

## Overview

Each primary case study gets its own page, reached by clicking its home
page row. Same visual system as the home page (grayscale chrome, mono
labels/tags, sans headlines) — these pages go deeper, not different.

## Structure (current — confirmed and rolled out to all 3 built pages)

Not every case study needs every section — this is the toolkit, use what
fits each project's real story.

1. **Header** — same site header, plus a "← Back to work" link.
2. **Case hero** — two-column row: hero text (eyebrow, title, description,
   meta row with role/timeline/platform-tool-badges) on the left, lead
   image on the right, side by side — not stacked. Stat grid (3-4 tiles,
   real numbers pulled from the work itself where possible, e.g. "8
   signal sources tracked") runs full-width below that row.
3. **Sticky rail body** (`.rail-wrap` containing `.rail-row` sections) —
   replaces the old stacked full-width sections. See below.
4. **Footer nav** — prev/next case study + back to home.

### Sticky rail layout — the standard body pattern

Everything after the hero (Problem, Hypothesis, Design research, Design
execution, What shipped, Outcomes) lives inside one `.rail-wrap`, as a
sequence of `.rail-row` sections:

```html
<div class="rail-wrap wrap">
  <section class="rail-row">
    <aside class="rail-item">
      <span class="section-label rail-item__index">01</span>
      <h2 class="detail-section__title">The problem</h2>
    </aside>
    <div class="rail-content">
      <div class="detail-section__body">...</div>
      <!-- optional image or gallery -->
    </div>
  </section>
  <!-- repeat per section, index incrementing -->
</div>
```

- Each `.rail-row` is `grid-template-columns: 280px 1fr` — left column is
  the sticky title/index, right column (`.rail-content`) is everything
  else for that section (body copy, optional image, optional gallery).
- `.rail-item` is `position: sticky; top: 57px` (57px = the site
  header's rendered height, so the index number sits flush under the
  header, not the title, when both are stuck). It stays pinned while
  its own row's content scrolls past, then the next row's item takes
  over once that row starts — no JS needed, pure CSS sticky-sibling
  behavior.
- `.rail-row` supplies its own `border-top` as the section divider.
  `.detail-hero` has **no** `border-bottom` — that would double up
  against the first row's top border.
- On mobile (`max-width: 900px`), rail rows collapse to a single column
  and `.rail-item` becomes `position: static` (no sticky behavior needed
  when everything's stacked).

### Type rule — applies to every `.detail-section__body`
Break dense paragraphs into short sentences, one per `<p>`. Scannable
beats essay-like everywhere here — apply when writing or editing any
section body copy.

### Images within a rail row
- **No image unless a real supporting artifact exists** — never add one
  just for visual balance. Plenty of rows (e.g. NeU/X's Hypothesis) are
  text-only, and that's correct.
- **Single supporting image beside a paragraph** (Problem/Hypothesis-
  style): width matches the paragraph's own measure
  (`var(--content-measure)`), not the leftover `.rail-content` width —
  a bigger column doesn't mean the image gets to fill all of it.
- **Dense/illegible-when-small diagrams**: still sized like any other
  single image (matching the paragraph's measure) — don't blow it up on
  the page to compensate for illegibility. Instead wrap it in a link to
  a full-res source (PDF if one exists — render from the vector source
  at high DPI via `pdftoppm -r 300` for a sharper result than a flat
  PNG export — otherwise the largest export available) opening in a new
  tab, with a small caption noting it's clickable.
- **Galleries** (`.detail-gallery`) run the full `.rail-content` width,
  wider than the paragraph above them — that's fine, only the **left**
  edge needs to align with the paragraph's left edge (automatic, same
  container padding). Default is a 2-up grid; `.detail-gallery--masonry`
  (CSS columns) for source sets with wildly varying aspect ratios
  (research artifacts — surveys, chat panels, flowcharts); `.detail-
  gallery--4up` for a project/section with enough source images to
  support 4 across (e.g. more Impact Atlas problem-space photos once
  sourced). `align-items: start` on the default grid keeps mixed-aspect
  images from stretching to match their row partner.
- Source the sharpest/most complete version available when more than
  one export of the same artifact exists.

### Lightbox
Every gallery/lead image is click-to-enlarge (dark backdrop, click or
Esc to close) — wired once in shared `js/main.js` + `css/styles.css`,
no per-page setup needed. Images already wrapped in a link (e.g. the
journey map's PDF link) are excluded automatically so the two behaviors
don't conflict.

### Design research
Can be a placeholder/honest "skipped this phase" note rather than
forced content — see kevinkeiper.com note below. But check for
informal/observational research before defaulting to that: Opportunity
Radar had no formal study, but the research was still real — a plainly
visible market signal (LinkedIn's "100+ applicants" count) that
validated the problem before a line of code was written. "No formal
research" isn't the same as "no research."

Opportunity Radar's actual build process (idea → n8n pipeline → Google
Sheets data model → AI-coded UI, no wireframes) became the spine of its
"Design execution" section rather than a generic process writeup — the
real, unpolished process artifacts (workflow canvas, spreadsheet, code
editor) are the gallery images themselves. NeU/X and kevinkeiper.com were
built the same fast, AI-assisted, no-wireframe way — Impact Atlas was not
(older, more traditional process) and should get its own honest version
of this structure rather than forcing the same story.

## Per-project source material available

| Project | Full-res images available | Notes |
|---|---|---|
| Opportunity Radar | 8 (`opprad-01` – `08`) | n8n-built; card uses opprad-06 now |
| NeU/X | 36 (`neux-01` – `36`) | Most images, needs curation down to a working set |
| Impact Atlas | 28 (`impact-atlas-01` – `28`) | Card uses impact-atlas-24 (hand-drawn ledger) |
| kevinkeiper.com | 1 (Bangladesh photo) | Meta case study — process is *this conversation*, so detail page content differs in kind from the others |

## Open questions

- [x] Role / timeline / outcome copy — done for Opportunity Radar, NeU/X,
      Impact Atlas. (Impact Atlas still missing a participants/branches
      served number if that ever surfaces.)
- [x] Gallery curation — resolved per-project as each page was built.
- [x] URL / file structure — settled: `work/<slug>/index.html`.
- [ ] **Per-image tool pills?** — in Design research/execution galleries,
      would a small badge per image (reusing the `.tool-badge` component)
      naming what software made that specific artifact — n8n, CoLoop,
      Figma, Axure, etc. — help, especially where the hero meta row's
      Platform badges already list several tools and it's not obvious
      which artifact used which. Not built yet, just flagged.
- [ ] **kevinkeiper.com detail page is structurally different** — its
      "process" is this AI-assisted build itself, not a client project.
      Does it get the same rail-row template, or a distinct format
      (e.g. a build log / timeline of decisions)? Still open — this is
      the last of the 4 to build.
