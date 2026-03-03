import { Meta } from '@storybook/react-vite';
import Icon, { IconName, IconProps } from './Icon';
import * as iconComponents from '../../assets/formatted';
import { getScssColors } from '../../utils/scssUtils';

const colorOptions = getScssColors();

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    height: { control: 'text' },
    width: { control: 'text' },
    color: { control: 'select', options: colorOptions },
    title: { control: 'text' },
  },
  args: {
    height: 24,
    width: 24,
    color: '$primary-black',
  },
} satisfies Meta<typeof Icon>;

export default meta;

export const Playground = (props: IconProps) => (
  <div className="story-icon-flex-wrapper">
    <div className="icon-set">
      <div className="icon-wrapper">
        <Icon {...props} />
      </div>
      <div className="icon-name">{props.icon}</div>
    </div>
  </div>
);

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  icon: Object.keys(iconComponents)[0] as IconName,
  height: 24,
  width: 24,
  color: '$black-100',
};

Playground.argTypes = {
  icon: { control: 'select', options: Object.keys(iconComponents) as IconName[] },
  height: { control: 'text' },
  width: { control: 'text' },
  color: { control: 'select', options: colorOptions },
};

export const IconGrid = (props: IconProps) => (
  <div className="story-icon-flex-wrapper">
    {Object.keys(iconComponents).map((icon) => (
      <div className="icon-set" key={icon}>
        <div className="icon-wrapper">
          <Icon {...props} icon={icon as IconProps['icon']} />
        </div>
        <div className="icon-name">{icon}</div>
      </div>
    ))}
  </div>
);
