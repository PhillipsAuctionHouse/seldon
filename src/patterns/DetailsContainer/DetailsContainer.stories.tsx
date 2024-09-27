import { Meta } from '@storybook/react';
import { Detail } from '../../components/Detail';
import DetailsContainer, { DetailsContainerProps } from './DetailsContainer';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Patterns/DetailsContainer',
  component: DetailsContainer,
} satisfies Meta<typeof DetailsContainer>;

export default meta;
export const Playground = (props: DetailsContainerProps) => (
  <div style={{ backgroundColor: '#ccc', width: '100%', padding: '24px' }}>
    <div style={{ backgroundColor: 'white', padding: '12px', width: '400px', margin: '0 auto' }}>
      <DetailsContainer {...props} />
    </div>
  </div>
);

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  children: [
    <Detail key="1" label="Artist" value="Andy Warhol" />,
    <Detail key="2" label="Title" value="Marilyn Monroe" />,
    <Detail key="3" label="Year" value="1967" />,
  ],
};

Playground.argTypes = {};
