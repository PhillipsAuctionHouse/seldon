import { fireEvent, render, screen } from '@testing-library/react';
import { ProgressBar } from './index';
import { Text, TextVariants } from '../Text';

describe('ProgressBar', () => {
  it('renders lot progress text', () => {
    render(<ProgressBar current={8} total={110} />);
    expect(screen.getByText('8/110')).toBeInTheDocument();
  });

  it('uses custom progress aria-label when provided', () => {
    render(<ProgressBar current={2} total={10} progressAriaLabel="Auction progress" />);
    expect(screen.getByRole('progressbar', { name: 'Auction progress' })).toBeInTheDocument();
  });

  it('shows tooltip content near pointer position on track when provided', () => {
    render(
      <ProgressBar
        current={40}
        total={80}
        tooltipContent={
          <Text element="span" variant={TextVariants.headingExtraSmall}>
            Live lot 40 of 80
          </Text>
        }
      />,
    );
    const track = screen.getByText('40/80').closest('.seldon-progress-bar__track');
    expect(track).not.toBeNull();
    if (!track) {
      return;
    }

    Object.defineProperty(track, 'getBoundingClientRect', {
      value: () => ({
        width: 200,
        left: 10,
        right: 210,
        top: 0,
        bottom: 0,
        height: 0,
        x: 10,
        y: 0,
        toJSON: () => ({}),
      }),
    });

    fireEvent.mouseMove(track, { clientX: 110 });
    expect(screen.getByText('Live lot 40 of 80')).toBeInTheDocument();
  });

  it('supports custom tooltip content', () => {
    render(
      <ProgressBar
        current={40}
        total={80}
        tooltipContent={
          <Text element="span" variant={TextVariants.headingExtraSmall}>
            Lot en direct 40 sur 80
          </Text>
        }
      />,
    );
    const track = screen.getByText('40/80').closest('.seldon-progress-bar__track');
    expect(track).not.toBeNull();
    if (!track) {
      return;
    }

    Object.defineProperty(track, 'getBoundingClientRect', {
      value: () => ({
        width: 200,
        left: 10,
        right: 210,
        top: 0,
        bottom: 0,
        height: 0,
        x: 10,
        y: 0,
        toJSON: () => ({}),
      }),
    });

    fireEvent.mouseMove(track, { clientX: 110 });
    expect(screen.getByText('Lot en direct 40 sur 80')).toBeInTheDocument();
  });

  it('does not show a tooltip when tooltipContent is omitted', () => {
    render(<ProgressBar current={40} total={80} />);
    const track = screen.getByText('40/80').closest('.seldon-progress-bar__track');
    expect(track).not.toBeNull();
    if (!track) {
      return;
    }

    fireEvent.mouseMove(track, { clientX: 110 });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(document.querySelector('.seldon-progress-bar__hover-tooltip')).not.toBeInTheDocument();
  });
});
