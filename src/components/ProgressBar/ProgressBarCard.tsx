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

export interface ProgressBarCardProps extends Omit<ComponentProps<'article'>, 'children'> {
  imageSrc?: string;
  imageAlt?: string;
  lotNumber: string | number;
  artistName: string;
  artworkTitle: string;
  estimateLabel?: string;
  estimateRange: string;
  statusText: string;
  lotsAwayText: string;
  menuAriaLabel?: string;
  onMenuClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
isCurrentLot?: boolean;
advanceBidAmount?: string;
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
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ProgressBarCard');
    const trimmedAdvBid = advanceBidAmount?.trim() ?? '';
    const showAdvanceBidFooter = Boolean(trimmedAdvBid) && !isCurrentLot;
    const lotsAwayCount = Number((lotsAwayText.match(/\d+/) || [0])[0]);
    const hasLotsAwayCount = Number.isFinite(lotsAwayCount) && lotsAwayCount > 0;

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
                aria-label={menuAriaLabel}
                variant={ButtonVariants.tertiary}
                className={`${baseClassName}__menu`}
                onClick={onMenuClick}
                >
              </IconButton>
            ) : null}
          </div>

          <Text element="p" variant={TextVariants.headingExtraSmall} className={`${baseClassName}__artist`}>
            {artistName}
          </Text>

          <Text element="p" variant={TextVariants.bodySmall} className={`${baseClassName}__title`}>
            {artworkTitle}
          </Text>

          <p className={`${baseClassName}__estimate`}>
            <Text element="span" variant={TextVariants.bodySmall} className={`${baseClassName}__estimate-label`}>
              {estimateLabel}
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
                  <span className={`${baseClassName}__advance-bid-label`}>Advance bid</span>{' '}
                  <span className={`${baseClassName}__advance-bid-amount`}>{trimmedAdvBid}</span>
                </Text>
              </div>
              <Text element="span" variant={TextVariants.bodySmall} className={`${baseClassName}__lots-away`}>
              {hasLotsAwayCount ? (
                <span className={`${baseClassName}__lots-away-compact`} aria-label={lotsAwayText}>
                    <Clock className={`${baseClassName}__lots-away-clock`} width={10} height={10} color="currentColor" title="" />
                    <Text element="span" variant={TextVariants.bodySmall} className={`${baseClassName}__lots-away-count`}>
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
              <Text element="span" variant={TextVariants.bodySmall} className={`${baseClassName}__status-copy`}>
                {advanceBidAmount?.trim() ? (
                    <>
                    <span className={`${baseClassName}__advance-bid-dot`} aria-hidden />
                    {statusText}
                    </>
                ) : (
                    statusText
                )}
                </Text>
                {isCurrentLot ? (
                  <Gavel className={`${baseClassName}__status-icon`} width={12} height={12} color="currentColor" title="" />
                ) : (
                  <Clock className={`${baseClassName}__status-icon`} width={12} height={12} color="currentColor" title="" />
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