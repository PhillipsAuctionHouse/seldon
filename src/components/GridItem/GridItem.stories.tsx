import { Meta } from '@storybook/react';
import GridItem, { type GridItemProps } from './GridItem';
import Grid from '../Grid/Grid';
import { GridItemAlign } from './types';
import { useEffect, useState } from 'react';

const meta = {
  title: 'Components/Layouts/GridItem',
  component: GridItem,
} satisfies Meta<typeof GridItem>;

export default meta;

const longParagraph = (
  <p>
    Harry Phillips founded the auction house in 1796 in Westminster, London. Phillips gained international recognition
    by selling paintings from the estate of Queen Marie Antoinette and household items from Napoleon Bonaparte, and it
    remains the only auction house to have ever held a sale inside Buckingham Palace. Harry Phillips was an innovator
    who combined business acumen with showmanship, introducing elaborate evening receptions before auctions – a standard
    practice in the auction business today.
  </p>
);

const getBreakpoint = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (viewportWidth <= 360) {
    return 'xs';
  }
  if (viewportWidth <= 960) {
    return 'sm';
  }
  if (viewportWidth <= 1400) {
    return 'md';
  }
  if (viewportWidth <= 1800) {
    return 'lg';
  }
  return 'xl';
};

const GridWrapper = ({ children }: { children: React.ReactNode }) => (
  <>
    <div style={{ textAlign: 'center', padding: '0.5rem', fontWeight: 600 }}>Breakpoint: {getBreakpoint()}</div>
    <Grid style={{ backgroundColor: '#4444AA', padding: '1rem' }}>{children}</Grid>
  </>
);

const getGridChild = (props: GridItemProps, i: number, gridContent?: React.ReactNode) => (
  <GridItem
    key={i}
    style={{
      backgroundColor: '#DDD',
      padding: '1rem',
      fontWeight: 500,
      textAlign: 'center',
    }}
    {...props}
  >
    <div>{gridContent ?? `Grid Item ${i + 1}`}</div>
  </GridItem>
);
export const Playground = ({ children, ...props }: GridItemProps) => (
  <GridWrapper>
    {Array.from({ length: 12 }).map((_, i) => (
      <GridItem key={i} {...props} style={{ backgroundColor: 'gray' }}>
        {getGridChild(props, i)}
      </GridItem>
    ))}
  </GridWrapper>
);

Playground.args = {
  xs: 2,
  sm: 1,
  md: 2,
  lg: 2,
  align: GridItemAlign.left,
};

Playground.argTypes = {
  align: {
    options: GridItemAlign,
    control: {
      type: 'select',
    },
  },
};

export const CenteredGridItem = (props: GridItemProps) => (
  <GridWrapper>
    {getGridChild(props, 0, longParagraph)}
    {getGridChild(props, 1, longParagraph)}
  </GridWrapper>
);

CenteredGridItem.args = {
  sm: 2,
  md: 3,
  lg: 6,
};

CenteredGridItem.argTypes = {
  align: {
    options: GridItemAlign,
    control: {
      type: 'select',
      options: [GridItemAlign.center],
    },
  },
};

export const LeftAndRightGridItems = () => (
  <GridWrapper>
    {getGridChild({ xs: 1, sm: 1, md: 2, lg: 4, align: GridItemAlign.left }, 0)}
    {getGridChild({ xs: 1, sm: 1, md: 4, lg: 6, align: GridItemAlign.right }, 1)}
  </GridWrapper>
);
