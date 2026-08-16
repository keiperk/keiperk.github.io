# Interview-Prep Agent — Project Brief

Scopes a new portfolio project, chosen specifically to demonstrate **agents +
skills** as a real architectural pattern — not a single "AI feature" doing
everything in one pass, but an agent that orchestrates a small number of
distinct, separately-invokable skills. Complements Opportunity Radar (one
linear pipeline, no orchestration/routing) rather than duplicating it.

## What it is

An agent that takes a company + role and produces real, specific interview
prep — grounded in what's actually true about the company and the role, not
generic "tell me about yourself" advice.

## Job to be done

Walking into a real interview prepped: knowing the company cold, and having
concrete talking points tied to the actual role — not rehearsed generalities
that could apply to any interview.

## The goal-state correction (worth keeping in the case study)

Top-level goal state started as "getting a job" — wrong, and wrong in the
*opposite* direction from NeU/X's correction. NeU/X's goal state was too
narrow ("released" when it should've been "sold"); this one was too broad —
"getting a job" isn't something an agent can own at all, the hiring decision
sits entirely outside its control. The real, ownable goal state is narrower:

**Walked into interview X fully prepped to talk about the role.**

That's the thing the agent can actually deliver and be judged on — a good
pairing with NeU/X's story for the case study: goal states can be wrong by
being too narrow *or* too broad, and the fix isn't always "scope up."

## Goal-state table

Derived via `docs/professional-docs/transaction-space.md`'s method
(goal state → conditions → properties), 2026-08-10.

| # | item | goal state | conditions (type) | properties |
|---|---|---|---|---|
| 0 | Agent (top-level) | Walked into interview X fully prepped — knows the company cold, has concrete talking points tied to the real role | Company research done (R) · Role-specific talking points prepared (R) · Interviewer research done (O — only runs if a name is supplied) | company name, role, interview date, interviewer name (optional) |
| 1 | Company research skill | A real, current picture of the company exists — not generic "about us" copy | Recent news/funding pulled (R) · Nothing fabricated when a fact isn't findable (R — must say "unknown," not guess) | company name |
| 1b | Interviewer research skill | If you're told who you're meeting, you know something real about them going in | Interviewer name supplied by the user, not discovered (R — see correction below) · Public background pulled once a name exists (news, talks, posts) (O — best-effort, may still come up empty) | interviewer name (user-supplied) |
| 2 | Goal-state prep skill | You can answer "why you, why this role" with specifics tied to the actual job, not rehearsed generalities | Job posting/role requirements decomposed into what they're actually screening for (R) · Your own experience mapped against each one (R) · At least one real question to ask them, derived from the research, not generic (R) | role description, your resume/background, company research (from skill 1) |

Skill 1's "nothing fabricated" condition is load-bearing, not a nice-to-have
— same trust rule as the trade-offs work on the portfolio itself: never
invent a source or a fact to fill a gap. State the gap instead.

**Correction, 2026-08-10**: the brief originally had the company-research
skill discovering who you'd be interviewing with — a live test on a real
Splice posting showed free web search can't reliably confirm that, and the
honest fix isn't a better scraper, it's flipping who supplies the name.
Real interviewees already learn the interviewer's name from a recruiter or
calendar invite before the interview; the agent's job is to research that
person once told, not discover them blind (which would also mean quietly
scraping someone's identity without them knowing, not something worth
automating even if it worked). Split into its own skill (1b) with the name
as a required, user-supplied property instead of something the agent goes
looking for.

## Scope note — what's deliberately not built

**Negotiation-prep is out of scope for v1, named and deferred, not
attempted.** It's a real, different goal state ("prepped to negotiate an
offer") that only matters once an offer exists — folding it in would make
this a two-stage product (interview prep → offer prep) instead of one clean
agent. Decided 2026-08-10, same pattern as NeU/X's email-campaign scope cut:
a documented trade-off, not a hidden gap. First thing to build if this ever
gets a v2.

## Build decisions (2026-08-10)

- **Stack**: Claude Agent SDK script / Claude Code skill, not a full app.
  Cheaper to build and run, and a more honest demonstration of "agents +
  skills" than dressing it in a UI would be.
- **Company research source**: web search only for v1. Tonight's live test
  (real Splice posting) showed it's genuinely good for company news/funding,
  weak for confirming a specific person's identity — that limitation gets
  named as a trade-off (see skill 1b), not solved with a paid API up front.
- **Interface**: reversed 2026-08-10 — GUI, not terminal. Single page
  (form in, one results view out — no ongoing state/persistence like
  NeU/X needs), built with shadcn. No Figma pass first: solo project, no
  handoff, matches Kevin's own documented stance (kevinkeiper.com case
  study) that Figma just adds a translation step when working alone with
  instant real previews. Craft signal comes from real design decisions
  applied directly to the coded UI (real palette/type, not shadcn
  defaults left untouched), not from a separate mockup phase — the
  screenshots of the actual coded result are the "pixels" that matter,
  same as NeU/X's "What Shipped" section already does.

