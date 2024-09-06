import { render, screen } from '@testing-library/react';

import Grid from './Grid';
import { runCommonTests } from '../../utils/testUtils';
import { px, SpacingTokens } from '../../utils';

describe('Grid', () => {
  runCommonTests(Grid, 'Grid');
  it('is selectable by the test id', () => {
    render(<Grid id="grid-test">Submit</Grid>);
    expect(screen.getByTestId('grid-grid-test')).toBeInTheDocument();
  });

  it('it will replace element with one provided as prop', () => {
    render(<Grid element="span">Submit</Grid>);
    expect(screen.getByTestId(/grid/)?.nodeName).toEqual('SPAN');
  });
  it('renders default columnGap class', () => {
    render(<Grid>Submit</Grid>);
    expect(screen.getByTestId(/grid/)).toHaveClass(`${px}-grid--column-gap-md`);
  });
  it('renders correct columnGap class', () => {
    render(<Grid columnGap={SpacingTokens.xxl}>Submit</Grid>);
    expect(screen.getByTestId(/grid/)).toHaveClass(`${px}-grid--column-gap-xxl`);
  });
  it('renders default rowGap class', () => {
    render(<Grid>Submit</Grid>);
    expect(screen.getByTestId(/grid/)).toHaveClass(`${px}-grid--row-gap-lg`);
  });
  it('renders correct rowGap class', () => {
    render(<Grid rowGap={SpacingTokens.xxl}>Submit</Grid>);
    expect(screen.getByTestId(/grid/)).toHaveClass(`${px}-grid--row-gap-xxl`);
  });
});
