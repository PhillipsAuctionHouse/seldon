import { countries } from './constants';

// Helper to convert indeterminate config to a discriminated union config
export function toConfig(
  isPhone: true,
  value: Country['code'] | undefined,
  onChange: (v: Country['code']) => void,
): PhoneConfig;
export function toConfig(
  isPhone: false,
  value: Country['name'] | undefined,
  onChange: (v: Country['name']) => void,
): CountryConfig;
export function toConfig(
  isPhone: boolean,
  value: Country['code'] | Country['name'] | undefined,
  onChange: ((v: Country['code']) => void) | ((v: Country['name']) => void),
): Config {
  return isPhone
    ? { isPhone: true, value: value as Country['code'], onChange: onChange as (v: Country['code']) => void }
    : { isPhone: false, value: value as Country['name'], onChange: onChange as (v: Country['name']) => void };
}

// Utility type to prepend 'trigger' to keys, and rename 'hasError' to 'hasTriggerError'. Used by the outer
// CountryPicker component to delineate trigger props from other props
export type PrependTrigger<T> = {
  [K in keyof T as K extends 'hasError' ? 'hasTriggerError' : `trigger${Capitalize<string & K>}`]: T[K];
};

export type Country = {
  code: (typeof countries)[number]['code'];
  name: (typeof countries)[number]['name'];
};

export type PhoneConfig = {
  isPhone: true;
  value: Country['code'] | undefined;
  onChange: (v: Country['code']) => void;
};

export type CountryConfig = {
  isPhone: false;
  value: Country['name'] | undefined;
  onChange: (v: Country['name']) => void;
};

export type Config = PhoneConfig | CountryConfig;

export type CommonProps = {
  baseClassName?: string;
  variantConfig: Config;
};

export type ModalStateProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

export type ModalBaseProps = CommonProps & ModalStateProps;
