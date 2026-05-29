import { describe, expect, it } from 'vitest';
import { getProgressBarMetrics } from './utils';

describe('ProgressBar utils', () => {
  describe('getProgressBarMetrics', () => {
    it('clamps into [1, safeTotal] and rounds', () => {
      expect(getProgressBarMetrics(8.7, 110)).toEqual({
        safeTotal: 110,
        safeCurrent: 9,
        visualPercent: expect.any(Number),
      });
      expect(getProgressBarMetrics(0, 50)).toMatchObject({ safeTotal: 50, safeCurrent: 1 });
      expect(getProgressBarMetrics(999, 50)).toMatchObject({ safeTotal: 50, safeCurrent: 50 });
    });

    it('returns 100% when only one lot', () => {
      expect(getProgressBarMetrics(1, 1).visualPercent).toBe(100);
    });

    it('uses linear mapping when progression is at or above 0.5', () => {
      expect(getProgressBarMetrics(1, 2).visualPercent).toBe(50);
      expect(getProgressBarMetrics(55, 100).visualPercent).toBeCloseTo(55, 10);
      expect(getProgressBarMetrics(110, 200).visualPercent).toBeCloseTo(55, 10);
    });

    it('uses the curved mapping when progression is below 0.5 (minVisible 3 when total < 199)', () => {
      expect(getProgressBarMetrics(1, 100).visualPercent).toBeCloseTo(3.852388, 4);
      expect(getProgressBarMetrics(8, 110).visualPercent).toBeCloseTo(9.304144252441773, 4);
    });

    it('uses minVisiblePercent 5 when safeTotal is 199 or more', () => {
      const below199 = getProgressBarMetrics(1, 198).visualPercent;
      const at199 = getProgressBarMetrics(1, 199).visualPercent;
      expect(at199).not.toBe(below199);
      expect(below199).toBeCloseTo(3.429903565808066, 4);
      expect(at199).toBeCloseTo(5.377891959735548, 4);
    });

    it('clamps raw total to at least 1', () => {
      expect(getProgressBarMetrics(0, 0)).toMatchObject({ safeTotal: 1, safeCurrent: 1 });
      expect(getProgressBarMetrics(3, -5)).toMatchObject({ safeTotal: 1, safeCurrent: 1 });
    });

    it('clamps raw current into [1, safeTotal]', () => {
      expect(getProgressBarMetrics(-10, 50)).toEqual(getProgressBarMetrics(1, 50));
      expect(getProgressBarMetrics(999, 50)).toEqual(getProgressBarMetrics(50, 50));
    });

    it('rounds non-integer lot and total like the UI', () => {
      expect(getProgressBarMetrics(8.2, 110.4)).toEqual(getProgressBarMetrics(8, 110));
    });

    it('clamps current to safeTotal', () => {
      expect(getProgressBarMetrics(500, 12)).toEqual({
        safeTotal: 12,
        safeCurrent: 12,
        visualPercent: 100,
      });
    });
  });
});
