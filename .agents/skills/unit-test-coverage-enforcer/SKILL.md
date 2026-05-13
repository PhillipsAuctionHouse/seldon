---
name: unit-test-coverage-enforcer
description: Enforce co-located Vitest coverage for UI modules, distinguishing true test gaps from modules intentionally validated through parent component tests.
risk: safe
source: self
date_added: '2026-05-06'
---

# Unit Test Coverage Enforcer

Use this skill to standardize test expectations and close coverage gaps in `src/components` and `src/patterns`.

## Use this skill when

- Auditing missing `*.test.tsx` files.
- Reviewing new or materially changed UI components.
- Planning branch coverage improvements.

## Do not use this skill when

- The task is docs-only or style-only.
- Existing parent-level tests already cover internal leaf modules and policy allows it.

## Context

The repo expects Vitest + Testing Library with co-location patterns. Internal subcomponents may be tested via parent files if explicitly justified.

## Instructions

1. Inventory TSX modules and matching `*.test.tsx`.
2. Classify each gap:
   - `test_required`
   - `tested_via_parent` (must name parent test file)
   - `test_not_applicable`
3. For required gaps, add focused tests that cover:
   - render and critical variants
   - user interaction via `userEvent`
   - keyboard/focus behavior for interactive UI
4. Prefer `screen` queries and semantic roles.
5. Improve branch coverage for known hotspots before broad file-count expansion.
6. Run and report:
   - `npm run test`
   - `npm run coverage`

## Output format

- True gaps list (ordered by user impact).
- Parent-tested exceptions with rationale.
- Coverage delta summary after changes.

## Limitations

- Avoid snapshot-heavy tests without behavioral assertions.
- Do not add brittle selectors when role/text queries are available.
