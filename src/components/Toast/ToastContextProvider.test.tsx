import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ToastProvider } from './ToastContextProvider';
import { useToastContext } from './useToastContext';

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

  it('returns fallback context and warns when used outside provider', () => {
    const TestComponentWithoutProvider = () => {
      const context = useToastContext();
      return <div data-testid="toast-count">{context.toasts.length}</div>;
    };

    const consoleSpy = vi.spyOn(console, 'warn');
    consoleSpy.mockImplementation(() => {
      /* intentionally empty */
    });

    render(<TestComponentWithoutProvider />);

    expect(consoleSpy).toHaveBeenCalledWith('useToastContext must be used within a ToastProvider');

    expect(screen.getByTestId('toast-count')).toHaveTextContent('0');

    consoleSpy.mockRestore();
  });

  it('adds toast to context when addToast is called', () => {
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

    act(() => {
      screen.getByRole('button').click();
    });

    expect(screen.getByTestId('toast-count')).toHaveTextContent('1');
  });

  it('removes toast when removeToast is called', () => {
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

    act(() => {
      screen.getByText('Add Toast').click();
    });
    expect(screen.getByTestId('toast-count')).toHaveTextContent('1');

    act(() => {
      screen.getByText('Remove Toast').click();
    });
    expect(screen.getByTestId('toast-count')).toHaveTextContent('0');
  });
});
