import { screen } from '@testing-library/react';
import { renderCarousel, getDotButtons, getDotSpan, restoreInitialMocks, renderArrows } from './carouselTestUtils';
import { mutables } from '../../../config/vitest/mockEmblaCarousel';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('carouselTestUtils', () => {
  beforeEach(() => {
    restoreInitialMocks();
  });

  afterEach(() => {
    restoreInitialMocks();
  });

  it('renderCarousel returns rerenderSame that rerenders with same output', () => {
    const rendered = renderCarousel({ slides: ['A', 'B', 'C'] });
    expect(screen.getByText('A')).toBeInTheDocument();
    // call rerenderSame and ensure content still present
    rendered.rerenderSame();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('getDotButtons and getDotSpan helpers work', () => {
    mutables.scrollSnapList = () => [0, 1, 2];
    renderCarousel({ slides: ['X', 'Y', 'Z'] });
    const btns = getDotButtons();
    expect(btns.length).toBe(3);
    const span = getDotSpan(btns[0]);
    expect(span).toBeInstanceOf(HTMLElement);
  });

  it('restoreInitialMocks resets mutables and clears mocks', () => {
    mutables.patchedEmblaApi = undefined as unknown as typeof mutables.patchedEmblaApi;
    // ensure restoreInitialMocks clears patchedEmblaApi
    restoreInitialMocks();
    expect(mutables.patchedEmblaApi).toBeUndefined();
    expect(mutables.slidesInView?.()).toEqual([0]);
  });

  it('renderArrows renders and arrow buttons exist', () => {
    renderArrows(3);
    // arrows typically render buttons for prev/next
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });
});
