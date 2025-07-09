import classnames from 'classnames';
import { ComponentProps, ElementType, forwardRef, ReactNode } from 'react';
import { getCommonProps } from '../../utils';
import Button from '../Button/Button';
import { ButtonVariants } from '../Button/types';
import { SeldonImage } from '../SeldonImage';
import { Text, TextVariants } from '../Text';

export interface ExitGateCardProps extends ComponentProps<'div'> {
  /**
   * Image src to display at the right side of the article.
   */
  imageSrc?: string;
  /**
   * Top label for the article.
   */
  label?: ReactNode;
  /**
   * Header for the article.
   */
  header?: ReactNode;
  /**
   * Description for the article.
   */
  description?: ReactNode;
  /**
   * Custom link element to use for the link. Defaults to the `Link` component.
   */
  linkElement?: ElementType<ComponentProps<'a'>>;
  /**
   * Label for the link.
   */
  linkLabel?: ReactNode;
  /**
   * Href for the link.
   */
  linkHref?: string;
  /**
   * imageSrc alt text for accessibility.
   */
  altText?: string;
  /**
   * LinkVariants for the ExitGateCard.
   */
  variant?: ButtonVariants;
}
/**
 * ## Overview
 *
 * Overview of this widget
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/Design-System--Foundations--RW-to-be-depreciated-?node-id=24825-524&p=f&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-ExitGateCard-overview)
 */
const ExitGateCard = forwardRef<HTMLDivElement, ExitGateCardProps>(
  (
    {
      className,
      imageSrc,
      label,
      header,
      description,
      linkLabel,
      linkHref,
      linkElement: LinkElement = 'a',
      variant = ButtonVariants.secondary,
      altText = 'Exit Gate Card Image',
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ExitGateCard');
    return (
      <article {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        {imageSrc ? (
          <SeldonImage
            objectFit="cover"
            aspectRatio="16/9"
            src={imageSrc}
            alt={altText}
            className={`${baseClassName}__desktop_image`}
          />
        ) : null}

        <div className={`${baseClassName}__content`}>
          {label ? (
            <Text variant={TextVariants.body2} element="span" className={`${baseClassName}__content-label`}>
              {label}
            </Text>
          ) : null}

          {header ? (
            <Text variant={TextVariants.heading1} element="span" className={`${baseClassName}__content-title`}>
              {header}
            </Text>
          ) : null}

          {description ? (
            <Text variant={TextVariants.body2} element="span" className={`${baseClassName}__content-description`}>
              {description}
            </Text>
          ) : null}

          {linkLabel && linkHref ? (
            <LinkElement href={linkHref}>
              <Button variant={variant} className={`${baseClassName}__content-link`}>
                {linkLabel}
              </Button>
            </LinkElement>
          ) : null}
        </div>
      </article>
    );
  },
);

ExitGateCard.displayName = 'ExitGateCard';

export default ExitGateCard;
