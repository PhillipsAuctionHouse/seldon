# AGENTS.md

**`@phillips/seldon`** — Phillips design system: React components and patterns,
TypeScript, Vite library build, Storybook, and Vitest.

Start here, then read only the focused docs you need:

- `.cursor/rules/seldon-mdc.mdc` — **always-on** Cursor rule; Agent Review must
  apply **`.agents/skills/seldon/SKILL.md`** (Seldon skill).
- `.cursor/rules/claude-skills.mdc` — optional **user-local** Claude skills under
  `~/.claude/skills/*/SKILL.md` (Sanity, SEO, content modeling, etc.); use when the
  task matches; project rules still come first.
- `docs/agents/INDEX.md` — commands and task-to-doc navigation
- `docs/agents/ARCHITECTURE.md` — directory layout and key pointers
- `docs/agents/CONVENTIONS.md` — TypeScript, React, SCSS, testing, component
  structure
- `docs/agents/QUALITY.md` — definition of done, required checks
- `docs/agents/SETUP.md` — environment setup and CI

---

## Pull requests

When creating a pull request, always populate the body using `.github/PULL_REQUEST_TEMPLATE.MD` as the structure. Fill in every section — do not leave placeholder text. For sections that genuinely do not apply (e.g. Figma link for a non-visual change), write "N/A" with a brief reason rather than omitting them.

---

## Core rules

- Keep `ts/tsx/js/jsx` files under 200 lines — split if a file grows past that
  (not applicable to generated assets or one-off scripts).
- **Imports:** use relative imports within `src/` or package entrypoints as
  already established in neighboring files; `~scss/*` maps to `src/scss/*` (see
  `tsconfig.json`).
- **Class / testid prefix:** use the `px` export from `src/utils/index.tsx` in
  TSX; use **`$px`** in SCSS with the BEM pattern documented in
  `docs/agents/CONVENTIONS.md`.
- **New or materially changed visual components** should ship with co-located
  **`*.stories.tsx`** and **`*.test.tsx`** where the team expects regression
  coverage (see `docs/agents/QUALITY.md`).
- Do not edit **`dist/`** — it is build output.
- Config files (`package.json`, `vite.config.ts`, `vitest.config.ts`, ESLint,
  Stylelint, etc.) are shared surfaces — change only when necessary.

---

## Repo map

```
src/
  components/   Exported UI building blocks (Button, Text, Grid, …)
  patterns/     Higher-level composed widgets (headers, banners, …)
  design/       Tokens / internal design references used by Storybook
  scss/         Shared partials, variables, mixins
  utils/        Shared helpers (px, testUtils, …)
  assets/       SVG sources and generated React icon components
e2e/            Optional browser specs against Storybook (`npm run test:e2e`)
.storybook/     Storybook configuration
dist/           Published library output (generated; do not hand-edit)
```

---

If you need more context, start at `docs/agents/INDEX.md`.
