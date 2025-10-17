import { TextVariants } from '../Text';

export enum LinkVariants {
  /** link rendering emailto: */
  email = TextVariants.email,
  /** @deprecated Use linkStylised instead */
  snwHeaderLink = TextVariants.snwHeaderLink,
  /** @deprecated Use linkLarge instead */
  /** link is being rendered in a footer|header */
  snwFlyoutLink = TextVariants.snwFlyoutLink,
  /** @deprecated Use linkSmall instead */
  /** standard link */
  link = TextVariants.link,
  linkSmall = TextVariants.linkSmall,
  linkMedium = TextVariants.linkMedium,
  linkLarge = TextVariants.linkLarge,
  linkStylised = TextVariants.linkStylised,
}
