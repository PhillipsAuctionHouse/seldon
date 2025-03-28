import { describe, expect, it, vi } from 'vitest';
import initializeAddToCalendar from './initializeAddToCalendar';

describe('initializeAddToCalendar', () => {
  it('rejects with error message when script takes too long to load', async () => {
    globalThis.window = Object.assign(globalThis.window, {
      ifaddtocalendar: 1,
    });

    globalThis.document = {
      getElementsByTagName: vi.fn().mockReturnValue([
        {
          appendChild: vi.fn(),
        },
      ]),
    } as unknown as Document;
    const rejectMock = vi.fn();
    initializeAddToCalendar().catch(rejectMock);
    await new Promise((resolve) => setTimeout(resolve, 11000));
    expect(rejectMock).toHaveBeenCalledTimes(1);
    expect(rejectMock).toHaveBeenCalledWith('AddToCalendar script failed to load');
  }, 12000);
});
