import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { CarouselDot } from './CarouselDot';

// Mocks for intersection observer
vi.mock('react-intersection-observer', () => ({
  useInView: () => ({ ref: vi.fn() }),
}));

describe('CarouselDot', () => {
  const baseProps = {
    isSelected: false,
    onClick: vi.fn(),
    scrollableContainerRef: { current: null } as React.RefObject<HTMLDivElement>,
    onInViewChange: vi.fn(),
  };

  it('renders with default props', () => {
    render(<CarouselDot {...baseProps} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(<CarouselDot {...baseProps} />);
    fireEvent.click(screen.getByRole('button'));
    expect(baseProps.onClick).toHaveBeenCalled();
  });

  it('applies selected class when isSelected is true', () => {
    render(<CarouselDot {...baseProps} isSelected />);
    const dot = screen.getByRole('button').firstChild as HTMLElement;
    expect(dot.className).toMatch(/--selected/);
  });

  it('applies variant class', () => {
    render(<CarouselDot {...baseProps} variant="sm" />);
    const dot = screen.getByRole('button').firstChild as HTMLElement;
    expect(dot.className).toMatch(/--sm/);
  });
});
