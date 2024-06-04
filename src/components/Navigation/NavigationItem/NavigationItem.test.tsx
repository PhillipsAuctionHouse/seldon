import { render, screen } from '@testing-library/react';
import NavigationItem from './NavigationItem';

describe('NavigationItem', () => {
  it('renders the navigation item correctly', () => {
    render(<NavigationItem href="/" label="Home" />);

    const navigationItem = screen.getByText('Home');
    expect(navigationItem).toBeInTheDocument();
  });
});
