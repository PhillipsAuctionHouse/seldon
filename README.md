# Easel Design System 🎨 by Phillips Auction House

![tests](https://github.com/phillipsauctionhouse/seldon/actions/workflows/test.yml/badge.svg)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![Netlify Status](https://api.netlify.com/api/v1/badges/45a31dc9-7c19-482a-ae3d-be6bb2533cef/deploy-status)](https://app.netlify.com/sites/snazzy-liger-5606f7/deploys)

Seldon is the source for design guidelines, component documentation, and resources for building apps with the Phillips.com Design System.

We use Storybook to document the components. Our storybook is hosted in Netlify at [here](https://phillips-seldon.netlify.app/?path=/docs/welcome--overview).

## Installation

```
# With NPM
npm install @phillips/seldon

# With yarn
yarn add @phillips/seldon
```

### Styling

There are two ways to get Seldon's CSS. **Pick one** — combining them double-loads styles.

- **React apps (recommended):** import the components you use and wrap your app in `SeldonProvider`. Each component imports its own **pre-compiled CSS** from its built JS (e.g. `Button.js` does `import './_button.css'`), so styling follows the JavaScript graph and you only ship what you use; `SeldonProvider` loads the shared `foundation` CSS (fonts, `:root` tokens, padding utilities) exactly once. You do **not** need `componentStyles` — or any Sass toolchain — on this path; the package ships plain CSS.

  ```jsx
  import { SeldonProvider, Button } from '@phillips/seldon';

  <SeldonProvider>
    <Button>…</Button>
  </SeldonProvider>;
  ```

- **Compiling Seldon SCSS yourself:** use the published Sass entry points below instead. Do this only if you are _not_ relying on the JavaScript imports to deliver CSS — otherwise every component's CSS ships twice (once from JS, once from Sass), and `foundation` loads twice.

> Do not use `SeldonProvider` (or the React component imports) **and** `componentStyles` together. `SeldonProvider` loads `foundation` and each component supplies its own CSS via JS; `componentStyles` bundles `foundation` plus every component's CSS. Loading both duplicates all of it.

##### CSS imports are side effects — don't let your bundler drop them

The component CSS arrives via bare `import './_button.css'` statements that export nothing, so an aggressive bundler can tree-shake them away and render Seldon unstyled. Seldon guards against this by declaring its CSS side-effectful in `package.json` (`"sideEffects": ["**/*.scss", "**/*.css"]`), which is all a normal app needs.

For a standard **Vite app** no extra config is required — Vite bundles CSS imported from dependencies automatically. If styles ever go missing, check `vite.config.ts` for these:

- **`build.rollupOptions.external`** — do **not** externalize `@phillips/seldon` (or `/^@phillips/`). Externalizing it drops the components' CSS imports from your output. Leave Seldon bundled, or extract its CSS yourself.
- **`optimizeDeps.exclude`** — excluding `@phillips/seldon` can stop its CSS being picked up in dev; remove it or add the package to `optimizeDeps.include` instead.
- **`build.lib`** (only if you are building your own library, not an app) — a `lib` build treats deps as external and won't emit their CSS. Keep your own `package.json` `sideEffects` honest (don't set `false`) so downstream consumers of _your_ library retain the CSS, and re-export or bundle Seldon's CSS as needed.
- **`css.preprocessorOptions.scss`** — irrelevant on this path; you can leave Sass unconfigured because the package ships compiled CSS.

#### Compiling Seldon SCSS yourself

Pick **one** CSS source — `componentStyles` already `@use`s `foundation`, so loading both duplicates the shared CSS when you code-split:

```scss
// Option A — full component bundle (includes foundation: tokens, type, padding utilities):
@use '@phillips/seldon/dist/scss/componentStyles';
```

```scss
// Option B — foundation plus specific component styles, à la carte:
@use '@phillips/seldon/dist/scss/foundation';
@use '@phillips/seldon/dist/scss/components/Button/button';
```

For SCSS authoring, `allPartials` exposes mixins and variables only and emits no CSS, so every component stylesheet `@use`s it for shared mixins/variables — safe even when code-splitting, because it adds no duplicated rules:

```scss
@use '@phillips/seldon/dist/scss/allPartials' as *;
```

Because `allPartials` emits no CSS, importing it does **not** pull in the shared utility CSS (padding utilities, `:root` tokens, fonts). Those load once from `foundation` — via `SeldonProvider`, or via Option A/B above if you compile Seldon SCSS yourself.

#### Using shared mixins and variables

`allPartials` forwards Seldon's mixins, functions, and variables (breakpoints, spacing, colors, typography). `@use` it with the global namespace and reference them directly in your own component SCSS:

```scss
@use '@phillips/seldon/dist/scss/allPartials' as *;

.my-card {
  gap: $spacing-md;

  @include media($breakpoint-md) {
    gap: $spacing-lg;
  }

  &__button {
    @include hoverOrActive {
      color: $pure-black;
    }

    &:focus-visible {
      @include focus-ring($border-radius: 4px);
    }
  }
}
```

Commonly used helpers:

| Helper                                           | Kind      | Notes                                                            |
| ------------------------------------------------ | --------- | ---------------------------------------------------------------- |
| `$spacing-*`, `$breakpoint-*`, color tokens      | variables | Scale/layout tokens; no CSS until referenced.                    |
| `media($breakpoint, $type: 'min' \| 'max')`      | mixin     | Wraps `@content` in a Seldon breakpoint media query.             |
| `hoverOrActive`                                  | mixin     | Pointer-aware `:hover`/`:active` — avoids sticky hover on touch. |
| `focus-ring(...)`                                | mixin     | Consistent focus outline; pair with `:focus-visible`.            |
| `grid(...)`, `gridContainer(...)`, `gridMargins` | mixins    | Seldon grid layout.                                              |
| `hidden`                                         | mixin     | Visually-hidden (accessible) content.                            |

**Code splitting is safe.** Importing these adds no CSS to your bundles — a mixin only produces output where you `@include` it, so each chunk contains exactly the CSS it generates and nothing is duplicated by the import. The one exception is helpers that emit a whole selector rather than properties — notably `padding()`, which generates `.seldon-padding-*` utility classes. `foundation` already emits those once, so consume them from `foundation` (or `SeldonProvider`); don't re-`@include padding()` per chunk or you will duplicate the utility classes across every bundle.

> To render text, prefer the `<Text variant="…">` component over the typography mixins (`text()`, `hText`, `labelText`, …); the mixins remain available for styling your own elements where a component isn't practical.

### Components

Each component can be imported in your project by referencing the named exports from main index file.

```js
import { Button } from '@phillips/seldon';
```

### Contributing Guidelines

Before you start contributing to this project please check out our guidelines found [here](/src/docs/CONTRIBUTING.md)

### Git worktrees (`new-worktree.sh`)

You can use Git [worktrees](https://git-scm.com/docs/git-worktree) to keep multiple branches checked out at once (for example when reviewing a PR or spiking a change) without re-running all setup steps every time.

Use the `scripts/new-worktree.sh` helper to create a new worktree and copy ignored files (like `.env`) into the new directory:

```bash
# New worktree at ../my-feature using the current branch
./scripts/new-worktree.sh ../my-feature

# New worktree on an existing branch
./scripts/new-worktree.sh ../my-feature feature-branch

# New worktree with a new branch (e.g. from main)
./scripts/new-worktree.sh ../my-feature -b new-branch main

# Optionally copy node_modules instead of running npm install in the new worktree
COPY_NODE_MODULES=1 ./scripts/new-worktree.sh ../my-feature
```

The script runs `git worktree add`, copies ignored config files into the new directory, runs `npm install`, and then opens the new worktree in Cursor or VS Code.

To remove a worktree, you can run the following command:

```bash
git worktree remove ../my-feature
```

This will remove the worktree from the git repository.
