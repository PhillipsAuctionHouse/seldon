import { FC, cloneElement, isValidElement, useCallback, useState, useRef, useEffect } from 'react';
import { getCommonProps } from '../../utils';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';

import classNames from 'classnames';

export interface PinchZoomProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Function to call when the zoom changes.
   */
  onZoomChange?: (isZoomed: boolean) => void;
  /**
   * Function to call when the user is at the left edge.
   */
  onAtLeftEdge?: (isAtLeftEdge: boolean) => void;
  /**
   * Function to call when the user is at the right edge.
   */
  onAtRightEdge?: (isAtRightEdge: boolean) => void;
  /**
   * Children to render.
   */
  children: React.ReactElement;
  /**
   * max zoom level
   */
  maxZoom?: number;
  /**
   * Force reset the zoom state.
   */
  isZoomReset?: boolean;
}
/**
 * ## Overview
 *
 * Component that allows for zooming and panning of its children.
 *
 * Wraps a subset of the [react-zoom-pan-pinch](https://github.com/BetterTyped/react-zoom-pan-pinch) package.
 *
 * View [storybook](https://bettertyped.github.io/react-zoom-pan-pinch/?path=/story/docs-introduction--page) for docs and examples
 *
 * [Figma Link](https://www.figma.com/design/hxqgsE26wM7hII0WaUaDfF/RW---TIMED-Lot-Details-(PDP)?node-id=1394-3984&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-pinchzoom--overview)
 */
const PinchZoom: FC<PinchZoomProps> = ({
  onZoomChange,
  onAtLeftEdge,
  onAtRightEdge,
  children,
  maxZoom = 10,
  className,
  isZoomReset = false,
  ...props
}) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'PinchZoom');

  const [isZoomed, setIsZoomed] = useState(false);

  const zoomRef = useRef<ReactZoomPanPinchRef>(null);

  useEffect(() => {
    if (isZoomReset) {
      zoomRef.current?.resetTransform();
      setIsZoomed(false);
      onZoomChange?.(false);
    }
  }, [isZoomReset, onZoomChange]);

  const onTransformed = useCallback(
    (zoomRef: ReactZoomPanPinchRef) => {
      const { state, instance } = zoomRef;
      if (state.scale > 0.99 && state.scale < 1.01) {
        setIsZoomed(false);
        onZoomChange?.(false);
      } else {
        setIsZoomed(true);
        onZoomChange?.(true);
      }

      const isAtLeftEdge = Math.abs(state.positionX - (instance.bounds?.maxPositionX ?? 0)) < 0.01;
      const isAtRightEdge = Math.abs(state.positionX - (instance.bounds?.minPositionX ?? 0)) < 0.01;

      onAtLeftEdge?.(isAtLeftEdge);
      onAtRightEdge?.(isAtRightEdge);
    },
    [onZoomChange, onAtLeftEdge, onAtRightEdge],
  );

  return (
    <TransformWrapper
      maxScale={maxZoom}
      onTransformed={onTransformed}
      minScale={1}
      disablePadding
      doubleClick={{
        mode: isZoomed ? 'reset' : 'toggle',
      }}
      wheel={{
        smoothStep: 0.01,
      }}
      panning={{
        disabled: !isZoomed,
      }}
      ref={zoomRef}
    >
      <TransformComponent
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        wrapperProps={{ ...commonProps, ...props }}
        wrapperClass={classNames(baseClassName, className, {
          [`${baseClassName}-zoomed`]: isZoomed,
        })}
        contentClass={`${baseClassName}-content`}
      >
        {isValidElement<{ className: string }>(children)
          ? cloneElement(children, { className: classNames(`${baseClassName}-child`, children?.props?.className) })
          : children}
      </TransformComponent>
    </TransformWrapper>
  );
};

PinchZoom.displayName = 'PinchZoom';

export default PinchZoom;
