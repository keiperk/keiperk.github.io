# kevinkeiper.com — Design System

*Shared reference. Extracted from the original homepage brief
(`kevinkeiper-4.0-design-brief.md`) so future page briefs can reference one
source of truth instead of re-stating or drifting from these decisions.
That original file is left untouched as the historical record of what the
homepage build worked from.*

## Typography
Monospace for labels, tags, metadata, and utility text (category tags,
tool badges, role/date lines). Clean sans-serif for headlines and body
copy.

- **Fonts:** General Sans for sans/headlines/body (Söhne was the original
  direction but is a licensed font — fell back to General Sans in the
  actual build). Space Mono for tags/labels/metadata.

## Color
Strictly black, white, and grayscale in the UI chrome — no color in nav,
backgrounds, buttons, badges, etc. Screenshots/photos stay full color,
unaltered — cohesion comes from the consistency of the surrounding system
(chrome, tags, spacing, card rhythm), not from filtering the images.
Reasoning: inconsistency is the actual risk in a multi-color portfolio, not
color itself.

- `ink` (primary text): `#111111`
- `paper` (background): `#FFFFFF`
- `muted` (secondary text): `#666666`
- `line` (borders/hairlines): `#E0E0E0`
- `line-strong` (emphasis borders): `#CCCCCC`

## Shape & depth
- **Corner radii:** minimal — around `2-4px` (e.g. 4px cards/buttons, 2px
  small elements like tags/pills). Not sharp (0px), not standard (8px).
- **Elevation:** minimal — flat by default, subtle shadow only on
  hover/interactive states, no shadows on static elements.

## Spacing
Base unit 8px — scale: `4, 8, 16, 24, 32, 48, 64, 96`.

## Image handling
**Rule: images keep their original/native aspect ratio. Never forced-crop
to a fixed ratio.** All images share the same fixed width; height is not
constrained and simply hangs down however long the native ratio makes it,
so cards/rows will naturally vary in height, and that's expected, not a
bug to fix. This applies site-wide (homepage cards, detail pages, any
future page), not just the context it was first decided in.

## Documented exceptions
- **Opportunity Radar hero image** (`work/opportunity-radar/index.html`
  lead image) — `filter: saturate(0.85)` applied inline, a deliberate
  one-off.
- **NeU/X page — light/white screenshots** (`work/neux/index.html`) —
  `filter: brightness(0.93) saturate(0.9)` applied inline to every
  light-background image (hero, journey map, execution and shipped
  galleries). The two dark-mode research tool screenshots are
  untouched — they read fine as-is against the page's light chrome.
- **Impact Atlas journey map** (`work/impact-atlas/index.html`,
  Hypothesis section) — `filter: saturate(1.35) contrast(1.05)`,
  opposite direction from the NeU/X case — boosted, not reduced, since
  the diagram runs at 50% width and needed more visual presence at
  that size.
- These are deliberate, image-by-image calls, not a rule change. Don't
  propagate a filter to a new image without asking first.

## Tool badges
Text tag by default (see homepage tags). Where a tool benefits from a
recognizable mark (detail pages, "platform" meta rows), pair the mono
label with a small monochrome/outlined icon glyph in `ink` — never the
tool's actual brand color. The glyph is a simplified pictogram, not a
literal reproduction of the brand's logo file.

**Exception — About page Tools list**: uses real favicon images
(`assets/tool-logos/`), full brand color, 16px square. Decided
deliberately for that specific list (a dense inventory of 15 tools) —
doesn't apply elsewhere. Case study platform badges keep the
monochrome-glyph rule above.

## Anti-patterns (reviewed and rejected references)
- Colorful gradient/blob hero treatments.
- Diagonal/angled section dividers, drop shadows, glossy effects.
- Full-color branded software logos as tool badges (see Tool badges
  above — monochrome glyphs are fine, brand colors are not).
- Mixed, inconsistent visual languages within one flow/page — avoid
  stylistic whiplash between sections.
- Forced image cropping that cuts off meaningful content (see Image
  handling above).

## Hero / tone precedent
Established on the homepage: **light throughout**, not dark. Reasoning:
the actual work being shown is overwhelmingly light-background UI with
color as sparing accent — a dark shell would visually disconnect from the
content that follows it. Apply the same reasoning test to any new page:
does the shell match what the content actually looks like?
