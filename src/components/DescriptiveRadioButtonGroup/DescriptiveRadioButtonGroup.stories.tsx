import { Meta } from '@storybook/react';
import DescriptiveRadioButtonGroup, { DescriptiveRadioButtonGroupProps } from './DescriptiveRadioButtonGroup';
import { useState } from 'react';

const meta = {
  title: 'Components/DescriptiveRadioButtonGroup',
  component: DescriptiveRadioButtonGroup,
} satisfies Meta<typeof DescriptiveRadioButtonGroup>;

export default meta;

export const Playground = (props: DescriptiveRadioButtonGroupProps) => {
  const [selected, setSelected] = useState(props.value ?? '');
  return <DescriptiveRadioButtonGroup {...props} value={selected} onValueChange={(value) => setSelected(value)} />;
};

Playground.args = {
  legendText: 'Choose an option',
  name: 'bidder-type',
  value: '', // No default selected
  options: [
    {
      value: 'a',
      labelText: 'Bidding for yourself',
      description:
        'This option should be selected by individuals who are bidding on works for their personal collection.',
      id: 'option-a',
    },
    {
      value: 'b',
      labelText: 'Bidding on behalf of a company',
      description: 'This option if bidding for a company, institution, or legal entity for business or investment.',
      id: 'option-b',
    },
  ],
};

Playground.argTypes = {};
