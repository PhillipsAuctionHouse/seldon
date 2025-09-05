import { countries } from '../CountryPicker/constants';

export type CountryCode = (typeof countries)[number]['code'];
