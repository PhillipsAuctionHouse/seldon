import ProgressIndicator from './ProgressIndicator';
import { render, screen } from '@testing-library/react';

describe('ProgressIndicator', () => {
  it('renders the correct number of steps', () => {
    render(<ProgressIndicator totalSteps={5} currentStep={1} />);
    const renderedSteps = screen.getAllByTestId(/^progress-step-\d+$/);
    expect(renderedSteps).toHaveLength(5);
  });

  it('marks the current step correctly', () => {
    render(<ProgressIndicator totalSteps={5} currentStep={3} />);
    const currentStep = screen.getByTestId('progress-step-3');
    expect(currentStep).toHaveAttribute('aria-current', 'step');
  });

  it('renders the correct aria-label for progress root', () => {
    render(<ProgressIndicator totalSteps={5} currentStep={2} progressIndicatorAriaLabel="Progress Indicator" />);
    const progressRoot = screen.getByLabelText('Progress Indicator');
    expect(progressRoot).toBeInTheDocument();
  });

  it('renders the correct icons for completed steps', () => {
    render(<ProgressIndicator totalSteps={5} currentStep={3} />);
    const completedIcons = screen.getAllByLabelText('Completed Icon');
    expect(completedIcons).toHaveLength(2); // Steps 1 and 2 are completed
  });

  it('renders the correct text for current step', () => {
    render(<ProgressIndicator totalSteps={5} currentStep={3} />);
    const currentStepText = screen.getByText('3');
    expect(currentStepText).toBeInTheDocument();
  });

  it('handles zero steps gracefully', () => {
    render(<ProgressIndicator totalSteps={0} currentStep={0} />);
    const renderedSteps = screen.queryAllByTestId(/^progress-step-\d+$/);
    expect(renderedSteps).toHaveLength(0);
  });

  it('handles current step greater than steps gracefully', () => {
    render(<ProgressIndicator totalSteps={3} currentStep={5} />);
    const renderedSteps = screen.getAllByTestId(/^progress-step-\d+$/);
    expect(renderedSteps).toHaveLength(3);
    const lastStep = screen.getByTestId('progress-step-3');
    expect(lastStep).toBeInTheDocument();
  });

  it('handles negative current step gracefully', () => {
    render(<ProgressIndicator totalSteps={3} currentStep={-1} />);
    const renderedSteps = screen.getAllByTestId(/^progress-step-\d+$/);
    expect(renderedSteps).toHaveLength(3);
    const firstStep = screen.getByTestId('progress-step-1');
    expect(firstStep).toBeInTheDocument();
  });

  it('applies the proper labels passed in', () => {
    const labels = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];
    render(<ProgressIndicator totalSteps={5} currentStep={3} stepLabels={labels} />);
    labels.forEach((label, index) => {
      const stepLabel = screen.getByText(label);
      expect(stepLabel).toBeInTheDocument();
      const step = screen.getByTestId(`progress-step-${index + 1}`);
      expect(step).toContainElement(stepLabel);
    });
  });
});
