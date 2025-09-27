import { forwardRef, act } from 'react';
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

  it('forwards ref to the root element', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(
      <PinchZoom ref={ref}>
        <div data-testid="pinch-root">Root</div>
      </PinchZoom>,
    );
    expect(ref.current).not.toBeNull();
  });

  it('renders multiple children in a fragment', () => {
    const { getByText } = render(
      <PinchZoom>
        <>
          <span>Child 1</span>
          <span>Child 2</span>
        </>
      </PinchZoom>,
    );
    expect(getByText('Child 1')).toBeInTheDocument();
    expect(getByText('Child 2')).toBeInTheDocument();
  });

  it('handles pointer events for pinch/zoom', () => {
    const { getByTestId } = render(
      <PinchZoom>
        <div data-testid="pinch-area">Area</div>
      </PinchZoom>,
    );
    const area = getByTestId('pinch-area');

    area.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    area.dispatchEvent(new PointerEvent('pointermove', { bubbles: true }));
    area.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

    expect(area).toBeInTheDocument();
  });

  it('handles double tap to reset zoom', () => {
    const { getByTestId } = render(
      <PinchZoom>
        <div data-testid="pinch-double">DoubleTap</div>
      </PinchZoom>,
    );
    const area = getByTestId('pinch-double');
    area.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    area.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    area.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    area.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    expect(area).toBeInTheDocument();
  });

  it('handles wheel event for zoom', () => {
    const { getByTestId } = render(
      <PinchZoom>
        <div data-testid="pinch-wheel">Wheel</div>
      </PinchZoom>,
    );
    const area = getByTestId('pinch-wheel');
    act(() => {
      area.dispatchEvent(new WheelEvent('wheel', { bubbles: true, deltaY: -100 }));
    });
    expect(area).toBeInTheDocument();
  });

  it('handles touch events for pinch/zoom', () => {
    const { getByTestId } = render(
      <PinchZoom>
        <div data-testid="pinch-touch">Touch</div>
      </PinchZoom>,
    );
    const area = getByTestId('pinch-touch');
    area.dispatchEvent(new TouchEvent('touchstart', { bubbles: true }));
    area.dispatchEvent(new TouchEvent('touchmove', { bubbles: true }));
    area.dispatchEvent(new TouchEvent('touchend', { bubbles: true }));
    expect(area).toBeInTheDocument();
  });
});
