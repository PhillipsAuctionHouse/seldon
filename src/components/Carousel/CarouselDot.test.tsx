import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CarouselDot } from './CarouselDot';
import userEvent from '@testing-library/user-event';

vi.mock('react-intersection-observer', () => ({
  useInView: () => ({ ref: vi.fn() }),
}));

describe('CarouselDot', () => {
  const baseProps = {
    isSelected: false,
    onClick: vi.fn(),
    scrollableContainerRef: { current: null },
    onInViewChange: vi.fn(),
  };

  it('renders with default props', () => {
    render(<CarouselDot {...baseProps} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    render(<CarouselDot {...baseProps} />);
    await userEvent.click(screen.getByRole('button'));
    expect(baseProps.onClick).toHaveBeenCalled();
  });

  it('applies selected class when isSelected is true', () => {
    render(<CarouselDot {...baseProps} isSelected />);
    const dot = screen.getByRole('button').querySelector<HTMLSpanElement>('span');
    expect(dot?.className).toMatch(/--selected/);
  });

  it('applies variant class', () => {
    render(<CarouselDot {...baseProps} variant="sm" />);
    const dot = screen.getByRole('button').querySelector<HTMLSpanElement>('span');
    expect(dot?.className).toMatch(/--sm/);
  });

  // if someone else can make this work, pretty please?
  // it('calls onInViewChange when dot comes into view', async () => {
  //   const onInViewChange = vi.fn();

  //   render(<CarouselDot {...baseProps} onInViewChange={onInViewChange} />);
  //   window.innerWidth = 1;
  //   window.dispatchEvent(new Event('resize'));
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  //   window.innerWidth = 1024;
  //   window.dispatchEvent(new Event('resize'));
  //   expect(onInViewChange).toHaveBeenCalledWith(true);
  // });
});
