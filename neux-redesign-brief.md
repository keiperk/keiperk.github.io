# NeU/X — Interface Redesign Brief

Companion to `kevinkeiper-4.0-design-brief.md` and `detail-pages-brief.md`. Scopes a
redesign of NeU/X's core product screen — the original capstone project "never was
fully thought out to begin with" (own admission, `detail-pages-brief.md`), so this is
a do-over of the actual UI, not just the case study page describing it.

## What NeU/X is

An AI co-pilot that turns creator goals into actionable plans. Self-directed capstone
project. Original tagline: "designed in Figma and built with AI and code."

## Scope of this pass

Redesign the **core screen only** — the primary working view a user sees after
stating a goal. Not the marketing/landing page, not onboarding, not settings.

## Layout: hybrid chat + plan panel

Two-column split, matching the "chat left / structured output right" pattern:

- **Left (~40%)**: chat thread. User states a goal in natural language; AI responds
  conversationally. Standard message-bubble pattern, input box pinned to bottom.
- **Right (~60%)**: generated plan panel. Structured, card/checklist-based breakdown
  of the goal into concrete steps — updates live as the conversation refines the plan.
  This is the part that should feel like a real product surface, not just a chat log.

## Visual system

Source of truth: **`design-system.md`** — don't restate or drift from it here.
Match the existing site's established system, **not** a literal shadcn/Tailwind
default look:

- Grayscale chrome, mono labels/tags, sans headlines (per `design-system.md`)
- Borrow shadcn's *structural* component patterns (card, badge, separator, tabs) —
  translate them into the site's own CSS/tokens, don't import shadcn's default
  styling (colors, radii, shadows)

## Content

Placeholder/representative only for this pass — not wired to a real backend.

Seed scenario: a musician launching their own record (debut album/EP), not a
generic follower-growth goal. Goal stated in chat: something like "I'm releasing
my debut record and need a plan." AI-generated plan panel breaks that into real
release-campaign steps — pre-save/teaser campaign, release timeline, distribution
(DSPs), press/playlist outreach, content cadence around the drop, etc. Gives the
plan panel actual domain texture instead of generic social-growth boilerplate.

## Work journal framing

This redesign itself is journal content, not just a finished artifact — the site
is shifting toward documenting real process (before/after, the "this wasn't fully
thought out, here's the redo" story), consistent with how other case pages already
show raw process artifacts rather than only polished output. The NeU/X page should
reflect that: show what NeU/X was, and the process of rethinking this core screen,
not present the new screen as if it always looked this way.

## Where this lives

`work/neux/index.html` — rebuild in place. This is the project's existing detail
page location per the site's `work/<slug>/index.html` convention
(`detail-pages-brief.md`).

## Open questions

- [ ] Does the redesigned screen replace what's shown in the NeU/X case study
      gallery images, or live alongside them as a "this is what it should have
      been" artifact?
- [ ] Any real plan-step content to seed with, or keep it fully placeholder?
- [ ] Does this screen need to be interactive (clickable, chat actually responds)
      or is it a static mockup demonstrating the layout/visual design?
