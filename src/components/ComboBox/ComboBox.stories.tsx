import { Meta } from '@storybook/react';
import React from 'react';
import Button from '../Button/Button';
import { Drawer } from '../Drawer';
import ComboBox, { ComboBoxOption, ComboBoxProps } from './ComboBox';

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
  const [inputValue, setInputValue] = React.useState('');
  return (
    <div style={{ height: '300px', width: '400px' }}>
      <ComboBox {...props} value={value} onChange={setValue} inputValue={inputValue} setInputValue={setInputValue} />
    </div>
  );
};
Playground.args = {
  options: birthdays,
  id: 'birthdays-combo-box',
  labelText: 'Birth Year',
  allowCustomValue: true,
};

Playground.argTypes = {
  options: { control: 'object' },
  id: { control: 'text' },
  labelText: { control: 'text' },
  allowCustomValue: { control: 'boolean' },
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
  setInputValue: { control: false },
  value: { control: false },
  inputValue: { control: false },
};

export const ComboBoxInDrawer = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [drawerValue, setDrawerValue] = React.useState('');
  const [drawerInputValue, setDrawerInputValue] = React.useState('');
  const [outsideValue, setOutsideValue] = React.useState('');
  const [outsideInputValue, setOutsideInputValue] = React.useState('');
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
            inputValue={outsideInputValue}
            setInputValue={setOutsideInputValue}
          />
        </div>
      </div>

      <Button onClick={() => setIsOpen(true)}>Open Drawer with ComboBox</Button>

      <Drawer
        title="Select Birth Year"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setDrawerInputValue('');
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
            inputValue={drawerInputValue}
            setInputValue={setDrawerInputValue}
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
  const [inputValue, setInputValue] = React.useState('');

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
        inputValue={inputValue}
        setInputValue={setInputValue}
        getOptionLabel={customGetOptionLabel}
        placeholder="Select or search a country"
      />
      <div style={{ marginTop: '20px' }}>
        <p>
          This example demonstrates a custom <code>getOptionLabel</code> function that combines label and displayValue.
        </p>
        <p>Selected value: {value || 'none'}</p>
        <p>Input value: {inputValue}</p>
      </div>
    </div>
  );
};

export const CustomRendering = () => {
  const [value, setValue] = React.useState<string>('');
  const [inputValue, setInputValue] = React.useState('');

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
        inputValue={inputValue}
        setInputValue={setInputValue}
        renderOption={renderOption}
        placeholder="Select or search a country"
      />
      <div style={{ marginTop: '20px' }}>
        <p>
          This example demonstrates a custom <code>renderOption</code> function to style dropdown items.
        </p>
        <p>Selected value: {value || 'none'}</p>
        <p>Input value: {inputValue}</p>
      </div>
    </div>
  );
};

export const FilterTermsExample = () => {
  const [value, setValue] = React.useState<string>('');
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div style={{ width: '400px' }}>
      <ComboBox
        options={countries}
        id="filter-terms-combo"
        labelText="Country"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        inputValue={inputValue}
        setInputValue={setInputValue}
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

export const AllowCustomValue = () => {
  const [value, setValue] = React.useState<string>('');
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div style={{ width: '400px' }}>
      <ComboBox
        options={countries}
        id="allow-custom-value-combo"
        labelText="Country"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        inputValue={inputValue}
        setInputValue={setInputValue}
        allowCustomValue={true}
        placeholder="Type anything or select from list"
      />
      <div style={{ marginTop: '20px' }}>
        <p>Free Solo Mode allows entering custom values not in the list.</p>
        <p>Selected value: {value || 'none'}</p>
        <p>Input value: {inputValue}</p>
      </div>
    </div>
  );
};

export const Phone = () => {
  const [value, setValue] = React.useState<string>('');
  const [inputValue, setInputValue] = React.useState('');

  const phoneCodes: ComboBoxOption[] = [
    { value: 'US', label: '(US) +1', displayValue: '+1', filterTerms: ['United States', 'America', 'USA'] },
    { value: 'CA', label: '(CA) +1', displayValue: '+1', filterTerms: ['Canada', 'Canadian'] },
    { value: 'GB', label: '(GB) +44', displayValue: '+44', filterTerms: ['United Kingdom', 'Britain', 'England'] },
    { value: 'DE', label: '(DE) +49', displayValue: '+49', filterTerms: ['Germany', 'German', 'Deutschland'] },
    { value: 'FR', label: '(FR) +33', displayValue: '+33', filterTerms: ['France', 'French'] },
  ];

  return (
    <div style={{ width: '400px' }}>
      <ComboBox
        options={phoneCodes}
        id="phone-code-combo"
        labelText="Phone Country Code"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        inputValue={inputValue}
        setInputValue={setInputValue}
        placeholder="Select country code"
      />
      <div style={{ marginTop: '20px' }}>
        <p>This example demonstrates selection of options with duplicate display values.</p>
        <p>Selected value: {value || 'none'}</p>
        <p>Input value: {inputValue}</p>
        <p>Note: Both US and Canada have +1 as display value, but are distinct options.</p>
      </div>
    </div>
  );
};
