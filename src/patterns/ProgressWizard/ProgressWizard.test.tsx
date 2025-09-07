import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProgressWizard, type ProgressWizardProps } from './';
import { describe, it, expect, vi } from 'vitest';
import { z } from 'zod';
import { useState } from 'react';

// 🎺TODO this are all totally busted

const steps = [
  { id: '0', label: 'Step 1', schema: z.object({}), component: undefined },
  { id: '1', label: 'Step 2', schema: z.object({}), component: undefined },
  { id: '2', label: 'Step 3', schema: z.object({}), component: undefined },
];

const renderProgressWizard = (props: Partial<ProgressWizardProps> = {}) => {
  const defaultProps: ProgressWizardProps = {
    steps: steps.map((s, i) => ({ ...s, component: <div key={i}>Content for {s.label}</div> })),
    setCanContinue: vi.fn(),
    onSubmit: vi.fn(),
    onCancel: vi.fn(),
    ...props,
  };
  return render(<ProgressWizard {...defaultProps} />);
};

describe('ProgressWizard', () => {
  it('renders the wizard with steps and content', () => {
    renderProgressWizard();
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
    expect(screen.getByText('Content for Step 1')).toBeInTheDocument();
  });

  it('navigates to the next step when "Start" or "Continue" is clicked', async () => {
    const user = userEvent.setup();
    renderProgressWizard();

    const startButton = screen.getByRole('button', { name: /start/i });
    await user.click(startButton);

    expect(screen.getByText('Content for Step 2')).toBeInTheDocument();
  });

  it('navigates back to the previous step when "Back" is clicked', async () => {
    const user = userEvent.setup();
    renderProgressWizard();

    const startButton = screen.getByRole('button', { name: /start/i });
    await user.click(startButton);

    const backButton = screen.getByRole('button', { name: /back/i });
    await user.click(backButton);

    expect(screen.getByText('Content for Step 1')).toBeInTheDocument();
  });

  it('calls onSubmit when "Submit" is clicked on the last step', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderProgressWizard({ onSubmit });

    const startButton = screen.getByRole('button', { name: /start/i });
    await user.click(startButton);

    const continueButton = screen.getByRole('button', { name: /continue/i });
    await user.click(continueButton);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalled();
  });

  it('calls onCancel when "Cancel" is clicked on the first step', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    renderProgressWizard({ onCancel });

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(onCancel).toHaveBeenCalled();
  });

  it('disables navigation buttons when canContinue is false', async () => {
    const [canContinue, setCanContinue] = useState(false);
    const user = userEvent.setup();
    renderProgressWizard({
      canContinue,
      setCanContinue,
    });

    const startButton = screen.getByRole('button', { name: /start/i });
    await user.click(startButton);

    const continueButton = screen.getByRole('button', { name: /continue/i });
    expect(continueButton).toBeDisabled();
  });
});
