import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import Subscribe from './Subscribe';

describe('Subscribe', () => {
  it('is selectable by the test id', () => {
    render(<Subscribe id="test" />);
    expect(screen.queryByTestId('test')).toBeInTheDocument();
  });

  it('it will render a blurb if one is passed in', () => {
    render(<Subscribe title="Subscribe to Email" blurb="This blurb will be rendered" />);
    expect(screen.queryByText(/This blurb will be rendered/)).toBeInTheDocument();
  });

  it('it will call the callback function on submit', async () => {
    const user = userEvent.setup();
    const mockCallback = vi.fn((e) => {
      e.preventDefault();
      const inputElement = (e.target as HTMLElement).closest('form')?.querySelector('input');

      return inputElement?.value;
    });
    render(
      <Subscribe
        title="Subscribe to Email"
        blurb="This blurb will be rendered"
        buttonProps={{ onClick: mockCallback }}
      />,
    );

    await user.click(screen.getByPlaceholderText(/example@email.com/));

    await user.keyboard('test@test.com');

    await user.click(screen.getByText('Sign Up'));
    await waitFor(() => expect(mockCallback).toReturnWith('test@test.com'));
  });
});
