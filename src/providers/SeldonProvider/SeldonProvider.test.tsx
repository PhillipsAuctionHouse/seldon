import { render, screen } from '@testing-library/react';
import { SeldonProvider } from './SeldonProvider';
import { SSRMediaQuery } from './utils';
import { Breakpoints } from '../../utils';

describe('SeldonProvider', () => {
  describe('Media Queries', () => {
    it('three children render with the fresnel classes', () => {
      render(
        <SeldonProvider>
          <SSRMediaQuery.Media lessThan={Breakpoints.md}>Small Breakpoint</SSRMediaQuery.Media>
          <SSRMediaQuery.Media between={[Breakpoints.md, Breakpoints.lg]}>Medium Breakpoint</SSRMediaQuery.Media>
          <SSRMediaQuery.Media greaterThanOrEqual={Breakpoints.lg}>Large Breakpoint</SSRMediaQuery.Media>
        </SeldonProvider>,
      );

      screen.getAllByText(/Breakpoint/i).forEach((element) => {
        expect(element.className).toContain('fresnel');
      });
    });

    it('puts Fresnel CSS in the foundation cascade layer', () => {
      render(
        <SeldonProvider>
          <span>child</span>
        </SeldonProvider>,
      );

      const fresnelStyles = [...document.querySelectorAll('style')].map((styleEl) => styleEl.textContent ?? '');
      expect(fresnelStyles.some((css) => css.includes('@layer seldon.foundation') && css.includes('fresnel'))).toBe(
        true,
      );
    });
  });
}); // end of describe block
