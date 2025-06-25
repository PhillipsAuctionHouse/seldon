import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import SaleCard from './SaleCard';

describe('SaleCard', () => {
  const props = {
    imageSrc: 'https://example.com/image.jpg',
    auctionType: 'Live Auction',
    titleText: 'Modern & Contemporary Art Day Sale, Morning Session',
    date: '18 Aug',
    location: 'New York',
  };

  it('should render the SaleCard component', () => {
    const { getByText } = render(<SaleCard {...props} />);
    expect(getByText('Live Auction')).toBeInTheDocument();
    expect(getByText('Modern & Contemporary Art Day Sale, Morning Session')).toBeInTheDocument();
    expect(getByText('18 Aug')).toBeInTheDocument();
    expect(getByText('New York')).toBeInTheDocument();
  });

  it('should allow custom image alt text', () => {
    const { getByAltText } = render(<SaleCard {...props} imageAlt="Custom Alt Text" />);
    expect(getByAltText('Custom Alt Text')).toBeInTheDocument();
  });

  it('should render primary button', () => {
    const primaryButtonOnClick = vi.fn();
    const { getByText } = render(
      <SaleCard {...props} primaryButtonText="Bid Now" primaryButtonOnClick={primaryButtonOnClick} />,
    );
    const button = getByText('Bid Now');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(primaryButtonOnClick).toHaveBeenCalledTimes(1);
  });

  it('should render secondary button', () => {
    const secondaryButtonOnClick = vi.fn();
    const { getByText } = render(
      <SaleCard {...props} secondaryButtonText="Register to Bid" secondaryButtonOnClick={secondaryButtonOnClick} />,
    );
    const button = getByText('Register to Bid');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(secondaryButtonOnClick).toHaveBeenCalledTimes(1);
  });

  it('should render modal link', () => {
    const modalButtonOnClick = vi.fn();
    const { getByText } = render(
      <SaleCard {...props} modalButtonText="View Details" modalButtonOnClick={modalButtonOnClick} />,
    );
    const link = getByText('View Details');
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    expect(modalButtonOnClick).toHaveBeenCalledTimes(1);
  });

  it('should render PDF link', () => {
    const { getByText } = render(
      <SaleCard {...props} pdfLinkText="Download PDF" pdfLinkUrl="https://example.com/pdf" />,
    );
    const link = getByText('Download PDF');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', 'https://example.com/pdf');
  });
});
