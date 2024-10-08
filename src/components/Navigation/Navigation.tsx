import React, { ComponentProps, CSSProperties, forwardRef, ReactElement } from 'react';
import { findChildrenExcludingTypes, findChildrenOfType, px } from '../../utils';
import classnames from 'classnames';
import { HeaderContext } from '../../site-furniture/Header/Header';
import NavigationList, { NavigationListProps } from './NavigationList/NavigationList';
import { LanguageSelector, LanguageSelectorProps } from '../../patterns/LanguageSelector';
import { SSRMediaQuery } from '../../providers/SeldonProvider/utils';

export interface NavigationProps extends ComponentProps<'nav'> {
  /**
   * Optional visible state
   */
  visible?: boolean;
}

/**
 * ## Overview
 *
 * This is used within the Header component and displays the site navigation links.  It supports both mobile and desktop. It requires the <SeldonProvider> to be wrapped around it to support SSR Media Queries.
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/EASEL-Compendium%3A-Tokens%2C-Components-%26-Patterns?node-id=10570-5784&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-navigation--overview)
 */
const Navigation = forwardRef<HTMLElement, NavigationProps>(
  ({ children, className, id, visible = true, ...props }, ref) => {
    const { isSearchExpanded } = React.useContext(HeaderContext);
    const childNavList = findChildrenOfType<NavigationListProps>(children, NavigationList)?.[0];
    const otherChildren = findChildrenExcludingTypes(children, [NavigationList, LanguageSelector]); // Includes the Search component, needed to do exclusion rather than inclusion so we could support StatefulSearch in our stories
    const languageSelectorElement = findChildrenOfType<LanguageSelectorProps>(children, LanguageSelector)?.[0];

    return (
      <nav
        role="navigation"
        data-testid={id}
        id={id}
        style={{ '--visible': visible ? 'visible' : 'hidden' } as CSSProperties}
        className={classnames(`${px}-nav`, className)}
        {...props}
        ref={ref}
      >
        <div className={`${px}-nav__list-container`}>
          {otherChildren}
          {React.isValidElement(childNavList)
            ? React.cloneElement<NavigationListProps>(childNavList, { isOffScreen: isSearchExpanded })
            : undefined}
          <SSRMediaQuery.Media lessThan="md">
            {/* This is not visible through css when in desktop breakpoint */}
            {React.isValidElement(languageSelectorElement) && languageSelectorElement
              ? React.cloneElement(languageSelectorElement as ReactElement<LanguageSelectorProps>, {
                  isHidden: isSearchExpanded,
                })
              : undefined}
          </SSRMediaQuery.Media>
        </div>
      </nav>
    );
  },
);

Navigation.displayName = 'Navigation';

export default Navigation;
