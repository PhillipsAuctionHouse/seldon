import { Meta } from '@storybook/react';
import Icon, { IconProps } from './Icon';
import * as icons from '../../assets/icons';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    height: { control: 'number' },
    width: { control: 'number' },
    color: { control: 'select', options: ['$pure-black', '$cta-blue', '$error-red'] },
  },
} satisfies Meta<typeof Icon>;

export default meta;

export const IconGrid = (props: IconProps) => (
  <div className="story-icon-flex-wrapper">
    {Object.keys(icons).map((icon) => (
      <div className="icon-set" key={icon}>
        <div className="icon-wrapper">
          <Icon {...props} icon={icon as IconProps['icon']} />
        </div>
        <div className="icon-name">{icon}</div>
      </div>
    ))}
  </div>
);

export const Playground = (props: IconProps) => <Icon {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  icon: 'AccountCircle',
  height: 24,
  width: 24,
  color: '$error-red',
  children: 'Hi There',
};

Playground.argTypes = {
  icon: { control: 'select', options: Object.keys(icons) },
  height: { control: 'number' },
  width: { control: 'number' },
  color: { control: 'select', options: ['$pure-black', '$cta-blue', '$error-red'] },
};
