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
6. **If a Figma main component exists for it**, add a co-located `Component.figma.tsx` mapping Figma variants → seldon props (see [Figma Code Connect](#figma-code-connect) below). Skip only when no Figma component is published yet.
7. Export from folder `index.ts` and root `src/index.ts`.
8. Run: `npm run lint && npm test && npm run build` before committing.
9. Validate accessibility by checking the component in Storybook under the Accessibility tab and fix any issues.

## Figma Code Connect

Every seldon component that has a corresponding **published** Figma main component in the Phillips design library MUST have a `Component.figma.tsx` template file co-located with the component source. This is what lets Figma Dev Mode (and AI-driven prototype builders) return the real seldon import + JSX for a selected Figma frame instead of generic HTML.

- **Where:** `src/components/<Name>/<Name>.figma.tsx` (or `src/patterns/<Name>/<Name>.figma.tsx`).
- **How:** use the `figma:figma-code-connect` skill, or the CLI style already in `Breadcrumb.figma.tsx` / `Search.figma.tsx` as reference. Prefer `figma.enum(...)` for VARIANT Figma props, `figma.string(...)` for TEXT, `figma.boolean(...)` for BOOLEAN.
- **Discover the node URL** by right-clicking the main component in Figma → "Copy link to selection". Confirm the URL contains `?node-id=...` before writing the template.
- **Only publish once**, per PR, using a `FIGMA_ACCESS_TOKEN` — CI or a maintainer runs `npx figma connect publish`. `--dry-run` locally is safe and validates the file without touching Figma servers.
- **When Figma doesn't have a matching main component**, skip the `.figma.tsx` step and leave a note in the PR (e.g. "no Figma component yet"). Don't invent one just to satisfy the workflow.
- **When Figma property names are garbage** (e.g. `Property 1`), the mapping is still possible but produces ugly Dev-Mode snippets — flag it in the PR so designers can rename the variant properties.

## Styling and DOM conventions

- **TSX:** use **`getCommonProps`** / **`px`** from `src/utils/index.tsx` the same
  way neighboring components do (`getCommonProps` sets `className` and
  `data-testid` stems; `px` is the `seldon` namespace string).
- **SCSS:** `@use '~scss/allPartials' as *;` (or the documented relative path to
  partials). Prefix BEM blocks with **`.#{$px}-...`** where `$px` is defined in
  shared vars (`src/scss/_vars.scss` — currently `seldon`).
- Prefer existing primitives (`Text`, `Button`, `Grid`, etc.) before adding
  parallel patterns.
- Do not use the mixin for `@include text(variant)` in the SCSS files, instead use the <Text variant="..."> component.

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
- **`.agents/skills/branch-coverage-hotspot-hunter/SKILL.md`** — flag branch coverage hotspots.
- **`.agents/skills/storybook-coverage-checker/SKILL.md`** — flag storybook coverage gaps.
- **`.agents/skills/accessibility-compliance-accessibility-audit/SKILL.md`** — flag accessibility compliance issues.
- **`.agents/skills/security-compliance-security-audit/SKILL.md`** — flag security compliance issues.
- **`.agents/skills/performance-compliance-performance-audit/SKILL.md`** — flag performance compliance issues.
- **`.agents/skills/best-practices-best-practices-audit/SKILL.md`** — flag best practices issues.
- **`.agents/skills/code-style-code-style-audit/SKILL.md`** — flag code style issues.
- **`.agents/skills/documentation-documentation-audit/SKILL.md`** — flag documentation issues.
- **`.agents/skills/testing-testing-audit/SKILL.md`** — flag testing issues.

## Repo docs (read in order)

1. **`AGENTS.md`** — high-level map and non-negotiables.
2. **`docs/agents/CONVENTIONS.md`** — TypeScript, React, SCSS, tests.
3. **`docs/agents/QUALITY.md`** — checks and coverage expectations.
4. **`docs/agents/ARCHITECTURE.md`** — directory layout.

After substantive edits, run **`npm run format`** (Prettier) before commit.
