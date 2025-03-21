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

const GridWrapper = ({ title = '', children }: { title?: string; children: React.ReactNode }) => (
  <div style={{ marginTop: '2rem' }}>
    {title ? <h2>{title}</h2> : null}
    <div style={{ textAlign: 'center', padding: '0.5rem', fontWeight: 600 }}>Breakpoint: {getBreakpoint()}</div>
    <Grid style={{ backgroundColor: '#4444AA', padding: '1rem' }}>{children}</Grid>
  </div>
);
type GridChildProps = {
  itemNum: number;
  gridContent?: React.ReactNode;
} & GridItemProps;

const GridChild = ({ itemNum, gridContent, ...props }: GridChildProps) => (
  <GridItem
    key={itemNum}
    style={{
      backgroundColor: '#DDD',
      padding: '1rem',
      fontWeight: 500,
      textAlign: 'center',
    }}
    {...props}
  >
    <div>{gridContent ?? `Item ${itemNum}`}</div>
  </GridItem>
);
export const Playground = ({ children, ...props }: GridItemProps) => (
  <GridWrapper>
    {Array.from({ length: 12 }).map((_, i) => (
      <GridItem key={i} {...props} style={{ backgroundColor: 'gray' }}>
        <GridChild itemNum={i + 1} {...props} />
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
    <GridChild itemNum={1} gridContent={longParagraph} {...props} />
    <GridChild itemNum={2} gridContent={longParagraph} {...props} />
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
    <GridChild itemNum={1} sm={1} md={2} lg={4} align={GridItemAlign.left} />
    <GridChild itemNum={2} sm={1} md={4} lg={6} align={GridItemAlign.right} />
  </GridWrapper>
);

export const GridWithOffsetColumns = () => (
  <>
    <GridWrapper title="1 Child (Offset layout)">
      <GridChild
        xsColStart={2}
        sm={1}
        smColStart={2}
        md={3}
        mdColStart={4}
        lg={6}
        lgColStart={7}
        itemNum={1}
        align={GridItemAlign.left}
      />
    </GridWrapper>
    <GridWrapper title="2 Children (2 column layout)">
      <GridChild xs={1} sm={1} md={2} mdColStart={1} lg={4} lgColStart={2} itemNum={1} align={GridItemAlign.left} />
      <GridChild xs={1} sm={1} md={2} mdColStart={5} lg={4} lgColStart={8} itemNum={2} align={GridItemAlign.right} />
    </GridWrapper>
    <GridWrapper title="6 Children (Funky layout)">
      <GridChild xs={2} sm={2} md={1} lg={1} lgColStart={2} itemNum={1} align={GridItemAlign.left} />
      <GridChild xs={1} sm={1} smColStart={2} md={4} lg={1} lgColStart={4} itemNum={2} align={GridItemAlign.left} />
      <GridChild xs={2} sm={2} md={1} lg={1} lgColStart={6} itemNum={3} align={GridItemAlign.left} />
      <GridChild xs={1} sm={1} smColStart={2} md={1} lg={1} lgColStart={7} itemNum={4} align={GridItemAlign.left} />
      <GridChild xs={2} sm={2} md={4} lg={1} lgColStart={9} itemNum={5} align={GridItemAlign.left} />
      <GridChild xs={1} sm={1} smColStart={2} md={1} lg={1} lgColStart={11} itemNum={6} align={GridItemAlign.left} />
    </GridWrapper>
  </>
);
