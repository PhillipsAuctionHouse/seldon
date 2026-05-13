# Seldon repository — agent-led code review audit

**Date:** 2026-05-04  
**Scope:** Static analysis and one full `npm run lint` + `npm run coverage` run against **`AGENTS.md`**, **`.agents/skills/seldon/SKILL.md`** (Seldon skill), **`docs/agents/CONVENTIONS.md`**, **`docs/agents/QUALITY.md`**, and **`.cursor/commands/code-review-checklist.md`**.

**Lint:** `npm run lint` completed successfully (no ESLint / Stylelint / tsc / markdownlint failures at audit time).  
**Coverage:** `npm run coverage` completed successfully; global Vitest thresholds (90%) are satisfied, but several modules still show **branch** percentages in the 80s on the text report (see §6).

---

## Executive summary — largest issues

| Rank | Theme                                         | Severity    | Notes                                                                                                                                                        |
| ---- | --------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | **File length vs `AGENTS.md` (200-line cap)** | High        | **`ComboBox.tsx` (~589 lines)** dominates; multiple other components/patterns exceed 200 lines.                                                              |
| 2    | **Co-located Storybook gaps**                 | Medium–high | **37** primary `*.tsx` modules (heuristic: default/named export of PascalCase component) lack a matching **`<Name>.stories.tsx`** beside the implementation. |
| 3    | **Co-located unit test gaps**                 | Medium      | **21** such modules lack **`<Name>.test.tsx`**. Some are compound subcomponents (acceptable if policy is “test via parent”); others are real gaps.           |
| 4    | **`fireEvent` in tests**                      | Low–medium  | **CONVENTIONS** prefer **`userEvent`**; **14** test files still reference `fireEvent` (grep hit count; see §5).                                              |
| 5    | **`{cond && <JSX />}` rendering**             | Low         | **CONVENTIONS** prefer ternary + `null`; a handful of production `*.tsx` files still use `&&` for UI (§5).                                                   |
| 6    | **`!important` in SCSS**                      | Low         | Present in **`src/scss/_sharedClasses.scss`** and **`_descriptiveRadioButtonGroup.scss`** (CONVENTIONS: avoid unless documented exception).                  |

---

## 1. `AGENTS.md` — 200-line file limit

Rule: keep `ts/tsx/js/jsx` under **200 lines** (excluding generated assets).

**Largest violations (line counts from workspace read):**

| Lines | File                                                               |
| ----: | ------------------------------------------------------------------ |
|   589 | `src/components/ComboBox/ComboBox.tsx`                             |
|   395 | `src/patterns/FavoritesCollectionTile/FavoritesCollectionTile.tsx` |
|   389 | `src/patterns/ViewingsList/ViewingsListCardForm.tsx`               |
|   309 | `src/patterns/ViewingsList/ViewingsListCard.tsx`                   |
|   257 | `src/components/Input/Input.tsx`                                   |
|   239 | `src/components/DatePicker/DatePicker.tsx`                         |
|   239 | `src/components/Search/Search.tsx`                                 |
|   231 | `src/components/Carousel/Carousel.tsx`                             |
|   227 | `src/patterns/BidSnapshot/BidSnapshot.tsx`                         |
|   222 | `src/patterns/ObjectTile/ObjectTile.tsx`                           |
|   210 | `src/components/Pagination/Pagination.tsx`                         |
|   208 | `src/components/SeldonImage/SeldonImage.tsx`                       |
|   201 | `src/patterns/SaleHeaderBanner/SaleHeaderBanner.tsx`               |

**Recommendation:** treat **`ComboBox.tsx`** as the highest-impact refactor (split hooks, subcomponents, or extracted modules). Align the rest with the same pattern over time.

---

## 2. Co-located Vitest (`*.test.tsx`) gaps

Automated rule: under `src/components` and `src/patterns`, for each `Foo.tsx` that **looks like** a exported UI component (PascalCase name, `export default` / `export const` component pattern), expect **`Foo.test.tsx`** in the same directory. **Hooks (`use*`) skipped.**

**Files with no matching `*.test.tsx` (21):**

- `src/components/Breadcrumb/BreadcrumbItem.tsx`
- `src/components/Carousel/CarouselContent.tsx`
- `src/components/Carousel/CarouselItem.tsx`
- `src/components/Collapsible/CollapsibleContent.tsx`
- `src/components/Collapsible/CollapsibleTrigger.tsx`
- `src/components/Filter/FilterHeader.tsx`
- `src/components/Filter/FilterInput.tsx`
- `src/components/Navigation/NavigationItemWithSubmenu/NavigationDesktopSubmenu.tsx`
- `src/components/Search/SearchButton.tsx`
- `src/components/Tabs/TabTrigger.tsx`
- `src/components/Tabs/TabsContainer.tsx`
- `src/components/Tabs/TabsContent.tsx`
- `src/patterns/FiltersInline/FilterButton.tsx`
- `src/patterns/FiltersInline/FilterDropdownMenuDesktop.tsx`
- `src/patterns/FiltersInline/FilterDropdownMenuMobile.tsx`
- `src/patterns/FiltersInline/MainFilterDropdown.tsx`
- `src/patterns/FiltersInline/SubFilterDropdown.tsx`
- `src/patterns/SaleCard/SaleCardActions.tsx`
- `src/patterns/SaleHeaderBanner/SaleHeaderBrowseAuctions.tsx`
- `src/patterns/ViewingsList/StatefulViewingsList.tsx`
- `src/patterns/ViewingsList/ViewingsListCard.tsx`
- `src/patterns/ViewingsList/ViewingsListCardForm.tsx`

