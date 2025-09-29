import { fireEvent, render, screen } from '@testing-library/react';
import Drawer from './Drawer';

describe('Drawer', () => {
  it.each([
    [true, 'renders children when open', true],
    [false, 'does not render children when closed', false],
  ])('%s', (isOpen, _desc, shouldRender) => {
    render(
      <Drawer isOpen={isOpen}>
        <div data-testid="drawer-content">Drawer Content</div>
      </Drawer>,
    );
    if (shouldRender) {
      expect(screen.getByTestId('drawer-content')).toBeInTheDocument();
    } else {
      expect(screen.queryByTestId('drawer-content')).not.toBeInTheDocument();
    }
  });

  it('calls onClose when overlay is clicked', () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen onClose={onClose}>
        <div>Drawer Content</div>
      </Drawer>,
    );
    fireEvent.click(screen.getByTestId('drawer-overlay'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked (default variant)', () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen onClose={onClose}>
        <div>Drawer Content</div>
      </Drawer>,
    );
    fireEvent.click(screen.getByTestId('drawer-close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('does render headerText for bottomSheet variant', () => {
    render(
      <Drawer isOpen drawerOpenSide="bottom" headerText="Bottom Content">
        <div>Drawer Content</div>
      </Drawer>,
    );
    expect(screen.getByText('Bottom Content')).toBeInTheDocument();
  });

  it('applies custom className and data-side', () => {
    render(
      <Drawer isOpen className="custom-class" drawerOpenSide="left">
        <div>Drawer Content</div>
      </Drawer>,
    );
    const content = screen.getByRole('dialog');
    expect(content).toHaveClass('custom-class');
    expect(content).toHaveAttribute('data-side', 'left');
  });

  it('forwards id and other props', () => {
    render(
      <Drawer isOpen id="drawer-id" aria-label="Drawer Label">
        <div>Drawer Content</div>
      </Drawer>,
    );
    const content = screen.getByRole('dialog');
    expect(content).toHaveAttribute('id', 'drawer-id');
    expect(content).toHaveAttribute('aria-label', 'Drawer Label');
  });
});
