import { ViewingsListCardProps } from './ViewingsListCard';

/* istanbul ignore next */
export const validate = (values: ViewingsListCardProps) => {
  let invalidFields = {};
  if (values.location === 'london') {
    invalidFields = { ...invalidFields, location: "Can't be london!" };
  }

  if (values.address3 === 'France') {
    invalidFields = { ...invalidFields, address3: 'We do not sell in France' };
  }
  return Object.keys(invalidFields).length > 0 ? invalidFields : undefined;
};

export const defaultViewing = [
  {
    address1: '432 PARK AVE',
    address2: 'Coral Springs, FL 07677',
    address3: 'United States',
    addressUrl: 'HTTP://WWW.WEBSITE.COM',
    enableOnSite: 'true',
    id: 'test-id',
    invalidFields: undefined,
    location: 'One title',
    previewDates: '3-6 November',
    previewHours1: '8am - 9pm',
    previewHours2: 'After closing',
    previewLabelValue: 'Opening Night',
    previewOn: 'true',
    viewingDates: '3-6 December',
    viewingHours1: '7am - 8pm',
    viewingHours2: '9:30pm - 10pm',
    viewingLabelValue: 'Open to the public',
  },
];
/* istanbul ignore next */
export const handleOnSave = (
  e: React.MouseEvent<HTMLElement>,
  cb: React.Dispatch<React.SetStateAction<ViewingsListCardProps[]>>,
  validateCb: (e: ViewingsListCardProps) => object | undefined,
) => {
  const targ = e?.target as HTMLElement;
  const inputs = targ.closest('.phillips-viewings-list-card')?.querySelectorAll('input');

  const el: ViewingsListCardProps = { id: '' };
  inputs?.forEach((input) => {
    el[input.name] = input.value;
  });
  if (validateCb) {
    el.invalidFields = validateCb(el);
  }

  cb((prevViewings) => {
    // if (prevViewings) {
      if (prevViewings.find((view) => view.id === el.id)) {
        const index = prevViewings.findIndex((view) => view.id === el.id);
        prevViewings.splice(index, 1, el);
        // Persist to database
        return [...prevViewings];
      }
      // Persist to database
      return [...prevViewings, el];

  });

  return el.invalidFields ? false : true;
};
