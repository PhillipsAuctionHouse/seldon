import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { px } from '../../utils';
import { runCommonTests } from '../../utils/testUtils';
import { TextVariants } from '../Text';
import SlideToActivate from './SlideToActivate';
import {
  SlideToActivateBorderRadii,
  SlideToActivateDisabledReasons,
  SlideToActivateDirections,
  SlideToActivateSizes,
} from './types';

vi.mock('../../utils/useReducedMotion', () => ({
  useReducedMotion: () => true,
}));

describe('SlideToActivate', () => {
  runCommonTests(SlideToActivate, 'SlideToActivate', { labelText: 'Swipe to confirm' });

  it('renders the label and default class names', () => {
    render(<SlideToActivate labelText="Swipe to confirm" />);
    expect(screen.getByText('Swipe to confirm')).toBeInTheDocument();
    expect(screen.getByTestId('slide-to-activate')).toHaveClass(`${px}-slide-to-activate`);
    expect(screen.getByRole('button', { name: 'Swipe to confirm' })).toBeInTheDocument();
  });

  it('activates on Enter and shows pending until onActivation settles', async () => {
    const user = userEvent.setup();
    let resolveActivation: (() => void) | undefined;
    const onActivation = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveActivation = resolve;
        }),
    );

    render(<SlideToActivate labelText="Swipe to place bid" onActivation={onActivation} />);

    screen.getByRole('button', { name: 'Swipe to place bid' }).focus();
    await user.keyboard('{Enter}');

    expect(onActivation).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'pending');
    });
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Swipe to place bid');

    resolveActivation?.();
    await waitFor(() => {
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'idle');
    });
  });

  it('stays latched at the end after successful activation (no snap-back)', async () => {
    const user = userEvent.setup();
    const onProgress = vi.fn();
    const onActivation = vi.fn(() => Promise.resolve());

    render(<SlideToActivate labelText="Confirm" onActivation={onActivation} onProgress={onProgress} />);
    screen.getByRole('button', { name: 'Confirm' }).focus();
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(onActivation).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'idle');
    });
    expect(onProgress).toHaveBeenCalledWith(1);
  });

  it('snaps back to idle when onActivation rejects', async () => {
    const user = userEvent.setup();
    const onProgress = vi.fn();
    const onError = vi.fn();
    const onActivation = vi.fn(() => Promise.reject(new Error('fail')));

    render(
      <SlideToActivate labelText="Confirm" onActivation={onActivation} onError={onError} onProgress={onProgress} />,
    );
    screen.getByRole('button', { name: 'Confirm' }).focus();
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'idle');
    });
    expect(onProgress).toHaveBeenCalledWith(0);
  });

  it('does not activate when disabled', async () => {
    const user = userEvent.setup();
    const onActivation = vi.fn(() => Promise.resolve());

    render(<SlideToActivate labelText="Confirm" onActivation={onActivation} isDisabled />);
    const thumb = screen.getByRole('button', { name: 'Confirm' });
    expect(thumb).toBeDisabled();
    await user.click(thumb);
    expect(onActivation).not.toHaveBeenCalled();
  });

  it('calls onError when onActivation rejects', async () => {
    const user = userEvent.setup();
    const error = new Error('bid failed');
    const onError = vi.fn();
    const onActivation = vi.fn(() => Promise.reject(error));

    render(<SlideToActivate labelText="Confirm" onActivation={onActivation} onError={onError} />);
    screen.getByRole('button', { name: 'Confirm' }).focus();
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith(error);
    });
    await waitFor(() => {
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'idle');
    });
  });

  it('console.errors when onActivation rejects and onError is omitted', async () => {
    const user = userEvent.setup();
    const error = new Error('network');
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const onActivation = vi.fn(() => Promise.reject(error));

    render(<SlideToActivate labelText="Confirm" onActivation={onActivation} />);
    screen.getByRole('button', { name: 'Confirm' }).focus();
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    });
    consoleErrorSpy.mockRestore();
  });

  it('renders a pill thumb when thumbWidth is set', () => {
    render(<SlideToActivate labelText="Confirm" thumbWidth={72} />);
    expect(screen.getByRole('button', { name: 'Confirm' })).toHaveClass(`${px}-slide-to-activate__thumb--pill`);
  });

  it('supports custom pendingIndicator', async () => {
    const user = userEvent.setup();
    let resolveActivation: (() => void) | undefined;
    const onActivation = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveActivation = resolve;
        }),
    );

    render(
      <SlideToActivate labelText="Confirm" onActivation={onActivation} pendingIndicator={<span>Working…</span>} />,
    );
    screen.getByRole('button', { name: 'Confirm' }).focus();
    await user.keyboard('{Enter}');

    expect(await screen.findByText('Working…')).toBeInTheDocument();
    resolveActivation?.();
    await waitFor(() => {
      expect(screen.queryByText('Working…')).not.toBeInTheDocument();
    });
  });

  it('hides the thumb when disabled and showThumbWhenDisabled is false', () => {
    render(<SlideToActivate labelText="Unavailable" isDisabled showThumbWhenDisabled={false} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByTestId('slide-to-activate')).toHaveClass(`${px}-slide-to-activate--disabled-hide-thumb`);
    expect(document.querySelector(`.${px}-slide-to-activate__thumb--hidden`)).toBeInTheDocument();
  });

  it('applies the small size modifier', () => {
    render(<SlideToActivate labelText="Confirm" size={SlideToActivateSizes.small} />);
    expect(screen.getByTestId('slide-to-activate')).toHaveClass(`${px}-slide-to-activate--small`);
  });

  it('applies textVariant to the track label', () => {
    render(<SlideToActivate labelText="Confirm" textVariant={TextVariants.labelLarge} />);
    expect(screen.getByText('Confirm')).toHaveClass(`${px}-text--labelLarge`);
  });

  it('applies the rtl modifier so the thumb icon can mirror', () => {
    render(<SlideToActivate labelText="Confirm" direction={SlideToActivateDirections.rtl} />);
    expect(screen.getByTestId('slide-to-activate')).toHaveClass(`${px}-slide-to-activate--rtl`);
  });

  it('focuses the thumb when the track gutter is pressed', async () => {
    const user = userEvent.setup();
    render(<SlideToActivate labelText="Confirm" />);
    const thumb = screen.getByRole('button', { name: 'Confirm' });
    const track = document.querySelector(`.${px}-slide-to-activate__track`);
    expect(track).toBeTruthy();
    expect(thumb).not.toHaveFocus();
    await user.click(track as HTMLElement);
    expect(thumb).toHaveFocus();
  });

  it('focuses the thumb on thumb pointerdown (despite drag preventDefault)', async () => {
    const user = userEvent.setup();
    render(<SlideToActivate labelText="Confirm" />);
    const thumb = screen.getByRole('button', { name: 'Confirm' });
    expect(thumb).not.toHaveFocus();
    await user.pointer({ keys: '[MouseLeft>]', target: thumb });
    expect(thumb).toHaveFocus();
    await user.pointer({ keys: '[/MouseLeft]' });
  });

  it('applies a shared border radius modifier', () => {
    render(<SlideToActivate labelText="Confirm" borderRadius={SlideToActivateBorderRadii.threeXl} />);
    expect(screen.getByTestId('slide-to-activate')).toHaveClass(`${px}-slide-to-activate--radius-3xl`);
  });

  it('uses blocked disabled styles by default', () => {
    render(<SlideToActivate labelText="Bidding closed" isDisabled />);
    const root = screen.getByTestId('slide-to-activate');
    expect(root).toHaveClass(`${px}-slide-to-activate--disabled-blocked`);
    expect(root).toHaveAttribute('data-disabled-reason', SlideToActivateDisabledReasons.blocked);
  });

  it('uses complete disabled styles and always hides the thumb', () => {
    render(
      <SlideToActivate labelText="Bid placed" isDisabled disabledReason={SlideToActivateDisabledReasons.complete} />,
    );
    const root = screen.getByTestId('slide-to-activate');
    expect(root).toHaveClass(`${px}-slide-to-activate--disabled-complete`);
    expect(root).toHaveClass(`${px}-slide-to-activate--disabled-hide-thumb`);
    expect(root).toHaveAttribute('data-disabled-reason', SlideToActivateDisabledReasons.complete);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
