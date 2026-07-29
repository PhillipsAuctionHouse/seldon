import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import classnames from 'classnames';
import { forwardRef, useId } from 'react';
import { getCommonProps, useReducedMotion } from '../../utils';
import { Loader } from '../Loader';
import { Text, TextVariants } from '../Text';
import { SlideToActivateThumb } from './SlideToActivateThumb';
import { useSlideToActivate } from './hooks/useSlideToActivate';
import { focusThumbFromTrack } from './slideToActivateUtils';
import {
  SlideToActivateBorderRadii,
  SlideToActivateDirections,
  SlideToActivateSizes,
  type SlideToActivateProps,
} from './types';

export type { SlideToActivateConfig, SlideToActivateProps } from './types';

/**
 * ## Overview
 *
 * One-shot slide-to-activate control. Thumb latches at the end while
 * `onActivation` is pending, then the parent typically marks it complete.
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-slidetoactivate--overview)
 */
const SlideToActivate = forwardRef<HTMLDivElement, SlideToActivateProps>(
  (
    {
      labelText,
      onActivation,
      onError,
      onProgress,
      onStatusChange,
      pendingAnnouncement = labelText,
      successAnnouncement = 'Activated.',
      errorAnnouncement = 'Action failed. Please try again.',
      resetOnError = true,
      isDisabled = false,
      isComplete = false,
      showThumbWhenDisabled = true,
      config = {},
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const {
      textVariant = TextVariants.labelMedium,
      size = SlideToActivateSizes.default,
      borderRadius = SlideToActivateBorderRadii.sharp,
      direction = SlideToActivateDirections.ltr,
      thumbIcon,
      thumbWidth,
      pendingIndicator,
      trackClassName,
      thumbClassName,
    } = config;
    const { className: baseClassName, ...commonProps } = getCommonProps({ id, ...props }, 'SlideToActivate');
    const reduceMotion = useReducedMotion();
    const thumbDescriptionId = useId();
    const {
      status,
      announcement,
      trackRef,
      thumbRef,
      thumbTranslatePx,
      handlePointerDown,
      handlePointerUp,
      handlePointerCancel,
      handleKeyDown,
      handleKeyUp,
      handleBlur,
      snapDurationMs,
    } = useSlideToActivate({
      direction,
      isDisabled,
      reduceMotion,
      pendingAnnouncement,
      successAnnouncement,
      errorAnnouncement,
      resetOnError,
      onActivation,
      onError,
      onProgress,
      onStatusChange,
    });

    const isPending = status === 'pending';
    const isHeld = status === 'dragging';
    const isInteractive = !isDisabled && !isPending;
    const isCompleteDisabled = isDisabled && isComplete;
    const isBlockedDisabled = isDisabled && !isComplete;
    const isRtl = direction === SlideToActivateDirections.rtl;
    const isThumbHidden = isCompleteDisabled || (isBlockedDisabled && !showThumbWhenDisabled);

    return (
      <div
        {...commonProps}
        id={id}
        ref={ref}
        className={classnames(baseClassName, className, {
          [`${baseClassName}--${size}`]: size !== SlideToActivateSizes.default,
          [`${baseClassName}--radius-${borderRadius}`]: true,
          [`${baseClassName}--disabled`]: isDisabled,
          [`${baseClassName}--disabled-blocked`]: isBlockedDisabled,
          [`${baseClassName}--disabled-complete`]: isCompleteDisabled,
          [`${baseClassName}--disabled-hide-thumb`]: isThumbHidden,
          [`${baseClassName}--pending`]: isPending,
          [`${baseClassName}--rtl`]: isRtl,
          [`${baseClassName}--held`]: isHeld,
        })}
        data-status={status}
        aria-busy={isPending ? true : undefined}
      >
        <div
          ref={trackRef}
          className={classnames(`${baseClassName}__track`, trackClassName)}
          onPointerDown={(event) =>
            focusThumbFromTrack({ event, thumb: thumbRef.current, isInteractive, isThumbHidden })
          }
        >
          <Text
            className={`${baseClassName}__label`}
            element="span"
            variant={textVariant}
            aria-hidden={isPending ? true : undefined}
          >
            {labelText}
          </Text>

          {/* Stays mounted across idle/pending/settled/error so assistive tech gets pending,
              success, and error announcements alike — a region that unmounts on state change
              only ever announces the first transition. */}
          <VisuallyHidden asChild>
            <span role="status" aria-live="polite" aria-atomic="true">
              {announcement}
            </span>
          </VisuallyHidden>

          <VisuallyHidden id={thumbDescriptionId}>
            Press Space or Enter to activate. Press Escape to cancel.
          </VisuallyHidden>

          {isPending ? (
            pendingIndicator !== undefined ? (
              pendingIndicator
            ) : (
              <span className={`${baseClassName}__pending-indicator`} aria-hidden>
                <Loader isCentered={false} />
              </span>
            )
          ) : null}

          <SlideToActivateThumb
            baseClassName={baseClassName}
            thumbRef={thumbRef}
            thumbClassName={thumbClassName}
            thumbWidth={thumbWidth}
            thumbIcon={thumbIcon}
            thumbTranslatePx={thumbTranslatePx}
            labelText={labelText}
            descriptionId={thumbDescriptionId}
            isHeld={isHeld}
            isPending={isPending}
            isDisabled={isDisabled}
            isThumbHidden={isThumbHidden}
            isInteractive={isInteractive}
            status={status}
            snapDurationMs={snapDurationMs}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onBlur={handleBlur}
          />
        </div>
      </div>
    );
  },
);

SlideToActivate.displayName = 'SlideToActivate';

export default SlideToActivate;
