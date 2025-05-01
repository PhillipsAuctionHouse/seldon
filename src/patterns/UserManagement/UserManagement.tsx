import { ComponentProps, ElementType, forwardRef, ReactNode } from 'react';
import { getCommonProps, noOp } from '../../utils';
import { LinkProps } from '../../components/Link/Link';
import classnames from 'classnames';
import { AuthState } from './types';
import { Text, TextVariants } from '../../components/Text';
import { Icon } from '../../components/Icon';
import { SSRMediaQuery } from '../../providers/SeldonProvider/utils';

export interface UserManagementProps extends ComponentProps<'div'> {
  /**
   * The authentication state for the current user
   */
  authState?: AuthState;
  /**
   * Triggered when the login button is clicked
   */
  onLogin?: () => void;
  /**
   * Allows override of the default `<a` element.  Can be used to support Remix `<Link`
   */
  accountDetailsLinkComponent?: ElementType<LinkProps>;
  /**
   * The href for the account details link
   */
  href?: string;
  /**
   * The label for the login button
   */
  loginLabel?: ReactNode;
  /**
   * The label for the account details link
   */
  accountLabel?: ReactNode;
  /**
   * is the link disabled
   */
  disabled?: boolean;
}

const UserManagement = forwardRef<HTMLDivElement, UserManagementProps>(
  (
    {
      accountDetailsLinkComponent: AccountDetailsComponent = 'a',
      className,
      onLogin = noOp,
      authState = AuthState.LoggedOut,
      loginLabel = 'Login',
      accountLabel = 'Account',
      href = '/account',
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'UserManagement');

    const isLoggedIn = authState === AuthState.LoggedIn;
    const shouldShowAccountDetails = authState !== AuthState.Loading;
    const ResponsiveAccountIcon = () => (
      <>
        <SSRMediaQuery.Media lessThan="md">
          <Icon icon="Account" className={`${baseClassName}__account-icon`} height="1.5rem" width="1.5rem" />
        </SSRMediaQuery.Media>
        <SSRMediaQuery.Media greaterThanOrEqual="md">
          <Icon icon="Account" className={`${baseClassName}__account-icon`} height="1rem" width="1rem" />
        </SSRMediaQuery.Media>
      </>
    );

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        {shouldShowAccountDetails && (
          <>
            {isLoggedIn ? (
              <AccountDetailsComponent className={`${baseClassName}__login`} href={href} disabled={disabled}>
                <ResponsiveAccountIcon />
                <Text variant={TextVariants.body3}>{accountLabel}</Text>
              </AccountDetailsComponent>
            ) : (
              <button className={`${baseClassName}__login`} onClick={onLogin} disabled={disabled}>
                <ResponsiveAccountIcon />
                <Text variant={TextVariants.body3}>{loginLabel}</Text>
              </button>
            )}
          </>
        )}
      </div>
    );
  },
);

UserManagement.displayName = 'UserManagement';

export default UserManagement;
