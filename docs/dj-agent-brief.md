# DJ Agent — brief

## Pivot (2026-08-22): from "a DJ agent" to "an agent of Kevin"

Everything below this note was written before a real discussion surfaced
that the original framing was solution-first, not problem-first — jumped
straight to architecture (Spotify vs. local files, Vercel, etc.) without
settling what this actually is or who it's for. Re-derived:

**The real goal state:** Kevin can hand DJ duties at a real gathering to
an agent built specifically to represent *his* judgment — not a generic
competent DJ, one whose picks feel like something he would have chosen.
Checkable by whether he'd trust it unsupervised or keep reaching for the
aux cord back.

**Customer, concretely:** Kevin himself, v1. Not a product for strangers,
not chasing product-market fit in the market sense — Spotify already
ships a population-data AI DJ; this project's actual edge (per
`agent-dispatch-test.md`'s own logic) is situated curation from one
specific person's bounded, real collection, which a population-based
tool is structurally incapable of. That edge only exists at the
personal, evidence-grounded scale — diluting it into a generic
multi-user product too early would trade away the one thing that makes
it different from the incumbent.

**What makes the agent "Kevin" and not a generic DJ persona** — both,
combined:
1. **Evidence**: his real Discogs collection export (1,104 releases —
   artist, title, label, format, year, condition) plus, critically, his
   own **ratings** on those records — real personal taste signal, not
   a self-description.
2. **Self-reported**: Kevin directly describing his own taste/DJ
   philosophy, to fill in what ratings alone can't capture (why he'd
   sequence one way over another, what a "Kevin set" feels like).

**Two distinct use cases surfaced, deliberately not both built into v1:**
1. *Room-aware live DJing* — people present, reads a room/moment,
   picked as the primary target.
2. *Solo rediscovery* — browsing his own collection alone, "what would
   surprise me to hear again." Real, different goal state, explicitly
   deferred, not folded into v1's scope.

**Architectural consequence, decided now to avoid rework later:** collection
data + ratings + self-described taste are treated as swappable inputs to
the agent, not hardcoded to Kevin in code — so a friend's "agent of
themselves" is a later data-swap, not a rebuild. This does **not** mean
building multi-user accounts/auth for v1 — just not baking Kevin-specific
assumptions into the logic itself.

**Real complication surfaced, not yet resolved:** the Discogs export is
album-level (a release, not individual tracks) — no tracklist, no audio,
same as before. Getting to song-level picks needs either per-release
Discogs API calls (tracklist) or accepting album-level curation (the
agent picks which *record* to drop next, which may actually be the more
honest fit for "DJing from a real record collection" than song-skipping
ever was) — still an open decision, addressed below in a revised
goal-state pass once the room-aware use case is fully scoped.

## Second pivot (2026-08-22, same day): this is a portfolio case study

Not "a thing Kevin uses at parties" as the primary frame — a **design
research + agent-building portfolio piece**, same category as
`work/opportunity-radar/` and `work/neux/`, framed as if it were a school
assignment. This doesn't change the goal state above (still "an agent of
Kevin, handed real DJ duties"), but it changes what "done" requires:
the build has to be *documented and demonstrated* convincingly, not just
functional. It also argues for **keeping scope tighter, not broader** —
album-level over song-level, the real Discogs CSV over a live API
integration, no Spotify integration needed to prove the thesis. A
sprawling multi-service build risks burying the actual argument (genuine
situated curation, evidenced) under implementation noise.

This also means the project needs a real "Design research" section, in
the same convention as `neux`'s (research method → artifact → what it
fed into) — but evidentiary/empirical rather than interview-based, since
the actual claim being tested is "is this genuinely agentic," which can
be tested, not just described. Plan:

1. **Collection analysis** — real stats from the Discogs export, below.
2. **The three tests, answered in writing** — already in this doc, above
   the original-brief line, functions as the research artifact.
3. **A real experiment**: run identical session state through a naive
   rules engine and the real LLM agent side by side, compare picks +
   reasoning. Not yet run.
4. **Self-elicitation** — Kevin's own taste profile, below, standing in
   for a persona document since the subject is Kevin himself.

### Collection analysis (research artifact — real data, run 2026-08-22)

Source: `Homebound_Records-collection-20260816-1654.csv`, a real Discogs
collection export. 1,104 releases.

- **Format**: 753 LP, 249×12", 62×2xLP, 14×7", plus smaller counts —
  overwhelmingly vinyl, a real physical collection, not a streaming
  playlist import.
- **Decade skew**: 613 of 1,104 (well over half) are 1970s releases; 169
  from the 1980s, 96 from the 1960s. A real, specific center of gravity,
  not a flat/generic spread.
