# Code Review Checklist

## Phillips UI skill (required context)

Apply **`.agents/skills/seldon/SKILL.md`** (**Seldon skill**) together with
[`docs/agents/CONVENTIONS.md`](../../docs/agents/CONVENTIONS.md),
[`docs/agents/QUALITY.md`](../../docs/agents/QUALITY.md), and
[`AGENTS.md`](../../AGENTS.md): design-system scope (`src/components`,
`src/patterns`), co-located **Storybook + Vitest**, Playwright specs under
**`e2e/`** that target **Storybook** URLs when browser-level coverage is needed.

For Sanity, SEO, content modeling, or experimentation work, also see
[`../rules/claude-skills.mdc`](../rules/claude-skills.mdc) and the matching
`~/.claude/skills/*/SKILL.md`.

## Overview

Comprehensive checklist for conducting thorough code reviews to ensure quality,
security, and maintainability.

### Functionality

- [ ] Code does what it's supposed to do
- [ ] Edge cases are handled
- [ ] Error handling is appropriate
- [ ] No obvious bugs or logic errors

### Code quality

- [ ] Code is readable and well-structured
- [ ] Functions are small and focused
- [ ] Variable names are descriptive
- [ ] No unnecessary duplication
- [ ] Follows project conventions

### Security

- [ ] No obvious security vulnerabilities
- [ ] Input validation is present where user or CMS content is parsed/rendered
- [ ] Sensitive data is handled properly
- [ ] No hardcoded secrets

### Design system specifics

- [ ] Storybook stories added or updated for meaningful UI / prop surface changes
- [ ] BEM classes use the **`$px`** SCSS variable; TSX uses the shared **`px`**
      helper from `src/utils/index.tsx` for prefixed strings / testids where the
      codebase already does so
- [ ] Accessibility: keyboard support, roles/labels, focus behavior for interactive
      widgets
- [ ] Semantic HTML appropriate to the component
- [ ] Unit tests updated; coverage thresholds (`vitest.config.ts`) remain satisfied
- [ ] Playwright (`e2e/`) updated when browser-only behavior or Storybook contracts
      change in ways existing specs cover
- [ ] Public props / complex behavior documented (JSDoc on props or Storybook
      arg descriptions) when the change is user-facing for consumers
