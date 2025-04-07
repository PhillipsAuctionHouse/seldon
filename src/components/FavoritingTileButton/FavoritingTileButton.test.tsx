import FavoritingTileButton from './FavoritingTileButton';
import { runCommonTests } from '../../utils/testUtils';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('FavoritingTileButton', () => {
  runCommonTests(FavoritingTileButton, 'FavoritingTileButton');
  it('renders with required props', () => {
    const { getByRole } = render(<FavoritingTileButton isLotInList={false} listTitle="My List" numberOfObjects="5" />);
    expect(getByRole('switch')).toBeInTheDocument();
  });

  it('displays add text when isLotInList is false', () => {
    const { getByText } = render(<FavoritingTileButton isLotInList={false} listTitle="My List" numberOfObjects="5" />);
    expect(getByText('Add to')).toBeInTheDocument();
  });

  it('displays remove text when isLotInList is true', () => {
    const { getByText } = render(<FavoritingTileButton isLotInList={true} listTitle="My List" numberOfObjects="5" />);
    expect(getByText('Remove from')).toBeInTheDocument();
  });

  it('displays custom action texts', () => {
    const { getByText } = render(
      <FavoritingTileButton
        actionAddText="Custom Add"
        actionRemoveText="Custom Remove"
        isLotInList={false}
        listTitle="My List"
        numberOfObjects="5"
      />,
    );
    expect(getByText('Custom Add')).toBeInTheDocument();
  });

  it('calls onClick handler', async () => {
    const handleClick = vi.fn();
    const { getByRole } = render(
      <FavoritingTileButton isLotInList={false} listTitle="My List" numberOfObjects="5" onClick={handleClick} />,
    );
    await userEvent.click(getByRole('switch'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies lot-in-list class when isLotInList is true', () => {
    const { container } = render(<FavoritingTileButton isLotInList={true} listTitle="My List" numberOfObjects="5" />);
    expect(container.firstChild).toHaveClass('seldon-favoriting-tile-button--lot-in-list');
  });
});