- **Top artists**: Herbie Hancock (16), Kool & The Gang (11), Curtis
  Mayfield (9), Miles Davis (8), Marvin Gaye (8), David Bowie (8), Stevie
  Wonder (7), The Temptations (6), New Order (5).
- **Rating column: 100% blank, all 1,104 rows.** A real, honest negative
  finding — the original plan to use star ratings as differentiated
  taste evidence doesn't work; there is no such data. Kevin's own
  explanation: rating each item at add-time was too much friction, so he
  never did it — an honest, ordinary reason, not a data-quality bug.
- **Reframed finding, not just a null result**: inclusion in the
  collection is itself a real signal, just a *uniform floor*, not
  differentiated ranking — "if it's in the collection, it's at least 3
  stars minimum" (Kevin's own framing). This distinguishes "no taste
  signal at all" from "a flat but real curation signal" — worth stating
  precisely rather than collapsing both into "no data."

Consequence: the collection data tells the agent *what Kevin owns and
that all of it cleared some bar*; it cannot tell the agent *what he'd
reach for first*. That differentiation has to come from the taste
profile below — it's load-bearing, not supplementary.

### Kevin's taste profile (research artifact — self-elicited, 2026-08-22)

Standing in for a persona document, since the subject is Kevin himself
rather than a research participant.

**The throughline is soul — as a quality, not a genre.** This is what
explains why artists as different as Curtis Mayfield and David Bowie and
New Order all sit in the same collection: not a shared genre tag, a
shared quality that cuts across genre. Confirmed explicitly: genre-soul
tracks alone would not describe the throughline; a specific Bowie or New
Order record can have it despite not being genre-soul at all.

**What "has soul" actually means, in Kevin's own words, unpacked:**
- Audible **care in the craft** — detectable "if you listen between the
  notes"
- **Quality of the making itself** — not polish, something more like
  intention
- **Belief** — the performer/maker actually meant it
- **Some struggle** — not effortless, a real cost or difficulty behind it
- **Authenticity** — the throughline word Kevin used to summarize the rest

This is deliberately hard to formalize — that's the point, and it's real
evidence for the three-tests case, not just a stylistic flourish: "care
in the craft," "belief," and "some struggle" are not thresholds a rule
can check (no metadata field measures belief). This is exactly the kind
of ambiguity test 1 (agent-dispatch-test.md) is built to catch: an
if/then rule for "does this have soul" collapses immediately, because
the inputs it would need to check don't exist as data at all — only as
a holistic listen. Whether an LLM can actually approximate this
judgment from title/artist/era alone (with no audio, per this project's
scoping) rather than really "listening between the notes" is itself an
open, honest question the research experiment (item 3 above) should
surface, not assume answered.

**Resolves the album/track question**: since "soul" is a quality read
off a whole record, not a genre requiring individual track boundaries,
album-level curation (pick the next *record*, not the next *song*) is
sufficient to express this throughline. No need for Discogs per-release
API calls or tracklist data — confirmed decision, not just a scope cut.

### Third clarification (2026-08-22, same day): a setlist is not the agent

A real distinction Kevin drew, worth being precise about since it's the
actual crux of the project: feeding the agent the whole collection and
letting it compose a full setlist **in advance** — even with real
reasoning behind each track — is bucket 2 (LLM-powered pipeline), not
bucket 3. Identical inputs (collection + taste profile) produce the same
output every time; nothing about it responds to anything that hasn't
happened yet. Real and useful, but not an agent, by this project's own
test.

**What makes it a genuine agent**: it has to respond *in the moment* to
the room's shifting mood, between every single pick — not once at
session start. Since there is no way for the app to sense a physical
room (no mic, no camera — established earlier), this has to be a real,
repeated input: after each record, someone (Kevin, at the gathering)
tells the agent something like "energy's dying," "people just started
dancing," "got quieter." That's the perceive step re-firing each round —
the actual mechanism that makes the loop genuinely reactive rather than
scheduled.

**Consequence for what's built**: the old app's "steering" field was a
one-time input, typed once at session start — wrong shape for this. It
needs to be a **live, repeated check-in, asked again after every pick**,
not a single upfront setting. This is the real difference between
"composes a good setlist" and "is an agent," and it's the piece the demo
has to make visible to prove the thesis.

---

## Original brief (pre-pivot, kept for the record)

A learning prototype: build one genuinely agentic decision — what plays
next — and understand, concretely, what makes it agentic versus a
recommendation engine or a rules engine wearing an agent costume.
Standalone project, `work/dj-agent/`, sibling to `neux` and
`opportunity-radar`. Not a customer product — the "customer" is Kevin's
own understanding of what agents can and can't do, proven by a working
build rather than asserted.

## The three tests (from `agent-dispatch-test.md`), answered for this decision

