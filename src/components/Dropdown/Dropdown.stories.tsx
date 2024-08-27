import { Meta } from '@storybook/react';
import Dropdown, { DropdownProps } from './Dropdown';
import { useState } from 'react';
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

export const Playground = (props: DropdownProps) => {
  const [value, setValue] = useState(props.value);
  return <Dropdown {...props} options={props.options} value={value} onValueChange={setValue} id="test" />;
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  options: languages,
  value: 'en',
};
