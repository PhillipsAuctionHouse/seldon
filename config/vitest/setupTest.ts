import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi, type MockInstance } from 'vitest';
import '@testing-library/jest-dom/vitest';

export let consoleError: MockInstance<Parameters<(typeof console)['error']>>;

// Need the following to test Radix Select using vitest
class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props: PointerEventInit) {
    super(type, props);
    this.button = props.button || 0;
    this.ctrlKey = props.ctrlKey || false;
    this.pointerType = props.pointerType || 'mouse';
  }
}

const originalWindow = window;

beforeEach(() => {
  const originalConsoleError = console.error;
  consoleError = vi.spyOn(console, 'error');
  consoleError.mockImplementation((...args: Parameters<typeof console.error>) => {
    originalConsoleError(...args);
    throw new Error('Console error was called. Call consoleError.mockImplementation(() => {}) if this is expected.');
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  window.PointerEvent = MockPointerEvent as any;
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
  window.HTMLElement.prototype.releasePointerCapture = vi.fn();
  window.HTMLElement.prototype.hasPointerCapture = vi.fn();
});

afterEach(() => {
  cleanup();
  // eslint-disable-next-line no-global-assign
  window = originalWindow;
});
