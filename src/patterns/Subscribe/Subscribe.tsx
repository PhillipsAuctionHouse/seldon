import classnames from 'classnames';

import { getCommonProps } from '../../utils';
import Input from '../../components/Input/Input';
import Button, { ButtonProps } from '../../components/Button/Button';
import { SubscriptionState } from './types';
import { ButtonVariants } from '../../components/Button/types';

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
   * A unique `id` for the `<Subscribe>`
   */
  id: string;
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
   * Subscribe invalid text
   */
  errorText?: string;
  /**
   * Subscribe success text
   */
  successText?: string;
  /**
   * Subscribe privacy text
   */
  privacyText?: string;
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
  autoFocus = true,
  blurb,
  buttonText = 'Sign Up',
  buttonProps,
  className,
  element: Element = 'form',
  inputLabelText = 'Enter Your Email Address To Sign Up*',
  inputPlaceholder = 'example@email.com',
  title = 'Never Miss A Moment',
  loadingText = 'Loading...',
  invalidText = '',
  errorText = 'An error occurred. Please try again.',
  successText,
  privacyText = 'By signing up, you agree to receive email communications from Phillips.',
  subscriptionState = SubscriptionState.Default,
  id,
  ...props
}: SubscribeProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps({ id, ...props }, 'Subscribe');
  const isInvalid = subscriptionState === SubscriptionState.Invalid;
  const isLoading = subscriptionState === SubscriptionState.Loading;
  const isSuccess = subscriptionState === SubscriptionState.Success;
  const isError = subscriptionState === SubscriptionState.Error;

  const textsCondition = {
    invalid: invalidText,
    success: successText,
    loading: loadingText,
    error: errorText,
  };

  const text = subscriptionState !== SubscriptionState.Default ? textsCondition[subscriptionState] : '';
  const warn = isSuccess || isLoading;
  const invalid = isInvalid || isError;

  return (
    <Element id={id} {...commonProps} className={classnames(baseClassName, className)} noValidate {...props}>
      <h3 className={`${baseClassName}__title`}>{title}</h3>
      {blurb ? <p className={`${baseClassName}__blurb`}>{blurb}</p> : null}

      <Input
        autoFocus={autoFocus}
        className={`${baseClassName}__input`}
        type="email"
        name="email"
        placeholder={inputPlaceholder}
        labelText={inputLabelText}
        invalid={invalid}
        invalidText={text}
        warn={warn}
        warnText={text}
        required
        id={`${id}-input`}
      />
      <Button
        className={`${baseClassName}__button ${className}`}
        variant={ButtonVariants.secondary}
        type="submit"
        {...buttonProps}
      >
        {buttonText}
      </Button>

      {privacyText ? <p className={`${baseClassName}__privacy`}>{privacyText}</p> : null}
    </Element>
  );
};

export default Subscribe;
