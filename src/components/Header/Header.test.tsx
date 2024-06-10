import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  //TODO: Fix this test
  // it('should render the header component with default props', () => {
  //   render(<Header />);
  //   const toggleButton = screen.getByRole('button', { name: /Open Menu/i });
  //   const logo = screen.getByAltText(/Logo/i);
  //   const nav = screen.getByTestId('header-nav');
  //   const search = screen.getByTestId('header-search');

  //   expect(toggleButton).toBeInTheDocument();
  //   expect(logo).toBeInTheDocument();
  //   expect(nav).toBeInTheDocument();
  //   expect(search).toBeInTheDocument();
  // });

  it('should toggle the menu when the toggle button is clicked', () => {
    render(<Header />);
    const toggleButton = screen.getByRole('button', { name: /Open Menu/i });

    fireEvent.click(toggleButton);

    expect(toggleButton).toHaveTextContent(/Close Menu/i);

    fireEvent.click(toggleButton);

    expect(toggleButton).toHaveTextContent(/Open Menu/i);
  });

  //TODO: Fix this test
  // it('should expand and collapse the mobile menu when a menu item is selected', () => {
  //   render(<Header />);
  //   const menuItem = screen.getByText(/Menu Item/i);

  //   fireEvent.click(menuItem);

  //   expect(menuItem).toHaveClass('active');

  //   fireEvent.click(menuItem);

  //   expect(menuItem).not.toHaveClass('active');
  // });

  //TODO: Fix this test
  // it('should collapse the mobile menu when focus is lost', () => {
  //   render(<Header />);
  //   const toggleButton = screen.getByRole('button', { name: /Open Menu/i });
  //   const menuItem = screen.getByText(/Menu Item/i);

  //   fireEvent.click(toggleButton);
  //   fireEvent.focusOut(menuItem);

  //   expect(menuItem).not.toHaveClass('active');
  // });
});
