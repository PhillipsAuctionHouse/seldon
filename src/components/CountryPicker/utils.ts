import { type CountryCode, getCountryCallingCode } from 'libphonenumber-js';

const SPECIAL_CALLING_CODES: Record<string, string> = {
  GS: '500', // South Georgia and the South Sandwich Islands
  // Add more special cases here as needed
};

export const getSafeCountryCallingCode = (countryCode: CountryCode | string): string => {
  if (SPECIAL_CALLING_CODES[countryCode]) {
    return SPECIAL_CALLING_CODES[countryCode];
  }
  return String(getCountryCallingCode(countryCode as CountryCode));
};
