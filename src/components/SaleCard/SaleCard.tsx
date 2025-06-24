import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { Text, TextVariants } from '../Text';
import { SeldonImage } from '../SeldonImage';
import Button from '../Button/Button';
import { ButtonVariants } from '../Button/types';
import { SSRMediaQuery } from '../../providers/SeldonProvider/utils';

/**
 * Props for the SaleCard component.
 */
export interface SaleCardProps extends ComponentProps<'div'> {
  /**
   * The source URL of the image to be displayed.
   */
  imageSrc: string;

  /**
   * The alt text for the image. Defaults to "Auction Image" if not provided.
   */
  imageAlt?: string;

  /**
   * The auctionType of sale (e.g. "Live Auction", "Online Only", etc.).
   */
  auctionType: string;

  /**
   * The titleText of the sale.
   */
  titleText: string;

  /**
   * The date of the sale.
   */
  date: string;

  /**
   * The location of the sale.
   */
  location: string;

  /**
   * The text to be displayed on the primary button. If not provided, the button will not be rendered.
   */
  primaryButtonText?: string;

  /**
   * The callback function to be executed when the primary button is clicked. Required if primaryButtonText is provided.
   */
  primaryButtonOnClick?: () => void;

  /**
   * The text to be displayed on the secondary button. If not provided, the button will not be rendered.
   */
  secondaryButtonText?: string;

  /**
   * The callback function to be executed when the secondary button is clicked. Required if secondaryButtonText is provided.
   */
  secondaryButtonOnClick?: () => void;

  /**
   * The text to be displayed as a badge.
   */
  badgeText?: string;

  /**
   * The text to be displayed for the modal link.
   */
  modalLinkText?: string;

  /**
   * The callback function to be executed when the modal link is clicked.
   */
  modalLinkOnClick?: () => void;

  /**
   * The text to be displayed for the PDF link.
   */
  pdfLinkText?: string;
  /**
   * The URL of the PDF to be linked.
   */
  pdfLinkUrl?: string;
}

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
      secondaryButtonOnClick,
      badgeText,
      modalLinkText,
      modalLinkOnClick,
      pdfLinkText,
      pdfLinkUrl,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'SaleCard');
    const componentProps = { ...commonProps, ...props };

    return (
      <div {...componentProps} className={classnames(baseClassName, className)} ref={ref}>
        {imageSrc ? (
          <SeldonImage aspectRatio="16/9" src={imageSrc} alt={imageAlt} className={`${baseClassName}__image`} />
        ) : null}
        <div className={`${baseClassName}__details`}>
          <Text variant={TextVariants.badge}>{auctionType}</Text>
          <Text variant={TextVariants.title4}>{titleText}</Text>
          {badgeText && (
            <Text variant={TextVariants.badge} className={`${baseClassName}__badge`}>
              {badgeText}
            </Text>
          )}
          <div className={`${baseClassName}__info`}>
            <Text variant={TextVariants.string2}>{location}</Text>
            <Text variant={TextVariants.string2}>{date}</Text>
            {modalLinkText && modalLinkOnClick && (
              <div className={`${baseClassName}__modal-link`}>
                <Button
                  onClick={modalLinkOnClick}
                  variant={ButtonVariants.tertiary}
                  className={`${baseClassName}__modal-link-button`}
                >
                  {modalLinkText}
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
            {secondaryButtonText && secondaryButtonOnClick && (
              <Button
                variant={ButtonVariants.secondary}
                onClick={secondaryButtonOnClick}
                className={`${baseClassName}__cta-button`}
              >
                {secondaryButtonText}
              </Button>
            )}
            {pdfLinkText && pdfLinkUrl && (
              <div className={`${baseClassName}__pdf-link`}>
                <Button href={pdfLinkUrl} target="_blank" variant={ButtonVariants.tertiary}>
                  {pdfLinkText}
                </Button>
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
