# NeU/X — Discovery Notes

Trimmed 2026-08-07 — this was the original discovery scratchpad, but
large parts of it (screen inventory, build log, "decision" placeholders)
were tracking in-progress status that's now just wrong: decisions got
made, screens got built, and the doc never got updated to say so. That
tracking material is retired here — the actual current state lives in
`neux-redesign-brief.md` (the recipe table, the milestone list, what's
built). What's left below is the discovery reasoning that's still live —
not superseded by anything else, still genuinely useful.

Companion to `neux-journey-map.md` (John's experience *using* NeU/X) and
`neux-record-launch-map.md` (how a real record launch works) — both
split into their own files.

## The story (persona + narrative)

**John** is a bedroom producer. He's spent a year making his debut
record. He's never released anything commercially — no label, no
manager, no team. He knows music, not the music *business*. He's excited
and also a little scared he's going to screw up the release and it'll
just... disappear with no one hearing it.

John opens NeU/X because a friend said "it'll tell you what to actually
do."

**What happens, narratively, step by step:**

1. John doesn't know the release playbook exists yet — he just knows he
   has a record and a vague sense he needs "a plan." He states that.
2. NeU/X translates his vague goal into the *actual* steps a release
   requires — steps John didn't know he needed. This is the core value
   moment: turning ignorance into a legible plan.
3. John looks at the plan and it's a lot. He needs to understand *why*
   each step matters and *when* it needs to happen relative to his
   release date — not just a flat to-do list with no sense of
   order/urgency.
4. As John works the plan over days/weeks, he checks things off, and new
   questions come up. He needs a way to ask without losing the plan he's
   built.
5. His situation might change (release date slips) — the plan should
   still feel current, not stale/static.
6. Throughout, John needs to feel like he's doing this *right* —
   reassurance, not just data. First-timer anxiety is part of the
   emotional job here, not just the informational one.

## User stories (derived from the narrative, not assumed)

- I want to state my vague goal in plain language, so I don't need to
  already know the industry playbook to get started.
- I want my goal translated into the actual steps a release requires, so
  I know what I don't know.
- I want to see when each step needs to happen relative to my release
  date, so I don't do things too late (or too early).
- I want to track what I've done and what's left, so I have a sense of
  progress, not just a static wall of tasks.
- I want to ask follow-up questions as they come up, without losing the
  plan I've already built.
- I want the plan to adapt if my situation changes (date slips,
  priorities shift), so it stays useful, not a stale snapshot.
- I want to feel reassured I'm doing this right, since I've never
  released a record before — an emotional job, not only an informational
  one.

## Chat vs. plan (why chat is secondary)

Two *different* jobs, not one: turning a vague goal into a structured
plan (wants to feel like an answer generated, not a back-and-forth), vs.
ongoing questions + adapting the plan over time (genuinely conversational,
but secondary, as-needed). The main event is the goal-to-plan translation,
not the conversation.

**Co-pilot, not pilot.** John is the pilot. NeU/X is the co-pilot. A
co-pilot doesn't fly the plane, it helps the pilot fly it. The moment
chat becomes the primary, equal-width interaction, the product has
quietly made itself the pilot, which contradicts the premise.

## Product hypothesis (unvalidated — reasoning, not research)

**The bet:** John could already get a release plan for free (distributor
guides, YouTube, forums, or just asking an LLM directly). NeU/X's actual
differentiation isn't "AI generates a plan" — that's not novel. The
hypothesis is:

1. **Persistent memory of his specific situation** — follow-ups don't
   require re-explaining context from scratch every time.
2. **The plan is a trackable object**, not a wall of text he has to
   transcribe into his own checklist/notes app.
3. **Tailored to his actual inputs** rather than a generic listicle
   written for no one specific.

This is reasoning, not evidence. It's entirely possible John would just
Google it or ask a subreddit instead, and that would undercut the whole
premise. Not resolved — named honestly instead of building past it.

## Research plan (not executed — scoped for later, cheaply)

Goal: cheaply test the product hypothesis above before investing further.

| Question | Method | Cost |
|---|---|---|
| Would a real bedroom producer use an AI co-pilot for this, or default to free alternatives? | 4-5 short informal conversations with actual bedroom/independent musicians | Cheap, ~a few hours |
| Does "persistent memory of my situation" actually matter to them? | Same conversations — ask directly what frustrates them about existing free resources | Same effort, folded in |
| Is the record-launch scenario the right wedge, or would a different creator goal resonate more broadly? | Ask the same people about other goals they've had trouble planning | Same effort, folded in |
| Does the plan-panel-first + chat-secondary structure actually match how they'd want to interact? | Show the working app, watch/ask reactions | Can run now — the app exists |

**Still not executed as of 2026-08-07.** Ready to run whenever Kevin
wants to — the last research question can actually be tested now that a
real app exists, unlike when this was originally written.

## Business case — where does John actually save time or money?

Reasoning, not validated — but if this doesn't hold up stage-by-stage,
the product doesn't have a reason to exist beyond novelty.

| Journey stage | Time saved | Money saved | How real is this? |
|---|---|---|---|
| **Arrives** | Skips hours of scattered googling to figure out "what do I even need to do" | Indirect — less likely to pay a consultant just to get oriented | Fairly real — this is the core value moment |
| **Working the plan** | Avoids redoing work done in the wrong order | Missing a real deadline can cost momentum/revenue on release day | Real if the timing data is accurate |
| **Stuck** (ask a question) | Faster than searching forums for a specific answer | Avoids paying a consultant for a question with a standard answer | Real, but only if the answers are actually good — unproven |
| **Life happens** (plan adapts) | Avoids manually rebuilding the whole plan when the date slips | Indirect | Real but lower-stakes |
| **Release day / after** | Unclear | Unclear | Weakest-justified stage — now partially addressed by the "sell, not release" goal-state finding in the brief |
| **Return visit** | Doesn't have to re-explain his situation from scratch each time | Indirect | Real differentiator if built — and it is (localStorage persistence) |

**Bottom line:** the strongest, most defensible case is at **Arrives**
and **Working the plan**.
