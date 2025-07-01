import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { Text, TextVariants } from '../Text';
import { SeldonImage } from '../SeldonImage';
import Button from '../Button/Button';
import { ButtonVariants } from '../Button/types';
import { SSRMediaQuery } from '../../providers/SeldonProvider/utils';
import { SaleCardVariants } from './types';

/** * Props for the SaleCard component. */
export interface SaleCardProps extends ComponentProps<'div'> {
  /** * The source URL of the image to be displayed. */
  imageSrc: string;
  /** * The alt text for the image. Defaults to "Auction Image" if not provided. */
  imageAlt?: string;
  /** * The auctionType of sale (e.g. "Live Auction", "Online Only", etc.). */
  auctionType: string;
  /** * The titleText of the sale. */
  titleText: string;
  /** * The date of the sale. */
  date: string;
  /** * The location of the sale. */
  location: string;
  /** * The text to be displayed on the primary button. If not provided, the button will not be rendered. */
  primaryButtonText?: string;
  /** * The callback function to be executed when the primary button is clicked. Required if primaryButtonText is provided. */
  primaryButtonOnClick?: () => void;
  /** * The text to be displayed on the secondary button. If not provided, the button will not be rendered. */
  secondaryButtonText?: string;
  /** * The URL or callback function for the secondary button. Required if secondaryButtonText is provided. */
  secondaryButtonHref?: string;
  secondaryButtonOnClick?: () => void;
  /** * The text to be displayed as a badge. */
  badgeText?: string;
  /** * The text to be displayed for the modal link. */
  modalButtonText?: string;
  /** * The callback function to be executed when the modal link is clicked. */
  modalButtonOnClick?: () => void;
  /** * The variant of the SaleCard component.
   * - 'default': The default style of the SaleCard component.
   * - 'relatedSaleTile': A variant with a smaller image size and horizontal layout on mobile devices.
   */
  variant?: SaleCardVariants;
}

/**
 * ## Overview
 *
 * Overview of this widget
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/Design-System--Responsive-Web?node-id=25028-2188&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-salecard--overview)
 */

const SaleCard = forwardRef<HTMLDivElement, SaleCardProps>(
  (
    {
      className,
      imageSrc,
      imageAlt = 'Auction Image',
      auctionType,
      titleText,
      date,
      location,
      primaryButtonText,
      primaryButtonOnClick,
      secondaryButtonText,
      secondaryButtonHref,
      secondaryButtonOnClick,
      badgeText,
      modalButtonOnClick,
      modalButtonText,
      variant = SaleCardVariants.DEFAULT,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'SaleCard');
    const classes = classnames(baseClassName, className, {
      [`${baseClassName}--${variant}`]: variant,
    });
    const componentProps = { ...commonProps, ...props };

    return (
      <div {...componentProps} className={classes} ref={ref}>
        {imageSrc ? <SeldonImage src={imageSrc} alt={imageAlt} className={`${baseClassName}__image`} /> : null}
        <div className={`${baseClassName}__details`}>
          <Text variant={TextVariants.badge} className={`${baseClassName}__auction-type`}>
            {auctionType}
          </Text>
          <Text variant={TextVariants.title3}>{titleText}</Text>
          {badgeText && (
            <Text variant={TextVariants.badge} className={`${baseClassName}__badge`}>
              {badgeText}
            </Text>
          )}
          <div className={`${baseClassName}__info`}>
            <Text variant={TextVariants.string2}>{location}</Text>
            <Text variant={TextVariants.string2}>{date}</Text>
            {modalButtonText && modalButtonOnClick && (
              <div className={`${baseClassName}__modal-link`}>
                <Button
                  onClick={modalButtonOnClick}
                  variant={ButtonVariants.tertiary}
                  className={`${baseClassName}__modal-link-button`}
                >
                  {modalButtonText}
                </Button>
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
            {secondaryButtonText && (
              <Button
                variant={secondaryButtonHref ? ButtonVariants.tertiary : ButtonVariants.secondary}
                href={secondaryButtonHref}
                target={secondaryButtonHref ? '_blank' : undefined}
                onClick={secondaryButtonOnClick}
                className={classnames(`${baseClassName}__cta-button`, {
                  [`${baseClassName}__pdf-link`]: secondaryButtonHref,
                })}
              >
                {secondaryButtonText}
              </Button>
            )}
          </div>
        </SSRMediaQuery.Media>
      </div>
    );
  },
);

SaleCard.displayName = 'SaleCard';

export default SaleCard;
