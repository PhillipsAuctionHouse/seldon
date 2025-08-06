import { type CountryCallingCode, type CountryCode, getCountryCallingCode } from 'libphonenumber-js';

export const getSafeCountryCallingCode = (countryCode: CountryCode): CountryCallingCode =>
  countryCode === ('GS' as CountryCode) // GS is South Georgia and the South Sandwich Islands, which we currently support but libphonenumber-js does not
    ? ('500' as CountryCallingCode)
    : getCountryCallingCode(countryCode);
