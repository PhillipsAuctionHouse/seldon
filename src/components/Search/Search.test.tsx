import { render, fireEvent } from '@testing-library/react';
import Search from './Search';
import { px } from '../../utils';

describe('Search component', () => {
  it('should toggle overlay when button is clicked', () => {
    const { getByTestId } = render(<Search />);
    const button = getByTestId('search-button');
    const overlay = getByTestId('search-overlay');

    expect(overlay).not.toHaveClass(`${px}-search__overlay--active`);

    fireEvent.click(button);

    expect(overlay).toHaveClass(`${px}-search__overlay--active`);

    fireEvent.click(button);

    expect(overlay).not.toHaveClass(`${px}-search__overlay--active`);
  });
});
