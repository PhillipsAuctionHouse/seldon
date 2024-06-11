import { render, screen } from '@testing-library/react';

import IconButton from './IconButton';

describe('IconButton', () => {
  it('is selectable by the test id', () => {
    render(
      <IconButton>
        <svg data-testid="icon-test" />
      </IconButton>,
    );
    expect(screen.queryByTestId(/icon-test/)).toBeInTheDocument();
  });
});
