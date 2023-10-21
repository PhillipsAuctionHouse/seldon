import type { Meta, StoryObj } from '@storybook/react';

import ViewingsListCardForm from './ViewingsListCardForm';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/ViewingsListCardForm',
  component: ViewingsListCardForm,
  tags: ['autodocs'],
  argTypes: {
    cardTitle: { control: 'string' },
  },
} satisfies Meta<typeof ViewingsListCardForm>;
/* eslint-disable */
export default meta;
type Story = StoryObj<typeof meta>;

// export const ViewingsListCardFormStory = () => (
//   <ViewingsListCardForm>

// );


export const Playground: Story = {
  args: {
    cardTitle: 'Form Title',
    id: 'Form',
    location: 'London',
    locationLabel: 'Tour Location',
    children: 'Hi'
  },
};
