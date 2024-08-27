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
    expect(buttonElement).toHaveClass(`${px}-button--md`);
    expect(buttonElement).toHaveClass(`${px}-button--primary`);
    expect(buttonElement).not.toHaveClass(`${px}-button--icon-last`);
  });

  it('renders with type and size classnames', () => {
    render(
      <Button variant={ButtonVariants.secondary} size="lg" isIconLast>
        Cancel
      </Button>,
    );
    const buttonElement = screen.getByText('Cancel');
    expect(buttonElement).toHaveClass(`${px}-button`);
    expect(buttonElement).toHaveClass(`${px}-button--lg`);
    expect(buttonElement).toHaveClass(`${px}-button--secondary`);
    expect(buttonElement).toHaveClass(`${px}-button--icon-last`);
  });
});
