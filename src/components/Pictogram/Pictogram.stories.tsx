import { Meta } from '@storybook/react-vite';
import Pictogram, { PictogramProps } from './Pictogram';
import * as pictogramComponents from '../../assets/pictograms/formatted';
import { getScssColors } from '../../utils/scssUtils';

const colorOptions = getScssColors();

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Pictogram',
  component: Pictogram,
} satisfies Meta<typeof Pictogram>;

export default meta;
export const Playground = (props: PictogramProps) => <Pictogram {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  pictogram: 'Photos',
  size: '64',
  color: '$black-100',
};

Playground.argTypes = {
  pictogram: Object.keys(pictogramComponents),
  color: { control: 'select', options: colorOptions },
};
