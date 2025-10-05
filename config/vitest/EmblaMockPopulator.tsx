// import { useEffect } from 'react';
// import { mutables } from './mockEmblaCarousel';
// // Import the default export and any re-exported real hook the mock may expose

// export const EmblaMockPopulator = () => {
//   // Prefer the real hook if the mock re-exported it as `actualUseEmbla`.
//   // Otherwise fall back to the default (mock) hook.
//   const [, emblaApi] = mutables.actualUseEmbla();
//   console.log({ emblaApi });
//   useEffect(() => {
//     if (emblaApi && Object.keys(emblaApi ?? {}).length) mutables.actualEmblaApi = emblaApi;
//   }, [emblaApi]);

//   return <div />;
// };
