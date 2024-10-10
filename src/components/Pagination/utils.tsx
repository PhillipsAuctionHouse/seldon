import { PaginationOption, PaginationOptionValue } from './Pagination';

export const determineOptionValue = (option: PaginationOption | PaginationOptionValue) => {
  return typeof option === 'string' || typeof option === 'number' ? option : option?.value;
};

export const findOptionFromSelectString = (options: (PaginationOption | PaginationOptionValue)[], value: string) => {
  return options.find(
    (option) => determineOptionValue(option) === value || determineOptionValue(option) === parseInt(value),
  );
};
