import * as React from 'react';

import { px, noOp } from '../../utils';
import Input from '../Input/Input';
import Button from '../Button/Button';
import ViewingsListCardForm, { ViewingsListCardFormProps } from './ViewingsListCardForm';

export interface ViewingsListCardProps extends ViewingsListCardFormProps, Record<string, unknown> {
  /**
   * Title of card
   */
  cardTitle?: string;
  /**
   * Default state determining if in edit mode
   */
  defaultEditState?: boolean;
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
   * Location of viewing
   */
  hasUnsavedData?: boolean;
  /**
   * Unique id for component
   */
  id: string;
  /**
   * Validation error message object
   */
  invalidFields?: {
    address1: string | undefined;
    address1Url: string | undefined;
    address2: string | undefined;
    address3: string | undefined;
    location: string | undefined;
    previewDates: string | undefined;
    previewHours1: string | undefined;
    previewHours2: string | undefined;
    previewLabelValue: string | undefined;
    previewOn: string | undefined;
    viewingLabelValue: string | undefined;
    viewingDates: string | undefined;
    viewingHours1: string | undefined;
    viewingHours2: string | undefined;
  };
  /**
   * Callback for when Viewings edits are cancelled
   */
  onCancel?: () => void;
  /**
   * Callback for when Viewings item is deleted
   */
  onDelete?: (id: string) => void;
  /**
   * Callback for when Viewings item is placed in an editable mode
   */
  onEdit?: () => void;
  /**
   * Callback for when form is saved/submitted
   */
  onSave?: (e: React.MouseEvent<HTMLElement>) => void;
}

const baseClass = `${px}-viewings-list-card`;

const ViewingsListCard = ({
  address1,
  address1Label = 'Address (\'432 Park Ave\', ETC)',
  addressUrl,
  addressUrlLabel = 'URL for map link (\'http://www.website.com\')',
  address2,
  address2Label = 'City, State, Zip (\'New York, NY 10019\')',
  address3,
  address3Label = 'Country (United States)',
  cardTitle = 'Add New Viewing',
  enableOnSite = false,
  enableOnSiteToggleLabel = 'Enabled on website',
  hasUnsavedData,
  id,
  invalidFields,
  location,
  locationLabel = 'Location',
  onCancel = noOp,
  onEdit = noOp,
  onDelete = noOp,
  onSave = noOp,
  previewDates,
  previewDatesLabel = 'Date(s)',
  previewHours1,
  previewHours1Label = 'Hours1',
  previewHours2,
  previewHours2Label = 'Hours2',
  previewLabel = 'Label (\'Preview\', \'Opening NIght\', etc)',
  previewLabelValue,
  previewOn = false,
  previewToggleLabel = 'Preview/ Reception',
  viewingLabel = 'Label (\'Open to public\')',
  viewingLabelValue,
  viewingDates,
  viewingDatesLabel = 'Date(s)',
  viewingHours1,
  viewingHours1Label = 'Hours1',
  viewingHours2,
  viewingHours2Label = 'Hours2',
  ...props
}: ViewingsListCardProps) => {
  const [editState, setEditState] = React.useState(hasUnsavedData);
  const [enableOnSiteState, setEnableOnSiteState] = React.useState(enableOnSite);
  const firstInput = React.useRef<HTMLInputElement>(null);
  React.useEffect(
    () => {
      if (editState && firstInput.current) {
        firstInput.current.focus();
      }
    }, [editState]
  );

  React.useEffect(
    () => {
      setEnableOnSiteState(enableOnSite);
    }, [enableOnSite]
  );


  const handleOnCancel = () => {
    setEditState(false);
    onCancel();
  };

  const handleOnEdit = () => {
    setEditState(true);
    // onEdit();
  };

  const handleOnSave = (e: React.MouseEvent<HTMLElement>) => {
    setEditState(false);
    onSave(e);
  };

  return (
    <section
      data-testid={`ViewingsListCard-${id}`}
      id={id}
      className={`${baseClass}`}
      // {...props}
    >
      <h3 className={`${baseClass}__title`}>{cardTitle}</h3>
      <input type="hidden" name="id" value={id}/>
      <Input ref={firstInput} id={`location-${id}`} defaultValue={location} labelText={locationLabel} size="sm" name="location" readOnly={!editState}/>
      {
        editState ?
          <ViewingsListCardForm
            address1={address1}
            address1Label={address1Label}
            addressUrl={addressUrl}
            addressUrlLabel={addressUrlLabel}
            address2={address2}
            address2Label={address2Label}
            address3={address3}
            address3Label={address3Label}
            id={id}
            invalidFields={invalidFields}
            previewDates={previewDates}
            previewDatesLabel={previewDatesLabel}
            previewHours1={previewHours1}
            previewHours1Label={previewHours1Label}
            previewHours2={previewHours2}
            previewHours2Label={previewHours2Label}
            previewLabel={previewLabel}
            previewLabelValue={previewLabelValue}
            previewOn={previewOn}
            previewToggleLabel={previewToggleLabel}
            viewingLabel={viewingLabel}
            viewingLabelValue={viewingLabelValue}
            viewingDates={viewingDates}
            viewingDatesLabel={viewingDatesLabel}
            viewingHours1={viewingHours1}
            viewingHours1Label={viewingHours1Label}
            viewingHours2={viewingHours2}
            viewingHours2Label={viewingHours2Label}
          />
        : null
      }
      <Input
        id={`enableOnSite-${id}`}
        type="toggle"
        defaultChecked={enableOnSite}
        labelText={enableOnSiteToggleLabel}
        size="md"
        inline
        value="true"
        name="enableOnSite"
        onChange={() => setEnableOnSiteState((oldState) => !oldState)}
        readOnly={!editState}
      />
      {!enableOnSiteState ? <input type="hidden" name="enableOnSite" value={'false'}/> : null }
      <hr/>
      <div className={`${baseClass}__btn-group`}>
        {
          editState ?
            <>
              <Button id={`vlc-save-btn-${id}`} buttonType="ghost" type="submit" size='sm' onClick={handleOnSave}>
                SAVE DETAILS
              </Button>
              <Button id={`vlc-cancel-btn-${id}`} buttonType="ghost" type="button" size='sm' onClick={handleOnCancel}>
                CANCEL
              </Button>
            </>
          : <>
              <Button id={`vlc-edit-btn-${id}`} buttonType="ghost" type="button" size='sm' onClick={handleOnEdit}>
                EDIT
              </Button>
              <Button id={`vlc-delete-btn-${id}`} buttonType="ghost" type="button" size='sm' onClick={() => onDelete(id)}>
                DELETE
              </Button>
            </>
        }
      </div>

    </section>
  );
};

export default ViewingsListCard;
