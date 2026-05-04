import classnames from 'classnames';
import { ComponentProps, forwardRef } from 'react';

import Clock from '../../assets/formatted/Clock';
import { getCommonProps } from '../../utils';
import Card from '../Card/Card';
import { CardVariants } from '../Card/types';
import IconButton from '../IconButton/IconButton';
import { ButtonVariants } from '../Button/types';
import { Text, TextVariants } from '../Text';
import Gavel from '../../assets/formatted/Gavel';
import Icon from '../../assets/formatted/Icon';
export interface ProgressBarCardProps extends Omit<ComponentProps<'article'>, 'children'> {
  /** Thumbnail for the lot; if omitted, no image column is shown. */
  imageSrc?: string;
  /** `alt` for `imageSrc` (empty string if no meaningful description). */
  imageAlt?: string;
  /** Lot number shown in the card header. */
  lotNumber: string | number;
  /** Artist / maker line. */
  artistName: string;
  /** Work title (italics in layout). */
  artworkTitle: string;
  /** Label before `estimateRange` (defaults to `'Estimate'`; blank falls back). */
  estimateLabel?: string;
  /** Estimate range copy (e.g. `$9,000 - $13,000`). */
  estimateRange: string;
  /** Primary status line in the footer (e.g. current vs upcoming lot). */
  statusText: string;
  /** Secondary footer copy (e.g. lots away); may drive the compact clock + count UI when it contains digits. */
  lotsAwayText: string;
  /** Accessible name for the kebab control (`IconButton` when `onMenuClick` is set, otherwise the decorative icon). */
  menuAriaLabel?: string;
  /** When provided, the menu renders as a button and fires this handler instead of a non-interactive icon. */
  onMenuClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Whether this lot is the current sale lot (affects icons and advance-bid footer vs status footer). */
  isCurrentLot?: boolean;
  /** Advance bid amount string; when set, advance-bid styling and footer rows can appear. */
  advanceBidAmount?: string;
  /** Label before `advanceBidAmount` in the advance-bid row (defaults to `'Advance bid'`; blank falls back). */
  advanceBidLabel?: string;
}

