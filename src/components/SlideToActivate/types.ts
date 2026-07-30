import type { HTMLAttributes, ReactNode } from 'react';
import { ButtonSizes } from '../Button/types';
import { type TextVariants } from '../Text';
import type { SlideToActivateStatus } from './slideToActivateUtils';

export enum SlideToActivateDirections {
  ltr = 'ltr',
  rtl = 'rtl',
}

/** Matches Button's size scale (default 44 / small 32) — reused rather than redeclared. */
export const SlideToActivateSizes = ButtonSizes;
export type SlideToActivateSizes = ButtonSizes;

/**
 * Shared corner radius for track, thumb face, and focus ring.
 * `sharp` is 0 to match Saleroom Bid Status; `rounded` / `pill` for branded variants.
 */
export enum SlideToActivateBorderRadii {
  sharp = 'sharp',
  rounded = 'rounded',
  pill = 'pill',
}

/** Visual and behavioural tuning props, grouped to reduce top-level prop count. */
export interface SlideToActivateConfig {
  /** Text variant for the track label. Default `labelMedium`. */
  textVariant?: TextVariants;
  /** Control height; matches Button default (44) / small (32). */
  size?: SlideToActivateSizes | `${SlideToActivateSizes}`;
  /** Corner radius shared by track, thumb face, and focus ring. Default `sharp` (0 — Figma Bid Status). */
  borderRadius?: SlideToActivateBorderRadii | `${SlideToActivateBorderRadii}`;
  /** Swipe direction. Default `ltr`. */
  direction?: SlideToActivateDirections | `${SlideToActivateDirections}`;
  /**
   * Icon rendered inside the thumb (decorative). Defaults to a double ChevronRight
   * matching the Saleroom Figma Bid Status control. Pass `null` to hide.
   */
  thumbIcon?: ReactNode;
  /** When set, thumb becomes a pill of this width (px); otherwise square like Button. */
  thumbWidth?: number;
  /** Pending UI while awaiting `onActivation`. Defaults to Seldon `Loader`. */
  pendingIndicator?: ReactNode;
  trackClassName?: string;
  thumbClassName?: string;
}

export interface SlideToActivateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onProgress'> {
  /** Visible label; also used as the accessible name. Consumer owns idle/pending copy. */
  labelText: string;
  /**
   * Called when activation threshold/edge is reached on release (or via keyboard).
   *
   * After this resolves, the component enters `idle` with `progress=1` — the thumb stays
   * latched at the end and re-activation is blocked by the `progress >= 1` guard. Pass
   * `isComplete` to present the settled visual state (implies non-interactive).
   */
  onActivation?: () => void | Promise<void>;
  /** Called on `onActivation` rejection when provided; otherwise the error is `console.error`ed. */
  onError?: (error: unknown) => void;
  /** Fired while dragging with progress in `[0, 1]`. */
  onProgress?: (progress: number) => void;
  /**
   * Screen-reader announcement while `onActivation` is pending, via a persistent `aria-live`
   * region (separate from the visible label). Default: `labelText`.
   */
  pendingAnnouncement?: string;
  /** Screen-reader announcement once `onActivation` resolves. Default `'Activated.'`. */
  successAnnouncement?: string;
  /**
   * Screen-reader announcement when `onActivation` rejects. Default
   * `'Action failed. Please try again.'`.
   */
  errorAnnouncement?: string;
  /**
   * Visually hidden keyboard instructions exposed via `aria-describedby` on the thumb.
   * Default: `'Press Space or Enter to activate. Press Escape to cancel.'`.
   * Pass an empty string to omit the description.
   */
  keyboardHint?: string;
  /**
   * Called on every status transition after mount. Useful for syncing external state to
   * the component's gesture lifecycle (e.g. dimming sibling elements while `dragging`).
   */
  onStatusChange?: (status: SlideToActivateStatus) => void;
  /**
   * When `false`, the component does not snap back to idle after `onActivation` rejects —
   * the thumb stays latched and status returns to `idle`. Consumer is responsible for the
   * reset (typically `isComplete`). Default `true`.
   */
  resetOnError?: boolean;
  /**
   * Blocks pointer and keyboard activation with the "blocked" visual
   * (grey track/label). Ignored for interaction when `isComplete` is also set —
   * complete appearance wins.
   */
  isDisabled?: boolean;
  /**
   * Settled success state: dark track, white label, hidden thumb, and non-interactive.
   * Implies disabled — no need to also pass `isDisabled`.
   */
  isComplete?: boolean;
  /**
   * When `false` and `isDisabled` is `true`, the thumb is hidden.
   * Ignored when `isComplete` is `true` (thumb is always hidden then). Default `true`.
   */
  showThumbWhenDisabled?: boolean;
  /** Visual and behavioural tuning. All properties are optional with sensible defaults. */
  config?: SlideToActivateConfig;
}
