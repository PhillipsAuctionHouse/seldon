import { Meta } from '@storybook/react';
import SeldonImage, { SeldonImageProps } from './SeldonImage';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/SeldonImage',
  component: SeldonImage,
} satisfies Meta<typeof SeldonImage>;

export default meta;
export const Playground = (props: SeldonImageProps) => <SeldonImage {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  src: 'https://whitneymedia.org/assets/artwork/5864/70_1672_cropped.jpeg',
  aspectRatio: '1/1',
};

Playground.argTypes = {};

export const CircleImage = (props: SeldonImageProps) => <SeldonImage {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
CircleImage.args = {
  src: 'https://whitneymedia.org/assets/artwork/21471/70_1558_85_cropped.jpeg',
  aspectRatio: '1/1',
  objectFit: 'cover',
  imageStyle: {
    borderRadius: '50%',
  },
};

CircleImage.argTypes = {};

export const BlurBackground = (props: SeldonImageProps) => <SeldonImage {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
BlurBackground.args = {
  src: 'https://whitneymedia.org/assets/artwork/5892/70_1419_cropped.jpeg',
  aspectRatio: '1/1',
  objectFit: 'contain',
  hasBlurBackground: true,
};

BlurBackground.argTypes = {};
