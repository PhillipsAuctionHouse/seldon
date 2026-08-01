import figma from '@figma/code-connect';
import AccountPageHeader from './AccountPageHeader';

// The library "Page header" component (page: "Page Header") maps to seldon's
// `AccountPageHeader` pattern — the descendant `TEXT[Account Page Header]`
// in the Figma main component confirms it.
const FIGMA_URL =
  'https://www.figma.com/design/wRbSaO9MngnSedlDSQka3Y/Design-System--Component-Library?node-id=2054-7448';

// Figma variants:
//   Header (VARIANT): 'Desktop' | 'Mobile' — layout breakpoint. Seldon's
//     AccountPageHeader is CSS/SSRMediaQuery-responsive with no breakpoint
//     prop, so Header is intentionally not mapped.
//   Subheader (BOOLEAN)          → subtitle
//   Collection overline (BOOLEAN) → overline
//   Button (BOOLEAN)             → actionButtons: include a primary CTA
//   Icon action (BOOLEAN)        → actionButtons: include an icon action
//   Back button (BOOLEAN)         → no seldon equivalent — intentionally
//     unmapped. Flag on the Figma component if the back button becomes a
//     supported seldon prop.
figma.connect(AccountPageHeader, FIGMA_URL, {
  props: {
    subtitle: figma.boolean('Subheader', {
      true: 'Sample subtitle',
      false: undefined,
    }),
    overline: figma.boolean('Collection overline', {
      true: 'Sample overline',
      false: undefined,
    }),
  },
  example: ({ subtitle, overline }) => (
    <AccountPageHeader
      title="Account overview"
      subtitle={subtitle}
      overline={overline}
      actionButtons={[
        {
          label: 'Add',
          ariaLabel: 'Add',
          icon: 'Add',
          onClick: () => undefined,
          isPrimary: true,
        },
        {
          ariaLabel: 'Edit',
          icon: 'Edit',
          onClick: () => undefined,
        },
      ]}
    />
  ),
});
