# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`@phillips/seldon` — published React component library (Phillips design system). Not a Remix/React Router app: no `app/routes`, SSR entrypoints, or product API clients. Storybook is the dev surface; Vite builds the library to `dist/`.

## Commands

```bash
npm start                # Storybook dev (port 6006) — primary dev surface
npm test                 # Vitest unit project (watch)
npm run test:all         # all Vitest projects (unit + storybook)
npm run test-storybook   # Vitest Storybook integration only
npm run coverage         # unit coverage; thresholds in vitest.config.ts (90% branches/lines/functions/statements)
npm run test:e2e         # Playwright against Storybook iframe (e2e/*.spec.ts)
npm run build            # clean + tsc + vite build → dist/
npm run lint             # tsc --noEmit + ESLint + Stylelint + markdownlint
npm run format           # Prettier write — run after substantive edits
npm run create-component # scaffold a new component
```

Run one test file: `npx vitest run src/components/Button/Button.test.tsx`
Run one test by name: `npx vitest run -t "renders disabled"`

## Architecture essentials

- `src/components/<Name>/` — primary UI primitives. Each folder co-locates `Name.tsx`, `Name.test.tsx`, `Name.stories.tsx`, `_name.scss`. Public surface re-exported from `src/index.ts`.
- `src/patterns/<Name>/` — higher-level compositions built from components. Same co-location rules.
- `src/scss/` — shared partials. `allPartials` is the umbrella entry; `_vars.scss` defines `$px` (currently `seldon`).
- `src/utils/index.tsx` — exports `px` (BEM namespace) and `getCommonProps(props, 'ComponentName')` which derives `className` + `data-testid` stems. Components call `getCommonProps` early.
- `src/assets/` — raw SVGs + SVGR-generated TSX icons (`icons:format`, `pictograms:format`).
- `e2e/` — Playwright drives Storybook URLs, not a deployed site.
- `dist/` — build output. Never hand-edit.
- Shared config (`package.json`, `vite.config.ts`, `vitest.config.ts`, ESLint/Stylelint) — touch only when necessary.

## Conventions (load-bearing)

- TSX files stay under **200 lines**. Split when over.
- TypeScript: prefer `Array<Type>` over `Type[]`; type-only imports (`import { type Foo }`); always `async/await`.
- React: function components with destructured props; `classnames` for class composition; conditional render `{cond ? <X /> : null}` (not `&&`); prefer existing primitives (`Text`, `Button`, `Grid`) before new low-level markup.
- SCSS: start each component file with `@use '~scss/allPartials' as *;`. BEM via `.#{$px}-block__element--modifier`. No `!important` unless an existing pattern documents the exception. Use `<Text variant="...">` instead of `@include text(variant)` mixin.
- Testing: Vitest globals (`vi.fn()`, not `jest.fn()`); query via `screen`, not `render` return; prefer `userEvent` over `fireEvent`; no `vi.mock` inside stories — use decorators/parameters. `data-testid` values prefix with the same `px` namespace.
- Tabs UI: use existing Seldon `Tabs` primitives. This package does not own routing.
- After substantive edits run `npm run format`.

## Definition of done

1. `npm run lint` clean (typecheck + JS + styles + md).
2. `npm test` passes; `npm run coverage` keeps thresholds green.
3. New / changed visual components have co-located `*.stories.tsx` and `*.test.tsx`.
4. Conventional Commit message (`feat:`, `fix:`, `chore:`, …) — Commitlint enforces.

## New component workflow

1. `npm run create-component` (or replicate Button for a minimal pattern, Carousel for compound).
2. Implement with `forwardRef`; call `getCommonProps(props, 'ComponentName')` early.
3. Add stories (Overview + variations), tests (render + variant/branch logic + keyboard/focus if interactive), `_component.scss` using `.#{$px}-` prefix.
4. Export from folder `index.ts` and root `src/index.ts`.
5. Verify the Storybook Accessibility tab.
6. `npm run lint && npm test && npm run build` before commit.

## Deeper docs

When the task warrants more context:

- `AGENTS.md` — top-level map and non-negotiables.
- `docs/agents/INDEX.md` — task-to-doc routing.
- `docs/agents/CONVENTIONS.md` — full TS/React/SCSS/test rules.
- `docs/agents/ARCHITECTURE.md` — directory layout details.
- `docs/agents/QUALITY.md` — checks + coverage.
- `docs/agents/SETUP.md` — env, `NPM_TOKEN` for `@phillips/*` packages, CI.
- `.agents/skills/seldon/SKILL.md` — canonical Seldon skill (Agent Review applies this).
- `.cursor/commands/code-review-checklist.md` — PR review checklist.

For worktrees use `./scripts/new-worktree.sh` (see README).

## Working rules (12)

These rules apply to every task in this project unless explicitly overridden.
Bias: caution over speed on non-trivial work. Use judgment on trivial tasks.

### Rule 1 — Think Before Coding

State assumptions explicitly. If uncertain, ask rather than guess. Present
multiple interpretations when ambiguity exists. Push back when a simpler
approach exists. Stop when confused. Name what's unclear.

### Rule 2 — Simplicity First

Minimum code that solves the problem. Nothing speculative. No features beyond
what was asked. No abstractions for single-use code. Test: would a senior
engineer say this is overcomplicated? If yes, simplify.

### Rule 3 — Surgical Changes

Touch only what you must. Clean up only your own mess. Don't "improve" adjacent
code, comments, or formatting. Don't refactor what isn't broken. Match existing
style.

### Rule 4 — Goal-Driven Execution

Define success criteria. Loop until verified. Don't follow steps. Define success
and iterate. Strong success criteria let you loop independently.

### Rule 5 — Use the model only for judgment calls

Use me for: classification, drafting, summarization, extraction. Do NOT use me
for: routing, retries, deterministic transforms. If code can answer, code
answers.

### Rule 6 — Token budgets are not advisory

Per-task: 4,000 tokens. Per-session: 30,000 tokens. If approaching budget,
summarize and start fresh. Surface the breach. Do not silently overrun.

### Rule 7 — Surface conflicts, don't average them

If two patterns contradict, pick one (more recent / more tested). Explain why.
Flag the other for cleanup. Don't blend conflicting patterns.

### Rule 8 — Read before you write

Before adding code, read exports, immediate callers, shared utilities. "Looks
orthogonal" is dangerous. If unsure why code is structured a way, ask.

### Rule 9 — Tests verify intent, not just behavior

Tests must encode WHY behavior matters, not just WHAT it does. A test that can't
fail when business logic changes is wrong.

### Rule 10 — Checkpoint after every significant step

Summarize what was done, what's verified, what's left. Don't continue from a
state you can't describe back. If you lose track, stop and restate.

### Rule 11 — Match the codebase's conventions, even if you disagree

Conformance > taste inside the codebase. If you genuinely think a convention is
harmful, surface it. Don't fork silently.

### Rule 12 — Fail loud

"Completed" is wrong if anything was skipped silently. "Tests pass" is wrong if
any were skipped. Default to surfacing uncertainty, not hiding it.
