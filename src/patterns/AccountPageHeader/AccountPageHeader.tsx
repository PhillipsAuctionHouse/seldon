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
import { SSRMediaQuery } from '../../providers/SeldonProvider/utils';

export interface AccountPageHeaderProps extends ComponentProps<'div'> {
  /** The main title displayed at the top of the account page */
  title: string;

  /** Optional subtitle text that appears below the main title */
  subtitle?: string;

  /**
   * Array of action buttons to display in the header
   * @property {string} [label] - Optional text to display on the button
   * @property {string} ariaLabel - Accessible label for the button
   * @property {IconName} icon - Icon to display on the button
   * @property {() => void} onClick - Function to call when the button is clicked
   * @property {boolean} [isPrimary] - When true, renders as a regular button; when false or undefined, renders as an icon button
   */
  actionButtons?: Array<{
    label?: string;
    ariaLabel: string;
    icon: IconName;
    onClick: (e?: React.SyntheticEvent) => void;
    isPrimary?: boolean;
  }>;

  /** Optional text displayed above the title */
  overline?: string;

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
  ({ className, title, subtitle, actionButtons, overline, showDivider = true, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'AccountPageHeader');

    const primaryButton = actionButtons?.find((button) => button.isPrimary);
    const iconButtons = actionButtons?.filter((button) => !button.isPrimary);

    const renderButtons = () => (
      <div className={`${baseClassName}__button-wrapper`}>
        {iconButtons && (
          <>
            {iconButtons.map((button) => (
              <IconButton key={`icon-button-${button.icon}`} onClick={button.onClick} aria-label={button.ariaLabel}>
                <Icon icon={button.icon} aria-label={button.ariaLabel} title={button.ariaLabel} />
              </IconButton>
            ))}
          </>
        )}

        {primaryButton && (
          <>
            <SSRMediaQuery.Media greaterThanOrEqual="md">
              <Button variant={ButtonVariants.secondary} onClick={primaryButton.onClick}>
                <Icon icon={primaryButton.icon} /> {primaryButton.label}
              </Button>
            </SSRMediaQuery.Media>
            <SSRMediaQuery.Media lessThan="md">
              <IconButton onClick={primaryButton.onClick} aria-label={primaryButton.ariaLabel}>
                <Icon icon={primaryButton.icon} title={primaryButton.ariaLabel} />
              </IconButton>
            </SSRMediaQuery.Media>
          </>
        )}
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
          <div className={`${baseClassName}__title-wrapper`}>
            <Text variant={TextVariants.title1} className={`${baseClassName}__title`}>
              {title}
            </Text>
            {actionButtons && actionButtons.length > 0 && renderButtons()}
          </div>
          {subtitle && (
            <Text variant={TextVariants.string2} className={`${baseClassName}__subtitle`}>
              {subtitle}
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
