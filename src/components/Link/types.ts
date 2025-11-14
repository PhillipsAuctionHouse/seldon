/* eslint-disable local-rules/no-deprecated-text-variants */
import { TextVariants } from '../Text';

export enum LinkVariants {
  /** @deprecated Use the corresponding link size variant, linkSmall, linkMedium, or linkLarge instead */
  email = TextVariants.email,
  /** @deprecated Use linkStylised instead */
  snwHeaderLink = TextVariants.snwHeaderLink,
  /** @deprecated Use linkLarge instead */
  snwFlyoutLink = TextVariants.snwFlyoutLink,
  /** @deprecated Use linkSmall instead */
  link = TextVariants.link,
  linkSmall = TextVariants.linkSmall,
  linkMedium = TextVariants.linkMedium,
  linkLarge = TextVariants.linkLarge,
  linkStylised = TextVariants.linkStylised,
}
