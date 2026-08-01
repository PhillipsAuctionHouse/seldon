# Figma Code Connect status

This doc tracks which seldon components have a `*.figma.tsx` mapping and which
Figma components are blocked (waiting for the design library, or for a seldon
counterpart). Keep this table in sync when adding or removing templates.

## Mapped (connected in this repo)

| seldon path                                                  | Figma component | Figma node                         |
| ------------------------------------------------------------ | --------------- | ---------------------------------- |
| `src/components/Breadcrumb/Breadcrumb.figma.tsx`             | Breadcrumb      | `wRbSaO9MngnSedlDSQka3Y#2053-2593` |
| `src/components/Search/Search.figma.tsx`                     | Search          | `wRbSaO9MngnSedlDSQka3Y#2267-8446` |
| `src/patterns/AccountPageHeader/AccountPageHeader.figma.tsx` | Page header     | `wRbSaO9MngnSedlDSQka3Y#2054-7448` |

## Blocked (Figma-side)

Missing from the published Component Library. Consumer projects that
prototype these frames will compose lower-level seldon primitives (Text,
Link, Button, Icon, Divider) themselves to render these regions.

Reviewed against the first prototyping target: `01_Account` file
(`bXXvbUYMsUhfJcCvDWjQJB`), frame `2095-44098`.

| Figma component                  | Status                                                                                                                                             | Notes                                                                                                                                                                                                                                                   |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Button**                       | Not yet published. Design is actively moving it.                                                                                                   | Once the library `Button` main component exists, add `src/components/Button/Button.figma.tsx`. Figma variants expected: `Variant`, `Size`, `State`, `Icon (L)`, `Icon (R)`, `Label`. Seldon `Button` props: `variant`, `size`, `type` + children label. |
| **Left Hand Navigation States**  | In the library (`2054:8025`) but is a _state variant set_ for a single nav item (State × Nav Item Type), not a whole nav. No 1:1 seldon component. | Prototypes should compose the left nav from `Navigation`, `NavigationItem`, `Link`, and `Text` primitives. Revisit only if design publishes a `SideNavigation` container component.                                                                     |
| **Account Menu Selections**      | Not in the library (`2407:49759` is local to the `01_Account` design).                                                                             | Prototypes should compose from `Link` / `Text` primitives directly, or wait for design to publish a shared version.                                                                                                                                     |
| **Account States TO BE REMOVED** | Explicitly deprecated (`TO BE REMOVED` in the component name).                                                                                     | Skip permanently. Design will delete when convenient.                                                                                                                                                                                                   |

## Workflow

Adding a new `*.figma.tsx` requires only three inputs:

1. The Figma main-component URL (right-click main component → "Copy link to
   selection"). Must include `?node-id=`.
2. The seldon target component's props interface.
3. A mapping table between Figma properties (VARIANT / BOOLEAN / TEXT /
   INSTANCE_SWAP) and code props.

Verify locally with `npx figma connect publish --dry-run` — the CLI parses the
files and reports what would publish; a `403 Invalid token` at the end is
expected without `FIGMA_ACCESS_TOKEN` set and just means it stopped before
touching Figma servers.

Publishing to Figma is automatic on merge to `main` via
`.github/workflows/figma-code-connect.yml` using the `FIGMA_ACCESS_TOKEN`
repo secret. Do not publish manually.
