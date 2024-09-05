import { ComponentProps, ForwardedRef, forwardRef } from 'react';
import { getCommonProps, noOp } from '../../utils';
import classnames from 'classnames';
import { SupportedLanguages } from '../../types/commonTypes';
import { Dropdown } from '../Dropdown';
import { Accordion, AccordionItem } from '../Accordion';
import NavigationItem from '../Navigation/NavigationItem/NavigationItem';
import { LinkVariants } from '../Link';
import { Text, TextVariants } from '../Text';
import NavigationList from '../Navigation/NavigationList/NavigationList';

interface DropdownSelectorProps extends ComponentProps<'div'> {
  id: string;
  value: string;
  onValueChange: (value: string) => void;
  label: string;
  options: { label: string; value: string }[];
}

const MobileLanguageSelector = ({
  id,
  value: _value, // can't be passed to the accordion
  onValueChange,
  label,
  options,
  ...props
}: DropdownSelectorProps) => {
  return (
    <Accordion {...props}>
      <AccordionItem variation="sm" id={id} label={<Text variant={TextVariants.snwHeaderLink}>{label}</Text>}>
        <NavigationList id={`${id}-navlist`}>
          {options.map((option) => (
            <NavigationItem
              key={option.value}
              label={option.label}
              onClick={() => onValueChange(option.value)}
              navType={LinkVariants.snwFlyoutLink}
            ></NavigationItem>
          ))}
        </NavigationList>
      </AccordionItem>
    </Accordion>
  );
};

export interface LanguageSelectorProps extends ComponentProps<'div'> {
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
const LanguageSelector = forwardRef<HTMLElement, LanguageSelectorProps>(
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

    const selectorProps = {
      ...commonProps,
      ...props,
      id: 'language-selector',
      className: classnames(baseClassName, className),
      options: languageOptions,
      value: currentLanguage,
      onValueChange: (languageId: string) => onLanguageChange(languageId as SupportedLanguages),
      label: languageLabel,
    };

    return (
      <>
        <Dropdown {...selectorProps} ref={ref as ForwardedRef<HTMLButtonElement>} />
        <MobileLanguageSelector {...selectorProps} ref={ref as ForwardedRef<HTMLDivElement>} />
      </>
    );
  },
);

LanguageSelector.displayName = 'LanguageSelector';

export default LanguageSelector;
