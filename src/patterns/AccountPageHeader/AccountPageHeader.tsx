import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import Text from '../../components/Text/Text';
import { TextVariants } from '../../components/Text';
import { Divider } from '../../components/Divider';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import { Icon, IconName } from '../../components/Icon';
import IconButton from '../../components/IconButton/IconButton';

export interface AccountPageHeaderProps extends ComponentProps<'div'> {
  /** The main title displayed at the top of the account page */
  title: string;
  /** Optional subtitle text that appears below the main title */
  subheader?: string;
  /**
   * Configuration for the primary action button
   * @property {() => void} onClick - Function to call when the button is clicked
   * @property {string} label - Text to display on the button
   * @property {IconName} [icon] - Optional icon to display alongside the text
   */
  primaryActionButton?: {
    onClick: () => void;
    label: string;
    icon?: IconName;
  };
  /** Optional text displayed above the title */
  overline?: string;
  /**
   * Array of icon actions to display
   * Each object should have an icon name and an action function
   */
  iconActions?: Array<{
    icon: IconName;
    action: () => void;
  }>;
  /**
   * Show or hide the bottom divider
   * @default true
   */
  showDivider?: boolean;
}
/**
 * ## Overview
 *
 * AccountPageHeader is the component that displays at the top of each page in the account section.
 *
 * [Figma Link, Click into the playground for more details](https://www.figma.com/design/rIefa3bRPyZbZmtyV9PSQv/My-Account?node-id=497-47896&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/patterns-accountpageheader--overview)
 */
const AccountPageHeader = forwardRef<HTMLDivElement, AccountPageHeaderProps>(
  ({ className, title, subheader, primaryActionButton, overline, iconActions, showDivider = true, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'AccountPageHeader');

    const renderIconButtons = () => (
      <div className={`${baseClassName}__icon-buttons`}>
        {iconActions?.map((iconAction) => (
          <IconButton key={`icon-action-${iconAction.icon}`} onClick={iconAction.action}>
            <Icon icon={iconAction.icon} />
          </IconButton>
        ))}
      </div>
    );

    const renderPrimaryAction = () =>
      primaryActionButton &&
      primaryActionButton.icon && (
        <div className={`${baseClassName}__primary-action`}>
          <Button
            variant={ButtonVariants.secondary}
            onClick={primaryActionButton.onClick}
            className={`${baseClassName}__primary-action-desktop`}
          >
            <Icon icon={primaryActionButton.icon} /> {primaryActionButton.label}
          </Button>
          <IconButton onClick={primaryActionButton.onClick} className={`${baseClassName}__primary-action-mobile`}>
            <Icon icon={primaryActionButton.icon} />
          </IconButton>
        </div>
      );

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} ref={ref}>
        <div className={`${baseClassName}__container`}>
          {overline && (
            <Text variant={TextVariants.string2} className={`${baseClassName}__overline`}>
              {overline}
            </Text>
          )}
          <div className={`${baseClassName}__header`}>
            <Text variant={TextVariants.title1}>{title}</Text>
            {iconActions && renderIconButtons()}
            {primaryActionButton && renderPrimaryAction()}
          </div>
          {subheader && (
            <Text variant={TextVariants.string2} className={`${baseClassName}__subheader`}>
              {subheader}
            </Text>
          )}
        </div>
        {showDivider && <Divider className={`${baseClassName}__divider`} />}
      </div>
    );
  },
);

AccountPageHeader.displayName = 'AccountPageHeader';

export default AccountPageHeader;
