import classnames from 'classnames';
import { ComponentProps, forwardRef, type KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { getCommonProps } from '../../utils';
import AuctionCard, { type AuctionCardProps } from '../AuctionCard/AuctionCard';

/**
 * One slide in the hero carousel.
 */
export interface HeroSlide {
  /** Unique key for React reconciliation. */
  key: string;
  /** Background image URL. */
  imageSrc?: string;
  /** Alt text for the background image. */
  imageAlt?: string;
  /** Auction-card overlay shown bottom-left. */
  auctionCard?: AuctionCardProps;
  /** Optional click destination when no auction card is present. */
  href?: string;
}

/**
 * Props for the HeroCarousel component.
 */
export interface HeroCarouselProps extends ComponentProps<'section'> {
  slides: HeroSlide[];
  /** Aria label for the carousel region. */
  ariaLabel?: string;
  /** Aria label for the previous-slide button. */
  previousSlideLabel?: string;
  /** Aria label for the next-slide button. */
  nextSlideLabel?: string;
  /** Autoplay interval in ms. Set to 0 to disable. Default 6000. */
  autoplayMs?: number;
}

const DEFAULT_AUTOPLAY_MS = 6000;

function ChevronLeft() {
  return (
    <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * ## Overview
 *
 * Hero carousel with cross-fade autoplay (Artsy-style), subtle Ken-Burns
 * scaling on the active image, hover-only navigation arrows, and a dot
 * pagination rail below the hero. Each slide can host an `AuctionCard`
 * overlay positioned at bottom-left.
 *
 * Honors `prefers-reduced-motion` (autoplay + animation disabled),
 * pauses on hover/focus, supports left/right arrow keys.
 *
 * [Figma Link](https://www.figma.com/design/hOoH4zNM3acxBH2Ey4Dqhb/01_Homepage?node-id=2527-11484)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/patterns-herocarousel--overview)
 */
const HeroCarousel = forwardRef<HTMLElement, HeroCarouselProps>(
  (
    {
      className,
      slides,
      ariaLabel = 'Hero carousel',
      previousSlideLabel = 'Previous slide',
      nextSlideLabel = 'Next slide',
      autoplayMs = DEFAULT_AUTOPLAY_MS,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'HeroCarousel');
    const classes = classnames(baseClassName, className);
    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const slideCount = slides.length;

    const goTo = useCallback(
      (index: number) => {
        if (slideCount === 0) return;
        const next = ((index % slideCount) + slideCount) % slideCount;
        setActiveIndex(next);
      },
      [slideCount],
    );

    const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
    const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

    useEffect(() => {
      if (slideCount <= 1 || paused || autoplayMs <= 0) return;
      if (typeof window === 'undefined') return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;
      const id = window.setInterval(() => {
        setActiveIndex((i) => (i + 1) % slideCount);
      }, autoplayMs);
      return () => window.clearInterval(id);
    }, [slideCount, paused, autoplayMs]);

    if (slideCount === 0) return null;

    const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
      if (slideCount <= 1) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };

    const showArrows = slideCount > 1;

    return (
      <section
        ref={ref}
        className={classes}
        aria-label={ariaLabel}
        aria-roledescription="carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={onKeyDown}
        {...commonProps}
      >
        <div className={`${baseClassName}__viewport`}>
          <div className={`${baseClassName}__stage`} aria-live="polite">
            {slides.map((slide, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={slide.key}
                  className={classnames(`${baseClassName}__slide`, {
                    [`${baseClassName}__slide--active`]: isActive,
                  })}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${slideCount}`}
                  aria-hidden={!isActive}
                >
                  {slide.imageSrc ? (
                    <img src={slide.imageSrc} alt={slide.imageAlt ?? ''} className={`${baseClassName}__image`} />
                  ) : null}
                  {slide.href && !slide.auctionCard ? (
                    <a href={slide.href} className={`${baseClassName}__slide-link`} tabIndex={isActive ? 0 : -1} />
                  ) : null}
                  {slide.auctionCard ? (
                    <div className={`${baseClassName}__card-wrap`}>
                      <AuctionCard {...slide.auctionCard} />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
          {showArrows ? (
            <div className={`${baseClassName}__arrows`}>
              <button
                type="button"
                className={`${baseClassName}__arrow ${baseClassName}__arrow--prev`}
                aria-label={previousSlideLabel}
                onClick={goPrev}
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                className={`${baseClassName}__arrow ${baseClassName}__arrow--next`}
                aria-label={nextSlideLabel}
                onClick={goNext}
              >
                <ChevronRight />
              </button>
            </div>
          ) : null}
        </div>

        {slideCount > 1 ? (
          <div className={`${baseClassName}__pagination`} role="tablist">
            {slides.map((s, i) => (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Slide ${i + 1}`}
                className={classnames(`${baseClassName}__dot`, {
                  [`${baseClassName}__dot--active`]: i === activeIndex,
                })}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        ) : null}
      </section>
    );
  },
);

HeroCarousel.displayName = 'HeroCarousel';

export default HeroCarousel;
