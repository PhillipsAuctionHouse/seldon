import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import Subscribe from './Subscribe';
import { SubscriptionState } from './types';
import { runCommonTests } from '../../utils/testUtils';

const testStates = [
  {
    state: SubscriptionState.Loading,
    text: 'Loading...',
    props: {},
    description: 'loading',
  },
  {
    state: SubscriptionState.Invalid,
    text: 'Invalid input',
    props: { invalidText: 'Invalid input' },
    description: 'invalid and invalidText passed',
  },
  {
    state: SubscriptionState.Error,
    text: 'Network error',
    props: { errorText: 'Network error' },
    description: 'error and errorText passed',
  },
  {
    state: SubscriptionState.Success,
    text: 'Success',
    props: { successText: 'Success' },
    description: 'success',
  },
];

describe('Subscribe', () => {
  runCommonTests(Subscribe, 'Subscribe');

  it.each(testStates)('it will render $description if subscriptionState=$state', ({ state, text, props }) => {
    render(<Subscribe id={`test-${state}`} title="Subscribe to Email" subscriptionState={state} {...props} />);
    expect(screen.getByText(new RegExp(text))).toBeInTheDocument();
  });

  it('is selectable by the test id', () => {
    render(<Subscribe id="test" />);
    expect(screen.getByTestId('subscribe-test')).toBeInTheDocument();
  });

  it('it will render a blurb if one is passed in', () => {
    render(<Subscribe id="test-id" title="Subscribe to Email" blurb="This blurb will be rendered" />);
    expect(screen.getByText(/This blurb will be rendered/)).toBeInTheDocument();
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
        id="test-submit"
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
