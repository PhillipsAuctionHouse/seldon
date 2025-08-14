import { countries, states } from './constants';

// Types

export type PrependTrigger<T> = {
  [K in keyof T as K extends 'hasError' ? 'hasTriggerError' : `trigger${Capitalize<string & K>}`]: T[K];
};

export type ModalStateProps = {
  /**
   * Determines whether the modal is open.
   */
  isOpen?: boolean;

  /**
   * Callback function triggered when the modal is closed.
   */
  onClose?: () => void;
};

export type CommonProps = {
  /**
   * The base class name for styling the component.
   */
  baseClassName?: string;

  /**
   * Configuration for phone/country variant.
   */
  variantConfig: VariantConfig;
};

export type ModalBaseProps<T> = T & CommonProps & ModalStateProps;

export type Country = {
  name: (typeof countries)[number]['name'];
  code: (typeof countries)[number]['code'];
};

export type State = {
  name: (typeof states)[number]['name'];
  code: (typeof states)[number]['code'];
};

export type CountryCallingCode = `+${number}`;

export type PhoneConfig = {
  isPhone: true;
  countryValue?: Country['code'];
  onChange: (value: Country['code']) => void;
};

export type CountryConfig = {
  isPhone: false;
  countryValue?: Country['name'];
  onChange: (value: Country['name']) => void;
};

export type VariantConfig = PhoneConfig | CountryConfig;
type VariantValue = PhoneConfig['countryValue'] | CountryConfig['countryValue'];
export const getConfig = (
  isPhone: boolean,
  countryValue?: VariantValue,
  func?: (v?: VariantValue) => void,
): PhoneConfig | CountryConfig => {
  const config = isPhone ? ({} as PhoneConfig) : ({} as CountryConfig);
  Object.assign(config, {
    isPhone,
    countryValue,
    onChange: (v?: VariantValue) => {
      func?.(v);
    },
  });
  return config;
};
