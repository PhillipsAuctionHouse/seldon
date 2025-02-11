import { ComponentProps, ElementType, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { SeldonImage } from '../SeldonImage';
import { Text, TextVariants } from '../Text';
import { Link, LinkProps } from '../Link';

// You'll need to change the ComponentProps<"htmlelementname"> to match the top-level element of your component
export interface ArticleProps extends ComponentProps<'div'> {
  imageSrc?: string;
  label?: string;
  header?: string;
  description?: string;
  linkElement?: ElementType<LinkProps>;
  linkLabel?: string;
  linkHref?: string;
}
/**
 * ## Overview
 *
 * Overview of this widget
 *
 * [Figma Link](Add Figma URL here)
 *
 * [Storybook Link](Point back to yourself here)
 */
const Article = forwardRef<HTMLDivElement, ArticleProps>(
  (
    { className, imageSrc, label, header, description, linkElement: Component = Link, linkLabel, linkHref, ...props },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Article');

    return (
      <article {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        {imageSrc ? <SeldonImage aspectRatio="16/9" src={imageSrc} alt="bull" /> : null}

        <div className={`${baseClassName}__content`}>
          <Text variant={TextVariants.label} className={`${baseClassName}__content-label`}>
            {label}
          </Text>
          <Text variant={TextVariants.heading3} className={`${baseClassName}__content-title`}>
            {header}
          </Text>
          <Text variant={TextVariants.body2} className={`${baseClassName}__content-description`}>
            {description}
          </Text>

          {linkLabel ? (
            <Component href={linkHref} className={`${baseClassName}__content-link`}>
              {linkLabel}
            </Component>
          ) : null}
        </div>
      </article>
    );
  },
);

Article.displayName = 'Article';

export default Article;
