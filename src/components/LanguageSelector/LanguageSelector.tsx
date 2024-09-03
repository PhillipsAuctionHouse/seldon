import { ComponentProps, forwardRef } from 'react';
import { getCommonProps, noOp } from '../../utils';
import classnames from 'classnames';
import { SupportedLanguages } from '../../types/commonTypes';
import { Dropdown } from '../Dropdown';

export interface LanguageSelectorProps extends ComponentProps<'button'> {
  languageOptions?: { label: string; value: SupportedLanguages }[];
  currentLanguage?: SupportedLanguages;
  onLanguageChange?: (language: SupportedLanguages) => void;
}
/**
 * ## Overview
 *
 * This is used in the Header component to allow users to change the language of the site.  It is a controlled component.
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/EASEL-Compendium%3A-Tokens%2C-Components-%26-Patterns?node-id=10570-6295&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-languageselector--overview)
 */
const LanguageSelector = forwardRef<HTMLButtonElement, LanguageSelectorProps>(
  (
    {
      className,
      currentLanguage = SupportedLanguages.en,
      languageOptions = [
        { label: 'English', value: SupportedLanguages.en },
        { label: '中文', value: SupportedLanguages.zh },
      ],
      onLanguageChange = noOp,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'LanguageSelector');
    const languageLabel = languageOptions.find((option) => option.value === currentLanguage)?.label ?? 'English';

    return (
      <Dropdown
        {...commonProps}
        className={classnames(baseClassName, className)}
        options={languageOptions}
        value={currentLanguage}
        onValueChange={(languageId) => onLanguageChange(languageId as SupportedLanguages)}
        label={languageLabel}
        ref={ref}
      />
    );
  },
);

LanguageSelector.displayName = 'LanguageSelector';

export default LanguageSelector;
