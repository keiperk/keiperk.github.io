# PMF Agent — Project Brief

Scopes a new portfolio project, narrowed down from a broader "research
assistant" idea that was too broad to brief honestly — "research" isn't
one job, it's many, and a case study needs one real judgment call, not a
swiss-army-knife of features. PMF (product-market-fit assessment) is the
piece that survives the narrowing: a single, genuinely agentic verdict,
not a research pipeline dressed up as one.

## What it is

An agent that takes someone's early product idea and tells them, with
real reasoning, whether the market evidence supports building it —
landing on a real go/no-go, not just a summary of findings.

## Job to be done

Reaching a real go/no-go decision about whether to build something,
grounded in actual market evidence — not a vague "seems promising" gut
check, and not a wall of research with no verdict at the end.

## Why this ties to the business-value-of-design throughline

This is the same thread that runs through nearly all of Kevin's work
(see `philosophy.md`): design work that's actually accountable to
whether the business succeeds, not decoration on top of a feature list.
A PMF agent makes that literal — its entire job is telling someone
whether a business idea has a real market before they spend months
building it.

## The running test case: Priya + a hypothetical astrology app

Used throughout goal-state derivation so the abstractions stay grounded.
Priya has an idea for an astrology "Transits" app (Kevin's own parked
idea, used here purely as a test case — the PMF agent itself is
domain-agnostic and doesn't care what it's evaluating). She wants to
know whether to actually build it. The PMF agent's conversion event is
**her decision** — go ahead and build it, or don't — not whether the
astrology app itself later succeeds. See `philosophy.md`'s
conversion-event-layering note: the agent's own delivered outcome is a
real decision reached, not the downstream outcome of the thing being
evaluated.

## Shape and platform

**Standalone app, not a Claude Code skill.** Decided 2026-08-27 —
"maximally usable by whoever does PMF" is the deciding argument: most
people running a PMF check (founders, PMs, designers) aren't Claude Code
users, so anything living inside that runtime is unusable by the actual
audience. Same architecture as FPC and Opportunity Radar: React/Vite
frontend, Vercel serverless backend, deployed and URL-shareable, no tool
install required to use it.

**One orchestrating agent, 3-4 dispatched non-agentic research skills.**
Run through the three tests in `agent-dispatch-test.md`:

- Problem validation, competitive landscape, willingness-to-pay (and a
  lighter market-size sanity check) are bucket 2 — real search/extract/
  summarize pipelines, same input converges on the same kind of output,
  no defensible disagreement between two people running the same
  search. Not agents on their own.
- Differentiation ("is there a real wedge") and distribution ("can she
  actually reach these people") aren't separate research at all — they
  get folded into the single synthesis step, alongside the final
  go/no-go. That step clears all three tests (can't finish an if/then
  rule for it; two competent advisors could defensibly land differently
  on identical evidence) — this is the one genuine agent.
- So: **one agent total**, orchestrating the gathering skills as tool
  calls, doing the one real judgment call itself. Same pattern as FPC
  (Fit and Close are the two real verdicts there; Prep is real skills,
  no judgment) — not a hierarchy of small agents, one decision-maker
  calling tools.

Cost note, stated plainly rather than glossed over: each real check
means several search+extract calls plus one longer synthesis call —
likely in FPC's "~$1 per check" range or a bit above, given more
research surface. Not a blocker, worth knowing going in.

## Goal-state table (draft — first pass)

Derived via `docs/professional-docs/transaction-space.md`'s method.
Symmetric by design, per the "no is a legitimate verdict" note in
`agent-dispatch-test.md` — a confident "don't build this" is as valid an
endpoint as a confident "go."

| # | item | goal state | conditions (type) | properties |
|---|---|---|---|---|
| 0 | Agent (top-level) | Priya has reached a real go/no-go decision about her idea, grounded in actual evidence | Market evidence gathered (R) · Evidence synthesized into a real verdict, not just a summary (R) · Verdict is allowed to be "no" as readily as "yes" (R) | the idea (one-line description), target user, category/competitors (optional) |
| 1 | Problem-validation skill | A real answer to whether the pain actually exists for real people, not assumed | Evidence pulled from forums/reviews/support-ticket-style complaints (R) · Nothing fabricated when evidence is thin — says "couldn't confirm," not invents anecdotes (R) | idea description, target user |
| 2 | Competitive-landscape skill | A real picture of who already solves this and how well | Existing products/competitors identified (R) · Their reviews (esp. 2-3 star) pulled for gap signals (R) | idea description, category/competitors (if known) |
| 3 | Willingness-to-pay skill | A real read on whether this category converts to paid, not just free usage | Pricing of comparable products pulled (R) · Category's track record on paid conversion checked, even roughly (R) | category, competitor list (from skill 2) |
| 4 | Market-size sanity check | A rough, honest read on whether this is a real category with real players — not a fabricated TAM | Category existence/activity confirmed (R) · No invented sizing numbers — states "not confidently sizeable" if true (R) | category |
| 5 | Synthesis / verdict skill (the one genuine agent) | A real go/no-go reached, reasoned from what skills 1-4 found, including the wedge and distribution questions | All four gathering skills' findings reviewed (R) · Differentiation ("is there a real wedge") reasoned about, not looked up (R) · Distribution reality ("can she reach these people") reasoned about (R) · Verdict stated plainly, "no" as legitimate as "go" (R) | outputs of skills 1-4 |

Skill 1 and skill 4's "don't fabricate" conditions are load-bearing, same
rule as `interview-prep-agent-brief.md`'s skill 1 — state the gap
honestly rather than inventing a number or an anecdote to fill it.

## Resolved: baseline rubric + optional user context (2026-08-27)

Was open (user-stated criteria vs. universal rubric); resolved as a
hybrid, not a pick between the two.

**Pure user-stated criteria was rejected** despite fitting `philosophy.md`'s
"always define success" principle on its face — it's vulnerable to
motivated reasoning. If Priya sets her own bar for "worth building," she
can (consciously or not) set it low enough to validate what she already
wants to hear, which defeats the point of an independent check and
quietly violates the "no is a legitimate verdict" rule in
`agent-dispatch-test.md` — if she can define her own success criteria,
she can define away the possibility of "no."

**Pure universal rubric was also rejected** — too rigid, ignores real
context that changes what a good outcome even looks like (a solo,
non-VC-scale side project shouldn't fail a rubric calibrated for
venture-scale opportunities).

**Landed on:** a fixed baseline the agent always checks independently —
the skill 1-4 dimensions (is the problem real, is there a wedge, will
anyone pay, is the market real) — plus optional user-supplied context
(bootstrap vs. funded, target scale, timeline) that shapes *how the
verdict gets interpreted*, never whether the evidence gets checked
honestly. Same shape as the Progressive Collection rules in
`philosophy.md`: universal fields upfront (idea, target user),
domain-specific context asked only when it'd sharpen the read, always
skippable, degrading gracefully to the generic baseline rather than
blocking. This keeps skill 5's verdict independent by construction.

## Status

Goal-state derivation started 2026-08-22, first pass only. Not yet
built — no code, no design system needed yet (style guide deferred
until there's something to style).