**Caveat:** many are **subcomponents** of a tested parent (`Carousel`, `Tabs`, `FiltersInline`, etc.). Policy choice: either add focused tests per file or document “tested via `Parent.test.tsx`” and exclude them from strict co-location checks.

---

## 3. Co-located Storybook (`*.stories.tsx`) gaps

Same heuristic as §2: **37** files lack **`Foo.stories.tsx`** next to **`Foo.tsx`**.

Notable clusters:

- **Carousel** — multiple files (`CarouselArrows`, `CarouselContent`, `CarouselDot`, `CarouselDots`, `CarouselItem`) without dedicated stories (may be intentional if only `Carousel.stories.tsx` documents them).
- **Navigation** — `NavigationList`, `NavigationSubmenu`, `NavigationDesktopSubmenu`, `NavigationItemWithSubmenu` vs existing `Navigation*.stories.tsx` only on some leaves.
- **Tabs** — `TabTrigger`, `TabsContainer`, `TabsContent` (likely covered by `Tabs.stories.tsx`; still a strict co-location gap).
- **FiltersInline** — five dropdown/button modules without stories.
- **Toast** — `ToastContextProvider.tsx` without its own story.
- **Patterns** — `BidMessage`, `CountryPicker*` pieces, `ProgressWizardFooter`, `SaleCardActions`, `SaleHeaderBrowseAuctions`, `ViewingsList*` pieces.

**Recommendation:** decide whether **strict per-file stories** is required for subcomponents; if not, update **Seldon skill / CONVENTIONS** so Agent Review does not flag intentional composition. If yes, add minimal stories or re-export variants from the parent story file with explicit sub-story IDs.

---

## 4. TypeScript / React convention samples

- **`Type[]` vs `Array<Type>`:** many `Something[]` usages remain (e.g. props like `options: ComboBoxOption[]`). **CONVENTIONS** prefer `Array<T>`; this is widespread — treat as **incremental** cleanup, not a single PR.
- **Conditional render with `&&`:** examples include `Button.tsx` (prefetch branches), `ObjectTile`, `ViewingDetails`, `CountryPickerOption`, `AccountPageHeader`, `DrawerHeader`. Prefer **`condition ? <X /> : null`** per **CONVENTIONS**.

---

## 5. Testing library — `fireEvent` usage

**CONVENTIONS:** prefer **`userEvent`** over **`fireEvent`**.

Grep (`fireEvent.` in `src/**/*.test.tsx`) found hits in at least:

`CarouselArrows.test.tsx`, `CarouselDots.test.tsx`, `DescriptiveRadioButtonGroup.test.tsx`, `SeldonImage.test.tsx`, `CountryPickerTrigger.test.tsx`, `SaleCard.test.tsx`, `CarouselKeyboardNavigation.test.tsx`, `NavigationItemWithSubmenu.test.tsx`, `CarouselDot.test.tsx`, `DescriptiveRadioButton.test.tsx`, `Drawer.test.tsx`, `CountryPickerOption.test.tsx`, `FiltersInline.test.tsx`, `FilterMenu.test.tsx`, `AddToCalendar.test.tsx`.

**Recommendation:** migrate interactions to **`userEvent.setup()`** patterns gradually; prioritize high-traffic components (Navigation, Drawer, Filters).

---

## 6. Coverage hotspots (thresholds still green)

Global **`npm run coverage`** passed. The text report still highlights **branch** lines under 90% for some files, for example:

- `src/patterns/sitefurniture/Header/Header.tsx` — branches ~**81–88%** in the summarized row.
- `src/patterns/ViewingsList/ViewingsList.tsx` — branches ~**78%** on one line range in the table output.
- `src/patterns/UserManagement/UserManagement.tsx` — branches ~**87%**.

**Recommendation:** use the HTML coverage report under `coverage/` to add tests for those branches before they regress below the global gate.

---

## 7. SCSS — `!important`

Grep found **`!important`** usage in:

- `src/scss/_sharedClasses.scss` (many occurrences — likely legacy utility escapes).
- `src/components/DescriptiveRadioButtonGroup/_descriptiveRadioButtonGroup.scss`.

**CONVENTIONS:** avoid `!important` unless an exception is documented. Review whether shared-classes can be tokenized instead.

---

## 8. Agent / doc consistency — resolved

**`.agents/skills/seldon/SKILL.md`** is aligned with **`.cursor/rules/seldon-mdc.mdc`**: both describe Storybook + Vitest only (no Playwright / `e2e/` in agent-facing copy). **`AGENTS.md`** intro matches.

---

## Methodology notes

- **Component detection** was heuristic-based (path under `src/components` / `src/patterns`, PascalCase `Foo.tsx`, export pattern suggesting a React component). It will **false-positive** or **false-negative** on edge cases (barrels, `forwardRef`-only exports, non-component TSX).
- **E2E:** not re-audited in this pass; `e2e/header.spec.ts` exists and targets Storybook URLs — no gap analysis run.
- Re-run this audit after large refactors: `npm run lint && npm run coverage`, then re-execute the Node inventory script used to produce §2–§3.

---

## Hook wiring for major changes

To keep this audit actionable after plan execution or major agent changes:

- Use local skills first as a review gate:
  - `.agents/skills/radix-ui-design-system`
  - `.agents/skills/accessibility-compliance-accessibility-audit`
- Then run project checks from `docs/agents/QUALITY.md`:
  - `npm run format`
  - `npm run lint`
  - `npm run test`
- Enforcement path:
  - `.cursor/hooks/post-agent-quality.sh` schedules a background follow-up agent on completion and now prompts that run to execute the two skills as an audit pass before command checks.
- If the work is not major, the skill pass can be treated as lightweight (only report material risks).
