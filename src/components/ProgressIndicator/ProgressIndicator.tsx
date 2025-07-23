import * as Progress from '@radix-ui/react-progress';
import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { Icon } from '../Icon';
import { Text, TextVariants } from '../Text';
import './_progressIndicator.scss';

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
}
/**
 * ## Overview
 *
 * This component provides a visual representation of a multi-step process.
 *
 *
 * [Figma Link](https://www.figma.com/design/kSxOhnqIhilZ9hIJd3bPgP/RW-Registration?node-id=2529-23889&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-progressindicator--overview)
 */
const ProgressIndicator = forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  ({ steps, current, className, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ProgressIndicator');
    if (steps < 1) return null;

    const getValue = (value: number) => {
      if (value <= 0) {
        return 0;
      }
      if (value >= steps) {
        return steps;
      }
      return value;
    };

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        <Progress.Root value={getValue(current)} max={steps} aria-label="Progress">
          <ul role="list" className={`${baseClassName}__list`}>
            {Array.from({ length: steps }).map((_, index) => {
              const isComplete = current > index + 1;
              const isCurrent = current === index + 1;
              return (
                <>
                  <li
                    key={`step-${index}`}
                    className={`${baseClassName}__item`}
                    role="listitem"
                    aria-label={
                      isComplete
                        ? `Step ${index + 1} completed`
                        : isCurrent
                          ? `Step ${index + 1} current`
                          : `Step ${index + 1} not started`
                    }
                    aria-current={isCurrent ? 'step' : undefined}
                  >
                    <span
                      className={classnames(`${baseClassName}__circle`, {
                        [`${baseClassName}__circle--active`]: isComplete,
                        [`${baseClassName}__circle--current`]: isCurrent,
                      })}
                    >
                      {isComplete ? (
                        <Icon icon="Success" aria-label="Completed Icon" color="currentColor" width={20} height={20} />
                      ) : (
                        <Text variant={TextVariants.badge}>{index + 1}</Text>
                      )}
                    </span>
                    {props.labels && props.labels[index] && (
                      <span className={`${baseClassName}__label`}>
                        <Text variant={TextVariants.string1}>{props.labels[index]}</Text>
                      </span>
                    )}
                  </li>
                  {index < steps - 1 && <span className={`${baseClassName}__connector`} aria-hidden="true" />}
                </>
              );
            })}
          </ul>
        </Progress.Root>
      </div>
    );
  },
);

ProgressIndicator.displayName = 'ProgressIndicator';

export default ProgressIndicator;
