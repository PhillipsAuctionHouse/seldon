import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';
import { px } from '../../utils';

describe('Search component', () => {
  it('should toggle overlay when button is clicked', async () => {
    const { getByTestId } = render(<Search />);
    const button = getByTestId('search-button');
    const overlay = getByTestId('search-overlay');

    expect(overlay).not.toHaveClass(`${px}-search__overlay--active`);

    await userEvent.click(button);

    expect(overlay).toHaveClass(`${px}-search__overlay--active`);

    await userEvent.click(button);

    expect(overlay).not.toHaveClass(`${px}-search__overlay--active`);
  });

  it('should render search button with icon when useIcon is true', () => {
    const { getByTestId } = render(<Search useIcon={true} />);
    const button = getByTestId('search-button');
    const icon = getByTestId('search-button-icon');

    expect(button).toContainElement(icon);
  });

  it('should render search button without icon when useIcon is false', () => {
    const { getByTestId, queryByTestId } = render(<Search useIcon={false} />);
    const button = getByTestId('search-button');
    const icon = queryByTestId('search-button-icon');

    expect(button).not.toContainElement(icon);
  });

  it('should render search input with icon when useIcon is true', () => {
    const { getByTestId } = render(<Search useIcon={true} />);
    const input = getByTestId('search-form');
    const icon = getByTestId('search-form-icon');

    expect(input).toContainElement(icon);
  });

  it('should render search input without icon when useIcon is false', () => {
    const { getByTestId, queryByTestId } = render(<Search useIcon={false} />);
    const input = getByTestId('search-form');
    const icon = queryByTestId('search-form-icon');

    expect(input).not.toContainElement(icon);
  });
});
