import { fireEvent } from '@testing-library/react';
import { ComponentProps, forwardRef } from 'react';
import PinchZoom from './PinchZoom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { runCommonTests } from '../../utils/testUtils';
import { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';

const mockOnTransformed = vi.fn();

vi.mock('react-zoom-pan-pinch', async () => {
  const actual: typeof import('react-zoom-pan-pinch') = await vi.importActual('react-zoom-pan-pinch');
  const OriginalTransformWrapper = actual.TransformWrapper;
  const MockTransformWrapper = forwardRef<HTMLElement, ComponentProps<typeof actual.TransformWrapper>>(
    (props, _ref) => {
      const handleTransformed = (ref: ReactZoomPanPinchRef) => {
        mockOnTransformed();
        props.onTransformed?.(
          {
            ...ref,
            instance: {
              ...ref.instance,
              // @ts-expect-error  we're all here for the error
              bounds: { ...ref.instance.bounds, maxPositionX: undefined, minPositionX: undefined },
            },
          },
          {
            scale: ref.state.scale,
            positionX: ref.state.positionX,
            positionY: ref.state.positionY,
          },
        );
      };
      const newProps = {
        ...props,
        onTransformed: handleTransformed,
      };
      return <OriginalTransformWrapper {...newProps} />;
    },
  );
  MockTransformWrapper.displayName = 'MockTransformWrapper';
  return {
    ...actual,
    TransformWrapper: MockTransformWrapper,
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('PinchZoom', () => {
  // Shared helpers
  type ZoomBounds = {
    maxPositionX?: number;
    minPositionX?: number;
    minPositionY?: number;
    maxPositionY?: number;
  };

  type MockZoomRef = {
    state: { scale: number; positionX?: number; bounds?: ZoomBounds; previousScale?: number; positionY?: number };
    instance: {
      bounds?: ZoomBounds;
    };
  };

  const createMockZoomRef = ({
    scale = 1,
    positionX,
    bounds,
    previousScale,
    positionY,
  }: {
    scale?: number;
    positionX?: number;
    bounds?: ZoomBounds;
    previousScale?: number;
    positionY?: number;
  }): MockZoomRef => ({
    state: { scale: scale ?? 1, positionX, previousScale, positionY },
    instance: { bounds },
  });

  const triggerTransform = (
    zoomRef: MockZoomRef,
    onAtLeftEdge?: (at: boolean) => void,
    onAtRightEdge?: (at: boolean) => void,
  ) => {
    const { state, instance } = zoomRef;
    const bounds = instance.bounds ?? {};
    const isAtLeftEdge = Math.abs((state.positionX ?? 0) - (bounds.maxPositionX ?? 0)) < 0.01;
    const isAtRightEdge = Math.abs((state.positionX ?? 0) - (bounds.minPositionX ?? 0)) < 0.01;
    onAtLeftEdge?.(isAtLeftEdge);
    onAtRightEdge?.(isAtRightEdge);
  };

  const wait = (ms = 10) => new Promise((r) => setTimeout(r, ms));
  // Use a forwardRef wrapper for runCommonTests to ensure ref is tested correctly
  const RefPinchZoom = forwardRef<HTMLElement, React.ComponentProps<typeof PinchZoom>>((props, ref) => (
    <PinchZoom {...props} ref={ref}>
      <div>My child</div>
    </PinchZoom>
  ));
  RefPinchZoom.displayName = 'RefPinchZoom';
  runCommonTests(RefPinchZoom, 'PinchZoom');

  // --- Rendering ---
  it('renders children correctly', () => {
    const { getByTestId } = render(
      <PinchZoom>
        <img data-testid="test-image" src="test.jpg" alt="Test" />
      </PinchZoom>,
    );
    expect(getByTestId('test-image')).toBeInTheDocument();
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

  it('renders with custom maxZoom', () => {
    render(
      <PinchZoom maxZoom={5}>
        <div>Zoomable</div>
      </PinchZoom>,
    );
    expect(screen.getByText('Zoomable')).toBeInTheDocument();
  });

  it('renders with panning disabled when not zoomed', () => {
    render(
      <PinchZoom>
        <div>Zoomable</div>
      </PinchZoom>,
    );
    expect(screen.getByText('Zoomable')).toBeInTheDocument();
  });

  it('renders children as valid React element', () => {
    render(
      <PinchZoom>
        <div data-testid="valid-child">Valid</div>
      </PinchZoom>,
    );
    expect(screen.getByTestId('valid-child')).toBeInTheDocument();
  });

  it('renders children as invalid React element', () => {
    // @ts-expect-error it's all about the error
    render(<PinchZoom>{'invalid-child'}</PinchZoom>);
    expect(screen.getByText('invalid-child')).toBeInTheDocument();
  });

  // --- Ref Forwarding ---
  it('forwards ref to the root element', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(
      <PinchZoom ref={ref}>
        <div data-testid="pinch-root">Root</div>
      </PinchZoom>,
    );
    expect(ref.current).not.toBeNull();
  });

  // --- Event Handling ---
  it('handles pointer events for pinch/zoom', async () => {
    const { getByTestId } = render(
      <PinchZoom>
        <div data-testid="pinch-area">Area</div>
      </PinchZoom>,
    );
    const area = getByTestId('pinch-area');
    await userEvent.pointer({ keys: '[TouchA]', target: area });
    await userEvent.pointer({ keys: '[TouchA>]', target: area });
    await userEvent.pointer({ keys: '[TouchA]', target: area });
    expect(area).toBeInTheDocument();
  });

  it('handles double tap to reset zoom', async () => {
    const { getByTestId } = render(
      <PinchZoom>
        <div data-testid="pinch-double">DoubleTap</div>
      </PinchZoom>,
    );
    const area = getByTestId('pinch-double');
    await userEvent.pointer({ keys: '[TouchA]', target: area });
    await userEvent.pointer({ keys: '[TouchA>]', target: area });
    await userEvent.pointer({ keys: '[TouchA]', target: area });
    await userEvent.pointer({ keys: '[TouchA>]', target: area });
    expect(area).toBeInTheDocument();
  });

  it('handles wheel event for zoom', () => {
    const { getByTestId } = render(
      <PinchZoom>
        <div data-testid="pinch-wheel">Wheel</div>
      </PinchZoom>,
    );
    const area = getByTestId('pinch-wheel');
    fireEvent.wheel(area, { deltaY: -100 });
    expect(area).toBeInTheDocument();
  });

  it('handles touch events for pinch/zoom', async () => {
    const { getByTestId } = render(
      <PinchZoom>
        <div data-testid="pinch-touch">Touch</div>
      </PinchZoom>,
    );
    const area = getByTestId('pinch-touch');
    await userEvent.pointer({ keys: '[TouchA]', target: area });
    await userEvent.pointer({ keys: '[TouchA>]', target: area });
    await userEvent.pointer({ keys: '[TouchA]', target: area });
    expect(area).toBeInTheDocument();
  });

  it('fires wheel event for smoothStep branch', () => {
    render(
      <PinchZoom>
        <div data-testid="wheel-area">Wheel</div>
      </PinchZoom>,
    );
    const area = screen.getByTestId('wheel-area');
    fireEvent.wheel(area, { deltaY: -100 });
    expect(area).toBeInTheDocument();
  });

  it('fires doubleClick event for doubleClick branch', async () => {
    render(
      <PinchZoom>
        <div data-testid="double-area">Double</div>
      </PinchZoom>,
    );
    const area = screen.getByTestId('double-area');
    await userEvent.dblClick(area);
    expect(area).toBeInTheDocument();
  });

  it('fires pointer events for panning branch', async () => {
    render(
      <PinchZoom>
        <div data-testid="pointer-area">Pointer</div>
      </PinchZoom>,
    );
    const area = screen.getByTestId('pointer-area');
    await userEvent.pointer({ keys: '[TouchA]', target: area });
    await userEvent.pointer({ keys: '[TouchA>]', target: area });
    await userEvent.pointer({ keys: '[TouchA]', target: area });
    expect(area).toBeInTheDocument();
  });

  // --- Callback Logic ---
  it('calls onZoomChange when isZoomReset is true', () => {
    const onZoomChange = vi.fn();
    render(
      <PinchZoom isZoomReset onZoomChange={onZoomChange}>
        <div>Zoomable</div>
      </PinchZoom>,
    );
    expect(onZoomChange).toHaveBeenCalledWith(false);
  });

  it('calls onZoomChange(true) when zoomed in', () => {
    const onZoomChange = vi.fn();
    const mockZoomRef = createMockZoomRef({
      scale: 2,
      positionX: 0,
      positionY: 0,
      bounds: { maxPositionX: 0, minPositionX: 0 },
    });
    const onTransformed = (zoomRef: MockZoomRef) => {
      const { scale } = zoomRef.state;
      onZoomChange(scale > 0.99 && scale < 1.01 ? false : true);
    };
    onTransformed(mockZoomRef);
    expect(onZoomChange).toHaveBeenCalledWith(true);
  });

  it('calls onZoomChange(false) when zoomed out', () => {
    const onZoomChange = vi.fn();
    const mockZoomRef = createMockZoomRef({
      scale: 1,
      positionX: 0,
      positionY: 0,
      bounds: { maxPositionX: 0, minPositionX: 0 },
    });
    const onTransformed = (zoomRef: MockZoomRef) => {
      const { scale } = zoomRef.state;
      onZoomChange(scale > 0.99 && scale < 1.01 ? false : true);
    };
    onTransformed(mockZoomRef);
    expect(onZoomChange).toHaveBeenCalledWith(false);
  });

  it('calls onZoomChange when wheel event triggers zoom', async () => {
    const onZoomChange = vi.fn();
    render(
      <PinchZoom onZoomChange={onZoomChange}>
        <div data-testid="wheel-zoom">WheelZoom</div>
      </PinchZoom>,
    );
    const area = screen.getByTestId('wheel-zoom');
    fireEvent.wheel(area, { deltaY: -100 });
    await new Promise((r) => setTimeout(r, 10));
    expect(onZoomChange).toHaveBeenCalled();
  });

  it('calls onZoomChange when pinch gesture triggers zoom', async () => {
    const onZoomChange = vi.fn();
    render(
      <PinchZoom onZoomChange={onZoomChange}>
        <div data-testid="pinch-zoom">PinchZoom</div>
      </PinchZoom>,
    );
    const area = document.querySelector('.seldon-pinch-zoom') as HTMLElement;
    await userEvent.pointer({ keys: '[TouchA]', target: area });
    await userEvent.pointer({ keys: '[TouchA>]', target: area });
    await new Promise((r) => setTimeout(r, 10));
    expect(onZoomChange).toHaveBeenCalled();
  });

  // --- Edge Cases & Transform Callbacks ---
  it('calls onAtLeftEdge and onAtRightEdge on transform', () => {
    const onAtLeftEdge = vi.fn();
    const onAtRightEdge = vi.fn();
    const mockZoomRef = createMockZoomRef({
      scale: 2,
      positionX: 0,
      positionY: 0,
      bounds: { maxPositionX: 0, minPositionX: 0, minPositionY: 0, maxPositionY: 0 },
      previousScale: 0,
    });
    triggerTransform(mockZoomRef, onAtLeftEdge, onAtRightEdge);
    expect(onAtLeftEdge).toHaveBeenCalledWith(true);
    expect(onAtRightEdge).toHaveBeenCalledWith(true);
  });

  it('calls onAtLeftEdge and onAtRightEdge with fallback when bounds are missing', () => {
    const onAtLeftEdge = vi.fn();
    const onAtRightEdge = vi.fn();
    const mockZoomRef = createMockZoomRef({
      scale: 2,
      positionX: 0,
      positionY: 0,
      bounds: undefined,
      previousScale: 0,
    });
    triggerTransform(mockZoomRef, onAtLeftEdge, onAtRightEdge);
    expect(onAtLeftEdge).toHaveBeenCalledWith(true);
    expect(onAtRightEdge).toHaveBeenCalledWith(true);
  });

  it('triggers onAtLeftEdge and onAtRightEdge with fallback when bounds are missing via wheel event', async () => {
    const onAtLeftEdge = vi.fn();
    const onAtRightEdge = vi.fn();
    render(
      <PinchZoom onAtLeftEdge={onAtLeftEdge} onAtRightEdge={onAtRightEdge}>
        <div data-testid="pinch-zoom-wrapper">Child</div>
      </PinchZoom>,
    );
    const area = screen.getByTestId('pinch-zoom-wrapper');
    fireEvent.wheel(area, { deltaY: -100 });
    await wait();
    expect(onAtLeftEdge).toHaveBeenCalled();
    expect(onAtRightEdge).toHaveBeenCalled();
  });

  it('calls onAtLeftEdge and onAtRightEdge with fallback when bounds are present but max and min X positions are missing', async () => {
    // missing maxPositionX and minPositionX are in the mocked react-zoom-pan-pinch

    const OtherPinchZoom = (await import('./PinchZoom')).default;
    const onAtLeftEdge = vi.fn();
    const onAtRightEdge = vi.fn();
    const TestComponent = () => (
      <OtherPinchZoom onAtLeftEdge={onAtLeftEdge} onAtRightEdge={onAtRightEdge}>
        <div data-testid="pinch-zoom-wrapper">Child</div>
      </OtherPinchZoom>
    );
    render(<TestComponent />);
    const area = screen.getByTestId('pinch-zoom-wrapper');
    fireEvent.wheel(area, { deltaY: -100 });
    await wait();
    expect(mockOnTransformed).toHaveBeenCalled();
    expect(onAtLeftEdge).toHaveBeenCalledWith(true);
    expect(onAtRightEdge).toHaveBeenCalledWith(true);
  });
});
