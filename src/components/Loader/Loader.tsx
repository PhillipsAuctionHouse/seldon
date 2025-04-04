import { forwardRef, type HTMLProps } from 'react';
import { px } from '../../utils';
import './loader.scss';

const Loader = forwardRef<HTMLSpanElement, HTMLProps<HTMLSpanElement>>(() => (
  <span className={`${px}-loader`} data-testid="loader"></span>
));

Loader.displayName = 'Loader';
export default Loader;
