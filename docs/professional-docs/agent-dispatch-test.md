# The Agent Dispatch Test

A short, reusable check for one question: **does this specific piece of
work actually need an agent, or is a simpler tool being dressed up as
one?** Meant to be pasted or linked at the top of any skill/agent `.md`
file before it gets built, so the justification is derived and written
down, not assumed. Companion to `philosophy.md` and
`transaction-space.md` in this same folder — those cover the
relationship/goal-state side of a product; this covers the *mechanism*
side, specifically whether "agent" is the right mechanism at all.

Derived across real projects — Opportunity Radar (n8n pipeline, not
agentic), the Job Triage / Fit / Interview Prep / Close suite (mixed:
one genuinely agentic skill per agent, several real-but-not-agentic
research skills), and a DJ-curation exercise chosen specifically because
it passes the test more cleanly than any of them.

## The core definition

An agent does **holistic judgment over genuinely ambiguous input that
changes what happens next** — not "aware of its environment and makes
decisions" (too loose; a thermostat clears that bar) and not "uses an
LLM" (a research pipeline can use ten LLM calls and still not be
agentic, if none of them involve a real judgment call).

## Three tests, run in order

**1. Could you write the rule down?**
Try to finish an if/then rule for the decision. If it collapses into
endless exceptions before you can finish a sentence, that's real
evidence of genuine ambiguity — not a feeling, a falsifiable check you
just ran. ("If genre matches and it's after 11pm, play it" — immediately
needs exceptions for room energy, what just played, who's in the crowd.
Can't be finished. That's the signal.)

**2. Is a simpler tool structurally capable of this at all?**
Not "would an agent be nicer" — could a rules engine, a lookup, a scoring
formula, or a statistical/ML recommender actually do this job, even
imperfectly? If a simpler tool could get most of the way there and an
agent only sharpens the last mile, that's still often worth naming
honestly — sometimes the simpler tool is fine. If the simpler tool is
the *wrong shape entirely* (e.g. a recommendation engine needs
population data to function, and the real problem has no population to
draw on), that's a structural disqualification, not a preference.

**3. Would two competent people reasonably disagree, given identical
input?**
If yes — same facts, same context, defensibly different outputs — that's
the clearest single tell. The disagreement has to be an **informed
opinion**: reasoned and defensible from the real evidence, not an
arbitrary preference. ("Pick any color" produces disagreement too, but
there's no reasoning chain behind either answer — that's randomness, not
judgment, and doesn't clear this bar.) If everyone with the same input
converges on the same answer, it's extraction or synthesis, not
judgment. If nobody's answer is actually grounded in the input at all,
it's noise, not judgment either.

## The three buckets

Sort any piece of work into exactly one of these before building it:

1. **Rules / truthiness gates** — deterministic, no ambiguity, a
   formula or lookup fully resolves it.
2. **LLM-powered pipeline** — real language work (search, extraction,
   summarization, synthesis) but no judgment call; the same input always
   produces the same *kind* of output. Calling this "an agent" is a
   demotion for the tool that actually matters, not a promotion —
   pipelines are real and useful, just a different category.
3. **Genuine agent** — clears all three tests above. A real verdict, a
   real selection, a real judgment that could defensibly land elsewhere
   from identical input.

Most real products are bucket 2 with exactly one bucket-3 piece inside
them, not bucket 3 end to end — worth stating plainly rather than
letting "we use AI" imply more judgment happened than actually did.

## A sharper pattern within bucket 3: situated curation

One recurring shape worth naming on its own, since it's an especially
clean version of a genuine agent: **situated curation from a finite
personal inventory.** Four conditions, all required:

1. A **bounded, real, personally-specific inventory** (not infinite,
   not generic)
2. A **specific situated context** reasoned about holistically, not
   itemized
3. **No population data to lean on** — nothing to statistically
   converge toward
4. The output **selects/arranges from what already exists**, not
   generation from nothing

Drop any one condition and it becomes a different, more common problem:
drop 1 and it's generic recommendation (population-based rec-sys —
Spotify, not an agent by this test); drop 2 and it's static ranking, no
judgment required; drop 3 and it's back to population-based rec-sys from
another angle; drop 4 and it's generation, a different kind of ambiguity
(unbounded possibility space) rather than curation.

Examples that share this exact shape: a DJ building a set from a real
record collection for a specific room and crowd; a chef cooking from a
real, finite pantry for real guests; a sommelier pairing from a specific
cellar; a stylist building an outfit from someone's actual closet; a
curator sequencing a themed show from a permanent collection. `fitJudgment`
(interview-prep-agent-brief.md) is agentic by the three tests above but
does *not* have this specific shape — it has no bounded personal
inventory to select from, it's a single judgment call on one input, not
a selection among many.

## How to use this

Paste the "Three tests" and "Three buckets" sections at the top of any
new skill or agent `.md` before writing its actual prompt — answer them
in writing, in the file, before building. If a skill can't clear the
three tests, name it what it actually is (a pipeline, a lookup) rather
than calling it an agent. This is the same discipline as the goal-state
method in `transaction-space.md`: derive it and write it down, don't
assert it and move on.
