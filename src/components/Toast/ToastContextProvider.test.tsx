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

  it('uses fallback context methods when outside provider', () => {
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

    // Spy on console.warn
    const consoleSpy = vi.spyOn(console, 'warn');
    consoleSpy.mockImplementation(() => undefined);

    render(<TestFallbackMethods />);

    // Test addToast from fallback
    act(() => {
      screen.getByText('Add Toast').click();
    });
    expect(screen.getByTestId('toast-count')).toHaveTextContent('0');

    // Test removeToast from fallback
    act(() => {
      screen.getByText('Remove Toast').click();
    });
    expect(screen.getByTestId('toast-count')).toHaveTextContent('0');

    // Verify warning was shown
    expect(consoleSpy).toHaveBeenCalledWith('useToastContext must be used within a ToastProvider');

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

  it('handles multiple toasts being added', () => {
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

    act(() => {
      screen.getByText('Add Toast 1').click();
      screen.getByText('Add Toast 2').click();
    });

    expect(screen.getByTestId('toast-count')).toHaveTextContent('2');
  });

  it('handles undefined toast title', () => {
    const TestUndefinedTitle = () => {
      const { toasts, addToast } = useToastContext();
      return (
        <>
          <button data-testid="add-undefined-title" onClick={() => addToast({ description: 'Test description' })}>
            Add Toast Without Title
          </button>
          {toasts.map((toast) => (
            <div key={toast.id} data-testid={`toast-${toast.id}`}>
              <span data-testid="toast-title">{toast.title}</span>
            </div>
          ))}
        </>
      );
    };

    render(
      <ToastProvider>
        <TestUndefinedTitle />
      </ToastProvider>,
    );

    // Add toast without title
    act(() => {
      screen.getByTestId('add-undefined-title').click();
    });

    // Verify empty string fallback is used
    expect(screen.getByTestId('toast-title')).toHaveTextContent('');
  });
});
