import { Meta } from '@storybook/react';
import GridItem, { type GridItemProps } from './GridItem';
import Grid from '../Grid/Grid';
import { GridItemAlign } from './types';

const meta = {
  title: 'Components/Layouts/GridItem',
  component: GridItem,
} satisfies Meta<typeof GridItem>;

export default meta;
export const Playground = ({ children, ...props }: GridItemProps) => (
  <Grid>
    <GridItem {...props} style={{ backgroundColor: 'gray' }}>
      {children}
    </GridItem>
  </Grid>
);

Playground.args = {
  children: <div>Grid Item</div>,
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
  <Grid>
    <GridItem style={{ backgroundColor: 'gray' }} {...props} align={GridItemAlign.center}>
      <p>
        Harry Phillips founded the auction house in 1796 in Westminster, London. Phillips gained international
        recognition by selling paintings from the estate of Queen Marie Antoinette and household items from Napoleon
        Bonaparte, and it remains the only auction house to have ever held a sale inside Buckingham Palace. Harry
        Phillips was an innovator who combined business acumen with showmanship, introducing elaborate evening
        receptions before auctions – a standard practice in the auction business today.
      </p>
    </GridItem>
    <GridItem style={{ backgroundColor: 'gray' }} {...props} align={GridItemAlign.center}>
      <p>
        Harry Phillips founded the auction house in 1796 in Westminster, London. Phillips gained international
        recognition by selling paintings from the estate of Queen Marie Antoinette and household items from Napoleon
        Bonaparte, and it remains the only auction house to have ever held a sale inside Buckingham Palace. Harry
        Phillips was an innovator who combined business acumen with showmanship, introducing elaborate evening
        receptions before auctions – a standard practice in the auction business today.
      </p>
    </GridItem>
  </Grid>
);

CenteredGridItem.args = {
  sm: 2,
  md: 8,
  lg: 8,
};

export const LeftAndRightGridItems = () => (
  <Grid>
    <GridItem style={{ backgroundColor: 'gray' }} xs={1} sm={1} md={4} lg={4} align={GridItemAlign.left}>
      <p>Left align</p>
    </GridItem>
    <GridItem style={{ backgroundColor: 'gray' }} xs={1} sm={2} md={6} lg={6} align={GridItemAlign.right}>
      <p>Right align</p>
    </GridItem>
  </Grid>
);
