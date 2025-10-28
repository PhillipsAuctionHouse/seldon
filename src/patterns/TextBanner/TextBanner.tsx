import { HTMLAttributes, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { Text, TextVariants } from '../../components/Text';

export interface TextBannerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Main header text
   */
  headerText: string;
  /**
   * A description to be used with the TEXT variant of HeroBanner
   */
  description?: string;
  /**
   * Unique id for component testing
   */
  id?: string;
}
/**
 * ## Overview
 *
 * Text Banner UI component
 *
 * [Figma Link](https://www.figma.com/design/H1kCh6MXU8jasYbQuCbyBt/Calendar?m=auto&node-id=2969-204916)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/patterns-textbanner--overview)
 */
const TextBanner = forwardRef<HTMLDivElement, TextBannerProps>(
  ({ headerText, className, description, ...props }: TextBannerProps, ref) => {
    const { className: baseClass, ...commonProps } = getCommonProps(props, 'TextBanner');

    return (
      <header {...commonProps} className={classnames(baseClass, className)} ref={ref} {...props}>
        <span className={classnames(`${baseClass}__content-wrapper`)}>
          <Text className={`${baseClass}__header-text`} variant={TextVariants.headingLarge}>
            {headerText}
          </Text>
          {description ? <Text element="p">{description}</Text> : null}
        </span>
      </header>
    );
  },
);

TextBanner.displayName = 'TextBanner';

export default TextBanner;
