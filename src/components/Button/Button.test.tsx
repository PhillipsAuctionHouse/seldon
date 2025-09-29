import { act, render, screen, waitFor } from '@testing-library/react';
import { px } from '../../utils';

import Button from './Button';
import { runCommonTests } from '../../utils/testUtils';
import { ButtonVariants } from './types';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  runCommonTests(Button, 'Button');
  it('is selectable by the test id', () => {
    render(<Button id="test">Submit</Button>);
    expect(screen.queryByTestId(/button-test/)).toBeInTheDocument();
  });
  it('renders with default class names', () => {
    render(<Button>Submit</Button>);
    const buttonElement = screen.getByText('Submit');
    expect(buttonElement).toHaveClass(`${px}-button`);
    expect(buttonElement).toHaveClass(`${px}-button--primary`);
    expect(buttonElement).not.toHaveClass(`${px}-button--icon-last`);
    expect(buttonElement).not.toHaveClass(`${px}-skeleton`);
  });

  it('renders with type and size classnames', () => {
    render(
      <Button variant={ButtonVariants.secondary} isIconLast>
        Cancel
      </Button>,
    );
    const buttonElement = screen.getByText('Cancel');
    expect(buttonElement).toHaveClass(`${px}-button`);
    expect(buttonElement).toHaveClass(`${px}-button--secondary`);
    expect(buttonElement).toHaveClass(`${px}-button--icon-last`);
  });

  it('should render as an anchor tag if href is passed', () => {
    render(<Button href="https://example.com">Link</Button>);
    const anchorElement = screen.getByText('Link');
    expect(anchorElement.tagName).toBe('A');
    expect(anchorElement).toHaveAttribute('href', 'https://example.com');
  });

  it('should render as a button if no href is passed', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText('Click me');
    expect(buttonElement.tagName).toBe('BUTTON');
  });

  it('should add prefetch link when prefetch is "render"', async () => {
    render(
      <Button href="https://example.com" prefetch="render">
        Link
      </Button>,
    );
    const anchorElement = screen.getByText('Link');
    act(() => {
      anchorElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    });
    await waitFor(() => {
      expect(screen.getByTestId('prefetch-link')).toHaveAttribute('rel', 'prefetch');
      expect(screen.getByTestId('prefetch-link')).toHaveAttribute('href', 'https://example.com');
    });
  });

  it('should not add prefetch link when prefetch is "none"', async () => {
    render(
      <Button href="https://example.com" prefetch="none">
        Link
      </Button>,
    );
    const anchorElement = screen.getByText('Link');
    act(() => {
      anchorElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    });
    await waitFor(() => {
      expect(screen.queryByTestId('prefetch-link')).not.toBeInTheDocument();
    });
  });

  it('should add prefetch link on mouse over for intent prefetch', async () => {
    render(
      <Button href="https://example.com" prefetch="intent">
        Link
      </Button>,
    );
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

  it('should prevent default when isDisabled is true', () => {
    render(
      <Button isDisabled href="#">
        Disabled Link
      </Button>,
    );
    const anchorElement = screen.getByText('Disabled Link');
    const preventDefaultSpy = vi.fn();

    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    event.preventDefault = preventDefaultSpy;
    anchorElement.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should not prevent default when isDisabled is false', () => {
    render(<Button href="#">Disabled Link</Button>);
    const anchorElement = screen.getByText('Disabled Link');
    const preventDefaultSpy = vi.fn();

    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    event.preventDefault = preventDefaultSpy;
    anchorElement.dispatchEvent(event);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should not call onClick for disabled button', async () => {
    const onClickMock = vi.fn();
    render(
      <Button onClick={onClickMock} isDisabled>
        Disabled Button
      </Button>,
    );
    const buttonElement = screen.getByText('Disabled Button');
    await userEvent.click(buttonElement);
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it('should call onClick for enabled button', async () => {
    const onClickMock = vi.fn();
    render(<Button onClick={onClickMock}>Enabled Button</Button>);
    const buttonElement = screen.getByText('Enabled Button');
    await userEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('should handle an enabled button with no onClick prop without throwing', () => {
    render(<Button>Enabled Button</Button>);
    const buttonElement = screen.getByText('Enabled Button');
    expect(() => userEvent.click(buttonElement)).not.toThrow();
  });

  it('calls onClick for enabled anchor', async () => {
    const onClickMock = vi.fn();
    render(
      <Button href="#" onClick={onClickMock}>
        Active Link
      </Button>,
    );
    const anchorElement = screen.getByText('Active Link');
    await userEvent.click(anchorElement);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('renders skeleton class when isSkeletonLoading is true', () => {
    render(<Button isSkeletonLoading>Come Meh Way</Button>);
    const buttonElement = screen.getByText('Come Meh Way');
    expect(buttonElement).toHaveClass(`${px}-skeleton`);
  });

  it('does not render skeleton class when isSkeletonLoading is false', () => {
    render(<Button isSkeletonLoading={false}>Come Meh Way</Button>);
    const buttonElementNoSkeleton = screen.getByText('Come Meh Way');
    expect(buttonElementNoSkeleton).not.toHaveClass(`${px}-skeleton`);
  });

  it('sets rel to noopener noreferrer when target is _blank', () => {
    render(
      <Button href="https://example.com" target="_blank">
        External Link
      </Button>,
    );
    const anchorElement = screen.getByText('External Link');
    expect(anchorElement).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
