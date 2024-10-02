import { render, screen } from '@testing-library/react';
import { runCommonTests } from '../../utils/testUtils';
import TextSymbol, { TextSymbolProps } from './TextSymbol';
import { px } from '../../utils';
import { TextSymbolVariants } from './types';

describe('TextSymbol', () => {
  runCommonTests(TextSymbol, 'TextSymbol');
  const renderTextSymbol = (props: TextSymbolProps) => {
    render(<TextSymbol {...props} />);
  };

  it('renders children correctly', () => {
    renderTextSymbol({ children: 'Hello World' });

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('applies the default variant correctly', () => {
    renderTextSymbol({ children: 'Default Variant' });

    expect(screen.getByText('Default Variant')).toHaveClass(`${px}-text-symbol--lotNumber`);
  });

  it('applies the estimation variant correctly', () => {
    renderTextSymbol({ children: 'Estimation Variant', variant: TextSymbolVariants.estimation });

    expect(screen.getByText('Estimation Variant')).toHaveClass(`${px}-text-symbol--estimation`);
  });
});
