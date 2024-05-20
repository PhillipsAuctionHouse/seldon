import { Meta } from '@storybook/react';
import GridItem from '../GridItem/GridItem';
import Row, { type RowProps } from './Row';
import Grid from '../Grid/Grid';
import { GridItemAlign } from '../GridItem/types';

const meta = {
  title: 'Components/Layouts/Row',
  component: Row,
  tags: ['autodocs'],
} satisfies Meta<typeof Row>;

export default meta;
export const Playground = ({ children, ...props }: RowProps) => (
  <Row {...props}>
    <Grid>{children}</Grid>
  </Row>
);

Playground.args = {
  children: Array.from({ length: 12 }, (_, index) => (
    <GridItem key={index} style={{ backgroundColor: 'gray' }} align={GridItemAlign.left} xs={1} sm={1} md={1} lg={1}>
      Column {index + 1}
    </GridItem>
  )),
};
