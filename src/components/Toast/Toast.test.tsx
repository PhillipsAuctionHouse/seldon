import React, { ComponentProps, DetailedHTMLProps, LiHTMLAttributes, ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ToastProvider } from './ToastContextProvider';
import Toast, { PrimitiveToastProps } from './Toast';

beforeEach(() => {
  vi.mock('@radix-ui/react-toast', async () => {
    const actual = await vi.importActual('@radix-ui/react-toast');
    const cloneOrLi = (
      children: ReactNode,
      className: string | undefined,
      props: Record<string, unknown>,
      testId: string,
      extraAttrs: Record<string, unknown> = {},
      asChild?: boolean,
      ariaLabel?: string,
    ) => {
      if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
          className: `${className || ''} ${children.props.className || ''}`.trim(),
          ...extraAttrs,
          ...props,
          ...(ariaLabel ? { 'aria-label': ariaLabel } : {}),
        } as React.HTMLAttributes<HTMLElement>);
      }
      // Remove 'title' from props to avoid passing ReactNode to native li
      const { title, ...liProps } = props;
      return (
        <li
          data-testid={testId}
          className={className}
          {...extraAttrs}
          {...liProps}
          {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
        >
          {children}
        </li>
      );
    };

    return {
      ...actual,
      Root: ({ children, className, ...props }: React.ComponentPropsWithoutRef<'div'> & { className?: string }) => (
        <div className={className} data-testid="toast" {...props}>
          {children}
        </div>
      ),
      Title: ({ children }: ComponentProps<typeof Toast>) => <div data-testid="toast-title">{children}</div>,
      Action: ({
        children,
        className,
        'announce-alt': announceAlt,
        asChild,
        altText,
        ...props
      }: ComponentProps<typeof Toast> & {
        'announce-alt'?: string;
        asChild?: boolean;
        altText?: string;
      }): DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> =>
        cloneOrLi(
          children,
          className,
          props,
          'toast-action',
          {
            'data-radix-toast-announce-exclude': '',
            'data-radix-toast-announce-alt': altText,
          },
          asChild,
        ),
      Close: ({ children, className, asChild, 'aria-label': ariaLabel, ...props }: ComponentProps<typeof Toast>) =>
        cloneOrLi(children, className, props, 'toast-close', {}, asChild, ariaLabel),
      Provider: ({ children }: { children: ReactNode }) => <div data-testid="toast-provider">{children}</div>,
      Viewport: (props: React.ComponentPropsWithoutRef<'div'>) => <div data-testid="toast-viewport" {...props} />,
    };
  });
});

const renderToast = (props: Partial<PrimitiveToastProps> = {}) =>
  render(
    <ToastProvider>
      <Toast title="Default Title" {...props} />
      <div data-testid="toast-viewport" />
    </ToastProvider>,
  );

describe('Toast', () => {
  describe('Basic rendering', () => {
    it('renders with title', async () => {
      renderToast({ title: 'Test Toast' });
      expect(await screen.findByTestId('toast-title')).toHaveTextContent('Test Toast');
    });

    it('renders with custom className', async () => {
      renderToast({ title: 'Test Toast', className: 'custom-class' });
      expect(await screen.findByTestId('toast')).toHaveClass('custom-class');
    });

    it('passes additional props to the root component', async () => {
      // @ts-expect-error the error is the test
      renderToast({ title: 'Test Toast', 'data-custom': 'value' });
      expect(await screen.findByTestId('toast')).toHaveAttribute('data-custom', 'value');
    });
  });

  describe('Action rendering', () => {
    it('renders with action', async () => {
      renderToast({
        title: 'Test Toast',
        actionElement: (
          <button
            data-testid="custom-action"
            className="seldon-button seldon-button--link seldon-toast__action"
            type="button"
          >
            Action
          </button>
        ),
        actionAltText: 'Click for more',
      });

      const actionButton = await screen.findByTestId('custom-action');
      expect(actionButton).toBeInTheDocument();
      expect(actionButton).toHaveAttribute('data-radix-toast-announce-alt', 'Click for more');
      expect(actionButton).toHaveAttribute('data-radix-toast-announce-exclude', '');
      expect(actionButton).toHaveClass('seldon-button', 'seldon-button--link', 'seldon-toast__action');
      expect(actionButton).toHaveAttribute('type', 'button');
    });

    it('does not render action when not provided', () => {
      renderToast({ title: 'Test Toast' });
      expect(screen.queryByTestId('toast-action')).not.toBeInTheDocument();
    });
  });

  describe('Close button', () => {
    it('renders close button', async () => {
      renderToast({ title: 'Test Toast', closeButtonLabel: 'Close' });
      expect(await screen.findByRole('button', { name: 'Close' })).toBeInTheDocument();
    });

    it('renders with custom close button title', async () => {
      renderToast({ title: 'Test Toast', closeButtonLabel: 'Custom Close Label' });
      expect(await screen.findByRole('button', { name: 'Custom Close Label' })).toBeInTheDocument();
    });
  });
});
