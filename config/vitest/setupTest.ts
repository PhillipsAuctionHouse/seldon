import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi, type MockInstance } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render as rtlRender } from '@testing-library/react';
import { setupGlobalMocks as setUpIntersectionObserverMocks } from './mockIntersectionObserver';
import { setupGlobalMocks as setUpEmblaMocks } from './mockEmblaCarousel';

// this is temporary until we have a handle on the double prefix epidemic
const reportedFiles: string[] = [];
export function render(ui: Parameters<typeof rtlRender>[0], actualRender: typeof rtlRender) {
  const beNoisy = false;
  const result = actualRender(ui);
  const html = result.container.innerHTML;
  if (html.includes('seldon-seldon')) {
    const stack = new Error().stack;
    const firstLineWithTestFile = stack?.split('\n').find((line) => line.includes('test.ts'));
    const likelySource = firstLineWithTestFile?.slice(firstLineWithTestFile.indexOf('src')).trim();
    if (likelySource && reportedFiles.includes(likelySource)) return result;
    else if (likelySource) reportedFiles.push(likelySource);
    console.log(
      '\x1b[38;5;183mFound double seldon prefixed class (.seldon-seldon-), may cause test failure. Probable source:\n',
      `\x1b[38;5;151m${likelySource ?? 'Unknown'}\n\n\x1b[0m`,
      beNoisy ? `\x1b[38;5;117m${stack}\x1b[0m` : '',
    );
  }
  return result;
}

vi.mock('@testing-library/react', async () => {
  const actual = await vi.importActual<typeof import('@testing-library/react')>('@testing-library/react');
  return {
    ...actual,
    render: (ui: Parameters<typeof actual.render>[0]) => render(ui, actual.render),
  };
});
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
  window.HTMLElement.prototype.scrollTo = vi.fn();
  window.HTMLElement.prototype.releasePointerCapture = vi.fn();
  window.HTMLElement.prototype.hasPointerCapture = vi.fn().mockReturnValue(true);

  setUpIntersectionObserverMocks();
  setUpEmblaMocks();

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

  Object.defineProperty(window, 'PointerEvent', {
    writable: true,
    value: class PointerEvent extends MouseEvent {
      constructor(type: string, params: Record<string, unknown> = {}) {
        super(type, params);
      }
    },
  });

  // Object.defineProperty(window, 'WheelEvent', {
  //   writable: true,
  //   value: class WheelEvent extends MouseEvent {
  //     deltaY: number;
  //     constructor(type: string, params: Record<string, number> = {}) {
  //       super(type, params);
  //       this.deltaY = params.deltaY ?? 0;
  //     }
  //   },
  // });
});

afterEach(() => {
  cleanup();
  // eslint-disable-next-line no-global-assign
  window = originalWindow;
});
