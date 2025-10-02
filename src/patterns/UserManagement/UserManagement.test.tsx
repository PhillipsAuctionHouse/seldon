import { render, screen } from '@testing-library/react';
import UserManagement from './UserManagement';
import userEvent from '@testing-library/user-event';
// import { SupportedLanguages } from '../../types/commonTypes';
import { runCommonTests } from '../../utils/testUtils';
import { AuthState } from './types';

describe('UserManagement', () => {
  runCommonTests(UserManagement, 'UserManagement');

  it('renders the UserManagement component', () => {
    render(<UserManagement />);
    const userManagementElement = screen.getByTestId(`user-management`);
    expect(userManagementElement).toBeInTheDocument();
  });

  it('displays the login link', () => {
    render(<UserManagement />);
    const loginLinkElement = screen.getByText('Login');
    expect(loginLinkElement).toBeInTheDocument();
  });

  it('disabled if passed', async () => {
    const onLoginMock = vitest.fn();
    render(<UserManagement disabled onLogin={onLoginMock} />);
    const loginLinkElement = screen.getByRole('button', { name: /Login/ });
    expect(loginLinkElement).toBeDisabled();
    await userEvent.click(loginLinkElement);
    expect(onLoginMock).not.toHaveBeenCalled();
  });

  it('calls onLogin when login link is clicked', async () => {
    const onLoginMock = vitest.fn();
    render(<UserManagement onLogin={onLoginMock} />);
    const loginLinkElement = screen.getByText('Login');
    await userEvent.click(loginLinkElement);
    expect(onLoginMock).toHaveBeenCalled();
  });

  it('renders account link when logged in', () => {
    const href = '/my-account';
    render(<UserManagement authState={AuthState.LoggedIn} accountLabel="My Account" href={href} />);
    const accountLinkElement = screen.getByRole('link', { name: /My Account/ });
    expect(accountLinkElement).toBeInTheDocument();
    expect(accountLinkElement).toHaveAttribute('href', href);
  });

  it('displays the correct login and logout labels', () => {
    const loginLabel = 'Sign In';
    render(<UserManagement loginLabel={loginLabel} />);
    const loginLinkElement = screen.getByText(loginLabel);
    expect(loginLinkElement).toBeInTheDocument();
  });

  it('displays the correct login and logout labels when isLoggedIn is true', () => {
    const accountLabel = 'My Account';
    render(<UserManagement authState={AuthState.LoggedIn} accountLabel={accountLabel} />);
    const accountLinkLabel = screen.getByText(accountLabel);
    expect(accountLinkLabel).toBeInTheDocument();
  });

  it('AuthState not loaded does not show logout or login text', () => {
    render(<UserManagement authState={AuthState.Loading} />);
    const accountLinkLabel = screen.queryByText('Account');
    expect(accountLinkLabel).not.toBeInTheDocument();
    const loginLinkElement = screen.queryByText('Login');
    expect(loginLinkElement).not.toBeInTheDocument();
  });
});
