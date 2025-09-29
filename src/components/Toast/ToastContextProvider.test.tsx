import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ToastProvider } from './ToastContextProvider';
import { useToastContext } from './useToastContext';
import userEvent from '@testing-library/user-event';
import { ToastContext } from './ToastContextProvider';
import { useContext } from 'react';

const TestComponent = () => {
  const { addToast } = useToastContext();
  return <button onClick={() => addToast({ title: 'Test Toast' })}>Add Toast</button>;
};

describe('ToastContextProvider', () => {
  it('removes toast when the Toast UI is closed (onOpenChange)', async () => {
    // This test simulates closing the Toast via the UI, triggering onOpenChange and removeToast
    const ToastCloseUI = () => {
      const { addToast, toasts } = useToastContext();
      return (
        <>
          <button onClick={() => addToast({ title: 'A Toast!' })}>Add Toast</button>
          <div data-testid="toast-count">{toasts.length}</div>
        </>
      );
    };

    render(
      <ToastProvider>
        <ToastCloseUI />
      </ToastProvider>,
    );

    expect(screen.getByTestId('toast-count')).toHaveTextContent('0');
    await userEvent.click(screen.getByText('Add Toast'));
    expect(screen.getByTestId('toast-count')).toHaveTextContent('1');

    const closeBtn = screen.getByTestId('toast-close-button');
    await userEvent.click(closeBtn);

    // Wait for the toast to be removed
    await screen.findByTestId('toast-count');
    expect(screen.getByTestId('toast-count')).toHaveTextContent('0');
  });
  it('provides toast context to children', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('uses fallback context methods when outside provider', async () => {
    const TestFallbackMethods = () => {
      const { toasts, addToast, removeToast } = useToastContext();
      return (
        <div>
          <button onClick={() => addToast({ title: 'Test' })}>Add Toast</button>
          <button onClick={() => removeToast('123')}>Remove Toast</button>
          <div data-testid="toast-count">{toasts.length}</div>
        </div>
      );
    };

    const consoleSpy = vi.spyOn(console, 'warn');
    consoleSpy.mockImplementation(() => undefined);

    render(<TestFallbackMethods />);

    await userEvent.click(screen.getByText('Add Toast'));
    expect(screen.getByTestId('toast-count')).toHaveTextContent('0');

    await userEvent.click(screen.getByText('Remove Toast'));
    expect(screen.getByTestId('toast-count')).toHaveTextContent('0');

    expect(consoleSpy).toHaveBeenCalledWith('useToastContext must be used within a ToastProvider');
    consoleSpy.mockRestore();
  });

  it('adds toast to context when addToast is called', async () => {
    const TestToastList = () => {
      const { toasts } = useToastContext();
      return <div data-testid="toast-count">{toasts.length}</div>;
    };

    render(
      <ToastProvider>
        <TestComponent />
        <TestToastList />
      </ToastProvider>,
    );

    expect(screen.getByTestId('toast-count')).toHaveTextContent('0');
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('toast-count')).toHaveTextContent('1');
  });

  it('removes toast when removeToast is called', async () => {
    const TestToastManager = () => {
      const { toasts, addToast, removeToast } = useToastContext();
      return (
        <>
          <button onClick={() => addToast({ title: 'Test Toast' })}>Add Toast</button>
          <button onClick={() => toasts.length > 0 && removeToast(toasts[0].id)}>Remove Toast</button>
          <div data-testid="toast-count">{toasts.length}</div>
        </>
      );
    };

    render(
      <ToastProvider>
        <TestToastManager />
      </ToastProvider>,
    );

    await userEvent.click(screen.getByText('Add Toast'));
    expect(screen.getByTestId('toast-count')).toHaveTextContent('1');

    await userEvent.click(screen.getByText('Remove Toast'));
    expect(screen.getByTestId('toast-count')).toHaveTextContent('0');
  });

  it('handles multiple toasts being added', async () => {
    const TestMultipleToasts = () => {
      const { toasts, addToast } = useToastContext();
      return (
        <>
          <button onClick={() => addToast({ title: 'Toast 1' })}>Add Toast 1</button>
          <button onClick={() => addToast({ title: 'Toast 2' })}>Add Toast 2</button>
          <div data-testid="toast-count">{toasts.length}</div>
        </>
      );
    };

    render(
      <ToastProvider>
        <TestMultipleToasts />
      </ToastProvider>,
    );

    expect(screen.getByTestId('toast-count')).toHaveTextContent('0');
    await userEvent.click(screen.getByText('Add Toast 1'));
    await userEvent.click(screen.getByText('Add Toast 2'));
    expect(screen.getByTestId('toast-count')).toHaveTextContent('2');
  });

  it('renders the correct toast title when a toast is added', async () => {
    const TestToastTitle = () => {
      const { toasts, addToast } = useToastContext();
      return (
        <>
          <button onClick={() => addToast({ title: 'My Toast Title' })}>Add Toast</button>
          <button onClick={() => addToast({ title: null })}>Add Second Toast</button>
          <div data-testid="toast-title">{toasts[0]?.title ?? ''}</div>
          <div data-testid="toast-title-2">{toasts[1]?.title ?? 'None!'}</div>
        </>
      );
    };

    render(
      <ToastProvider>
        <TestToastTitle />
      </ToastProvider>,
    );

    expect(screen.getByTestId('toast-title')).toHaveTextContent('');
    await userEvent.click(screen.getByText('Add Toast'));
    expect(screen.getByTestId('toast-title')).toHaveTextContent('My Toast Title');

    expect(screen.getByTestId('toast-title-2')).toHaveTextContent('None!');
    await userEvent.click(screen.getByText('Add Second Toast'));
    expect(screen.getByTestId('toast-title-2')).toHaveTextContent('None!');
  });

  it('removes toast when removeToast is called after adding', async () => {
    const Toaster = () => {
      const { addToast, toasts, removeToast } = useToastContext();
      return (
        <>
          <button onClick={() => addToast({ title: 'Did You Know?' })}>Add Toast</button>
          <button onClick={() => toasts.length > 0 && removeToast(toasts[0].id)}>Remove Toast</button>
          <div data-testid="toast-count">{toasts.length}</div>
        </>
      );
    };

    render(
      <ToastProvider>
        <Toaster />
      </ToastProvider>,
    );

    expect(screen.getByTestId('toast-count')).toHaveTextContent('0');
    await userEvent.click(screen.getByText('Add Toast'));
    expect(screen.getByTestId('toast-count')).toHaveTextContent('1');

    await userEvent.click(screen.getByText('Remove Toast'));
    expect(screen.getByTestId('toast-count')).toHaveTextContent('0');
  });

  it('calls onOpenChange when toast is closed', async () => {
    let openChangeCalled = false;
    const ItsALittleBurnt = () => {
      const { addToast, toasts } = useToastContext();
      return (
        <>
          <button
            onClick={() =>
              addToast({
                title: 'Did You Know?',
                onOpenChange: (open) => {
                  if (!open) openChangeCalled = true;
                },
              })
            }
          >
            Add Toast
          </button>
          <button
            onClick={() => {
              if (toasts.length > 0 && toasts[0].onOpenChange) {
                toasts[0].onOpenChange(false);
              }
            }}
          >
            Close Toast
          </button>
        </>
      );
    };

    render(
      <ToastProvider>
        <ItsALittleBurnt />
      </ToastProvider>,
    );

    await userEvent.click(screen.getByText('Add Toast'));
    expect(openChangeCalled).toBe(false);
    await userEvent.click(screen.getByText('Close Toast'));
    expect(openChangeCalled).toBe(true);
  });

  describe('ToastContext export', () => {
    it('should be defined and have default value undefined', () => {
      expect(ToastContext).toBeDefined();

      // Check default value by rendering a consumer outside provider
      let contextValue: unknown = 'not-set';
      const Consumer = () => {
        contextValue = useContext(ToastContext);
        return null;
      };
      render(<Consumer />);
      expect(contextValue).toBeUndefined();
    });
  });
});
