import type { Meta } from '@storybook/react-vite';
import { ProgressBar, type ProgressBarProps } from './index';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
} satisfies Meta<typeof ProgressBar>;

export default meta;

export const Playground = (props: ProgressBarProps) => <ProgressBar {...props} />;

Playground.args = {
  currentLot: 1,
  totalLots: 80,
};
