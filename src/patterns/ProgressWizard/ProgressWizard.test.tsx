import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, type Mock } from 'vitest';
import userEvent from '@testing-library/user-event';
import { useState, type FC } from 'react';
import type { ButtonLabels } from './types';
import { DefaultButtonLabels, LoadingState } from './types';
import ProgressWizard from './ProgressWizard';
import Input from '../../components/Input/Input';
import type { StringSlice } from 'type-fest';

// Constants and types
type v8StringMaximumLength = 1_073_741_824;

type FieldNameAndLabel<fP extends string> = {
  name: `${fP}${number}`;
  label: `${Capitalize<fP>}${number}`;
};

const fieldPrefix = 'field';

// Utility functions (let me have my fun okay?)
const slice = <T extends string, S extends number = 0, E extends number = v8StringMaximumLength>(
  s: T,
  start?: S,
  end?: E,
) => s.slice(start, end) as StringSlice<T, S, E>;

const toUpperCase = <T extends string>(str: T) => str.toUpperCase() as Uppercase<T>;

const genFieldNameAndLabel = (_val: unknown, i: number, _arr: unknown[]): FieldNameAndLabel<typeof fieldPrefix> => ({
  name: `${fieldPrefix}${i + 1}`,
  label: `${toUpperCase(slice(fieldPrefix, 0, 1))}${slice(fieldPrefix, 1)}${i + 1}`,
});

let lastRenderedFieldNamesAndLabels: FieldNameAndLabel<'field'>[] = [];

// Component definitions
const ConsumerForm = ({
  stepCount = 4,
  isAddExtraStep = false,
  buttonLabels,
}: {
  stepCount?: number;
  isAddExtraStep?: boolean;
  buttonLabels?: ButtonLabels;
}) => {
  const stepCountArray = Array.from({ length: stepCount });
  const stepCountNameAndLabels = stepCountArray.map(genFieldNameAndLabel);
  lastRenderedFieldNamesAndLabels = stepCountNameAndLabels;
  const stepNames = stepCountNameAndLabels.map(({ name }) => name);
  type FormData = Record<(typeof stepNames)[number], HTMLInputElement['value']>;
  const [formData, setFormData] = useState<FormData>({});

  const stepElements = stepCountNameAndLabels.map(({ name, label }, i) => (
    <Input
      name={name}
      id={name}
      labelText={label}
      value={formData[name] ?? ''}
      onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
      key={`step${i + 1}-input`}
    />
  ));

  return (
    <ProgressWizard buttonLabels={buttonLabels}>
      {stepElements}
      {isAddExtraStep && <div key="unused-step">unused submit step</div>}
    </ProgressWizard>
  );
};

const getWizName = (label: string) => ({ name: `Progress Wizard: ${label}` });

