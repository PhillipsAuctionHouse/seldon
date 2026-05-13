---
name: scss-specificity-remediation
description: Reduce SCSS specificity debt by eliminating unnecessary !important usage, improving selector strategy, and documenting justified exceptions.
risk: safe
source: self
date_added: '2026-05-06'
---

# SCSS Specificity Remediation

Use this skill to reduce styling fragility caused by high specificity and `!important` overrides.

## Use this skill when

- SCSS files include repeated `!important`.
- Visual bugs depend on selector wars instead of token-driven styling.
- A review asks for style architecture cleanup.

## Do not use this skill when

- Existing exception policy explicitly requires `!important` for a known integration boundary.
- The task is unrelated to styling or CSS behavior.

## Context

Repo conventions prefer BEM classes with `.#{$px}-...`, shared partials, and avoiding `!important` unless justified.

## Instructions

1. Inventory `!important` usage and classify:
   - removable now
   - temporarily required with documented reason
2. Replace specificity escalation with:
   - cleaner BEM structure
   - source order improvements
   - scoped modifiers/utilities
3. Promote shared tokens/mixins to `_vars.scss` / `_utils.scss` when repeated.
4. Preserve class namespace and selector intent.
5. Run and report:
   - `npm run lint`
   - targeted visual verification notes (Storybook states)

## Output format

- Removed `!important` list.
- Remaining exceptions list with rationale and follow-up plan.

## Limitations

- Avoid broad stylesheet rewrites in one pass.
- Do not break consumer override contracts without coordination.
