import { Meta } from '@storybook/react';
import Video, { VideoProps } from './Video';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Video',
  component: Video,
} satisfies Meta<typeof Video>;

export default meta;
export const Playground = (props: VideoProps) => <Video {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  aspectRatio: 16 / 9,
  height: 400,
  videoSource: 'https://players.brightcove.net/6415663453001/default_default/index.html?videoId=6355671347112',
};

Playground.argTypes = {};