describe('ProgressWizard', () => {
  beforeEach(() => {
    if ((console.error as Mock)?.mockRestore) (console.error as Mock).mockRestore();

    // jsdom doesn't play with scss, so we manually inject the required CSS for the test
    document.head.insertAdjacentHTML(
      'beforeend',
      '<style>.seldon-progress-wizard-hidden{display:none !important;}</style>',
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Tests
  it('submits with Enter key and navigates steps with keyboard', async () => {
    render(<ConsumerForm stepCount={2} />);
    const [firstLabel, secondLabel] = lastRenderedFieldNamesAndLabels.map(({ label }) => label);
    await userEvent.type(screen.getByLabelText(firstLabel), 'yippee!');
    await userEvent.tab();
    await userEvent.tab();
    expect(screen.getByRole('button', getWizName(DefaultButtonLabels.Start))).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(screen.getByLabelText(secondLabel)).toBeInTheDocument());
    await userEvent.type(screen.getByLabelText(secondLabel), 'hurrayy!!');
    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('button', getWizName(DefaultButtonLabels.Submit))).toBeInTheDocument();
  });

  it('persists field/form data when navigating back and forth through four steps', async () => {
    render(<ConsumerForm />);
    const [firstLabel, secondLabel, thirdLabel, fourthLabel] = lastRenderedFieldNamesAndLabels.map(
      ({ label }) => label,
    );

    await userEvent.type(screen.getByLabelText(firstLabel), 'A');
    await userEvent.click(screen.getByRole('button', getWizName(DefaultButtonLabels.Start)));
    await userEvent.type(screen.getByLabelText(secondLabel), 'B');
    await userEvent.click(screen.getByRole('button', getWizName(DefaultButtonLabels.Continue)));
    await userEvent.type(screen.getByLabelText(thirdLabel), 'C');
    await userEvent.click(screen.getByRole('button', getWizName(DefaultButtonLabels.Continue)));
    await userEvent.type(screen.getByLabelText(fourthLabel), 'D');
    await userEvent.click(screen.getByRole('button', getWizName(DefaultButtonLabels.Back)));
    await userEvent.click(screen.getByRole('button', getWizName(DefaultButtonLabels.Back)));
    await userEvent.click(screen.getByRole('button', getWizName(DefaultButtonLabels.Back)));
    expect(screen.getByLabelText(firstLabel)).toHaveValue('A');
    await userEvent.click(screen.getByRole('button', getWizName(DefaultButtonLabels.Start)));
    expect(screen.getByLabelText(secondLabel)).toHaveValue('B');
    await userEvent.click(screen.getByRole('button', getWizName(DefaultButtonLabels.Continue)));
    expect(screen.getByLabelText(thirdLabel)).toHaveValue('C');
    await userEvent.click(screen.getByRole('button', getWizName(DefaultButtonLabels.Continue)));
    expect(screen.getByLabelText(fourthLabel)).toHaveValue('D');
  });

  it('handles browser navigation buttons (back/forward)', async () => {
    render(<ConsumerForm />);
    const [firstLabel, secondLabel, thirdLabel] = lastRenderedFieldNamesAndLabels.map(({ label }) => label);

    await userEvent.type(screen.getByLabelText(firstLabel), 'A');
    await userEvent.click(screen.getByRole('button', getWizName(DefaultButtonLabels.Start)));
    await userEvent.type(screen.getByLabelText(secondLabel), 'B');
    await userEvent.click(screen.getByRole('button', getWizName(DefaultButtonLabels.Continue)));
    await userEvent.type(screen.getByLabelText(thirdLabel), 'C');

    window.history.back();
    window.dispatchEvent(new PopStateEvent('popstate'));
    await waitFor(() => expect(screen.getByLabelText(secondLabel)).not.toHaveStyle('display: none'));
    expect(screen.getByLabelText(secondLabel)).toHaveValue('B');

    window.history.forward();
    window.dispatchEvent(new PopStateEvent('popstate'));
    await waitFor(() => expect(screen.getByLabelText(thirdLabel)).not.toHaveStyle('display: none'));
    expect(screen.getByLabelText(thirdLabel)).toHaveValue('C');
  });

  it('handles loading state during form submission', async () => {
    const TestWrapper: FC = () => {
      const [fetcherState, setFetcherState] = useState<LoadingState>(LoadingState.Idle);
      const onFormSubmit = vi.fn(async () => {
        setFetcherState(LoadingState.Loading);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setFetcherState(LoadingState.Idle);
      });
      return (
        <ProgressWizard loadingState={fetcherState} onFormSubmit={onFormSubmit}>
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
      <ProgressWizard>
        <Input name="field1" id="field1" labelText="Field1*" />
        <Input name="field2" id="field2" labelText="Field2*" />
        <Input name="field3" id="field3" labelText="Field3*" />
      </ProgressWizard>,
    );
    await userEvent.click(screen.getByRole('button', getWizName(DefaultButtonLabels.Start)));
    await waitFor(() =>
      expect(screen.getByRole('button', getWizName(DefaultButtonLabels.Continue))).toBeInTheDocument(),
    );
    await userEvent.click(screen.getByRole('button', getWizName(DefaultButtonLabels.Continue)));
    await waitFor(() => expect(screen.getByRole('button', getWizName(DefaultButtonLabels.Submit))).toBeInTheDocument());
  });

  it('handles browser navigation buttons (back/forward)', async () => {
    render(<ConsumerForm />);
    const [firstLabel, secondLabel, thirdLabel] = lastRenderedFieldNamesAndLabels.map(({ label }) => label);
    await userEvent.type(screen.getByLabelText(firstLabel), 'A');
    await userEvent.click(screen.getByRole('button', getWizName(DefaultButtonLabels.Start)));
    await userEvent.type(screen.getByLabelText(secondLabel), 'B');
    await userEvent.click(screen.getByRole('button', getWizName(DefaultButtonLabels.Continue)));
    await userEvent.type(screen.getByLabelText(thirdLabel), 'C');

    window.history.back();
    window.dispatchEvent(new PopStateEvent('popstate'));
    await waitFor(() => expect(screen.getByLabelText(secondLabel)).not.toHaveStyle('display: none'));
    expect(screen.getByLabelText(secondLabel)).toHaveValue('B');

    window.history.forward();
    window.dispatchEvent(new PopStateEvent('popstate'));
    await waitFor(() => expect(screen.getByLabelText(thirdLabel)).not.toHaveStyle('display: none'));
    expect(screen.getByLabelText(thirdLabel)).toHaveValue('C');
  });

  it('hides the ProgressIndicator when hideProgressIndicator is true', () => {
    render(
      <ProgressWizard hideProgressIndicator={true}>
        <Input name="name" id="name" labelText="Name*" />
      </ProgressWizard>,
    );
    expect(screen.queryByLabelText('Wizard Progress')).toBeNull();
  });

  it('hides the navigation section when hideNavigation is true', () => {
    render(
      <ProgressWizard hideNavigation={true}>
        <Input name="name" id="name" labelText="Name*" />
      </ProgressWizard>,
    );
    expect(screen.queryByRole('button', { name: /Progress Wizard:/ })).toBeNull();
  });

  it('renders custom labels and translation', () => {
    render(
      <ProgressWizard buttonLabels={{ start: 'Go!', cancel: 'Stop' }}>
        <Input name="email" id="email" labelText="E-mail Address" />
        <Input name="thumb" id="thumb" labelText="Thumb Length" />
      </ProgressWizard>,
    );
    expect(screen.getByRole('button', getWizName('Go!'))).toBeInTheDocument();
    expect(screen.getByRole('button', getWizName('Stop'))).toBeInTheDocument();
  });

  it('handles step with no fields gracefully', () => {
    render(
      <ProgressWizard>
        <div>No fields</div>
      </ProgressWizard>,
    );
    expect(screen.getByText('No fields')).toBeInTheDocument();
  });

  it('handles no steps gracefully', () => {
    const consoleWarn = console.warn;
    console.warn = vi.fn();
    render(<ProgressWizard />);
    // The component keeps step containers in the DOM but hides them; assert the content area has no visible children
    const content = screen
      .getByRole('region', { name: /Form Wizard/i })
      ?.querySelector('.seldon-progress-wizard__content');
    expect(content).toBeTruthy();
    if (content) expect(content).toBeEmptyDOMElement();
    expect(console.warn).toHaveBeenCalled();
    console.warn = consoleWarn;
  });

  describe('calls onCancel, onBack, and onContinue props and prevents navigation if they return false', () => {
    it.each([
      {
        task: 'Cancel',
        startStep: 0,
        progressEvidence: 'Cancelled',
        description: 'calls onCancel and prevents navigation if it returns false, then allows if true',
        prepFunction: () => {
          document.body.insertAdjacentHTML(
            'afterbegin',
            `<div id="hidden-cancelled" class="seldon-progress-wizard-hidden">Cancelled</div>`,
          );
        },
      },
      {
        task: 'Continue',
        startStep: 1,
        progressEvidence: 'Real Age*',
        description: 'calls onContinue and prevents navigation if it returns false, then allows if true',
      },
      {
        task: 'Back',
        startStep: 1,
        progressEvidence: 'Name*',
        description: 'calls onBack and prevents navigation if it returns false, then allows if true',
      },
    ] as const)('handles $task button: $description', async ({ task, startStep, progressEvidence, prepFunction }) => {
      cleanup();
      const onCancelMock = vi
        .fn()
        .mockReturnValueOnce(false)
        .mockImplementationOnce(() => {
          // this is a little dumb, but at least we're testing the others normally with the actual handler logic
          document.body.querySelector('#hidden-cancelled')?.classList.remove('seldon-progress-wizard-hidden');
          return true;
        });
      const onBackMock = vi.fn().mockReturnValueOnce(false).mockReturnValueOnce(true);
      const onContinueMock = vi.fn().mockReturnValueOnce(false).mockReturnValueOnce(true);

      render(
        <ProgressWizard
          onCancel={onCancelMock}
          onBack={onBackMock}
          onContinue={onContinueMock}
          defaultStepIndex={startStep}
        >
          <Input name="name" id="name" labelText="Name*" />
          <Input name="age" id="age" labelText="Age*" />
          <Input name="realAge" id="realAge" labelText="Real Age*" />
        </ProgressWizard>,
      );

      if (prepFunction) prepFunction();
      const mocks = { onCancelMock, onContinueMock, onBackMock };

      await userEvent.click(screen.getByRole('button', getWizName(task)));
      expect(mocks[`on${task}Mock`]).toHaveBeenCalled();

      // When prevented, there should be no progressEvidence injected
      expect(screen.getByText(progressEvidence)).not.toBeVisible();

      await userEvent.click(screen.getByRole('button', getWizName(task)));
      expect(mocks[`on${task}Mock`]).toHaveBeenCalled();
      // After allowing, the element should be present
      expect(screen.getByText(progressEvidence)).toBeVisible();
    });
  });
});
