import NotificationBanner from './NotificationBanner';
import { runCommonTests } from '../../utils/testUtils';
import { forwardRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const ComponentWithRef = forwardRef<HTMLDivElement, React.ComponentProps<typeof NotificationBanner>>((props, ref) => (
  <NotificationBanner {...props} ref={ref} />
));
ComponentWithRef.displayName = 'ComponentWithRef';

describe('NotificationBanner content', () => {
  runCommonTests(ComponentWithRef, 'NotificationBanner');
  it('renders children', () => {
    render(<NotificationBanner>Homemaker</NotificationBanner>);
    expect(screen.getByText('Homemaker')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<NotificationBanner className="sudan-archives">Selfish Soul</NotificationBanner>);
    expect(screen.getByText('Selfish Soul')).toHaveClass('sudan-archives');
  });

  it('passes id prop', () => {
    render(<NotificationBanner id="nb-id">Nont For Sale</NotificationBanner>);
    expect(screen.getByText('Nont For Sale')).toHaveAttribute('id', 'nb-id');
  });
});

describe('NotificationBanner accessibility', () => {
  it('is accessible by role', () => {
    render(<NotificationBanner role="status">Did You Know?</NotificationBanner>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('can be focused', () => {
    render(<NotificationBanner tabIndex={0}>Home Maker</NotificationBanner>);
    const banner = screen.getByText('Home Maker');
    banner && banner.focus();
    expect(banner).toHaveFocus();
  });
});

describe('NotificationBanner interaction', () => {
  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<NotificationBanner onClick={handleClick}>Glorious</NotificationBanner>);
    await userEvent.click(screen.getByText('Glorious'));
    expect(handleClick).toHaveBeenCalled();
  });
});
