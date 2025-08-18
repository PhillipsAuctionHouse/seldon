import { CountryCode } from 'libphonenumber-js';
import { getSafeCountryCallingCode } from './utils';

describe('getSafeCountryCallingCode', () => {
  it('should return the correct calling code for a valid country code', () => {
    expect(getSafeCountryCallingCode('US')).toBe('1'); // United States
    expect(getSafeCountryCallingCode('GB')).toBe('44'); // United Kingdom
  });

  it('should return "500" for the special case of country code "GS"', () => {
    expect(getSafeCountryCallingCode('GS' as CountryCode)).toBe('500');
  });

  it('should throw an error for an invalid country code', () => {
    expect(() => getSafeCountryCallingCode('XX' as unknown as CountryCode)).toThrow();
  });
});
