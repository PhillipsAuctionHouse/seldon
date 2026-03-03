import LanguageSelector, { LanguageOption } from './LanguageSelector';
import { runCommonTests } from '../../utils/testUtils';
import { SupportedLanguages } from '../../types/commonTypes';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { getLanguageLabel } from './utils';

describe('LanguageSelector', () => {
  runCommonTests(LanguageSelector, 'LanguageSelector');
});

const languageOptions: LanguageOption[] = [
  { label: 'English', value: SupportedLanguages.en },
  { label: '中文', value: SupportedLanguages.zh },
];

describe('LanguageSelector', () => {
  test('renders language options correctly', async () => {
    const currentLanguage = SupportedLanguages.en;
    const onLanguageChange = vitest.fn();

    render(
      <LanguageSelector
        languageOptions={languageOptions}
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
      />,
    );

    const languageSelectorButton = screen.getByRole('combobox', { name: /english/i });
    await userEvent.click(languageSelectorButton);

    const languageOptionZh = screen.getByRole('option', { name: '中文' });
    await userEvent.click(languageOptionZh);

    expect(onLanguageChange).toHaveBeenCalledWith('zh');
  });
  test('switch from Chinese to english', async () => {
    const currentLanguage = SupportedLanguages.zh;
    const onLanguageChange = vitest.fn();

    render(
      <LanguageSelector
        languageOptions={languageOptions}
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
      />,
    );

    const languageSelectorButton = screen.getByRole('combobox', { name: '中文' });
    await userEvent.click(languageSelectorButton);

    const languageOptionEn = screen.getByRole('option', { name: /english/i });
    await userEvent.click(languageOptionEn);

    expect(onLanguageChange).toHaveBeenCalledWith('en');
  });

  test('disabled Language Selector', () => {
    render(<LanguageSelector languageOptions={languageOptions} disabled />);
    expect(screen.getByRole('combobox', { name: 'English' })).toBeDisabled();
  });
});

describe('getLanguageLabel', () => {
  test('returns label when option matches currentLanguage', () => {
    const languageOptions: LanguageOption[] = [
      { label: 'English', value: SupportedLanguages.en },
      { label: '中文', value: SupportedLanguages.zh },
    ];
    const currentLanguage = SupportedLanguages.zh;
    expect(getLanguageLabel({ languageOptions, currentLanguage })).toBe('中文');
  });

  test('returns "English" when no option matches currentLanguage', () => {
    const languageOptions: LanguageOption[] = [
      { label: 'English', value: SupportedLanguages.en },
      { label: '中文', value: SupportedLanguages.zh },
    ];
    expect(getLanguageLabel({ languageOptions, currentLanguage: 'fr' as SupportedLanguages })).toBe('English');
  });

  test('returns "English" when languageOptions is undefined', () => {
    expect(
      getLanguageLabel({
        languageOptions: undefined,
        currentLanguage: SupportedLanguages.en,
      }),
    ).toBe('English');
  });
});

describe('MobileLanguageSelector (responsive)', () => {
  test('renders language options correctly', async () => {
    const currentLanguage = SupportedLanguages.en;
    const onLanguageChange = vitest.fn();

    render(
      <LanguageSelector
        languageOptions={languageOptions}
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
      />,
    );
    const mobileAccordion = screen.getByTestId('language-selector-accordion-trigger');
    await userEvent.click(mobileAccordion);
    const languageOptionZh = screen.getByText('中文');
    await userEvent.click(languageOptionZh);
    expect(onLanguageChange).toHaveBeenCalledWith('zh');
  });
});
