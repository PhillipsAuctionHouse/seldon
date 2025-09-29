import React from 'react';
import { render, screen } from '@testing-library/react';
import GridItem from './GridItem';
import { GridItemAlign } from './types';
import { runCommonTests } from '../../utils/testUtils';
import { px } from '../../utils';

describe('GridItem', () => {
  // Use a forwardRef wrapper for runCommonTests to ensure ref is tested correctly
  const RefGridItem = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof GridItem>>((props, ref) => (
    <GridItem {...props} ref={ref} />
  ));
  RefGridItem.displayName = 'RefGridItem';
  runCommonTests(RefGridItem, 'GridItem');

  it('renders children correctly', () => {
    render(<GridItem>Child</GridItem>);
    expect(screen.getByText('Child')).toBeInTheDocument();
    const GridItemElement = screen.getByTestId('grid-item');
    expect(GridItemElement).toHaveClass(`${px}-grid-item`);
  });
  it('validates column span values', () => {
    render(<GridItem xs={0} />);
    expect(screen.queryByTestId('grid-item')).not.toBeInTheDocument();

    render(<GridItem lg={13} />);
    expect(screen.queryByTestId('grid-item')).not.toBeInTheDocument();
  });

  describe('breakpoint classes', () => {
    it('applies breakpoint column classes correctly', () => {
      render(<GridItem />);
      const GridItemElement = screen.getByTestId('grid-item');
      expect(GridItemElement).toHaveClass(`${px}-grid-item--span-xs-2`);
      expect(GridItemElement).toHaveClass(`${px}-grid-item--span-sm-2`);
      expect(GridItemElement).toHaveClass(`${px}-grid-item--span-md-6`);
      expect(GridItemElement).toHaveClass(`${px}-grid-item--span-lg-12`);
    });

    it('applies custom col spans correctly', () => {
      render(<GridItem xs={3} sm={6} md={8} lg={10} />);

      const GridItemElement = screen.getByTestId('grid-item');
      expect(GridItemElement).toHaveClass(`${px}-grid-item--span-xs-3`);
      expect(GridItemElement).toHaveClass(`${px}-grid-item--span-sm-6`);
      expect(GridItemElement).toHaveClass(`${px}-grid-item--span-md-8`);
      expect(GridItemElement).toHaveClass(`${px}-grid-item--span-lg-10`);
    });
  });
  describe('alignment classes', () => {
    it('default position classes', () => {
      render(<GridItem />);

      const GridItemElement = screen.getByTestId('grid-item');
      expect(GridItemElement).toHaveClass(`${px}-grid-item--span-xs-2-align-center`);
      expect(GridItemElement).toHaveClass(`${px}-grid-item--span-sm-2-align-center`);
      expect(GridItemElement).toHaveClass(`${px}-grid-item--span-md-6-align-center`);
      expect(GridItemElement).toHaveClass(`${px}-grid-item--span-lg-12-align-center`);
    });
    it('default position classes', () => {
      render(<GridItem align={GridItemAlign.left} />);

      const GridItemElement = screen.getByTestId('grid-item');
      expect(GridItemElement).toHaveClass(`${px}-grid-item--span-xs-2-align-left`);
      expect(GridItemElement).toHaveClass(`${px}-grid-item--span-sm-2-align-left`);
      expect(GridItemElement).toHaveClass(`${px}-grid-item--span-md-6-align-left`);
      expect(GridItemElement).toHaveClass(`${px}-grid-item--span-lg-12-align-left`);
    });
  });
});
