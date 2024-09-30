import classNames from 'classnames';
import { getCommonProps } from '../../utils';
import { TextSymbolVariants } from './types';
import './_textSymbol.scss';

export interface TextSymbolProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The varian of the text symbol which will determine the position and spacing
   */
  variant?: TextSymbolVariants;
}

const TextSymbol = ({ children, variant = TextSymbolVariants.lotNumber, className, ...props }: TextSymbolProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'TextSymbol');

  return (
    <span {...commonProps} className={classNames(baseClassName, className, `${baseClassName}--${variant}`)} {...props}>
      {children}
    </span>
  );
};

export default TextSymbol;
