import { render, screen } from '@testing-library/react';
import { SeldonProvider } from './SeldonProvider';
import { SSRMediaQuery, ssrMediaQueryStyle } from './utils';
import { FC } from 'react';

describe('SeldonProvider', () => {
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

  type Size = 'xsm' | 'sm' | 'md' | 'lg' | 'xl' | 'xl';

  it.each([
    ['lessThan', { lessThan: 'md' }, 'Small Breakpoint'],
    ['between', { between: ['md', 'lg'] }, 'Medium Breakpoint'],
    ['between', { between: ['lg', 'xl'] }, 'Large Breakpoint'],
    ['greaterThan', { greaterThan: 'lg' }, 'Extra Large Breakpoint'],
  ] as Array<
    ['lessThan' | 'between' | 'greaterThan', { lessThan?: Size; between?: [Size, Size]; greaterThan?: Size }, string]
  >)('renders %s breakpoint with fresnel class', (_, props, text) => {
    render(
      <SeldonProvider>
        <SSRMediaQuery.Media {...props}>{text}</SSRMediaQuery.Media>
      </SeldonProvider>,
    );
    expect(screen.getByText(text).className).toContain('fresnel');
  });

  it.todo('provides context to children', () => void 0);

  it('renders style tag for SSR', () => {
    render(
      <SeldonProvider>
        <div>SSR Style Test</div>
      </SeldonProvider>,
    );
    const styleTags = document.querySelectorAll('style');
    expect(Array.from(styleTags).some((tag) => tag.textContent === ssrMediaQueryStyle)).toBe(true);
  });

  const BrokenConsumer: FC = () => {
    // @ts-expect-error it does not exist and we accept it
    return <div>{doesNotExist()}</div>;
  };

  expect(() => render(<BrokenConsumer />)).toThrow();

  it('handles invalid breakpoint props gracefully', () => {
    render(
      <SeldonProvider>
        {/* @ts-expect-error invalid prop */}
        <SSRMediaQuery.Media lessThan={null}>Invalid Breakpoint</SSRMediaQuery.Media>
      </SeldonProvider>,
    );
    expect(screen.getByText('Invalid Breakpoint')).toBeInTheDocument();
  });
});
