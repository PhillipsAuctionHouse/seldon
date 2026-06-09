import { render, screen } from '@testing-library/react';
import { runCommonTests } from '../../utils/testUtils';
import ExitGateCard from './ExitGateCard';

describe('ExitGateCard', () => {
  runCommonTests(ExitGateCard, 'ExitGateCard');

  it('renders correctly with all props', () => {
    render(
      <ExitGateCard
        imageSrc="test-image.jpg"
        label="Test Label"
        header="Test Header"
        description="Test Description"
        linkLabel="Test Link"
        linkHref="https://example.com"
        altText="bull"
      />,
    );

    expect(screen.getByAltText('bull')).toHaveAttribute('src', 'test-image.jpg');
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Test Header')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Test Link' })).toHaveAttribute('href', 'https://example.com');
  });

  it('forwards responsive image props to SeldonImage', () => {
    render(
    render(
      <ExitGateCard
        imageSrc="delivery.jpg"
        imageSrcSet="thumb.jpg 400w, delivery.jpg 1302w"
        imageSizes="(min-width: 768px) 50vw, 100vw"
        imageLoading="lazy"
        imageFetchPriority="high"
        altText="Promo artwork"
      />,
    );

    const image = screen.getByAltText('Promo artwork');
    expect(image).toHaveAttribute('src', 'delivery.jpg');
    expect(image).toHaveAttribute('srcset', 'thumb.jpg 400w, delivery.jpg 1302w');
    expect(image).toHaveAttribute('sizes', '(min-width: 768px) 50vw, 100vw');
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('fetchpriority', 'high');
  });

  it('renders correctly without optional props', () => {
    render(<ExitGateCard header="Test Header" />);

    expect(screen.queryByAltText('bull')).toBeNull();
    expect(screen.queryByText('Test Label')).toBeNull();
    expect(screen.getByText('Test Header')).toBeInTheDocument();
    expect(screen.queryByText('Test Description')).toBeNull();
    expect(screen.queryByText('Test Link')).toBeNull();
  });
});