const ProgressBarCard = forwardRef<HTMLElement, ProgressBarCardProps>(
  (
    {
      className,
      imageSrc,
      imageAlt = '',
      lotNumber,
      artistName,
      artworkTitle,
      estimateLabel = 'Estimate',
      estimateRange,
      statusText,
      lotsAwayText,
      menuAriaLabel = 'Lot actions',
      onMenuClick,
      isCurrentLot,
      advanceBidAmount,
      advanceBidLabel = 'Advance bid',
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ProgressBarCard');

    const resolvedEstimateLabel = estimateLabel?.trim() || 'Estimate';
    const resolvedMenuAriaLabel = menuAriaLabel?.trim() || 'Lot actions';
    const resolvedAdvanceBidLabel = advanceBidLabel?.trim() || 'Advance bid';
    const trimmedAdvBid = advanceBidAmount?.trim() ?? '';
    const showAdvanceBidFooter = Boolean(trimmedAdvBid) && !isCurrentLot;
    const lotsAwayDigits = lotsAwayText.match(/\d+/);
    const lotsAwayCount = lotsAwayDigits ? Number(lotsAwayDigits[0]) : 0;
    const hasLotsAwayCount = lotsAwayCount > 0;

    return (
      <Card.Root
        ref={ref}
        element="article"
        variant={CardVariants.default}
        {...commonProps}
        className={classnames(baseClassName, className)}
      >
        {imageSrc ? (
          <div className={`${baseClassName}__media`}>
            <Card.Image alt={imageAlt} src={imageSrc} />
          </div>
        ) : null}
        <Card.Content className={`${baseClassName}__body`}>
          <div className={`${baseClassName}__row`}>
            <Text element="span" variant={TextVariants.bodySmall}>
              {lotNumber}
            </Text>
            {onMenuClick ? (
              <IconButton
                aria-label={resolvedMenuAriaLabel}
                variant={ButtonVariants.tertiary}
                className={`${baseClassName}__menu`}
                onClick={onMenuClick}
              >
                <Icon width={14} height={14} color="currentColor" title="" />
              </IconButton>
            ) : (
              <Icon
                className={`${baseClassName}__menu-icon`}
                width={14}
                height={14}
                color="currentColor"
                aria-label={resolvedMenuAriaLabel}
              />
            )}
          </div>

          <Text element="p" variant={TextVariants.headingExtraSmall} className={`${baseClassName}__artist`}>
            {artistName}
          </Text>

          <Text element="p" variant={TextVariants.bodySmall} className={`${baseClassName}__title`}>
            {artworkTitle}
          </Text>

          <p className={`${baseClassName}__estimate`}>
            <Text element="span" variant={TextVariants.bodySmall} className={`${baseClassName}__estimate-label`}>
              {resolvedEstimateLabel}
            </Text>{' '}
            <Text element="span" variant={TextVariants.bodySmall} className={`${baseClassName}__estimate-label`}>
              {estimateRange}
            </Text>
          </p>

          {!showAdvanceBidFooter && <hr className={`${baseClassName}__divider`} />}

          {showAdvanceBidFooter ? (
            <div className={`${baseClassName}__footer ${baseClassName}__footer--advance-bid`}>
              <div className={`${baseClassName}__advance-bid`}>
                <span className={`${baseClassName}__advance-bid-dot`} aria-hidden />
                <Text element="span" variant={TextVariants.bodySmall} className={`${baseClassName}__advance-bid-copy`}>
                  <span className={`${baseClassName}__advance-bid-label`}>{resolvedAdvanceBidLabel}</span>{' '}
                  <span className={`${baseClassName}__advance-bid-amount`}>{trimmedAdvBid}</span>
                </Text>
              </div>
              <Text element="span" variant={TextVariants.bodySmall} className={`${baseClassName}__lots-away`}>
                {hasLotsAwayCount ? (
                  <span className={`${baseClassName}__lots-away-compact`} aria-label={lotsAwayText}>
                    <Clock
                      className={`${baseClassName}__lots-away-clock`}
                      width={10}
                      height={10}
                      color="currentColor"
                      title=""
                    />
                    <Text
                      element="span"
                      variant={TextVariants.bodySmall}
                      className={`${baseClassName}__lots-away-count`}
                    >
                      {lotsAwayCount}
                    </Text>
                  </span>
                ) : (
                  <Text element="span" variant={TextVariants.bodySmall} className={`${baseClassName}__lots-away`}>
                    {lotsAwayText}
                  </Text>
                )}
              </Text>
            </div>
          ) : (
            <div className={`${baseClassName}__footer`}>
              <div className={`${baseClassName}__status`}>
                {isCurrentLot && trimmedAdvBid ? (
                  <div className={`${baseClassName}__advance-bid`}>
                    <span className={`${baseClassName}__advance-bid-dot`} aria-hidden />
                    <Text
                      element="span"
                      variant={TextVariants.bodySmall}
                      className={`${baseClassName}__advance-bid-copy`}
                    >
                      <span className={`${baseClassName}__advance-bid-label`}>{resolvedAdvanceBidLabel}</span>{' '}
                      <span className={`${baseClassName}__advance-bid-amount`}>{trimmedAdvBid}</span>
                    </Text>
                  </div>
                ) : (
                  <Text element="span" variant={TextVariants.bodySmall} className={`${baseClassName}__status-copy`}>
                    {statusText}
                  </Text>
                )}
                {isCurrentLot ? (
                  <Gavel
                    className={`${baseClassName}__status-icon`}
                    width={12}
                    height={12}
                    color="currentColor"
                    title=""
                  />
                ) : (
                  <Clock
                    className={`${baseClassName}__status-icon`}
                    width={12}
                    height={12}
                    color="currentColor"
                    title=""
                  />
                )}
              </div>
              <Text element="span" variant={TextVariants.bodySmall} className={`${baseClassName}__lots-away`}>
                {lotsAwayText}
              </Text>
            </div>
          )}
        </Card.Content>
      </Card.Root>
    );
  },
);

ProgressBarCard.displayName = 'ProgressBarCard';

export default ProgressBarCard;
