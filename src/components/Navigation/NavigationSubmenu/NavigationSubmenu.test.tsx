import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import NavigationSubmenu from './NavigationSubmenu';
import NavigationItem from '../NavigationItem/NavigationItem';
import { px } from '../../../utils';
import userEvent from '@testing-library/user-event';

describe('NavigationSubmenu', () => {
  const reqProps = { id: 'test-id' };

  it('renders left section items when present', () => {
    const { getByTestId } = render(
      <NavigationSubmenu {...reqProps}>
        <NavigationItem href="#" navGroup="nav-link-start" label="Large CTA 1" />
        <NavigationItem href="#" navGroup="nav-link-start" label="Large CTA 2" />
      </NavigationSubmenu>,
    );

    expect(getByTestId('test-id')).toBeInTheDocument();
    expect(getByTestId('test-id').querySelectorAll('.seldon-nav__item--nav-link-start').length).toBe(2);
  });

  it('renders right section items when present', () => {
    const { getByTestId } = render(
      <NavigationSubmenu {...reqProps}>
        <NavigationItem href="#" navGroup="nav-link-end" label="Small CTA 1" />
        <NavigationItem href="#" navGroup="nav-link-end" label="Small CTA 2" />
      </NavigationSubmenu>,
    );

    expect(getByTestId('test-id')).toBeInTheDocument();
    expect(getByTestId('test-id').querySelectorAll('.seldon-nav__item--nav-link-end').length).toBe(2);
  });

  it('renders both left and right section items when present', () => {
    const { getByTestId } = render(
      <NavigationSubmenu {...reqProps}>
        <NavigationItem href="#" navGroup="nav-link-start" label="Large CTA 1" />
        <NavigationItem href="#" navGroup="nav-link-end" label="Small CTA 1" />
      </NavigationSubmenu>,
    );

    expect(getByTestId('test-id')).toBeInTheDocument();
    expect(getByTestId('test-id').querySelectorAll('.seldon-nav__item--nav-link-start').length).toBe(1);
    expect(getByTestId('test-id').querySelectorAll('.seldon-nav__item--nav-link-end').length).toBe(1);
  });

  it('calls onClick handler when left section item is clicked', async () => {
    const handleClick = vi.fn();
    render(
      <NavigationSubmenu {...reqProps} onClick={handleClick}>
        <NavigationItem label="Home" href="#" navGroup="nav-link-start" />
      </NavigationSubmenu>,
    );

    const navigationItem = screen.getByTestId('nav-item-Home');
    await userEvent.click(navigationItem);
    expect(handleClick).toHaveBeenCalled();
  });

  it('calls onClick handler when right section item is clicked', async () => {
    const handleClick = vi.fn();
    render(
      <NavigationSubmenu {...reqProps} onClick={handleClick}>
        <NavigationItem label="Home" href="#" navGroup="nav-link-end" />
      </NavigationSubmenu>,
    );

    const navigationItem = screen.getByTestId('nav-item-Home');
    await userEvent.click(navigationItem);
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders left section heading when provided', () => {
    const { getByTestId } = render(
      <NavigationSubmenu {...reqProps} leftSectionHeading="Left Section">
        <NavigationItem href="#" navGroup="nav-link-start" label="Item 1" />
      </NavigationSubmenu>,
    );

    expect(getByTestId('test-id')).toBeInTheDocument();
    expect(screen.getByText('Left Section')).toBeInTheDocument();
  });

  it('renders right section heading when provided', () => {
    const { getByTestId } = render(
      <NavigationSubmenu {...reqProps} rightSectionHeading="Right Section">
        <NavigationItem href="#" navGroup="nav-link-end" label="Item 1" />
      </NavigationSubmenu>,
    );

    expect(getByTestId('test-id')).toBeInTheDocument();
    expect(screen.getByText('Right Section')).toBeInTheDocument();
  });

  it('renders both section headings when provided', () => {
    render(
      <NavigationSubmenu {...reqProps} leftSectionHeading="Left Section" rightSectionHeading="Right Section">
        <NavigationItem href="#" navGroup="nav-link-start" label="Item 1" />
        <NavigationItem href="#" navGroup="nav-link-end" label="Item 2" />
      </NavigationSubmenu>,
    );

    expect(screen.getByText('Left Section')).toBeInTheDocument();
    expect(screen.getByText('Right Section')).toBeInTheDocument();
  });

  it('does not render left section heading when no left section items are present', () => {
    render(
      <NavigationSubmenu {...reqProps} leftSectionHeading="Left Section">
        <NavigationItem href="#" navGroup="nav-link-end" label="Item 1" />
      </NavigationSubmenu>,
    );

    expect(screen.queryByText('Left Section')).not.toBeInTheDocument();
  });

  it('does not render right section heading when no right section items are present', () => {
    render(
      <NavigationSubmenu {...reqProps} rightSectionHeading="Right Section">
        <NavigationItem href="#" navGroup="nav-link-start" label="Item 1" />
      </NavigationSubmenu>,
    );

    expect(screen.queryByText('Right Section')).not.toBeInTheDocument();
  });

  it('calls both onClick handler and item onClick when left section item is clicked', async () => {
    const handleClick = vi.fn();
    const itemOnClick = vi.fn();

    render(
      <NavigationSubmenu {...reqProps} onClick={handleClick}>
        <NavigationItem label="Home" href="#" navGroup="nav-link-start" onClick={itemOnClick} />
      </NavigationSubmenu>,
    );

    const navigationItem = screen.getByTestId('nav-item-Home');
    await userEvent.click(navigationItem);

    expect(handleClick).toHaveBeenCalled();
    expect(itemOnClick).toHaveBeenCalled();
  });

  it('calls both onClick handler and item onClick when right section item is clicked', async () => {
    const handleClick = vi.fn();
    const itemOnClick = vi.fn();

    render(
      <NavigationSubmenu {...reqProps} onClick={handleClick}>
        <NavigationItem label="Home" href="#" navGroup="nav-link-end" onClick={itemOnClick} />
      </NavigationSubmenu>,
    );

    const navigationItem = screen.getByTestId('nav-item-Home');
    await userEvent.click(navigationItem);

    expect(handleClick).toHaveBeenCalled();
    expect(itemOnClick).toHaveBeenCalled();
  });

  it('renders only left section when only left section items are present', () => {
    const { getByTestId } = render(
      <NavigationSubmenu {...reqProps} leftSectionHeading="Left Section">
        <NavigationItem href="#" navGroup="nav-link-start" label="Item 1" />
        <NavigationItem href="#" navGroup="nav-link-start" label="Item 2" />
      </NavigationSubmenu>,
    );

    expect(getByTestId('test-id').querySelectorAll(`.${px}-nav__list__section--start`).length).toBe(1);
    expect(getByTestId('test-id').querySelectorAll(`.${px}-nav__list__section--end`).length).toBe(0);
  });

  it('renders only right section when only right section items are present', () => {
    const { getByTestId } = render(
      <NavigationSubmenu {...reqProps} rightSectionHeading="Right Section">
        <NavigationItem href="#" navGroup="nav-link-end" label="Item 1" />
        <NavigationItem href="#" navGroup="nav-link-end" label="Item 2" />
      </NavigationSubmenu>,
    );

    expect(getByTestId('test-id').querySelectorAll(`.${px}-nav__list__section--start`).length).toBe(0);
    expect(getByTestId('test-id').querySelectorAll(`.${px}-nav__list__section--end`).length).toBe(1);
  });

  it('applies custom className', () => {
    const { getByTestId } = render(
      <NavigationSubmenu {...reqProps} className="custom-class">
        <NavigationItem href="#" navGroup="nav-link-start" label="Item 1" />
      </NavigationSubmenu>,
    );

    expect(getByTestId('test-id')).toHaveClass('custom-class');
  });
});
