# Seldon AI Coding Agent Instructions

Purpose: Help you quickly and safely contribute to the Seldon (Easel Design System) React + TypeScript component library.
Keep responses focused, reference concrete files, and follow existing patterns over inventing new abstractions.

## 1. Tech + Build Overview

- Library: React 18 TS, built with Vite (`vite.config.ts`) exporting ES modules with preserved structure (`dist` mirrors `src`).
- Styles: SCSS tokens + utilities under `src/scss/`; component-level styles live beside components (e.g. `src/components/Carousel/_carousel.scss`). Build copies/transforms SCSS into `dist/scss` (see `transformScssAlias` in `src/build/buildUtils.ts`).
- Storybook: Primary documentation surface (`npm start` for dev, `build:storybook` for static). Stories live next to components as `*.stories.tsx`.
- Tests: Vitest + Testing Library (`config/vitest/setupTest.ts` sets strict console error throwing + DOM observers mocks). Coverage thresholds: 90% across metrics; add/adjust tests to keep green.
- Release: Semantic-release (Angular commit convention) + version bump + changelog. Do NOT manually edit version in `package.json`.

## 2. Core Conventions

- Component structure: Folder with main file + optional subparts + SCSS + tests + stories. Example: `src/components/Carousel/`.
- Barrel export if multiple components under same directory: Each component folder exports from `index.ts` (ensure new subcomponents are exported). Root `src/index.ts` aggregates public API.
- Naming: Component displayName set explicitly; CSS/test id stems from `getCommonProps` in `src/utils/index.tsx` => `seldon-{kebab-component-name}`.
- Props docs: Use JSDoc above interface + inline comments per prop (see `Carousel.tsx`, `Button.tsx`). Keep descriptions action-oriented.
- Tokens: Use enums like `SpacingTokens`, `PaddingTokens` from `src/utils/index.tsx` instead of raw strings.
- Accessibility: Provide ARIA roles/labels consistent with existing examples (e.g. Carousel uses `role="region"` + `aria-roledescription`). Keyboard interactions mirror current patterns (Arrow key navigation in `Carousel`).
- Styling: BEM-ish prefix `seldon-` automatically from `getCommonProps`; add modifier classes via template literals (`${baseClassName}--{state}`). Avoid hard-coded color/spacing; rely on SCSS variables/mixins in forwarded partials (`_allPartials.scss`).

## 3. Testing Patterns

- Each interactive sub-element often has its own test (e.g. `CarouselArrows.test.tsx`, `CarouselKeyboardNavigation.test.tsx`). Follow this granularity.
- Never allow console errors: mock/allow via `consoleError.mockImplementation(() => {})` only when intentionally asserting error conditions.
- Prefer role + text queries; fall back to `data-testid` (auto-generated) sparingly.
- If adding a prop that alters rendering, add: (a) prop behavior test, (b) accessibility/interaction test if relevant.

## 4. Adding a New Component

1. Run scaffold script if applicable (`npm run create-component`) or replicate an existing folder (Button is a minimal pattern; Carousel for compound components).
2. Implement component using `forwardRef`, call `getCommonProps(props, 'ComponentName')` early.
3. Create `Component.stories.tsx` with Overview + variations (match tone of existing stories).
4. Write tests hitting rendering, variant/branch logic, keyboard/focus if interactive.
5. Add SCSS partial `_component.scss` using the `seldon-` prefixed base class.
6. Export from folder `index.ts` and root `src/index.ts`.
7. Run: `npm run lint && npm test && npm run build` before committing.

## 5. Modifying Existing Components

- Maintain backward compatibility; add non-breaking props with sensible defaults.
- If changing class names: ensure tests updated AND no change to external contract unless intentional (communicate via PR description + semantic release type).
- For behavioral changes relying on 3rd party libs (e.g. Embla Carousel), document rationale in a short code comment near the change.

## 6. SCSS + Tokens

- Import shared partials via `_allPartials.scss`.
- Avoid duplicating spacing/typography rules already available in `_vars.scss` / `_typography.scss` / `_sharedClasses.scss`.
- Should always use tokens for spacing, typography, colors (e.g. `padding: $spacing-16`).

## 7. External Integrations

- Radix primitives supply accessibility foundations (Accordion, Dialog, Tabs, etc.). Extend with minimal wrapper logic; don't fork behavior unless necessary.
- Carousel uses Embla + plugins (`embla-carousel-wheel-gestures`, `embla-carousel-class-names`). If adjusting plugin config, ensure keyboard + focus tests still pass.

## 8. Commit / PR Hygiene

- Commit messages: `feat(Component): TicketNumber description`, `fix(Button): TicketNumber description`, etc. to drive semantic-release.
- Keep PRs focused (one component or logical enhancement). Include Storybook link & before/after notes.

## 9. Common Pitfalls

- Forgetting to export new component leads to missing build output (lib preserves module structure; consumers import deep paths).
- Adding raw console.error in tests will fail due to enforced throw.
- Direct DOM measurements in tests may require mocking ResizeObserver / IntersectionObserver (already mocked globally—reuse patterns).

## 10. Quick Commands

- Dev Storybook: `npm start`
- Run tests: `npm test` (or `npm run coverage`)
- Lint all: `npm run lint`
- Build library: `npm run build`
- Build Storybook: `npm run build:storybook`

---
