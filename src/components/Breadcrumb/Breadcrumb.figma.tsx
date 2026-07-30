import figma from '@figma/code-connect';
import Breadcrumb from './Breadcrumb';
import type { BreadcrumbItemProps } from './BreadcrumbItem';

const FIGMA_URL =
  'https://www.figma.com/design/wRbSaO9MngnSedlDSQka3Y/Design-System--Component-Library?node-id=2053-2593';

// Figma variants:
//   Size: '3-LVL' | '4-LVL' — number of crumbs to render.
// Seldon Breadcrumb has no matching prop; the number of levels is expressed
// via the length of the `items` array. We branch example content on Size.
// The "current" crumb is derived from position (last item), so `isCurrent`
// is intentionally omitted from the example items — setting it here would
// have no effect at runtime and would mislead readers copying the snippet.
const threeLevelItems: BreadcrumbItemProps[] = [
  { label: 'Home', href: '/' },
  { label: 'Category', href: '/category' },
  { label: 'Current' },
];

const fourLevelItems: BreadcrumbItemProps[] = [
  { label: 'Home', href: '/' },
  { label: 'Category', href: '/category' },
  { label: 'Subcategory', href: '/category/sub' },
  { label: 'Current' },
];

figma.connect(Breadcrumb, FIGMA_URL, {
  props: {
    items: figma.enum('Size', {
      '3-LVL': threeLevelItems,
      '4-LVL': fourLevelItems,
    }),
  },
  // @ts-expect-error — @figma/code-connect@1.5.1's ReactMeta MapType widens arrays to array-like objects. Runtime shape is correct; the Figma CLI reads the JSX literally, so we suppress the type-only mismatch here.
  example: ({ items }) => <Breadcrumb items={items} />,
});
