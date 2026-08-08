# The goal-state method — customer service transaction space

Split out of `philosophy.md` (2026-08-08) — a distinct, self-contained
method, not general relationship philosophy. The concrete "how" under
philosophy.md's "Always define success."

## The method

Whenever a feature is goal-oriented — a milestone, a step, a task, a
wizard screen — derive it in this order, not by designing the UI first:

1. **Goal state.** What does "done" concretely mean, in real-world terms,
   not app terms? (Not "the form is filled out" — "the distributor has
   accepted the release for processing.")
2. **Conditions.** Decompose the goal state into the truth-evaluable facts
   that must *all* hold for it to be considered reached. Some conditions
   are required; some represent optional richness that doesn't gate
   completion — say which is which.
3. **Property values.** For each condition, what data is actually needed
   to check it? Only after this does **property type** (text / boolean /
   file / date / choice) become relevant — type determines the input
   control, but it's derived, not chosen first.

Everything past this — which fields group together, what CTAs exist,
what's purely informational (helps the person but doesn't gate anything,
like a rule they don't need to act on) — falls out of the decomposition
above. It isn't separate creative work, and shouldn't be designed before
the goal state is defined. If a goal state can't be stated concretely in
real-world terms, the feature isn't ready to be built yet — that's the
same failure mode as a vague conversion event, just at the feature level
instead of the product level.

This generalizes past any single feature too: applying it one level up to
a whole product's top-level goal (not "release the record," but "sell the
record") caught a goal state that was wrong all along, not just imprecise
at the milestone level — worth re-checking the top-level goal, not just
individual features, against this method.

## Scope boundary

This method applies to closed, transaction-based, goal-oriented UX —
something with a real "done" state to work backward from. It does not
cover trust/relationship elements (an honest status message, a "here's
what happens to your data" note — these don't collect a property or gate
a condition, they exist to make the relationship feel safe) or open-ended,
non-transactional UX (browsing, exploring, creating, anything without a
single goal state to decompose). Don't force the method onto those —
they're real UX work, just a different kind, governed by `philosophy.md`'s
"always build trust" instead.
