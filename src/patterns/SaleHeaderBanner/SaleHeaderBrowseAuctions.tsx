import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import { Text, TextVariants } from '../../components/Text';
import { Link } from '../../components/Link';

// You'll need to change the ComponentProps<"htmlelementname"> to match the top-level element of your component
export interface SaleHeaderBrowseOptionsProps extends ComponentProps<'div'> {
  ctaLabel?: string;
  ctaText?: string;
}

const SaleHeaderBrowseOptions = forwardRef<HTMLElement, SaleHeaderBrowseOptionsProps>(
  ({ ctaText = 'View Calendar', ctaLabel = 'Browse Upcoming Sale', className, ...props }, _ref) => {
    const { className: baseClassName } = getCommonProps(props, 'SaleHeaderBanner');

    return (
      <div className={`${baseClassName}__occurance-details-text ${baseClassName}__occurance-details-browse`}>
        <Text variant={TextVariants.string2}>{ctaLabel}</Text>
        <Link href="/calendar">{ctaText}</Link>
      </div>
    );
  },
);

SaleHeaderBrowseOptions.displayName = 'SaleHeaderBrowseOptions';

export default SaleHeaderBrowseOptions;
