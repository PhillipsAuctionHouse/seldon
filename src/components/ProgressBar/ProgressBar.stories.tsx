import type { Meta } from '@storybook/react-vite';
import { Text, TextVariants } from '../Text';
import { ProgressBar, type ProgressBarProps } from './index';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  argTypes: {
    current: {
      control: { type: 'number' },
    },
    total: {
      control: { type: 'number' },
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;

export const Playground = (props: ProgressBarProps) => <ProgressBar {...props} />;

Playground.args = {
  current: 1,
  total: 120,
};

export const WithTooltip = (props: ProgressBarProps) => (
  <ProgressBar
    {...props}
    tooltipContent={
      <Text element="span" variant={TextVariants.headingExtraSmall}>
        {`Step ${props.current} of ${props.total}`}
      </Text>
    }
  />
);

WithTooltip.args = {
  current: 40,
  total: 80,
};
