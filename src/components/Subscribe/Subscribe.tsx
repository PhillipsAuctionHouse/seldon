import classnames from 'classnames';

import { getCommonProps } from '../../utils';
import Input from '../Input/Input';
import Button, { ButtonProps } from '../Button/Button';
import { SubscriptionState } from './types';

export interface SubscribeProps extends React.HTMLAttributes<HTMLFormElement> {
  /**
   * Subscribe blurb
   */
  blurb?: string;
  /**
   * Subscribe button extra props to spread
   */
  buttonProps?: ButtonProps;
  /**
   * Subscribe button text
   */
  buttonText?: string;
  /**
   * Optional element to render in place of a form e.g. Remix Form, etc
   */
  element?: React.ElementType<SubscribeProps>;
  /**
   * Subscribe input label
   */
  inputLabelText?: string;
  /**
   * Subscribe input label
   */
  inputPlaceholder?: string;
  /**
   * Subscribe title text
   */
  title?: string;
  /**
   * Subscribe loading text
   */
  loadingText?: string;
  /**
   * Subscribe error text
   */
  invalidText?: string;
  /**
   * Subscribe success text
   */
  successText?: string;
  /**
   * Subscribe state for loading or error
   */
  subscriptionState?: SubscriptionState;
}

/**
 * ## Overview
 *
 * A component for adding an email signup form.
 *
 * [Figma Link](https://www.figma.com/design/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?node-id=6651-2641&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-subscribe--overview)
 */

const Subscribe = ({
  blurb,
  buttonText = 'Sign Up',
  buttonProps,
  className,
  element: Element = 'form',
  inputLabelText = 'Email*',
  inputPlaceholder = 'example@email.com',
  title = 'Subscribe to Newsletter',
  loadingText = 'Loading...',
  invalidText = '',
  successText,
  subscriptionState = SubscriptionState.Default,
  ...props
}: SubscribeProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Subscribe');

  const isInvalid = subscriptionState === 'invalid';
  const isLoading = subscriptionState === 'loading';
  const isSuccess = subscriptionState === 'success';

  const textsCondition = {
    invalid: invalidText,
    success: successText,
    loading: loadingText,
  };

  const warnText = subscriptionState !== 'default' ? textsCondition[subscriptionState] : '';
  const warn = isSuccess || isLoading;

  return (
    <Element {...commonProps} className={classnames(baseClassName, className)} noValidate {...props}>
      <h3 className={`${baseClassName}__title`}>{title}</h3>
      {blurb ? <p className={`${baseClassName}__blurb`}>{blurb}</p> : null}

      <Input
        className={`${baseClassName}__input`}
        type="email"
        name="email"
        placeholder={inputPlaceholder}
        labelText={inputLabelText}
        invalid={isInvalid}
        invalidText={invalidText}
        warn={warn}
        warnText={warnText}
        required
      />
      <Button className={`${baseClassName}__button ${className}`} buttonType="secondary" type="submit" {...buttonProps}>
        {buttonText}
      </Button>
    </Element>
  );
};

export default Subscribe;
