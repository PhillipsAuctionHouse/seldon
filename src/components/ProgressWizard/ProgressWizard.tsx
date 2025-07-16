import { ComponentProps, forwardRef, useState, ReactNode } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import ProgressIndicator from '../ProgressIndicator/ProgressIndicator';
import Button from '../Button/Button';
import { ButtonVariants } from '../Button/types';
import { Icon } from '../Icon';
import './_progressWizard.scss';

export interface ProgressWizardProps extends ComponentProps<'div'> {
  steps: number;
  initialStep?: number;
  children: ReactNode[];
  current?: number; // controlled
  onStepChange?: (step: number) => void; // controlled

  
}

const ProgressWizard = forwardRef<HTMLDivElement, ProgressWizardProps>(
  ({ className, steps, initialStep = 1, children, current: controlledCurrent, onStepChange, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ProgressWizard');

    // Uncontrolled state fallback
    const [uncontrolledCurrent, setUncontrolledCurrent] = useState(initialStep);

    // Use controlled if provided, else internal state
    const current = typeof controlledCurrent === 'number' ? controlledCurrent : uncontrolledCurrent;

    // Step navigation handlers
    const setStep = (step: number) => {
      if (onStepChange) {
        onStepChange(step);
      } else {
        setUncontrolledCurrent(step);
      }
    };

    const goNext = () => setStep(Math.min(current + 1, steps));
    const goBack = () => setStep(Math.max(current - 1, 1));

    const isFirst = current === 1;
    const isLast = current === steps;

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} ref={ref}>
        <ProgressIndicator steps={steps} current={current} className={`${baseClassName}__indicator`} />
        <div className={`${baseClassName}__content`}>{Array.isArray(children) ? children[current - 1] : children}</div>
        <div className={`${baseClassName}__actions`}>
          <Button
            variant={ButtonVariants.secondary}
            onClick={goBack}
            isDisabled={isFirst}
            className={`${baseClassName}__button`}
          >
            Back
          </Button>
          <Button
            type={isLast ? 'submit' : 'button'}
            onClick={isLast ? undefined : goNext}
            isDisabled={isLast}
            className={`${baseClassName}__button`}
          >
            {isLast ? (
              'Submit'
            ) : (
              <>
                Continue <Icon icon="ArrowRight" />
              </>
            )}
          </Button>
        </div>
      </div>
    );
  },
);

ProgressWizard.displayName = 'ProgressWizard';

export default ProgressWizard;
