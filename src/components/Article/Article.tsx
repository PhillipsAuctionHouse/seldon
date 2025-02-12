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
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/EASEL-Compendium%3A-Tokens%2C-Components-%26-Patterns?node-id=20704-18000&p=f&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-article--overview)
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
          {label ? (
            <Text variant={TextVariants.label} className={`${baseClassName}__content-label`}>
              {label}
            </Text>
          ) : null}

          {header ? (
            <Text variant={TextVariants.heading3} className={`${baseClassName}__content-title`}>
              {header}
            </Text>
          ) : null}

          {description ? (
            <Text variant={TextVariants.body2} className={`${baseClassName}__content-description`}>
              {description}
            </Text>
          ) : null}

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
