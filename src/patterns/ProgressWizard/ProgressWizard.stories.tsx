import ProgressWizard, { type ProgressWizardProps } from './ProgressWizard';
import { type Meta } from '@storybook/react';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import { type ArgTypes } from '@storybook/react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { LoadingState } from './types';
import { Text, TextAlignments, TextVariants } from '../../components/Text';

const argTypes: ArgTypes = {
  isFullHeight: { control: { type: 'boolean', defaultValue: true } },
  hideNavigation: { control: { type: 'boolean' } },
  hideProgressIndicator: { control: { type: 'boolean' } },
  isEnableHistoryManagement: { control: { type: 'boolean' } },
  currentStepIndex: { control: { type: 'number' } },
  defaultStepIndex: { control: { type: 'number' } },
  shouldAllowContinue: { control: { type: 'boolean' } },
  loadingState: {
    control: { type: 'select' },
    options: ['idle', 'submitting', 'loading'],
  },
  buttonLabels: {
    control: { type: 'object' },
    description: 'Object of button labels. Keys are start / cancel / back / continue / submit',
  },
  onContinue: { action: 'onContinue' },
  onBack: { action: 'onBack' },
  onCancel: { action: 'onCancel' },
  onFormSubmit: { action: 'onFormSubmit' },
};

const meta: Meta<typeof ProgressWizard> = {
  title: 'Patterns/ProgressWizard',
  component: ProgressWizard,
  argTypes,
  parameters: {
    docs: { iframeHeight: 800 },
  },
};

const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const gentleTitleStyle = {
  padding: 8,
  background: 'aliceblue',
  textAlign: TextAlignments.center,
  borderRadius: 8,
  marginBottom: 16,
};
const gentleMessageStyle = {
  padding: '5px 8px',
  borderRadius: '8px',
  background: 'white',
  position: 'fixed',
  left: '50%',
  top: '5%',
  transform: 'translate(-50%, 0)',
  opacity: '0',
  transition: 'opacity 0.3s',
};

// can we use this instead of the alerts everywhere? or toasts?
const gentleMessage = (text: string) => () => {
  const p = document.createElement('p');
  Object.assign(p.style, gentleMessageStyle);
  p.textContent = text;
  document.body.appendChild(p);
  setTimeout(() => {
    p.style.opacity = '1';
    setTimeout(() => {
      p.style.opacity = '0';
      setTimeout(() => p.remove(), 300);
    }, 2000);
  }, 10);
};

const callbacks = {
  onContinue: gentleMessage('onContinue called'),
  onCancel: gentleMessage('onCancel called'),
  onFormSubmit: gentleMessage('onFormSubmit called'),
  onBack: gentleMessage('onBack called'),
};

const genOnContinue = (shouldContinue: boolean) => () => {
  gentleMessage('onContinue called')();
  return shouldContinue !== false ? void 0 : false;
};

const { onContinue, onCancel, onFormSubmit, onBack } = callbacks;

export const BasicWizard = (props: ProgressWizardProps) => {
  const [formData, setFormData] = useState({ name: '', age: '' });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`Submitted:\n${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ height: '100vh' }}>
      <ProgressWizard
        onContinue={onContinue}
        onCancel={onCancel}
        onFormSubmit={onFormSubmit}
        onBack={onBack}
        {...props}
      >
        <Input
          id="name"
          labelText="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          id="age"
          labelText="Age"
          type="number"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
      </ProgressWizard>
    </form>
  );
};
BasicWizard.argTypes = argTypes;

export const ValidationWizardWithOnBack = (props: ProgressWizardProps) => {
  const [formData, setFormData] = useState({ email: '' });
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.email.match(emailValidationRegex)) {
      setError('Please enter a valid email address.');
    } else {
      setError('');
      alert(`Native form submit!\nValues:\n${JSON.stringify(formData, null, 2)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ProgressWizard onFormSubmit={onFormSubmit} {...props}>
        <Input
          name="email"
          id="email"
          labelText="E-mail Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          invalid={!!error}
          invalidText={error}
        />
      </ProgressWizard>
    </form>
  );
};
ValidationWizardWithOnBack.storyName = 'Validation Wizard With `onFormSubmit` hook';
ValidationWizardWithOnBack.argTypes = argTypes;

