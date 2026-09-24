import { PropsWithChildren } from 'react';
import '../../scss/_foundation.scss';
import { SSRMediaQuery, ssrMediaQueryStyle } from './utils';

/**
 * The SeldonProvider currently provides the ability for our components to render differently based on different media queries, but in the future it may provide other kinds of context data like common internationalization (i18n) data.
 *
 * It is recommended to wrap this provider once around your entire application to ensure that all Seldon components can access the same context.
 */
export const SeldonProvider = ({ children }: PropsWithChildren) => (
  <SSRMediaQuery.MediaContextProvider>
    <style>
      {/* Fresnel hide/show CSS. Foundation layer so pattern/component rules
          (e.g. FiltersInline sort margin) can override `.fresnel-container`. */}
      {`@layer seldon.foundation {${ssrMediaQueryStyle}}`}
    </style>
    {children}
  </SSRMediaQuery.MediaContextProvider>
);
