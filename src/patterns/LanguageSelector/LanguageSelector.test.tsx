import LanguageSelector, { LanguageOption } from './LanguageSelector';
import { runCommonTests } from '../../utils/testUtils';
import { SupportedLanguages } from '../../types/commonTypes';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { getLanguageLabel } from './utils';

describe('LanguageSelector', () => {
  runCommonTests(LanguageSelector, 'LanguageSelector');
});

describe('LanguageSelector', () => {
  test('renders language options correctly', async () => {
    const languageOptions: LanguageOption[] = [
      { label: 'English', value: SupportedLanguages.en },
      { label: '中文', value: SupportedLanguages.zh },
    ];
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
    const languageOptions: LanguageOption[] = [
      { label: 'English', value: SupportedLanguages.en },
      { label: '中文', value: SupportedLanguages.zh },
    ];
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
});

test('getLanguageLabel', () => {
  const languageOptions: LanguageOption[] = [
    { label: 'English', value: SupportedLanguages.en },
    { label: '中文', value: SupportedLanguages.zh },
  ];
  const currentLanguage = SupportedLanguages.zh;
  expect(getLanguageLabel({ languageOptions, currentLanguage })).toBe('中文');
});
