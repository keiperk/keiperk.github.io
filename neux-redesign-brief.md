# NeU/X — Standalone App Redesign Brief

Scopes a rebuild of NeU/X's core product screen as a **real, standalone app** —
separate from `kevin-portfolio-html`, its own repo, its own visual identity. The
original capstone project "never was fully thought out to begin with" (own
admission, `detail-pages-brief.md` in the portfolio repo), so this is a genuine
do-over of the actual product UI — not a mockup embedded in the portfolio site.

**Correction from earlier draft**: this brief previously assumed NeU/X's redesign
would live inside `work/neux/index.html` and inherit the portfolio's
`design-system.md`. That was wrong — NeU/X is the *parent* product; the portfolio
page about it is a separate, smaller thing (a case study describing/linking to it),
not the container for it. See "Relationship to the portfolio" below.

## What NeU/X is

An AI co-pilot that turns creator goals into actionable plans. Self-directed
capstone project. Original tagline: "designed in Figma and built with AI and code."

## Job to be done

As a bedroom music producer, I want to turn "I'm releasing my debut record" into
a concrete, sequenced plan — pre-save campaign, release timeline, distribution,
press/playlist outreach, content cadence — without already knowing the music
industry playbook, so I can launch my record with a real strategy instead of
guessing.

This is the anchor for the whole core screen: the chat is where the goal gets
stated, the plan panel is the "playbook" made concrete.

## Design axioms

**Parent context, above all the axioms below**: NeU/X is a **conversion-based
customer service relationship**. Like nearly everything on the internet, this
isn't charity — it's a relationship both sides manage through the same
instrument: John manages his record launch through it, we manage the
relationship (retention, repeat use, eventual monetization — left
unspecified on purpose, not yet decided) through the same interface. This
reframes axiom 1 correctly: **trust isn't the goal, it's the mechanism** —
you build trust because it's what makes conversion possible in a service
relationship. A user who doesn't trust the service doesn't convert, full
stop. No stakeholder disputes this framing; it's how the internet actually
works, stated plainly instead of left implicit.

Fixed reference points for every future decision — bracket the whole project,
outrank individual feature preferences. When a new decision comes up, check it
against these before designing anything new.

1. **Build trust, always.** John is a first-timer with real anxiety about
   screwing this up (see persona in `neux-screen-concept.md`) — every
   interaction either earns trust or spends it. Be honest about limits rather
   than fake confidence (e.g. the Co-pilot rail says "I don't have a specific
   answer for that yet" instead of guessing). One bad guess risks him
   disengaging entirely.
2. **Be helpful, don't make him think.** Minimize cognitive load at every
   step — clear labels, no jargon, one primary action per screen. Ask for
   things progressively, at the point they're actually needed, not upfront.
3. **Do the work, don't just describe it.** The product's job is to produce
   something usable, not just organize/describe tasks (see "Draft artifacts"
   in the screen build log) — a to-do list that only tells him what to do is
   half the value; handing him a usable first draft is the other half.

These aren't features — they're the test any new feature has to pass.

## Progressive collection rules

Concrete rules for axiom 2, since "ask progressively" was stated as a
principle 2026-08-06 but not actually built that day — documented intent
outran the code, which is exactly the mistake this whole practice exists to
catch. Corrected 2026-08-06 (later same day) once the gap was noticed.

1. **Never collect a field before something on screen needs it.** Not
   "might be useful later" — needs it *right now*, for the thing John is
   looking at.
2. **Domain-specific fields wait until the domain is known.** Style/genre,
   audience, etc. only make sense once we know what John is even trying to
   do — they don't belong on the entry screen, before his goal is even
   read.
3. **Ask in the smallest unit, inline, where the value gets used** — not a
   separate form/screen. If a draft needs his style to sound less generic,
   the place to ask is next to that draft, not a modal or a settings page.
4. **Once given, remember it for the rest of the session.** Never ask the
   same thing twice.
5. **Everything stays skippable.** Drafts degrade gracefully without the
   extra detail (generic instead of sharp) rather than blocking on it.
6. **Universal, goal-agnostic fields can stay upfront** if they don't
   presuppose anything about what John's trying to do — a name is fine on
   entry; his musical style is not.

## Working practice: the maps are upstream of the UI

Two standalone map files are the master reference — not documents written
*about* the product after the fact:

- **`neux-journey-map.md`** — John's experience using NeU/X (visualized as a
  published artifact, linked in that file)
