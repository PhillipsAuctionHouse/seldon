import figma from '@figma/code-connect';
import { Breadcrumb } from './index';
import type { BreadcrumbItemProps } from './BreadcrumbItem';

const FIGMA_URL =
  'https://www.figma.com/design/wRbSaO9MngnSedlDSQka3Y/Design-System--Component-Library?node-id=2053-2593';

// Figma variants:
//   Size: '3-LVL' | '4-LVL' — number of crumbs to render.
// Seldon Breadcrumb has no matching prop; the number of levels is expressed
// via the length of the `items` array. We branch example content on Size.
const threeLevelItems: BreadcrumbItemProps[] = [
  { label: 'Home', href: '/' },
  { label: 'Category', href: '/category' },
  { label: 'Current', isCurrent: true },
];

const fourLevelItems: BreadcrumbItemProps[] = [
  { label: 'Home', href: '/' },
  { label: 'Category', href: '/category' },
  { label: 'Subcategory', href: '/category/sub' },
  { label: 'Current', isCurrent: true },
];

figma.connect(Breadcrumb, FIGMA_URL, {
  props: {
    items: figma.enum('Size', {
      '3-LVL': threeLevelItems,
      '4-LVL': fourLevelItems,
    }),
  },
  example: ({ items }) => <Breadcrumb items={items} />,
});
