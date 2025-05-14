import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import Loader from './Loader';

describe('Loader', () => {
  it('renders correctly with default props', () => {
    render(<Loader />);
    const loader = screen.getByTestId('loader');

    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('role', 'status');
    expect(loader).toHaveAttribute('aria-live', 'polite');
    expect(loader).toHaveAttribute('aria-label', 'Loading');
    expect(loader.className).toContain('seldon-loader');
    expect(loader.className).toContain('seldon-loader--centered');
  });

  it('applies custom aria-label when provided', () => {
    render(<Loader aria-label="Custom loading text" />);
    const loader = screen.getByTestId('loader');

    expect(loader).toHaveAttribute('aria-label', 'Custom loading text');
  });

  it('does not apply centered class when isCentered is false', () => {
    render(<Loader isCentered={false} />);
    const loader = screen.getByTestId('loader');

    expect(loader.className).toContain('seldon-loader');
    expect(loader.className).not.toContain('seldon-loader--centered');
  });

  it('applies additional className when provided', () => {
    render(<Loader className="custom-class" />);
    const loader = screen.getByTestId('loader');

    expect(loader.className).toContain('seldon-loader');
    expect(loader.className).toContain('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Loader ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('SPAN');
  });

  it('accepts and applies additional props', () => {
    render(<Loader data-custom="test-value" />);
    const loader = screen.getByTestId('loader');

    expect(loader).toHaveAttribute('data-custom', 'test-value');
  });
});
