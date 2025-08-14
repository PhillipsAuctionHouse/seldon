import { forwardRef } from 'react';
import PinchZoom from './PinchZoom';
import { render } from '@testing-library/react';
import { runCommonTests } from '../../utils/testUtils';

describe('PinchZoom', () => {
  // Use a forwardRef wrapper for runCommonTests to ensure ref is tested correctly
  const RefPinchZoom = forwardRef<HTMLElement, React.ComponentProps<typeof PinchZoom>>((props, ref) => (
    <PinchZoom {...props} ref={ref}>
      <div>My child</div>
    </PinchZoom>
  ));
  RefPinchZoom.displayName = 'RefPinchZoom';
  runCommonTests(RefPinchZoom, 'PinchZoom');

  it('renders children correctly', () => {
    const { getByTestId } = render(
      <PinchZoom>
        <img data-testid="test-image" src="test.jpg" alt="Test" />
      </PinchZoom>,
    );
    expect(getByTestId('test-image')).toBeInTheDocument();
  });
});
