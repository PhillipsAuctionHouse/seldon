import { setupDomRectMocks, createIntersectionEntry, updateInView, getSlides } from './emblaTestUtils';
import { mutables } from './mockEmblaCarousel';
import { render } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';

describe('emblaTestUtils', () => {
  beforeEach(() => {
    setupDomRectMocks();
  });

  afterEach(() => {
    // cleanup any global helper we set
    (globalThis as unknown as { triggerIntersection?: (...args: unknown[]) => void }).triggerIntersection = undefined;
    mutables.patchedEmblaApi = undefined as unknown as typeof mutables.patchedEmblaApi;
  });

  it('setupDomRectMocks gives elements a stable bounding rect and DOMRect.fromRect works', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);

    const r = el.getBoundingClientRect();
    expect(r.width).toBe(100);
    expect(r.height).toBe(40);

    const dr = (DOMRect as unknown as { fromRect: (other?: DOMRectInit) => DOMRect }).fromRect({
      x: 1,
      y: 2,
      width: 3,
      height: 4,
    });
    expect(dr.width).toBe(3);
    expect(dr.height).toBe(4);
  });

  it('createIntersectionEntry produces an entry with correct target and isIntersecting flag', () => {
    const el = document.createElement('div');
    const entry = createIntersectionEntry(el, true);
    expect(entry.target).toBe(el);
    expect(entry.isIntersecting).toBe(true);
  });

  it('updateInView triggers global triggerIntersection and calls patchedEmblaApi.emit', () => {
    const btn = document.createElement('button');
    document.body.appendChild(btn);
    // capture triggerIntersection calls
    const calls: IntersectionObserverEntry[][] = [];
    (
      globalThis as unknown as { triggerIntersection?: (entries: IntersectionObserverEntry[]) => void }
    ).triggerIntersection = (entries: IntersectionObserverEntry[]) => calls.push(entries);

    // provide a patchedEmblaApi with an emit spy
    const emitSpy = vi.fn();
    mutables.patchedEmblaApi = { emit: emitSpy } as unknown as typeof mutables.patchedEmblaApi;

    updateInView([btn], [0]);

    // The helper should have called triggerIntersection at least twice (clear then set)
    expect(calls.length).toBeGreaterThanOrEqual(2);

    // last call should have isIntersecting true for our button
    const last = calls[calls.length - 1][0];
    expect(last.target).toBe(btn);
    expect(last.isIntersecting).toBe(true);

    expect(emitSpy).toHaveBeenCalledWith('slidesInView');
  });

  it('getSlides returns elements rendered with data-testid carousel-item', () => {
    render(
      React.createElement('div', null, [
        React.createElement('div', { key: 'a', 'data-testid': 'carousel-item' }),
        React.createElement('div', { key: 'b', 'data-testid': 'carousel-item' }),
      ]),
    );

    const slides = getSlides();
    expect(slides.length).toBeGreaterThanOrEqual(2);
  });
});
