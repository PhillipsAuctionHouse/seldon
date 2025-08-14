import { Meta } from '@storybook/react';
import ProgressIndicator, { ProgressIndicatorProps } from './ProgressIndicator';

const meta = {
  title: 'Components/ProgressIndicator',
  component: ProgressIndicator,
} satisfies Meta<typeof ProgressIndicator>;

export default meta;
export const Playground = (props: ProgressIndicatorProps) => <ProgressIndicator {...props} />;

Playground.args = {
  totalSteps: 5,
  currentStep: 3,
};

Playground.argTypes = {
  totalSteps: { control: { type: 'number', min: 1, max: 10 } },
  currentStep: { control: { type: 'number', min: 1, max: 10 } },
};

export const WithLabels = (props: ProgressIndicatorProps) => (
  <ProgressIndicator {...props} labels={['Register to bid', 'Your details', 'Primary address', 'Review and submit']} />
);

WithLabels.args = {
  totalSteps: 4,
  currentStep: 3,
};

WithLabels.argTypes = {
  totalSteps: { control: { type: 'number', min: 1, max: 10 } },
  currentStep: { control: { type: 'number', min: 1, max: 10 } },
};
