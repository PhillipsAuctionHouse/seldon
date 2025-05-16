import Pictogram from './Pictogram';
import { render } from '@testing-library/react';

describe('Pictogram', () => {
  it('should render a pictogram using the Icon component', () => {
    const pictogramName = 'Form';
    const size = '64';
    const color = '$primary-black';

    const { getByTestId } = render(<Pictogram pictogram={pictogramName} size={size} color={color} />);
    const pictogram = getByTestId('icon-form');
    expect(pictogram).toBeInTheDocument();
  });
});
