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

Each component imports its own SCSS from TSX, so CSS follows the JavaScript graph. Wrap the app in `SeldonProvider` so fonts, `:root` tokens, and padding utilities load once.

Sass entry points are still published for consumers who compile Seldon SCSS themselves:

```scss
@use '@phillips/seldon/dist/scss/foundation'; // tokens, type, padding utilities (once)
@use '@phillips/seldon/dist/scss/componentStyles'; // all component CSS (includes foundation)
@use '@phillips/seldon/dist/scss/allPartials'; // mixins and variables only — no CSS
```

`allPartials` does not emit CSS. Do not `@use` it from every component stylesheet if you are code-splitting CSS — you will not get a copy of the utilities, and that is intentional.

If you wish to only import specific component styles from Sass:

```scss
@use '@phillips/seldon/dist/scss/foundation';
@use '@phillips/seldon/dist/scss/components/Button/button';
```

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
