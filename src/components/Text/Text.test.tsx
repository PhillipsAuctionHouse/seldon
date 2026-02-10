import { forwardRef } from 'react';
import { render, screen } from '@testing-library/react';
import Text, { TextProps } from './Text';
import { TextVariants } from './types';
import { runCommonTests } from '../../utils/testUtils';
import { px } from '../../utils';
import TextSymbol from '../TextSymbol/TextSymbol';
import { TextSymbolVariants } from '../TextSymbol';

describe('Text', () => {
  // Use a forwardRef wrapper for runCommonTests to ensure ref is tested correctly
  const RefText = forwardRef<HTMLElement, React.ComponentProps<typeof Text>>((props, ref) => (
    <Text {...props} ref={ref} />
  ));
  RefText.displayName = 'RefText';
  runCommonTests(RefText, 'Text');
  const renderText = (props: TextProps) => {
    render(<Text {...props} />);
  };

  it('renders with data-testid attribute', () => {
    renderText({ children: 'Test ID', id: 'id' });
    expect(screen.getByTestId('text-id')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    renderText({ children: 'Hello World' });

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
  it('renders superscript correctly', () => {
    renderText({
      children: (
        <>
          Hello World<TextSymbol variant={TextSymbolVariants.lotNumber} symbols={['sup']}></TextSymbol>
        </>
      ),
    });

    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.getByText('sup')).toBeInTheDocument();
  });

  it('applies the default variant correctly', () => {
    renderText({ children: 'Default Variant' });

    expect(screen.getByText('Default Variant')).toHaveClass(`${px}-text--bodyMedium`);
  });

  it('applies the custom variant correctly', () => {
    renderText({ children: 'Custom Variant', variant: TextVariants.body1 });

    expect(screen.getByText('Custom Variant')).toHaveClass(`${px}-text--body1`);
  });

  it('applies additional className correctly', () => {
    renderText({ children: 'Additional Class', className: 'custom-class' });

    expect(screen.getByText('Additional Class')).toHaveClass('custom-class');
  });

  it('renders with custom element correctly', () => {
    renderText({ children: 'Custom Element', element: 'p' });

    expect(screen.getByText('Custom Element')).toBeInTheDocument();
    expect(screen.getByText('Custom Element').tagName).toBe('P');
  });

  it('renders with default span', () => {
    renderText({ children: 'Default Span' });
    expect(screen.getByText('Default Span')).toBeInTheDocument();
    expect(screen.getByText('Default Span').tagName).toBe('SPAN');
  });

  it('should render with skeleton class name', () => {
    render(<Text isSkeletonLoading>Test</Text>);
    const textElement = screen.getByText('Test');
    expect(textElement).toHaveClass(`${px}-skeleton`);
  });

  it('should not render with skeleton class name', () => {
    render(<Text>Test</Text>);
    const textElement = screen.getByText('Test');
    expect(textElement).not.toHaveClass(`${px}-skeleton`);
  });
});
