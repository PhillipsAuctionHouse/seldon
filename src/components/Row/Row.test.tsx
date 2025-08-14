import { forwardRef } from 'react';
import { render, screen } from '@testing-library/react';
import Row from './Row';
import GridItem from '../GridItem/GridItem';
import Grid from '../Grid/Grid';
import { runCommonTests } from '../../utils/testUtils';

describe('Row', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  // Use a forwardRef wrapper for runCommonTests to ensure ref is tested correctly
  const RefRow = forwardRef<HTMLElement, React.ComponentProps<typeof Row>>((props, ref) => (
    <Row {...props} ref={ref} />
  ));
  RefRow.displayName = 'RefRow';
  runCommonTests(RefRow, 'Row');
  it('renders children correctly', () => {
    render(
      <Row>
        <Grid>
          <GridItem>Child 1</GridItem>
          <GridItem>Child 2</GridItem>
        </Grid>
      </Row>,
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('renders multiple children correctly', () => {
    render(
      <Row>
        <Grid>
          <GridItem>Child 1</GridItem>
          <GridItem>Child 2</GridItem>
          <GridItem>Child 3</GridItem>
        </Grid>
      </Row>,
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getByText('Child 3')).toBeInTheDocument();
  });
});
