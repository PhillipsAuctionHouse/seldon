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
  /** link is being rendered in a footer */
  link = 'link',
  /** link is being rendered in a footer|header */
  snwHeaderLink = 'snwHeaderLink',
  /** link is being rendered in a footer|header */
  snwFlyoutLink = 'snwFlyoutLink',
}
