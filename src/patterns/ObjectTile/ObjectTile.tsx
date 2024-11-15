import { ComponentProps, ElementType, forwardRef } from 'react';
import classnames from 'classnames';

import { getCommonProps } from '../../utils';
import { Text, TextVariants } from '../../components/Text';
import { DetailList } from '../DetailList/index';
import { Detail } from '../../components/Detail/index';

export interface ObjectTileProps extends ComponentProps<'a'> {
  /**
   * Optional Object badge.
   */
  badgeText?: string;
  /**
   * Optional Element to render at the top level.
   */
  element?: ElementType<
    Omit<ObjectTileProps, 'imageUrl' | 'lotNumber' | 'referenceNumber'> & { 'data-testid': string }
  >;
  /**
   * Estimate for object.
   */
  estimate?: string;
  /**
   * Estimate label text.
   */
  estimateLabelText?: string;
  /**
   * Image URL for the object.
   */
  imageUrl?: string;
  /**
   * Object Lot number.
   */
  lotNumber: string;
  /**
   * Object Maker name.
   */
  makerText?: string;
  /**
   * Object Model text.
   */
  modelText?: string;
  /**
   * Object reference number.
   */
  referenceNumber?: string;
  /**
   * Object title.
   */
  titleText?: string;
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
const ObjectTile = forwardRef<HTMLAnchorElement, ObjectTileProps>(
  (
    {
      badgeText,
      className,
      children,
      element: Element,
      estimate,
      estimateLabelText = 'Estimate',
      imageUrl,
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
    const url = imageUrl || 'https://via.placeholder.com/150';
    Element = (props.href ? 'a' : 'div') as ElementType<
      Omit<ObjectTileProps, 'imageUrl' | 'lotNumber' | 'referenceNumber'> & { 'data-testid': string }
    >;
    return (
      <Element {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        <img className={`${baseClassName}__img`} src={url} alt={titleText ?? `image for lot number ${lotNumber}`} />
        {!withdrawnText ? (
          <Text className={`${baseClassName}__badge`} variant={TextVariants.badge}>
            {badgeText}
          </Text>
        ) : null}
        <div className={`${baseClassName}__lot-number-like`}>
          <Text className={`${baseClassName}__lot-number`} variant={TextVariants.heading3} element="p">
            {lotNumber}
          </Text>
        </div>
        {withdrawnText ? (
          <Text className={`${baseClassName}__withdrawn`} variant={TextVariants.heading4}>
            {withdrawnText}
          </Text> // TODO: Design calls for heading 4 but the values they have map to our current heading 5. This should be updated when we update those tokens.
        ) : (
          <>
            <div className={`${baseClassName}__meta`}>
              {makerText ? (
                <Text className={`${baseClassName}__maker`} variant={TextVariants.heading3}>
                  {makerText}
                </Text>
              ) : null}
              {titleText ? (
                <Text
                  className={`${baseClassName}__title ${baseClassName}__token-fix`}
                  variant={TextVariants.heading4}
                  element="cite"
                >
                  {titleText}
                </Text>
              ) : null}
              {referenceNumber ? (
                <Text
                  className={`${baseClassName}__reference-number ${baseClassName}__token-fix`}
                  variant={TextVariants.heading4}
                  element="p"
                >
                  {referenceNumber}
                </Text>
              ) : null}
              {modelText ? (
                <Text
                  className={`${baseClassName}__model ${baseClassName}__token-fix`}
                  variant={TextVariants.heading4}
                  element="p"
                >
                  {modelText}
                </Text>
              ) : null}
            </div>
            {estimate ? (
              <DetailList hasSeparators className={`${baseClassName}__estimate ${baseClassName}__section`}>
                <Detail
                  className={`${baseClassName}__estimate__label`}
                  label={estimateLabelText}
                  value={estimate}
                  hasWrap={false}
                />
              </DetailList>
            ) : null}
            {/* { estimate
                ? <div className={`${baseClassName}__estimate ${baseClassName}__section`}>
                    <Text className={`${baseClassName}__estimate__label`}>{estimateLabelText}</Text>
                    <Text className={`${baseClassName}__estimate__value`}>{estimate}</Text>
                  </div>
                : null
              } */}
            <div className={`${baseClassName}__section`}>{children}</div>
          </>
        )}
      </Element>
    );
  },
);

ObjectTile.displayName = 'ObjectTile';

export default ObjectTile;
