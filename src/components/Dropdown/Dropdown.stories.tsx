import { Meta } from '@storybook/react';
import Dropdown, { DropdownProps } from './Dropdown';
import { useMemo } from 'react';
import { SupportedLanguages } from '../../types/commonTypes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;

const languages = [
  { label: 'English', value: SupportedLanguages.en },
  { label: '中文', value: SupportedLanguages.zh },
  { label: 'Español', value: 'es' },
  { label: 'Français', value: 'fr' },
  { label: 'Deutsch', value: 'de' },
];

export const Playground = ({ value, ...props }: DropdownProps) => {
  const newValue = useMemo(() => value, [value]);
  return (
    <Dropdown
      {...props}
      options={props.options}
      value={newValue}
      onValueChange={(value) => console.log('value changed', value)}
      id="test"
    />
  );
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  options: languages,
  value: 'en',
  isDisabled: false,
};

Playground.argTypes = {
  value: {
    options: languages.map((lang) => lang.value),
    control: {
      type: 'select',
    },
  },
};
