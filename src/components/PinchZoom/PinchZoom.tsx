import { FC, cloneElement, isValidElement, useCallback, useState } from 'react';
import { getCommonProps } from '../../utils';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';

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

  const onTransformed = useCallback(
    (zoomRef: ReactZoomPanPinchRef) => {
      const { state } = zoomRef;
      if (state.scale > 0.99 && state.scale < 1.01) {
        setIsZoomed(false);
        onZoomChange?.(false);
      } else {
        setIsZoomed(true);
        onZoomChange?.(true);
      }
    },
    [onZoomChange],
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
