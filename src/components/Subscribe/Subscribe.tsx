import classnames from 'classnames';

import { px } from '../../utils';
import Input from '../Input/Input';
import Button, { ButtonProps } from '../Button/Button';

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
   * Subscribe state for loading or error
   */
  subscriptionState?: 'loading' | 'invalid' | null;
  /**
   * Subscribe input change handler
   */
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * ## Overview
 *
 * A component for adding an email signup form.
 *
 * [Figma Link](https://www.figma.com/file/npS5ECbNut8hevUkGWSzUN/Site-Furniture-(Navigation)---SP24?node-id=4347%3A4194&mode=dev)
 */
const Subscribe = ({
  blurb,
  buttonText = 'Sign Up',
  buttonProps,
  className,
  element: Element = 'form',
  id,
  inputLabelText = 'Email*',
  inputPlaceholder = 'example@email.com',
  title = 'Subscribe to Newsletter',
  loadingText = 'Loading...',
  invalidText = '',
  subscriptionState = null,
  onInputChange = () => ({}),
  ...props
}: SubscribeProps) => {
  const isInvalid = subscriptionState === 'invalid';
  const isLoading = subscriptionState === 'loading';

  return (
    <Element
      data-testid={id ? id : `subscribe-form`}
      id={id}
      className={classnames(`${px}-subscribe`, className)}
      {...props}
    >
      <h3 className={`${px}-subscribe__title`}>{title}</h3>
      {blurb ? <p className={`${px}-subscribe__blurb`}>{blurb}</p> : null}
      {isLoading ? <p className={`${px}-subscribe__loading`}>{loadingText}</p> : null}

      <Input
        className={`${px}-subscribe__input`}
        type="email"
        name="email"
        placeholder={inputPlaceholder}
        labelText={inputLabelText}
        invalid={isInvalid}
        invalidText={invalidText}
        required
        onChange={onInputChange}
      />
      <Button className={`${px}-subscribe__button ${className}`} buttonType="secondary" type="submit" {...buttonProps}>
        {buttonText}
      </Button>
    </Element>
  );
};

export default Subscribe;
