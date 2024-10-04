import { Meta } from '@storybook/react';
import { Detail } from '../../components/Detail';
import DetailList, { DetailListProps } from './DetailList';
import { DetailListAlignment } from './types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Patterns/DetailList',
  component: DetailList,
} satisfies Meta<typeof DetailList>;

export default meta;
export const Playground = (props: DetailListProps) => (
  <div style={{ backgroundColor: '#ccc', width: '100%', padding: '24px' }}>
    <div style={{ backgroundColor: 'white', padding: '12px', width: '400px', margin: '0 auto' }}>
      <DetailList {...props}>
        <Detail key="1" label="Artist" value="Andy Warhol" />
        <Detail key="2" label="Title" value="Marilyn Monroe" />
        <Detail key="3" label="Year" value="1967" />
        <Detail
          key="4"
          label="Really Long Label That should wrap"
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
      </DetailList>
    </div>
  </div>
);

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  alignment: DetailListAlignment.columns,
};

Playground.argTypes = {
  alignment: {
    options: Object.values(DetailListAlignment),
    control: {
      type: 'select',
    },
  },
  hasSeparators: {
    control: 'boolean',
  },
};
