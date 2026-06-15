import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockMatchMedia } from './testUtils';
import { userPrefersReducedMotion } from './motion';

describe('userPrefersReducedMotion', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns true when the reduced motion media query matches', () => {
    mockMatchMedia({ '(prefers-reduced-motion: reduce)': true });

    expect(userPrefersReducedMotion()).toBe(true);
  });

  it('returns false when the reduced motion media query does not match', () => {
    mockMatchMedia({});

    expect(userPrefersReducedMotion()).toBe(false);
  });

  it('returns false when matchMedia is unavailable', () => {
    vi.stubGlobal('window', {});

    expect(userPrefersReducedMotion()).toBe(false);
  });

  it('returns false outside the browser', () => {
    vi.stubGlobal('window', undefined);

    expect(userPrefersReducedMotion()).toBe(false);
  });
});
