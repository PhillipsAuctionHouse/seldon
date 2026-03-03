import { Meta } from '@storybook/react-vite';
import LanguageSelector, { LanguageSelectorProps } from './LanguageSelector';
import { SupportedLanguages } from '../../types/commonTypes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Patterns/LanguageSelector',
  component: LanguageSelector,
} satisfies Meta<typeof LanguageSelector>;

export default meta;
export const Playground = (props: LanguageSelectorProps) => <LanguageSelector {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  currentLanguage: SupportedLanguages.en,
  onLanguageChange: (language: SupportedLanguages) => console.log('Language Change', language),
};

Playground.argTypes = {
  currentLanguage: {
    options: Object.values(SupportedLanguages),
    control: {
      type: 'select',
    },
  },
};