export const AsyncValidationWizardWithAllCallbacks = (props: ProgressWizardProps) => {
  const initialState = { email: '', confirm: '' };
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const emailIsValid = useRef(false);

  const validate = useCallback(async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));
    const newErrors = {
      email: formData.email.match(emailValidationRegex) ? '' : 'Please enter a valid email address.',
      confirm: emailIsValid.current ? (formData.email === formData.confirm ? '' : 'Emails must match.') : '',
    };

    setLoading(false);
    setErrors(newErrors);
    emailIsValid.current = newErrors.email === '';
    const result = !newErrors.email && !newErrors.confirm;
    return result;
  }, [formData]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (await validate()) alert(`Submitted:\n${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ProgressWizard
        loadingState={loading ? LoadingState.Loading : LoadingState.Idle}
        onBack={() => {
          setErrors(initialState);
          emailIsValid.current = false;
          onBack();
        }}
        onCancel={onCancel}
        onContinue={async () => genOnContinue(await validate())()}
        onFormSubmit={onFormSubmit}
        {...props}
      >
        <Input
          name="email"
          id="email"
          labelText="Email*"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            setErrors({ ...errors, email: '' });
          }}
          invalid={!!errors.email}
          invalidText={errors.email}
        />
        <Input
          name="confirm"
          id="confirm"
          labelText="Confirm Email*"
          value={formData.confirm}
          onChange={(e) => {
            setFormData({ ...formData, confirm: e.target.value });
            setErrors({ ...errors, confirm: '' });
          }}
          invalid={!!errors.confirm}
          invalidText={errors.confirm}
        />
      </ProgressWizard>
    </form>
  );
};
AsyncValidationWizardWithAllCallbacks.argTypes = argTypes;

export const ShouldAllowContinue = (props: ProgressWizardProps) => {
  const [formData, setFormData] = useState({ email: '' });
  const [error, setError] = useState('');

  const validateLocal = useCallback(() => {
    const isValid = formData.email.match(emailValidationRegex);
    if (formData.email) setError(isValid ? '' : "doesn't really look valid");
    return !!isValid;
  }, [formData.email]);

  const shouldAllowContinue = useMemo(() => validateLocal(), [validateLocal]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onFormSubmit();
      }}
    >
      <div style={gentleTitleStyle}>No validation on submit, controlled instead by `shouldAllowContinue` prop</div>
      <ProgressWizard shouldAllowContinue={shouldAllowContinue} onFormSubmit={onFormSubmit} {...props}>
        <>
          <Input
            name="email"
            id="email-should-continue"
            labelText="E-mail Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            invalid={!!error}
            invalidText={error}
          />
        </>
      </ProgressWizard>
    </form>
  );
};
ShouldAllowContinue.argTypes = argTypes;

export const ExternalStepControlWizard = (props: ProgressWizardProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const steps = [
    <Input key="step1" name="step1" id="step1" labelText="Step 1" />,
    <Input key="step2" name="step2" id="step2" labelText="Step 2" />,
    <Input key="step3" name="step3" id="step3" labelText="Step 3" />,
  ];

  const vExtraButtonStyling = {
    padding: '8px 20px',
    borderRadius: 6,
    fontWeight: 500,
    transition: 'background 0.2s, color 0.2s',
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <button
          type="button"
          onClick={() => setCurrentStepIndex((i) => Math.max(i - 1, 0))}
          disabled={currentStepIndex === 0}
          style={{
            ...vExtraButtonStyling,
            background: currentStepIndex === 0 ? '#f3f6fa' : '#e3edfa',
            color: currentStepIndex === 0 ? '#b0b0b0' : '#1a3a6b',
          }}
        >
          ◀ Previous
        </button>
        <button
          type="button"
          onClick={() => setCurrentStepIndex((i) => Math.min(i + 1, steps.length - 1))}
          disabled={currentStepIndex === steps.length - 1}
          style={{
            ...vExtraButtonStyling,
            background: currentStepIndex === steps.length - 1 ? '#f3f6fa' : '#e3edfa',
            color: currentStepIndex === steps.length - 1 ? '#b0b0b0' : '#1a3a6b',
            cursor: currentStepIndex === steps.length - 1 ? 'not-allowed' : 'pointer',
            marginLeft: 12,
          }}
        >
          Next ▶
        </button>
        <span style={{ marginLeft: 16 }}>Current Step: {currentStepIndex + 1}</span>
      </div>
      <div style={gentleTitleStyle}>External Step Control Demo</div>
      <ProgressWizard currentStepIndex={currentStepIndex} hideNavigation {...props}>
        {steps}
      </ProgressWizard>
    </div>
  );
};
ExternalStepControlWizard.argTypes = argTypes;

export const TraditionalFormWizard = (props: ProgressWizardProps) => {
  return (
    <form
      id="traditional-form"
      onSubmit={(e) => {
        e.preventDefault();
        try {
          const formData = new FormData(e.currentTarget as HTMLFormElement);
          const objectivelyFormData = Object.fromEntries(formData.entries());
          console.log(`Submitted:\n${JSON.stringify(objectivelyFormData, null, 2)}`);
        } catch (e) {
          alert('Submitted (could not read form data)');
          console.error(e);
        }
      }}
    >
      <div style={gentleTitleStyle}>
        Plain old <code>&lt;form&gt;</code> and <code>&lt;input&gt;</code> elements with ProgressWizard
      </div>

      <ProgressWizard {...props}>
        <span>
          <label htmlFor="a">Input A</label>
          <br />
          <input name="a" id="a" />
        </span>
        <span>
          <label htmlFor="b">Input B</label>
          <br />
          <input name="b" id="b" />
        </span>
        <span>
          <label htmlFor="c">Input C</label>
          <br />
          <input name="c" id="c" />
        </span>
      </ProgressWizard>
    </form>
  );
};
TraditionalFormWizard.argTypes = argTypes;

export const MobileFormStory = (props: ProgressWizardProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    dateOfBirth: '',
    gender: '',
    occupation: '',
    company: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalConditions: '',
    allergies: '',
    medications: '',
    insuranceProvider: '',
    insuranceNumber: '',
    comments: '',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`Mobile Form Submitted:\n${JSON.stringify(formData, null, 2)}`);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={gentleTitleStyle}>Mobile Registration Form </div>
        <ProgressWizard onContinue={onContinue} onCancel={onCancel} onFormSubmit={onFormSubmit} {...props}>
          <div>
            {/* Personal Information Section */}
            <Text variant={TextVariants.heading4} style={{ marginBottom: '16px', marginTop: '8px' }}>
              Personal Information
            </Text>

            <Input
              name="firstName"
              id="firstName"
              labelText="First Name *"
              value={formData.firstName}
              onChange={(e) => updateFormData('firstName', e.target.value)}
              required
            />

            <Input
              name="lastName"
              id="lastName"
              labelText="Last Name *"
              value={formData.lastName}
              onChange={(e) => updateFormData('lastName', e.target.value)}
              required
            />

            <Input
              name="email"
              id="email"
              labelText="Email Address *"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              required
            />

            <Input
              name="phone"
              id="phone"
              labelText="Phone Number *"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData('phone', e.target.value)}
              required
            />

            <Input
              name="dateOfBirth"
              id="dateOfBirth"
              labelText="Date of Birth *"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
              required
            />

            <Select
              name="gender"
              id="gender"
              labelText="Gender"
              value={formData.gender}
              onChange={(e) => updateFormData('gender', e.target.value)}
            >
              <option value="placeholder" disabled>
                Select Gender
              </option>
              <option value="non-binary">Non-binary</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </Select>
          </div>
          {/* Address Information Section */}
          <div>
            <Text variant={TextVariants.heading4} style={{ marginBottom: '16px', marginTop: '24px' }}>
              Address Information
            </Text>

            <Input
              name="address"
              id="address"
              labelText="Street Address *"
              value={formData.address}
              onChange={(e) => updateFormData('address', e.target.value)}
              required
            />

            <Input
              name="city"
              id="city"
              labelText="City *"
              value={formData.city}
              onChange={(e) => updateFormData('city', e.target.value)}
              required
            />

            <Input
              name="state"
              id="state"
              labelText="State/Province *"
              value={formData.state}
              onChange={(e) => updateFormData('state', e.target.value)}
              required
            />

            <Input
              name="zipCode"
              id="zipCode"
              labelText="ZIP/Postal Code *"
              value={formData.zipCode}
              onChange={(e) => updateFormData('zipCode', e.target.value)}
              required
            />

            <Select
              name="country"
              id="country"
              labelText="Country *"
              value={formData.country}
              onChange={(e) => updateFormData('country', e.target.value)}
              required
            >
              <option value="">Select Country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="JP">Japan</option>
              <option value="other">Other</option>
            </Select>
          </div>
        </ProgressWizard>
      </form>
    </div>
  );
};

MobileFormStory.storyName = 'Mobile Form - Long Content';
MobileFormStory.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};
MobileFormStory.argTypes = argTypes;

export const Playground: {
  render: (props: ProgressWizardProps) => JSX.Element;
  args: ProgressWizardProps;
  argTypes: ArgTypes;
} = {
  render: ({
    hideNavigation,
    hideProgressIndicator,
    isEnableHistoryManagement,
    currentStepIndex,
    defaultStepIndex,
    loadingState,
    shouldAllowContinue,
    buttonLabels,
    onBack,
    onCancel,
    onContinue,
    onFormSubmit,
  }) => {
    return (
      <form
        id="progress-wizard-playground-form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          try {
            const formData = new FormData(e.currentTarget as HTMLFormElement);
            const objectivelyFormData = Object.fromEntries(formData.entries());
            console.log(`Submitted:\n${JSON.stringify(objectivelyFormData, null, 2)}`);
          } catch (e) {
            alert('Submitted (could not read form data)');
            console.error(e);
          }
        }}
      >
        <ProgressWizard
          shouldAllowContinue={shouldAllowContinue}
          hideNavigation={hideNavigation}
          hideProgressIndicator={hideProgressIndicator}
          isEnableHistoryManagement={isEnableHistoryManagement}
          currentStepIndex={currentStepIndex}
          defaultStepIndex={defaultStepIndex}
          loadingState={loadingState}
          buttonLabels={buttonLabels}
          onBack={onBack}
          onCancel={onCancel}
          onContinue={onContinue}
          onFormSubmit={onFormSubmit}
        >
          <Input name="field1" id="field1" labelText="Field 1" />
          <Input name="field2" id="field2" labelText="Field 2" />
        </ProgressWizard>
      </form>
    );
  },
  args: {},
  argTypes,
};

export default meta;
