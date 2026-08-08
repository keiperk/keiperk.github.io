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

As a bedroom music producer, my real goal is to **sell my debut record — not
just release it** (corrected 2026-08-07; John isn't giving it away for free).
Turning that into a concrete, sequenced plan means starting with the
release-readiness milestones that make selling possible at all — pre-save
campaign, release timeline, distribution, press/playlist outreach, content
cadence — without already knowing the music industry playbook, so I can
launch my record with a real strategy instead of guessing.

**Scope note**: NeU/X's current 10 milestones take John through
release-readiness — getting the record actually sellable and released — not
the full sales outcome itself. What "sold" would really require (sustained
promotion past launch week, sales/streaming numbers tracked against a real
target, a reinvestment decision, royalties collected) isn't built and isn't
scoped yet. That's a real, known gap, not an oversight — see the "Milestone
content: the goal-state method" section below for the backtrack from "sell"
that surfaced it.

This is the anchor for the whole core screen: the chat is where the goal gets
stated, the plan panel is the "playbook" made concrete.

## Design axioms — NeU/X's application

Full axioms (the three-word triad, the customer-service-relationship
framing, trust-as-mechanism) live in
`~/Desktop/professional-docs/philosophy.md` — this section is only
NeU/X's own instance of them, not a restatement.

**NeU/X's conversion event, named concretely**: John has paid (for Pro),
or will soon. Retention/engagement matter only as leading indicators
toward that.

**Kevin's own assessment (2026-08-06): "80% or more is just this
relationship."** The salutation, persistence, honest-limits copy, draft
artifacts, the co-pilot widget — these aren't a features list with a
relationship axiom bolted on; they're mostly *instances* of managing this
one relationship.

NeU/X's own three working rules, checked against every new feature:

1. **Build trust, always.** John is a first-timer with real anxiety about
   screwing this up (see persona in `neux-screen-concept.md`) — every
   interaction either earns trust or spends it. Be honest about limits
   rather than fake confidence (e.g. the Co-pilot rail says "I don't have
   a specific answer for that yet" instead of guessing).
2. **Be helpful, don't make him think.** Minimize cognitive load at every
   step — clear labels, no jargon, one primary action per screen.
3. **Do the work, don't just describe it.** The product's job is to
   produce something usable, not just organize/describe tasks — a to-do
   list that only tells him what to do is half the value; handing him a
   usable first draft is the other half.

## Milestone content: the goal-state method — NeU/X's application

Full method (goal state → conditions → properties/types, plus its scope
boundary) lives in `~/Desktop/professional-docs/philosophy.md` — this
section is NeU/X's own applied output, not a restatement. NeU/X is, at
bottom, a **goal achievement wizard**: the method is how it decides what
any given step actually needs to ask for and check. Applied to milestone
#2 (artwork/metadata) first, 2026-08-07, then every milestone after.

Groupings (e.g. artwork's "Metadata" vs. "Artwork" sections), CTAs (e.g.
the Canva link, tied to the cover-art condition being hard to satisfy
alone), and purely informational content (e.g. the ISRC/UPC note —
informs John, gates nothing) all fall out of the decomposition, not
designed separately per milestone. See `neux-record-launch-map.md` for
the real-world source material this gets derived from — the method
organizes that content, it doesn't invent it.

**Style follows category, not milestone.** Once content is decomposed
this way, styling is a lookup by *kind of thing*, not a per-milestone
decision: every required boolean condition looks the same everywhere
(`.milestone-checklist__row`), every data property the same
(`__section`), every assistive CTA the same (`__cta`), every purely
informational note the same (`__note`). A new milestone's checklist
should mostly be *composing* these existing category styles, not
inventing new ones — see `ArtworkChecklist.jsx` (established the
`.artwork-checklist__*` version first) and `DistributionChecklist.jsx`/
`PressChecklist.jsx` (first to use the generalized `.milestone-
checklist__*` classes instead of re-deriving them).

**The full recipe, working backward from the top-level goal.** John's
goal state ("I successfully launched my record") decomposes into these
9 milestone-level goal states, each with its own condition/type/
property recipe. R = required (gates completion), O = optional
richness (doesn't gate).

| # | Milestone | Goal state | Conditions (type) | Properties |
|---|---|---|---|---|
| 1 | Lock release date | A date is committed that everything else schedules against | Date is set (R, auto-satisfied at entry) | `releaseDate` (date) — collected on the entry screen, no milestone UI needed |
| 2 | Finalize artwork & metadata | Distributor's requirements are met | Cover art ready (R, boolean); credits filled (R, compound-boolean); genre set (R, text-presence) | `hasCoverArt` (bool) + `coverArtPreview` (file, O); `credits.writtenBy`/`credits.performedBy` (text, R) + `producedBy`/`mixedBy`/`masteredBy` (text, O); `genre` (text) |
| 3 | Submit to distributor | Release submitted and accepted for processing | Distributor chosen (R, choice); submission done (R, boolean) | `distributorName` (select); `submissionConfirmed` (bool) |
| 4 | Press & blog outreach | Press/blogs have been pitched | At least one pitch sent (R, boolean) | `pitchesSent` (bool); `outletsPitched` (number, O) |
| 5 | Pitch playlist curators | Track submitted for playlist consideration | Spotify for Artists submitted (R, boolean) | `spotifyForArtistsSubmitted` (bool); `independentCuratorsPitched` (bool, O) |
| 6 | Open pre-save campaign | Pre-save is live and shareable | Link exists and is live (R, text-presence) | `presaveUrl` (text/url) |
| 7 | Teaser content ramp-up | Teaser content has actually been published | At least one teaser posted (R, boolean) | `teaserPostsPublished` (bool); `countdownStarted` (bool, O) |
| 8 | Release day actions | Release is live and actively announced | Confirmed live (R, boolean); announced everywhere (R, boolean) | `releaseConfirmedLive` (bool); `announcedEverywhere` (bool) |
| 9 | Post-release follow-up | The loop is closed on this release | Fans thanked (R, boolean); performance reviewed (R, boolean) | `fansThanked` (bool); `performanceReviewed` (bool); `nextStepsNoted` (text, O) |

Implemented in `plan.js` (the 9 steps) and one checklist component per
row (`ArtworkChecklist.jsx` through `FollowUpChecklist.jsx`), registered
in `StepDetail.jsx`'s `MILESTONE_EXTRAS` map. Milestone 1 has no
component — its recipe is satisfied before the plan even generates.

## Error handling, progressive collection & wayfinding

These were discovered here (2026-08-06) but turned out to be genuinely
cross-project — moved to `~/.claude/CLAUDE.md` (2026-08-07) once that was
clear, same as the goal-state method. Full rules live there now; what
stays here is NeU/X's own application of them.

**Error handling — known gap, not yet fixed** (flagged, not acted on per
the current hold): `utils/storage.js`'s save/load functions currently fail
*silently* on error (a deliberate choice at the time, reasoned as "the app
still works, it just won't persist") — directly violates the "never fail
silently" rule. Needs revisiting once building resumes.

**Wayfinding — already-built instances**, recognized as wayfinding rather
than separate features once the principle was named: the "You are here"
badge, step numbering ("Step X of 10"), the path strip's chronological
connected-card layout, the kanban board's column-as-status grouping, the
progress counter ("X / 10 done"). These weren't planned together under one
name — worth checking future screens against wayfinding explicitly rather
than rediscovering the need each time.

**Wayfinding — open, not yet resolved**: testimonials, a fourth trust
pillar alongside error handling and wayfinding. Kevin confirmed they help,
but real ones don't exist yet (no real users). Format still undecided:
skip for now, clearly-marked placeholder/illustrative, or real quotes
gathered later once shown to actual people. Not building until settled.

**Progressive collection — NeU/X's own correction story**: "ask
progressively" was stated as a principle 2026-08-06 but not actually built
that day — documented intent outran the code, which is exactly the
failure mode the rule exists to catch. Corrected the same day once the
gap was noticed (style/audience fields moved off the entry screen, into
inline "sharpen this draft" fields at point of use).

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

**Discoveries worth surfacing in the case study (running list, add as found):**
- **The goal-state method doesn't fit every milestone the same way.** Applied
  cleanly to 9 of 10 milestones (flat conditions: required + optional-richness
  properties). "Launch email campaign" broke that pattern — its honest goal
  state ("the mailing list was meaningfully engaged across the campaign")
  doesn't decompose into flat conditions, it decomposes into a *sequence of
  named sub-items* (announcement/pre-save-reminder/launch-day/thank-you
  emails, each with its own drafted/scheduled/sent/results lifecycle) — the
  sub-task pattern tabled earlier for cost reasons, not the flat pattern
  used everywhere else. Shipped the flat version anyway as a deliberate,
  named tradeoff (2026-08-07): "this is more proof of concept than polished
  app" — the gap is documented, not hidden. Worth the case study showing
  *why* one milestone needed a different shape, not just that it exists.
- **The top-level goal state itself was wrong, not just a milestone's.**
  Applying the same method one level up — to the JTBD, not a milestone —
  surfaced that "I'm releasing my debut record" was never the real goal
  state; John's actual goal is to *sell* it (corrected 2026-08-07: "John
  isn't giving it away for free"). Backtracking from "sold" instead of
  "released" surfaces conditions the current 10 milestones don't cover at
  all: sales/streaming tracked against a real target, sustained promotion
  past launch week (most releases decay fast without it), a reinvestment
  decision (spend more based on early signal or not), royalties actually
  collected (arrives on a lag, isn't real-time). NeU/X's current scope is
  really "get the record sellable and released" — a sub-goal of the real
  goal, not the whole thing. Named and scoped as a known gap (2026-08-07),
  not built. Good case-study material: even the top-level framing needed
  the same discipline as any individual milestone, and almost shipped
  wrong.

## Open questions

- [x] Repo name/location — `~/Desktop/neux`, own git repo, sibling to
      `kevin-portfolio-html`. No GitHub remote yet (local only).
- [x] Real plan-step content — yes, seeded and corrected against
      `neux-record-launch-map.md` (9 real milestones, not placeholder).
- [x] Static vs. real LLM — staying static/free deliberately (see "Parent
      context" above) — no validated demand yet to justify backend spend.
      **Honest self-check (2026-08-06)**: as of this date, literally nothing
      in NeU/X is real AI — plan "generation" is a lookup table, drafts are
      string templates, the Co-pilot widget is keyword matching. This is a
      UX mockup of an AI co-pilot, not an AI co-pilot, by deliberate choice.
      **Sequencing, confirmed by Kevin**: prove the UX free/static now
      (phase 1, current); wire real AI into one narrow, cheap place —
      likely the Co-pilot widget — once there's both validated demand and
      budget (phase 2, later, not now — "I have like no money now").
      **Phase 2's actual spec, sharpened 2026-08-07**: it isn't a vague
      "add AI here" — it's automating the goal-state method itself. Right
      now the 9-milestone recipe table (above) was derived by hand, once,
      for 3 hardcoded goal templates. A real implementation feeds the
      user's actual goal text to an LLM, has it run the same 3-step
      method (goal state → conditions → properties/types), and renders
      the same checklist components dynamically from that output —
      instead of only ever supporting record/YouTube/course. Kevin's
      insight: the manual derivation done in this session *is* the
      algorithm, not a stand-in for one still to be invented.
- [ ] NeU/X's own visual identity — still just plain/functional styling
      (colors simplified to one accent 2026-08-06), never deliberately
      designed. Still open.
- [ ] Does the portfolio case study page get updated now, or only once the
      app is further along? Still open, still deferred, not urgent per
      Kevin (2026-08-06).
- [ ] **New, surfaced by the conversion-gap finding**: the co-pilot's
      failure state ("I don't have a specific answer yet") is currently a
      dead end instead of a conversion moment. Not yet acted on.
