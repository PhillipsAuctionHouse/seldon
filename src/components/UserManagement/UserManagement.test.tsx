import { render, screen } from '@testing-library/react';
import UserManagement from './UserManagement';
import userEvent from '@testing-library/user-event';
import { SupportedLanguages } from '../../types/commonTypes';
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

  it('renders the UserManagement component', () => {
    render(<UserManagement />);
    const userManagementElement = screen.getByTestId('user-management');
    expect(userManagementElement).toBeInTheDocument();
  });

  it('displays the login link', () => {
    render(<UserManagement />);
    const loginLinkElement = screen.getByText('Login');
    expect(loginLinkElement).toBeInTheDocument();
  });

  it('calls onLogin when login link is clicked', async () => {
    const onLoginMock = vitest.fn();
    render(<UserManagement onLogin={onLoginMock} />);
    const loginLinkElement = screen.getByText('Login');
    await userEvent.click(loginLinkElement);
    expect(onLoginMock).toHaveBeenCalled();
  });

  it('calls onLogout when logout link is clicked', async () => {
    const onLogoutMock = vitest.fn();
    render(<UserManagement authState={AuthState.LoggedIn} onLogout={onLogoutMock} />);
    const logoutLinkElement = screen.getByText('Logout');
    await userEvent.click(logoutLinkElement);
    expect(onLogoutMock).toHaveBeenCalled();
  });

  it('changes the language when a different option is selected', async () => {
    const onLanguageChangeMock = vitest.fn();
    render(<UserManagement onLanguageChange={onLanguageChangeMock} />);
    const chineseRadio = screen.getByLabelText('中文');
    await userEvent.click(chineseRadio);
    expect(onLanguageChangeMock).toHaveBeenCalledWith('zh');
  });

  it('shows the correct language in the dropdown input', () => {
    render(<UserManagement currentLanguage={SupportedLanguages.zh} />);
    expect(screen.getByRole('button', { name: '中文' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '中文' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'English' })).not.toBeChecked();
  });

  it('displays the correct login and logout labels', () => {
    const loginLabel = 'Sign In';
    render(<UserManagement loginLabel={loginLabel} />);
    const loginLinkElement = screen.getByText(loginLabel);
    expect(loginLinkElement).toBeInTheDocument();
  });

  it('displays the correct login and logout labels when isLoggedIn is true', () => {
    const logoutLabel = 'Sign Out';
    render(<UserManagement authState={AuthState.LoggedIn} logoutLabel={logoutLabel} />);
    const logoutLinkElement = screen.getByText(logoutLabel);
    expect(logoutLinkElement).toBeInTheDocument();
  });
  it('AuthState not loaded does not show logout or login text', () => {
    render(<UserManagement authState={AuthState.Loading} />);
    const logoutLinkElement = screen.queryByText('Logout');
    expect(logoutLinkElement).not.toBeInTheDocument();
    const loginLinkElement = screen.queryByText('Login');
    expect(loginLinkElement).not.toBeInTheDocument();
  });
});
