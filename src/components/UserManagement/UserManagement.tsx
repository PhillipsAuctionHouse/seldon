import { ComponentProps, ElementType, forwardRef, ReactNode } from 'react';
import { getCommonProps, noOp } from '../../utils';
import AccountCircle from '../../assets/account_circle.svg?react';
import { LinkProps } from '../Link/Link';
import classnames from 'classnames';
import { AuthState } from './types';
import { Text, TextVariants } from '../Text';

export interface UserManagementProps extends ComponentProps<'div'> {
  /**
   * The authentication state for the current user
   */
  authState?: AuthState;
  onLogin?: () => void;
  onLogout?: () => void;
  accountDetailsLink?: ElementType<LinkProps>;
  loginLabel?: ReactNode;
  logoutLabel?: ReactNode;
}

const UserManagement = forwardRef<HTMLDivElement, UserManagementProps>(
  (
    {
      accountDetailsLink,
      className,
      onLogin = noOp,
      onLogout = noOp,
      authState = AuthState.LoggedOut,
      loginLabel = 'Login',
      logoutLabel = 'Logout',
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'UserManagement');

    const AccountDetailsComponent = accountDetailsLink ?? 'a';
    const isLoggedIn = authState === AuthState.LoggedIn;
    const shouldShowAccountDetails = authState !== AuthState.Loading;

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        {shouldShowAccountDetails && (
          <>
            <AccountDetailsComponent>
              <AccountCircle className={`${baseClassName}__account-icon`} />
            </AccountDetailsComponent>
            <button className={`${baseClassName}__login`} onClick={isLoggedIn ? onLogout : onLogin}>
              <Text variant={TextVariants.body3}> {isLoggedIn ? logoutLabel : loginLabel}</Text>
            </button>
          </>
        )}
      </div>
    );
  },
);

UserManagement.displayName = 'UserManagement';

export default UserManagement;
