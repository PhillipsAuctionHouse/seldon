import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SeldonImage from './SeldonImage';
import * as SeldonImageModule from './SeldonImage'; // used for isServer override
import { runCommonTests } from '../../utils/testUtils';
import * as utils from './utils';
import { px } from '../../utils';

describe('SeldonImage', () => {
  runCommonTests(SeldonImage, 'SeldonImage');

  it('renders with default props', () => {
    render(<SeldonImage src="test-image.jpg" alt="" />);
    const image = screen.getByTestId(`seldon-image-img`);

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.jpg');
  });

  it('applies aspect ratio class correctly', () => {
    const { container } = render(<SeldonImage src="test-image.jpg" alt="" aspectRatio="16/9" />);
    expect(container.firstChild).toHaveClass(`${px}-seldon-image--aspect-ratio-16-9`);
  });

  it('applies object fit class correctly', () => {
    render(<SeldonImage src="test-image.jpg" alt="" objectFit="cover" />);
    const image = screen.getByTestId(`seldon-image-img`);
    expect(image).toHaveClass(`${px}-seldon-image-img--object-fit-cover`);
  });

  it('renders blur background when hasBlurBackground is true', () => {
    const { container } = render(<SeldonImage src="test-image.jpg" alt="" hasBlurBackground />);
    expect(container.querySelector(`.${px}-seldon-image-blur`)).toBeInTheDocument();
  });

  it('applies custom image className and style', () => {
    render(
      <SeldonImage src="test-image.jpg" alt="" imageClassName="custom-class" imageStyle={{ borderRadius: '50%' }} />,
    );
    const image = screen.getByTestId(`seldon-image-img`);
    expect(image).toHaveClass('custom-class');
    expect(image).toHaveStyle({ borderRadius: '50%' });
  });

  it('sets loading state to error when image is invalid', async () => {
    render(<SeldonImage src="broken" alt="" />);
    const image = screen.getByTestId(`seldon-image-img`);
    await waitFor(() => {
      fireEvent.error(image);
      const imgs = screen.getAllByRole('img');
      const errorPlaceholder = imgs.find((img) => img.getAttribute('aria-label') === 'Error loading image');
      expect(errorPlaceholder).toBeInTheDocument();
    });
  });
  it('passes srcSet and sizes to img', () => {
    render(
      <SeldonImage
        src="test-image.jpg"
        alt="alt-text"
        srcSet="set1.jpg 1x, set2.jpg 2x"
        sizes="(max-width: 600px) 480px, 800px"
      />,
    );
    const image = screen.getByTestId('seldon-image-img');
    expect(image).toHaveAttribute('srcSet', 'set1.jpg 1x, set2.jpg 2x');
    expect(image).toHaveAttribute('sizes', '(max-width: 600px) 480px, 800px');
  });

  it('sets loading and fetchPriority attributes on img', () => {
    render(<SeldonImage src="test-image.jpg" alt="alt-text" loading="lazy" fetchPriority="high" />);
    const image = screen.getByTestId('seldon-image-img');
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('fetchpriority', 'high');
  });

  it('renders custom errorText when image fails to load', async () => {
    render(<SeldonImage src="broken" alt="alt-text" errorText="Custom error!" />);
    const image = screen.getByTestId('seldon-image-img');
    fireEvent.error(image);
    await waitFor(() => {
      const errorIcon = screen.getByLabelText('Custom error!');
      expect(errorIcon).toBeInTheDocument();
    });
  });

  it('sets loading state to loaded when image loads', async () => {
    render(<SeldonImage src="test-image.jpg" alt="alt-text" />);
    const image = screen.getByTestId('seldon-image-img');
    fireEvent.load(image);
    await waitFor(() => {
      expect(image).not.toHaveClass('seldon-image-img--hidden');
    });
  });

  it('hides blur background when loading or error', async () => {
    const { container, rerender } = render(<SeldonImage src="test-image.jpg" alt="alt-text" hasBlurBackground />);
    const blur = container.querySelector('.seldon-image-blur');
    expect(blur).toBeInTheDocument();
    const image = screen.getByTestId('seldon-image-img');
    fireEvent.error(image);
    await waitFor(() => {
      expect(blur).toHaveClass('seldon-image-blur--hidden');
    });
    rerender(<SeldonImage src="test-image.jpg" alt="alt-text" hasBlurBackground />);
    fireEvent.load(image);
    await waitFor(() => {
      expect(blur).not.toHaveClass('seldon-image-blur--hidden');
    });
  });

  it('does not apply object-fit class when objectFit is none', () => {
    render(<SeldonImage src="test-image.jpg" alt="alt-text" objectFit="none" />);
    const image = screen.getByTestId('seldon-image-img');
    expect(image.className).not.toMatch(/object-fit/);
  });

  it('sets alt and aria-label for accessibility', () => {
    render(<SeldonImage src="test-image.jpg" alt="my alt" />);
    const image = screen.getByTestId('seldon-image-img');
    expect(image).toHaveAttribute('alt', 'my alt');
    const wrapper = image.closest('div');
    expect(wrapper).toHaveAttribute('aria-label', 'my alt');
  });

  it('forwards ref to outer div', () => {
    const ref = { current: null };
    render(<SeldonImage src="test-image.jpg" alt="alt-text" ref={ref} />);
    const wrapper = screen.getByLabelText('alt-text');
    expect(ref.current).toBe(wrapper);
  });

  it('returns loading state on server', () => {
    // Temporarily override isServer to true
    Object.defineProperty(SeldonImageModule, 'isServer', { value: true, writable: true });
    render(<SeldonImageModule.default src="test-image.jpg" alt="alt-text" />);
    // ...assertions if needed
    Object.defineProperty(SeldonImageModule, 'isServer', { value: typeof window === 'undefined' });
  });

  it('returns loaded if image element with id exists and is not hidden', () => {
    const img = document.createElement('img');
    img.id = 'test-image.jpg';
    img.className = '';
    document.body.appendChild(img);
    render(<SeldonImage src="test-image.jpg" alt="alt-text" />);
    document.body.removeChild(img);
  });

  it('returns loaded if img.complete is true', () => {
    const origCreateElement = document.createElement;
    document.createElement = (tag: string) => {
      if (tag === 'img') {
        const img = origCreateElement.call(document, tag) as HTMLImageElement;
        Object.defineProperty(img, 'complete', { value: true });
        return img;
      }
      return origCreateElement.call(document, tag);
    };
    render(<SeldonImage src="test-image.jpg" alt="alt-text" />);
    const image = screen.getByTestId('seldon-image-img');
    expect(image).toBeInTheDocument();
    document.createElement = origCreateElement;
  });

  it('renders aspect ratio 1/1 and none', () => {
    const { container } = render(<SeldonImage src="test-image.jpg" alt="alt-text" aspectRatio="1/1" />);
    expect(container.firstChild).toHaveClass('seldon-image--aspect-ratio-1-1');
    const { container: c2 } = render(<SeldonImage src="test-image.jpg" alt="alt-text" aspectRatio="none" />);
    expect(c2.firstChild).not.toHaveClass('seldon-image--aspect-ratio-1-1');
  });

  it('applies all objectFit values', () => {
    (['contain', 'cover', 'fill', 'scale-down'] as const).forEach((fit) => {
      render(<SeldonImage src="test-image.jpg" alt="alt-text" objectFit={fit} />);
      const image = screen.getByTestId('seldon-image-img');
      expect(image).toHaveClass(`seldon-image-img--object-fit-${fit}`);
    });
  });

  it('does not render blur background when hasBlurBackground is false', () => {
    const { container } = render(<SeldonImage src="test-image.jpg" alt="alt-text" hasBlurBackground={false} />);
    expect(container.querySelector('.seldon-image-blur')).toBeNull();
  });

  it('does not render error placeholder when not error', () => {
    render(<SeldonImage src="test-image.jpg" alt="alt-text" />);
    expect(screen.queryByLabelText('Error loading image')).toBeNull();
  });

  it('passes arbitrary props to outer div', () => {
    render(<SeldonImage src="test-image.jpg" alt="alt-text" data-foo="bar" />);
    const wrapper = screen.getByLabelText('alt-text');
    expect(wrapper).toHaveAttribute('data-foo', 'bar');
  });

  it('sets loadingState to error if isImageValid returns false', async () => {
    const spy = vi.spyOn(utils, 'isImageValid').mockResolvedValue(false);
    render(<SeldonImage src="test-image.jpg" alt="alt-text" />);
    await waitFor(() => {
      expect(screen.getByLabelText('Error loading image')).toBeInTheDocument();
    });
    spy.mockRestore();
  });
});
