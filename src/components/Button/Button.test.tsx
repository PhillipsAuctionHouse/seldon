import { render, screen } from '@testing-library/react';

import Button from './Button';
import { runCommonTests } from '../../utils/testUtils';

describe('Button', () => {
  runCommonTests(Button, 'Button');
  it('is selectable by the test id', () => {
    render(<Button id="test">Submit</Button>);
    expect(screen.queryByTestId(/button-test/)).toBeInTheDocument();
  });
  it('renders with default class names', () => {
    render(<Button>Submit</Button>);
    const buttonElement = screen.getByText('Submit');
    expect(buttonElement).toHaveClass('phillips-button');
    expect(buttonElement).toHaveClass('phillips-button--md');
    expect(buttonElement).toHaveClass('phillips-button--primary');
    expect(buttonElement).not.toHaveClass('phillips-button--icon-last');
  });

  it('renders with type and size classnames', () => {
    render(
      <Button buttonType="secondary" size="lg" iconLast>
        Cancel
      </Button>,
    );
    const buttonElement = screen.getByText('Cancel');
    expect(buttonElement).toHaveClass('phillips-button');
    expect(buttonElement).toHaveClass('phillips-button--lg');
    expect(buttonElement).toHaveClass('phillips-button--secondary');
    expect(buttonElement).toHaveClass('phillips-button--icon-last');
  });
});
