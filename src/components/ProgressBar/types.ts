export type ProgressBarLotMarkerType = 'upcoming';

export interface ProgressBarLotMarker {
  lotNumber: number;
  lotTitle: string;
  lotArtist: string;
  /** e.g. "$2,500 - $5,000" */
  estimate: string;
  type: ProgressBarLotMarkerType;
  /** When set, marker uses the diamond shape (advance bid). */
  advBid?: string;
}