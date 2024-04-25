import classnames from 'classnames';

import { CommonProps, px } from '../../utils';
import Input from '../Input/Input';
import Button from '../Button/Button';

export interface SubscribeProps extends CommonProps {
  /**
   * Subscibe blurb
   */
  blurb?: string;
  /**
   * Subscibe button extra props to spread
   */
  buttonProps?: object;
  /**
   * Subscibe button text
   */
  buttonText?: string;
  /**
   * Subscibe input label
   */
  inputLabelText?: string;
  /**
   * Subscibe input label
   */
  inputPlaceholder?: string;
  /**
   * Subscibe title text
   */
  title: string;
  /**
    * Subscribe http method
    */
  method?: 'post' | 'get' | 'dialog';
}

const Subscribe = ({
  blurb,
  buttonText = 'Sign Up',
  buttonProps,
  className,
  id,
  inputLabelText = 'Email*',
  inputPlaceholder = 'example@email.com',
  title,
  method = 'post',
}: SubscribeProps) => {
  return (
    <form
      data-testid={id ? `subscribe-${id}` : `subscribe`}
      id={id}
      className={classnames(`${px}-subscribe`, { [`${className}`]: className })}
      method={method}
    >
      <h3 className={`${px}-subscribe__title`}>{title}</h3>
      {blurb ? <p className={`${px}-subscribe__blurb`}>{blurb}</p> : null}
      <Input
        className={`${px}-subscribe__input`}
        id="footer-newsletter"
        type="email"
        placeholder={inputPlaceholder}
        labelText={inputLabelText}
      />
      <Button className={`${px}-subscribe__button`} buttonType="secondary" type="submit" {...buttonProps}>
        {buttonText}
      </Button>
    </form>
  );
};

export default Subscribe;
