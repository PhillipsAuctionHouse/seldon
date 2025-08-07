import { Meta } from '@storybook/react';
import NotificationBanner, { NotificationBannerProps } from './NotificationBanner';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/NotificationBanner',
  component: NotificationBanner,
} satisfies Meta<typeof NotificationBanner>;

export default meta;
export const Playground = (props: NotificationBannerProps) => <NotificationBanner {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  children: (
    <div style={{ fontWeight: '600', color: 'black', fontSize: '16px' }}>
      <a href="#" style={{ textDecoration: 'underline', cursor: 'pointer' }}>
        Our Moved by Beauty: Works by Lucie Rie from an Important Asian Collection Sale
      </a>{' '}
      is currently experiencing technical difficulties and there is a delay with livestream sale room bidding. You can
      bid, but there may be a delay with confirmations.
    </div>
  ),
};

Playground.argTypes = {};
