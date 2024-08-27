import { HTMLAttributes } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { Text, TextVariants } from '../Text';

export interface HeroBannerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * informational text above the header (e.g. region label or "buy now")
   */
  prehead?: string;
  /**
   * When is this sale taking place?
   */
  date?: string;
  /**
   * Main header text
   */
  headerText: string;
  /**
   * Sub-head text
   */
  subHeadText?: string;
  /**
   * Is there an association related to this sale?
   */
  association?: string;
  /**
   * What background image or color to use
   */
  background?: string;
  /**
   * Unique id for component testing
   */
  id?: string;
}

/**
 * ## Overview
 *
 * Hero Banner UI component
 *
 * [Figma Link](https://www.figma.com/design/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?node-id=6532-691&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-herobanner--overview)
 */

const HeroBanner = ({
  prehead,
  date,
  headerText,
  subHeadText,
  association,
  background,
  className,
  ...props
}: HeroBannerProps) => {
  const { className: baseClass, ...commonProps } = getCommonProps(props, 'HeroBanner');

  return (
    <header
      {...commonProps}
      className={classnames(baseClass, className)}
      style={{ '--background': background } as React.CSSProperties}
      {...props}
    >
      <span className={`${baseClass}__content-wrapper`}>
        {prehead || date ? (
          <p className={`${baseClass}__pre-head`}>
            {prehead ? <span>{prehead}</span> : null}
            {date ? <span>{date}</span> : null}
          </p>
        ) : null}
        <Text variant={TextVariants.heading1}>{headerText}</Text>
        {subHeadText ? <Text variant={TextVariants.heading2}>{subHeadText}</Text> : null}
        {association ? <p>{association}</p> : null}
      </span>
    </header>
  );
};

export default HeroBanner;
