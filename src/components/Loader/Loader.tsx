import { forwardRef, type HTMLProps } from 'react';
import { px } from '../../utils';
import './loader.scss';

const Loader = forwardRef<HTMLSpanElement, HTMLProps<HTMLSpanElement>>(
  ({ 'aria-label': ariaLabel = 'Loading', ...props }, ref) => (
    <span
      ref={ref}
      {...props}
      className={`${px}-loader`}
      data-testid="loader"
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
    ></span>
  ),
);

Loader.displayName = 'Loader';
export default Loader;
