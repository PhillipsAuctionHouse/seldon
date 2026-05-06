---
name: branch-coverage-hotspot-hunter
description: Find and prioritize branch-coverage weak spots from Vitest reports, then propose targeted tests that improve confidence without broad churn.
risk: safe
source: self
date_added: '2026-05-06'
---

# Branch Coverage Hotspot Hunter

Use this skill to improve confidence in high-risk branches before they slip below coverage gates.

## Use this skill when

- Global coverage passes but branch coverage is weak in key modules.
- A PR changes conditional UI logic.
- You need a focused test plan from coverage artifacts.

## Do not use this skill when

- The change is non-executable content (docs/config only).
- Coverage reports are unavailable.

## Context

This repo enforces strong coverage thresholds. Branch deficits in complex patterns/components should be addressed with targeted tests, not blanket test growth.

## Instructions

1. Run coverage and inspect branch hotspots:
   - `npm run coverage`
   - review text + HTML report
2. Rank hotspots by risk:
   - user-facing behavior
   - conditional complexity
   - regression history/surface area
3. Add focused tests for untested branches:
   - success/failure paths
   - optional prop branches
   - keyboard/focus and interaction forks
4. Re-run tests and coverage, then report deltas.

## Output format

- Top hotspot list with rationale.
- Test additions mapped to covered branches.
- Before/after branch coverage summary.

## Limitations

- Avoid chasing 100% by testing trivial implementation details.
- Prefer stable, behavior-level assertions over brittle internals.
