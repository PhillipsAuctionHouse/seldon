import { createMedia } from '@artsy/fresnel';
import { BREAKPOINTS } from '../utils/constants';
/**
 * Used to hide or show components based on the current breakpoint in a SSR friendly way
 */
export const SSRMediaQuery = createMedia({ breakpoints: BREAKPOINTS });

export const ssrMediaQueryStyle = SSRMediaQuery.createMediaStyle();
