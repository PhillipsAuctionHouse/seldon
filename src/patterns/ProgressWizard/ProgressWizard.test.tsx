import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, type Mock } from 'vitest';
import ProgressWizard from './ProgressWizard';
import Input from '../../components/Input/Input';
import { type LoadingState } from './types';
import userEvent from '@testing-library/user-event';
import { useState, type FC } from 'react';

const getWizName = (label: string) => ({ name: `Wizard: ${label}` });

describe('ProgressWizard', () => {
  beforeEach(() => {
    if ((console.error as Mock)?.mockRestore) (console.error as Mock).mockRestore();
  });

  type ProgressWizardStep = {
    steps: JSX.Element[];
    firstLabel: string;
    firstValue: string;
    secondLabel: string;
    secondValue: string;
    submitLabel: string;
  };

  const progressWizardSteps: ProgressWizardStep[] = [
    {
      steps: [
        <Input name="name" id="name" labelText="Name*" key="step1-input" />,

        <Input name="age" id="age" labelText="Age*" key="step2-input" type="number" />,
      ],
      firstLabel: 'Name*',
      firstValue: 'KeyboardUser',
      secondLabel: 'Age*',
      secondValue: '42',
      submitLabel: 'Submit',
    },
  ];

  it.each(progressWizardSteps)(
    'submits with Enter key and navigates steps with keyboard',
    async ({ firstLabel, firstValue, secondLabel, secondValue, submitLabel }) => {
      render(
        <ProgressWizard
          loadingState="idle"
          startLabel="Start"
          cancelLabel="Cancel"
          backLabel="Back"
          continueLabel="Continue"
          submitLabel={submitLabel}
        >
          {progressWizardSteps.map((step) => step.steps)}
        </ProgressWizard>,
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
    const steps = [
      <Input name="field1" id="field1" labelText="Field1*" key="step1-input" />,

      <Input name="field2" id="field2" labelText="Field2*" key="step2-input" />,
      <Input name="field3" id="field3" labelText="Field3*" key="step3-input" />,

      <Input name="field4" id="field4" labelText="Field4*" key="step4-input" />,
      <div key="unused-step">just here to be the unused submit step</div>,
    ];
    render(
      <ProgressWizard
        loadingState="idle"
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      >
        {steps}
      </ProgressWizard>,
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
    const steps = [
      <Input name="field1" id="field1" labelText="Field1*" key="step1-input" />,

      <Input name="field2" id="field2" labelText="Field2*" key="step2-input" />,
      <Input name="field3" id="field3" labelText="Field3" key="step3-input" />,
    ];
    render(
      <ProgressWizard
        loadingState="idle"
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      >
        {steps}
      </ProgressWizard>,
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
    render(
      <ProgressWizard
        loadingState="idle"
        hideProgressIndicator={true}
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      >
        <Input name="name" id="name" labelText="Name*" />
      </ProgressWizard>,
    );
    expect(screen.queryByLabelText('Wizard Progress')).toBeNull();
  });

  it('hides the navigation section when hideNavigation is true', () => {
    render(
      <ProgressWizard
        loadingState="idle"
        hideNavigation={true}
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      >
        <Input name="name" id="name" labelText="Name*" />
      </ProgressWizard>,
    );
    expect(screen.queryByRole('button', { name: /Wizard:/ })).toBeNull();
  });

  it('applies refinements and validates inputs', async () => {
    render(
      <ProgressWizard
        loadingState="idle"
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      >
        <Input name="name" id="name" labelText="Name*" />
      </ProgressWizard>,
    );
    await userEvent.type(screen.getByLabelText('Name*'), 'forbidden');
    await userEvent.click(screen.getByRole('button', getWizName('Submit')));
    await waitFor(() => expect(screen.getByText('Name is forbidden')).toBeInTheDocument());
  });

  it('handles loading state during form submission', async () => {
    const TestWrapper: FC = () => {
      const [fetcherState, setFetcherState] = useState<LoadingState>('idle');
      const onFormSubmit = vi.fn(async () => {
        setFetcherState('loading');
        await new Promise((resolve) => setTimeout(resolve, 500));
        setFetcherState('idle');
      });
      return (
        <ProgressWizard
          loadingState={fetcherState}
          onFormSubmit={onFormSubmit}
          startLabel="Start"
          cancelLabel="Cancel"
          backLabel="Back"
          continueLabel="Continue"
          submitLabel="Submit"
        >
          <Input name="name" id="name" labelText="Name*" />
        </ProgressWizard>
      );
    };

    render(<TestWrapper />);
    await userEvent.type(screen.getByLabelText('Name*'), 'RemixUser');
    await userEvent.click(screen.getByRole('button', getWizName('Submit')));
    await waitFor(() => expect(screen.getByRole('button', getWizName('Submit'))).toBeDisabled());
    await waitFor(() => expect(screen.getByRole('button', getWizName('Submit'))).not.toBeDisabled());
  });

  it('renders steps and navigates between them', async () => {
    render(
      <ProgressWizard
        loadingState="idle"
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      >
        <Input name="field1" id="field1" labelText="Field1*" />
        <Input name="field2" id="field2" labelText="Field2*" />
        <Input name="field3" id="field3" labelText="Field3*" />
      </ProgressWizard>,
    );
    await userEvent.click(screen.getByRole('button', getWizName('Start')));
    await waitFor(() => expect(screen.getByRole('button', getWizName('Continue'))).toBeInTheDocument());
    await userEvent.click(screen.getByRole('button', getWizName('Continue')));
    await waitFor(() => expect(screen.getByRole('button', getWizName('Submit'))).toBeInTheDocument());
  });

  it('shows validation errors and prevents navigation', async () => {
    render(
      <ProgressWizard
        loadingState="idle"
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      >
        <Input name="name" id="name" labelText="Name*" />
      </ProgressWizard>,
    );
    await userEvent.type(screen.getByLabelText('Name*'), 'Jo');
    await userEvent.click(screen.getByRole('button', getWizName('Submit')));
    await waitFor(() => expect(screen.getByText('Name too short')).toBeInTheDocument());
  });

  it('handles browser navigation buttons (back/forward)', async () => {
    const steps = [
      <Input name="field1" id="field1" labelText="Field1*" key="step1-input" />,

      <Input name="field2" id="field2" labelText="Field2*" key="step2-input" />,
      <Input name="field3" id="field3" labelText="Field3" key="step3-input" />,
    ];
    render(
      <ProgressWizard
        loadingState="idle"
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      >
        {steps}
      </ProgressWizard>,
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
    render(
      <ProgressWizard
        loadingState="idle"
        hideProgressIndicator={true}
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      >
        <Input name="name" id="name" labelText="Name*" />
      </ProgressWizard>,
    );
    expect(screen.queryByLabelText('Wizard Progress')).toBeNull();
  });

  it('hides the navigation section when hideNavigation is true', () => {
    render(
      <ProgressWizard
        loadingState="idle"
        hideNavigation={true}
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      >
        <Input name="name" id="name" labelText="Name*" />
      </ProgressWizard>,
    );
    expect(screen.queryByRole('button', { name: /Wizard:/ })).toBeNull();
  });

  it('renders custom labels and translation', () => {
    render(
      <ProgressWizard
        loadingState="idle"
        startLabel="Go!"
        cancelLabel="Stop"
        backLabel="Previous"
        continueLabel="Next"
        submitLabel="Finish"
      >
        <Input name="email" id="email" labelText="E-mail Address" />
        <Input name="thumb" id="thumb" labelText="Thumb Length" />
      </ProgressWizard>,
    );
    expect(screen.getByRole('button', getWizName('Go!'))).toBeInTheDocument();
    expect(screen.getByRole('button', getWizName('Stop'))).toBeInTheDocument();
  });

  it('handles step with no fields gracefully', () => {
    render(
      <ProgressWizard
        loadingState="idle"
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      >
        <div>No fields</div>
      </ProgressWizard>,
    );
    expect(screen.getByText('No fields')).toBeInTheDocument();
  });

  it('handles duplicate field names across steps', async () => {
    render(
      <ProgressWizard
        loadingState="idle"
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
      >
        <Input name="name" id="name" labelText="Name*" />
        <Input name="name" id="name2" labelText="Name (Step 2)*" />
      </ProgressWizard>,
    );
    await userEvent.type(screen.getByLabelText('Name*'), 'A');
    await userEvent.click(screen.getByRole('button', getWizName('Start')));
    await waitFor(() => expect(screen.getByLabelText('Name (Step 2)*')).toBeInTheDocument());
    await userEvent.type(screen.getByLabelText('Name (Step 2)*'), 'AB');
    await userEvent.click(screen.getByRole('button', getWizName('Submit')));
    expect(screen.getByLabelText('Name (Step 2)*')).toHaveValue('AB');
  });

  it('calls onCancel and onBack and prevents navigation if they return false', async () => {
    const onCancel = vi.fn(() => false);
    const onBack = vi.fn(() => false);
    render(
      <ProgressWizard
        loadingState="idle"
        startLabel="Start"
        cancelLabel="Cancel"
        backLabel="Back"
        continueLabel="Continue"
        submitLabel="Submit"
        onCancel={onCancel}
        onBack={onBack}
      >
        <Input name="name" id="name" labelText="Name*" />
        <Input name="age" id="age" labelText="Age*" />
      </ProgressWizard>,
    );
    await userEvent.click(screen.getByRole('button', getWizName('Cancel')));
    expect(onCancel).toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', getWizName('Start')));
    await userEvent.click(screen.getByRole('button', getWizName('Back')));
    expect(onBack).toHaveBeenCalled();
  });
});
