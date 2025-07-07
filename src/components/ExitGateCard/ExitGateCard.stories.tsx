import { Meta } from '@storybook/react';
import ExitGateCard, { ExitGateCardProps } from './ExitGateCard';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/ExitGateCard',
  component: ExitGateCard,
} satisfies Meta<typeof ExitGateCard>;

export default meta;
export const Playground = (props: ExitGateCardProps) => (
  <div style={{ maxWidth: '1392px' }}>
    <ExitGateCard {...props} />
  </div>
);

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  imageSrc: 'https://picsum.photos/704/268',
  label: 'CONSIGN TODAY',
  header: 'Sell with us',
  description: 'We are inviting consignments for our upcoming auctions.',
  linkLabel: 'Enquire now',
  linkHref: '/',
  variant: 'exitGateCard',
};
