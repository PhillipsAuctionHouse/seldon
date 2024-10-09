import { Meta } from '@storybook/react';
import { SeldonProvider } from './SeldonProvider';
import { SSRMediaQuery } from '../../providers/utils';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Providers/SeldonProvider',
  component: SeldonProvider,
} satisfies Meta<typeof SeldonProvider>;

export default meta;
export const Playground = () => (
  <SeldonProvider>
    <SSRMediaQuery.Media lessThan="md">Small Breakpoint</SSRMediaQuery.Media>
    <SSRMediaQuery.Media between={['md', 'lg']}>Medium Breakpoint</SSRMediaQuery.Media>
    <SSRMediaQuery.Media between={['lg', 'xl']}>Large Breakpoint</SSRMediaQuery.Media>
    <SSRMediaQuery.Media greaterThan="lg">Extra Large Breakpoint</SSRMediaQuery.Media>
  </SeldonProvider>
);
