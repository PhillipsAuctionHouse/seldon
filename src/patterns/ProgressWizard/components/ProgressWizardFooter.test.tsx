import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Footer, { type ProgressWizardFooterProps } from './ProgressWizardFooter';
import userEvent from '@testing-library/user-event';

const getProgressWizardButton = (label: string) => screen.getByRole('button', { name: `Progress Wizard: ${label}` });

const baseProps: ProgressWizardFooterProps = {
  setCurrentStepIndex: vi.fn(),
  isFirstStep: false,
  toFirstStep: vi.fn(),
  isLastStep: false,
  toLastStep: vi.fn(),
  baseClassName: 'progress-wizard-footer',
  shouldAllowContinue: true,
  isLoading: false,
  onBack: vi.fn(),
  onCancel: vi.fn(),
  onContinue: vi.fn(),
};

describe('ProgressWizardFooter', () => {
  it('renders Back and Continue buttons by default', () => {
    render(<Footer {...baseProps} />);
    expect(getProgressWizardButton('Back')).toBeInTheDocument();
    expect(getProgressWizardButton('Continue')).toBeInTheDocument();
  });

  it('renders Cancel and Start on first step', () => {
    render(<Footer {...baseProps} isFirstStep={true} />);
    expect(getProgressWizardButton('Cancel')).toBeInTheDocument();
    expect(getProgressWizardButton('Start')).toBeInTheDocument();
  });

  it('renders Submit on last step', () => {
    render(<Footer {...baseProps} isLastStep={true} />);
    expect(getProgressWizardButton('Back')).toBeInTheDocument();
    expect(getProgressWizardButton('Submit')).toBeInTheDocument();
  });

  it('disables primary button when shouldAllowContinue is false', () => {
    render(<Footer {...baseProps} shouldAllowContinue={false} />);
    expect(getProgressWizardButton('Continue')).toBeDisabled();
  });

  it('disables primary button when isLoading is true', () => {
    render(<Footer {...baseProps} isLoading={true} />);
    expect(getProgressWizardButton('Continue')).toBeDisabled();
  });

  it('shows Loader when isLoading is true', () => {
    render(<Footer {...baseProps} isLoading={true} />);
    expect(getProgressWizardButton('Continue').querySelector('.seldon-loader')).toBeTruthy();
  });

  it('calls onBack when Back is clicked', async () => {
    render(<Footer {...baseProps} />);
    await userEvent.click(getProgressWizardButton('Back'));
    expect(baseProps.onBack).toHaveBeenCalled();
  });

  it('calls onCancel when Cancel is clicked on first step', async () => {
    const onCancel = vi.fn();
    render(<Footer {...baseProps} isFirstStep={true} onCancel={onCancel} />);
    await userEvent.click(getProgressWizardButton('Cancel'));
    expect(onCancel).toHaveBeenCalled();
  });

  it('applies custom baseClassName', () => {
    render(<Footer {...baseProps} baseClassName="custom-footer" />);
    expect(getProgressWizardButton('Back')).toHaveClass('custom-footer__btn');
    expect(getProgressWizardButton('Continue')).toHaveClass('custom-footer__btn');
  });

  it('renders correct aria-labels for buttons', () => {
    render(<Footer {...baseProps} />);
    expect(getProgressWizardButton('Back')).toHaveAttribute('aria-label', 'Progress Wizard: Back');
    expect(getProgressWizardButton('Continue')).toHaveAttribute('aria-label', 'Progress Wizard: Continue');
  });

  it('renders correct aria-labels for first and last step', () => {
    render(<Footer {...baseProps} isFirstStep={true} isLastStep={false} />);
    expect(getProgressWizardButton('Cancel')).toHaveAttribute('aria-label', 'Progress Wizard: Cancel');
    expect(getProgressWizardButton('Start')).toHaveAttribute('aria-label', 'Progress Wizard: Start');
    render(<Footer {...baseProps} isFirstStep={false} isLastStep={true} />);
    expect(getProgressWizardButton('Submit')).toHaveAttribute('aria-label', 'Progress Wizard: Submit');
  });

  it('renders custom labels', () => {
    const customLabels = {
      start: 'Begin',
      cancel: 'Abort',
      back: 'Previous',
      continue: 'Next',
      submit: 'Finish',
    };
    render(<Footer {...baseProps} labels={customLabels} />);
    expect(getProgressWizardButton('Previous')).toBeInTheDocument();
    expect(getProgressWizardButton('Next')).toBeInTheDocument();
  });
});
