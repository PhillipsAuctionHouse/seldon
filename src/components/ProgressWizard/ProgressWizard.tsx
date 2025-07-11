import { ComponentProps, forwardRef, useState, ReactNode } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import ProgressIndicator from '../ProgressIndicator/ProgressIndicator';
import Button from '../Button/Button';
import { ButtonVariants } from '../Button/types';
import { Icon } from '../Icon';

export interface ProgressWizardProps extends ComponentProps<'div'> {
  steps: number;
  initialStep?: number;
  children: ReactNode[];
}

const ProgressWizard = forwardRef<HTMLDivElement, ProgressWizardProps>(
  ({ className, steps, initialStep = 1, children, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ProgressWizard');
    const [current, setCurrent] = useState(initialStep);

    const goNext = () => setCurrent((c) => Math.min(c + 1, steps));
    const goBack = () => setCurrent((c) => Math.max(c - 1, 1));

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
