---
name: conditional-rendering-conventions
description: Enforce repo JSX rendering conventions by replacing condition-and patterns with explicit ternary-plus-null rendering where appropriate.
risk: safe
source: self
date_added: '2026-05-06'
---

# Conditional Rendering Conventions

Use this skill to normalize JSX conditional rendering patterns to repo standards.

## Use this skill when

- Code review surfaces `{condition && <UI />}` usage in JSX.
- You want consistency across components and patterns.

## Do not use this skill when

- The expression is not rendering JSX output.
- Conversion harms readability in edge-case boolean logic.

## Context

Repo conventions prefer explicit JSX branches: `{condition ? <X /> : null}`.

## Instructions

1. Find JSX `&&` render expressions.
2. Convert straightforward patterns to ternary + `null`.
3. Validate semantics for truthy/falsy edge cases before conversion.
4. Keep formatting and import changes minimal.
5. Run and report:
   - `npm run format`
   - `npm run lint`

## Output format

- Converted files list.
- Any intentional `&&` exceptions with reasons.

## Limitations

- Avoid mechanical conversion when logic should be refactored first.
- Do not alter non-JSX boolean short-circuit patterns unless requested.
