import type { HTMLAttributes, ReactNode } from 'react';
import { ButtonSizes } from '../Button/types';
import { type TextVariants } from '../Text';

export enum SlideToActivateDirections {
  ltr = 'ltr',
  rtl = 'rtl',
}

/** Matches Button's size scale (default 44 / small 32) — reused rather than redeclared. */
export const SlideToActivateSizes = ButtonSizes;
export type SlideToActivateSizes = ButtonSizes;

/**
 * Shared corner radius for track, thumb face, and focus ring. Narrowed to three options —
 * every unused option is another class kept alive in Chromatic snapshots and jsdoc, for a
 * value that's never actually reached for. Values are the underlying `$radius-*` design
 * tokens (used verbatim in the generated `--radius-{value}` class), keys are the sensible names.
 */
export enum SlideToActivateBorderRadii {
  sharp = 'xs',
  rounded = 'md',
  pill = '3xl',
}

/** Why the control is disabled — drives distinct visuals. */
export enum SlideToActivateDisabledReasons {
  /** Not allowed / unavailable (muted, blocked look). */
  blocked = 'blocked',
  /** Already completed successfully (settled / success look). */
  complete = 'complete',
}

export interface SlideToActivateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onProgress'> {
  /** Visible label; also used as the accessible name. Consumer owns idle/pending copy. */
  labelText: string;
  /** Text variant for the track label. Default `labelMedium`. */
  textVariant?: TextVariants;
  /** Called when activation threshold/edge is reached on release (or via keyboard). */
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
  /** Progress at which activation fires on release (or track edge, whichever first). Default `0.95`. */
  requiredProgress?: number;
  /** Pointer movement (px) ignored before the thumb follows. Default `8`. */
  deadZone?: number;
  /** Multiplier applied to pointer travel vs thumb travel. Default `1`. */
  sensitivity?: number;
  /** Swipe direction. Default `ltr`. */
  direction?: SlideToActivateDirections | `${SlideToActivateDirections}`;
  /** Control height; matches Button default (44) / small (32). */
  size?: SlideToActivateSizes | `${SlideToActivateSizes}`;
  /** Corner radius shared by track, thumb face, and focus ring. Default `sharp`. */
  borderRadius?: SlideToActivateBorderRadii | `${SlideToActivateBorderRadii}`;
  /** Extra press target around the thumb (px). Default `8`. */
  thumbHitTolerance?: number;
  /** Optional icon rendered inside the thumb (decorative). */
  thumbIcon?: ReactNode;
  /** When set, thumb becomes a pill of this width (px); otherwise square like Button. */
  thumbWidth?: number;
  /** Pending UI while awaiting `onActivation`. Defaults to Seldon `Loader`. */
  pendingIndicator?: ReactNode;
  /** Blocks pointer and keyboard activation. */
  isDisabled?: boolean;
  /**
   * Visual disabled variant when `isDisabled` is true.
   * `blocked` = not allowed; `complete` = already done (thumb always hidden). Default `blocked`.
   */
  disabledReason?: SlideToActivateDisabledReasons | `${SlideToActivateDisabledReasons}`;
  /**
   * When `false` and disabled with reason `blocked`, the thumb is hidden.
   * Ignored for `complete` (thumb is always hidden). Default `true`.
   */
  showThumbWhenDisabled?: boolean;
  trackClassName?: string;
  thumbClassName?: string;
}
