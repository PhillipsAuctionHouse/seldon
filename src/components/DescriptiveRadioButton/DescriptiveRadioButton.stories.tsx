import { Meta } from '@storybook/react';
import { useState } from 'react';
import DescriptiveRadioButton from './DescriptiveRadioButton';

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
      labelText="Option 1"
      description="This is a description for option 1."
      checked={selected}
      onChange={() => setSelected(true)}
      id="option1"
    />
  );
};

Playground.args = {};

Playground.argTypes = {};
