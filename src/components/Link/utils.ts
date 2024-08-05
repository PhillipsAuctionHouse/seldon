import { px } from '../../utils';
import { LinkVariants as UpdatedLinkVariants } from './types';

export const getLinkVariantClassName = (variant: keyof typeof UpdatedLinkVariants) => `${px}-link--${variant}`;

export const isLinkExternal = (href?: string) =>
  !!href?.match(
    /(http[s]?:\/\/)(?!.*phillips\.com)([a-zA-Z0-9\-.]+)(:[0-9]{1,4})?([a-zA-Z0-9/\-._~:?#[\]@!$&'()*+,;=]*)/g,
  );

// Leaving here for backwards compatibility. Can remove on next major release
export enum LinkVariants {
  /** Default variant, used */
  standalone = 'standalone',
  /** link rendering emailto: */
  email = 'email',
  /** these links are being rendered in a list */
  list = 'list',
  /** link is being rendered within body copy */
  inline = 'inline',
  /** link is being rendered in the main nav bar */
  navMain = 'navMain',
  /** link is being rendered in a nav bar flyout*/
  navLinkLg = 'navLinkLg',
  /** link is being rendered in a nav bar flyout*/
  navLinkSm = 'navLinkSm',
}
