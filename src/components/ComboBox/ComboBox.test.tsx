import { render, screen } from '@testing-library/react';

import ComboBox from './ComboBox';

describe('ComboBox', () => {
  it('is selectable by the test id', () => {
    render(<ComboBox id="test">Submit</ComboBox>);
    expect(screen.queryByTestId(/combo-box-test/)).toBeInTheDocument();
  });
});
