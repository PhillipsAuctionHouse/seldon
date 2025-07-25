import { render, screen } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { DrawerHeader } from './DrawerHeader';
import * as Dialog from '@radix-ui/react-dialog';

function renderWithDialog(children: React.ReactNode) {
  return render(
    <Dialog.Root open>
      <Dialog.Portal>{children}</Dialog.Portal>
    </Dialog.Root>,
  );
}

describe('DrawerHeader', () => {
  it('renders header text', () => {
    renderWithDialog(<DrawerHeader baseClassName="drawer-header" headerText="Header!" onClose={() => void 0} />);
    expect(screen.getByText('Header!')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    renderWithDialog(<DrawerHeader baseClassName="drawer-header" headerText="Header" onClose={onClose} />);
    await userEvent.click(screen.getByTestId('drawer-close'));
    expect(onClose).toHaveBeenCalled();
  });
});
