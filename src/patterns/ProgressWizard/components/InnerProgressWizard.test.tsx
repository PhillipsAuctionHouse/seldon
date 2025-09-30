import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import InnerProgressWizard, { InnerProgressWizardProps } from './InnerProgressWizard';
import { FormStep, ButtonLabels } from '../types';
import { useForm, FormProvider } from 'react-hook-form';
import React from 'react';

const steps: FormStep[] = [
  {
    id: 'step1',
    label: 'Step 1',
    componentFactory: () => <input aria-label="Step 1 Input" />,
  },
  {
    id: 'step2',
    label: 'Step 2',
    componentFactory: () => <input aria-label="Step 2 Input" />,
  },
];

const buttonLabels: ButtonLabels = {
  startLabel: 'Start',
  cancelLabel: 'Cancel',
  backLabel: 'Back',
  continueLabel: 'Continue',
  submitLabel: 'Submit',
};

function FormProviderWrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
}

function renderWithFormProvider(ui: React.ReactElement) {
  return render(<FormProviderWrapper>{ui}</FormProviderWrapper>);
}

describe('InnerProgressWizard', () => {
  const defaultProps: InnerProgressWizardProps = {
    steps,
    currentStepIndex: 0,
    setCurrentStepIndex: vi.fn(),
    customHeader: <div data-testid="custom-header">Header</div>,
    hideNavigation: false,
    hideProgressIndicator: false,
    buttonLabels,
    loadingState: 'idle',
    setLoadingState: vi.fn(),
    action: '#',
    isFirstStep: true,
    isLastStep: false,
    className: 'wizard',
    formId: 'form-id',
    handleContinue: vi.fn(),
    handleBack: vi.fn(),
    handleSubmit: vi.fn(),
    handleCancel: vi.fn(),
  };

  it('renders logo, header, progress indicator, and step content', () => {
    renderWithFormProvider(<InnerProgressWizard {...defaultProps} />);
    expect(screen.getByLabelText('Form Wizard')).toBeInTheDocument();
    expect(screen.getByTestId('custom-header')).toBeInTheDocument();
    expect(screen.getByLabelText('Progress')).toBeInTheDocument();
    expect(screen.getByLabelText('Step 1 Input')).toBeInTheDocument();
  });

  it('hides progress indicator when hideProgressIndicator is true', () => {
    renderWithFormProvider(<InnerProgressWizard {...defaultProps} hideProgressIndicator={true} />);
    expect(screen.queryByLabelText('Progress')).toBeNull();
  });

  it('hides navigation when hideNavigation is true', () => {
    renderWithFormProvider(<InnerProgressWizard {...defaultProps} hideNavigation={true} />);
    expect(screen.queryByRole('button', { name: /Wizard:/ })).toBeNull();
  });

  it('calls handleContinue on form submit if not last step', async () => {
    renderWithFormProvider(<InnerProgressWizard {...defaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: 'Wizard: Start' }));
    expect(defaultProps.handleContinue).toHaveBeenCalled();
    expect(defaultProps.handleSubmit).not.toHaveBeenCalled();
  });

  it('calls handleSubmit on form submit if last step', async () => {
    renderWithFormProvider(<InnerProgressWizard {...defaultProps} isLastStep={true} isFirstStep={false} />);
    await userEvent.click(screen.getByRole('button', { name: 'Wizard: Submit' }));
    expect(defaultProps.handleSubmit).toHaveBeenCalled();
  });

  it('renders correct step content for currentStepIndex', () => {
    renderWithFormProvider(<InnerProgressWizard {...defaultProps} currentStepIndex={1} isFirstStep={false} />);
    expect(screen.getByLabelText('Step 2 Input')).toBeInTheDocument();
  });

  it('renders fallback if step index is out of bounds', () => {
    renderWithFormProvider(<InnerProgressWizard {...defaultProps} currentStepIndex={99} />);
    expect(screen.getByText(/No step found at index/)).toBeInTheDocument();
  });

  it('renders footer with correct props', () => {
    renderWithFormProvider(<InnerProgressWizard {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Wizard: Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Wizard: Start' })).toBeInTheDocument();
  });

  it('footer disables Continue when loading', () => {
    renderWithFormProvider(<InnerProgressWizard {...defaultProps} loadingState="loading" />);
    expect(screen.getByRole('button', { name: 'Wizard: Start' })).toBeDisabled();
  });

  it('footer disables Continue when submitting', () => {
    renderWithFormProvider(<InnerProgressWizard {...defaultProps} loadingState="submitting" />);
    expect(screen.getByRole('button', { name: 'Wizard: Start' })).toBeDisabled();
  });

  it('footer enables Continue when idle', () => {
    renderWithFormProvider(<InnerProgressWizard {...defaultProps} loadingState="idle" />);
    expect(screen.getByRole('button', { name: 'Wizard: Start' })).not.toBeDisabled();
  });

  it('calls handleBack and handleCancel from footer', async () => {
    renderWithFormProvider(<InnerProgressWizard {...defaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: 'Wizard: Cancel' }));
    await userEvent.click(screen.getByRole('button', { name: 'Wizard: Start' }));
    expect(defaultProps.handleCancel).toHaveBeenCalled();
    expect(defaultProps.handleContinue).toHaveBeenCalled();
  });
});
