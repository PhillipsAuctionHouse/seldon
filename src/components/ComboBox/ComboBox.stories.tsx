import { Meta } from '@storybook/react';
import React from 'react';
import Button from '../Button/Button';
import { Drawer } from '../Drawer';
import ComboBox, { ComboBoxProps } from './ComboBox';
import { ComboBoxOption } from './types';

const meta = {
  title: 'Components/ComboBox',
  component: ComboBox,
} satisfies Meta<typeof ComboBox>;

export default meta;

const birthdays: ComboBoxOption[] = Array.from({ length: 2025 - 1990 + 1 }, (_, i) => {
  const year = 1990 + i;
  return {
    value: `${year}`,
    label: `${year}`,
  };
});

export const Playground = (props: ComboBoxProps) => {
  const [value, setValue] = React.useState<string>('');

  return (
    <div style={{ height: '300px', width: '400px' }}>
      <ComboBox {...props} value={value} onChange={setValue} />
    </div>
  );
};
Playground.args = {
  options: birthdays,
  id: 'birthdays-combo-box',
  labelText: 'Birth Year',
};

Playground.argTypes = {
  options: { control: 'object' },
  id: { control: 'text' },
  labelText: { control: 'text' },
  invalid: { control: 'boolean' },
  invalidText: { control: 'text' },
  placeholder: { control: 'text' },
  ariaLabelInput: { control: 'text' },
  disabled: { control: 'boolean' },
  readOnly: { control: 'boolean' },
  popoverContainerRef: { control: false },
  getOptionLabel: { control: false },
  renderOption: { control: false },
  onChange: { control: false },
  value: { control: false },
};

export const ComboBoxInDrawer = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [drawerValue, setDrawerValue] = React.useState('');
  const [outsideValue, setOutsideValue] = React.useState('');
  const drawerContentRef = React.useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3>ComboBox Outside Drawer</h3>
        <div style={{ width: '300px' }}>
          <ComboBox
            options={birthdays}
            id="outside-birthdays-combo-box"
            labelText="Birth Year (Outside)"
            value={outsideValue}
            onChange={(newValue) => setOutsideValue(newValue)}
          />
        </div>
      </div>

      <Button onClick={() => setIsOpen(true)}>Open Drawer with ComboBox</Button>

      <Drawer
        title="Select Birth Year"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setDrawerValue('');
        }}
      >
        <div style={{ padding: '20px', width: '300px' }} ref={drawerContentRef}>
          <ComboBox
            options={birthdays}
            id="drawer-birthdays-combo-box"
            labelText="Birth Year (In Drawer)"
            value={drawerValue}
            onChange={(newValue) => setDrawerValue(newValue)}
            popoverContainerRef={drawerContentRef}
          />
        </div>
      </Drawer>
    </div>
  );
};

const countries: ComboBoxOption[] = [
  {
    value: 'US',
    label: 'USA',
    displayValue: 'United States of America',
    filterTerms: ['US of A', 'The United States'],
  },
  {
    value: 'GB',
    label: 'GBR',
    displayValue: 'United Kingdom',
    filterTerms: ['Britain', 'England', 'UK', 'Great Britain'],
  },
  {
    value: 'FR',
    label: 'FRA',
    displayValue: 'France',
    filterTerms: ['French', 'République française'],
  },
  {
    value: 'DE',
    label: 'DEU',
    displayValue: 'Germany',
    filterTerms: ['Deutschland', 'Federal Republic of Germany'],
  },
  {
    value: 'CA',
    label: 'CAN',
    displayValue: 'Canada',
    filterTerms: ['Canadian', 'Canadien'],
  },
  {
    value: 'AU',
    label: 'AUS',
    displayValue: 'Australia',
    filterTerms: ['Commonwealth of Australia'],
  },
];

export const GetOptionLabelExample = () => {
  const [value, setValue] = React.useState<string>('');

  const customGetOptionLabel = (option: ComboBoxOption) => {
    return `${option.label} - ${option.displayValue}`;
  };

  return (
    <div style={{ width: '400px' }}>
      <ComboBox
        options={countries}
        id="get-option-label-combo"
        labelText="Country"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        getOptionLabel={customGetOptionLabel}
        placeholder="Select or search a country"
      />
      <div style={{ marginTop: '20px' }}>
        <p>
          This example demonstrates a custom <code>getOptionLabel</code> function that combines label and displayValue.
        </p>
        <p>Selected value: {value || 'none'}</p>
      </div>
    </div>
  );
};

