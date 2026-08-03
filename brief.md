# kevinkeiper.com 4.0 — Design Brief

## Overview

kevinkeiper.com 4.0 is a portfolio and statement of purpose — a record of
past success studies alongside future direction and aspiration. It's meant
to function as a living document over time, something that grows and shifts
as Kevin does. Primary audience: people evaluating Kevin for a job
opportunity, who want to understand him before they meet him.

## Goals

Done means:
- 4 primary case studies complete, each with a similar structure, supported
  by images: Opportunity Radar, Neux, kevinkeiper.com (itself), and Impact
  Atlas.
- Case study detail pages for each of the 4 primary case studies, linked
  from their card.
- Animations working.
- Contact form intact and functional.
- Mobile responsiveness intact.
- All links working.
- All assets available (no missing/broken images).

## Design direction

### Typography
Monospace for labels, tags, metadata, and utility text (category tags,
tool badges, role/date lines). Clean sans-serif for headlines and body
copy.

### Color
Strictly black, white, and grayscale in the UI chrome — no color in nav,
backgrounds, buttons, badges, etc. Case study screenshots stay full color,
unaltered — cohesion comes from the consistency of the surrounding system
(chrome, tags, spacing, card rhythm), not from filtering the images.
Reasoning: inconsistency is the actual risk in a multi-color portfolio, not
color itself — so the fix is discipline in the frame around the work, not
suppressing the work's real color.

### Design tokens
*(Provisional — first pass, can change.)*

- **Fonts:** Söhne for sans/headlines/body (fallback: General Sans if
  licensing is a blocker). Space Mono for tags/labels/metadata.
- **Colors:**
  - `ink` (primary text): `#111111`
  - `paper` (background): `#FFFFFF`
  - `muted` (secondary text): `#666666`
  - `line` (borders/hairlines): `#E0E0E0`
  - `line-strong` (emphasis borders): `#CCCCCC`
- **Corner radii:** minimal — around `2-4px` (e.g. 4px cards/buttons, 2px
  small elements like tags/pills). Not sharp (0px), not standard (8px).
- **Spacing scale:** base unit 8px — `4, 8, 16, 24, 32, 48, 64, 96`.
- **Elevation:** minimal — flat by default, subtle shadow only on
  hover/interactive states, no shadows on static elements.

### Layout
- Card grid: image-dominant cards (large image, not a small thumbnail),
  uniform card rhythm across all 6.
- Tags/badges: outlined pill treatment (also called "rail-tags" in other
  sessions — same concept). Exact treatment flexible — whatever
  communicates the info best, not locked to one specific style.
- Hero: **light throughout, decided.** Reasoning: the actual case study
  content across all 6 projects is overwhelmingly light-background UI with
  color used only as sparing accent — a dark hero would visually disconnect
  from every piece of content that follows it, since nothing in the real
  work supports that contrast.

## Case studies & assets

**4 primary case studies** for this build, one card each. Lead image per
card already chosen:

| Case study | Lead image | Native size | Aspect ratio |
|---|---|---|---|
| Opportunity Radar | opprad-01 | 1440×1247 | 1.15:1 |
| Neux | neux-08 (thumb) / neux-09 (full) | 1440×900 | 1.6:1 |
| kevinkeiper.com (itself) | TBD — not yet selected | — | — |
| Impact Atlas | impact-atlas-12 | 1600×783 | 2.04:1 |

**Back pocket (not in this round — additional work, secondary category):**
BrightPlan, Rocket Lawyer, EMC Insurance, freelance web design work (~6
sites).

**Known constraints:**
- Source images span square (1.15:1) to wide (2.04:1) — no single fixed
  crop ratio fits all 4 without some cropping.
- BrightPlan (if ever pulled from back pocket) has a notably lower-
  resolution lead image than the others — Google Play Store screenshot, no
  higher-res source exists.

**One-line descriptions:**
- **Opportunity Radar:** Finds companies likely to be hiring before roles
  are even posted — a live dashboard ranking hiring momentum by tracking
  signal strength across news, Reddit, and LinkedIn in real time.
- **Neux:** Neux is an AI co-pilot that turns creator goals into actionable
  plans. Self-directed capstone project — designed in Figma, built with AI
  and code.
- **kevinkeiper.com:** This site is its own case study — designed and
  built using AI-assisted workflows across Figma, Claude, and Cursor,
  documented as it happens.
- **Impact Atlas:** Designing scalable tools for global poverty-reduction
  programs — mapping participant selection, field visits, and multi-level
  reporting across program organizers, branch managers, and regional
  teams.

**Back-pocket descriptions (already drafted, in case these return):**
- **Rocket Lawyer:** Led design on Rocket Lawyer's mobile app for SXSW,
  part of a larger legal digital media customer service experience.

## Out of scope

- Full site navigation, About page, Contact page beyond the working form.
- Final decision on hosting/platform.

## Open questions

- [ ] Lead image for the kevinkeiper.com case study itself — not yet
      selected. Candidate: a photo Kevin took in Bangladesh.
- [ ] Card image crop ratio and per-image crop/focal point — deferred to
      Figma.
- [ ] Whether card widths stay uniform or go asymmetric.
