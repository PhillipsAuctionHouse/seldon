import { act, render, screen, waitFor } from '@testing-library/react';
import { px } from '../../utils';

import Button from './Button';
import { runCommonTests } from '../../utils/testUtils';
import { ButtonVariants } from './types';

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
      expect(screen.getByTestId('modulepreload-link')).toHaveAttribute('rel', 'modulepreload');
      expect(screen.getByTestId('modulepreload-link')).toHaveAttribute('href', 'https://example.com');
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
      expect(screen.queryByTestId('modulepreload-link')).not.toBeInTheDocument();
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
      expect(screen.queryByTestId('modulepreload-link')).not.toBeInTheDocument();
    });
    act(() => {
      anchorElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    });
    await waitFor(() => {
      expect(screen.getByTestId('prefetch-link')).toBeInTheDocument();
      expect(screen.getByTestId('modulepreload-link')).toBeInTheDocument();
    });
  });
});
