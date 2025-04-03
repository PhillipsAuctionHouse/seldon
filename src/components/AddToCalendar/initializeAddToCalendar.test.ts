import { describe, it, expect, vi } from 'vitest';
import initializeAddToCalendar from './initializeAddToCalendar';

vi.mock('./initializeAddToCalendar');

describe('initializeAddToCalendar', () => {
  it('loads script and resolves with "true" when script is loaded', async () => {
    vi.stubGlobal('window', {
      ifaddtocalendar: undefined,
      document: {
        getElementsByTagName: vi.fn().mockReturnValue([
          {
            appendChild: vi.fn(),
          },
        ]),
      },
      location: {
        protocol: 'https:',
      },
    });
    const result = await initializeAddToCalendar();
    expect(result).toBe(undefined);
  });

  it('rejects with error message when script fails to load', async () => {
    vi.stubGlobal('window', {
      ifaddtocalendar: undefined,
      document: {
        getElementsByTagName: vi.fn().mockReturnValue([
          {
            appendChild: vi.fn(() => {
              throw new Error('Mocked error');
            }),
          },
        ]),
      },
      location: {
        protocol: 'https:',
      },
    });
    try {
      await initializeAddToCalendar();
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Failed to load AddToCalendar script');
      } else {
        throw new Error('Unexpected error type');
      }
    }
  });

  it('should throw an error when script loading fails', async () => {
    vi.stubGlobal('window', {
      document: {
        getElementsByTagName: vi.fn(() => {
          throw new Error('Mocked error');
        }),
      },
    });
    try {
      await initializeAddToCalendar();
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Failed to load AddToCalendar script');
      } else {
        throw new Error('Unexpected error type');
      }
    }
  });

  it('rejects with error message when addtocalendar is not loaded after 10 seconds', async () => {
    vi.stubGlobal('window', {
      ifaddtocalendar: 1,
      addtocalendar: undefined,
      clearInterval: vi.fn(),
      setInterval: vi.fn((callback) => {
        callback();
      }),
    });
    try {
      await initializeAddToCalendar();
    } catch (error) {
      expect(error).toBe('AddToCalendar script failed to load');
    }
  });
  it('should reject with an error when addtocalendar is not loaded after timeout', async () => {
    vi.stubGlobal('window', {
      ifaddtocalendar: undefined,
      addtocalendar: undefined,
      clearInterval: vi.fn(),
      setInterval: vi.fn((callback) => {
        callback();
      }),
    });
    try {
      await initializeAddToCalendar();
    } catch (error) {
      expect(error).toBe('AddToCalendar script failed to load');
    }
  });
});
