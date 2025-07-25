import Drawer from './Drawer';
import { runCommonTests } from '../../utils/testUtils';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Drawer', () => {
  runCommonTests((props) => <Drawer isOpen={true} {...props} />, 'Drawer');

  test('renders children when isOpen is true', () => {
    render(
      <Drawer isOpen={true} onClose={() => ({})}>
        <div>Test Content</div>
      </Drawer>,
    );

    const testContent = screen.getByText('Test Content');
    expect(testContent).toBeInTheDocument();
  });

  test('does not render children when isOpen is false', () => {
    render(
      <Drawer isOpen={false} onClose={() => ({})}>
        <div>Test Content</div>
      </Drawer>,
    );

    const testContent = screen.queryByText('Test Content');
    expect(testContent).toBeNull();
  });

  test('calls onClose when overlay is clicked', async () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen={true} onClose={onClose}>
        <div>Test Content</div>
      </Drawer>,
    );

    const overlay = screen.getByTestId('drawer-overlay');
    await userEvent.click(overlay);

    expect(onClose).toHaveBeenCalled();
  });

  test('calls onClose when Esc is pressed', async () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen={true} onClose={onClose}>
        <div>Test Content</div>
      </Drawer>,
    );

    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  test('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen={true} onClose={onClose}>
        <div>Test Content</div>
      </Drawer>,
    );

    const closeButton = screen.getByTestId('drawer-close');
    await userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  test('renders header and hr when headerText is supplied', () => {
    render(
      <Drawer isOpen={true} onClose={() => void 0} headerText="My Drawer Header">
        <div>Test Content</div>
      </Drawer>,
    );
    // Header text should be in the document
    expect(screen.getByText('My Drawer Header', { selector: 'h2' })).toBeInTheDocument();
    // The hr should be present (by class)
    expect(document.querySelector('.seldon-drawer-header__hr')).toBeInTheDocument();
  });
});
