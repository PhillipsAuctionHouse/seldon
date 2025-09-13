import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ToastProvider } from './ToastContextProvider';
import Toast, { PrimitiveToastProps } from './Toast';
import { ReactNode } from 'react';

/* eslint-disable react/prop-types */

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
    Action: ({
      children,
      className,
      'announce-alt': announceAlt,
      asChild,
      altText,
      ...props
      // eslint-disable-next-line react/boolean-prop-naming
    }: ToastMockProps & { 'announce-alt'?: string; asChild?: boolean; altText?: string }) => {
      if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
          className: `${className || ''} ${children.props.className || ''}`.trim(),
          'data-radix-toast-announce-exclude': '',
          'data-radix-toast-announce-alt': altText,
          ...props,
        } as React.HTMLAttributes<HTMLElement>);
      }

      return (
        <div
          data-testid="toast-action"
          className={className}
          data-radix-toast-announce-exclude=""
          data-radix-toast-announce-alt={altText}
          {...props}
        >
          {children}
        </div>
      );
    },
    Close: ({ children, className, asChild, 'aria-label': ariaLabel, ...props }: ToastCloseProps) => {
      if (asChild) {
        return React.cloneElement(children as React.ReactElement, {
          'aria-label': ariaLabel,
          ...props,
        });
      }
      return (
        <div data-testid="toast-close" className={className} aria-label={ariaLabel} {...props}>
          {children}
        </div>
      );
    },
    Provider: ({ children }: { children: ReactNode }) => <div data-testid="toast-provider">{children}</div>,
    Viewport: (props: React.ComponentPropsWithoutRef<'div'>) => <div data-testid="toast-viewport" {...props} />,
  };
});

// Update ToastWrapper to include Viewport
const ToastWrapper = (props: Partial<PrimitiveToastProps>) => (
  <ToastProvider>
    <Toast title="Default Title" {...props} />
    <div data-testid="toast-viewport" />
  </ToastProvider>
);

describe('Toast', () => {
  it('renders with title', async () => {
    render(<ToastWrapper title="Test Toast" />);
    expect(await screen.findByTestId('toast-title')).toHaveTextContent('Test Toast');
  });

  it('renders with custom className', async () => {
    render(<ToastWrapper title="Test Toast" className="custom-class" />);
    expect(await screen.findByTestId('toast')).toHaveClass('custom-class');
  });

  it('renders with action', async () => {
    render(
      <ToastWrapper
        title="Test Toast"
        actionElement={
          <button
            data-testid="custom-action"
            className="seldon-button seldon-button--link seldon-toast__action"
            type="button"
          >
            Action
          </button>
        }
        actionAltText="Click for more"
      />,
    );

    const actionButton = await screen.findByTestId('custom-action');
    expect(actionButton).toBeInTheDocument();
    expect(actionButton).toHaveAttribute('data-radix-toast-announce-alt', 'Click for more');
    expect(actionButton).toHaveAttribute('data-radix-toast-announce-exclude', '');
    expect(actionButton).toHaveClass('seldon-button', 'seldon-button--link', 'seldon-toast__action');
    expect(actionButton).toHaveAttribute('type', 'button');
  });

  it('does not render action when not provided', () => {
    render(<ToastWrapper title="Test Toast" />);
    expect(screen.queryByTestId('toast-action')).not.toBeInTheDocument();
  });

  it('renders close button', async () => {
    render(<ToastWrapper title="Test Toast" closeButtonLabel="Close" />);
    expect(await screen.findByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('renders with custom close button title', async () => {
    render(<ToastWrapper title="Test Toast" closeButtonLabel="Custom Close Label" />);
    expect(await screen.findByRole('button', { name: 'Custom Close Label' })).toBeInTheDocument();
  });

  it('passes additional props to the root component', async () => {
    render(<ToastWrapper title="Test Toast" data-custom="value" />);
    expect(await screen.findByTestId('toast')).toHaveAttribute('data-custom', 'value');
  });
});