## Second agent: Job Triage (added 2026-08-10)

Given companies (e.g. what Opportunity Radar surfaced), finds their real
current postings via search, then judges each against Kevin's own stated
fit criteria. Complements the pipeline: **Opportunity Radar discovers →
Job Triage judges → Interview Prep gets you ready.** Explicitly does not
duplicate Opportunity Radar's discovery work — company-level signal stays
Opportunity Radar's job; this agent starts from a company name and finds
that company's actual open roles.

Two skills, not three: `postingDiscovery.js` (search, real per-company
cost — the priciest skill in either agent) + `postingParser.js`
(extraction, free) feed into `fitJudgment.js` (the one genuinely agentic
piece — a real verdict, not a keyword match). Hard-capped at 5 companies
per run (`MAX_COMPANIES_PER_RUN` in server.js) — a structural guardrail,
not just a prompt instruction, same pattern as the interviewer-research
gate.

Lives in the same application as Interview Prep (tab-switched, `App.jsx`)
— one application, two agents, five total skills between them, not two
disconnected projects. Built same night as Interview Prep; confirmed
partially working (discovery found real Splice postings with real
URLs/salary/descriptions) but never completed a full run without hitting
the API credit ceiling — real end-to-end verification still pending.

## Portfolio placement & hosting plan (decided 2026-08-10, not yet executed)

Both agents get their own standalone case study — not folded into
Opportunity Radar or NeU/X, since it's neither automation (Opportunity
Radar) nor a UI/UX product concept (NeU/X). It's specifically a
demonstration of agents + skills as their own thing. Candidate names:
"Job Search Agents," "Signal & Fit," "Prep & Triage."

**Deploy to Vercel, genuinely live and public** — not a recording, a real
"Try it live" link, same posture as NeU/X's live app. Concretely:
1. Create a GitHub repo for `interview-prep` (doesn't have one yet — local
   commits only as of 2026-08-10)
