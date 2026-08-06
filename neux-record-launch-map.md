# NeU/X — Real-World Process Map: Independent Record Launch

Standalone asset (split out from `neux-screen-concept.md` 2026-08-06 — see
that file's history if the split itself matters). Companion to
`neux-journey-map.md`, the first map: that one is about John's experience
*using NeU/X*; this one is about **how an independent record launch actually
works in the real world** — the thing the app's plan content (`plan.js`) is
supposed to be derived from, checked here instead of assumed. Visualized at:
https://claude.ai/code/artifact/ea28985c-80e3-4a3e-a1ce-c52c5a7f62c2 (static
snapshot — republish manually if this table changes).

Scoped to record launches only for now (not YouTube/course — see open
questions in `neux-redesign-brief.md`).

| # | Real milestone | Real lead time | What it involves | In current build (`plan.js`)? |
|---|---|---|---|---|
| 1 | Lock release date | ~10-12 weeks before | Pick the date everything else works backwards from | ✅ "Release timeline" |
| 2 | Finalize artwork & metadata | ~8 weeks before | Cover art, credits, genre tags, ISRC/UPC codes — needed before distributor submission | ❌ **Gap — not represented at all** |
| 3 | Submit to distributor | ~4-6 weeks before | DistroKid/TuneCore/etc. — later submission risks missing playlist consideration | ✅ "Distribution" |
| 4 | Pitch Spotify for Artists / playlist curators | ~3-4 weeks before | Needs real lead time to be considered, not a same-week ask | ⚠️ Folded into "Press & playlist outreach" — bundled with #5, not distinct |
| 5 | Press/blog/radio outreach | ~4-6 weeks before | Similar lead-time logic to playlist pitching | ⚠️ Folded into "Press & playlist outreach" — bundled with #4 |
| 6 | Open pre-save/pre-add campaign | ~2-3 weeks before | Signals demand to streaming algorithms before release day | ⚠️ Folded into "Teaser & pre-save campaign" — bundled with #7 |
| 7 | Teaser content ramp-up | ~2 weeks before | Social teasers, countdown, behind-the-scenes | ⚠️ Folded into "Teaser & pre-save campaign" — bundled with #6 |
| 8 | Release day actions | Day of | Announce, ask fans to stream/save/share across platforms | ❌ **Gap — no release-day step exists** (matches the journey map's "Release day" gap) |
| 9 | Post-release follow-up | ~1-2 weeks after | Thank fans, monitor playlist adds/streams, plan next move | ❌ **Gap — nothing after release** (matches the journey map's "Return visit" gap) |

**What this surfaces, honestly:**
- **3 real gaps**: artwork/metadata prep, release-day actions, and
  post-release follow-up don't exist in the app at all. The latter two were
  already flagged by the journey map's Release day / Return visit stages —
  this map independently arrives at the same gap from the content side,
  which is a good sign the gap is real, not a fluke of one analysis.
- **2 steps are currently over-bundled**: "Press & playlist outreach" and
  "Teaser & pre-save campaign" each secretly contain two distinct real
  milestones with different lead times. Splitting them would make the
  timeline more accurate, not just more granular.

## Status: done

Shipped 2026-08-06 — `plan.js`'s record template now matches all 9
milestones above 1:1 (was 5 steps, 2 bundled, 3 missing). See the screen
build log in `neux-screen-concept.md`.
