import { render, screen } from '@testing-library/react';
import UserManagement from './UserManagement';
import userEvent from '@testing-library/user-event';

describe('UserManagement', () => {
  const userManagement = <UserManagement />;

  it('renders the UserManagement component', () => {
    render(userManagement);
    const userManagementElement = screen.getByTestId('user-management');
    expect(userManagementElement).toBeInTheDocument();
  });

  it('displays the login link', () => {
    render(userManagement);
    const loginLinkElement = screen.getByText('Login');
    expect(loginLinkElement).toBeInTheDocument();
  });

  it('changes the language when a different option is selected', async () => {
    render(userManagement);

    const englishRadio = screen.getByLabelText('English');
    const chineseRadio = screen.getByLabelText('中文');

    expect(englishRadio).toBeChecked();
    expect(chineseRadio).not.toBeChecked();

    // Select Chinese language
    await userEvent.click(chineseRadio);

    expect(chineseRadio).toBeChecked();
    expect(englishRadio).not.toBeChecked();

    // Select English language
    await userEvent.click(englishRadio);

    expect(englishRadio).toBeChecked();
    expect(chineseRadio).not.toBeChecked();
  });
});
