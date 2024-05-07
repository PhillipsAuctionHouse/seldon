import { px } from '../../utils';
import { LinkVariants } from './Link';

export const getLinkVariantClassName = (variant: keyof typeof LinkVariants) => `${px}-link--${variant}`;

export const isLinkExternal = (href: string) =>
  !!href.match(
    /(http[s]?:\/\/)(?!.*phillips\.com)([a-zA-Z0-9\-.]+)(:[0-9]{1,4})?([a-zA-Z0-9/\-._~:?#[\]@!$&'()*+,;=]*)/g,
  );
