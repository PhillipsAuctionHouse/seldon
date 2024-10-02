import PinchZoom from './PinchZoom';
import { render } from '@testing-library/react';
import { runCommonTests } from '../../utils/testUtils';

describe('PinchZoom', () => {
  runCommonTests(PinchZoom, 'PinchZoom');
  it('renders children correctly', () => {
    const { getByTestId } = render(
      <PinchZoom>
        <img data-testid="test-image" src="test.jpg" alt="Test" />
      </PinchZoom>,
    );
    expect(getByTestId('test-image')).toBeInTheDocument();
  });
});
