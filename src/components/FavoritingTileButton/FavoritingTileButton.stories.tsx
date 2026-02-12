import { Meta } from '@storybook/react-vite';
import FavoritingTileButton, { FavoritingTileButtonProps } from './FavoritingTileButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/FavoritingTileButton',
  component: FavoritingTileButton,
} satisfies Meta<typeof FavoritingTileButton>;

export default meta;
export const Playground = (props: FavoritingTileButtonProps) => (
  <div style={{ maxWidth: '480px' }}>
    <FavoritingTileButton {...props} />
  </div>
);

export const BothStates = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '480px' }}>
    <FavoritingTileButton listTitle="My Favorites" numberOfObjects="15" isLotInList={false} />
    <FavoritingTileButton listTitle="Things I Really Want To Buy" numberOfObjects="123" isLotInList={true} />
  </div>
);

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  listTitle: 'My Favorites',
  numberOfObjects: '5',
  isLotInList: false,
};

Playground.argTypes = {};
