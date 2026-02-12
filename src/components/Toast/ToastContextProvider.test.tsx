import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ToastProvider } from './ToastContextProvider';
import { useToastContext } from './useToastContext';
import userEvent from '@testing-library/user-event';

const TestComponent = () => {
  const { addToast } = useToastContext();
  return <button onClick={() => addToast({ title: 'Test Toast' })}>Add Toast</button>;
};

describe('ToastContextProvider', () => {
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

  it('removes toast when toast is closed via onOpenChange (e.g. close button)', async () => {
    const closeLabel = 'Dismiss toast';
    const TestToastWithClose = () => {
      const { toasts, addToast } = useToastContext();
      return (
        <>
          <button onClick={() => addToast({ title: 'To be closed', closeButtonLabel: closeLabel })}>Add Toast</button>
          <div data-testid="toast-count">{toasts.length}</div>
        </>
      );
    };

    render(
      <ToastProvider>
        <TestToastWithClose />
      </ToastProvider>,
    );

    await userEvent.click(screen.getByText('Add Toast'));
    expect(screen.getByTestId('toast-count')).toHaveTextContent('1');

    const closeButton = screen.getByRole('button', { name: closeLabel });
    await userEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.getByTestId('toast-count')).toHaveTextContent('0');
    });
  });
});
