import { Meta, Decorator } from '@storybook/react-vite';
import SeldonImage from './SeldonImage';
import { AspectRatio } from './types';

const framedDecorator: Decorator = (Story) => <div style={{ maxWidth: '320px' }}>{Story()}</div>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/SeldonImage',
  component: SeldonImage,
  argTypes: {
    aspectRatio: { control: 'select', options: Object.values(AspectRatio) },
  },
} satisfies Meta<typeof SeldonImage>;

export default meta;
export const Playground = (props: React.ComponentProps<typeof SeldonImage>) => <SeldonImage {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  src: 'https://whitneymedia.org/assets/artwork/5864/70_1672_cropped.jpeg',
  alt: 'Seldon image placeholder',
  aspectRatio: AspectRatio.Square,
};

Playground.decorators = [framedDecorator];

export const AspectRatioLandscape = (props: React.ComponentProps<typeof SeldonImage>) => <SeldonImage {...props} />;

AspectRatioLandscape.args = {
  src: 'https://whitneymedia.org/assets/artwork/5892/70_1419_cropped.jpeg',
  alt: 'Landscape 16/9 Seldon image placeholder',
  aspectRatio: AspectRatio.Landscape,
  objectFit: 'cover',
};

AspectRatioLandscape.decorators = [framedDecorator];

export const AspectRatioPortrait = (props: React.ComponentProps<typeof SeldonImage>) => <SeldonImage {...props} />;

AspectRatioPortrait.args = {
  src: 'https://whitneymedia.org/assets/artwork/5864/70_1672_cropped.jpeg',
  alt: 'Portrait 3/4 Seldon image placeholder',
  aspectRatio: AspectRatio.Portrait,
  objectFit: 'cover',
};

AspectRatioPortrait.decorators = [framedDecorator];

export const AspectRatioSquare = (props: React.ComponentProps<typeof SeldonImage>) => <SeldonImage {...props} />;

AspectRatioSquare.args = {
  src: 'https://whitneymedia.org/assets/artwork/21471/70_1558_85_cropped.jpeg',
  alt: 'Square 1/1 Seldon image placeholder',
  aspectRatio: AspectRatio.Square,
  objectFit: 'cover',
};

AspectRatioSquare.decorators = [framedDecorator];

export const AspectRatioNone = (props: React.ComponentProps<typeof SeldonImage>) => <SeldonImage {...props} />;

AspectRatioNone.args = {
  src: 'https://whitneymedia.org/assets/artwork/5864/70_1672_cropped.jpeg',
  alt: 'Native dimensions Seldon image placeholder',
  aspectRatio: AspectRatio.None,
};

AspectRatioNone.decorators = [framedDecorator];

export const CircleImage = (props: React.ComponentProps<typeof SeldonImage>) => <SeldonImage {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
CircleImage.args = {
  src: 'https://whitneymedia.org/assets/artwork/21471/70_1558_85_cropped.jpeg',
  alt: 'Circular Seldon image placeholder',
  aspectRatio: AspectRatio.Square,
  objectFit: 'cover',
  imageStyle: {
    borderRadius: '50%',
  },
};

CircleImage.argTypes = {};

export const BlurBackground = (props: React.ComponentProps<typeof SeldonImage>) => <SeldonImage {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
BlurBackground.args = {
  src: 'https://whitneymedia.org/assets/artwork/5892/70_1419_cropped.jpeg',
  alt: 'Blur background Seldon image placeholder',
  aspectRatio: AspectRatio.Square,
  objectFit: 'contain',
  hasBlurBackground: true,
};

BlurBackground.argTypes = {};

export const BrokenImage = (props: React.ComponentProps<typeof SeldonImage>) => <SeldonImage {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
BrokenImage.args = {
  src: 'broken',
  alt: 'Broken image placeholder',
  aspectRatio: AspectRatio.Square,
  objectFit: 'contain',
};

BrokenImage.argTypes = {};

export const ImageBlocked = (props: React.ComponentProps<typeof SeldonImage>) => <SeldonImage {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
ImageBlocked.args = {
  src: 'https://whitneymedia.org/assets/artwork/5864/70_1672_cropped.jpeg',
  alt: 'Blocked image placeholder',
  aspectRatio: AspectRatio.Square,
  objectFit: 'contain',
  imageBlocked: true,
};

ImageBlocked.argTypes = {};
