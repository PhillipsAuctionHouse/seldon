import { TextVariants } from '../Text';

export enum LinkVariants {
  /** link rendering emailto: */
  email = TextVariants.email,
  snwHeaderLink = TextVariants.snwHeaderLink,
  /** link is being rendered in a footer|header */
  snwFlyoutLink = TextVariants.snwFlyoutLink,
  /** standard link */
  link = TextVariants.link,
}
