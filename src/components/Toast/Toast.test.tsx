// import { render, screen } from '@testing-library/react';
// import { describe, it, expect, vi } from 'vitest';
// import userEvent from '@testing-library/user-event';
// import * as PrimitiveToast from '@radix-ui/react-toast';
// import { ToastProvider } from '@radix-ui/react-toast';
// import Toast from './Toast';

// // Mock Radix UI Toast components
// vi.mock('@radix-ui/react-toast', async () => {
//   const actual = await vi.importActual('@radix-ui/react-toast');
//   return {
//     ...actual,
//     Root: ({ children, className, ...props }: any) => (
//       <div className={className} data-testid="toast-root" {...props}>
//         {children}
//       </div>
//     ),
//     Title: ({ children }: any) => <div data-testid="toast-title">{children}</div>,
//     Action: ({ children, className }: any) => (
//       <div data-testid="toast-action" className={className}>
//         {children}
//       </div>
//     ),
//     Close: ({ children, className }: any) => (
//       <button data-testid="toast-close" className={className}>
//         {children}
//       </button>
//     ),
//     Provider: ({ children }: any) => <div data-testid="toast-provider">{children}</div>,
//   };
// });

// const ToastWrapper = (props: any) => (
//   <ToastProvider>
//     <Toast {...props} />
//   </ToastProvider>
// );

// describe('Toast', () => {
//   it('renders with title', () => {
//     render(<ToastWrapper title="Test Toast" />);
//     expect(screen.getByTestId('toast-title')).toHaveTextContent('Test Toast');
//   });

//   it('renders with custom className', () => {
//     render(<ToastWrapper title="Test Toast" className="custom-class" />);
//     expect(screen.getByTestId('toast-root')).toHaveClass('custom-class');
//   });

//   it('renders with action', () => {
//     render(<ToastWrapper title="Test Toast" action={<button>Action</button>} />);
//     expect(screen.getByTestId('toast-action')).toBeInTheDocument();
//     expect(screen.getByText('Action')).toBeInTheDocument();
//   });

//   it('does not render action when not provided', () => {
//     render(<ToastWrapper title="Test Toast" />);
//     expect(screen.queryByTestId('toast-action')).not.toBeInTheDocument();
//   });

//   it('renders close button', () => {
//     render(<ToastWrapper title="Test Toast" />);
//     expect(screen.getByTestId('toast-close')).toBeInTheDocument();
//   });

//   it('forwards ref correctly', () => {
//     const ref = { current: null };
//     render(<ToastWrapper title="Test Toast" ref={ref} />);
//     expect(ref.current).not.toBeNull();
//   });

//   it('applies base class names correctly', () => {
//     render(<ToastWrapper title="Test Toast" />);
//     const rootElement = screen.getByTestId('toast-root');
//     expect(rootElement).toHaveClass('Toast');

//     expect(screen.getByTestId('toast-close')).toHaveClass('Toast__close');
//   });

//   it('passes additional props to the root component', () => {
//     render(<ToastWrapper title="Test Toast" data-custom="value" />);
//     expect(screen.getByTestId('toast-root')).toHaveAttribute('data-custom', 'value');
//   });
// });
