import { vi, describe, it, expect } from 'vitest';
import initializeAddToCalendar from './initializeAddToCalendar';

describe('initializeAddToCalendar', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('resolves with "true" if addtocalendar is already loaded', async () => {
    vi.stubGlobal('window', {
      addtocalendar: {
        load: vi.fn(),
      },
    });
    const result = await initializeAddToCalendar();
    expect(result).toBe('true');
  });
});
