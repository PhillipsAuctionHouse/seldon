import { render, screen } from '@testing-library/react';
import Row from './Row';
import GridItem from '../GridItem/GridItem';
import Grid from '../Grid/Grid';

describe('Row', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
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
