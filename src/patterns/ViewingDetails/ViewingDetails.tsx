import classnames from 'classnames';

import { ComponentProps, ElementType, forwardRef } from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import { Divider } from '../../components/Divider';
import { Link, LinkProps } from '../../components/Link';
import { Text, TextVariants } from '../../components/Text';
import { getCommonProps } from '../../utils';

export interface ViewingSessionProps {
  /**
   * Session label for viewing session text
   */
  sessionLabel?: string;
  /**
   * Session time for viewing session text
   */
  sessionTime?: string;
}

export interface ViewingDetailsButtonsProps {
  /**
   * Callback click function for button
   */
  onClick?: () => void | unknown;
  /**
   * Button label text
   */
  buttonLabel?: string;
  /**
   * Button variant
   */
  variant?: ButtonVariants.primary | ButtonVariants.secondary;
}

export interface ViewingDetailsProps extends ComponentProps<'div'> {
  /**
   * Unique id for component
   */
  id?: string;
  /**
   * Title for Viewings Details
   */
  title?: string;
  /**
   * Label for Viewings Details
   */
  label?: string;
  /**
   * Session Times label text for Viewings Details
   */
  sessionTimesLabel?: string;
  /**
   * Session Times data array
   */
  sessionTimes?: ViewingSessionProps[];
  /**
   * Viewing Times string array
   */
  viewingTimes?: string[];
  /**
   * location of Viewings Details
   */
  location?: string;
  /**
   * Custom link element to use for the link. Defaults to the `Link` component.
   */
  linkElement?: ElementType<LinkProps>;
  /**
   * Google maps link for Viewings Details
   */
  mapLink?: string;
  /**
   * Callback for onClose function
   */
  onClose?: () => void | unknown;
  /**
   * Left Button Props
   */
  leftButton?: ViewingDetailsButtonsProps;
  /**
   * Right Button Props
   */
  rightButton?: ViewingDetailsButtonsProps;
  /**
   * Optional proprerty center align all text in the component
   */
  centerAlignText?: boolean;
}

const ViewingDetails = forwardRef<HTMLDivElement, ViewingDetailsProps>(
  ({
    className,
    children,
    title,
    label,
    sessionTimesLabel,
    sessionTimes,
    viewingTimes,
    location,
    mapLink,
    centerAlignText = false,
    onClose,
    leftButton = { buttonLabel: 'Browse', variant: ButtonVariants.primary },
    rightButton = { buttonLabel: 'Register to Bid', variant: ButtonVariants.secondary },
    linkElement: Component = Link,
    ...props
  }: ViewingDetailsProps) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ViewingDetails');

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props}>
        <div className={`${baseClassName}__content`}>
          {title && (
            <Text
              variant={TextVariants.heading3}
              className={classnames(`${baseClassName}__title`, { [`${baseClassName}__center-align`]: centerAlignText })}
            >
              {title}
            </Text>
          )}

          {children && <div className={`${baseClassName}__children`}>{children}</div>}

          {sessionTimesLabel && (
            <Text variant={TextVariants.heading4} className={centerAlignText ? `${baseClassName}__center-align` : ''}>
              {sessionTimesLabel}
            </Text>
          )}
          {sessionTimes &&
            sessionTimes.length > 0 &&
            sessionTimes.map((session, index) => (
              <div key={index}>
                {session.sessionLabel && (
                  <Text
                    variant={TextVariants.heading5}
                    className={classnames(`${baseClassName}__label`, {
                      [`${baseClassName}__center-align`]: centerAlignText,
                    })}
                  >
                    {session.sessionLabel}
                  </Text>
                )}
                {session.sessionTime && (
                  <Text
                    variant={TextVariants.body2}
                    className={classnames(`${baseClassName}__text`, {
                      [`${baseClassName}__center-align`]: centerAlignText,
                    })}
                  >
                    {session.sessionTime}
                  </Text>
                )}
              </div>
            ))}
          {label && (
            <Text variant={TextVariants.heading4} className={centerAlignText ? `${baseClassName}__center-align` : ''}>
              {label}
            </Text>
          )}
          {viewingTimes &&
            viewingTimes.length > 0 &&
            viewingTimes.map((time, index) => (
              <Text
                key={index}
                variant={TextVariants.body2}
                className={classnames(`${baseClassName}__label`, {
                  [`${baseClassName}__center-align`]: centerAlignText,
                })}
              >
                {time}
              </Text>
            ))}

          {location && (
            <Text
              variant={TextVariants.body2}
              className={classnames(`${baseClassName}__location`, {
                [`${baseClassName}__center-align`]: centerAlignText,
              })}
            >
              {location}
            </Text>
          )}
          {mapLink && (
            <Text
              variant={TextVariants.body2}
              className={classnames(`${baseClassName}__map-link`, {
                [`${baseClassName}__center-align`]: centerAlignText,
              })}
            >
              <Component href={mapLink}>(Map)</Component>
            </Text>
          )}
        </div>
        <Divider className={`${baseClassName}__divider`} id={baseClassName} />
        <div className={`${baseClassName}__btns-group`}>
          <Button id={`viewings-list-browse-btn`} variant={leftButton.variant} onClick={leftButton.onClick}>
            {leftButton.buttonLabel}
          </Button>
          <Button id={`viewings-list-register-btn`} variant={rightButton.variant} onClick={rightButton.onClick}>
            {rightButton.buttonLabel}
          </Button>
        </div>
      </div>
    );
  },
);

ViewingDetails.displayName = 'ViewingDetails';

export default ViewingDetails;
