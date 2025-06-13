import classnames from 'classnames';

import { ComponentProps, ElementType, forwardRef } from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import { Divider } from '../../components/Divider';
import { Icon } from '../../components/Icon';
import { Link, LinkProps } from '../../components/Link';
import { Text, TextVariants } from '../../components/Text';
import { getCommonProps } from '../../utils';

export interface ViewingSession {
  sessionLabel?: string;
  sessionTime?: string;
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
  sessionTimes?: ViewingSession[];
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
   * Callback for Browse button
   */
  onBrowse?: () => void | unknown;
  /**
   * Callback for Register to bid button
   */
  onRegister?: () => void | unknown;
}

const ViewingDetails = forwardRef<HTMLDivElement, ViewingDetailsProps>(
  ({
    className,
    title,
    label,
    sessionTimesLabel,
    sessionTimes,
    viewingTimes,
    location,
    mapLink,
    onClose,
    onBrowse,
    onRegister,
    linkElement: Component = Link,
    ...props
  }: ViewingDetailsProps) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ViewingDetails');

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props}>
        <div className={`${baseClassName}__content`}>
          <Icon icon="CloseX" height={24} width={24} className={`${baseClassName}__close-icon`} />
          {title && <Text variant={TextVariants.heading3}>{title}</Text>}
          {sessionTimesLabel && <Text variant={TextVariants.heading4}>{sessionTimesLabel}</Text>}
          {sessionTimes &&
            sessionTimes.length > 0 &&
            sessionTimes.map((session, index) => (
              <div key={index}>
                {session.sessionLabel && (
                  <Text variant={TextVariants.heading5} className={`${baseClassName}__label`}>
                    {session.sessionLabel}
                  </Text>
                )}
                {session.sessionTime && (
                  <Text variant={TextVariants.body2} className={`${baseClassName}__text`}>
                    {session.sessionTime}
                  </Text>
                )}
              </div>
            ))}
          {label && <Text variant={TextVariants.heading4}>{label}</Text>}
          {viewingTimes &&
            viewingTimes.length > 0 &&
            viewingTimes.map((time, index) => (
              <Text key={index} variant={TextVariants.body2} className={`${baseClassName}__label`}>
                {time}
              </Text>
            ))}

          {location && (
            <Text variant={TextVariants.body2} className={`${baseClassName}__location`}>
              {location}
            </Text>
          )}
          {mapLink && (
            <Text variant={TextVariants.body2} className={`${baseClassName}__map-link`}>
              <Component href={mapLink}>(Map)</Component>
            </Text>
          )}
        </div>
        <Divider className={`${baseClassName}__divider`} id={baseClassName} />
        <div className={`${baseClassName}__btns-group`}>
          <Button id={`viewings-list-browse-btn`} onClick={onBrowse}>
            Browse
          </Button>
          <Button id={`viewings-list-register-btn`} variant={ButtonVariants.secondary} onClick={onRegister}>
            Register to Bid
          </Button>
        </div>
      </div>
    );
  },
);

ViewingDetails.displayName = 'ViewingDetails';

export default ViewingDetails;