**1. Could you write the rule down?**
No — tried, and it collapses immediately. "Pick the track with tempo
closest to the last one" breaks the first time the room's energy needs
to *change*, not match. "Pick the highest-energy unplayed track" breaks
the first time the right move is actually to bring energy *down* for
pacing. Every fix needs another exception (how long since a genre
repeated, whether the last three picks were all the same key, whether
the session is 10 minutes old or 90) and the exceptions don't converge
to a finished rule — they keep branching. That's the actual signal, not
a feeling.

**2. Is a simpler tool structurally capable of this at all?**
No, and for a structural reason, not a "not as nice" reason: a
recommendation engine needs population data (what do people like this
listener usually play next) to function, and this problem has no
population to draw on — it's one person's own dropped-in files, a
session only they were part of. There's nothing to statistically
converge toward. A lookup or scoring formula could produce *a* next
track, but not one grounded in this specific session's trajectory.

**3. Would two competent people reasonably disagree, given identical input?**
Yes. Two people who both know how to run a set, looking at the exact
same session state (same tracks played, same energy curve, same library
remaining), would defensibly make different next picks — one favoring
a slow build, another favoring a deliberate reset. Both reasoned,
neither wrong. That's real judgment, not randomness.

## Situated curation check

All four conditions, from `agent-dispatch-test.md`:

1. **Bounded, real, personally-specific inventory** — yes: whatever
   files the person actually drags in, nothing generic or infinite.
2. **Specific situated context, reasoned holistically** — yes: the
   session's energy trajectory, what's already played, how long it's
   run, not itemized as separate independent checks.
3. **No population data to lean on** — yes: no other listeners' data
   enters the decision at all.
4. **Selects/arranges from what already exists** — yes: picks the next
   track from the dropped-in library, doesn't generate anything.

Clears all three tests and the situated-curation shape. Bucket 3.

## What this rules out, on purpose

A hand-written heuristic ("if energy dropped more than X, pick a track
with tempo within Y of Z") is bucket 1 by test 1 above, no matter how
many signals it checks or how it's dressed up. Kevin was explicit: the
point is the real agentic experience, not a rules engine or a
recommendation engine wearing one. So the decision step is a real LLM
call reasoning over the session, not client-side heuristic logic scoring
tracks against fixed thresholds.

## What the agent actually receives and returns

**Input, per decision:**
- The remaining unplayed tracks in the library, with whatever metadata
  is actually extractable client-side (tempo/BPM, estimated energy,
  duration, filename/title — see open question below on what Web Audio
  API can realistically give it)
- The play history so far this session (order, timestamps)
- Any active steering constraint from the person (optional — see
  goal-state condition 5, "wind down," "keep it high energy," etc.)

**Output, per decision:**
- The chosen next track (must be one of the remaining tracks — situated
  curation selects from what exists, it doesn't invent one)
- A stated reason in plain language, not a score — this is what makes
  the judgment visible and checkable, and what "genuine agent, not
  black box" actually requires in practice
- Optionally, a `insufficient_basis` flag + explanation when the library
  or session state doesn't give it enough to make a real call (empty
  remaining library, all metadata missing) — the honest-limits condition
  from the goal-state derivation

## Real cost/infra consequence — the actual reason this needed a brief

This project deploys as a static site (`work/dj-agent/app/`, same as
`neux/app/`) via GitHub Pages. A real LLM call can't run there — no
server, and API keys can't live in browser JS. This means:

- A small proxy/backend is required somewhere outside this repo (a
  Vercel/Netlify function, or similar) to hold the API key and forward
  the request. This is the one piece of the project that can't be "just
  files in this repo."
- Every decision is a real, billed API call — same real cost Fit had in
  Opportunity Radar (~$1/company there). Worth watching usage, same as
  that case study flagged honestly rather than glossing over.
- Load the `claude-api` skill before writing the actual integration —
  model choice, pricing, and whether this fits a single Messages API
  call or needs tool use, hasn't been decided yet.

## Resolved

- **Hosting the proxy, not "bring your own key."** Real per-call cost is
  trivial — Claude Haiku 4.5, roughly $0.003–$0.015 per track decision,
  a few cents to ~30¢ for a full session even on a large library. That
  makes the cost objection to hosting a small proxy mostly moot; Kevin
  chose to host it so friends need zero setup, matching the original
  "just pass it to friends" goal cleanly rather than trading it away.
  Volume from real usage, not per-call price, is the actual thing worth
  watching later, same caution as Fit in Opportunity Radar.

## Open questions, not yet resolved

- What can Web Audio API realistically extract client-side (tempo
  estimation from raw audio is nontrivial; energy is more tractable via
  RMS/amplitude analysis) — needs a real spike, not an assumption, before
  the agent's input shape is finalized.
- Where specifically the proxy gets deployed (Vercel/Netlify function,
  or something else) — still open.
