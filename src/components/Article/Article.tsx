import classnames from 'classnames';
import { ComponentProps, ElementType, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import Button from '../Button/Button';
import { ButtonVariants } from '../Button/types';
import { Link, LinkProps } from '../Link';
import { SeldonImage } from '../SeldonImage';
import { Text, TextVariants } from '../Text';

export interface ArticleProps extends ComponentProps<'div'> {
  /**
   * Image src to display at the right side of the article.
   */
  imageSrc?: string;
  /**
   * Top label for the article.
   */
  label?: string;
  /**
   * Header for the article.
   */
  header?: string;
  /**
   * Description for the article.
   */
  description?: string;
  /**
   * Custom link element to use for the link. Defaults to the `Link` component.
   */
  linkElement?: ElementType<LinkProps>;
  /**
   * Label for the link.
   */
  linkLabel?: string;
  /**
   * Href for the link.
   */
  linkHref?: string;
  /**
   * Variant style for the article component.
   */
  variant?: 'default' | 'exitGateCard';
  /**
   * imageSrc alt text for accessibility.
   */
  altText?: string;
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
    {
      className,
      imageSrc,
      label,
      header,
      description,
      linkElement: Component = Link,
      linkLabel,
      linkHref,
      variant = 'default',
      altText = 'Article Image',
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Article');
    const isExitGateCardVariant = variant === 'exitGateCard';
    const articleBaseClassName = isExitGateCardVariant ? `${baseClassName}-${variant}` : baseClassName;

    return (
      <article {...commonProps} className={classnames(articleBaseClassName, className)} {...props} ref={ref}>
        {imageSrc ? (
          <SeldonImage
            objectFit={isExitGateCardVariant ? 'cover' : 'none'}
            aspectRatio="16/9"
            src={imageSrc}
            alt={altText}
            className={classnames({ [`${articleBaseClassName}__desktop_image`]: isExitGateCardVariant })}
          />
        ) : null}

        <div className={`${articleBaseClassName}__content`}>
          {label ? (
            <Text variant={TextVariants.label} className={`${articleBaseClassName}__content-label`}>
              {label}
            </Text>
          ) : null}

          {header ? (
            <Text
              variant={isExitGateCardVariant ? TextVariants.heading2 : TextVariants.heading3}
              className={`${articleBaseClassName}__content-title`}
            >
              {header}
            </Text>
          ) : null}

          {description ? (
            <Text
              variant={isExitGateCardVariant ? TextVariants.body3 : TextVariants.body2}
              className={`${articleBaseClassName}__content-description`}
            >
              {description}
            </Text>
          ) : null}

          {linkLabel ? (
            <Component href={linkHref}>
              {isExitGateCardVariant ? (
                <Button variant={ButtonVariants.secondary} className={`${articleBaseClassName}__content-link`}>
                  {linkLabel}
                </Button>
              ) : (
                linkLabel
              )}
            </Component>
          ) : null}
        </div>
      </article>
    );
  },
);

Article.displayName = 'Article';

export default Article;
