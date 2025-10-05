import { type EventHandlerType, type EmblaEventType } from 'embla-carousel/components/EventHandler';
import { type EmblaCarouselType } from 'embla-carousel';

export const reInitMock = vi.fn();
export const scrollNextMock = vi.fn();
export const scrollPrevMock = vi.fn();
export const scrollToMock = vi.fn();
export const onMockIndicator = vi.fn();

export const inViewState = new Map<HTMLElement, boolean>();

type ExportedMutables = {
  // typeof the real default export (useEmblaCarousel)
  actualUseEmbla: (typeof import('embla-carousel-react'))['default'];
  actualEmblaApi?: EmblaCarouselType;
  patchedEmblaApi?: EmblaCarouselType;
  slidesInView?: () => number[];
  scrollSnapList?: () => number[];
  selectedScrollSnap?: () => number;
};

export const mutables: ExportedMutables = {
  actualUseEmbla: undefined as unknown as ExportedMutables['actualUseEmbla'],
  actualEmblaApi: undefined,
  patchedEmblaApi: undefined,
  slidesInView: undefined,
  scrollSnapList: undefined,
  selectedScrollSnap: undefined,
};

// populate actualUseEmbla after runtime import to keep typing correct
{
  const real = (await vi.importActual<typeof import('embla-carousel-react')>('embla-carousel-react')).default;
  mutables.actualUseEmbla = real as ExportedMutables['actualUseEmbla'];
}

type OnMock = (
  eventType: EmblaEventType,
  cb: (api: EmblaCarouselType, event: EmblaEventType) => void,
) => EventHandlerType;

// Simple event registry factory for a patched Embla API
const createEventAPI = (patchedApi: EmblaCarouselType) => {
  type Listener = (api: EmblaCarouselType, event: EmblaEventType, ...args: unknown[]) => void;
  const listeners = new Map<string, Set<Listener>>();

  const on: OnMock = (eventType, cb) => {
    const set = listeners.get(eventType) ?? new Set<Listener>();
    set.add(cb as Listener);
    listeners.set(eventType, set);
    onMockIndicator(eventType, cb as unknown as Listener);
    // Call the callback once on registration to mirror previous mock behavior
    try {
      (cb as Listener)(patchedApi, eventType);
    } catch (_e) {
      // swallow errors from handlers during immediate invocation to avoid breaking tests
    }
    return patchedApi as unknown as EventHandlerType;
  };

  const off: OnMock = (eventType, cb) => {
    const set = listeners.get(eventType);
    if (set) {
      set.delete(cb as Listener);
      if (set.size === 0) listeners.delete(eventType);
    }
    return patchedApi as unknown as EventHandlerType;
  };

  const emit = (eventType: EmblaEventType, ...args: unknown[]) => {
    const set = listeners.get(eventType);
    if (set) {
      // copy to avoid mutation while iterating
      Array.from(set).forEach((cb) => cb(patchedApi, eventType, ...args));
    }
    return patchedApi as unknown as EventHandlerType;
  };

  return { on, off, emit };
};

vi.mock('embla-carousel-react', async () => {
  const actualEmbla = (await vi.importActual<typeof import('embla-carousel-react')>('embla-carousel-react')).default;
  return {
    default: (ops: Parameters<typeof actualEmbla>[0], plugs: Parameters<typeof actualEmbla>[1]) => {
      const patchApi = (emblaApi?: EmblaCarouselType): EmblaCarouselType | undefined => {
        if (!emblaApi) return undefined;
        const patchedApi: EmblaCarouselType = { ...emblaApi };
        patchedApi.slidesInView = () => mutables.slidesInView?.() ?? emblaApi.slidesInView?.();
        patchedApi.scrollSnapList = () => mutables.scrollSnapList?.() ?? emblaApi.scrollSnapList?.();
        patchedApi.selectedScrollSnap = () => mutables.selectedScrollSnap?.() ?? emblaApi.selectedScrollSnap?.();
        patchedApi.reInit = (...args: Parameters<EmblaCarouselType['reInit']>) => {
          reInitMock(...args);
          const result = emblaApi.reInit(...args);
          // emit a reInit event so plugins (like ClassNames) can respond
          // use optional chaining in case emit is not attached yet
          (mutables.patchedEmblaApi as unknown as { emit?: (event: EmblaEventType, ...a: unknown[]) => void })?.emit?.(
            'reInit',
            ...(args as unknown[]),
          );
          return result;
        };
        patchedApi.scrollTo = scrollToMock;
        patchedApi.scrollNext = scrollNextMock;
        patchedApi.scrollPrev = scrollPrevMock;
        patchedApi.canScrollNext = () => true;
        patchedApi.canScrollPrev = () => true;
        // keep a reference to the patched api for tests to inspect/use
        mutables.patchedEmblaApi = patchedApi;
        mutables.actualEmblaApi = emblaApi;
        return patchedApi;
      };

      const returnValue = actualEmbla(ops, plugs).map((item, i) =>
        i === 1 && item && 'slidesInView' in item ? patchApi(item as EmblaCarouselType) : item,
      ) as [ReturnType<typeof actualEmbla>[0], Partial<EmblaCarouselType>];

      if (returnValue[1]) {
        // attach a lightweight event registry to the patched API so tests/plugins can subscribe
        const eventAPI = createEventAPI(returnValue[1] as EmblaCarouselType);
        returnValue[1] = {
          ...returnValue[1],
          on: eventAPI.on,
          off: eventAPI.off,
          emit: eventAPI.emit,
        } as Partial<EmblaCarouselType>;
        // store patched api reference for other test helpers
        mutables.patchedEmblaApi = returnValue[1] as EmblaCarouselType;
        // immediately emit init so plugins can initialize class names and other listeners
        (mutables.patchedEmblaApi as unknown as { emit?: (event: EmblaEventType, ...a: unknown[]) => void })?.emit?.(
          'init',
        );
      }

      return returnValue;
    },
    globalOptions: actualEmbla.globalOptions,
  };
});

vi.mock('../../src/components/Carousel/utils', async () => {
  const actualUtils = (await vi.importActual<typeof import('../../src/components/Carousel/utils')>(
    '../../src/components/Carousel/utils',
  )) as typeof import('../../src/components/Carousel/utils');
  return {
    useCarousel: () => {
      const actualUseCarouselResults = actualUtils.useCarousel();

      return {
        ...actualUseCarouselResults,
        api: mutables.patchedEmblaApi,
      };
    },
  };
});
export const setupGlobalMocks = () => {
  afterEach(() => {
    inViewState.clear();
  });
};
