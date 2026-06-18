# Architecture

## Directory layout

```
src/
  components/     React components (co-located *.stories.tsx, *.test.tsx, _*.scss)
  patterns/       Composed UI patterns built from components
  design/         Internal design / token surfaces for Storybook
  scss/           Global partials (_vars.scss, _utils.scss, allPartials entry, …)
  utils/          Shared helpers (e.g. px, testUtils)
  assets/         Raw SVG / pictograms and SVGR-generated TSX
e2e/              Playwright tests (Storybook iframe, not a deployed app)
.storybook/       Storybook main + preview
config/           Tooling-only TypeScript (included by tsconfig where applicable)
dist/             Vite + tsc library output (published to npm)
vite.config.ts    Vite (library + Storybook test integration)
vitest.config.ts  Vitest projects (unit + Storybook browser tests)
```

## Key pointers

- **Storybook:** `npm start` — primary dev surface for components.
- **Tests:** `npm test` (unit), `npm run test-storybook`, `npm run test:e2e` for
  Playwright against Storybook.
- **Build:** `npm run build` emits `dist/` entry (`@phillips/seldon` package
  exports).
- **CI pipelines:** `.github/workflows/` — lint, tests, Chromatic, release as
  configured for this package.
