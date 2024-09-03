import type { Meta, StoryObj } from '@storybook/react';
import UserManagement from './UserManagement';
import { AuthState } from './types';

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
    onLogin: () => console.log('Login'),
    onLogout: () => console.log('Logout'),
    authState: AuthState.LoggedOut,
    loginLabel: 'Login',
    logoutLabel: 'Logout',
  },
  argTypes: {
    authState: { control: { type: 'select' }, options: Object.values(AuthState) },
  },
};
