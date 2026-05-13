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

export function getProgressBarMetrics(
  currentLot: number,
  totalLots: number,
): {
  safeTotal: number;
  safeCurrent: number;
  visualPercent: number;
} {
  const safeTotal = Math.max(Math.round(totalLots), 1);
  const safeCurrent = Math.min(Math.max(Math.round(currentLot), 1), safeTotal);
  return {
    safeTotal,
    safeCurrent,
    visualPercent: getVisualWidthPercentFromSafe(safeCurrent, safeTotal),
  };
}

export type ProgressBarLabels = {
  hoverLiveLot: string;
};

export const defaultProgressBarLabels: ProgressBarLabels = {
  hoverLiveLot: 'Live lot {current} of {total}',
};
