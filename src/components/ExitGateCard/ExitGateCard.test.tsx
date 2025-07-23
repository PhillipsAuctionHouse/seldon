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

  it('renders correctly without optional props', () => {
    render(<ExitGateCard header="Test Header" />);

    expect(screen.queryByAltText('bull')).toBeNull();
    expect(screen.queryByText('Test Label')).toBeNull();
    expect(screen.getByText('Test Header')).toBeInTheDocument();
    expect(screen.queryByText('Test Description')).toBeNull();
    expect(screen.queryByText('Test Link')).toBeNull();
  });
});
