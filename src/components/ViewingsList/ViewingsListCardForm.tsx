import classnames from 'classnames';
import * as React from 'react';

import { px } from '../../utils';
import Input from '../Input/Input';

export interface ViewingsListCardFormProps {
  /**
   * Address1 of viewing
   */
  address1?: string;
  /**
   * Label for address1 input
   */
  address1Label?: string;
  /**
   * URL for a map link to address1
   */
  addressUrl?: string;
  /**
   * Label for address1 url input
   */
  addressUrlLabel?: string;
  /**
   * Address2 of viewing
   */
  address2?: string;
  /**
   * Label for address2 input
   */
  address2Label?: string;
  /**
   * Address3 of viewing
   */
  address3?: string;
  /**
   * Label for address3 input
   */
  address3Label?: string;
  /**
   * Unique id for ViewingListCard component
   */
  id: string;
  /**
   * Validation error message object
   */
  invalidFields?:
    | {
        address1?: string | undefined;
        addressUrl?: string | undefined;
        address2?: string | undefined;
        address3?: string | undefined;
        location?: string | undefined;
        previewDates?: string | undefined;
        previewHours1?: string | undefined;
        previewHours2?: string | undefined;
        previewLabelValue?: string | undefined;
        previewOn?: string | undefined;
        viewingLabelValue?: string | undefined;
        viewingDates?: string | undefined;
        viewingHours1?: string | undefined;
        viewingHours2?: string | undefined;
      }
    | undefined;
  /**
   * Label for preview label input
   */
  previewLabel?: string;
  /**
   * Value for preview label input
   */
  previewLabelValue?: string;
  /**
   * How large should the button be?
   */
  previewDates?: string;
  /**
   * Label for preview date input
   */
  previewDatesLabel?: string;
  /**
   * Default value for preview hours input
   */
  previewHours1?: string;
  /**
   * Label for preview Hours1 input
   */
  previewHours1Label?: string;
  /**
   * Default value for preview hours 2 input
   */
  previewHours2?: string;
  /**
   * Label for preview Hours1 input
   */
  previewHours2Label?: string;
  /**
   * How large should the button be?
   */
  previewOn?: string;
  /**
   * Label for preview sectioin toggle
   */
  previewToggleLabel?: string;
  /**
   * Label for viewing label input
   */
  viewingLabel?: string;
  /**
   * Value for viewing label input
   */
  viewingLabelValue?: string;
  /**
   * How large should the button be?
   */
  viewingDates?: string;
  /**
   * Label for viewing date input
   */
  viewingDatesLabel?: string;
  /**
   * Default value for viewing hours input
   */
  viewingHours1?: string;
  /**
   * Label for viewing Hours1 input
   */
  viewingHours1Label?: string;
  /**
   * Default value for viewing hours 2 input
   */
  viewingHours2?: string;
  /**
   * Label for viewing Hours1 input
   */
  viewingHours2Label?: string;
}

const baseClass = `${px}-viewings-list-card-form`;

