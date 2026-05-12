# Setup

## Environment

```bash
npm install
```

Many installs require **`NPM_TOKEN`** (GitHub Packages) for private `@phillips/*`
dependencies — see `.npmrc` / internal docs for how your machine provides it.

## Daily development

```bash
npm start              # Storybook
npm test               # unit tests
npm run test:e2e       # Playwright against Storybook
npm run build          # library output to dist/
```

## CI pipelines

Pipelines run from `.github/workflows/` (lint, tests, Chromatic, release). Exact
jobs match this **package** repository—not a full website deploy pipeline.

## Note on agent skills

Optional **Skills CLI** installs (`npx skills add …`) may place or symlink
packages under **`.agents/skills/`** for Cursor and other agents. That is
separate from npm runtime dependencies.
