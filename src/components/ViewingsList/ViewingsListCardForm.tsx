import classnames from 'classnames';
import * as React from 'react';

import { px } from '../../utils';
import Input from '../Input/Input'

export interface ViewingsListCardFormProps {
  /**
  * Title of card
  */
  cardTitle?: string;
  /**
   * Default boolean to determine whether viewing is enabled on site
   */
  enableOnSite?: boolean;
  /**
   * Label for enable on site toggle
   */
  enableOnSiteToggleLabel?: string;
  /**
   * Location of viewing
   */
  location?: string;
  /**
   * Location of viewing
   */
  locationLabel?: string;
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
  previewOn?: boolean;
  /**
   * Label for preview sectioin toggle
   */
  previewToggleLabel?: string;
  /**
   * Button contents
   */
  children: React.ReactNode
  /**
  * Unique id for component
  */
  id?: string ;
  /**
   * Optional click handler
   */
  onClick?: () => void;
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

const baseClass = `${px}-viewings-list-card-form`

const ViewingsListCardForm = ({
  cardTitle = 'Add New Viewing',
  children,
  enableOnSite,
  enableOnSiteToggleLabel = "Enabled on website",
  id,
  location,
  locationLabel,
  previewDates,
  previewDatesLabel = 'Date(s)',
  previewHours1,
  previewHours1Label = 'Hours1',
  previewHours2,
  previewHours2Label = 'Hours2',
  previewLabel = 'Label',
  previewLabelValue,
  previewOn,
  previewToggleLabel = 'Preview/ Reception',
  viewingLabel = 'Label',
  viewingLabelValue,
  viewingDates,
  viewingDatesLabel = 'Date(s)',
  viewingHours1,
  viewingHours1Label = 'Hours1',
  viewingHours2,
  viewingHours2Label = 'Hours2',
  ...props
}: ViewingsListCardFormProps) => {
  const [previewOnState, setPreviewOnState] = React.useState(previewOn);
  return (
    <section
      data-testid={id ? `ViewingsListCardForm-${id}` : `ViewingsListCardForm`}
      id={id}
      className={classnames(`${baseClass}`)}
      {...props}
    >
      <h2>{cardTitle}</h2>
      <Input id="location" defaultValue={location} labelText={locationLabel} size="sm" />
      <Input id="previewOn" type="toggle" defaultValue={previewOn} labelText={previewToggleLabel} size="md" inline onChange={() => setPreviewOnState(oldState => !oldState)}/>
      {
        previewOnState ?
        (
          <>
            <div className={classnames(`${baseClass}__preview-set`)}>
              <Input id="previewLabel" defaultValue={previewLabelValue} labelText={previewLabel} size="sm" />
              <Input id="previewDates" defaultValue={previewDates} labelText={previewDatesLabel} size="sm" />
              <Input id="previewHours1" defaultValue={previewHours1} labelText={previewHours1Label} size="sm" />
              <Input id="previewHours2" defaultValue={previewHours2} labelText={previewHours2Label} size="sm" />
            </div>
          </>
        ) : null
      }
      <Input id="viewingLabel" defaultValue={viewingLabelValue} labelText={viewingLabel} size="sm" />
      <Input id="viewingDates" defaultValue={viewingDates} labelText={viewingDatesLabel} size="sm" />
      <Input id="viewingHours1" defaultValue={viewingHours1} labelText={viewingHours1Label} size="sm" />
      <Input id="viewingHours2" defaultValue={viewingHours2} labelText={viewingHours2Label} size="sm" />
      <Input id="previewOn" type="toggle" defaultValue={enableOnSite} labelText={enableOnSiteToggleLabel} size="md" inline onChange={() => setPreviewOnState(oldState => !oldState)}/>
    </section>
  );
};

export default ViewingsListCardForm;
