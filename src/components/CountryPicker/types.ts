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

/**
 * Type guard to assign the correct config type based on isPhone.
 * @param variantConfig - The configuration object to assign.
 * @returns The config as PhoneConfig or CountryConfig.
 */
export const assignType = (variantConfig: VariantConfig) =>
  variantConfig.isPhone ? (variantConfig as PhoneConfig) : (variantConfig as CountryConfig);
