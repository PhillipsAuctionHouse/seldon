import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useToast } from './useToast';
import { ToastProvider } from './ToastContextProvider';
import userEvent from '@testing-library/user-event';
import { px } from '../../utils';

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

  it('exposes setOffset on the callable toast function', async () => {
    const TestOffsetToast = () => {
      const toast = useToast();
      return (
        <button
          onClick={() => {
            toast.setOffset({ x: 16, y: 32 });
            toast('Offset message');
          }}
        >
          Show Offset Toast
        </button>
      );
    };

    render(
      <ToastProvider>
        <TestOffsetToast />
      </ToastProvider>,
    );

    await userEvent.click(await screen.findByText('Show Offset Toast'));
    await screen.findByText('Offset message');

    const viewport = document.querySelector(`.${px}-toast-viewport`);
    expect(viewport).toHaveStyle({ bottom: '32px', left: '16px' });
  });

  it('supports destructuring show and setOffset', async () => {
    const TestDestructuredToast = () => {
      const { show, setOffset } = useToast();
      return (
        <button
          onClick={() => {
            setOffset({ x: 10, y: 20 });
            show('Destructured message');
          }}
        >
          Show Destructured Toast
        </button>
      );
    };

    render(
      <ToastProvider>
        <TestDestructuredToast />
      </ToastProvider>,
    );

    await userEvent.click(await screen.findByText('Show Destructured Toast'));
    await screen.findByText('Destructured message');

    const viewport = document.querySelector(`.${px}-toast-viewport`);
    expect(viewport).toHaveStyle({ bottom: '20px', left: '10px' });
  });
});
