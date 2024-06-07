import React from 'react';
import { px } from '../../utils';
import Input from '../Input/Input';
import AccountCircleGrey from '../../assets/account_circle_grey.svg?react';
import NavigationItemTrigger from '../Navigation/NavigationItemTrigger/NavigationItemTrigger';
import NavigationList from '../Navigation/NavigationList/NavigationList';
import NavigationItem from '../Navigation/NavigationItem/NavigationItem';

export type UserManagementProps = React.HTMLAttributes<HTMLElement>;

const UserManagement = ({ children }: React.PropsWithChildren<UserManagementProps>) => {
  const [language, setLanguage] = React.useState('English');

  return (
    <div className={`${px}-user-management`}>
      <span className={`${px}-user-management__account-wrapper`}>
        <AccountCircleGrey className={`${px}-user-management__account-icon`} />
        <NavigationItem href="#login" label={`Login`} />
      </span>
      <NavigationItemTrigger className={`${px}-user-management__language`} label={language}>
        <NavigationList className={`${px}-user-management__language__selections`}>
          <li>
            <Input
              type="radio"
              id="radio-en"
              labelText="English"
              value="en"
              inline
              name="languages"
              checked
              onClick={() => setLanguage('English')}
            />
          </li>
          <li>
            <Input
              type="radio"
              id="radio-zh"
              labelText="中文"
              value="zh"
              inline
              name="languages"
              onClick={() => setLanguage('中文')}
            />
          </li>
        </NavigationList>
      </NavigationItemTrigger>
      {children}
    </div>
  );
};

export default UserManagement;
