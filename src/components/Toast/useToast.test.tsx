import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { useToast } from './useToast';
import { ToastProvider } from './ToastContextProvider';
import userEvent from '@testing-library/user-event';

const TestComponent = () => {
  const toast = useToast();

  return (
    <div>
      <button onClick={() => toast({ title: 'Basic Toast' })}>Show Basic Toast</button>
      <button
        onClick={() =>
          toast({
            title: 'Action Toast',
            actionElement: <button>Action</button>,
            actionAltText: 'Action',
          })
        }
      >
        Show Action Toast
      </button>
    </div>
  );
};

describe('useToast', () => {
  it('shows toast with basic config', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    await userEvent.click(await screen.findByText('Show Basic Toast'));
    await screen.findByText('Basic Toast');
  });

  it('shows toast with action', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    await userEvent.click(await screen.findByText('Show Action Toast'));
    await screen.findByText('Action Toast');
    await screen.findByText('Action');
  });

  it('accepts string shorthand', async () => {
    const TestStringToast = () => {
      const toast = useToast();
      return <button onClick={() => toast('Quick message')}>Show Toast</button>;
    };

    render(
      <ToastProvider>
        <TestStringToast />
      </ToastProvider>,
    );

    await userEvent.click(await screen.findByText('Show Toast'));
    await screen.findByText('Quick message');
  });
});
