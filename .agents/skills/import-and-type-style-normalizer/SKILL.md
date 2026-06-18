---
name: import-and-type-style-normalizer
description: Normalize TypeScript import style and type usage to repo conventions including type-only imports, import ordering, and Array generic preference.
risk: safe
source: self
date_added: '2026-05-06'
---

# Import and Type Style Normalizer

Use this skill to keep TypeScript style consistent and lint-friendly across the library.

## Use this skill when

- PRs include mixed import ordering or type import patterns.
- You need cleanup for `Type[]` and other style drift.
- A broad formatting/lint pass is needed before merge.

## Do not use this skill when

- The task is focused on behavior changes only and style churn would obscure review.
- The project area has a documented local exception.

## Context

Repo conventions require type-only imports where appropriate, ordered imports per ESLint, and `Array<Type>` preference.

## Instructions

1. Normalize imports:
   - convert type-only imports to `import { type Foo } ...`
   - align ordering/grouping to ESLint rules
2. Replace `Type[]` with `Array<Type>` where practical.
3. Keep edits scoped; avoid unrelated refactors.
4. Verify no runtime import behavior changes.
5. Run and report:
   - `npm run format`
   - `npm run lint`

## Output format

- Files normalized.
- Any skipped conversions with reason (readability, generated types, etc.).

## Limitations

- Do not rewrite complex generic signatures if readability regresses.
- Respect existing external API and declaration stability.
