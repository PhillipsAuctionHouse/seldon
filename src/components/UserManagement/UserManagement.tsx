import React from 'react';
import { px } from '../../utils';
import Input from '../Input/Input';
import AccountCircle from '../../assets/account_circle.svg?react';
import NavigationItemTrigger from '../Navigation/NavigationItemTrigger/NavigationItemTrigger';
import NavigationList from '../Navigation/NavigationList/NavigationList';
import NavigationItem from '../Navigation/NavigationItem/NavigationItem';

export interface UserManagementProps extends React.HTMLAttributes<HTMLElement> {
  languageOptions?: { label: string; value: string }[];
}

const UserManagement = ({
  children,
  languageOptions = [
    { label: 'English', value: 'en' },
    { label: '中文', value: 'zh' },
  ],
}: React.PropsWithChildren<UserManagementProps>) => {
  const [language, setLanguage] = React.useState('English');

  return (
    <div data-testid="user-management" className={`${px}-user-management`}>
      <span className={`${px}-user-management__account-wrapper`}>
        <AccountCircle className={`${px}-user-management__account-icon`} />
        <NavigationItem href="#login" label={`Login`} />
      </span>
      <NavigationItemTrigger className={`${px}-user-management__language`} label={language}>
        <NavigationList id={`${px}-langauge-selection-list`} className={`${px}-user-management__language__selections`}>
          {languageOptions.map((option) => (
            <li key={option.value}>
              <Input
                type="radio"
                id={`radio-${option.value}`}
                labelText={option.label}
                value={option.value}
                inline
                name="languages"
                defaultChecked={option.value === 'en'}
                onClick={() => setLanguage(option.label)}
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
