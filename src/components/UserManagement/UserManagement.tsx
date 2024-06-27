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

export interface UserManagementProps extends React.HTMLAttributes<HTMLDivElement> {
  languageOptions?: { label: string; value: SupportedLanguages }[];
  currentLanguage?: SupportedLanguages;
  onLanguageChange?: (language: SupportedLanguages) => void;
  isLoggedIn?: boolean;
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
  isLoggedIn = false,
  onLogin = noOp,
  onLogout = noOp,
  loginLabel = 'Login',
  logoutLabel = 'Logout',
  ...props
}: React.PropsWithChildren<UserManagementProps>) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'UserManagement');
  const languageLabel = languageOptions.find((option) => option.value === currentLanguage)?.label ?? 'English';
  const AccountDetailsComponent = accountDetailsLink ?? 'a';

  return (
    <div {...commonProps} className={classnames(baseClassName, className)} {...props}>
      <span className={`${baseClassName}__account-wrapper`}>
        {isLoggedIn && (
          <AccountDetailsComponent>
            <AccountCircle className={`${baseClassName}__account-icon`} />
          </AccountDetailsComponent>
        )}
        <NavigationItem onClick={isLoggedIn ? onLogout : onLogin} label={isLoggedIn ? logoutLabel : loginLabel} />
      </span>
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
                onChange={() => onLanguageChange(option.value)}
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
