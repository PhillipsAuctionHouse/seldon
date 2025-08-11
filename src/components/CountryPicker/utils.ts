import { type CountryCallingCode, type CountryCode, getCountryCallingCode } from 'libphonenumber-js';

// makes the value pass as a libphonenumber CountryCallingCode
const numberIntoCallingCode = (number: string | number): CountryCallingCode =>
  Object.assign(String(number), { __tag: 'CountryCallingCode' } as const);

export const getSafeCountryCallingCode = (countryCode: CountryCode | 'GS'): CountryCallingCode =>
  countryCode === 'GS' // GS is South Georgia and the South Sandwich Islands, which we currently support but libphonenumber-js does not
    ? numberIntoCallingCode(500)
    : getCountryCallingCode(countryCode);
