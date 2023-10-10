import { render, screen } from '@testing-library/react';

import Button from "./Button";

describe('Button', () => {
  it('is selectable by the test id', () => {
    render(<Button id="test">Submit</Button>)
    expect(screen.queryByTestId(/button-test/)).toBeInTheDocument();
  });
});