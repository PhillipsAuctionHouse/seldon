import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import classnames from 'classnames';
import { forwardRef } from 'react';
import { getCommonProps, useReducedMotion } from '../../utils';
import { Loader } from '../Loader';
import { Text, TextVariants } from '../Text';
import { SlideToActivateThumb } from './SlideToActivateThumb';
import { useSlideToActivate } from './hooks/useSlideToActivate';
import { focusThumbFromTrack } from './slideToActivateUtils';
import {
  SlideToActivateBorderRadii,
  SlideToActivateDisabledReasons,
  SlideToActivateDirections,
  SlideToActivateSizes,
  type SlideToActivateProps,
} from './types';

export type { SlideToActivateProps } from './types';

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
      textVariant = TextVariants.labelMedium,
      onActivation,
      onError,
      onProgress,
      pendingAnnouncement = labelText,
      successAnnouncement = 'Activated.',
      errorAnnouncement = 'Action failed. Please try again.',
      requiredProgress = 0.95,
      deadZone = 8,
      sensitivity = 1,
      direction = SlideToActivateDirections.ltr,
      size = SlideToActivateSizes.default,
      borderRadius = SlideToActivateBorderRadii.sharp,
      thumbHitTolerance = 8,
      thumbIcon,
      thumbWidth,
      pendingIndicator,
      isDisabled = false,
      disabledReason = SlideToActivateDisabledReasons.blocked,
      showThumbWhenDisabled = true,
      className,
      trackClassName,
      thumbClassName,
      id,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps({ id, ...props }, 'SlideToActivate');
    const reduceMotion = useReducedMotion();
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
      requiredProgress,
      deadZone,
      sensitivity,
      direction,
      isDisabled,
      reduceMotion,
      pendingAnnouncement,
      successAnnouncement,
      errorAnnouncement,
      onActivation,
      onError,
      onProgress,
    });

    const isPending = status === 'pending';
    const isHeld = status === 'dragging';
    const isInteractive = !isDisabled && !isPending;
    const isCompleteDisabled = isDisabled && disabledReason === SlideToActivateDisabledReasons.complete;
    const isBlockedDisabled = isDisabled && disabledReason === SlideToActivateDisabledReasons.blocked;
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
        data-disabled-reason={isDisabled ? disabledReason : undefined}
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
            thumbHitTolerance={thumbHitTolerance}
            thumbTranslatePx={thumbTranslatePx}
            labelText={labelText}
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
