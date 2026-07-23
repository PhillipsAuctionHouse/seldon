import { clampProgress, easeOutCubic, measureMaxTravel } from './slideToActivateUtils';

describe('slideToActivateUtils', () => {
  it('clamps progress to the unit interval', () => {
    expect(clampProgress(-0.2)).toBe(0);
    expect(clampProgress(0.4)).toBe(0.4);
    expect(clampProgress(1.5)).toBe(1);
  });

  it('eases out cubically', () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5);
  });

  it('measures max travel accounting for inset', () => {
    const track = {
      getBoundingClientRect: () => ({ width: 200, left: 0, right: 200, top: 0, bottom: 44 }),
    } as HTMLElement;
    const thumb = {
      getBoundingClientRect: () => ({ width: 44, left: 8, right: 52, top: 0, bottom: 40 }),
    } as HTMLElement;

    expect(measureMaxTravel({ track, thumb, direction: 'ltr' })).toBe(140);
  });

  it('measures max travel for rtl using the trailing inset', () => {
    const track = {
      getBoundingClientRect: () => ({ width: 200, left: 0, right: 200, top: 0, bottom: 44 }),
    } as HTMLElement;
    const thumb = {
      getBoundingClientRect: () => ({ width: 44, left: 148, right: 192, top: 0, bottom: 40 }),
    } as HTMLElement;

    expect(measureMaxTravel({ track, thumb, direction: 'rtl' })).toBe(140);
  });
});
