# Quality

## Definition of done

1. TypeScript compiles with no errors (`npm run lint` includes `tsc --noEmit`).
2. ESLint, Stylelint, and markdownlint pass with no new violations.
3. Prettier formatting is clean (`npm run format` then verify with team workflow).
4. Unit tests pass; **coverage thresholds** in `vitest.config.ts` stay green
   (currently **90%** branches, lines, functions, statements for included `src/`
   files).
5. New or changed visual components include **Storybook** coverage when the change
   affects rendered UI (co-located `*.stories.tsx` alongside existing patterns).
6. Commit message uses conventional format: `feat:`, `fix:`, `chore:`, etc., if
   your pipeline enforces Commitlint.

## Required checks

```bash
npm run lint            # typecheck + JS + styles + md
npm run test            # Vitest unit project
npm run coverage        # coverage with thresholds
```

## When to write Playwright (e2e) tests

Playwright in this repo drives **Storybook** (`e2e/*.spec.ts`), not a production
URL map.

Add or extend an e2e spec when:

- A composed component behavior is easier to validate in a real browser (hover,
  focus, keyboard, multiple breakpoints).
- You change a story URL or iframe-visible contract that existing specs assert.

Use stable **`data-testid`** / roles consistent with `src/utils/index.tsx` **`px`**
prefixing. Prefer `getByRole` over brittle text selectors when possible.

## When to run what

| Situation                        | Command                                     |
| -------------------------------- | ------------------------------------------- |
| After most code changes          | `npm run lint && npm test`                  |
| Before relying on coverage gates | `npm run coverage`                          |
| Chromatic / visual release prep  | `npm run chromatic` (see team docs for env) |
