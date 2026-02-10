import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

const originalConsoleError = console.error;
export const consoleError = vi.spyOn(console, 'error');

const originalWindow = window;

beforeEach(() => {
  consoleError.mockImplementation((...args: Parameters<typeof console.error>) => {
    originalConsoleError(...args);
    throw new Error('Console error was called. Call consoleError.mockImplementation(() => {}) if this is expected.');
  });
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
  window.HTMLElement.prototype.releasePointerCapture = vi.fn();
  window.HTMLElement.prototype.hasPointerCapture = vi.fn().mockReturnValue(true);

  class MockIntersectionObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: MockIntersectionObserver,
  });
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: () => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }),
  });
  class MockResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }
  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    value: MockResizeObserver,
  });
});

afterEach(() => {
  cleanup();
  // eslint-disable-next-line no-global-assign
  window = originalWindow;
});
