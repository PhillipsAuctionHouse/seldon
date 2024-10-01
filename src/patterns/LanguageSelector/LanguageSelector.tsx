import { ComponentProps, ForwardedRef, forwardRef } from 'react';
import { getCommonProps, noOp } from '../../utils';
import classnames from 'classnames';
import { SupportedLanguages } from '../../types/commonTypes';
import { Dropdown } from '../../components/Dropdown';
import { Accordion, AccordionItem } from '../../components/Accordion';
import NavigationItem from '../../components/Navigation/NavigationItem/NavigationItem';
import { LinkVariants } from '../../components/Link';
import { Text, TextVariants } from '../../components/Text';
import NavigationList from '../../components/Navigation/NavigationList/NavigationList';
import { SSRMediaQuery } from '../../providers/utils';

interface DropdownSelectorProps extends ComponentProps<'div'> {
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
      <AccordionItem
        hasTransition
        id={id ?? 'language-selector-accordion'}
        label={<Text variant={TextVariants.snwHeaderLink}>{label}</Text>}
      >
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

export type LanguageOption = { label: string; value: SupportedLanguages };

export interface LanguageSelectorProps extends ComponentProps<'div'> {
  /**
   * Available language options to select from
   */
  languageOptions?: LanguageOption[];
  /**
   * The currently selected language, shows in the input
   */
  currentLanguage?: SupportedLanguages;
  /**
   * Called when the language is changed in the dropdown
   * @param language
   */
  onLanguageChange?: (language: SupportedLanguages) => void;
  /**
   * hide or show with an opacity transition
   */
  isHidden?: boolean;
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
      id,
      isHidden,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps({ id }, 'LanguageSelector');
    const languageLabel = languageOptions.find((option) => option.value === currentLanguage)?.label ?? 'English';

    const selectorProps = {
      ...commonProps,
      ...props,
      id,
      className: classnames(baseClassName, className, {
        [`${baseClassName}--hidden`]: isHidden,
      }),
      options: languageOptions,
      value: currentLanguage,
      onValueChange: (languageId: string) => onLanguageChange(languageId as SupportedLanguages),
      label: languageLabel,
    };

    return (
      <>
        <SSRMediaQuery.Media greaterThanOrEqual="md">
          <Dropdown {...selectorProps} ref={ref as ForwardedRef<HTMLButtonElement>} />
        </SSRMediaQuery.Media>
        <SSRMediaQuery.Media lessThan="md">
          <MobileLanguageSelector {...selectorProps} ref={ref as ForwardedRef<HTMLDivElement>} />
        </SSRMediaQuery.Media>
      </>
    );
  },
);

LanguageSelector.displayName = 'LanguageSelector';

export default LanguageSelector;
