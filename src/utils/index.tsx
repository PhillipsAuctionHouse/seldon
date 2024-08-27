import { kebabCase } from 'change-case';
import * as React from 'react';

export const px = 'seldon';

/**
 * Returns standard props values incorporating the component name into the class name and data-testid
 */
export const getCommonProps = ({ id, ...props }: { id?: string }, componentName: string) => {
  const kebabCaseComponentName = kebabCase(componentName);
  return {
    ...props,
    'data-testid': id ? `${kebabCaseComponentName}-${id}` : `${kebabCaseComponentName}`,
    className: `${px}-${kebabCaseComponentName}`,
  };
};

export enum PaddingTokens {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  xxl = 'xxl',
}

/* eslint-disable @typescript-eslint/no-empty-function */
export const noOp = () => {};

export interface InputProps {
  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled?: boolean;
  /**
   * Specify a custom `id` for the `<input>`
   */
  id: string;
  /**
   * Specify whether the control is currently invalid
   */
  invalid?: boolean;
  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText?: React.ReactNode;
  /**
   * Whether the input should be read-only
   */
  readOnly?: boolean;
  /**
   * Specify the type of the `<input>`
   */
  type: string;
  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;
  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: React.ReactNode;
}

interface NormalizedProps {
  disabled?: boolean;
  invalid?: boolean;
  invalidId?: string;
  type?: string;
  warn?: boolean;
  warnId?: string;
  validation: JSX.Element | null;
}

/**
 * Returns an object containing non-colliding props and additional, generated ones.
 * This hook ensures that only either "invalid" or "warn" is true but never both at
 * the same time. Regardless whether "invalid" or "warn", the appropriate validation
 * message is passed as "validation".
 * It also ensure that neither "invalid", nor "warn", nor "disabled" are enabled when
 * "readonly" is passed as "readonly" takes precedence.

 */
export function useNormalizedInputProps({
  disabled = false,
  id,
  invalid = false,
  invalidText = 'invalid',
  readOnly = false,
  type,
  warn = false,
  warnText,
}: InputProps) {
  const normalizedProps: NormalizedProps = {
    disabled: !readOnly && disabled,
    invalid: !readOnly && !disabled && invalid,
    invalidId: `${id}-error-msg`,
    type: type === 'toggle' ? 'checkbox' : type,
    warn: !readOnly && !disabled && !invalid && warn,
    warnId: `${id}-warn-msg`,
    validation: null,
  };

  if (normalizedProps.invalid) {
    normalizedProps.validation = (
      <div className={`${px}-input__validation ${px}-${type}-input--invalid`} id={normalizedProps.invalidId}>
        {invalidText}
      </div>
    );
  }

  if (normalizedProps.warn) {
    normalizedProps.validation = (
      <div className={`${px}-input__validation ${px}-${type}-input--warn`} id={normalizedProps.warnId}>
        {warnText}
      </div>
    );
  }

  return normalizedProps;
}

export const defaultYear = new Date().getFullYear();

export const generatePaddingClassName = (
  padding: PaddingTokens,
  side: 'start' | 'end' = 'end',
  direction: 'vertical' | 'horizontal' = 'vertical',
) => {
  return `${px}-padding-${direction}-${padding}-${side}`;
};

/**
 * Return true if the email is valid, false otherwise.
 *
 * true: some@some.com
 *
 * false: some@some, some@.com, some@some.

 */
export const emailValidation = (email: string) => {
  const emailRegex = /(.+)@(.+){2,}\.(.+){2,}/i;
  return emailRegex.test(email);
};

/**
 * Return array of children of a specific type
 *
 * @param children - React children
 * @param componentType - React component type
 * @param inverse - Return children that are not of the specified type
 *
 */
export const findChildrenOfType = <ComponentProps,>(
  children: React.ReactNode,
  componentType?: React.ElementType,
  inverse = false,
) => {
  const foundChildrenOfType = React.Children.toArray(children).filter((child) => {
    if (child && (child as React.ReactElement).type === componentType && !inverse) {
      return child;
    } else {
      return child && (child as React.ReactElement).type !== componentType && inverse;
    }
  });
  return foundChildrenOfType.length > 0 ? (foundChildrenOfType as React.ReactElement<ComponentProps>[]) : null;
};

export const encodeURLSearchParams = (url: string) => {
  const urlSections = url.split('?');
  const searchParams = new URLSearchParams(urlSections[1]);
  const encodedParams = Array.from(searchParams.entries()).map(([key, value]) => [key, encodeURIComponent(value)]);
  const encodedQueryString = encodedParams.map(([key, value]) => `${key}=${value}`).join('&');
  const encodedLink = `${urlSections[0]}?${encodedQueryString}`;
  return encodedLink;
};
