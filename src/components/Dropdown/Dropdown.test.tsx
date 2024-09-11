import Dropdown from './Dropdown';
import { runCommonTests } from '../../utils/testUtils';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SupportedLanguages } from '../../types/commonTypes';

const languages = [
  { label: 'English', value: SupportedLanguages.en },
  { label: '中文', value: SupportedLanguages.zh },
];

describe('Dropdown', () => {
  runCommonTests((props) => <Dropdown {...props} options={languages} value={SupportedLanguages.en} />, 'Dropdown');

  it('should render the default value label in the trigger', () => {
    render(
      <Dropdown
        options={languages}
        value={SupportedLanguages.en}
        label="Select a language"
        id="test"
        onValueChange={vitest.fn()}
      />,
    );

    const trigger = screen.getByRole('combobox', {
      name: 'Select a language',
    });

    expect(trigger).toBeInTheDocument();
    expect(within(trigger).getByText('English')).toBeInTheDocument();
  });

  it('should render the initial value in the trigger', () => {
    render(
      <Dropdown
        options={languages}
        value={SupportedLanguages.zh}
        label="Select a language"
        id="test"
        onValueChange={vitest.fn()}
      />,
    );

    const trigger = screen.getByRole('combobox', {
      name: 'Select a language',
    });

    expect(trigger).toBeInTheDocument();
    expect(within(trigger).getByText('中文')).toBeInTheDocument();
  });

  it('should render the dropdown list after cliking the trigger', async () => {
    render(
      <Dropdown
        options={languages}
        value={SupportedLanguages.en}
        label="Select a language"
        id="test"
        onValueChange={vitest.fn()}
      />,
    );

    const trigger = screen.getByRole('combobox', {
      name: 'Select a language',
    });
    expect(trigger).toBeInTheDocument();

    await userEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('option', { name: 'English' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '中文' })).toBeInTheDocument();
  });

  it('should render the default value option in the list as disabled', async () => {
    render(
      <Dropdown
        options={languages}
        value={SupportedLanguages.en}
        label="Select a language"
        id="test"
        onValueChange={vitest.fn()}
      />,
    );

    const trigger = screen.getByRole('combobox', {
      name: 'Select a language',
    });
    expect(trigger).toBeInTheDocument();

    await userEvent.click(trigger);

    expect(screen.getByRole('option', { name: 'English' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'English' })).toHaveAttribute('aria-disabled', 'true');
  });

  it('should trigger a callback on language change', async () => {
    const onValueChangeMock = vitest.fn();
    render(
      <Dropdown
        options={languages}
        value={SupportedLanguages.en}
        label="Select a language"
        id="test"
        onValueChange={onValueChangeMock}
      />,
    );

    const trigger = screen.getByRole('combobox', {
      name: 'Select a language',
    });
    expect(trigger).toBeInTheDocument();

    await userEvent.click(trigger);

    const option = screen.getByRole('option', { name: '中文' });

    expect(option).toBeInTheDocument();

    await userEvent.click(option);
    expect(onValueChangeMock).toHaveBeenCalled();
  });
});
