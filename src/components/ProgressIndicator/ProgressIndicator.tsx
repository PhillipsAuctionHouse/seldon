import * as Progress from '@radix-ui/react-progress';
import { ComponentProps, forwardRef, Fragment } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { Icon } from '../Icon';
import { Text, TextVariants } from '../Text';

export type StepStatusEnum = 'completed' | 'current' | 'not started';
export interface ProgressIndicatorProps extends Progress.ProgressProps, ComponentProps<'div'> {
  /**
   * Total number of steps in the progress indicator.
   */
  steps: number;
  /**
   * Current step in the progress indicator.
   */
  current: number;
  /**
   * Optional labels for each step in the progress indicator.
   */
  labels?: string[];
  /**
   * Optional class name for additional styling.
   */
  className?: string;
  /**
   * Aria label for the progress indicator.
   */
  ariaLabelProgress?: string;
  /**
   * Aria label for the progress steps.
   */
  ariaLabelSteps?: string;
  /**
   * Aria labels for each step in different states.
   */
  ariaLabelStep?: (step: number, state: StepStatusEnum) => string;
  /**
   * Aria label for the completed icon.
   */
  ariaLabelCompletedIcon?: string;
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
      steps,
      current,
      className,
      ariaLabelProgress = 'Progress',
      ariaLabelSteps = 'Progress steps',
      ariaLabelStep = (step, state) => `Step ${step} ${state}`,
      ariaLabelCompletedIcon = 'Completed Icon',
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ProgressIndicator');
    if (steps < 1) return null;

    const getValue = (value: number) => {
      if (value <= 0) return 0;
      if (value >= steps) return steps;
      return value;
    };

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        <Progress.Root value={getValue(current)} max={steps} aria-label={ariaLabelProgress}>
          <div className={`${baseClassName}__steps`} aria-label={ariaLabelSteps}>
            {Array.from({ length: steps }).map((_, index) => {
              const stepNumber = index + 1;
              const isComplete = current > stepNumber;
              const isCurrent = current === stepNumber;
              const stepState = isComplete ? 'completed' : isCurrent ? 'current' : 'not started';
              const stepAriaLabel = ariaLabelStep(stepNumber, stepState);

              return (
                <Fragment key={props.labels ? props.labels[index] : index}>
                  <div
                    className={`${baseClassName}__item`}
                    aria-current={isCurrent ? 'step' : undefined}
                    aria-label={stepAriaLabel}
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
                          aria-label={ariaLabelCompletedIcon}
                          color="currentColor"
                          width={20}
                          height={20}
                        />
                      ) : (
                        <Text variant={TextVariants.badge}>{stepNumber}</Text>
                      )}
                    </span>
                    {props.labels && props.labels[index] && (
                      <span className={`${baseClassName}__label`}>
                        <Text variant={TextVariants.string2}>{props.labels[index]}</Text>
                      </span>
                    )}
                  </div>
                  {index < steps - 1 ? <div className={`${baseClassName}__connector`} aria-hidden="true" /> : null}
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
