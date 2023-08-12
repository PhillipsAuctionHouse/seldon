import * as React from 'react';
import classnames from 'classnames'

import { px } from '../../utils';


interface NavigationListItemProps extends Record<string, unknown>{
  /**
   * Optional href link
   */
  href?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Whether this nav item has a sub nav child
   */
  subNav?: boolean;
  /**
   * Optional label if not part of the element props
   */
  children?: React.ReactNode;
  /**
  * Optional element to render in place of a button e.g. React-Router, etc
  */
  element?: keyof JSX.IntrinsicElements | React.ComponentType;
}

const NavigationListItem = ({
  href,
  onClick,
  children,
  element: Element ='a',
  ...props // Used to spread props needed for 3rd party elements or a11y attributes
}: NavigationListItemProps) => {
  const [expanded, setExpanded] = React.useState(false);
  // console.log(typeof children, children)

  const render = React.useMemo(() => {

    if(typeof children === 'string') {
      return <Element href={href} {...props}>{children}</Element>
    } else {
      const renderItems:(string | React.ReactNode)[] = [];
      React.Children.forEach(children, (child, index) => {
        const item = child as React.ReactElement<React.PropsWithChildren>
        // console.log("type is string - ", typeof children === 'string', item)
        console.log(`${Math.random()}-${index}`)
        if(index === 0) {
          renderItems.push(
            <button key={`${Math.random()}-${index}`} className={`${px}-nav__list-item-trigger`} type="button" aria-expanded={expanded} onClick={() => setExpanded(prev => !prev)}>
              {item}
            </button>
          )
        } else {
          renderItems.push(item);
        }
      })
      return renderItems;
    }
  },[setExpanded, Element, children, href, props])

  return (
    <li
      data-testid={`nav-list-item`}
      className={classnames(`${px}-nav__list-item`, {[`${px}-nav__list-item--expanded`]: expanded})}
      onClick={onClick}
    >
      {render}
      {/* {
      typeof children === 'string'
      ? <Element href={href} {...props}>{children}</Element>
      : <button></button>} */}
    </li>
  );
};

export default NavigationListItem
