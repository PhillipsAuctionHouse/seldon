# Docs Index

Use this as the navigation layer. Read only the doc relevant to your task.

## Commands

```bash
npm start              # Storybook dev server (port 6006)
npm run build          # library build → dist/
npm test               # Vitest unit project
npm run test:all       # all Vitest projects
npm run test-storybook # Vitest Storybook integration
npm run test:e2e       # Playwright (Storybook URLs under e2e/)
npm run lint           # tsc --noEmit + ESLint + Stylelint + markdownlint
npm run format         # Prettier write
npm run coverage       # Vitest coverage (see thresholds in vitest.config.ts)
npm run chromatic      # Chromatic (STORYBOOK=1)
```

## Read by task

| Task                                                             | Doc                                                                                                              |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Design-system UI work, stories/tests, review expectations        | `.agents/skills/seldon/SKILL.md` (Seldon skill)                                                                  |
| Sanity, SEO, content modeling (Claude Code skills)               | `.cursor/rules/claude-skills.mdc` → `~/.claude/skills/*/SKILL.md`                                                |
| Cursor subagents: Storybook E2E gaps, unit tests, Storybook gaps | `.cursor/agents/playwright-route-checker.md`, `component-unit-test-checker.md`, `component-storybook-checker.md` |
| Navigating the codebase                                          | `docs/agents/ARCHITECTURE.md`                                                                                    |
| Writing code — TypeScript, React, SCSS, testing                  | `docs/agents/CONVENTIONS.md`                                                                                     |
| Verifying work is ready                                          | `docs/agents/QUALITY.md`                                                                                         |
| Environment setup, CI                                            | `docs/agents/SETUP.md`                                                                                           |

## Shared boundaries

- `package.json`, `vite.config.ts`, `vitest.config.ts`, ESLint / Stylelint config
  — shared surfaces; change only when necessary.
- **`dist/`** — build output; do not edit by hand.
