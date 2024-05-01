import { px } from '../../utils';
import { LinkVariants } from './Link';

export const getLinkVariantClassName = (variant: keyof typeof LinkVariants) => `${px}-link--${variant}`;
