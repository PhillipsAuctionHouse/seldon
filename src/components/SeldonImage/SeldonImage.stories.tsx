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
  src: 'https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  aspectRatio: '1/1',
};

Playground.argTypes = {};

export const CircleImage = (props: SeldonImageProps) => <SeldonImage {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
CircleImage.args = {
  src: 'https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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
  src: 'https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  aspectRatio: '1/1',
  objectFit: 'contain',
  hasBlurBackground: true,
};

BlurBackground.argTypes = {};
