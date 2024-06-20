import { render, screen } from '@testing-library/react';

import IconButton from './IconButton';
import { runCommonTests } from '../../utils/testUtils';

describe('IconButton', () => {
  runCommonTests(IconButton, 'IconButton');

  it('is selectable by the test id', () => {
    render(
      <IconButton>
        <svg data-testid="icon-test" />
      </IconButton>,
    );
    expect(screen.queryByTestId(/icon-test/)).toBeInTheDocument();
  });
});
