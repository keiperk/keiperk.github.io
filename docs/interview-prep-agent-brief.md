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
