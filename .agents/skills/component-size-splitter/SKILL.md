---
name: component-size-splitter
description: Keep TS/TSX/JS/JSX modules under the 200-line AGENTS.md guideline by splitting large components into focused hooks, view parts, and utilities without behavior regressions.
risk: safe
source: self
date_added: '2026-05-06'
---

# Component Size Splitter

Use this skill to break oversized modules into maintainable pieces while preserving public API and behavior.

## Use this skill when

- A `ts/tsx/js/jsx` file exceeds the repo 200-line guideline.
- A component mixes state, rendering, and transformations in one file.
- You need a repeatable refactor plan for large UI modules.

## Do not use this skill when

- The file is generated output or build artifacts.
- The module is already small and cohesive.
- A rewrite would be safer than incremental extraction.

## Context

This repo expects modular component code and co-located stories/tests. Large files should be split in a way that keeps exports stable and preserves `px`/`$px`, test IDs, and existing behavior.

## Instructions

1. Confirm current file length and identify the largest logical seams:
   - state/effects
   - rendering sections
   - data shaping helpers
2. Split in this order:
   - pure utility functions (no React)
   - custom hooks
   - presentational subcomponents
3. Keep external API unchanged unless explicitly requested.
4. Preserve class names, `getCommonProps`, and test IDs.
5. Update and/or add co-located tests and stories as needed.
6. Run and report:
   - `npm run format`
   - `npm run lint`
   - `npm run test`

## Output format

- Refactor plan (what moved where).
- Risk notes (state timing, memoization, refs, keyboard behavior).
- Verification checklist with command results.

## Limitations

- Favor incremental extraction over broad architecture rewrites.
- Do not change design tokens, SCSS namespace, or export contracts without request.
