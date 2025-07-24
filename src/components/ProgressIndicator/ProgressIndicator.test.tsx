import ProgressIndicator from './ProgressIndicator';
import { runCommonTests } from '../../utils/testUtils';
import { render, screen } from '@testing-library/react';

describe('ProgressIndicator', () => {
  runCommonTests(ProgressIndicator, 'ProgressIndicator');

  it('renders the correct number of steps', () => {
    render(<ProgressIndicator steps={5} current={1} />);
    const steps = screen.getAllByTestId('progress-step');
    expect(steps).toHaveLength(5);
  });

  it('marks the current step correctly', () => {
    render(<ProgressIndicator steps={5} current={3} />);
    const currentStep = screen.getByLabelText('Step 3 current');
    expect(currentStep).toHaveAttribute('aria-current', 'step');
  });

  it('marks completed steps correctly', () => {
    render(<ProgressIndicator steps={5} current={3} />);
    const completedStep = screen.getByLabelText('Step 2 completed');
    expect(completedStep).toBeInTheDocument();
  });

  it('marks not started steps correctly', () => {
    render(<ProgressIndicator steps={5} current={3} />);
    const notStartedStep = screen.getByLabelText('Step 4 not started');
    expect(notStartedStep).toBeInTheDocument();
  });

  it('renders the correct aria-label for progress', () => {
    render(<ProgressIndicator steps={5} current={2} />);
    const progressRoot = screen.getByLabelText('Progress');
    expect(progressRoot).toBeInTheDocument();
  });

  it('renders the correct icons for completed steps', () => {
    render(<ProgressIndicator steps={5} current={3} />);
    const completedIcons = screen.getAllByLabelText('Completed Icon');
    expect(completedIcons).toHaveLength(2); // Assuming steps 1 and 2 are completed
  });

  it('renders the correct text for current step', () => {
    render(<ProgressIndicator steps={5} current={3} />);
    const currentStepText = screen.getByText('3');
    expect(currentStepText).toBeInTheDocument();
  });

  it('handles zero steps gracefully', () => {
    render(<ProgressIndicator steps={0} current={0} />);
    const steps = screen.queryAllByTestId('progress-step');
    expect(steps).toHaveLength(0);
  });

  it('handles current step greater than steps gracefully', () => {
    render(<ProgressIndicator steps={3} current={5} />);
    const steps = screen.getAllByTestId('progress-step');
    expect(steps).toHaveLength(3);
    const lastStep = screen.getByLabelText('Step 3 completed');
    expect(lastStep).toBeInTheDocument();
  });

  it('handles negative current step gracefully', () => {
    render(<ProgressIndicator steps={3} current={-1} />);
    const steps = screen.getAllByTestId('progress-step');
    expect(steps).toHaveLength(3);
    const firstStep = screen.getByLabelText('Step 1 not started');
    expect(firstStep).toBeInTheDocument();
  });
});
