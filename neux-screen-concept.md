# NeU/X — Core Screen Concept Exploration

Purpose: think through *what the user actually sees and needs* before locking any
layout or writing code. This doc is the place to argue with the idea cheaply.
Companion to `neux-redesign-brief.md` (which currently states chat+plan as the
layout — that line is provisional until this doc says otherwise).

## The story (persona + narrative, before any UI decisions)

**John** is a bedroom producer. He's spent a year making his debut record. He's
never released anything commercially — no label, no manager, no team. He knows
music, not the music *business*. He's excited and also a little scared he's
going to screw up the release and it'll just... disappear with no one hearing it.

John opens NeU/X because a friend said "it'll tell you what to actually do."

**What happens, narratively, step by step:**

1. John doesn't know the release playbook exists yet — he just knows he has a
   record and a vague sense he needs "a plan." He states that.
2. NeU/X translates his vague goal into the *actual* steps a release requires
   (pre-save, timeline, distribution, press, content) — steps John didn't know
   he needed. This is the core value moment: turning ignorance into a legible
   plan.
3. John looks at the plan and it's a lot. He needs to understand *why* each
   step matters and *when* it needs to happen relative to his release date —
   not just a flat to-do list with no sense of order/urgency.
4. As John works the plan over days/weeks, he checks things off, and new
   questions come up ("how far ahead do I actually need to submit to
   Spotify?"). He needs a way to ask without losing the plan he's built.
5. His situation might change (release date slips) — the plan should still
   feel current, not stale/static.
6. Throughout, John needs to feel like he's doing this *right* — reassurance,
   not just data. First-timer anxiety is part of the emotional job here, not
   just the informational one.

## User stories (derived from the narrative, not assumed)

- As a bedroom producer, **I want to state my vague goal in plain language**,
  so I don't need to already know the industry playbook to get started.
- As a bedroom producer, **I want my goal translated into the actual steps a
  release requires**, so I know what I don't know.
- As a bedroom producer, **I want to see when each step needs to happen
  relative to my release date**, so I don't do things too late (or too early)
  — order/timing matters, not just a flat list.
- As a bedroom producer, **I want to track what I've done and what's left**,
  so I have a sense of progress, not just a static wall of tasks.
- As a bedroom producer, **I want to ask follow-up questions as they come up**,
  without losing the plan I've already built, so I'm not stuck when I hit
  something I don't understand.
- As a bedroom producer, **I want the plan to adapt if my situation changes**
  (date slips, priorities shift), so it stays useful, not a stale snapshot.
- As a bedroom producer, **I want to feel reassured I'm doing this right**,
  since I've never released a record before — this is an emotional job, not
  only an informational one.

## What this implies about chat vs. plan (not yet a final layout decision)

Reading the stories above, two *different* jobs are happening, not one:

- **Turning a vague goal into a structured plan** (stories 1-3) — this wants
  to feel like an answer being generated, not a back-and-forth conversation.
  Points toward a single input → generated output moment (closer to what
  Kevin described: a lead prompt, not a chat thread).
- **Ongoing questions + adapting the plan over time** (stories 4-6) — this
  really does want something conversational, but it's a *secondary*,
  as-needed interaction, not the primary screen real estate.

So chat isn't wrong — but its role is support/refinement, not the main event.
The main event is the goal-to-plan translation. This matches what Kevin
described in the "Working direction" section below, and gives it a reasoned
backing instead of just a preference.

## The moment we're designing for

Bedroom producer just said (typed, or maybe spoke?) something like "I'm releasing
my debut record and I need a plan." What do they actually want to see happen next?

## Candidate directions (not decided — for reaction)

**A. Chat + generated plan panel** (what v1 was built against)
AI responds conversationally, plan appears/updates as a structured list beside it.
Feels like: talking to an assistant who's also taking notes for you.
Risk: is a plan best represented as a checklist, or does a musician think in a
timeline/calendar instead?

**B. Timeline/calendar first**
Goal in → straight to a release calendar (dated milestones: teaser date, pre-save
open, distributor submission deadline, release day, follow-up content). Chat is
secondary or absent from the core screen.
Feels like: a project plan, less like talking to someone.

**C. Conversational only, no persistent panel**
Just chat — the "plan" is something the AI describes and the user can ask to see
summarized, not a permanent split-screen structure.
Feels like: lightweight, but might not "feel like a product" without a visible
artifact being built.

**D. Something else entirely**
Not chat, not a checklist, not a calendar — a different mental model of what
"turning a goal into a plan" should look like on screen. (Open — describe if this
is closer to what you picture.)

## Questions to answer before any code

- [ ] When you picture yourself using this, what's the *first thing* on screen —
      before you've typed anything?
- [ ] Is "plan" a list of tasks, a calendar with dates, both, or something else?
- [ ] Does the AI conversation need to stay visible the whole time, or does it
      recede once a plan exists?
- [ ] Is this a single screen, or does the real product have more than one
      screen and we're only mocking the wrong one?

## Product hypothesis (unvalidated — reasoning, not research)

**The bet:** John could already get a release plan for free (distributor guides,
YouTube, r/WeAreTheMusicMakers, or just asking ChatGPT directly). NeU/X's actual
differentiation isn't "AI generates a plan" — that's not novel. The hypothesis is:

1. **Persistent memory of his specific situation** — follow-ups don't require
   re-explaining context from scratch every time, unlike a fresh ChatGPT session.
2. **The plan is a trackable object**, not a wall of text he has to transcribe
   into his own checklist/notes app.
3. **Tailored to his actual inputs** (genre, timeline, budget) rather than a
   generic listicle written for no one specific.

This is reasoning, not evidence. It's entirely possible John would just Google
it or ask a subreddit instead, and that would undercut the whole premise. Not
resolving that here — just naming it honestly instead of building past it.

## Research plan (not executed — scoped for later, cheaply)

Goal: cheaply test the product hypothesis above before investing further in UI.

| Question | Method | Cost |
|---|---|---|
| Would a real bedroom producer use an AI co-pilot for this, or default to free alternatives (Google, YouTube, Reddit, plain ChatGPT)? | 4-5 short informal conversations with actual bedroom/independent musicians (not a formal study — DMs, a forum post, or people Kevin already knows) | Cheap, ~a few hours |
| Does "persistent memory of my situation" actually matter to them, or is a one-off answer good enough? | Same conversations — ask directly what frustrates them about existing free resources | Same effort, folded into above |
| Is the record-launch scenario the right wedge, or would a different creator goal (e.g. growing a YouTube channel, launching a course) resonate more broadly? | Ask the same people about other goals they've had trouble planning, see if a pattern emerges beyond music | Same effort, folded into above |
| Once a rough prototype exists, does the plan-panel-first + chat-secondary structure actually match how they'd want to interact? | Show the prototype (once built), watch/ask reactions | After a working version exists — later phase |

**Explicitly not doing this now.** This is scoped so it's ready to run whenever
Kevin wants to, without blocking the design/build exploration already in
progress. The build plan below proceeds on the stated hypothesis, flagged as
unvalidated, not as a stalling point.

## Co-pilot, not pilot

John is the pilot. NeU/X is the co-pilot. This is the whole argument for why
chat is secondary, stated as plainly as possible — a co-pilot doesn't fly the
plane, it helps the pilot fly it. The moment chat becomes the primary,
equal-width interaction, the product has quietly made itself the pilot, which
contradicts the premise. This is a correction to the current build (see
Screen inventory below), not just a stylistic preference.

## Business case — where does John actually save time or money?

Reasoning, not validated (same caveat as the Product hypothesis below) — but
if this doesn't hold up stage-by-stage, the product doesn't have a reason to
exist beyond novelty. Forcing the question honestly:

| Journey stage | Time saved | Money saved | How real is this? |
|---|---|---|---|
| **Arrives** (entry → plan generated) | Skips hours of scattered googling/YouTube to figure out "what do I even need to do" | Indirect — less likely to pay a consultant just to get oriented | Fairly real — this is the core value moment |
| **Working the plan** (timing/sequence) | Avoids redoing work done in the wrong order | Missing a real deadline (e.g. distributor submission window) can cost momentum/revenue on release day — sequencing prevents that | Real if the timing data is accurate — this is exactly why build-plan item #3 (timing/urgency) matters, not a nice-to-have |
| **Stuck** (ask a question) | Faster than searching forums for a specific answer | Avoids paying a consultant for a question that has a standard answer | Real, but only if the answers are actually good — unproven |
| **Life happens** (plan adapts) | Avoids manually rebuilding the whole plan from scratch when the date slips | Indirect | Real but lower-stakes than the above |
| **Release day / after** | Unclear — this stage is underdesigned | Unclear | Honestly the weakest-justified stage right now — worth resolving before treating it as a real screen |
| **Return visit** | Doesn't have to re-explain his situation from scratch each time (vs. a fresh ChatGPT session) | Indirect | Ties directly to user story #1 — this is a real differentiator if built |

**Bottom line:** the strongest, most defensible time/money case is at
**Arrives** and **Working the plan** — that's where the product should be
best, if effort has to be prioritized. Release day is the weakest-justified
part of the whole journey and shouldn't get build effort until its actual
value is articulated.

## Journey map

| Stage | Arrives | Working the plan | Stuck | Life happens | Release day | Return visit |
|---|---|---|---|---|---|---|
| **What John's doing** | Opens NeU/X for the first time with just a vague goal | Reads his generated plan, starts knocking out early steps | Hits a step he doesn't understand (e.g. distributor lead time) | His release date slips two weeks | The plan's done, record is out | Closes the tab, comes back days/weeks later |
| **John's thoughts/feelings** | Excited but anxious — "I don't know what I don't know" | Relief — "OK, this is actually manageable" | Friction — "wait, what does this actually mean for me?" | Stress — "does my whole plan just... break now?" | Pride, maybe a little "now what?" | "Where did I leave off?" |
| **What he needs from NeU/X** | Translate a vague goal into a real plan, fast, without judgment | A clear sense of order/urgency and visible progress | A quick, low-friction way to ask without derailing his plan | The plan to absorb the change gracefully, not force a redo | Some kind of close/wrap-up, not just... nothing | To land back on his actual plan, not a blank entry screen — no re-explaining himself |
| **Touchpoint (maps to build plan #)** | Entry prompt (#1) → generation moment (#2) | Plan view w/ timing (#3), progress tracking (#4) | Secondary chat affordance (#5) | Plan adapts (#6) | *Not yet designed — flagged gap* | *Not yet designed — flagged gap* |
| **Risk if this stage is ignored** | Feels like a generic form, not a co-pilot | Feels like a wall of tasks, overwhelming | He abandons the plan, goes back to guessing | Plan feels stale/wrong, he stops trusting it | Product feels like it just... trails off | Product feels amnesiac — undercuts the whole "persistent object" value prop (user story #4) |

**6 official stages** (Return visit formalized 2026-08-06, previously an
unfolded implication surfaced during the screen inventory exercise). Release
day and Return visit remain flagged gaps — not designed yet, not being
designed in this pass, but no longer invisible.

## Screen inventory (derived from the journey map — the full happy path)

The journey map has 6 stages. Each stage implies at least one screen/state.
This is the complete set — not just the ones already built. Built piecemeal
before this existed, which was the actual mistake: screens were designed one
at a time, out of context of this list, instead of this list existing first.

| # | Journey stage | Screen / state needed | Status |
|---|---|---|---|
| 1 | Arrives | **Entry prompt** — "What do you want to do?" | ✅ Built |
| 2 | Arrives → Working | **Generation moment** — brief transition after submitting goal | ✅ Built (simple version) |
| 3 | Working the plan | **Plan view** — steps shown with progress tracking and real timing | ✅ Built — now includes real target-date + computed dates per step, sorted chronologically |
| 4 | Stuck | **Ask-a-question affordance** — lightweight way to ask without losing the plan | ✅ Built — persistent slim Co-pilot rail (right side), not per-step clutter, not a dominant panel |
| 5 | Life happens | **Adjust the plan** — update release date or a step, plan re-sequences | ❌ Not built — explicitly deferred earlier, but it's a real happy-path screen, not optional if we're honest about the journey |
| 6 | Release day | **Completion / wrap-up** — some acknowledgment the plan is done, not just... nothing | ❌ Not designed at all — this is the gap the journey map originally surfaced |
| 6 | Return visit | John closes the tab and comes back tomorrow; does he land on the entry screen again, or does it remember his plan? | ❌ Not built — formalized as official journey stage 2026-08-06 |

**What this means concretely:** the "happy path" is not 2 screens (entry +
working), it's realistically **5-6 screens/states**, and only about half are
built. The chat-as-secondary-affordance item (#4) is probably the most
important unbuilt piece, since right now the chat panel is still built as if
it were the primary interaction (contradicts the reasoning in "What this
implies about chat vs. plan" above) — that's a real inconsistency between the
doc and the current build, not just an unfinished feature.

**Return-visit (the new row)** matters more than it looks — if John can't come
back and find his plan, the whole "persistent object he can track" value
proposition (user story #4) breaks. This needs an answer before calling the
happy path complete, even in placeholder form (e.g. saved to local storage for
this demo, not a real account system).

## Screen build log

Filled in as each screen actually ships — the goal it served and how it was
solved, in plain language. This is the raw material for the eventual case
study (see "Work journal framing" in `neux-redesign-brief.md`) — write it as
it happens, not reconstructed from memory afterward.

| Screen | Goal (which journey stage / user story) | How it was solved | Shipped |
|---|---|---|---|
| Entry prompt | Arrives — John shouldn't need to already know the playbook to start | Single input, no chat thread, 3 example chips to lower the blank-page barrier | 2026-08-05 |
| Generation transition | Arrives → Working — the translation from vague goal to real plan should feel like something happened, not instant | Brief timed transition state before the plan appears | 2026-08-05 |
| Plan view (content) | Working the plan — the plan should reflect what John actually said, not be generic | Keyword-matched templates (record/YouTube/course) + fallback, so typing a different goal produces a different plan | 2026-08-06 |
| Stuck affordance (v1, corrected) | Stuck — first attempt was per-step "Ask about this" triggers on every card | Built, then immediately corrected on Kevin's real-time feedback: repeating the trigger on every card was clutter, not help — replaced with a single persistent, slim, secondary Co-pilot rail | 2026-08-06 |
| Timeline/urgency | Working the plan — flat list had no sense of order/urgency (business case gap) | Added real target-date input on entry screen; each step's weeksBefore computes an actual date, steps sort chronologically | 2026-08-06 |
| Kanban board | Working the plan — a flat list didn't let John act on status himself | Added drag-and-drop (@dnd-kit): To Do / In Progress / Done columns, mapped to existing status field | 2026-08-06 |
| Draft artifacts | Business case check ("does this actually move a needle, or just organize information?") surfaced that describing steps isn't the same as doing work — real gap, not a nice-to-have | Added static (no live AI, zero cost) hand-written draft templates for one step per goal type — pitch email, channel bio, waitlist announcement — personalized via new name/style/audience entry fields, with copy-to-clipboard | 2026-08-06 |
| *(next)* | | | |

## Build plan (mapped to John's journey, not assumed UI patterns)

Each step ties back to a specific beat in John's story above — nothing here
exists unless a story justified it.

| # | John's journey beat | Screen/state that supports it | Priority |
|---|---|---|---|
| 1 | He has a vague goal, doesn't know the playbook | **Entry prompt**: "What do you want to do/create?" — single input, not a chat thread | Core — build first |
| 2 | His goal gets translated into real steps | **Generation moment**: brief transition/loading state, then the plan appears — should feel like something was figured out *for* him, not instant/magic-free | Core |
| 3 | He needs to know order/timing, not just a flat list | **Plan view**: steps shown with timing/urgency relative to release date (e.g. "6 weeks out," "this week"), not just a checklist with no sense of sequence — this is a real change from v1, which had no timing info at all | Core |
| 4 | He tracks progress over time | **Progress state**: check things off, see completion — v1's checkbox pattern was actually fine for this one | Core |
| 5 | He has follow-up questions | **Secondary chat affordance**: something like a small "Ask NeU/X" entry point attached to the plan (maybe per-step, or a corner affordance) rather than a persistent half-screen panel — opens when needed, doesn't dominate the layout | Secondary — can be simple/minimal in this pass |
| 6 | His situation changes (date slips) | **Plan adapts**: some way to update the release date or a step and have the plan re-sequence | Later — not needed to validate the core screen |
| 7 | He needs to feel reassured, first-timer anxiety | **Tone/copy throughout**: encouraging, plain-language framing on every screen (not a separate feature, a writing quality across all of the above) | Core, but it's copywriting not a build step |

**What this changes from the v1 build:**
- Entry point becomes a single prompt/goal input, not a chat thread landing page
- Plan items need a timing/urgency signal (relative to release date), not just
  a flat status label
- Chat becomes a small supporting affordance, not equal-width persistent panel
- A generation/transition moment exists between input and plan — not instant

**What's explicitly out of scope for now:** the date-slip re-sequencing logic
(#6) — real but not needed to prove out whether the core screen concept works.

## Working direction (rough, 2026-08-05 — not fully locked)

Kevin's own description, kept close to his words rather than tidied into a
premature spec:

- **Lead screen** is an entry prompt — something like "What do you want to
  do/create?" — not a chat thread you land in.
- User types something short, e.g. "launch a record."
- System **deduces the milestones** from that single input.
- A **persistent panel** shows the resulting plan (close to what the v1 build
  already has for the plan side).
- A **chat panel** still exists somewhere (left or right, undecided) — there to
  help/refine, but secondary, not the primary interaction the way v1 built it.

Difference from v1 build: entry point is a single generative prompt, not an
ongoing conversation. Chat becomes supporting, not primary.

Explicitly not fully settled — Kevin flagged this is "too much too soon" to
nail down further right now. Fine to leave rough and pick back up later rather
than force more decisions in one sitting.

## Decision

*(not locked yet — see "Working direction" above. Once settled, write the final
answer here and update `neux-redesign-brief.md` to match.)*
