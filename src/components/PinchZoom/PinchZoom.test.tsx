import { forwardRef, type MutableRefObject, type ReactNode, type Ref } from 'react';
import PinchZoom from './PinchZoom';
import { act, render, screen } from '@testing-library/react';
import { runCommonTests } from '../../utils/testUtils';
import type { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';

let capturedOnTransformed: ((ref: ReactZoomPanPinchRef) => void) | null = null;
const mockResetTransform = vi.fn();

const mockZoomRef: ReactZoomPanPinchRef = {
  resetTransform: mockResetTransform,
  instance: {} as ReactZoomPanPinchRef['instance'],
  state: {} as ReactZoomPanPinchRef['state'],
  zoomIn: vi.fn(),
  zoomOut: vi.fn(),
  setTransform: vi.fn(),
  centerView: vi.fn(),
  zoomToElement: vi.fn(),
};

vi.mock('react-zoom-pan-pinch', () => {
  const TransformWrapper = forwardRef(
    (
      {
        children,
        onTransformed,
      }: {
        children: ReactNode;
        onTransformed?: (ref: ReactZoomPanPinchRef) => void;
      },
      ref: Ref<ReactZoomPanPinchRef> | null,
    ) => {
      capturedOnTransformed = onTransformed ?? null;
      if (ref && typeof ref === 'object' && 'current' in ref) {
        (ref as MutableRefObject<ReactZoomPanPinchRef | null>).current = mockZoomRef;
      }
      return <div data-testid="transform-wrapper">{children}</div>;
    },
  );
  TransformWrapper.displayName = 'TransformWrapper';
  return {
    TransformWrapper,
    TransformComponent: ({
      children,
      wrapperProps = {},
      wrapperClass,
    }: {
      children: ReactNode;
      wrapperProps?: Record<string, unknown>;
      wrapperClass?: string;
    }) => (
      <div {...wrapperProps} className={wrapperClass}>
        {children}
      </div>
    ),
  };
});

describe('PinchZoom', () => {
  beforeEach(() => {
    capturedOnTransformed = null;
    mockResetTransform.mockClear();
  });

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

  it('when onTransformed is called with scale near 1, calls onZoomChange(false)', () => {
    const onZoomChange = vi.fn();
    render(
      <PinchZoom onZoomChange={onZoomChange}>
        <div>Content</div>
      </PinchZoom>,
    );
    expect(capturedOnTransformed).not.toBeNull();
    act(() => {
      capturedOnTransformed!({
        state: { scale: 1, positionX: 0, positionY: 0 },
        instance: { bounds: { minPositionX: 0, maxPositionX: 0 } },
      } as ReactZoomPanPinchRef);
    });
    expect(onZoomChange).toHaveBeenCalledWith(false);
  });

  it('when onTransformed is called with scale > 1, calls onZoomChange(true)', () => {
    const onZoomChange = vi.fn();
    render(
      <PinchZoom onZoomChange={onZoomChange}>
        <div>Content</div>
      </PinchZoom>,
    );
    act(() => {
      capturedOnTransformed!({
        state: { scale: 2, positionX: 0, positionY: 0 },
        instance: { bounds: { minPositionX: 0, maxPositionX: 0 } },
      } as ReactZoomPanPinchRef);
    });
    expect(onZoomChange).toHaveBeenCalledWith(true);
  });

  it('calls onAtLeftEdge and onAtRightEdge when position matches bounds', () => {
    const onAtLeftEdge = vi.fn();
    const onAtRightEdge = vi.fn();
    render(
      <PinchZoom onAtLeftEdge={onAtLeftEdge} onAtRightEdge={onAtRightEdge}>
        <div>Content</div>
      </PinchZoom>,
    );
    const maxX = 100;
    const minX = -50;
    act(() => {
      capturedOnTransformed!({
        state: { scale: 1.5, positionX: maxX, positionY: 0 },
        instance: { bounds: { minPositionX: minX, maxPositionX: maxX } },
      } as ReactZoomPanPinchRef);
    });
    expect(onAtLeftEdge).toHaveBeenCalledWith(true);
    expect(onAtRightEdge).toHaveBeenCalledWith(false);

    onAtLeftEdge.mockClear();
    onAtRightEdge.mockClear();
    act(() => {
      capturedOnTransformed!({
        state: { scale: 1.5, positionX: minX, positionY: 0 },
        instance: { bounds: { minPositionX: minX, maxPositionX: maxX } },
      } as ReactZoomPanPinchRef);
    });
    expect(onAtLeftEdge).toHaveBeenCalledWith(false);
    expect(onAtRightEdge).toHaveBeenCalledWith(true);
  });

  it('uses 0 for bounds when instance.bounds is undefined', () => {
    const onAtLeftEdge = vi.fn();
    const onAtRightEdge = vi.fn();
    render(
      <PinchZoom onAtLeftEdge={onAtLeftEdge} onAtRightEdge={onAtRightEdge}>
        <div>Content</div>
      </PinchZoom>,
    );
    act(() => {
      capturedOnTransformed!({
        state: { scale: 1, positionX: 0, positionY: 0 },
        instance: { bounds: undefined },
      } as unknown as ReactZoomPanPinchRef);
    });
    expect(onAtLeftEdge).toHaveBeenCalledWith(true);
    expect(onAtRightEdge).toHaveBeenCalledWith(true);
  });

  it('when isZoomReset is true, resets transform and calls onZoomChange(false)', () => {
    const onZoomChange = vi.fn();
    render(
      <PinchZoom isZoomReset={true} onZoomChange={onZoomChange}>
        <div>Content</div>
      </PinchZoom>,
    );
    expect(mockResetTransform).toHaveBeenCalled();
    expect(onZoomChange).toHaveBeenCalledWith(false);
  });

  it('renders non-element children without cloning', () => {
    render(
      <PinchZoom>
        <div>plain text child</div>
      </PinchZoom>,
    );
    expect(screen.getByText('plain text child')).toBeInTheDocument();
  });
});
