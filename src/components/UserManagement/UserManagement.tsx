import React, { ReactNode } from 'react';
import { getCommonProps, noOp, px } from '../../utils';
import Input from '../Input/Input';
import AccountCircle from '../../assets/account_circle.svg?react';
import NavigationItemTrigger from '../Navigation/NavigationItemTrigger/NavigationItemTrigger';
import NavigationList from '../Navigation/NavigationList/NavigationList';
import NavigationItem from '../Navigation/NavigationItem/NavigationItem';
import { LinkProps } from '../Link/Link';
import { SupportedLanguages } from '../../types/commonTypes';
import classnames from 'classnames';
import { AuthState } from './types';

export interface UserManagementProps extends React.HTMLAttributes<HTMLDivElement> {
  languageOptions?: { label: string; value: SupportedLanguages }[];
  currentLanguage?: SupportedLanguages;
  onLanguageChange?: (language: SupportedLanguages) => void;
  /**
   * The authentication state for the current user
   */
  authState?: AuthState;
  onLogin?: () => void;
  onLogout?: () => void;
  accountDetailsLink?: React.ElementType<LinkProps>;
  loginLabel?: ReactNode;
  logoutLabel?: ReactNode;
}

const UserManagement = ({
  accountDetailsLink,
  children,
  className,
  currentLanguage = SupportedLanguages.en,
  languageOptions = [
    { label: 'English', value: SupportedLanguages.en },
    { label: '中文', value: SupportedLanguages.zh },
  ],
  onLanguageChange = noOp,
  onLogin = noOp,
  onLogout = noOp,
  authState = AuthState.LoggedOut,
  loginLabel = 'Login',
  logoutLabel = 'Logout',
  ...props
}: React.PropsWithChildren<UserManagementProps>) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'UserManagement');
  const languageLabel = languageOptions.find((option) => option.value === currentLanguage)?.label ?? 'English';
  const AccountDetailsComponent = accountDetailsLink ?? 'a';
  const handleLanguageChange = (language: SupportedLanguages) => {
    (document.activeElement as HTMLElement)?.blur();
    onLanguageChange(language);
  };

  return (
    <div {...commonProps} className={classnames(baseClassName, className)} {...props}>
      <ul className={`${baseClassName}__account-wrapper`}>
        {authState !== AuthState.Loading && (
          <>
            <AccountDetailsComponent>
              <AccountCircle className={`${baseClassName}__account-icon`} />
            </AccountDetailsComponent>
            <NavigationItem
              className={`${baseClassName}__login`}
              onClick={authState === AuthState.LoggedIn ? onLogout : onLogin}
              label={authState === AuthState.LoggedIn ? logoutLabel : loginLabel}
            />
          </>
        )}
      </ul>
      <NavigationItemTrigger className={`${baseClassName}__language`} label={languageLabel}>
        <NavigationList id={`${px}-langauge-selection-list`} className={`${baseClassName}__language__selections`}>
          {languageOptions.map((option) => (
            <li key={option.value}>
              <Input
                type="radio"
                id={`radio-${option.value}`}
                labelText={option.label}
                value={option.value}
                inline
                name="languages"
                checked={option.value === currentLanguage}
                onChange={() => handleLanguageChange(option.value)}
              />
            </li>
          ))}
        </NavigationList>
      </NavigationItemTrigger>
      {children}
    </div>
  );
};

export default UserManagement;
