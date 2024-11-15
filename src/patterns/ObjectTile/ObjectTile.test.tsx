import { render, screen } from '@testing-library/react';
import ObjectTile from './ObjectTile';
import { runCommonTests } from '../../utils/testUtils';

describe('ObjectTile', () => {
  runCommonTests(ObjectTile, 'ObjectTile');

  it('renders the image with the correct src and alt text', () => {
    render(<ObjectTile imageUrl="https://via.placeholder.com/150" lotNumber="123" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://via.placeholder.com/150');
    expect(img).toHaveAttribute('alt', 'image for lot number 123');
  });

  it('renders the lot number', () => {
    render(<ObjectTile imageUrl="https://via.placeholder.com/150" lotNumber="123" />);
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('renders the badge text when provided', () => {
    render(<ObjectTile imageUrl="https://via.placeholder.com/150" lotNumber="123" badgeText="New" />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders the withdrawn text when provided', () => {
    render(<ObjectTile imageUrl="https://via.placeholder.com/150" lotNumber="123" withdrawnText="Withdrawn" />);
    expect(screen.getByText('Withdrawn')).toBeInTheDocument();
  });

  it('renders the maker text when provided', () => {
    render(<ObjectTile imageUrl="https://via.placeholder.com/150" lotNumber="123" makerText="Maker Name" />);
    expect(screen.getByText('Maker Name')).toBeInTheDocument();
  });

  it('renders the title text when provided', () => {
    render(<ObjectTile imageUrl="https://via.placeholder.com/150" lotNumber="123" titleText="Title" />);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('renders the reference number when provided', () => {
    render(<ObjectTile imageUrl="https://via.placeholder.com/150" lotNumber="123" referenceNumber="Ref123" />);
    expect(screen.getByText('Ref123')).toBeInTheDocument();
  });

  it('renders the model text when provided', () => {
    render(<ObjectTile imageUrl="https://via.placeholder.com/150" lotNumber="123" modelText="Model123" />);
    expect(screen.getByText('Model123')).toBeInTheDocument();
  });

  it('renders the estimate and estimate label text when provided', () => {
    render(
      <ObjectTile
        imageUrl="https://via.placeholder.com/150"
        lotNumber="123"
        estimate="1000-2000"
        estimateLabelText="Estimate"
      />,
    );
    expect(screen.getByText('Estimate')).toBeInTheDocument();
    expect(screen.getByText('1000-2000')).toBeInTheDocument();
  });

  it('renders the PhillipsLogo SVG when no imageUrl is provided', () => {
    const { rerender } = render(<ObjectTile lotNumber="123" />);
    const svg = screen.getByTestId('header-logo-svg');
    expect(svg).toBeInTheDocument();
    rerender(<ObjectTile imageUrl="https://via.placeholder.com/150" lotNumber="123" />);
    expect(screen.queryByTestId('header-logo-svg')).not.toBeInTheDocument();
  });
});
