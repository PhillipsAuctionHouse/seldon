---
name: testing-library-modernization
description: Modernize tests from fireEvent-heavy patterns to userEvent-first interactions in Vitest + Testing Library while preserving intent and reducing flake.
risk: safe
source: self
date_added: '2026-05-06'
---

# Testing Library Modernization

Use this skill to migrate legacy interaction tests to modern Testing Library patterns.

## Use this skill when

- Tests still rely on `fireEvent` for user-level interactions.
- You need to reduce flaky or unrealistic interaction behavior.
- PR review flags outdated test utilities.

## Do not use this skill when

- The event is synthetic/low-level and intentionally not user-driven.
- The test environment cannot support async user events yet.

## Context

Repo conventions prefer `userEvent`, `screen` queries, and Vitest mocks (`vi.fn()`).

## Instructions

1. Replace `fireEvent` with `userEvent.setup()` and await interactions.
2. Prefer user intent APIs:
   - `click`, `type`, `tab`, `keyboard`, `hover`
3. Replace render-return queries with `screen`.
4. Keep assertions behavior-focused, not implementation-detail-focused.
5. Update timing assumptions for async interactions as needed.
6. Run and report:
   - `npm run test`
   - `npm run coverage` (when interaction branches changed)

## Common replacements

- `fireEvent.click(el)` -> `await user.click(el)`
- `fireEvent.change(input, { target: { value } })` -> `await user.type(input, value)`
- key events -> `await user.keyboard('{Enter}')` or explicit sequences

## Limitations

- Do not rewrite unrelated test logic in the same pass.
- Keep diff reviewable by batching migrations per component area.
