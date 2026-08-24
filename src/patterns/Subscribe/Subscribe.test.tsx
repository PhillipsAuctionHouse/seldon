import * as React from 'react';
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
    render(<Subscribe id="test-id" title="Subscribe to Email" blurb="This blurb will be rendered" />);
    expect(screen.getByText(/This blurb will be rendered/)).toBeInTheDocument();
  });
  it('it will render a loading if subscriptionState=loading', () => {
    render(<Subscribe id="test-loading" title="Subscribe to Email" subscriptionState={SubscriptionState.Loading} />);
    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });
  it('it will render an error if subscriptionState=invalid and invalidText passed', () => {
    render(
      <Subscribe
        id="test-invalid"
        title="Subscribe to Email"
        subscriptionState={SubscriptionState.Invalid}
        invalidText="Invalid input"
      />,
    );
    expect(screen.getByText(/Invalid input/)).toBeInTheDocument();
  });
  it('it will render an error if subscriptionState=error and errorText passed', () => {
    render(
      <Subscribe
        id="test-error"
        title="Subscribe to Email"
        subscriptionState={SubscriptionState.Error}
        errorText="Network error"
      />,
    );
    expect(screen.getByText(/Network error/)).toBeInTheDocument();
  });
  it('it will render an success text if subscriptionState=success', () => {
    render(
      <Subscribe
        id="test-success"
        title="Subscribe to Email"
        subscriptionState={SubscriptionState.Success}
        successText="Success"
      />,
    );
    expect(screen.getByText(/Success/)).toBeInTheDocument();
  });

  it('forwards inputProps (e.g. autoComplete) to the underlying <input>', () => {
    render(<Subscribe id="test-input-props" inputProps={{ autoComplete: 'email', name: 'user-email' }} />);
    const input = screen.getByPlaceholderText(/example@email.com/) as HTMLInputElement;
    expect(input).toHaveAttribute('autocomplete', 'email');
    expect(input).toHaveAttribute('name', 'user-email');
  });

  it('renders a custom element passed via the `element` prop', () => {
    // A form-like component: extra domain-agnostic props Subscribe does not
    // know about, plus an optional `id`. This call site would fail to type-
    // check when `element` was typed as `React.ElementType<SubscribeProps>`
    // because Subscribe's domain props (subscriptionState, blurb, …) were
    // required. `React.ElementType<React.ComponentProps<'form'>>` accepts it.
    const CustomForm = ({ children, ...rest }: React.ComponentProps<'form'>) => (
      <form {...rest} data-custom-form="true">
        {children}
      </form>
    );

    const { container } = render(<Subscribe id="test-element" element={CustomForm} />);
    expect(container.querySelector('form[data-custom-form="true"]')).toBeInTheDocument();
  });

  it('accepts a forwardRef form-like component (e.g. react-router Form)', () => {
    // react-router's `Form` narrows `method` to an enum, which failed to
    // assign to `ElementType<ComponentProps<'form'>>` under the prior typing.
    interface RouterFormProps extends React.HTMLAttributes<HTMLFormElement> {
      method?: 'get' | 'post';
    }
    const RouterFormLike = React.forwardRef<HTMLFormElement, RouterFormProps>(
      ({ children, method = 'post', ...rest }, ref) => (
        <form {...rest} method={method} ref={ref} data-router-form="true">
          {children}
        </form>
      ),
    );
    RouterFormLike.displayName = 'RouterFormLike';

    const { container } = render(<Subscribe id="test-router-form" element={RouterFormLike} />);
    expect(container.querySelector('form[data-router-form="true"]')).toBeInTheDocument();
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
