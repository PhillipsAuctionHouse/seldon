import * as Progress from '@radix-ui/react-progress';
import { ComponentProps, forwardRef, Fragment } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { Icon } from '../Icon';
import { Text, TextVariants } from '../Text';

export type StepStatusEnum = 'completed' | 'current' | 'not started';

type StepLabelByStatus = { [K in StepStatusEnum]: string };
type Step = {
  statusLabels?: StepLabelByStatus;
  statusAriaLabels?: StepLabelByStatus;
};

export interface ProgressIndicatorProps extends Progress.ProgressProps, ComponentProps<'div'> {
  /**
   * Data for each step
   */
  steps: Step[];
  /**
   * Current step number in the progress indicator.
   */
  current: number;
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
      ariaLabelCompletedIcon = 'Completed Icon',
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ProgressIndicator');
    const stepCount = steps.length;
    if (stepCount < 1) return null;

    const getValue = (value: number) => {
      if (value <= 0) return 0;
      if (value >= stepCount) return stepCount;
      return value;
    };

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        <Progress.Root value={getValue(current)} max={stepCount} aria-label={ariaLabelProgress}>
          <div className={`${baseClassName}__steps`} aria-label={ariaLabelSteps}>
            {steps.map(({ statusLabels, statusAriaLabels = statusLabels }, index) => {
              const stepNumber = index + 1;
              const isComplete = current > stepNumber;
              const isCurrent = current === stepNumber;
              const stepState = isComplete ? 'completed' : isCurrent ? 'current' : 'not started';
              const stepAriaLabel = statusAriaLabels?.[stepState];

              return (
                <Fragment key={statusLabels?.[stepState] ?? index}>
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
                    {statusLabels?.[stepState] && (
                      <span className={`${baseClassName}__label`}>
                        <Text variant={TextVariants.string2}>{statusLabels[stepState]}</Text>
                      </span>
                    )}
                  </div>
                  {index < stepCount - 1 ? <div className={`${baseClassName}__connector`} aria-hidden="true" /> : null}
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