export const CustomRendering = () => {
  const [value, setValue] = React.useState<string>('');

  const renderOption = (option: ComboBoxOption) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span
        style={{
          fontWeight: 'bold',
          padding: '2px 4px',
          background: '#f0f0f0',
          borderRadius: '4px',
        }}
      >
        {option.label}
      </span>
      <span>{option.displayValue}</span>
    </div>
  );

  return (
    <div style={{ width: '400px' }}>
      <ComboBox
        options={countries}
        id="custom-rendering-combo"
        labelText="Country"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderOption={renderOption}
        placeholder="Select or search a country"
      />
      <div style={{ marginTop: '20px' }}>
        <p>
          This example demonstrates a custom <code>renderOption</code> function to style dropdown items.
        </p>
        <p>Selected value: {value || 'none'}</p>
      </div>
    </div>
  );
};

export const FilterTermsExample = () => {
  const [value, setValue] = React.useState<string>('');

  return (
    <div style={{ width: '400px' }}>
      <ComboBox
        options={countries}
        id="filter-terms-combo"
        labelText="Country"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        placeholder="Try typing 'united', 'deutschland', etc."
      />
      <div style={{ marginTop: '20px' }}>
        <p>This example demonstrates filtering on additional terms. Try typing:</p>
        <ul>
          <li>united - should find United States and United Kingdom</li>
          <li>deutsch - should find Germany</li>
          <li>commonwealth - should find Australia</li>
        </ul>
        <p>Selected value: {value || 'none'}</p>
      </div>
    </div>
  );
};

export const Phone = () => {
  const [value, setValue] = React.useState<string>('');
  // Track the last explicitly selected country to preserve it
  const lastSelectedRef = React.useRef('');

  const phoneCodes: ComboBoxOption[] = [
    { value: 'US', label: '(US) +1', displayValue: '+1', filterTerms: ['United States', 'America', 'USA'] },
    { value: 'CA', label: '(CA) +1', displayValue: '+1', filterTerms: ['Canada', 'Canadian'] },
    { value: 'GB', label: '(GB) +44', displayValue: '+44', filterTerms: ['United Kingdom', 'Britain', 'England'] },
    { value: 'DE', label: '(DE) +49', displayValue: '+49', filterTerms: ['Germany', 'German', 'Deutschland'] },
    { value: 'FR', label: '(FR) +33', displayValue: '+33', filterTerms: ['France', 'French'] },
  ];

  // Custom onChange to track explicit selections
  const handleChange = (newValue: string, option: ComboBoxOption | null) => {
    setValue(newValue);

    // If this is a selection from the dropdown (has option)
    // track it as an explicit selection
    if (option) {
      lastSelectedRef.current = newValue;
    }
  };

  // Handle blur to preserve selection
  const handleBlur = () => {
    // If we have a tracked selection and it doesn't match current value
    if (lastSelectedRef.current && lastSelectedRef.current !== value) {
      // Find the current display value
      const currentOption = phoneCodes.find((opt) => opt.value === value);
      const selectedOption = phoneCodes.find((opt) => opt.value === lastSelectedRef.current);

      // If they have the same display value (like both "+1"),
      // restore our explicit selection
      if (currentOption?.displayValue === selectedOption?.displayValue) {
        setValue(lastSelectedRef.current);
      }
    }
  };

  return (
    <div style={{ width: '400px' }}>
      <ComboBox
        options={phoneCodes}
        id="phone-code-combo"
        labelText="Phone Country Code"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Select country code"
      />
      <div style={{ marginTop: '20px' }}>
        <p>This example demonstrates selection of options with duplicate display values.</p>
        <p>Selected value: {value || 'none'}</p>
        <p>Last explicitly selected: {lastSelectedRef.current || 'none'}</p>
        <p>Note: Both US and Canada have +1 as display value, but selection is preserved on blur.</p>
      </div>
    </div>
  );
};
