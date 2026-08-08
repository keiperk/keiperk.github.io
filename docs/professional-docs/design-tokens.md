# Design tokens — base defaults (the "plain ice cream," visual side)

A sensible, generic starting point — not any one project's actual visual
identity. A specific project either uses these as-is or deliberately
overrides them in its own design-system doc (e.g. kevinkeiper.com's own
`docs/design-system.md`, which is that project's flavor, not this base).

## Type

- **Body**: system font stack (`system-ui, -apple-system, "Segoe UI",
  Roboto, sans-serif`) — no webfont dependency by default, fast, native
  feel. Override deliberately per project if a display face is called for.
- **Mono** (for numerals, code, technical labels): `ui-monospace, "SF
  Mono", Menlo, Consolas, monospace`.
- **Base size**: 15px body text, 1.5 line-height.
- **Scale**: stay on a small, consistent set of sizes rather than
  freehand — roughly 11-12px (labels/captions) / 13-14px (secondary
  text) / 15-16px (body) / 20px+ (headings), scaling up from there per
  heading level.

## Color

Neutral, not themed by default — a specific project's flavor is where a
real accent/personality gets chosen:

- `--text`: `#333`
- `--text-muted`: `#767676`
- `--text-h` (headings): `#111`
- `--bg`: `#fdfdfd`
- `--panel-bg`: `#fff`
- `--border`: `#e2e2e2`
- `--accent`: pick deliberately per project — don't default to a generic
  blue/purple without considering the subject. `#3a6df0` was NeU/X's
  choice, not a universal default.
- `--accent-bg`: a light tint of the accent, for badges/selected states.
- `--done`/success color: pick a real green, not a generic Bootstrap one.

## Spacing & radius

- **Radius**: 6-10px for cards/inputs/buttons — soft, not sharp, not
  pill-shaped by default (pill shapes reserved for tags/badges
  specifically, not general containers).
- **Spacing**: use layout (flex/grid `gap`) over per-element margins —
  avoids collapsing/doubling margin bugs.
- **Borders over shadows** for most UI chrome (panels, selected states) —
  a shadow is heavier, reserve it for genuinely floating elements
  (tooltips, popovers), not persistent UI.

## What this deliberately doesn't cover

Illustration/photography style, a project's actual accent color and its
emotional register, iconography, motion/animation choices, dark-mode
specifics. Those are flavor, decided per project, not base defaults —
see that project's own design-system doc.
