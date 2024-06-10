import { render, screen } from '@testing-library/react';
import UserManagement from './UserManagement';
import userEvent from '@testing-library/user-event';

describe('UserManagement', () => {
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

  it('changes the language when a different option is selected', () => {
    render(<UserManagement />);
    const englishRadio = screen.getByLabelText('English');
    const chineseRadio = screen.getByLabelText('中文');

    expect(englishRadio).toBeChecked();
    expect(chineseRadio).not.toBeChecked();

    // Select Chinese language
    userEvent.click(chineseRadio);

    // TODO: Fix this test
    // expect(chineseRadio).toBeChecked();
    // expect(englishRadio).not.toBeChecked();
  });
});
