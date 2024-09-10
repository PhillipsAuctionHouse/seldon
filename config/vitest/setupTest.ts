import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi, type MockInstance } from 'vitest';
import '@testing-library/jest-dom/vitest';

export let consoleError: MockInstance<Parameters<(typeof console)['error']>>;

const originalWindow = window;

beforeEach(() => {
  const originalConsoleError = console.error;
  consoleError = vi.spyOn(console, 'error');
  consoleError.mockImplementation((...args: Parameters<typeof console.error>) => {
    originalConsoleError(...args);
    throw new Error('Console error was called. Call consoleError.mockImplementation(() => {}) if this is expected.');
  });
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
  window.HTMLElement.prototype.releasePointerCapture = vi.fn();
  window.HTMLElement.prototype.hasPointerCapture = vi.fn().mockReturnValue(true);
});

afterEach(() => {
  cleanup();
  // eslint-disable-next-line no-global-assign
  window = originalWindow;
});
