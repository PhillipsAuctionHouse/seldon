import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Footer, { ProgressWizardFooterProps } from './ProgressWizardFooter';
import userEvent from '@testing-library/user-event';

const defaultLabels = {
  startLabel: 'Start',
  cancelLabel: 'Cancel',
  backLabel: 'Back',
  continueLabel: 'Continue',
  submitLabel: 'Submit',
};

const getBtn = (label: string) => screen.getByRole('button', { name: `Wizard: ${label}` });

const baseProps: ProgressWizardFooterProps = {
  isFirstStep: false,
  isLastStep: false,
  baseClassName: 'progress-wizard-footer',
  labels: defaultLabels,
  isCanContinue: true,
  isLoading: false,
  handleBack: vi.fn(),
  handleCancel: vi.fn(),
  handleContinue: vi.fn(),
};

describe('ProgressWizardFooter', () => {
  it('renders Back and Continue buttons by default', () => {
    render(<Footer {...baseProps} />);
    expect(getBtn('Back')).toBeInTheDocument();
    expect(getBtn('Continue')).toBeInTheDocument();
  });

  it('renders Cancel and Start on first step', () => {
    render(<Footer {...baseProps} isFirstStep={true} />);
    expect(getBtn('Cancel')).toBeInTheDocument();
    expect(getBtn('Start')).toBeInTheDocument();
  });

  it('renders Submit on last step', () => {
    render(<Footer {...baseProps} isLastStep={true} />);
    expect(getBtn('Back')).toBeInTheDocument();
    expect(getBtn('Submit')).toBeInTheDocument();
  });

  it('disables primary button when isCanContinue is false', () => {
    render(<Footer {...baseProps} isCanContinue={false} />);
    expect(getBtn('Continue')).toBeDisabled();
  });

  it('disables primary button when isLoading is true', () => {
    render(<Footer {...baseProps} isLoading={true} />);
    expect(getBtn('Continue')).toBeDisabled();
  });

  it('shows Loader when isLoading is true', () => {
    render(<Footer {...baseProps} isLoading={true} />);
    expect(screen.getByRole('button', { name: 'Wizard: Continue' }).querySelector('.seldon-loader')).toBeTruthy();
  });

  it('calls handleBack when Back is clicked', async () => {
    render(<Footer {...baseProps} />);
    await userEvent.click(getBtn('Back'));
    expect(baseProps.handleBack).toHaveBeenCalled();
  });

  it('calls handleCancel when Cancel is clicked on first step', async () => {
    const handleCancel = vi.fn();
    render(<Footer {...baseProps} isFirstStep={true} handleCancel={handleCancel} />);
    await userEvent.click(getBtn('Cancel'));
    expect(handleCancel).toHaveBeenCalled();
  });

  it('applies custom baseClassName', () => {
    render(<Footer {...baseProps} baseClassName="custom-footer" />);
    expect(getBtn('Back')).toHaveClass('custom-footer__btn');
    expect(getBtn('Continue')).toHaveClass('custom-footer__btn');
  });

  it('renders correct aria-labels for buttons', () => {
    render(<Footer {...baseProps} />);
    expect(getBtn('Back')).toHaveAttribute('aria-label', 'Wizard: Back');
    expect(getBtn('Continue')).toHaveAttribute('aria-label', 'Wizard: Continue');
  });

  it('renders correct aria-labels for first and last step', () => {
    render(<Footer {...baseProps} isFirstStep={true} isLastStep={false} />);
    expect(getBtn('Cancel')).toHaveAttribute('aria-label', 'Wizard: Cancel');
    expect(getBtn('Start')).toHaveAttribute('aria-label', 'Wizard: Start');
    render(<Footer {...baseProps} isFirstStep={false} isLastStep={true} />);
    expect(getBtn('Submit')).toHaveAttribute('aria-label', 'Wizard: Submit');
  });

  it('renders custom labels', () => {
    const customLabels = {
      startLabel: 'Begin',
      cancelLabel: 'Abort',
      backLabel: 'Previous',
      continueLabel: 'Next',
      submitLabel: 'Finish',
    };
    render(<Footer {...baseProps} labels={customLabels} />);
    expect(getBtn('Previous')).toBeInTheDocument();
    expect(getBtn('Next')).toBeInTheDocument();
  });
});
