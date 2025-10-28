import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import { Text, TextVariants } from '../../components/Text';
import { Link } from '../../components/Link';
import classNames from 'classnames';

export interface SaleHeaderBrowseAuctionsProps extends ComponentProps<'div'> {
  ctaLabel?: string;
  ctaText?: string;
}

const SaleHeaderBrowseAuctions = forwardRef<HTMLElement, SaleHeaderBrowseAuctionsProps>(
  ({ ctaText = 'View Calendar', ctaLabel = 'Browse Upcoming Sale', className, ...props }, _ref) => {
    const { className: baseClassName } = getCommonProps(props, 'SaleHeaderBanner');

    return (
      <div
        className={classNames(`${baseClassName}__occurrence-details-text`, `${baseClassName}__browse-auctions-text`)}
      >
        <Text variant={TextVariants.labelMedium}>{ctaLabel}</Text>
        <Link href="/calendar">{ctaText}</Link>
      </div>
    );
  },
);

SaleHeaderBrowseAuctions.displayName = 'SaleHeaderBrowseAuctions';

export default SaleHeaderBrowseAuctions;
