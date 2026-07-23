import { TextVariants } from '../Text';
import {
  SlideToActivateBorderRadii,
  SlideToActivateDisabledReasons,
  SlideToActivateDirections,
  SlideToActivateSizes,
} from './types';

export const actionArgTypes = {
  onActivation: {
    action: 'onActivation',
    description:
      'Fires on release at/above `requiredProgress` or at the track edge. Promise keeps the control pending until settle.',
    table: { type: { summary: '() => void | Promise<void>' } },
  },
  onError: {
    action: 'onError',
    description: 'Called when `onActivation` rejects; otherwise `console.error` and snap idle.',
    table: { type: { summary: '(error: unknown) => void' } },
  },
  onProgress: {
    action: 'onProgress',
    description: 'Fired while dragging (and during keyboard charge) with progress in `[0, 1]`.',
    table: { type: { summary: '(progress: number) => void' } },
  },
};

/** Controls-tab docs for Playground — ranges, defaults, and behavior notes. */
export const playgroundArgTypes = {
  ...actionArgTypes,
  labelText: {
    control: 'text',
    description: 'Visible track label; also used as the thumb’s accessible name (`aria-label`).',
    table: { type: { summary: 'string' }, defaultValue: { summary: '—' } },
  },
  textVariant: {
    control: { type: 'select' },
    options: [
      TextVariants.labelLarge,
      TextVariants.labelMedium,
      TextVariants.labelSmall,
      TextVariants.bodyLarge,
      TextVariants.bodyMedium,
      TextVariants.bodySmall,
    ],
    description: 'Seldon `Text` variant for the track label. Prefer label* for CTA density.',
    table: {
      type: { summary: 'TextVariants' },
      defaultValue: { summary: 'labelMedium' },
    },
  },
  requiredProgress: {
    control: { type: 'range', min: 0.5, max: 1, step: 0.01 },
    description: 'Travel fraction `[0.5–1]` needed on release to activate (edge also activates). Default `0.95`.',
    table: {
      type: { summary: 'number (0–1)' },
      defaultValue: { summary: '0.95' },
    },
  },
  deadZone: {
    control: { type: 'range', min: 0, max: 32, step: 1 },
    description: 'Pointer px ignored before the thumb follows. Higher = less twitchy. Default `8`.',
    table: {
      type: { summary: 'number (px)' },
      defaultValue: { summary: '8' },
    },
  },
  sensitivity: {
    control: { type: 'range', min: 0.25, max: 3, step: 0.05 },
    description: 'Pointer→thumb travel multiplier (`1` = 1:1; `>1` shorter swipe). Default `1`.',
    table: {
      type: { summary: 'number' },
      defaultValue: { summary: '1' },
    },
  },
  direction: {
    control: { type: 'select' },
    options: Object.values(SlideToActivateDirections),
    description: '`ltr` slides left→right; `rtl` mirrors thumb start and icon. Default `ltr`.',
    table: {
      type: { summary: `'ltr' | 'rtl'` },
      defaultValue: { summary: 'ltr' },
    },
  },
  size: {
    control: { type: 'select' },
    options: Object.values(SlideToActivateSizes),
    description: 'Track/thumb height: `default` = 44/40px, `small` = 32/28px (matches Button).',
    table: {
      type: { summary: `'default' | 'small'` },
      defaultValue: { summary: 'default' },
    },
  },
  borderRadius: {
    control: { type: 'select' },
    options: Object.values(SlideToActivateBorderRadii),
    description: 'Track/thumb/focus radius. `sharp` = 0 (Figma); `rounded` / `pill` for branded.',
    table: {
      type: { summary: `'sharp' | 'rounded' | 'pill'` },
      defaultValue: { summary: 'sharp' },
    },
  },
  thumbHitTolerance: {
    control: { type: 'range', min: 0, max: 24, step: 1 },
    description: 'Extra invisible hit padding (px) around the thumb for easier grab. Default `8`.',
    table: {
      type: { summary: 'number (px)' },
      defaultValue: { summary: '8' },
    },
  },
  thumbWidth: {
    control: { type: 'number', min: 28, max: 120, step: 1 },
    description: 'Pill thumb width (px). Empty = default square thumb.',
    table: {
      type: { summary: 'number (px) | undefined' },
      defaultValue: { summary: 'undefined (square)' },
    },
  },
  isDisabled: {
    control: 'boolean',
    description: 'Blocks pointer and keyboard activation. Pair with `disabledReason` for visuals.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  disabledReason: {
    control: { type: 'select' },
    options: Object.values(SlideToActivateDisabledReasons),
    description: 'When disabled: `blocked` = muted; `complete` = success (thumb always hidden).',
    table: {
      type: { summary: `'blocked' | 'complete'` },
      defaultValue: { summary: 'blocked' },
    },
  },
  showThumbWhenDisabled: {
    control: 'boolean',
    description: 'If `false` with `blocked`, hide thumb. Ignored for `complete`. Default `true`.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'true' },
    },
  },
  pendingAnnouncement: {
    control: 'text',
    description: 'Screen-reader copy while `onActivation` is pending (`aria-live`). Default: same as `labelText`.',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'labelText' },
    },
  },
  successAnnouncement: {
    control: 'text',
    description: 'Screen-reader copy after `onActivation` resolves. Default `"Activated."`.',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'Activated.' },
    },
  },
  errorAnnouncement: {
    control: 'text',
    description: 'Screen-reader copy when `onActivation` rejects. Default `"Action failed. Please try again."`.',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'Action failed. Please try again.' },
    },
  },
  trackClassName: {
    control: 'text',
    description: 'Extra class on the track element (theming / layout overrides).',
    table: { type: { summary: 'string' } },
  },
  thumbClassName: {
    control: 'text',
    description: 'Extra class on the thumb button.',
    table: { type: { summary: 'string' } },
  },
  thumbIcon: {
    control: false,
    description: 'Thumb icon (default double ChevronRight). Pass `null` to hide. Not editable here.',
    table: {
      type: { summary: 'ReactNode | null' },
      defaultValue: { summary: 'double ChevronRight' },
    },
  },
  pendingIndicator: {
    control: false,
    description: 'Replaces the default Seldon `Loader` while pending. Set in code; not editable here.',
    table: {
      type: { summary: 'ReactNode' },
      defaultValue: { summary: '<Loader />' },
    },
  },
};
