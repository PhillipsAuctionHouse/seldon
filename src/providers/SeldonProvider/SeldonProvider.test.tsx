import { render, screen } from '@testing-library/react';
import { SeldonProvider } from './SeldonProvider';
import { SSRMediaQuery } from '../../providers/utils';

describe('SeldonProvider', () => {
  describe('Media Queries', () => {
    it('four children render with the fresnel classes', () => {
      render(
        <SeldonProvider>
          <SSRMediaQuery.Media lessThan="md">Small Breakpoint</SSRMediaQuery.Media>
          <SSRMediaQuery.Media between={['md', 'lg']}>Medium Breakpoint</SSRMediaQuery.Media>
          <SSRMediaQuery.Media between={['lg', 'xl']}>Large Breakpoint</SSRMediaQuery.Media>
          <SSRMediaQuery.Media greaterThan="lg">Extra Large Breakpoint</SSRMediaQuery.Media>
        </SeldonProvider>,
      );

      screen.getAllByText(/Breakpoint/i).forEach((element) => {
        expect(element.className).toContain('fresnel');
      });
    });
  });
}); // end of describe block
