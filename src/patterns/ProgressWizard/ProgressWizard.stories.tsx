import { Meta } from '@storybook/react';
import ProgressWizard, { ProgressWizardProps } from './ProgressWizard';

const meta = {
  title: 'Patterns/ProgressWizard',
  component: ProgressWizard,
} satisfies Meta<typeof ProgressWizard>;

export default meta;
export const Playground = (props: ProgressWizardProps) => <ProgressWizard {...props} />;

const exampleSteps = [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }];

const exampleChildren = [
  <div key="step1">Step 1 Content</div>,
  <div key="step2">Step 2 Content</div>,
  <div key="step3">Step 3 Content</div>,
];

Playground.args = {
  steps: exampleSteps,
  children: exampleChildren,
};

Playground.argTypes = {};
