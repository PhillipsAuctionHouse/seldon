import { ComponentProps, forwardRef, ElementType, memo } from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import { Text, TextVariants } from '../../components/Text';
import { DetailList } from '../../components/DetailList/index';
import { Detail } from '../../components/Detail/index';
import { SeldonImage } from '../../components/SeldonImage';
import { DetailVariants } from '../../components/Detail/types';

export interface ObjectTileProps extends ComponentProps<'a'> {
  /**
   * Optional Object badge.
   */
  badgeText?: string | React.ReactNode;
  /**
   * Optional Element to render at the top level.
   */
  element?: ElementType<ComponentProps<'a'>>;
  /**
   * Estimate for object.
   */
  estimate?: string;
  /**
   * Estimate label text.
   */
  estimateLabelText?: string;
  /**
   * Estimate on request text to use when estimate is not available.
   */
  estimateOnRequestText?: string;
  /**
   * Element used for badge object
   */
  badgeElement?: React.ElementType;
  /**
   * Element used for favoriting object
   */
  favoriteElement?: React.ElementType;
  /**
   * Image alt text for the object.
   */
  imageAlt?: string;
  /**
   * Image URL for the object.
   */
  imageUrl?: string;
  /**
   * Image srcset for the object. [https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset]
   */
  imageSrcSet?: string;
  /**
   * Image sizes for the object. [https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes]
   */
  imageSizes?: string;
  /**
   * Image loading attribute. [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading]
   */
  imageLoading?: ComponentProps<'img'>['loading'];
  /**
   * Image fetch priority. [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-fetchpriority]
   */
  imageFetchPriority?: ComponentProps<'img'>['fetchPriority'];
  /**
   * Object Lot number.
   */
  lotNumber: string;
  /**
   * Object Maker name.
   */
  makerText?: string | React.ReactNode;
  /**
   * Object Model text.
   */
  modelText?: string | React.ReactNode;
  /**
   * Object reference number.
   */
  referenceNumber?: string;
  /**
   * Object title.
   */
  titleText?: string | React.ReactNode;
  /**
   * Withdrawn Text
   */
  withdrawnText?: string;
}
/**
 * ## Overview
 *
 * The ObjectTile component is used to display an object tile with an image, title, and other information in a grid
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/EASEL-Compendium%3A-Tokens%2C-Components-%26-Patterns?node-id=10914-34792&node-type=canvas&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app//?path=/story/patterns-objecttile--playground)
 */
const ObjectTile = memo(
  forwardRef<HTMLAnchorElement, ObjectTileProps>(
    (
      {
        badgeText,
        className,
        children,
        element: Element,
        estimate,
        estimateLabelText = 'Estimate',
        estimateOnRequestText,
        badgeElement: BadgeElement,
        favoriteElement: FavoriteElement,
        imageAlt = 'Brought to you by Phillips',
        imageUrl = '',
        imageSrcSet,
        imageSizes,
        imageLoading,
        imageFetchPriority,
        lotNumber,
        makerText,
        modelText,
        referenceNumber,
        titleText,
        withdrawnText,
        ...props
      },
      ref,
    ) => {
      const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ObjectTile');
      const Component = Element ?? 'a';
      const shouldShowEstimate = estimate || estimateOnRequestText;
      return (
        <Component {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
          <SeldonImage
            alt={imageAlt}
            aspectRatio="1/1"
            className={`${baseClassName}__img`}
            objectFit="contain"
            src={imageUrl}
            srcSet={imageSrcSet}
            sizes={imageSizes}
            loading={imageLoading}
            fetchPriority={imageFetchPriority}
          />
          {!withdrawnText ? (
            <Text element="span" className={`${baseClassName}__badge`} variant={TextVariants.labelSmall}>
              {badgeText}
            </Text>
          ) : null}
          <div className={`${baseClassName}__lot-number-like`}>
            <Text element="span" className={`${baseClassName}__lot-number`} variant={TextVariants.headingSmall}>
              {lotNumber}
            </Text>
            {BadgeElement && (
              <div className={`${baseClassName}__lot-badge`}>
                <BadgeElement />
              </div>
            )}
            {FavoriteElement && <FavoriteElement />}
          </div>
          {withdrawnText ? (
            <Text element="span" className={`${baseClassName}__withdrawn`} variant={TextVariants.headingSmall}>
              {withdrawnText}
            </Text>
          ) : (
            <>
              <div className={`${baseClassName}__meta`}>
                {makerText ? (
                  <Text element="span" className={`${baseClassName}__maker`} variant={TextVariants.headingSmall}>
                    {makerText}
                  </Text>
                ) : null}
                {titleText ? (
                  <Text element="cite" className={`${baseClassName}__title`} variant={TextVariants.headingExtraSmall}>
                    {titleText}
                  </Text>
                ) : null}
                {referenceNumber ? (
                  <Text
                    className={`${baseClassName}__reference-number`}
                    variant={TextVariants.headingExtraSmall}
                    element="span"
                  >
                    {referenceNumber}
                  </Text>
                ) : null}
                {modelText ? (
                  <Text className={`${baseClassName}__model`} variant={TextVariants.headingExtraSmall} element="span">
                    {modelText}
                  </Text>
                ) : null}
              </div>
              {shouldShowEstimate ? (
                <DetailList
                  hasSeparators
                  className={`${baseClassName}__estimate ${baseClassName}__section`}
                  variant={DetailVariants.sm}
                >
                  <Detail
                    className={`${baseClassName}__estimate__label`}
                    label={estimateLabelText}
                    value={estimate ? estimate : estimateOnRequestText}
                    hasWrap={false}
                  />
                </DetailList>
              ) : null}
              <div className={`${baseClassName}__section`}>{children}</div>
            </>
          )}
        </Component>
      );
    },
  ),
);

ObjectTile.displayName = 'ObjectTile';

export default ObjectTile;
