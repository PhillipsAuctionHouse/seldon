import { px } from '../../utils';

export const getLinkVariantClassName = (variant: keyof typeof LinkVariants) => `${px}-link--${variant}`;

export const isLinkExternal = (href?: string) =>
  !!href?.match(
    /(http[s]?:\/\/)(?!.*phillips\.com)([a-zA-Z0-9\-.]+)(:[0-9]{1,4})?([a-zA-Z0-9/\-._~:?#[\]@!$&'()*+,;=]*)/g,
  );
export enum LinkVariants {
  /** Default variant, used */
  standalone = 'standalone',
  /** link rendering emailto: */
  email = 'email',
  /** these links are being rendered in a list */
  list = 'list',
  /** link is being rendered within body copy */
  inline = 'inline',
}
