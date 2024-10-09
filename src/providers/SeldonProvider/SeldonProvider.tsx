import { PropsWithChildren } from 'react';
import { SSRMediaQuery, ssrMediaQueryStyle } from './utils';

/**
 * The SeldonProvider currently provides the ability for our components to render differently based on different media queries, but in the future it may provide other kinds of context data like common internationalization (i18n) data.
 *
 * It is recommended to wrap this provider once around your entire application to ensure that all Seldon components can access the same context.
 */
export const SeldonProvider = ({ children }: PropsWithChildren) => (
  <SSRMediaQuery.MediaContextProvider>
    <style>
      {/* This style tag is required for SSRMediaQuery to work, kinda weird to put it here in the body but it's allowed and makes the component much easier to consume */}
      {ssrMediaQueryStyle}
    </style>
    {children}
  </SSRMediaQuery.MediaContextProvider>
);
