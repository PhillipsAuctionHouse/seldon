# Conventions

## TypeScript

- Prefer `Array<Type>` over `Type[]`.
- Use type-only imports when importing only types:
  `import { type Foo } from './types'`.
- Always `async/await` — avoid `.then()` chains.

## React components

- Function components with destructured props:
  `const Foo = ({ bar }: FooProps) => { ... }`.
- Use `classnames` to combine class names.
- Conditional rendering: use `{condition ? <X /> : null}`, not
  `{condition && <X />}`.
- Prefer composition and existing primitives (`Text`, `Button`, `Grid`, etc.)
  before introducing new low-level markup patterns.

## Component file structure

Co-locate implementation, tests, stories, and styles (no barrel `index.ts` for
new work unless the folder already uses one):

```
src/components/<ComponentName>/
  ComponentName.tsx
  ComponentName.test.tsx
  ComponentName.stories.tsx
  _componentName.scss
```

Patterns under `src/patterns/<Name>/` follow the same idea when the team adds
stories and tests there.

## SCSS

- Start each component SCSS file with:

  `@use '~scss/allPartials' as *;`

  (or the relative path to the same partials stack used elsewhere in `src/`.)
  That import is mixins and variables only. Import the co-located `_*.scss`
  from the component TSX. CSS that must emit once (padding utilities, `:root`
  tokens, `@font-face`) lives in `~scss/foundation`, loaded by `SeldonProvider`.
  Emitting sheets also `@use '~scss/layers'` and wrap rules in
  `@layer vendor | seldon.foundation | .components | .patterns | .site` so
  cascade order does not depend on JS import order. Third-party CSS goes in
  `vendor` (below Seldon) so component overrides still win. Do not put two BEM
  blocks on one node at equal specificity (Button-as-Link is the documented
  case: Link owns type; Button does not set `font-variation-settings` on
  `.seldon-link`).

- BEM: **`.#{$px}-block__element--modifier`** using the **`$px`** namespace from
  shared vars (`src/scss/_vars.scss`).
- New shared mixins → `src/scss/_utils.scss`; new variables →
  `src/scss/_vars.scss` when appropriate.
- Never use `!important` unless an existing pattern already documents an
  exception.

## Testing

- Vitest globals; use `vi.fn()`, not `jest.fn()`.
- Query with **`screen`** from Testing Library, not the return value of `render`.
- Prefer **`userEvent`** over `fireEvent` for interactions.
- Storybook stories should not rely on `vi.mock` — use decorators, providers, or
  Storybook parameters instead.
- If you add `data-testid`, prefix values with the same **`px`** string exported
  from `src/utils/index.tsx` (see existing components).

## Tabs

For **tabbed UIs inside a component**, follow existing Seldon **`Tabs`**
primitives and stories. This package does **not** own application routing — do
not document or assume Remix/React Router `Outlet` child routes here.