- **`neux-record-launch-map.md`** — how a record launch actually works in
  the real world, checked against `plan.js`

The order is always: **map the process → identify the milestones → derive
the UX from that**, never the reverse. Screens, steps, and plan content
should be traceable back to a row in one of these maps, not invented ad hoc
while building. When a map changes, its artifact (if it has one) gets
refreshed to match — these are working references, not one-off deliverables.

## Scope of this pass

Rebuild the **core screen only** — the primary working view a user sees after
stating a goal. Not the marketing/landing page, not onboarding, not settings.

## Layout: hybrid chat + plan panel

Two-column split, matching the "chat left / structured output right" pattern:

- **Left (~40%)**: chat thread. User states a goal in natural language; AI responds
  conversationally. Standard message-bubble pattern, input box pinned to bottom.
- **Right (~60%)**: generated plan panel. Structured, card/checklist-based breakdown
  of the goal into concrete steps — updates live as the conversation refines the plan.
  This is the part that should feel like a real product surface, not just a chat log.

## Tech stack

**React**, bootstrapped with Vite. Realistic scope for this pass:
- A handful of components (`ChatPanel`, `PlanPanel`, `Message`, `PlanStep`)
- Local state simulating the conversation → plan updates; no auth, no database
- No real backend/LLM call required for this pass — can be added later as a small
  additional layer (one API route + a key) if a live-generation demo is wanted

## Visual system

**NeU/X gets its own design identity** — it is not governed by the portfolio's
`design-system.md`. That doc is scoped to `kevinkeiper.com` and its case-study
pages only. NeU/X is its own product and can look however suits an AI co-pilot
product (not required to match the portfolio's grayscale/mono system).

Still worth deciding deliberately rather than drifting — open question below.
Reasonable starting point: borrow shadcn's *structural* component patterns (card,
badge, separator, tabs, chat bubble conventions) as the base, then make real
choices on color/type rather than leaving Tailwind defaults untouched.

## Content

Placeholder/representative only for this pass — no real backend.

Seed scenario: a musician launching their own record (debut album/EP), not a
generic follower-growth goal. Goal stated in chat: something like "I'm releasing
my debut record and need a plan." AI-generated plan panel breaks that into real
release-campaign steps — pre-save/teaser campaign, release timeline, distribution
(DSPs), press/playlist outreach, content cadence around the drop, etc. Gives the
plan panel actual domain texture instead of generic social-growth boilerplate.

## Relationship to the portfolio

Two separate things, not one:

1. **NeU/X the app** — this brief. Own repo (location/name TBD — likely a sibling
   folder to `kevin-portfolio-html`, own GitHub repo), own deploy, own design system.
2. **The NeU/X case study page** — `work/neux/index.html` in the portfolio repo,
   governed by the portfolio's `design-system.md`. Describes/links to the app the
   same way the Opportunity Radar page links out to its GitHub repo — it does not
   contain the app's actual UI.

## Work journal framing

The redesign process itself is journal content for the portfolio page — not just
a finished artifact. The portfolio site is shifting toward documenting real process
(before/after, the "this wasn't fully thought out, here's the redo" story). The
`work/neux/index.html` page should show what NeU/X was, and the process of
rethinking this core screen — linking out to the real rebuilt app rather than
trying to reproduce its UI inline.

**Part II must speak to the actual process artifacts, not skip past them.**
Specifically: the persona/narrative (John), the user stories derived from it,
the journey map, the honestly-unvalidated product hypothesis, and the research
plan (scoped, not executed) — all worked out in `neux-screen-concept.md`. Naming
these explicitly (research plan, journey map, or "experience blueprint" as an
umbrella term) is part of what makes this case study honest and complete —
presenting the redesigned screen without this process context would undersell
the actual work and misrepresent it as a first-shot design rather than what it
really was: a v1 that got corrected mid-flight once the real thinking happened.

## Open questions

- [ ] NeU/X's own visual identity — start fresh, or take deliberate cues from the
      portfolio system (mono labels, restrained palette) even though not required
      to match it?
- [ ] Repo name/location — sibling folder to `kevin-portfolio-html`? New GitHub repo
      under the same account?
- [ ] Any real plan-step content to seed with, or keep it fully placeholder?
- [ ] Static/demo-only interactivity, or wire a real LLM call for live plan
      generation in a later pass?
- [ ] Does the portfolio case study page get updated now (linking to the new app)
      or only once the app is far enough along to show?
