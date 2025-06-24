import { ComponentProps, forwardRef, ElementType } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { Text, TextVariants } from '../Text';
import { Link, LinkProps } from '../Link';
import Button from '../Button/Button';
import { ButtonVariants } from '../Button/types';
import { SSRMediaQuery } from '../../providers/SeldonProvider/utils';

export type SaleCardProps = ComponentProps<'div'> & {
  imageSrc: string;
  imageAlt?: string;
  type: string;
  title: string;
  date: string;
  location: string;
  primaryButtonText?: string;
  primaryButtonOnClick?: () => void;
  secondaryButtonText?: string;
  secondaryButtonOnClick?: () => void;
  badgeText?: string;
  modalLink?: { text: string; onClick: () => void };
  pdfLink?: { text: string; url: string };
  linkElement?: ElementType<LinkProps>;
};

const SaleCard = forwardRef<HTMLDivElement, SaleCardProps>(
  (
    {
      className,
      imageSrc,
      imageAlt = 'Auction Image',
      type,
      title,
      date,
      location,
      primaryButtonText,
      primaryButtonOnClick,
      secondaryButtonText,
      secondaryButtonOnClick,
      badgeText,
      modalLink,
      pdfLink,
      linkElement: Component = Link,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'SaleCard');
    const componentProps = { ...commonProps, ...props };

    return (
      <div {...componentProps} className={classnames(baseClassName, className)} ref={ref}>
        <div className={`${baseClassName}__image`}>
          <img src={imageSrc} alt={imageAlt} />
        </div>
        <div className={`${baseClassName}__details`}>
          <Text variant={TextVariants.badge}>{type}</Text>
          <Text variant={TextVariants.title4}>{title}</Text>
          {badgeText && (
            <Text variant={TextVariants.badge} className={`${baseClassName}__badge`}>
              {badgeText}
            </Text>
          )}
          <div className={`${baseClassName}__info`}>
            <Text variant={TextVariants.string2}>{location}</Text>
            <Text variant={TextVariants.string2}>{date}</Text>
            {modalLink && (
              <div className={`${baseClassName}__modal-link`}>
                <a onClick={modalLink.onClick}>{modalLink.text}</a>
              </div>
            )}
          </div>
        </div>
        <SSRMediaQuery.Media greaterThanOrEqual="md">
          <div className={`${baseClassName}__cta`}>
            {primaryButtonText && primaryButtonOnClick && (
              <Button
                variant={ButtonVariants.primary}
                onClick={primaryButtonOnClick}
                className={`${baseClassName}__cta-button`}
              >
                {primaryButtonText}
              </Button>
            )}
            {secondaryButtonText && secondaryButtonOnClick && (
              <Button
                variant={ButtonVariants.secondary}
                onClick={secondaryButtonOnClick}
                className={`${baseClassName}__cta-button`}
              >
                {secondaryButtonText}
              </Button>
            )}
            {pdfLink && (
              <div className={`${baseClassName}__pdf-link`}>
                <Component data-testid="pdf-link" href={pdfLink.url} target="_blank" rel="noopener noreferrer">
                  {pdfLink.text}
                </Component>
              </div>
            )}
          </div>
        </SSRMediaQuery.Media>
      </div>
    );
  },
);

SaleCard.displayName = 'SaleCard';

export default SaleCard;
