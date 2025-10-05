import { renderHook } from '@testing-library/react';
import { useCarousel } from './utils';
import { type ReactNode } from 'react';
import { CarouselContext } from './Carousel';
import useEmblaCarousel from 'embla-carousel-react';

const carouselPlaceholderContextValue = {
  carouselRef: vi.fn(),
  api: undefined,
  scrollPrev: () => void 0,
  scrollNext: () => void 0,
  canScrollPrev: true,
  canScrollNext: true,
};

describe('useCarousel', () => {
  it('throws if not used within CarouselContext', () => {
    vi.spyOn(console, 'error').mockImplementation(() => void 0);
    expect(() => renderHook(() => useCarousel())).toThrow('useCarousel must be used within a <Carousel />');
  });

  it('returns context value when used within CarouselContext', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <CarouselContext.Provider value={carouselPlaceholderContextValue}>{children}</CarouselContext.Provider>
    );
    const { result } = renderHook(() => useCarousel(), { wrapper });
    expect(result.current).toBe(carouselPlaceholderContextValue);
  });
});
