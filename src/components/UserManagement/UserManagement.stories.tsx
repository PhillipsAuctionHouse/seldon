import type { Meta, StoryObj } from '@storybook/react';
import UserManagement from './UserManagement';
import { SupportedLanguages } from '../../types/commonTypes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/UserManagement',
  component: UserManagement,
  parameters: {
    docs: {
      story: {
        height: '400px',
      },
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof UserManagement>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Playground: Story = {
  args: {
    currentLanguage: SupportedLanguages.en,
    onLanguageChange: (language) => console.log('Language Change', language),
    onLogin: () => console.log('Login'),
    onLogout: () => console.log('Logout'),
    isLoggedIn: false,
    loginLabel: 'Login',
    logoutLabel: 'Logout',
  },
  argTypes: {
    currentLanguage: {
      options: Object.values(SupportedLanguages),
      control: {
        type: 'select',
      },
    },
  },
};
