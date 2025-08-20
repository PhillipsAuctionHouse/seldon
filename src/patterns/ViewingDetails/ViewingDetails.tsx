import classnames from 'classnames';

import { ComponentProps, ElementType, forwardRef } from 'react';
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

export interface ViewingDetailsProps extends ComponentProps<'div'> {
  /**
   * Unique id for component
   */
  id?: string;

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
   * Location of Viewings Details
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
}
/**
 * ## Overview
 *
 * A simple component for displaying viewing details such as session times, viewing times, location, and a map link.
 *
 * [Figma Link](https://www.figma.com/design/H1kCh6MXU8jasYbQuCbyBt/Calendar?node-id=6-17&p=f&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-viewingdetails--overview)
 *
 */
const ViewingDetails = forwardRef<HTMLDivElement, ViewingDetailsProps>(
  (
    {
      className,
      children,
      label,
      sessionTimesLabel,
      sessionTimes,
      viewingTimes,
      location,
      mapLink,
      onClose,
      linkElement: Component = Link,
      ...props
    }: ViewingDetailsProps,
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ViewingDetails');

    return (
      <div {...commonProps} {...props} className={classnames(baseClassName, className)} ref={ref}>
        <div className={`${baseClassName}__content`}>
          {children && <div className={`${baseClassName}__children`}>{children}</div>}

          {sessionTimesLabel && <Text variant={TextVariants.heading3}>{sessionTimesLabel}</Text>}
          {sessionTimes &&
            sessionTimes.length > 0 &&
            sessionTimes.map((session) => (
              <div
                key={`${session.sessionLabel ?? ''}-${session.sessionTime ?? ''}`}
                className={`${baseClassName}__session`}
              >
                {session.sessionLabel && (
                  <Text variant={TextVariants.heading4} className={`${baseClassName}__label`}>
                    {session.sessionLabel}
                  </Text>
                )}
                {session.sessionTime && (
                  <Text variant={TextVariants.bodyMd} className={`${baseClassName}__text`}>
                    {session.sessionTime}
                  </Text>
                )}
              </div>
            ))}
          {label && <Text variant={TextVariants.heading3}>{label}</Text>}
          {viewingTimes &&
            viewingTimes.length > 0 &&
            viewingTimes.map((time) => (
              <Text key={time} variant={TextVariants.bodyMd} className={`${baseClassName}__label`}>
                {time}
              </Text>
            ))}

          {location && (
            <Text variant={TextVariants.bodyMd} className={`${baseClassName}__location`}>
              {location}
            </Text>
          )}
          {mapLink && (
            <Text variant={TextVariants.bodyMd} className={`${baseClassName}__map-link`}>
              <Component href={mapLink}>(Map)</Component>
            </Text>
          )}
        </div>
      </div>
    );
  },
);

ViewingDetails.displayName = 'ViewingDetails';

export default ViewingDetails;
