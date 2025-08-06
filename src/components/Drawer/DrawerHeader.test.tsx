import { cleanup, render, screen } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import DrawerHeader from './DrawerHeader';
import * as Dialog from '@radix-ui/react-dialog';
import { noOp } from '../../utils';

const renderWithDialog = (children: React.ReactNode) =>
  render(
    <Dialog.Root open>
      <Dialog.Portal>{children}</Dialog.Portal>
    </Dialog.Root>,
  );

const baseProps = {
  baseClassName: 'drawer',
  drawerOpenSide: 'right',
  onClose: noOp,
  headerText: 'Header!',
} as const;

describe('DrawerHeader', () => {
  it('renders header text', () => {
    renderWithDialog(<DrawerHeader {...baseProps} />);
    expect(screen.getByText('Header!')).toBeInTheDocument();
  });

  it('renders close button on the right for right side drawer', () => {
    renderWithDialog(<DrawerHeader {...baseProps} drawerOpenSide="right" />);
    const leftBookend = document.querySelector('.drawer-header__bookend-left');
    const rightBookend = document.querySelector('.drawer-header__bookend-right');
    expect(leftBookend?.querySelector('[data-testid="drawer-close"]')).not.toBeInTheDocument();
    expect(rightBookend?.querySelector('[data-testid="drawer-close"]')).toBeInTheDocument();
  });

  it('renders close button on the right for left side drawer', () => {
    renderWithDialog(<DrawerHeader {...baseProps} drawerOpenSide="left" />);
    const leftBookend = document.querySelector('.drawer-header__bookend-left');
    const rightBookend = document.querySelector('.drawer-header__bookend-right');
    expect(leftBookend?.querySelector('[data-testid="drawer-close"]')).not.toBeInTheDocument();
    expect(rightBookend?.querySelector('[data-testid="drawer-close"]')).toBeInTheDocument();
  });

  it('renders close button on the left for bottom drawer', () => {
    renderWithDialog(<DrawerHeader {...baseProps} drawerOpenSide="bottom" />);
    const leftBookend = document.querySelector('.drawer-header__bookend-left');
    const rightBookend = document.querySelector('.drawer-header__bookend-right');
    expect(leftBookend?.querySelector('[data-testid="drawer-close"]')).toBeInTheDocument();
    expect(rightBookend?.querySelector('[data-testid="drawer-close"]')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked in either position', async () => {
    const onClose = vi.fn();
    renderWithDialog(
      <DrawerHeader baseClassName="drawer" headerText="Header" onClose={onClose} drawerOpenSide="right" />,
    );
    await userEvent.click(screen.getByTestId('drawer-close'));
    expect(onClose).toHaveBeenCalled();
    cleanup();
    renderWithDialog(
      <DrawerHeader baseClassName="drawer" headerText="Header" onClose={onClose} drawerOpenSide="left" />,
    );
    await userEvent.click(screen.getByTestId('drawer-close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('renders header and hr when headerText is supplied', () => {
    renderWithDialog(
      <DrawerHeader baseClassName="drawer" headerText="My Drawer Header" onClose={noOp} drawerOpenSide="right" />,
    );
    // Header text should be in the document
    expect(screen.getByText('My Drawer Header', { selector: 'h3' })).toBeInTheDocument();
    // The hr should be present (by class)
    expect(document.querySelector('.drawer-header__hr')).toBeInTheDocument();
  });

  it('does not render hr when headerText is not supplied', () => {
    renderWithDialog(<DrawerHeader baseClassName="drawer" onClose={noOp} drawerOpenSide="right" />);
    // The hr should not be present (by class)
    expect(document.querySelector('.drawer-header__hr')).not.toBeInTheDocument();
  });
});
