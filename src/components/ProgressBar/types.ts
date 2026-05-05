export type ProgressBarLotObjectType = 'upcoming';

export interface ProgressBarLotObject {
  /** Lot number this marker represents (will be clamped to `[1, totalLots]` for display). */
  lotNumber: number;
  /** Artwork title used in the popover card and marker `aria-label`. */
  lotTitle: string;
  /** Artist / maker name shown in the popover card. */
  lotArtist: string;
  /** Human-readable estimate range (e.g. `"$2,500 - $5,000"`). */
  estimate: string;
  /** Lot status metadata (currently used for consumers; rendering may treat all as “upcoming”). */
  type: ProgressBarLotObjectType;
  /** Advance bid amount; when set, marker uses the diamond shape and the card can show advance-bid copy. */
  advBid?: string;
  /** Optional thumbnail URL for the popover card. */
  imageSrc?: string;
  /** `alt` text for `imageSrc` (use empty string if decorative). */
  imageAlt?: string;
}
