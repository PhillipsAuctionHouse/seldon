/** Clamps a display lot number into `[1, safeTotal]` (markers, fill metrics, popover). */
export function getClampedLotNumber(rawLot: number, safeTotal: number): number {
  return Math.min(Math.max(Math.round(rawLot), 1), safeTotal);
}

function clampProgressBarLots(rawCurrent: number, rawTotal: number): { safeTotal: number; safeCurrent: number } {
  const safeTotal = Math.max(Math.round(rawTotal), 1);
  const safeCurrent = getClampedLotNumber(rawCurrent, safeTotal);
  return { safeTotal, safeCurrent };
}

function getVisualWidthPercentFromSafe(safeCurrent: number, safeTotal: number): number {
  const minVisiblePercent = safeTotal < 199 ? 3 : 5;
  const trueProgression = safeCurrent / safeTotal;

  if (safeCurrent <= 0) {
    return 0;
  }
  if (trueProgression >= 0.5) {
    return 100 * trueProgression;
  }
  return (
    (1 - 2 * trueProgression) ** 2 * (minVisiblePercent + (100 - minVisiblePercent) * trueProgression) +
    (1 - (1 - 2 * trueProgression) ** 2) * (100 * trueProgression)
  );
}

/** Width % for the progress fill or marker position from raw lot / total. */
export function getVisualWidthPercent(rawLot: number, rawTotal: number): number {
  const { safeTotal, safeCurrent } = clampProgressBarLots(rawLot, rawTotal);
  return getVisualWidthPercentFromSafe(safeCurrent, safeTotal);
}

/** Clamped lots + fill width for the main progress bar */
export function getProgressBarMetrics(
  currentLot: number,
  totalLots: number,
): {
  safeTotal: number;
  safeCurrent: number;
  visualPercent: number;
} {
  const { safeTotal, safeCurrent } = clampProgressBarLots(currentLot, totalLots);
  return {
    safeTotal,
    safeCurrent,
    visualPercent: getVisualWidthPercentFromSafe(safeCurrent, safeTotal),
  };
}

export type ProgressBarLotsAwayMessages = {
  inProgress: string;
  oneLotAway: string;
  lotsAway: string;
};

export const defaultProgressBarLotsAwayMessages: ProgressBarLotsAwayMessages = {
  inProgress: 'In Progress',
  oneLotAway: '{count} lot away',
  lotsAway: '{count} lots away',
};

export type ProgressBarLabels = {
  statusCurrentLot: string;
  statusUpcoming: string;
  lotsAwayAdvanceBidCurrent: string;
};

export const defaultProgressBarLabels: ProgressBarLabels = {
  statusCurrentLot: 'Current Lot',
  statusUpcoming: 'Upcoming',
  lotsAwayAdvanceBidCurrent: 'In progress',
};

export function formatLotsAwayText(
  currentLot: number,
  markerLot: number,
  messages: Partial<ProgressBarLotsAwayMessages> = {},
): string {
  const message: ProgressBarLotsAwayMessages = { ...defaultProgressBarLotsAwayMessages, ...messages };
  const delta = Math.round(markerLot) - Math.round(currentLot);
  if (delta <= 0) {
    return message.inProgress;
  }
  if (delta === 1) {
    return message.oneLotAway.replace(/\{count\}/g, String(delta));
  }
  return message.lotsAway.replace(/\{count\}/g, String(delta));
}
