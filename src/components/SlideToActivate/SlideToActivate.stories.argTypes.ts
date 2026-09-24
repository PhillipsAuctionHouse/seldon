import { TextVariants } from '../Text';
import { SlideToActivateBorderRadii, SlideToActivateDirections, SlideToActivateSizes } from './types';

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
    description: 'Fired while dragging with progress in `[0, 1]`.',
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
    description: 'Blocks activation with the blocked (grey) visual. Prefer `isComplete` after success.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  isComplete: {
    control: 'boolean',
    description:
      'Settled success: complete visual + non-interactive (implies disabled). Use after a successful activation.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  showThumbWhenDisabled: {
    control: 'boolean',
    description: 'If `false` and `isDisabled` is `true`, hide the thumb. Ignored when `isComplete`. Default `true`.',
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
  keyboardHint: {
    control: 'text',
    description: 'Visually hidden keyboard instructions (`aria-describedby`). Empty string omits the description.',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'Press Space or Enter to activate. Press Escape to cancel.' },
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
