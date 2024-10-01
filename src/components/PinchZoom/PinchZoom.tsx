import { FC, cloneElement, useCallback, useRef, useState } from 'react';
import { getCommonProps } from '../../utils';
import PinchZoomLib, { make3dTransformValue } from 'react-quick-pinch-zoom';
import classNames from 'classnames';

export interface PinchZoomProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Function to call when the zoom changes.
   */
  onZoomChange?: (isZoomed: boolean) => void;
  /**
   * Children to render.
   */
  children: React.ReactElement;
  /**
   * max zoom level
   */
  maxZoom?: number;
}
/**
 * ## Overview
 *
 * Component that allows for zooming and panning of its children.
 *
 * Wraps a subset of the [react-quick-pinch-zoom](https://github.com/retyui/react-quick-pinch-zoom) package.
 *
 * View [demo](https://react-quick-pinch-zoom.netlify.app/) and [API](https://github.com/retyui/react-quick-pinch-zoom/blob/master/docs/api/README.md) to explore props
 *
 * [Figma Link](https://www.figma.com/design/hxqgsE26wM7hII0WaUaDfF/RW---TIMED-Lot-Details-(PDP)?node-id=1394-3984&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-pinchzoom--overview)
 */
const PinchZoom: FC<PinchZoomProps> = ({ onZoomChange, children, maxZoom = 10, className, ...props }) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'PinchZoom');
  const [isZoomed, setIsZoomed] = useState(false);

  const ref = useRef<HTMLElement>(null);

  const onUpdate = useCallback(
    ({ x, y, scale }: { x: number; y: number; scale: number }) => {
      if (ref.current) {
        if (scale > 0.99 && scale < 1.01) {
          setIsZoomed(false);
          onZoomChange?.(false);
        } else {
          setIsZoomed(true);
          onZoomChange?.(true);
        }
        const value = make3dTransformValue({ x, y, scale });
        if (ref.current) {
          ref.current.style.transform = value;
        }
      }
    },
    [setIsZoomed, onZoomChange],
  );

  return (
    <PinchZoomLib
      onUpdate={onUpdate}
      draggableUnZoomed={false}
      minZoom={1}
      maxZoom={maxZoom}
      shouldInterceptWheel={() => false}
      centerContained
      inertia={false}
      doubleTapToggleZoom
      doubleTapZoomOutOnMaxScale
      containerProps={{
        ...commonProps,
        ...props,
        className: classNames(baseClassName, className, {
          [`${baseClassName}-zoomed`]: isZoomed,
        }),
      }}
    >
      {children ? (
        cloneElement(children, {
          ref,
          className: classNames(`${baseClassName}-child`, children.props.className),
        })
      ) : (
        <span />
      )}
    </PinchZoomLib>
  );
};

PinchZoom.displayName = 'PinchZoom';

export default PinchZoom;
