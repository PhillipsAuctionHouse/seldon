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

const TextSymbol = ({ symbols = [], variant = TextSymbolVariants.lotNumber, className, ...props }: TextSymbolProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'TextSymbol');

  return (
    <span {...commonProps} className={classNames(baseClassName, className, `${baseClassName}--${variant}`)} {...props}>
      {symbols.map((symbol) => (
        <span key={symbol}>{symbol}</span>
      ))}
    </span>
  );
};

export default TextSymbol;
