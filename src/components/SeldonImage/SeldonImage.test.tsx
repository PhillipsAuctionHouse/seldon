import { render, screen, fireEvent } from '@testing-library/react';
import SeldonImage from './SeldonImage';
import { runCommonTests } from '../../utils/testUtils';
import { px } from '../../utils';

describe('SeldonImage', () => {
  runCommonTests(SeldonImage, 'SeldonImage');

  it('renders with default props', () => {
    render(<SeldonImage src="test-image.jpg" />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.jpg');
  });

  it('applies aspect ratio class correctly', () => {
    const { container } = render(<SeldonImage src="test-image.jpg" aspectRatio="16/9" />);
    expect(container.firstChild).toHaveClass(`${px}-seldon-image--aspect-ratio-16-9`);
  });

  it('applies object fit class correctly', () => {
    render(<SeldonImage src="test-image.jpg" objectFit="cover" />);
    const image = screen.getByRole('img');
    expect(image).toHaveClass(`${px}-seldon-image-img--object-fit-cover`);
  });

  it('renders blur background when hasBlurBackground is true', () => {
    const { container } = render(<SeldonImage src="test-image.jpg" hasBlurBackground />);
    expect(container.querySelector(`.${px}-seldon-image-blur`)).toBeInTheDocument();
  });

  it('applies custom image className and style', () => {
    render(<SeldonImage src="test-image.jpg" imageClassName="custom-class" imageStyle={{ borderRadius: '50%' }} />);
    const image = screen.getByRole('img');
    expect(image).toHaveClass('custom-class');
    expect(image).toHaveStyle({ borderRadius: '50%' });
  });

  it('removes hidden classes on image load', () => {
    const { container } = render(<SeldonImage src="test-image.jpg" />);
    const image = screen.getByRole('img');

    expect(container.firstChild).toHaveClass(`${px}-seldon-image--hidden`);
    expect(image).toHaveClass(`${px}-seldon-image-img--hidden`);

    fireEvent.load(image);

    expect(container.firstChild).not.toHaveClass(`${px}-seldon-image--hidden`);
    expect(image).not.toHaveClass(`${px}-seldon-image-img--hidden`);
  });
});