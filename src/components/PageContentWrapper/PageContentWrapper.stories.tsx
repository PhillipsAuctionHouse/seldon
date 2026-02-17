import { Meta } from '@storybook/react-vite';
import PageContentWrapper from './PageContentWrapper';
import { Playground as PlaygroundSplitPanel } from '../SplitPanel/SplitPanel.stories';
import { Text, TextVariants } from '../Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/PageContentWrapper',
  component: PageContentWrapper,
} satisfies Meta<typeof PageContentWrapper>;

export default meta;
export const Playground = () => {
  return (
    <>
      <PageContentWrapper>
        <Text variant={TextVariants.heading2}>With Page/Margin</Text>
        <PlaygroundSplitPanel />
      </PageContentWrapper>
      <Text variant={TextVariants.heading2}>Full bleed</Text>
      <PlaygroundSplitPanel />
    </>
  );
};
