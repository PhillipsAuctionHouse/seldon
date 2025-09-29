import { act, render, screen, waitFor } from '@testing-library/react';
import { px } from '../../utils';
import Button from './Button';
import { runCommonTests } from '../../utils/testUtils';
import { ButtonVariants } from './types';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  runCommonTests(Button, 'Button');

  const defaultProps = {
    children: 'Submit',
  };

  const renderButton = (props = {}) => render(<Button {...defaultProps} {...props} />);

  describe('class names', () => {
    it('renders with default class names', () => {
      renderButton();
      const buttonElement = screen.getByText('Submit');
      expect(buttonElement).toHaveClass(`${px}-button`);
      expect(buttonElement).toHaveClass(`${px}-button--primary`);
      expect(buttonElement).not.toHaveClass(`${px}-button--icon-last`);
      expect(buttonElement).not.toHaveClass(`${px}-skeleton`);
    });

    it.each([
      [ButtonVariants.secondary, true, ['Cancel', `${px}-button--secondary`, `${px}-button--icon-last`]],
      [ButtonVariants.primary, false, ['Submit', `${px}-button--primary`]],
    ])('renders with variant %s and iconLast %s', (variant, isIconLast, [text, ...expectedClasses]) => {
      renderButton({ variant, isIconLast, children: text });
      const buttonElement = screen.getByText(text);
      expectedClasses.forEach((cls) => expect(buttonElement).toHaveClass(cls));
    });

    it('renders skeleton class when isSkeletonLoading is true', () => {
      renderButton({ isSkeletonLoading: true, children: 'Come Meh Way' });
      const buttonElement = screen.getByText('Come Meh Way');
      expect(buttonElement).toHaveClass(`${px}-skeleton`);
    });

    it('does not render skeleton class when isSkeletonLoading is false', () => {
      renderButton({ isSkeletonLoading: false, children: 'Come Meh Way' });
      const buttonElementNoSkeleton = screen.getByText('Come Meh Way');
      expect(buttonElementNoSkeleton).not.toHaveClass(`${px}-skeleton`);
    });
  });

  describe('anchor/button rendering', () => {
    it.each([
      [{ href: 'https://example.com', children: 'Link' }, 'A', 'https://example.com'],
      [{ children: 'Click me' }, 'BUTTON', undefined],
    ])('renders as correct element', (props, expectedTag, expectedHref) => {
      renderButton(props);
      const element = screen.getByText(props.children);
      expect(element.tagName).toBe(expectedTag);
      if (expectedHref) {
        expect(element).toHaveAttribute('href', expectedHref);
      }
    });

    it('sets rel to noopener noreferrer when target is _blank', () => {
      renderButton({ href: 'https://example.com', target: '_blank', children: 'External Link' });
      const anchorElement = screen.getByText('External Link');
      expect(anchorElement).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('prefetch', () => {
    it('adds prefetch link when prefetch is "render"', async () => {
      renderButton({ href: 'https://example.com', prefetch: 'render', children: 'Link' });
      const anchorElement = screen.getByText('Link');
      act(() => {
        anchorElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      });
      await waitFor(() => {
        expect(screen.getByTestId('prefetch-link')).toHaveAttribute('rel', 'prefetch');
        expect(screen.getByTestId('prefetch-link')).toHaveAttribute('href', 'https://example.com');
      });
    });

    it('does not add prefetch link when prefetch is "none"', async () => {
      renderButton({ href: 'https://example.com', prefetch: 'none', children: 'Link' });
      const anchorElement = screen.getByText('Link');
      act(() => {
        anchorElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      });
      await waitFor(() => {
        expect(screen.queryByTestId('prefetch-link')).not.toBeInTheDocument();
      });
    });

    it('adds prefetch link on mouse over for intent prefetch', async () => {
      renderButton({ href: 'https://example.com', prefetch: 'intent', children: 'Link' });
      const anchorElement = screen.getByText('Link');
      await waitFor(() => {
        expect(screen.queryByTestId('prefetch-link')).not.toBeInTheDocument();
      });
      act(() => {
        anchorElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      });
      await waitFor(() => {
        expect(screen.getByTestId('prefetch-link')).toBeInTheDocument();
      });
    });
  });

  describe('disabled and click behavior', () => {
    it('should prevent default when isDisabled is true', () => {
      renderButton({ isDisabled: true, href: '#', children: 'Disabled Link' });
      const anchorElement = screen.getByText('Disabled Link');
      const preventDefaultSpy = vi.fn();
      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      event.preventDefault = preventDefaultSpy;
      anchorElement.dispatchEvent(event);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should not prevent default when isDisabled is false', () => {
      renderButton({ href: '#', children: 'Disabled Link' });
      const anchorElement = screen.getByText('Disabled Link');
      const preventDefaultSpy = vi.fn();
      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      event.preventDefault = preventDefaultSpy;
      anchorElement.dispatchEvent(event);
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should not call onClick for disabled button', async () => {
      const onClickMock = vi.fn();
      renderButton({ onClick: onClickMock, isDisabled: true, children: 'Disabled Button' });
      const buttonElement = screen.getByText('Disabled Button');
      await userEvent.click(buttonElement);
      expect(onClickMock).not.toHaveBeenCalled();
    });

    it('should call onClick for enabled button', async () => {
      const onClickMock = vi.fn();
      renderButton({ onClick: onClickMock, children: 'Enabled Button' });
      const buttonElement = screen.getByText('Enabled Button');
      await userEvent.click(buttonElement);
      expect(onClickMock).toHaveBeenCalled();
    });

    it('should handle an enabled button with no onClick prop without throwing', () => {
      renderButton({ children: 'Enabled Button' });
      const buttonElement = screen.getByText('Enabled Button');
      expect(() => userEvent.click(buttonElement)).not.toThrow();
    });

    it('calls onClick for enabled anchor', async () => {
      const onClickMock = vi.fn();
      renderButton({ href: '#', onClick: onClickMock, children: 'Active Link' });
      const anchorElement = screen.getByText('Active Link');
      await userEvent.click(anchorElement);
      expect(onClickMock).toHaveBeenCalled();
    });
  });

  it('is selectable by the test id', () => {
    renderButton({ id: 'test' });
    expect(screen.queryByTestId(/button-test/)).toBeInTheDocument();
  });
});
