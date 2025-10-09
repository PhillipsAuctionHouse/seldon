import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import InnerProgressWizard, { type InnerProgressWizardProps } from './InnerProgressWizard';
import { LoadingState } from '../types';

const steps = [<input key="step1" aria-label="Step 1 Input" />, <input key="step2" aria-label="Step 2 Input" />];

describe('InnerProgressWizard', () => {
  const defaultProps: InnerProgressWizardProps = {
    currentStepIndex: 0,
    setCurrentStepIndex: vi.fn(),
    customHeader: <div data-testid="custom-header">Header</div>,
    hideNavigation: false,
    hideProgressIndicator: false,
    loadingState: LoadingState.Idle,
    startLabel: 'Start',
    cancelLabel: 'Cancel',
    backLabel: 'Back',
    continueLabel: 'Continue',
    submitLabel: 'Submit',
    onBack: vi.fn(),
    onCancel: vi.fn(),
    onContinue: vi.fn(),
    onFormSubmit: vi.fn(),
    childOrChildren: steps,
  };

  it('renders logo, header, progress indicator, and step content', () => {
    render(<InnerProgressWizard {...defaultProps} />);
    expect(screen.getByLabelText('Form Wizard')).toBeInTheDocument();
    expect(screen.getByTestId('custom-header')).toBeInTheDocument();
    expect(screen.getByLabelText('Progress')).toBeInTheDocument();
    expect(screen.getByLabelText('Step 1 Input')).toBeInTheDocument();
  });

  it('hides progress indicator when hideProgressIndicator is true', () => {
    render(<InnerProgressWizard {...defaultProps} hideProgressIndicator={true} />);
    expect(screen.queryByLabelText('Progress')).toBeNull();
  });

  it('hides navigation when hideNavigation is true', () => {
    render(<InnerProgressWizard {...defaultProps} hideNavigation={true} />);
    expect(screen.queryByRole('button', { name: /Wizard:/ })).toBeNull();
  });

  it('calls onContinue on form submit if not last step', async () => {
    render(<InnerProgressWizard {...defaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: 'Wizard: Start' }));
    expect(defaultProps.onContinue).toHaveBeenCalled();
    expect(defaultProps.onFormSubmit).not.toHaveBeenCalled();
  });

  it('calls onFormSubmit on form submit if last step', async () => {
    render(<InnerProgressWizard {...defaultProps} currentStepIndex={steps.length - 1} />);
    await userEvent.click(screen.getByRole('button', { name: 'Wizard: Submit' }));
    expect(defaultProps.onFormSubmit).toHaveBeenCalled();
  });

  it('renders correct step content for currentStepIndex', () => {
    render(<InnerProgressWizard {...defaultProps} currentStepIndex={1} />);
    expect(screen.getByLabelText('Step 2 Input')).toBeInTheDocument();
  });

  it('renders fallback if step index is out of bounds', () => {
    render(<InnerProgressWizard {...defaultProps} currentStepIndex={99} />);
    expect(screen.getByText(/No content found for step 100/)).toBeInTheDocument();
  });

  it('renders footer with correct props', () => {
    render(<InnerProgressWizard {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Wizard: Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Wizard: Start' })).toBeInTheDocument();
  });

  it('footer disables Continue when loading', () => {
    render(<InnerProgressWizard {...defaultProps} loadingState={LoadingState.Loading} />);
    expect(screen.getByRole('button', { name: 'Wizard: Start' })).toBeDisabled();
  });

  it('footer disables Continue when submitting', () => {
    render(<InnerProgressWizard {...defaultProps} loadingState={LoadingState.Submitting} />);
    expect(screen.getByRole('button', { name: 'Wizard: Start' })).toBeDisabled();
  });

  it('footer enables Continue when idle', () => {
    render(<InnerProgressWizard {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Wizard: Start' })).not.toBeDisabled();
  });

  it('calls onBack and onCancel from footer', async () => {
    render(<InnerProgressWizard {...defaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: 'Wizard: Cancel' }));
    await userEvent.click(screen.getByRole('button', { name: 'Wizard: Start' }));
    expect(defaultProps.onCancel).toHaveBeenCalled();
    expect(defaultProps.onContinue).toHaveBeenCalled();
  });
});