const ViewingsListCardForm = ({
  address1,
  address1Label = "Address ('432 Park Ave', ETC)",
  addressUrl,
  addressUrlLabel = "URL for map link ('http://www.website.com')",
  address2,
  address2Label = "City, State, Zip ('New York, NY 10019')",
  address3,
  address3Label = 'Country (United States)',
  id,
  invalidFields,
  previewDates,
  previewDatesLabel = 'Date(s)',
  previewHours1,
  previewHours1Label = 'Hours1',
  previewHours2,
  previewHours2Label = 'Hours2',
  previewLabel = "Label ('Preview', 'Opening NIght', etc)",
  previewLabelValue,
  previewOn = 'false',
  previewToggleLabel = 'Preview/ Reception',
  viewingLabel = "Label ('Open to public')",
  viewingLabelValue,
  viewingDates,
  viewingDatesLabel = 'Date(s)',
  viewingHours1,
  viewingHours1Label = 'Hours1',
  viewingHours2,
  viewingHours2Label = 'Hours2',
}: ViewingsListCardFormProps) => {
  const [previewOnState, setPreviewOnState] = React.useState(previewOn === 'true');
  React.useEffect(() => {
    setPreviewOnState(previewOn === 'true');
  }, [previewOn]);
  return (
    <>
      <Input
        id={`previewOn-${id}`}
        type="toggle"
        labelText={previewToggleLabel}
        size="md"
        defaultChecked={previewOnState}
        inline
        invalid={invalidFields?.previewOn}
        invalidText={invalidFields?.previewOn}
        value={true}
        name="previewOn"
        onChange={() => setPreviewOnState((oldState) => !oldState)}
      />
      {!previewOnState ? <input type="hidden" name="previewOn" value={'false'} /> : null}

      <div
        className={classnames(`${baseClass}__preview-set`, { [`${baseClass}__preview-set--hidden`]: !previewOnState })}
      >
        <Input
          id={`previewLabel-${id}`}
          name="previewLabelValue"
          defaultValue={previewLabelValue}
          labelText={previewLabel}
          size="sm"
          invalid={invalidFields?.previewLabelValue}
          invalidText={invalidFields?.previewLabelValue}
          hidden={!previewOnState}
        />
        <Input
          id={`previewDates-${id}`}
          name="previewDates"
          defaultValue={previewDates}
          labelText={previewDatesLabel}
          size="sm"
          invalid={invalidFields?.previewDates}
          invalidText={invalidFields?.previewDates}
          hidden={!previewOnState}
        />
        <Input
          id={`previewHours1-${id}`}
          name="previewHours1"
          defaultValue={previewHours1}
          labelText={previewHours1Label}
          size="sm"
          invalid={invalidFields?.previewHours1}
          invalidText={invalidFields?.previewHours1}
          hidden={!previewOnState}
        />
        <Input
          id={`previewHours2-${id}`}
          name="previewHours2"
          defaultValue={previewHours2}
          labelText={previewHours2Label}
          size="sm"
          invalid={invalidFields?.previewHours2}
          invalidText={invalidFields?.previewHours2}
          hidden={!previewOnState}
        />
      </div>

      <Input
        id={`viewingLabel-${id}`}
        name="viewingLabelValue"
        defaultValue={viewingLabelValue}
        labelText={viewingLabel}
        size="sm"
        invalid={invalidFields?.viewingLabelValue}
        invalidText={invalidFields?.viewingLabelValue}
      />
      <Input
        id={`viewingDates-${id}`}
        name="viewingDates"
        defaultValue={viewingDates}
        labelText={viewingDatesLabel}
        size="sm"
        invalid={invalidFields?.viewingDates}
        invalidText={invalidFields?.viewingDates}
      />
      <Input
        id={`viewingHours1-${id}`}
        name="viewingHours1"
        defaultValue={viewingHours1}
        labelText={viewingHours1Label}
        size="sm"
        invalid={invalidFields?.viewingHours1}
        invalidText={invalidFields?.viewingHours1}
      />
      <Input
        id={`viewingHours2-${id}`}
        name="viewingHours2"
        defaultValue={viewingHours2}
        labelText={viewingHours2Label}
        size="sm"
        invalid={invalidFields?.viewingHours2}
        invalidText={invalidFields?.viewingHours2}
      />
      <Input
        id={`address1-${id}`}
        name="address1"
        defaultValue={address1}
        labelText={address1Label}
        size="sm"
        invalid={invalidFields?.address1}
        invalidText={invalidFields?.address1}
      />
      <Input
        id={`address2-${id}`}
        name="address2"
        defaultValue={address2}
        labelText={address2Label}
        size="sm"
        invalid={invalidFields?.address2}
        invalidText={invalidFields?.address2}
      />
      <Input
        id={`address3-${id}`}
        name="address3"
        defaultValue={address3}
        labelText={address3Label}
        size="sm"
        invalid={invalidFields?.address3}
        invalidText={invalidFields?.address3}
      />
      <Input
        id={`addressUrl-${id}`}
        name="addressUrl"
        defaultValue={addressUrl}
        labelText={addressUrlLabel}
        size="sm"
        type="url"
        invalid={invalidFields?.addressUrl}
        invalidText={invalidFields?.addressUrl}
      />
    </>
  );
};

export default ViewingsListCardForm;
