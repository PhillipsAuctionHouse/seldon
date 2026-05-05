---
name: seldon
description: >-
  Phillips Seldon design system — React components in src/components and
  src/patterns, co-located Storybook and Vitest, SCSS with $px BEM prefix. Use for
  library work, Agent Review on UI components, and code review in this repo.
  Canonical project rules live here plus AGENTS.md and docs/agents/*.
---

# Seldon design system

This repository is **`@phillips/seldon`**, a published component library—not a
Remix/React Router application. There are no `app/routes`, SSR entrypoints, or
product API clients here.

## What ships from this repo

- **Components:** `src/components/<Name>/` — each primary UI module co-located
  with `*.stories.tsx`, `*.test.tsx`, and `_name.scss` as applicable.
- **Patterns:** `src/patterns/<Name>/` — composed layouts/widgets using the same
  co-location rules where the team adds stories/tests.
- **Build:** `npm run build` produces `dist/` for npm consumers.
- **Docs in Storybook:** `npm start` (Storybook on port 6006).

## New component workflow

1. Run scaffold script if applicable (`npm run create-component`) or replicate an existing folder (Button is a minimal pattern; Carousel for compound components).
2. Implement component using `forwardRef`, call `getCommonProps(props, 'ComponentName')` early.
3. Create `Component.stories.tsx` with Overview + variations (match tone of existing stories).
4. Write tests hitting rendering, variant/branch logic, keyboard/focus if interactive.
5. Add SCSS partial `_component.scss` using the `seldon-` prefixed base class.
6. Export from folder `index.ts` and root `src/index.ts`.
7. Run: `npm run lint && npm test && npm run build` before committing.
8. Validate accessibility by checking the component in Storybook under the Accessibility tab and fix any issues.

## Styling and DOM conventions

- **TSX:** use **`getCommonProps`** / **`px`** from `src/utils/index.tsx` the same
  way neighboring components do (`getCommonProps` sets `className` and
  `data-testid` stems; `px` is the `seldon` namespace string).
- **SCSS:** `@use '~scss/allPartials' as *;` (or the documented relative path to
  partials). Prefix BEM blocks with **`.#{$px}-...`** where `$px` is defined in
  shared vars (`src/scss/_vars.scss` — currently `seldon`).
- Prefer existing primitives (`Text`, `Button`, `Grid`, etc.) before adding
  parallel patterns.

## Testing

- **Unit / component:** Vitest + Testing Library; tests live next to components
  (`*.test.tsx`). Shared helpers: `src/utils/testUtils.tsx`.
- **Storybook:** `*.stories.tsx` co-located; Chromatic runs in CI (`npm run chromatic` with `STORYBOOK=1`).

## Related skills (optional depth)

- **`.agents/skills/web-component-design/SKILL.md`** — broader component-library
  patterns.
- **`.agents/skills/vercel-composition-patterns/SKILL.md`** — compound
  components, variants, context.
- **`.agents/skills/vercel-react-best-practices/SKILL.md`** — performance; see
  the “Scope in this repository” section there (skip server-only rules for
  typical library work).

## Repo docs (read in order)

1. **`AGENTS.md`** — high-level map and non-negotiables.
2. **`docs/agents/CONVENTIONS.md`** — TypeScript, React, SCSS, tests.
3. **`docs/agents/QUALITY.md`** — checks and coverage expectations.
4. **`docs/agents/ARCHITECTURE.md`** — directory layout.

After substantive edits, run **`npm run format`** (Prettier) before commit.
