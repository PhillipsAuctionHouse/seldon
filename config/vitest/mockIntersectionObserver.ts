import { vi } from 'vitest';

declare const globalThis: GlobalThis;

const allObservers: MockIntersectionObserver[] = [];
export class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  private _callback: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void;
  private _observedElements: Set<Element> = new Set();
  constructor(
    cb: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void,
    options?: IntersectionObserverInit,
  ) {
    this._callback = cb;
    this.root = options?.root ?? null;
    this.rootMargin = options?.rootMargin ?? '';
    this.thresholds =
      options?.threshold instanceof Array ? options.threshold : options?.threshold ? [options.threshold] : [0];
    allObservers.push(this);
  }
  observe = (el: Element) => {
    this._observedElements.add(el);
  };
  unobserve = (el: Element) => {
    this._observedElements.delete(el);
  };
  disconnect = () => {
    this._observedElements.clear();
  };
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  public triggerIntersect(entries: IntersectionObserverEntry[]) {
    const relevantEntries = entries.filter((entry) => this._observedElements.has(entry.target));
    if (relevantEntries.length > 0) {
      this._callback(relevantEntries, this);
    }
  }

  public static triggerIntersect(entries: IntersectionObserverEntry[]) {
    allObservers.forEach((observer) => {
      observer.triggerIntersect(entries);
    });
  }
  getObservedElements() {
    return Array.from(this._observedElements);
  }
}

export class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

export function setupGlobalMocks() {
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: MockIntersectionObserver,
  });
  Object.defineProperty(globalThis, 'IntersectionObserver', {
    writable: true,
    value: MockIntersectionObserver,
  });
  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    value: MockResizeObserver,
  });
  globalThis.triggerIntersection = MockIntersectionObserver.triggerIntersect;
}
