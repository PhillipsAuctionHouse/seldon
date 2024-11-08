import { LanguageSelectorProps } from './LanguageSelector';

interface GetLanguageLabelProps {
  languageOptions: LanguageSelectorProps['languageOptions'];
  currentLanguage: LanguageSelectorProps['currentLanguage'];
}

export const getLanguageLabel = ({ languageOptions, currentLanguage }: GetLanguageLabelProps) =>
  languageOptions?.find((option) => option.value === currentLanguage)?.label ?? 'English';
