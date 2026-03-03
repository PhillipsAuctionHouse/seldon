import { Meta } from '@storybook/react-vite';
import Video, { VideoProps } from './Video';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Video',
  component: Video,
} satisfies Meta<typeof Video>;

export default meta;
export const Playground = (props: VideoProps) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div style={{ width: '800px' }}>
      <Video {...props} />
    </div>
  </div>
);

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  aspectRatio: 16 / 9,
  videoSource: 'https://players.brightcove.net/6415663453001/default_default/index.html?videoId=6355671347112',
};

Playground.argTypes = {};
