import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ToastProvider } from '@radix-ui/react-toast';
import Toast, { PrimitiveToastProps } from './Toast';
import { ReactNode } from 'react';

interface ToastMockProps {
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

interface ToastCloseProps extends ToastMockProps {
  // eslint-disable-next-line react/boolean-prop-naming
  asChild?: boolean;
  'aria-label'?: string;
}

// Mock Radix UI Toast components
vi.mock('@radix-ui/react-toast', async () => {
  const actual = await vi.importActual('@radix-ui/react-toast');
  return {
    ...actual,
    Root: ({ children, className, ...props }: React.ComponentPropsWithoutRef<'div'>) => (
      <div className={className} data-testid="toast" {...props}>
        {children}
      </div>
    ),
    Title: ({ children }: ToastMockProps) => <div data-testid="toast-title">{children}</div>,
    Action: ({ children, className }: ToastMockProps) => (
      <div data-testid="toast-action" className={className}>
        {children}
      </div>
    ),
    Close: ({ children, className, asChild, ...props }: ToastCloseProps) => {
      if (asChild) {
        return children;
      }
      return (
        <div data-testid="toast-close" className={className} {...props}>
          {children}
        </div>
      );
    },
    Provider: ({ children }: { children: ReactNode }) => <div data-testid="toast-provider">{children}</div>,
  };
});

const ToastWrapper = (props: Partial<PrimitiveToastProps>) => (
  <ToastProvider>
    <Toast title="Default Title" {...props} />
  </ToastProvider>
);

describe('Toast', () => {
  it('renders with title', () => {
    render(<ToastWrapper title="Test Toast" />);
    expect(screen.getByTestId('toast-title')).toHaveTextContent('Test Toast');
  });

  it('renders with custom className', () => {
    render(<ToastWrapper title="Test Toast" className="custom-class" />);
    expect(screen.getByTestId('toast')).toHaveClass('custom-class');
  });

  it('renders with action', () => {
    render(<ToastWrapper title="Test Toast" action={<button>Action</button>} />);
    expect(screen.getByTestId('toast-action')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('does not render action when not provided', () => {
    render(<ToastWrapper title="Test Toast" />);
    expect(screen.queryByTestId('toast-action')).not.toBeInTheDocument();
  });

  it('renders close button', () => {
    render(<ToastWrapper title="Test Toast" />);
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('passes additional props to the root component', () => {
    render(<ToastWrapper title="Test Toast" data-custom="value" />);
    expect(screen.getByTestId('toast')).toHaveAttribute('data-custom', 'value');
  });
});
