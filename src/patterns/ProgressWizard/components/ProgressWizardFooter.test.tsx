import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Footer, { type ProgressWizardFooterProps } from './ProgressWizardFooter';
import userEvent from '@testing-library/user-event';

const getBtn = (label: string) => screen.getByRole('button', { name: `Progress Wizard: ${label}` });

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

  it('disables primary button when shouldAllowContinue is false', () => {
    render(<Footer {...baseProps} shouldAllowContinue={false} />);
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

  it('calls onBack when Back is clicked', async () => {
    render(<Footer {...baseProps} />);
    await userEvent.click(getBtn('Back'));
    expect(baseProps.onBack).toHaveBeenCalled();
  });

  it('calls onCancel when Cancel is clicked on first step', async () => {
    const onCancel = vi.fn();
    render(<Footer {...baseProps} isFirstStep={true} onCancel={onCancel} />);
    await userEvent.click(getBtn('Cancel'));
    expect(onCancel).toHaveBeenCalled();
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
      start: 'Begin',
      cancel: 'Abort',
      back: 'Previous',
      continue: 'Next',
      submit: 'Finish',
    };
    render(<Footer {...baseProps} labels={customLabels} />);
    expect(getBtn('Previous')).toBeInTheDocument();
    expect(getBtn('Next')).toBeInTheDocument();
  });
});
