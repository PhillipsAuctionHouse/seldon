import { useMediaQuery } from 'usehooks-ts';

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
