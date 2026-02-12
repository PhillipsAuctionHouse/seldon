import { forwardRef } from 'react';
import classNames from 'classnames';
import { getCommonProps } from '../../utils';
import { TextSymbolVariants } from './types';

export interface TextSymbolProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * An array of string symbols to show
   */
  symbols?: string[];
  /**
   * The variant of the text symbol which will determine the position and spacing
   */
  variant?: TextSymbolVariants;
}

// Unicode Variation Selector-15 (U+FE0E) forces text presentation instead of emoji
const TEXT_VARIATION_SELECTOR = '\uFE0E';

const toTextSymbol = (symbol: string): string => {
  if (!symbol) return '';
  return `${symbol}${TEXT_VARIATION_SELECTOR}`;
};

const TextSymbol = forwardRef<HTMLSpanElement, TextSymbolProps>(
  ({ symbols = [], variant = TextSymbolVariants.lotNumber, className, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'TextSymbol');

    return (
      <span
        {...commonProps}
        className={classNames(baseClassName, className, `${baseClassName}--${variant}`)}
        ref={ref}
        {...props}
      >
        {symbols.map((symbol) => (
          <span key={symbol}>{toTextSymbol(symbol)}</span>
        ))}
      </span>
    );
  },
);
TextSymbol.displayName = 'TextSymbol';

export default TextSymbol;
