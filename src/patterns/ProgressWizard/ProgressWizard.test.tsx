import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, type Mock } from 'vitest';
import ProgressWizard from './ProgressWizard';
import { z } from 'zod';
import Input from '../../components/Input/Input';
import { type LoadingState, type FormStep } from './types';
import userEvent from '@testing-library/user-event';
import { useState, type FC } from 'react';

const getWizName = (label: string) => ({ name: `Wizard: ${label}` });

const mockFormSubmit = () => {
  const originalSubmit = HTMLFormElement.prototype.submit;
  beforeAll(() => {
    HTMLFormElement.prototype.submit = vi.fn();
  });
  afterAll(() => {
    HTMLFormElement.prototype.submit = originalSubmit;
  });
};
mockFormSubmit();

describe('ProgressWizard', () => {
  beforeEach(() => {
    if ((console.error as Mock)?.mockRestore) (console.error as Mock).mockRestore();
  });

  type EachFood = {
    steps: FormStep[];
    firstLabel: string;
    firstValue: string;
    secondLabel: string;
    secondValue: string;
    submitLabel: string;
  };

  const eachFoods: EachFood[] = [
    {
      steps: [
        {
          id: 'step1',
          label: 'Step 1',
          componentFactory: ({ registerProgressWizardInput }) => (
            <Input {...registerProgressWizardInput('name')} key="step1-input" />
          ),
        },
        {
          id: 'step2',
          label: 'Step 2',
          componentFactory: ({ registerProgressWizardInput }) => (
            <Input {...registerProgressWizardInput('age', { overrides: { type: 'number' } })} key="step2-input" />
          ),
        },
      ],
      firstLabel: 'Name*',
      firstValue: 'KeyboardUser',
      secondLabel: 'Age*',
      secondValue: '42',
      submitLabel: 'Submit',
    },
  ];

  it.each(eachFoods)(
    'submits with Enter key and navigates steps with keyboard',
    async ({ steps, firstLabel, firstValue, secondLabel, secondValue, submitLabel }) => {
      render(
        <ProgressWizard
          steps={steps}
          loadingState="idle"
          startLabel="Start"
          cancelLabel="Cancel"
          backLabel="Back"
          continueLabel="Continue"
          submitLabel={submitLabel}
        />,
      );
      await userEvent.type(screen.getByLabelText(firstLabel), firstValue);
      await userEvent.keyboard('{Enter}');
      await waitFor(() => expect(screen.getByLabelText(secondLabel)).toBeInTheDocument());
      await userEvent.type(screen.getByLabelText(secondLabel), secondValue);
      await userEvent.keyboard('{Enter}');
      expect(screen.getByRole('button', getWizName(submitLabel))).toBeInTheDocument();
    },
  );

  it('persists field/form data when navigating back and forth through four steps', async () => {
    const steps: FormStep[] = [
      {
        id: 'step1',
        label: 'Step 1',
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input {...registerProgressWizardInput('field1')} key="step1-input" />
        ),
      },
      {
        id: 'step2',
        label: 'Step 2',
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input {...registerProgressWizardInput('field2')} key="step2-input" />
        ),
      },
      {
        id: 'step3',
        label: 'Step 3',
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input {...registerProgressWizardInput('field3')} key="step3-input" />
        ),
      },
      {
        id: 'step4',
        label: 'Step 4',
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input {...registerProgressWizardInput('field4')} key="step4-input" />
        ),
      },
      {
        id: 'step5',
        label: 'Step 5',
        componentFactory: () => <div>just here to be the unused submit step</div>,
      },
    ];
    render(
      <ProgressWizard
        steps={steps}
        loadingState="idle"
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      />,
    );
    await userEvent.type(screen.getByLabelText('Field1*'), 'A');
    await userEvent.click(screen.getByRole('button', getWizName('Start')));
    await userEvent.type(screen.getByLabelText('Field2*'), 'B');
    await userEvent.click(screen.getByRole('button', getWizName('Continue')));
    await userEvent.type(screen.getByLabelText('Field3*'), 'C');
    await userEvent.click(screen.getByRole('button', getWizName('Continue')));
    await userEvent.type(screen.getByLabelText('Field4*'), 'D');
    await userEvent.click(screen.getByRole('button', getWizName('Back')));
    await userEvent.click(screen.getByRole('button', getWizName('Back')));
    await userEvent.click(screen.getByRole('button', getWizName('Back')));
    expect(screen.getByLabelText('Field1*')).toHaveValue('A');
    await userEvent.click(screen.getByRole('button', getWizName('Start')));
    expect(screen.getByLabelText('Field2*')).toHaveValue('B');
    await userEvent.click(screen.getByRole('button', getWizName('Continue')));
    expect(screen.getByLabelText('Field3*')).toHaveValue('C');
    await userEvent.click(screen.getByRole('button', getWizName('Continue')));
    expect(screen.getByLabelText('Field4*')).toHaveValue('D');
  });

  it('handles browser navigation buttons (back/forward)', async () => {
    const steps: FormStep[] = [
      {
        id: 'step1',
        label: 'Step 1',
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input {...registerProgressWizardInput('field1')} key="step1-input" />
        ),
      },
      {
        id: 'step2',
        label: 'Step 2',
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input {...registerProgressWizardInput('field2')} key="step2-input" />
        ),
      },
      {
        id: 'step3',
        label: 'Step 3',
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input {...registerProgressWizardInput('field3')} key="step3-input" />
        ),
      },
    ];
    render(
      <ProgressWizard
        steps={steps}
        loadingState="idle"
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      />,
    );
    await userEvent.type(screen.getByLabelText('Field1*'), 'A');
    await userEvent.click(screen.getByRole('button', getWizName('Start')));
    await userEvent.type(screen.getByLabelText('Field2*'), 'B');
    await userEvent.click(screen.getByRole('button', getWizName('Continue')));
    await userEvent.type(screen.getByLabelText('Field3*'), 'C');
    window.history.back();
    window.dispatchEvent(new PopStateEvent('popstate'));
    await waitFor(() => expect(screen.getByLabelText('Field2*')).toBeInTheDocument());
    expect(screen.getByLabelText('Field2*')).toHaveValue('B');
    window.history.forward();
    window.dispatchEvent(new PopStateEvent('popstate'));
    await waitFor(() => expect(screen.getByLabelText('Field3*')).toBeInTheDocument());
    expect(screen.getByLabelText('Field3*')).toHaveValue('C');
  });

  it('hides the ProgressIndicator when hideProgressIndicator is true', () => {
    const steps: FormStep[] = [
      {
        id: 'step1',
        label: 'Step 1',
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input {...registerProgressWizardInput('name')} key="step1-input" />
        ),
      },
    ];
    render(
      <ProgressWizard
        steps={steps}
        loadingState="idle"
        hideProgressIndicator={true}
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      />,
    );
    expect(screen.queryByLabelText('Wizard Progress')).toBeNull();
  });

  it('hides the navigation section when hideNavigation is true', () => {
    const steps: FormStep[] = [
      {
        id: 'step1',
        label: 'Step 1',
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input {...registerProgressWizardInput('name')} key="step1-input" />
        ),
      },
    ];
    render(
      <ProgressWizard
        steps={steps}
        loadingState="idle"
        hideNavigation={true}
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      />,
    );
    expect(screen.queryByRole('button', { name: /Wizard:/ })).toBeNull();
  });

  it('applies refinements from step schemas and validates them', async () => {
    const steps: FormStep[] = [
      {
        id: 'step1',
        label: 'Step 1',
        schema: z.object({
          name: z.string().refine((val) => val !== 'forbidden', { message: 'Name is forbidden' }),
        }),
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input {...registerProgressWizardInput('name')} key="step1-input" />
        ),
      },
    ];
    render(
      <ProgressWizard
        steps={steps}
        loadingState="idle"
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      />,
    );
    await userEvent.type(screen.getByLabelText('Name*'), 'forbidden');
    await userEvent.click(screen.getByRole('button', { name: 'Wizard: Submit' }));
    await waitFor(() => expect(screen.getByText('Name is forbidden')).toBeInTheDocument());
  });

  it('handles loading state with a simulated remix fetcher for form submission', async () => {
    const steps: FormStep[] = [
      {
        id: 'step1',
        label: 'Step 1',
        schema: z.object({ name: z.string().min(1, { message: 'Name required' }) }),
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input {...registerProgressWizardInput('name')} key="step1-input" />
        ),
      },
    ];

    const TestWrapper: FC = () => {
      const [fetcherState, setFetcherState] = useState<LoadingState>('idle');
      const onFormSubmit = vi.fn(async () => {
        setFetcherState('loading');
        await new Promise((resolve) => setTimeout(resolve, 500));
        setFetcherState('idle');
      });
      return (
        <ProgressWizard
          steps={steps}
          loadingState={fetcherState}
          onFormSubmit={onFormSubmit}
          startLabel="Start"
          cancelLabel="Cancel"
          backLabel="Back"
          continueLabel="Continue"
          submitLabel="Submit"
        />
      );
    };

    render(<TestWrapper />);
    await userEvent.type(screen.getByLabelText('Name*'), 'RemixUser');
    await userEvent.click(screen.getByRole('button', getWizName('Submit')));
    await waitFor(() => expect(screen.getByRole('button', getWizName('Submit'))).toBeDisabled());
    await waitFor(() => expect(screen.getByRole('button', getWizName('Submit'))).not.toBeDisabled());
  });

  it('renders steps and navigates between them', async () => {
    const steps: FormStep[] = [
      {
        id: 'step0',
        label: 'Step 0',
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input {...registerProgressWizardInput('human?!')} key="step0-input" />
        ),
      },
      {
        id: 'step1',
        label: 'Step 1',
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input {...registerProgressWizardInput('name')} key="step1-input" />
        ),
      },
      {
        id: 'step2',
        label: 'Step 2',
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input {...registerProgressWizardInput('age', { overrides: { type: 'number' } })} key="step2-input" />
        ),
      },
    ];
    render(
      <ProgressWizard
        steps={steps}
        loadingState="idle"
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      />,
    );
    await userEvent.click(screen.getByRole('button', getWizName('Start')));
    await waitFor(() => expect(screen.getByRole('button', getWizName('Continue'))).toBeInTheDocument());
    await userEvent.click(screen.getByRole('button', getWizName('Continue')));
    await waitFor(() => expect(screen.getByRole('button', getWizName('Submit'))).toBeInTheDocument());
  });

  it('shows validation errors and prevents navigation', async () => {
    vi.spyOn(console, 'error').mockImplementation((e) => {
      console.log(e);
    });
    const steps: FormStep[] = [
      {
        id: 'step1',
        label: 'Step 1',
        schema: z.object({ name: z.string().min(3, { message: 'Name too short' }) }),
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input {...registerProgressWizardInput('name')} key="step1-input" />
        ),
      },
    ];
    render(
      <ProgressWizard
        steps={steps}
        loadingState="idle"
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      />,
    );
    await userEvent.type(screen.getByLabelText('Name*'), 'Jo');
    await userEvent.click(screen.getByRole('button', getWizName('Submit')));
    await waitFor(() => expect(screen.getByText('Name too short')).toBeInTheDocument());
  });

  it('waits for async validation before continuing', async () => {
    const asyncSchema = z.string().refine(
      async (val) => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        return val !== 'taken';
      },
      { message: 'Name is taken' },
    );
    const steps: FormStep[] = [
      {
        id: 'step1',
        label: 'Step 1',
        schema: z.object({ name: asyncSchema }),
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input {...registerProgressWizardInput('name')} key="step1-input" />
        ),
      },
    ];
    render(
      <ProgressWizard
        steps={steps}
        loadingState="idle"
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      />,
    );
    await userEvent.type(screen.getByLabelText('Name*'), 'taken');
    await userEvent.click(screen.getByRole('button', getWizName('Submit')));
    await waitFor(() => expect(screen.getByText('Name is taken')).toBeInTheDocument());
  });

  it('warns when steps > 10 and hideProgressIndicator is false, does not warn when true', () => {
    const steps: FormStep[] = Array.from({ length: 11 }, (_, i) => ({
      id: `step${i + 1}`,
      label: `Step ${i + 1}`,
      componentFactory: ({ registerProgressWizardInput }) => (
        <Input {...registerProgressWizardInput(`field${i + 1}`)} key={`step${i + 1}-input`} />
      ),
    }));
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => void 0);
    render(
      <ProgressWizard
        steps={steps}
        loadingState="idle"
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      />,
    );
    expect(warnSpy).toHaveBeenCalledWith(
      '[ProgressWizard]',
      'You have more than 10 steps. Consider setting `hideProgressIndicator` because it is going to look weird.',
    );
    warnSpy.mockClear();
    render(
      <ProgressWizard
        steps={steps}
        loadingState="idle"
        hideProgressIndicator={true}
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      />,
    );
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('renders custom labels and translation', () => {
    const steps: FormStep[] = [
      {
        id: 'step1',
        label: 'Step 1',
        schema: z.object({ email: z.string().email({ message: 'Invalid email' }) }),
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input
            {...registerProgressWizardInput('email', { overrides: { labelText: 'E-mail Address' } })}
            key="step1-input"
          />
        ),
      },
      {
        id: 'step2',
        label: 'Step 2',
        schema: z.object({ email: z.string().email({ message: 'Invalid thumb length' }) }),
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input
            {...registerProgressWizardInput('thumb length', { overrides: { labelText: 'Thumb Length' } })}
            key="step2-input"
          />
        ),
      },
    ];
    render(
      <ProgressWizard
        steps={steps}
        loadingState="idle"
        startLabel="Go!"
        cancelLabel="Stop"
        backLabel="Previous"
        continueLabel="Next"
        submitLabel="Finish"
      />,
    );
    expect(screen.getByRole('button', getWizName('Go!'))).toBeInTheDocument();
    expect(screen.getByRole('button', getWizName('Stop'))).toBeInTheDocument();
  });

  it('handles step with no fields gracefully', () => {
    const steps: FormStep[] = [
      {
        id: 'empty',
        label: 'Empty',
        schema: z.object({}),
        componentFactory: () => <div>No fields</div>,
      },
    ];
    render(
      <ProgressWizard
        steps={steps}
        loadingState="idle"
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      />,
    );
    expect(screen.getByText('No fields')).toBeInTheDocument();
  });

  it('handles duplicate field names across steps', async () => {
    const steps: FormStep[] = [
      {
        id: 'step1',
        label: 'Step 1',
        schema: z.object({ name: z.string().min(1) }),
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input {...registerProgressWizardInput('name')} key="step1-input" />
        ),
      },
      {
        id: 'step2',
        label: 'Step 2',
        schema: z.object({ name: z.string().min(2) }),
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input {...registerProgressWizardInput('name')} key="step2-input" />
        ),
      },
    ];
    render(
      <ProgressWizard
        steps={steps}
        loadingState="idle"
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      />,
    );
    await userEvent.type(screen.getByLabelText('Name*'), 'A');
    await userEvent.click(screen.getByRole('button', getWizName('Start')));
    await waitFor(() => expect(screen.getByLabelText('Name*')).toBeInTheDocument());
    await userEvent.type(screen.getByLabelText('Name*'), 'AB');
    await userEvent.click(screen.getByRole('button', getWizName('Submit')));
    expect(screen.getByLabelText('Name*')).toHaveValue('AB');
  });

  it('calls onCancel and onBack and prevents navigation if they return false', async () => {
    const steps: FormStep[] = [
      {
        id: 'step1',
        label: 'Step 1',
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input {...registerProgressWizardInput('name')} key="step1-input" />
        ),
      },
      {
        id: 'step2',
        label: 'Step 2',
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input {...registerProgressWizardInput('age', { overrides: { type: 'number' } })} key="step2-input" />
        ),
      },
    ];
    const onCancel = vi.fn(() => false);
    const onBack = vi.fn(() => false);
    render(
      <ProgressWizard
        steps={steps}
        loadingState="idle"
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
        onCancel={onCancel}
        onBack={onBack}
      />,
    );
    await userEvent.click(screen.getByRole('button', getWizName('Cancel')));
    expect(onCancel).toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', getWizName('Start')));
    await userEvent.click(screen.getByRole('button', getWizName('Back')));
    expect(onBack).toHaveBeenCalled();
    expect(screen.getByRole('button', getWizName('Submit'))).toBeInTheDocument();
  });

  it('calls onError for async validation errors', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => void 0);
    const asyncSchema = z.string().refine(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      throw new Error('Async error');
    });
    const steps: FormStep[] = [
      {
        id: 'step1',
        label: 'Step 1',
        schema: z.object({ name: asyncSchema }),
        componentFactory: ({ registerProgressWizardInput }) => (
          <Input {...registerProgressWizardInput('name')} key="step1-input" />
        ),
      },
    ];
    const onError = vi.fn();
    render(
      <ProgressWizard
        steps={steps}
        loadingState="idle"
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
        onError={onError}
      />,
    );
    await userEvent.type(screen.getByLabelText('Name*'), 'fail');
    await userEvent.click(screen.getByRole('button', getWizName('Submit')));
    await waitFor(() => expect(onError).toHaveBeenCalled());
  });
});
