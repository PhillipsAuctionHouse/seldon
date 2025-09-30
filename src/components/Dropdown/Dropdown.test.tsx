import Dropdown from './Dropdown';
import { runCommonTests } from '../../utils/testUtils';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SupportedLanguages } from '../../types/commonTypes';
import { forwardRef } from 'react';

const languages = [
  { label: 'English', value: SupportedLanguages.en },
  { label: '中文', value: SupportedLanguages.zh },
];

const sharedProps = {
  options: languages,
  label: 'Select a language',
  id: 'test',
  onValueChange: vitest.fn(),
};

describe('Dropdown', () => {
  const RefDropdown = forwardRef<HTMLButtonElement, React.ComponentProps<typeof Dropdown>>((props, ref) => (
    <Dropdown {...props} ref={ref} options={languages} value={SupportedLanguages.en} />
  ));
  RefDropdown.displayName = 'RefDropdown';
  runCommonTests(RefDropdown, 'Dropdown');

  it.each([
    { value: SupportedLanguages.en, expectedLabel: 'English' },
    { value: SupportedLanguages.zh, expectedLabel: '中文' },
  ])('should render the value label "$expectedLabel" in the trigger', ({ value, expectedLabel }) => {
    render(<Dropdown {...sharedProps} value={value} />);
    const trigger = screen.getByRole('combobox', { name: sharedProps.label });
    expect(trigger).toBeInTheDocument();
    expect(within(trigger).getByText(expectedLabel)).toBeInTheDocument();
  });

  it('should render the dropdown list after clicking the trigger', async () => {
    render(<Dropdown {...sharedProps} value={SupportedLanguages.en} />);
    const trigger = screen.getByRole('combobox', { name: sharedProps.label });
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    languages.forEach(({ label }) => {
      expect(screen.getByRole('option', { name: label })).toBeInTheDocument();
    });
  });

  it.each([
    { value: SupportedLanguages.en, disabledLabel: 'English' },
    { value: SupportedLanguages.zh, disabledLabel: '中文' },
  ])(
    'should render the default value option "$disabledLabel" in the list as disabled',
    async ({ value, disabledLabel }) => {
      render(<Dropdown {...sharedProps} value={value} />);
      const trigger = screen.getByRole('combobox', { name: sharedProps.label });
      await userEvent.click(trigger);
      const option = screen.getByRole('option', { name: disabledLabel });
      expect(option).toBeInTheDocument();
      expect(option).toHaveAttribute('aria-disabled', 'true');
    },
  );

  it('should trigger a callback on language change', async () => {
    const onValueChangeMock = vitest.fn();
    render(<Dropdown {...sharedProps} value={SupportedLanguages.en} onValueChange={onValueChangeMock} />);
    const trigger = screen.getByRole('combobox', { name: sharedProps.label });
    await userEvent.click(trigger);
    const option = screen.getByRole('option', { name: '中文' });
    await userEvent.click(option);
    expect(onValueChangeMock).toHaveBeenCalled();
  });

  it('disabled dropdown should not pop selection', async () => {
    render(<Dropdown {...sharedProps} value={SupportedLanguages.zh} disabled />);
    const trigger = screen.getByRole('combobox', { name: sharedProps.label });
    expect(trigger).toBeDisabled();
    await userEvent.click(trigger);
    expect(screen.queryByRole('option', { name: '中文' })).not.toBeInTheDocument();
  });
});
