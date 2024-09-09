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
  accountDetailsLinkComponent?: ElementType<LinkProps>;
  href?: string;
  loginLabel?: ReactNode;
  accountLabel?: ReactNode;
}

const UserManagement = forwardRef<HTMLDivElement, UserManagementProps>(
  (
    {
      accountDetailsLinkComponent,
      className,
      onLogin = noOp,
      authState = AuthState.LoggedOut,
      loginLabel = 'Login',
      accountLabel = 'Account',
      href = '/account',
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'UserManagement');

    const isLoggedIn = authState === AuthState.LoggedIn;
    const shouldShowAccountDetails = authState !== AuthState.Loading;
    const AccountDetailsComponent = accountDetailsLinkComponent ?? 'a';

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        {shouldShowAccountDetails && (
          <>
            {isLoggedIn ? (
              <AccountDetailsComponent className={`${baseClassName}__login`} href={href}>
                <AccountCircle className={`${baseClassName}__account-icon`} />
                <Text variant={TextVariants.body3}>{accountLabel}</Text>
              </AccountDetailsComponent>
            ) : (
              <button className={`${baseClassName}__login`} onClick={onLogin}>
                <AccountCircle className={`${baseClassName}__account-icon`} />
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
