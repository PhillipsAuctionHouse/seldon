import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { px } from '../../utils';
import { runCommonTests } from '../../utils/testUtils';
import { TextVariants } from '../Text';
import SlideToActivate from './SlideToActivate';
import { SlideToActivateBorderRadii, SlideToActivateDirections, SlideToActivateSizes } from './types';

const { useReducedMotion } = vi.hoisted(() => ({ useReducedMotion: vi.fn(() => true) }));
vi.mock('../../utils/useReducedMotion', () => ({ useReducedMotion }));

describe('SlideToActivate', () => {
  runCommonTests(SlideToActivate, 'SlideToActivate', { labelText: 'Swipe to confirm' });

  afterEach(() => {
    useReducedMotion.mockReturnValue(true);
  });

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
    render(<SlideToActivate labelText="Confirm" config={{ thumbWidth: 72 }} />);
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
      <SlideToActivate
        labelText="Confirm"
        onActivation={onActivation}
        config={{ pendingIndicator: <span>Working…</span> }}
      />,
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
    render(<SlideToActivate labelText="Confirm" config={{ size: SlideToActivateSizes.small }} />);
    expect(screen.getByTestId('slide-to-activate')).toHaveClass(`${px}-slide-to-activate--small`);
  });

  it('applies textVariant to the track label', () => {
    render(<SlideToActivate labelText="Confirm" config={{ textVariant: TextVariants.labelLarge }} />);
    expect(screen.getByText('Confirm')).toHaveClass(`${px}-text--labelLarge`);
  });

  it('applies the rtl modifier so the thumb icon can mirror', () => {
    render(<SlideToActivate labelText="Confirm" config={{ direction: SlideToActivateDirections.rtl }} />);
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
    render(<SlideToActivate labelText="Confirm" config={{ borderRadius: SlideToActivateBorderRadii.pill }} />);
    expect(screen.getByTestId('slide-to-activate')).toHaveClass(`${px}-slide-to-activate--radius-pill`);
  });

  it('uses blocked disabled styles by default', () => {
    render(<SlideToActivate labelText="Bidding closed" isDisabled />);
    const root = screen.getByTestId('slide-to-activate');
    expect(root).toHaveClass(`${px}-slide-to-activate--disabled-blocked`);
  });

  it('uses complete styles from isComplete alone and always hides the thumb', () => {
    render(<SlideToActivate labelText="Bid placed" isComplete />);
    const root = screen.getByTestId('slide-to-activate');
    expect(root).toHaveClass(`${px}-slide-to-activate--disabled`);
    expect(root).toHaveClass(`${px}-slide-to-activate--disabled-complete`);
    expect(root).not.toHaveClass(`${px}-slide-to-activate--disabled-blocked`);
    expect(root).toHaveClass(`${px}-slide-to-activate--disabled-hide-thumb`);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders a thumb icon with aria-hidden', () => {
    render(<SlideToActivate labelText="Confirm" config={{ thumbIcon: <svg data-testid="thumb-icon" /> }} />);
    const icon = screen.getByTestId('thumb-icon');
    expect(icon).toBeInTheDocument();
    expect(icon.closest(`.${px}-slide-to-activate__thumb-face`)).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders the default double-chevron thumb icon', () => {
    render(<SlideToActivate labelText="Confirm" />);
    expect(document.querySelector(`.${px}-slide-to-activate__thumb-chevrons`)).toBeInTheDocument();
  });

  it('hides the thumb icon when thumbIcon is null', () => {
    render(<SlideToActivate labelText="Confirm" config={{ thumbIcon: null }} />);
    expect(document.querySelector(`.${px}-slide-to-activate__thumb-chevrons`)).not.toBeInTheDocument();
    expect(document.querySelector(`.${px}-slide-to-activate__thumb-icon`)).not.toBeInTheDocument();
  });

  it('describes keyboard interaction to assistive tech when interactive', () => {
    render(<SlideToActivate labelText="Confirm" />);
    const thumb = screen.getByRole('button', { name: 'Confirm' });
    const descriptionId = thumb.getAttribute('aria-describedby');
    expect(descriptionId).toBeTruthy();
    const description = document.getElementById(descriptionId!);
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(/Space or Enter/i);
    expect(description).toHaveTextContent(/Escape/i);
  });

  it('allows overriding or omitting the keyboard hint', () => {
    const { rerender } = render(<SlideToActivate labelText="Confirm" keyboardHint="Hold Enter, then release." />);
    expect(document.getElementById(screen.getByRole('button').getAttribute('aria-describedby')!)).toHaveTextContent(
      'Hold Enter, then release.',
    );

    rerender(<SlideToActivate labelText="Confirm" keyboardHint="" />);
    expect(screen.getByRole('button', { name: 'Confirm' })).not.toHaveAttribute('aria-describedby');
  });

  it('does not dispatch after unmount while onActivation is pending', async () => {
    const user = userEvent.setup();
    let resolveActivation: (() => void) | undefined;
    const onActivation = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveActivation = resolve;
        }),
    );

    const { unmount } = render(<SlideToActivate labelText="Confirm" onActivation={onActivation} />);
    screen.getByRole('button', { name: 'Confirm' }).focus();
    await user.keyboard('{Enter}');
    await waitFor(() => {
      expect(onActivation).toHaveBeenCalledTimes(1);
    });

    unmount();
    resolveActivation?.();
    await act(async () => {
      await Promise.resolve();
    });
  });

  it('snaps back with a transition when reduced motion is off', async () => {
    useReducedMotion.mockReturnValue(false);
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const onProgress = vi.fn();
    const onActivation = vi.fn(() => Promise.reject(new Error('fail')));
    const onError = vi.fn();

    render(
      <SlideToActivate labelText="Confirm" onActivation={onActivation} onError={onError} onProgress={onProgress} />,
    );
    const thumb = screen.getByRole('button', { name: 'Confirm' });
    thumb.focus();
    fireEvent.keyDown(thumb, { key: 'Enter' });
    fireEvent.keyUp(thumb, { key: 'Enter' });

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
    expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'snapping');

    await act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'idle');
    vi.useRealTimers();
  });

  it('ignores keydown while activation is pending', async () => {
    const user = userEvent.setup();
    let resolveActivation: (() => void) | undefined;
    const onActivation = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveActivation = resolve;
        }),
    );
    const onProgress = vi.fn();

    render(<SlideToActivate labelText="Confirm" onActivation={onActivation} onProgress={onProgress} />);
    const thumb = screen.getByRole('button', { name: 'Confirm' });
    thumb.focus();
    await user.keyboard('{Enter}');
    await waitFor(() => {
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'pending');
    });

    onProgress.mockClear();
    fireEvent.keyDown(thumb, { key: 'Enter' });
    expect(onProgress).not.toHaveBeenCalled();

    resolveActivation?.();
    await waitFor(() => {
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'idle');
    });
  });

  it('cancels a held key on blur before keyup', () => {
    const onActivation = vi.fn(() => Promise.resolve());
    render(<SlideToActivate labelText="Confirm" onActivation={onActivation} />);
    const thumb = screen.getByRole('button', { name: 'Confirm' });
    thumb.focus();

    fireEvent.keyDown(thumb, { key: 'Enter' });
    fireEvent.blur(thumb);
    fireEvent.keyUp(thumb, { key: 'Enter' });

    expect(onActivation).not.toHaveBeenCalled();
  });

  it('calls onStatusChange on each status transition, skipping the initial idle', async () => {
    const user = userEvent.setup();
    const onStatusChange = vi.fn();
    const onActivation = vi.fn(() => Promise.resolve());

    render(<SlideToActivate labelText="Confirm" onActivation={onActivation} onStatusChange={onStatusChange} />);

    expect(onStatusChange).not.toHaveBeenCalled();

    screen.getByRole('button', { name: 'Confirm' }).focus();
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(onActivation).toHaveBeenCalledTimes(1);
    });

    const calls = onStatusChange.mock.calls.map(([s]) => s);
    expect(calls).toContain('pending');
    expect(calls).toContain('idle');
  });

  it('does not snap back when resetOnError is false', async () => {
    const user = userEvent.setup();
    const onError = vi.fn();
    const onActivation = vi.fn(() => Promise.reject(new Error('fail')));

    render(<SlideToActivate labelText="Confirm" onActivation={onActivation} onError={onError} resetOnError={false} />);
    screen.getByRole('button', { name: 'Confirm' }).focus();
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
    expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'idle');
    const thumb = screen.getByRole('button', { name: 'Confirm' });
    expect(thumb).not.toHaveClass(/snap/);
  });

  it('removes the description when disabled', () => {
    render(<SlideToActivate labelText="Confirm" isDisabled showThumbWhenDisabled />);
    const thumb = screen.getByRole('button', { name: 'Confirm' });
    expect(thumb).not.toHaveAttribute('aria-describedby');
  });

  it('ignores irrelevant keys', () => {
    const onProgress = vi.fn();
    render(<SlideToActivate labelText="Confirm" onProgress={onProgress} />);
    screen.getByRole('button', { name: 'Confirm' }).focus();

    fireEvent.keyDown(screen.getByRole('button', { name: 'Confirm' }), { key: 'a' });

    expect(onProgress).not.toHaveBeenCalled();
    expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'idle');
  });

  it('ignores a repeated keydown while a key is already held', () => {
    const onProgress = vi.fn();
    render(<SlideToActivate labelText="Confirm" onProgress={onProgress} />);
    const thumb = screen.getByRole('button', { name: 'Confirm' });
    thumb.focus();

    fireEvent.keyDown(thumb, { key: 'Enter' });
    onProgress.mockClear();
    fireEvent.keyDown(thumb, { key: 'Enter', repeat: true });

    expect(onProgress).not.toHaveBeenCalled();
  });

  it('ignores a keyup for a different key than the one held', () => {
    const onActivation = vi.fn(() => Promise.resolve());
    render(<SlideToActivate labelText="Confirm" onActivation={onActivation} />);
    const thumb = screen.getByRole('button', { name: 'Confirm' });
    thumb.focus();

    fireEvent.keyDown(thumb, { key: 'Enter' });
    fireEvent.keyUp(thumb, { key: ' ' });

    expect(onActivation).not.toHaveBeenCalled();
    expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'idle');
  });

  it('resets to idle when re-enabled after being disabled mid-gesture', () => {
    const onProgress = vi.fn();
    const { rerender } = render(<SlideToActivate labelText="Confirm" onProgress={onProgress} isDisabled />);

    rerender(<SlideToActivate labelText="Confirm" onProgress={onProgress} isDisabled={false} />);

    expect(onProgress).toHaveBeenCalledWith(0);
    expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'idle');
  });

  it('does not crash without ResizeObserver support', () => {
    const original = window.ResizeObserver;
    // @ts-expect-error simulating an environment without ResizeObserver — the setup file's mock
    // is non-configurable, so it must be overwritten rather than deleted.
    window.ResizeObserver = undefined;

    expect(() => render(<SlideToActivate labelText="Confirm" />)).not.toThrow();

    window.ResizeObserver = original;
  });

  it('remeasures travel when the track resizes', () => {
    let resizeCallback: (() => void) | undefined;
    const original = window.ResizeObserver;
    class CapturingResizeObserver {
      constructor(callback: () => void) {
        resizeCallback = callback;
      }
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    // @ts-expect-error minimal ResizeObserver stub for this test
    window.ResizeObserver = CapturingResizeObserver;

    render(<SlideToActivate labelText="Confirm" />);
    expect(resizeCallback).toBeDefined();
    expect(() => act(() => resizeCallback?.())).not.toThrow();

    window.ResizeObserver = original;
  });

  describe('pointer drag', () => {
    // maxTravel 140 — matches slideToActivateUtils.test.ts fixture (200 track − 44 thumb − 16 inset).
    const TRACK_RECT = {
      width: 200,
      height: 44,
      top: 0,
      left: 0,
      right: 200,
      bottom: 44,
      x: 0,
      y: 0,
      toJSON: () => undefined,
    };
    const THUMB_RECT = {
      width: 44,
      height: 40,
      top: 2,
      left: 8,
      right: 52,
      bottom: 42,
      x: 8,
      y: 2,
      toJSON: () => undefined,
    };

    beforeEach(() => {
      vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
        if (this.classList.contains(`${px}-slide-to-activate__track`)) {
          return TRACK_RECT as DOMRect;
        }
        if (this.classList.contains(`${px}-slide-to-activate__thumb`)) {
          return THUMB_RECT as DOMRect;
        }
        return {
          width: 0,
          height: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          x: 0,
          y: 0,
          toJSON: () => undefined,
        } as DOMRect;
      });
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    // fireEvent.pointer* — jsdom lacks native PointerEvent; userEvent.pointer skips our polyfill.
    const drag = (thumb: HTMLElement, fromX: number, toX: number) => {
      fireEvent.pointerDown(thumb, { pointerId: 1, clientX: fromX, button: 0 });
      fireEvent.pointerMove(thumb, { pointerId: 1, clientX: toX });
      fireEvent.pointerMove(document, { pointerId: 1, clientX: toX });
    };

    const release = (thumb?: HTMLElement) => {
      if (thumb) {
        fireEvent.pointerUp(thumb, { pointerId: 1 });
      }
      fireEvent.pointerUp(document, { pointerId: 1 });
    };

    it('ignores movement within the dead zone', () => {
      const onProgress = vi.fn();
      render(<SlideToActivate labelText="Confirm" onProgress={onProgress} />);
      const thumb = screen.getByRole('button', { name: 'Confirm' });

      drag(thumb, 20, 24);
      release(thumb);

      expect(onProgress).toHaveBeenCalledTimes(1);
      expect(onProgress).toHaveBeenCalledWith(0);
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'idle');
    });

    it('emits progress past the dead zone and snaps back below the threshold', async () => {
      const onProgress = vi.fn();
      render(<SlideToActivate labelText="Confirm" onProgress={onProgress} />);
      const thumb = screen.getByRole('button', { name: 'Confirm' });

      drag(thumb, 20, 90);
      release(thumb);

      expect(onProgress).toHaveBeenCalledWith(0.5);
      await waitFor(() => {
        expect(onProgress).toHaveBeenLastCalledWith(0);
      });
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'idle');
    });

    it('activates when dragged past requiredProgress', async () => {
      const onActivation = vi.fn(() => Promise.resolve());
      render(<SlideToActivate labelText="Confirm" onActivation={onActivation} />);
      const thumb = screen.getByRole('button', { name: 'Confirm' });

      drag(thumb, 20, 160);
      release(thumb);

      await waitFor(() => {
        expect(onActivation).toHaveBeenCalledTimes(1);
      });
    });

    it('flips the drag direction under rtl', () => {
      // Thumb starts at trailing edge — same fixture as slideToActivateUtils.test.ts rtl case.
      vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
        if (this.classList.contains(`${px}-slide-to-activate__track`)) {
          return TRACK_RECT as DOMRect;
        }
        if (this.classList.contains(`${px}-slide-to-activate__thumb`)) {
          return {
            width: 44,
            height: 40,
            top: 2,
            left: 148,
            right: 192,
            bottom: 42,
            x: 148,
            y: 2,
            toJSON: () => undefined,
          } as DOMRect;
        }
        return {
          width: 0,
          height: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          x: 0,
          y: 0,
          toJSON: () => undefined,
        } as DOMRect;
      });

      const onProgress = vi.fn();
      render(
        <SlideToActivate
          labelText="Confirm"
          onProgress={onProgress}
          config={{ direction: SlideToActivateDirections.rtl }}
        />,
      );
      const thumb = screen.getByRole('button', { name: 'Confirm' });

      drag(thumb, 100, 30);
      release(thumb);

      expect(onProgress).toHaveBeenCalledWith(0.5);
    });

    it('ignores a pointerdown while disabled or busy', () => {
      const onProgress = vi.fn();
      render(<SlideToActivate labelText="Confirm" onProgress={onProgress} isDisabled showThumbWhenDisabled />);
      const thumb = screen.getByRole('button', { name: 'Confirm' });

      drag(thumb, 20, 90);
      release(thumb);

      expect(onProgress).not.toHaveBeenCalled();
    });

    it('ignores a pointerup with no drag in progress', () => {
      const onProgress = vi.fn();
      const onActivation = vi.fn(() => Promise.resolve());
      render(<SlideToActivate labelText="Confirm" onProgress={onProgress} onActivation={onActivation} />);

      release();

      expect(onProgress).not.toHaveBeenCalled();
      expect(onActivation).not.toHaveBeenCalled();
    });

    it('ignores pointermove and pointerup from an unrelated pointer', () => {
      const onProgress = vi.fn();
      render(<SlideToActivate labelText="Confirm" onProgress={onProgress} />);
      const thumb = screen.getByRole('button', { name: 'Confirm' });

      fireEvent.pointerDown(thumb, { pointerId: 1, clientX: 20, button: 0 });
      fireEvent.pointerMove(document, { pointerId: 2, clientX: 90 });
      fireEvent.pointerUp(document, { pointerId: 2 });

      expect(onProgress).not.toHaveBeenCalled();
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'dragging');

      fireEvent.pointerUp(thumb, { pointerId: 1 });
      fireEvent.pointerUp(document, { pointerId: 1 });
    });

    it('remeasures travel mid-drag if it was not yet available', () => {
      let layoutReady = false;
      vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
        if (!layoutReady) {
          return {
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            x: 0,
            y: 0,
            toJSON: () => undefined,
          } as DOMRect;
        }
        if (this.classList.contains(`${px}-slide-to-activate__track`)) {
          return TRACK_RECT as DOMRect;
        }
        if (this.classList.contains(`${px}-slide-to-activate__thumb`)) {
          return THUMB_RECT as DOMRect;
        }
        return {
          width: 0,
          height: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          x: 0,
          y: 0,
          toJSON: () => undefined,
        } as DOMRect;
      });

      const onProgress = vi.fn();
      render(<SlideToActivate labelText="Confirm" onProgress={onProgress} />);
      const thumb = screen.getByRole('button', { name: 'Confirm' });

      fireEvent.pointerDown(thumb, { pointerId: 1, clientX: 20, button: 0 });
      layoutReady = true;
      fireEvent.pointerMove(thumb, { pointerId: 1, clientX: 90 });
      fireEvent.pointerMove(document, { pointerId: 1, clientX: 90 });
      release(thumb);

      expect(onProgress).toHaveBeenCalledWith(0.5);
    });
    it('uses thumb handlers when pointer capture succeeds', async () => {
      const onActivation = vi.fn(() => Promise.resolve());
      render(<SlideToActivate labelText="Confirm" onActivation={onActivation} />);
      const thumb = screen.getByRole('button', { name: 'Confirm' });

      Object.defineProperty(thumb, 'setPointerCapture', {
        configurable: true,
        value: vi.fn(),
      });
      Object.defineProperty(thumb, 'hasPointerCapture', {
        configurable: true,
        value: vi.fn(() => true),
      });
      Object.defineProperty(thumb, 'releasePointerCapture', {
        configurable: true,
        value: vi.fn(),
      });

      fireEvent.pointerDown(thumb, { pointerId: 1, clientX: 20, button: 0 });
      fireEvent.pointerMove(thumb, { pointerId: 1, clientX: 160, cancelable: true });
      fireEvent.pointerUp(thumb, { pointerId: 1 });

      await waitFor(() => {
        expect(onActivation).toHaveBeenCalledTimes(1);
      });
    });

    it('ignores a move for a different pointer id on the thumb', () => {
      const onProgress = vi.fn();
      render(<SlideToActivate labelText="Confirm" onProgress={onProgress} />);
      const thumb = screen.getByRole('button', { name: 'Confirm' });

      fireEvent.pointerDown(thumb, { pointerId: 1, clientX: 20, button: 0 });
      fireEvent.pointerMove(thumb, { pointerId: 2, clientX: 90 });
      expect(onProgress).not.toHaveBeenCalled();
      release(thumb);
    });

    it('does not advance progress when travel cannot be measured mid-drag', () => {
      vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        x: 0,
        y: 0,
        toJSON: () => undefined,
      } as DOMRect);

      const onProgress = vi.fn();
      const onActivation = vi.fn(() => Promise.resolve());
      render(<SlideToActivate labelText="Confirm" onProgress={onProgress} onActivation={onActivation} />);
      const thumb = screen.getByRole('button', { name: 'Confirm' });

      drag(thumb, 20, 90);
      release(thumb);

      expect(onActivation).not.toHaveBeenCalled();
      expect(onProgress.mock.calls.every(([progress]) => progress === 0)).toBe(true);
    });
  });

  it('cancels an in-progress key hold on Escape, preventing activation on keyup', () => {
    const onActivation = vi.fn(() => Promise.resolve());
    render(<SlideToActivate labelText="Confirm" onActivation={onActivation} />);
    const thumb = screen.getByRole('button', { name: 'Confirm' });
    thumb.focus();

    fireEvent.keyDown(thumb, { key: 'Enter' });
    fireEvent.keyDown(thumb, { key: 'Escape' });
    fireEvent.keyUp(thumb, { key: 'Enter' });

    expect(onActivation).not.toHaveBeenCalled();
    expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'idle');
  });
});