2. Reshape `server.js`'s two routes into Vercel's serverless function
   format (small rewrite — the skills themselves don't change)
3. Add `ANTHROPIC_API_KEY` as a Vercel secret (through their dashboard,
   never pasted through chat)
4. Connect the repo to Vercel — after that, `git push` auto-deploys

**Explicitly decided: no rate limit for v1.** A real, named exposure —
without one, a stranger finding the link could run it repeatedly and
spend real API credit, not just occasional visitors. Kevin's informed
call, 2026-08-10: comfortable with that risk for now, can add a limit
later if it ever becomes a real problem. Documented here so it reads as
a deliberate trade-off, not an oversight, same posture as every other
named cut in this project.

## Renaming, 2026-08-15

Working names, not yet applied to code — the pattern is a single word
per stage, describing the output, not the mechanism:

- **Triage → Fit.** More accurate than "Triage" — the tool's entire
  output is a fit verdict (Apply/Skip/Maybe against stated criteria),
  so the name should say that directly. `fitJudgment.js` already used
  "fit" internally before the product name caught up to it.
- **Negotiation Prep → Close.** Deliberate callback to Kevin's own
  cross-project working philosophy (`philosophy.md`): "Always build
  trust. Always define success. Always be converting" — itself a
  riff on "always be closing." Naming the funnel's last stage "Close"
  ties the whole suite back to that framework by name, not just in
  spirit.
- Interview Prep keeps its name — plain and accurate already.

Full funnel, renamed: **Fit → Interview Prep → Close** (Opportunity
Radar remains upstream of all three, not part of the rename).

## Real bugs found and fixed via live testing, 2026-08-14/15

Not found by inspection — found by testing the tool against an
independent outside source and refusing to accept a clean-looking
result at face value.

**The test**: cross-referenced Opportunity Radar's tracked companies
against a real, independent job-lead service Kevin already uses
(J&J), to see if Opportunity Radar's signal-based discovery was
finding anything real. First pass: zero overlap. Rather than treat
that as either "proof it's broken" or "proof it's fine" on its own,
traced it down before concluding anything — the discipline that
actually mattered here, not the specific bugs found.

**What was actually wrong, diagnosed live inside the n8n flow:**
1. **Discovery was searching the wrong thing** — a single, static
   query ("startup raises Series A funding round") had nothing to do
   with hiring signal, explaining both the lack of variety run-to-run
   and the mismatch with a job-lead service. Retargeted to real
   hiring-adjacent language, and made date-aware so it doesn't keep
   re-polling an identical result set.
2. **Extraction was pulling in non-companies** — government agencies,
   news-aggregator sites, and companies that only shared a keyword
   with an unrelated article (a game studio mentioned near the word
   "designer") were being extracted as if they were real hiring
   startups. Fixed with explicit negative examples and a "when
   uncertain, extract nothing" instruction — precision over recall.
3. **6 of 8 signal-source enrichment branches were silently
   deactivated** — Reddit, LinkedIn, GitHub, HN, exec-hires, funding,
   and patents were all switched off, discovered live, cause unknown
   (not something Kevin did knowingly). Re-enabled; a full run
   afterward succeeded with real, distinct per-source signal values
   across all 8 sources, not placeholder numbers.

**The proof, not just the fix**: an independent real API call
confirmed a company the retuned discovery flagged (Runway) actually
had two live, current product-design postings — the tool doing its
actual job, verified end to end, not assumed from a clean-looking UI.

**Known, unresolved**: a "company URL" field attached to each
discovered company is sometimes wrong (e.g. a real AI startup named
"Attribute" got attached to a NIST government cybersecurity page).
Root cause not found — several likely nodes were checked and ruled
out directly, not guessed at, but the actual source wasn't located.
Low-stakes: Fit's own company research resolves the correct company
by name regardless, so nothing downstream has actually been misled by
it. Named and parked, not hidden.

## Fit vs. Interview Prep — which one is actually agentic

Real distinction, surfaced by testing both against one plain
criterion: does it make a judgment that could reasonably go a
different way from the identical input, depending on how the input is
weighed? If not, no amount of AI use makes it an agent — it's a
pipeline, however many model calls it makes.

- **Fit's `fitJudgment` clears the bar.** Given a posting's facts,
  company research, and Kevin's own stated criteria, there's no
  formula that converts those into one right verdict — a great
  culture fit might outweigh mediocre comp, or not, depending on the
  person. Genuinely agentic.
- **Interview Prep's three skills don't.** `companyResearch`,
  `interviewerResearch`, and `roleFit` all search and synthesize —
  real, useful LLM work, but none of them produce a judgment call;
  they organize what was found. No verdict, no branching, nothing a
  differently-weighted read would change. An accurate, honest label
  for it is "an LLM-powered research pipeline," not "an agent" — and
  that's not a demotion, the research itself is still real and
  useful, just a different category of thing than Fit and Close are.

Same test applied to Close's `negotiationStrategy` below — it clears
the bar the same way `fitJudgment` does.

## Third leg: Close (added 2026-08-15, scoped but not yet built)

Completes the funnel Opportunity Radar → Fit → Interview Prep was
always missing an ending for: once a real offer exists, help Kevin
figure out how hard to push, on what, and how to actually say it.

**Real evidence this is a legitimate need, not an assumed one** — the
same bar Opportunity Radar had to clear with its own LinkedIn
screenshot, checked before any goal-state work, not after:
- 54–64% of candidates don't negotiate at all, consistent across
  independent CareerBuilder, ZipRecruiter, and Glassdoor/Fishbowl
  surveys.
- 84% of Gen Z workers (18–24) accept the first offer outright.
- The stated reasons are specific, not vague: 53% don't feel
  comfortable asking, 48% fear the offer gets pulled, 38% don't want
  to seem greedy — a confidence/framing gap, not primarily a
  knowledge gap about market rate. This directly shapes the design:
  the skill that turns a decided strategy into real words to say
  (`scriptDraft`) is load-bearing, not an afterthought.

**Goal-state table**, derived via `transaction-space.md`'s method
before any code, 2026-08-15:

| # | item | goal state | conditions (type) | properties |
|---|---|---|---|---|
| 1 | Offer captured | Real offer terms exist as structured data, not a vague memory | Base comp stated (R) · equity/bonus stated (R, unconfirmed if absent) · start date/decision deadline stated (R) · other terms (O) | raw offer text pasted in |
| 2 | Market context established | Real, current comp data exists for this role/level/location | A real range found via search, tied to role/level/location (R) · source is real and citable (R) | role, level, location, company |
| 3 | Leverage assessed | The candidate's actual negotiating position is named plainly | Competing offers, if any (O — absence is informative) · current comp (O) · how much they want this offer specifically (R) | competing offers, current comp, stated preference strength |
| 4 | Ask determined | A specific, real counter exists, grounded in evidence | Grounded in market data vs. offer (R) · grounded in leverage (R) · doesn't overreach past the evidence (R) | offer (1), market data (2), leverage (3) |
| 5 | Delivery drafted | Real language exists to say or send | Traceable to the determined ask, not generic filler (R) | the determined ask (4) |

**Skill decomposition** — same shape as Fit, one real judgment call
among several fact-lookup/extraction skills: `offerParser` (extraction)
+ `marketResearch` (search) → `negotiationStrategy` (**the agentic
piece** — no formula converts offer + market data + leverage into one
right ask) → `scriptDraft` (grounded synthesis, not a fresh judgment).

**Not yet built.** Scoped and evidence-backed, same posture as the
original negotiation-prep deferral in July — a named, reasoned cut,
not a hidden gap.

## Fourth leg, parked: application tailoring (named 2026-08-15)

Given Kevin's actual body of past work (a finite, real portfolio) and
what a specific posting emphasizes, decide which projects to lead
with and how to frame them for *that* application. Different job than
Fit (which judges whether to apply) — this is about how to present
once the decision is already made. Passes the same agentic test:
two reasonable people would defensibly lead with different projects
from the identical portfolio for the identical posting. Not scoped
further than this; named so it isn't lost, not committed to.

## Separately considered and not chosen for this suite: a DJ/chef-shaped agent

A different category of demonstration project, floated 2026-08-15 —
given a finite, real inventory (a record collection, a pantry) and
situational context (room, crowd, time / occasion, dietary limits),
pick one option with no objectively right answer, only taste. Passes
the agentic test cleanly, arguably more cleanly than anything in this
suite since there's no external ground truth to ever check against.
Kept separate from the job-search suite rather than folded in — a
different domain, not a natural extension of Opportunity Radar → Fit
→ Interview Prep → Close. Real candidate for a future project on its
own, not decided.
