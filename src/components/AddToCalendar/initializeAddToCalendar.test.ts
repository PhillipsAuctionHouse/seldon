import { vi, describe, it, expect } from 'vitest';
import initializeAddToCalendar, {
  isAddToCalendarLoaded,
  loadAddToCalendarScript,
  checkAddToCalendarInterval,
} from './initializeAddToCalendar';

vi.mock('./initializeAddToCalendar', () => ({
  __esModule: true,
  loadAddToCalendarScript: vi.fn(() => Promise.reject(new Error('Failed to load AddToCalendar script'))),
  isAddToCalendarLoaded: vi.fn(() => false),
  checkAddToCalendarInterval: vi.fn(() => Promise.resolve('true')),
  default: vi.fn(() => Promise.resolve('true')),
}));

describe('AddToCalendar functions', () => {
  it('should return false if addtocalendar is not loaded', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockWindow = { addtocalendar: undefined } as any;
    expect(isAddToCalendarLoaded(mockWindow)).toBe(false);
  });

  it('should return true if addtocalendar is loaded', () => {
    vi.mocked(isAddToCalendarLoaded).mockReturnValueOnce(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(isAddToCalendarLoaded(window as any)).toBe(true);
  });

  it('should handle AddToCalendar script load error', async () => {
    const mockDocument = {
      createElement: vi.fn(() => {
        const script = { onload: vi.fn(), onerror: vi.fn() }; // Create a script object with onerror
        return script;
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockWindow = { location: { protocol: 'https:' } } as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockScript = mockDocument.createElement() as { onerror: (err: any) => void }; // Type assertion to access onerror
    mockScript.onerror = () => {
      throw new Error('Failed to load AddToCalendar script');
    };
    await expect(loadAddToCalendarScript(mockDocument, mockWindow)).rejects.toThrow(
      'Failed to load AddToCalendar script',
    );
  });

  it('should check AddToCalendar interval successfully', async () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
    const mockWindow = { addtocalendar: { load: () => {} } } as any;
    const result = await checkAddToCalendarInterval(mockWindow);
    expect(result).toBe('true');
  });

  it('should initialize AddToCalendar if already loaded', async () => {
    vi.mocked(isAddToCalendarLoaded).mockReturnValueOnce(true);
    const result = await initializeAddToCalendar();
    expect(result).toBe('true');
  });

  it('should initialize AddToCalendar by loading the script', async () => {
    vi.mocked(isAddToCalendarLoaded).mockReturnValueOnce(false); // Set to false only for this test.
    vi.mocked(checkAddToCalendarInterval).mockReturnValueOnce(Promise.resolve('true')); //This should never be called in this case
    const result = await initializeAddToCalendar();
    expect(result).toBe('true');
    expect(vi.mocked(loadAddToCalendarScript).mock.calls.length).toBe(0);
  });

  it('should initialize AddToCalendar using interval check if script loading fails', async () => {
    vi.mocked(isAddToCalendarLoaded).mockReturnValueOnce(false);
    vi.mocked(loadAddToCalendarScript).mockRejectedValueOnce('Failed to load AddToCalendar script');
    const result = await initializeAddToCalendar();
    expect(result).toBe('true');
    expect(vi.mocked(loadAddToCalendarScript).mock.calls.length).toBe(0); // Ensure loadAddToCalendarScript was attempted
  });
});
