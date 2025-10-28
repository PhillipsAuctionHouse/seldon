import * as Progress from '@radix-ui/react-progress';
import { ComponentProps, forwardRef, Fragment } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { Icon } from '../Icon';
import { Text, TextVariants } from '../Text';

export interface ProgressIndicatorProps extends Progress.ProgressProps, ComponentProps<'div'> {
  /**
   * Total number of steps in the progress indicator.
   */
  totalSteps: number;
  /**
   * Current step number in the progress indicator.
   */
  currentStep: number;
  /**
   * Optional labels for each step in the progress indicator.
   * If supplied, only visible on desktop breakpoints.
   *
   */
  labels?: string[];
  /**
   * Optional class name for additional styling.
   */
  className?: string;
  /**
   * Aria label for the progress indicator.
   */
  progressIndicatorAriaLabel?: string;

  /**
   * Aria label for the completed icon.
   */
  completedIconAriaLabel?: string;
}
/**
 * ## Overview
 *
 * This component provides a visual representation of a multi-step process.
 *
 *
 * [Figma Link](https://www.figma.com/design/kSxOhnqIhilZ9hIJd3bPgP/RW-Registration?node-id=2996-50543&m=dev)
 * [Figma Link 2](https://www.figma.com/design/kSxOhnqIhilZ9hIJd3bPgP/RW-Registration?node-id=2529-23889&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-progressindicator--overview)
 */
const ProgressIndicator = forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  (
    {
      totalSteps,
      currentStep,
      className,
      progressIndicatorAriaLabel = 'Progress Indicator',
      completedIconAriaLabel = 'Completed Icon',
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ProgressIndicator');
    if (totalSteps <= 0) return null;
    const MAX_STEPS = 10;
    const clampedTotalSteps = Math.max(1, Math.min(MAX_STEPS, Math.floor(totalSteps)));
    const clampedCurrentStep = Math.max(1, Math.min(clampedTotalSteps, Math.floor(currentStep)));

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        <Progress.Root value={clampedCurrentStep} max={clampedTotalSteps} aria-label={progressIndicatorAriaLabel}>
          <div className={`${baseClassName}__steps`}>
            {Array.from({ length: clampedTotalSteps }).map((_, index) => {
              const stepNumber = index + 1;
              const isComplete = clampedCurrentStep > stepNumber;
              const isCurrent = clampedCurrentStep === stepNumber;

              return (
                <Fragment key={props.labels ? props.labels[index] : index}>
                  <div
                    className={`${baseClassName}__item`}
                    aria-current={isCurrent ? 'step' : undefined}
                    data-testid={`progress-step-${stepNumber}`}
                  >
                    <span
                      className={classnames(`${baseClassName}__circle`, {
                        [`${baseClassName}__circle--active`]: isComplete,
                        [`${baseClassName}__circle--current`]: isCurrent,
                      })}
                    >
                      {isComplete ? (
                        <Icon
                          icon="Success"
                          aria-label={completedIconAriaLabel}
                          color="currentColor"
                          width={20}
                          height={20}
                        />
                      ) : (
                        <Text variant={TextVariants.labelSmall}>{stepNumber}</Text>
                      )}
                    </span>
                    {props.labels && props.labels[index] && (
                      <span className={`${baseClassName}__label`}>
                        <Text variant={TextVariants.bodySmall}>{props.labels[index]}</Text>
                      </span>
                    )}
                  </div>
                  {index < clampedTotalSteps - 1 ? (
                    <div className={`${baseClassName}__connector`} aria-hidden="true" />
                  ) : null}
                </Fragment>
              );
            })}
          </div>
        </Progress.Root>
      </div>
    );
  },
);

ProgressIndicator.displayName = 'ProgressIndicator';

export default ProgressIndicator;
