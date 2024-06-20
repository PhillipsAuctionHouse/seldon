import { render, screen } from '@testing-library/react';

import Grid from './Grid';
import { runCommonTests } from '../../utils/testUtils';

describe('Grid', () => {
  runCommonTests(Grid, 'Grid');
  it('is selectable by the test id', () => {
    render(<Grid id="grid-test">Submit</Grid>);
    expect(screen.queryByTestId('grid-grid-test')).toBeInTheDocument();
  });

  it('it will replace element with one provided as prop', () => {
    render(<Grid element="span">Submit</Grid>);
    expect(screen.queryByTestId(/grid/)?.nodeName).toEqual('SPAN');
  });
});
