import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useToast } from './useToast';
import { ToastProvider } from './ToastContextProvider';

const TestComponent = () => {
  const toast = useToast();

  return (
    <div>
      <button onClick={() => toast({ title: 'Basic Toast' })}>Show Basic Toast</button>
      <button
        onClick={() =>
          toast({
            title: 'Action Toast',
            action: <button>Action</button>,
          })
        }
      >
        Show Action Toast
      </button>
    </div>
  );
};

describe('useToast', () => {
  it('shows toast with basic config', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    act(() => {
      screen.getByText('Show Basic Toast').click();
    });

    expect(screen.getByText('Basic Toast')).toBeInTheDocument();
  });

  it('shows toast with action', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    act(() => {
      screen.getByText('Show Action Toast').click();
    });

    expect(screen.getByText('Action Toast')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('accepts string shorthand', () => {
    const TestStringToast = () => {
      const toast = useToast();
      return <button onClick={() => toast('Quick message')}>Show Toast</button>;
    };

    render(
      <ToastProvider>
        <TestStringToast />
      </ToastProvider>,
    );

    act(() => {
      screen.getByText('Show Toast').click();
    });

    expect(screen.getByText('Quick message')).toBeInTheDocument();
  });
});
