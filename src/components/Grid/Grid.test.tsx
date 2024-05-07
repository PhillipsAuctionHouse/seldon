import { render, screen } from '@testing-library/react';

import Grid from './Grid';

describe('Grid', () => {
  it('is selectable by the test id', () => {
    render(<Grid id="grid-test">Submit</Grid>);
    expect(screen.queryByTestId(/grid-container-grid-test/)).toBeInTheDocument();
  });

  it('it will replace element with one provided as prop', () => {
    render(<Grid element="span">Submit</Grid>);
    expect(screen.queryByTestId(/grid-container/)?.nodeName).toEqual('SPAN');
  });
});
