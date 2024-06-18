import { render } from '@testing-library/react';
import NavigationList from './NavigationList';
import NavigationItem from '../NavigationItem/NavigationItem';
import { LinkVariants } from '../../Link/utils';
import NavigationItemTrigger from '../NavigationItemTrigger/NavigationItemTrigger';
import { px } from '../../../utils';

describe('NavigationList', () => {
  const reqProps = { id: 'test-id' };
  const renderNavList = () => (
    <NavigationList {...reqProps}>
      <NavigationItemTrigger id="auctions" label={`Auctions`}>
        <NavigationList id={`${px}-auction-nav-list`}>
          <NavigationItem
            badge={'New York'}
            href="#"
            navGroup={'nav-link-lg'}
            navType={LinkVariants.navLinkLg}
            label={`Editions & Works on Paper`}
          />
        </NavigationList>
      </NavigationItemTrigger>
      <NavigationItem href="#" label={`Departments`} />
    </NavigationList>
  );
  it('renders without error', () => {
    render(renderNavList());
  });

  it('renders children when no large or small CTA items are present', () => {
    const { getByTestId } = render(
      <NavigationList {...reqProps}>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </NavigationList>,
    );

    expect(getByTestId('test-id')).toBeInTheDocument();
    expect(getByTestId('test-id').children.length).toBe(3);
  });

  it('renders large CTA items when present', () => {
    const { getByTestId } = render(
      <NavigationList {...reqProps}>
        <NavigationItem href="#" navGroup="nav-link-lg">
          Large CTA 1
        </NavigationItem>
        <NavigationItem href="#" navGroup="nav-link-lg">
          Large CTA 2
        </NavigationItem>
      </NavigationList>,
    );

    expect(getByTestId('test-id')).toBeInTheDocument();
    expect(getByTestId('test-id').querySelectorAll('.nav-link-lg').length).toBe(2);
  });

  it('renders small CTA items when present', () => {
    const { getByTestId } = render(
      <NavigationList {...reqProps}>
        <NavigationItem href="#" navGroup="nav-link-sm">
          Small CTA 1
        </NavigationItem>
        <NavigationItem href="#" navGroup="nav-link-sm">
          Small CTA 2
        </NavigationItem>
      </NavigationList>,
    );

    expect(getByTestId('test-id')).toBeInTheDocument();
    expect(getByTestId('test-id').querySelectorAll('.nav-link-sm').length).toBe(2);
  });

  it('renders both large and small CTA items when present', () => {
    const { getByTestId } = render(
      <NavigationList {...reqProps}>
        <NavigationItem href="#" navGroup="nav-link-lg">
          Large CTA 1
        </NavigationItem>
        <NavigationItem href="#" navGroup="nav-link-sm">
          Small CTA 1
        </NavigationItem>
      </NavigationList>,
    );

    expect(getByTestId('test-id')).toBeInTheDocument();
    expect(getByTestId('test-id').querySelectorAll('.nav-link-lg').length).toBe(1);
    expect(getByTestId('test-id').querySelectorAll('.nav-link-sm').length).toBe(1);
  });
});
