---
name: storybook-coverage-enforcer
description: Enforce Storybook coverage expectations for visual components and subcomponents in src/components and src/patterns with explicit parent-coverage exceptions.
risk: safe
source: self
date_added: '2026-05-06'
---

# Storybook Coverage Enforcer

Use this skill to find and close Storybook coverage gaps while avoiding noisy false positives on internal subcomponents.

## Use this skill when

- Auditing missing `*.stories.tsx` coverage.
- Reviewing a PR that adds or changes visual UI.
- Aligning Storybook expectations with repo conventions.

## Do not use this skill when

- The change is non-visual (types/helpers only).
- Storybook is intentionally out of scope for the task.

## Context

This repo values co-located stories, but internal leaf components are often documented through parent stories. Enforcement should support explicit, documented exceptions.

## Instructions

1. Inventory `src/components/**` and `src/patterns/**` TSX modules.
2. Classify each module:
   - `requires_story`: public/visual component
   - `covered_by_parent`: internal subcomponent with parent story coverage
   - `no_story_needed`: non-visual or infrastructure-only module
3. For `covered_by_parent`, require explicit note in audit output naming the parent story.
4. For `requires_story`, create or update co-located stories with meaningful states.
5. Verify interactions/accessibility states in stories where applicable.
6. Run and report:
   - `npm run format`
   - `npm run lint`

## Output format

- Missing stories list by severity (public API first).
- Parent-coverage exception list with justification.
- New/updated story files.

## Limitations

- Do not assume every `Foo.tsx` needs `Foo.stories.tsx` without classification.
- Keep stories focused on behavior and visuals, not test-only scaffolding.
