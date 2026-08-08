# Design tokens — base defaults (the "plain ice cream," visual side)

Not invented — extracted from what's actually demonstrated, repeatedly,
across real shipped work (`docs/design-system.md`, kevinkeiper.com). This
is Kevin's real natural default, not a generic placeholder. A specific
project either uses these as-is or deliberately overrides them in its own
design-system doc — override on purpose, not by drifting.

## Type

- **Two-role pairing, not one font doing everything**: a clean sans for
  headlines/body, monospace for labels/tags/metadata/utility text. The
  monospace isn't decorative — it's the signal for "this is data/meta,"
  not prose.
- Default sans: something in the General Sans/Söhne register — humanist,
  clean, not a display face. Default mono: something in the Space
  Mono/system-mono register.

## Color

**Grayscale by default, color only as a deliberate, sparing choice per
project** — not the other way around. The real pattern: strictly
black/white/grayscale UI chrome (nav, backgrounds, buttons, badges), with
photography/screenshots staying full, unaltered color — cohesion comes
from the surrounding system's consistency, not from filtering images to
match a palette.

- `ink` (primary text): near-black, not pure `#000`
- `paper` (background): white or near-white
- `muted` (secondary text): mid-gray
- `line` / `line-strong` (borders): two step-values of light gray, not
  one flat border color everywhere

A project that wants a real accent color (NeU/X's blue, for example) is
deliberately breaking from this default, not following it — that's fine,
but it should be a conscious call, not an unconsidered default the way a
generic blue/purple accent usually is.

## Shape & depth

- **Corner radii: minimal, 2-4px.** Not sharp (0px), not the generic
  "safe" 8px everyone reaches for by default. Small, considered, slightly
  softened — not soft.
- **Elevation: flat by default.** No shadows on static elements; a subtle
  shadow only on hover/interactive states. Borders do the separating
  work, not shadows.

## Spacing

Base unit **8px** — scale: `4, 8, 16, 24, 32, 48, 64, 96`. Use layout
(flex/grid `gap`) over per-element margins.

## What this deliberately doesn't cover

Illustration/photography treatment, a project's actual accent color and
emotional register, iconography, motion, dark-mode specifics, and any
project-specific rules (image-cropping behavior, documented one-off
exceptions, tool-badge conventions) — those are flavor, decided and
recorded per project in that project's own design-system doc, not base
defaults.
