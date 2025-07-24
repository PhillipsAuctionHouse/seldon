import { Meta } from '@storybook/react';
import ProgressIndicator, { ProgressIndicatorProps } from './ProgressIndicator';

const meta = {
  title: 'Components/ProgressIndicator',
  component: ProgressIndicator,
} satisfies Meta<typeof ProgressIndicator>;

export default meta;
export const Playground = (props: ProgressIndicatorProps) => <ProgressIndicator {...props} />;

Playground.args = {
  steps: 5,
  current: 3,
};

Playground.argTypes = {
  steps: { control: { type: 'number', min: 1, max: 10 } },
  current: { control: { type: 'number', min: 1, max: 10 } },
};

export const WithLabels = (props: ProgressIndicatorProps) => (
  <ProgressIndicator {...props} labels={['Register to bid', 'Your details', 'Primary address', 'Review and submit']} />
);

WithLabels.args = {
  steps: 4,
  current: 3,
};

WithLabels.argTypes = {
  steps: { control: { type: 'number', min: 1, max: 10 } },
  current: { control: { type: 'number', min: 1, max: 10 } },
};
