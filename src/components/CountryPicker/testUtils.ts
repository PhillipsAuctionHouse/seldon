import { VariantConfig, getConfig } from './types';

/**
 * Returns a configuration object based on the `isPhone` flag.
 *
 * If `isPhone` is true, returns a `PhoneConfig` object with:
 * - `isPhone` set to true,
 * - `countryValue` set to 'US',
 * - `onChange` as a mock function.
 *
 * If `isPhone` is false, returns a `CountryConfig` object with:
 * - `isPhone` set to false,
 * - `countryValue` set to 'United States',
 * - `onChange` as a mock function.
 *
 * @param isPhone - Determines whether to return a phone or country config.
 * @returns A mock configuration object for either phone or country selection.
 */
export const getTestConfig = (isPhone: VariantConfig['isPhone']) =>
  getConfig(isPhone, isPhone ? 'US' : 'United States', vi.fn());
