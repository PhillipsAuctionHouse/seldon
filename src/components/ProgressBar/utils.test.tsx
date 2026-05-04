import { describe, expect, it } from 'vitest';
import { formatLotsAwayText, getClampedLotNumber, getProgressBarMetrics, getVisualWidthPercent } from './utils';

describe('ProgressBar utils', () => {
  describe('getClampedLotNumber', () => {
    it('clamps into [1, safeTotal] and rounds', () => {
      expect(getClampedLotNumber(8.7, 110)).toBe(9);
      expect(getClampedLotNumber(0, 50)).toBe(1);
      expect(getClampedLotNumber(999, 50)).toBe(50);
    });
  });

  describe('getVisualWidthPercent', () => {
    it('returns 100% when only one lot', () => {
      expect(getVisualWidthPercent(1, 1)).toBe(100);
    });

    it('uses linear mapping when progression is at or above 0.5', () => {
      expect(getVisualWidthPercent(1, 2)).toBe(50);
      expect(getVisualWidthPercent(55, 100)).toBeCloseTo(55, 10);
      expect(getVisualWidthPercent(110, 200)).toBeCloseTo(55, 10);
    });

    it('uses the curved mapping when progression is below 0.5 (minVisible 3 when total < 199)', () => {
      // Lot 1 / 100 → trueProgression 0.01, minVisiblePercent = 3
      expect(getVisualWidthPercent(1, 100)).toBeCloseTo(3.852388, 4);
      expect(getVisualWidthPercent(8, 110)).toBeCloseTo(9.304144252441773, 4);
    });

    it('uses minVisiblePercent 5 when safeTotal is 199 or more', () => {
      const below199 = getVisualWidthPercent(1, 198);
      const at199 = getVisualWidthPercent(1, 199);
      expect(at199).not.toBe(below199);
      expect(below199).toBeCloseTo(3.429903565808066, 4);
      expect(at199).toBeCloseTo(5.377891959735548, 4);
    });

    it('clamps raw total to at least 1', () => {
      expect(getVisualWidthPercent(0, 0)).toBe(100);
      expect(getVisualWidthPercent(3, -5)).toBe(100);
    });

    it('clamps raw current into [1, safeTotal]', () => {
      expect(getVisualWidthPercent(-10, 50)).toBe(getVisualWidthPercent(1, 50));
      expect(getVisualWidthPercent(999, 50)).toBe(getVisualWidthPercent(50, 50));
    });

    it('rounds non-integer lot and total like the UI', () => {
      expect(getVisualWidthPercent(8.2, 110.4)).toBe(getVisualWidthPercent(8, 110));
    });
  });

  describe('getProgressBarMetrics', () => {
    it('returns clamped lots and visual percent consistent with getVisualWidthPercent', () => {
      const currentLot = 8;
      const totalLots = 110;
      const metrics = getProgressBarMetrics(currentLot, totalLots);

      expect(metrics.safeTotal).toBe(110);
      expect(metrics.safeCurrent).toBe(8);
      expect(metrics.visualPercent).toBe(getVisualWidthPercent(currentLot, totalLots));
    });

    it('clamps current to safeTotal', () => {
      expect(getProgressBarMetrics(500, 12)).toEqual({
        safeTotal: 12,
        safeCurrent: 12,
        visualPercent: getVisualWidthPercent(12, 12),
      });
    });
  });

  describe('formatLotsAwayText', () => {
    it('returns "In Progress" when marker is at or before current', () => {
      expect(formatLotsAwayText(5, 5)).toBe('In Progress');
      expect(formatLotsAwayText(5, 4)).toBe('In Progress');
    });

    it('returns singular copy when one lot away', () => {
      expect(formatLotsAwayText(5, 6)).toBe('1 lot away');
    });

    it('returns plural copy with count', () => {
      expect(formatLotsAwayText(5, 8)).toBe('3 lots away');
    });

    it('uses rounded lots for the delta', () => {
      expect(formatLotsAwayText(5.2, 7.7)).toBe('3 lots away');
    });

    it('merges partial custom messages with defaults', () => {
      expect(
        formatLotsAwayText(5, 8, {
          lotsAway: '{count} restants',
        }),
      ).toBe('3 restants');
    });

    it('replaces every {count} in a template', () => {
      expect(
        formatLotsAwayText(1, 4, {
          lotsAway: '({count} of {count} lots)',
        }),
      ).toBe('(3 of 3 lots)');
    });
  });
});
