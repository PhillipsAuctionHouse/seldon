import { Meta } from '@storybook/react';
import { useState } from 'react';
import DescriptiveRadioButton from './DescriptiveRadioButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/DescriptiveRadioButton',
  component: DescriptiveRadioButton,
} satisfies Meta<typeof DescriptiveRadioButton>;

export default meta;

export const Playground = () => {
  const [selected, setSelected] = useState(false);

  return (
    <DescriptiveRadioButton
      name="choice"
      value="option1"
      label="Option 1"
      description="This is a description for option 1."
      checked={selected}
      onChange={() => setSelected(true)}
    />
  );
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  children: 'Hi There',
};

Playground.argTypes = {};
