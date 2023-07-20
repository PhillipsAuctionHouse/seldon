import { render, screen } from '@testing-library/react';

import Button from "./Button";

describe('Button', () => {
  it('is selectable by the test id', () => {
    render(<Button label="Submit" id="test"/>)
    expect(screen.queryByTestId(/button-test/)).toBeInTheDocument();
  });
});