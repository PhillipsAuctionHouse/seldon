import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { px } from '../../utils';
import { runCommonTests } from '../../utils/testUtils';
import { TextVariants } from '../Text';
import SlideToActivate from './SlideToActivate';
import { KEYBOARD_CHARGE_MS, KEYBOARD_FINISH_MS, SNAP_MS } from './slideToActivateUtils';
import {
  SlideToActivateBorderRadii,
  SlideToActivateDisabledReasons,
  SlideToActivateDirections,
  SlideToActivateSizes,
} from './types';

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
    render(<SlideToActivate labelText="Confirm" borderRadius={SlideToActivateBorderRadii.pill} />);
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

  it('renders a thumb icon with aria-hidden', () => {
    render(<SlideToActivate labelText="Confirm" thumbIcon={<svg data-testid="thumb-icon" />} />);
    const icon = screen.getByTestId('thumb-icon');
    expect(icon).toBeInTheDocument();
    expect(icon.closest(`.${px}-slide-to-activate__thumb-face`)).toHaveAttribute('aria-hidden', 'true');
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
    fireEvent.keyDown(thumb, { key: 'Enter', repeat: true }); // OS key-repeat, should be a no-op

    expect(onProgress).not.toHaveBeenCalled();
  });

  it('ignores a keyup for a different key than the one held', () => {
    const onActivation = vi.fn(() => Promise.resolve());
    render(<SlideToActivate labelText="Confirm" onActivation={onActivation} />);
    const thumb = screen.getByRole('button', { name: 'Confirm' });
    thumb.focus();

    fireEvent.keyDown(thumb, { key: 'Enter' });
    fireEvent.keyUp(thumb, { key: ' ' }); // releasing a key that was never pressed down

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
    // maxTravel = trackRect.width - thumbRect.width - inset*2 = 200 - 44 - 2*8 = 140,
    // matching the fixture in slideToActivateUtils.test.ts.
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

    // fireEvent (not userEvent.pointer) — jsdom has no native PointerEvent, and the
    // project's PointerEvent polyfill (config/vitest/setupTest.ts) only fixes property
    // forwarding for the raw fireEvent.pointerX helpers, not userEvent's higher-level API.
    const drag = (thumb: HTMLElement, fromX: number, toX: number) => {
      fireEvent.pointerDown(thumb, { pointerId: 1, clientX: fromX, button: 0 });
      fireEvent.pointerMove(document, { pointerId: 1, clientX: toX });
    };

    const release = () => {
      fireEvent.pointerUp(document, { pointerId: 1 });
    };

    it('ignores movement within the dead zone', () => {
      const onProgress = vi.fn();
      render(<SlideToActivate labelText="Confirm" onProgress={onProgress} />);
      const thumb = screen.getByRole('button', { name: 'Confirm' });

      drag(thumb, 20, 24); // 4px, under the default 8px deadZone
      release();

      // Never clears the dead zone, so progress never moves off 0 — release's snap-to-idle
      // still re-emits 0 unconditionally, so this is the one (no-op) call, not zero calls.
      expect(onProgress).toHaveBeenCalledTimes(1);
      expect(onProgress).toHaveBeenCalledWith(0);
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'idle');
    });

    it('emits progress past the dead zone and snaps back below the threshold', async () => {
      const onProgress = vi.fn();
      render(<SlideToActivate labelText="Confirm" onProgress={onProgress} />);
      const thumb = screen.getByRole('button', { name: 'Confirm' });

      drag(thumb, 20, 90); // 70px of 140px travel = 0.5
      release();

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

      drag(thumb, 20, 160); // full 140px travel
      release();

      await waitFor(() => {
        expect(onActivation).toHaveBeenCalledTimes(1);
      });
    });

    it('activates at the track edge even when requiredProgress is set above 1', async () => {
      const onActivation = vi.fn(() => Promise.resolve());
      render(<SlideToActivate labelText="Confirm" onActivation={onActivation} requiredProgress={2} />);
      const thumb = screen.getByRole('button', { name: 'Confirm' });

      drag(thumb, 20, 400); // dragged well past full travel, progress clamps to 1
      release();

      await waitFor(() => {
        expect(onActivation).toHaveBeenCalledTimes(1);
      });
    });

    it('flips the drag direction under rtl', () => {
      // rtl inset is measured from the track's trailing (right) edge, so the thumb needs to
      // start there too — same fixture as the rtl case in slideToActivateUtils.test.ts.
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
      render(<SlideToActivate labelText="Confirm" onProgress={onProgress} direction={SlideToActivateDirections.rtl} />);
      const thumb = screen.getByRole('button', { name: 'Confirm' });

      drag(thumb, 100, 30); // moving toward track-start increases progress under rtl
      release();

      expect(onProgress).toHaveBeenCalledWith(0.5);
    });

    it('ignores a pointerdown while disabled or busy', () => {
      const onProgress = vi.fn();
      render(<SlideToActivate labelText="Confirm" onProgress={onProgress} isDisabled showThumbWhenDisabled />);
      const thumb = screen.getByRole('button', { name: 'Confirm' });

      drag(thumb, 20, 90);
      release();

      expect(onProgress).not.toHaveBeenCalled();
    });

    it('ignores a pointerup with no drag in progress', () => {
      const onProgress = vi.fn();
      const onActivation = vi.fn(() => Promise.resolve());
      render(<SlideToActivate labelText="Confirm" onProgress={onProgress} onActivation={onActivation} />);

      release(); // no prior pointerdown

      expect(onProgress).not.toHaveBeenCalled();
      expect(onActivation).not.toHaveBeenCalled();
    });

    it('ignores pointermove and pointerup from an unrelated pointer', () => {
      const onProgress = vi.fn();
      render(<SlideToActivate labelText="Confirm" onProgress={onProgress} />);
      const thumb = screen.getByRole('button', { name: 'Confirm' });

      fireEvent.pointerDown(thumb, { pointerId: 1, clientX: 20, button: 0 });
      fireEvent.pointerMove(document, { pointerId: 2, clientX: 90 }); // different pointer, ignored
      fireEvent.pointerUp(document, { pointerId: 2 }); // different pointer, ignored

      expect(onProgress).not.toHaveBeenCalled();
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'dragging');

      fireEvent.pointerUp(document, { pointerId: 1 }); // clean up the still-active drag
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

      fireEvent.pointerDown(thumb, { pointerId: 1, clientX: 20, button: 0 }); // measures 0 travel
      layoutReady = true; // layout settles after the gesture already started
      fireEvent.pointerMove(document, { pointerId: 1, clientX: 90 }); // remeasures, now 70/140 = 0.5
      release();

      expect(onProgress).toHaveBeenCalledWith(0.5);
    });
  });

  describe('keyboard charge (reduced motion off)', () => {
    // These exercise the real requestAnimationFrame-driven charge/finish ramps, which every
    // other test in this file bypasses via the mocked useReducedMotion. Faking rAF (and
    // setTimeout, for the snap-back delay) makes the animation timing deterministic; state
    // updates driven by advancing fake timers need to be wrapped in act() so React flushes them.
    beforeEach(() => {
      useReducedMotion.mockReturnValue(false);
      vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'performance', 'setTimeout'] });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('charges progress toward the target while held, then waits for keyup to activate', () => {
      const onProgress = vi.fn();
      const onActivation = vi.fn(() => Promise.resolve());
      render(<SlideToActivate labelText="Confirm" onProgress={onProgress} onActivation={onActivation} />);
      const thumb = screen.getByRole('button', { name: 'Confirm' });
      thumb.focus();

      fireEvent.keyDown(thumb, { key: 'Enter' });
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'dragging');

      act(() => {
        vi.advanceTimersByTime(KEYBOARD_CHARGE_MS + 100);
      });

      expect(onProgress).toHaveBeenLastCalledWith(1);
      expect(onActivation).not.toHaveBeenCalled(); // still waiting on keyup
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'dragging');
    });

    it('activates immediately on keyup after a full charge (fast path)', async () => {
      const onActivation = vi.fn(() => Promise.resolve());
      render(<SlideToActivate labelText="Confirm" onActivation={onActivation} />);
      const thumb = screen.getByRole('button', { name: 'Confirm' });
      thumb.focus();

      fireEvent.keyDown(thumb, { key: 'Enter' });
      act(() => {
        vi.advanceTimersByTime(KEYBOARD_CHARGE_MS + 100);
      });
      await act(async () => {
        fireEvent.keyUp(thumb, { key: 'Enter' });
        await Promise.resolve(); // let runActivation's `await onActivation()` continuation settle
      });

      expect(onActivation).toHaveBeenCalledTimes(1);
    });

    it('bursts to completion and activates on a quick tap', async () => {
      const onActivation = vi.fn(() => Promise.resolve());
      render(<SlideToActivate labelText="Confirm" onActivation={onActivation} />);
      const thumb = screen.getByRole('button', { name: 'Confirm' });
      thumb.focus();

      fireEvent.keyDown(thumb, { key: 'Enter' });
      fireEvent.keyUp(thumb, { key: 'Enter' }); // released almost immediately, progress still near 0

      expect(onActivation).not.toHaveBeenCalled();
      await act(async () => {
        vi.advanceTimersByTime(KEYBOARD_FINISH_MS + 20);
        await Promise.resolve(); // let runActivation's `await onActivation()` continuation settle
      });

      expect(onActivation).toHaveBeenCalledTimes(1);
    });

    it('cancels the charge on blur', () => {
      const onProgress = vi.fn();
      render(<SlideToActivate labelText="Confirm" onProgress={onProgress} />);
      const thumb = screen.getByRole('button', { name: 'Confirm' });
      thumb.focus();

      fireEvent.keyDown(thumb, { key: 'Enter' });
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'dragging');

      fireEvent.blur(thumb);
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'snapping');

      act(() => {
        vi.advanceTimersByTime(SNAP_MS);
      });
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'idle');
    });

    it('cancels an in-progress charge on Escape and snaps back after the delay', () => {
      const onProgress = vi.fn();
      render(<SlideToActivate labelText="Confirm" onProgress={onProgress} />);
      const thumb = screen.getByRole('button', { name: 'Confirm' });
      thumb.focus();

      fireEvent.keyDown(thumb, { key: 'Enter' });
      act(() => {
        vi.advanceTimersByTime(300);
      });

      fireEvent.keyDown(thumb, { key: 'Escape' });
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'snapping');
      expect(onProgress).toHaveBeenLastCalledWith(0);

      act(() => {
        vi.advanceTimersByTime(SNAP_MS);
      });
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'idle');
    });

    it('ignores a new keydown while still snapping back from Escape', () => {
      const onProgress = vi.fn();
      render(<SlideToActivate labelText="Confirm" onProgress={onProgress} />);
      const thumb = screen.getByRole('button', { name: 'Confirm' });
      thumb.focus();

      fireEvent.keyDown(thumb, { key: 'Enter' });
      act(() => {
        vi.advanceTimersByTime(300);
      });
      fireEvent.keyDown(thumb, { key: 'Escape' });
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'snapping');

      onProgress.mockClear();
      fireEvent.keyDown(thumb, { key: 'Enter' }); // busy (snapping) — should be ignored
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'snapping');
      expect(onProgress).not.toHaveBeenCalled();
    });

    it('ignores a pointerdown while still snapping back from Escape', () => {
      vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
        if (this.classList.contains(`${px}-slide-to-activate__track`)) {
          return {
            width: 200,
            height: 44,
            top: 0,
            left: 0,
            right: 200,
            bottom: 44,
            x: 0,
            y: 0,
            toJSON: () => undefined,
          } as DOMRect;
        }
        if (this.classList.contains(`${px}-slide-to-activate__thumb`)) {
          return {
            width: 44,
            height: 40,
            top: 2,
            left: 8,
            right: 52,
            bottom: 42,
            x: 8,
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
      render(<SlideToActivate labelText="Confirm" onProgress={onProgress} />);
      const thumb = screen.getByRole('button', { name: 'Confirm' });
      thumb.focus();

      fireEvent.keyDown(thumb, { key: 'Enter' });
      act(() => {
        vi.advanceTimersByTime(300);
      });
      fireEvent.keyDown(thumb, { key: 'Escape' });
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'snapping');

      onProgress.mockClear();
      fireEvent.pointerDown(thumb, { pointerId: 1, clientX: 20, button: 0 }); // busy (snapping) — ignored
      fireEvent.pointerMove(document, { pointerId: 1, clientX: 90 });

      expect(onProgress).not.toHaveBeenCalled();
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'snapping');
    });
  });
});
