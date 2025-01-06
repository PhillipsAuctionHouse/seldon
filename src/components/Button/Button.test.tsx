import { render, screen } from '@testing-library/react';
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
});
