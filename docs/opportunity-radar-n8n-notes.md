# Opportunity Radar — n8n workflow notes

Real, applied fixes to the live n8n workflow (`Opportunity Radar v2 -
Stage 0 Test`), 2026-08-22. Not a redesign — targeted fixes to real bugs
found by actually running the pipeline and checking live sheet output,
not assumed from reading code.

## What got fixed

**1. Company descriptions, at zero extra API cost.** `Fetch website`
already searches Google for each discovered company's official site (via
Serper) to find `company_url` — the search response's own snippet was
being thrown away. `Extract company URL` now also captures it as
`company_description`, written into `radar_results` alongside the URL.
`data.js` reads it (falling back to the old 4-entry hardcoded
`COMPANY_BLURBS` dict for companies discovered before this fix existed,
then "No public description available." if neither has anything).

**2. Headline-mistaken-for-a-company-name bug.** The `Extract Companies`
LLM step occasionally returned a full news sentence as `company_name`
instead of a real name (e.g. "In the sentence: Europe's Anduril rival
Helsing raises $1.8 billion..."). Both extraction passes (`Parse
extracted companies`, `Parse extracted companies 2`) now reject any
candidate with sentence punctuation or more than 5 words.

**3. Name-collision false positives.** A company name that's also a
common word or famous entity (first real case: "Nuggets") could pull in
an unrelated site's description (the Denver Nuggets' own store, in that
case) because the company name legitimately appeared in that site's own
text. Fixed by requiring the **domain itself**, not just snippet/title
text, to contain the company's canonical name before trusting the
description — a much harder signal to fool by coincidence.

**4. Snippet-scan gave up too early.** Even correct domain matches
(helsing.ai, zml.ai, twenty.com, etc.) often came back blank, because
the code stopped looking after the very first search result, and that
result's own snippet is frequently empty for smaller/newer sites even
when the URL is right. Fixed to keep scanning further results for a
non-empty snippet once the right domain is confirmed, instead of quitting
after one look.

## Known, accepted limitations — not further fixed, named plainly

**"Nuggets"-style collisions where the domain itself also collides.**
The domain-match safeguard (fix #3) assumes an unrelated site's domain
won't happen to contain the company's exact name — but it can, if the
name is common enough (e.g. an NBA team's own store subdomain literally
containing "nuggets"). Confirmed still reproducible after fix #3-#4;
no further heuristic fix was pursued. This is a structural limit of a
free, no-extra-API-call approach, not a bug — the alternative (real
identity verification per company) is a different, bigger scope than
what today's session took on.

**"New Discovery" badge wording can mislead on well-known companies**
(first real case: AT&T). The badge means "found by this scan, not
already on the tracked list" — accurate, and the tooltip says exactly
that — but reads at a glance like "this is a new/emerging company,"
which is wrong for something like AT&T. Cheap copy fix if ever revisited
(e.g. "Newly surfaced" instead of "New Discovery"); not pursued now —
Kevin's call, not a big deal. Separate, harder question underneath it:
whether AT&T should have been surfaced as a hiring-momentum discovery at
all — an editorial judgment call in the `Extract Companies` LLM step,
not something fixed today.

**Ad-copy descriptions on correct domain matches** (first real case:
AT&T — "Get our best deals on phones and internet, backed by the AT&T
Guarantee."). The domain match is correct; the site's own homepage
meta-description is marketing copy, not a factual description, which is
common for larger consumer brands optimizing their own SEO text. No
free signal distinguishes "real description" from "ad copy" the way
domain-mismatch was a free signal for "wrong company." Two real paths
if revisited: keyword-based rejection (cheap, but converts bad
descriptions into more honest blanks, doesn't produce good ones) or an
actual LLM summarization call per company (real new cost/scope, not a
bug fix). Parked, not solved — explicit call to stop tweaking rather
than keep patching indefinitely, 2026-08-22.

## Where the workflow file lives

Fixed version: `~/Downloads/Opportunity-Radar-v2-with-descriptions.json`
(local to Kevin's machine, not committed to this repo — it's an n8n
export, imported directly into the live n8n instance). The
`radar_results` Google Sheet tab needed a `company_description` column
header added manually before the first run with these fixes.
