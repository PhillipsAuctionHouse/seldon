import { render, screen } from '@testing-library/react';
import CarouselItem from './CarouselItem';

describe('CarouselItem', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.mock('./utils', () => ({ useCarousel: () => ({ columnGap: 'lg' }) }));
  });

  it('renders with default props', () => {
    render(<CarouselItem>Slide</CarouselItem>);
    expect(screen.getByText('Slide')).toBeInTheDocument();
  });

  it('applies gap class when columnGap is provided by useCarousel', () => {
    render(<CarouselItem>Gap Slide</CarouselItem>);
    expect(screen.getByText('Gap Slide').className).toMatch(/--gap-lg/);
  });

  it('applies cursor-pointer class when onClick is provided', () => {
    render(<CarouselItem onClick={() => void 0}>Clickable Slide</CarouselItem>);
    expect(screen.getByText('Clickable Slide').className).toMatch(/--cursor-pointer/);
  });

  it('role is button when onClick is provided', () => {
    render(<CarouselItem onClick={() => void 0}>Button Slide</CarouselItem>);
    expect(screen.getByText('Button Slide')).toHaveAttribute('role', 'button');
  });

  it('role is group when onClick is not provided', () => {
    render(<CarouselItem>Group Slide</CarouselItem>);
    expect(screen.getByText('Group Slide')).toHaveAttribute('role', 'group');
  });
});
