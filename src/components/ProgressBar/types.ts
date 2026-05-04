export type ProgressBarLotObjectType = 'upcoming';

export interface ProgressBarLotObject {
  lotNumber: number;
  lotTitle: string;
  lotArtist: string;
  /** e.g. "$2,500 - $5,000" */
  estimate: string;
  type: ProgressBarLotObjectType;
  /** When set, lot object uses the diamond shape (advance bid). */
  advBid?: string;
  /** Thumbnail for the popover card. */
  imageSrc?: string;
  imageAlt?: string;
}
