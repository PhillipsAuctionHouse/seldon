import { forwardRef } from 'react';
import { px } from '../../utils';
import './loader.scss';
import classnames from 'classnames';

export interface LoaderProps {
  /** Prop for centering Loader component */
  isCentered?: boolean;
  /** Accessible label for the loader */
  'aria-label'?: string;
  /** Additional class names for the loader */
  className?: string;
}

const Loader = forwardRef<HTMLSpanElement, LoaderProps>(
  ({ 'aria-label': ariaLabel = 'Loading', isCentered = true, className, ...props }, ref) => (
    <span
      ref={ref}
      {...props}
      className={classnames(className, `${px}-loader`, { [`${px}-loader--centered`]: isCentered })}
      data-testid="loader"
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
    ></span>
  ),
);

Loader.displayName = 'Loader';
export default Loader;
