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

**The whole thing, in three words each (2026-08-06):**

> **Always build trust. Always define success. Always be converting.**

A deliberate echo of "always be closing" — reframed for a service
relationship instead of a sales call. All three are load-bearing, not just
the third: you can't convert without trust, and you can't know if any of
this is working without having stated, concretely, what success means
before building. Everything below is elaboration on these three lines, not
separate from them.

**Always define success — stated as its own rule, not just implied**: every
feature, screen, or decision should have a concrete, checkable definition of
success attached *before* it's built, the same way "conversion" had to be
named concretely (not "engagement," but "John has paid, or will soon"). A
vague sense that something "seems good" isn't success criteria. This rule
was itself missing until Kevin named the gap (2026-08-06): "we have not
defined what success looks like, nor have we enshrined that defining
success should be a rule."

**Parent context, above all the axioms below**: NeU/X is a **conversion-based
customer service relationship *management tool*** — like most tech, it
doesn't *have* a relationship, it *manages* one. Like nearly everything on
the internet, that relationship isn't charity — it's managed through the
same instrument by both sides: John manages his record launch through it,
we manage the relationship through the same interface. **The conversion we
care about is
concrete: John has paid, or will soon.** Retention, repeat use, etc. matter
only insofar as they lead there — they're leading indicators, not the
conversion itself. This reframes axiom 1 correctly: **trust isn't the goal,
it's the mechanism** —
you build trust because it's what makes conversion possible in a service
relationship. A user who doesn't trust the service doesn't convert, full
stop. No stakeholder disputes this framing; it's how the internet actually
works, stated plainly instead of left implicit.

**This isn't one axiom among several — it's the majority of the product.**
Kevin's own assessment (2026-08-06): "80% or more is just this
relationship." The salutation, persistence, honest-limits copy, draft
artifacts, even the co-pilot widget — these aren't a features list with a
relationship axiom bolted on; they're mostly *instances* of managing this
one relationship. When evaluating whether something is worth building,
the real question is whether it serves the relationship, not whether it's
a nice feature in isolation (see the co-pilot widget's conversion-gap
finding below for what happens when a feature is checked against this and
comes up short).

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

## Error handling & recovery rules

**Errors are relationship moments too — often more trust-defining than when
things go right** (Kevin, 2026-08-06: "what builds trust is error handling
and correction"). Anyone can seem trustworthy when nothing goes wrong; how
the service behaves when something *does* go wrong is a truer test of axiom
1 than the happy path is. Concrete rules:

1. **Never fail silently.** If something goes wrong — storage, a bad state,
   anything — John should be told plainly, not left to discover it later
   (e.g. finding his plan gone with no explanation). A silent failure is a
   worse trust violation than a visible one, because it looks like
   dishonesty in hindsight even if the intent was just to avoid bothering him.
2. **Explain in plain language.** No stack traces, no error codes, no
   jargon. Say what happened and what it means for him, the same
   plain-language standard as everything else in the product.
3. **Always offer a path forward.** A retry, a fallback, or at minimum
   acknowledgment of what to do next — never just a dead stop.
4. **Never blame John**, even when the cause is something he did (bad
   input, etc.) — correct helpfully, the way a good co-pilot corrects a
   pilot, not the way an error dialog scolds a user.
5. **Preserve what can be preserved.** If something breaks, protecting his
   existing progress/data is the priority — don't let a secondary failure
   compound into losing his actual work.

**Known gap, not yet fixed (flagged, not acted on per the current hold)**:
`utils/storage.js`'s save/load functions currently fail *silently* on
error (a deliberate choice at the time, reasoned as "the app still works,
it just won't persist") — that directly violates rule 1 above now that the
rule exists. Needs revisiting once building resumes.

## Wayfinding builds trust

Third trust pillar alongside error handling and (honest) testimonials —
named 2026-08-06, though partly already built without being named as this.
John should always know: where am I, what's next, how do I get back, how
far along is the whole journey. Getting lost is its own kind of trust
failure, quieter than an error but just as real.

**Already-built instances of this, now recognized as wayfinding rather than
separate features**: the "You are here" badge, step numbering ("Step X of
9"), the path strip's chronological connected-card layout, the kanban
board's column-as-status grouping, the progress counter ("X / 9 done").
These weren't planned together under one name — worth checking future
screens against wayfinding explicitly rather than rediscovering the need
each time.

**Open, not yet resolved**: testimonials — Kevin confirmed they help, but
real ones don't exist yet (no real users). Format still undecided: skip for
now, clearly-marked placeholder/illustrative, or real quotes gathered later
once shown to actual people. Not building until this is settled.

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

## Layout (current, superseding the original chat-left/plan-right plan)

The original 40/60 chat-left/plan-right split (first draft of this brief) was
built, then corrected away from — see the screen build log in
`neux-screen-concept.md` for the sequence. Current layout:

- **Plan panel — full width, primary.** Two coexisting views of the same 9
  milestones: a **path strip** (connected cards, chronological, the goal
  restyled as the destination) and a **kanban board** below it (To Do / In
  Progress / Done, drag-and-drop). Both always visible together, not a toggle.
- **Co-pilot — a compact fixed widget**, bottom-right, bounded height (not a
  full-height rail). Third placement iteration; landed here after full-panel
  and full-height-rail versions both felt wrong. Scoped Q&A only, not the
  primary interaction — see "Co-pilot, not pilot" in `neux-screen-concept.md`.

## Who is John (scope decision, 2026-08-06)

First-timer to record launches specifically — matches the JTBD and persona
as written. He is **not** a long-time NeU/X user with a history of past
projects; that would be a different, bigger product than what's documented
here. He **does** resume the same in-progress plan if he leaves and comes
back — single active project, persisted locally (`utils/storage.js`), not a
multi-project account system. If this scope ever needs to grow (multiple
past projects, real accounts), that's a deliberate, separate decision, not
something to slide into while building a feature.

## Tech stack

**React**, bootstrapped with Vite. Actual current components:
`EntryScreen`, `PlanPanel`, `PlanColumn`, `PlanStep`, `PathStrip`, `PathCard`,
`HelperRail`. Local state + `localStorage` persistence (single active
project); no auth, no database, no live backend. No real LLM call anywhere
— static, hand-written content, by deliberate choice (see the parent-context
conversion discussion below on why a backend/API-key investment isn't
justified yet without validated demand).

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

- [x] Repo name/location — `~/Desktop/neux`, own git repo, sibling to
      `kevin-portfolio-html`. No GitHub remote yet (local only).
- [x] Real plan-step content — yes, seeded and corrected against
      `neux-record-launch-map.md` (9 real milestones, not placeholder).
- [x] Static vs. real LLM — staying static/free deliberately (see "Parent
      context" above) — no validated demand yet to justify backend spend.
- [ ] NeU/X's own visual identity — still just plain/functional styling
      (colors simplified to one accent 2026-08-06), never deliberately
      designed. Still open.
- [ ] Does the portfolio case study page get updated now, or only once the
      app is further along? Still open, still deferred, not urgent per
      Kevin (2026-08-06).
- [ ] **New, surfaced by the conversion-gap finding**: the co-pilot's
      failure state ("I don't have a specific answer yet") is currently a
      dead end instead of a conversion moment. Not yet acted on.
