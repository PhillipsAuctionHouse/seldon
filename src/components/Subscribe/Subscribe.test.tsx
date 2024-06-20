import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import Subscribe from './Subscribe';
import { SubscriptionState } from './types';
import { runCommonTests } from '../../utils/testUtils';

describe('Subscribe', () => {
  runCommonTests(Subscribe, 'Subscribe');

  it('is selectable by the test id', () => {
    render(<Subscribe id="test" />);
    expect(screen.getByTestId('subscribe-test')).toBeInTheDocument();
  });

  it('it will render a blurb if one is passed in', () => {
    render(<Subscribe title="Subscribe to Email" blurb="This blurb will be rendered" />);
    expect(screen.getByText(/This blurb will be rendered/)).toBeInTheDocument();
  });
  it('it will render a loading if subscriptionState=loading', () => {
    render(<Subscribe title="Subscribe to Email" subscriptionState={SubscriptionState.Loading} />);
    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });
  it('it will render an error if subscriptionState=invalid and invalidText passed', () => {
    render(
      <Subscribe
        title="Subscribe to Email"
        subscriptionState={SubscriptionState.Invalid}
        invalidText="Invalid input"
      />,
    );
    expect(screen.getByText(/Invalid input/)).toBeInTheDocument();
  });
  it('it will render an success text if subscriptionState=success', () => {
    render(
      <Subscribe title="Subscribe to Email" subscriptionState={SubscriptionState.Success} successText="Success" />,
    );
    expect(screen.getByText(/Success/)).toBeInTheDocument();
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
