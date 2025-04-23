import { forwardRef } from 'react';
import { px } from '../../utils';
import './loader.scss';

export interface LoaderProps {
  /** Props for the Loader component */
  isCentered?: boolean;
  /** Accessible label for the loader */
  'aria-label'?: string;
}

const Loader = forwardRef<HTMLSpanElement, LoaderProps>(
  ({ 'aria-label': ariaLabel = 'Loading', isCentered = true, ...props }, ref) => (
    <span
      ref={ref}
      {...props}
      className={`${px}-loader${isCentered ? ` ${px}-loader--centered` : ''}`}
      data-testid="loader"
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
    ></span>
  ),
);

Loader.displayName = 'Loader';
export default Loader;
