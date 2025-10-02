import { MockIntersectionObserver } from './mockIntersectionObserver';
declare global {
  interface GlobalThis {
    triggerIntersection: (entries: IntersectionObserverEntry[]) => void;
    IntersectionObserver: typeof MockIntersectionObserver;
  }
}

export {};
