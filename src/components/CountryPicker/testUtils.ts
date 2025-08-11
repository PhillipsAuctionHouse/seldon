import { VariantConfig, PhoneConfig, CountryConfig } from './types';

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
export const getConfigVariant = (isPhone: VariantConfig['isPhone']) =>
  (isPhone
    ? ({
        isPhone,
        countryValue: 'US',
        onChange: vi.fn() as PhoneConfig['onChange'],
      } as PhoneConfig)
    : {
        isPhone,
        countryValue: 'United States',
        onChange: vi.fn() as CountryConfig['onChange'],
      }) as CountryConfig;
