import * as React from 'react';
import classnames from 'classnames';

import { px } from '../../utils';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import ViewingsListCardForm, { ViewingsListCardFormProps } from './ViewingsListCardForm';

export interface ViewingsListCardProps extends ViewingsListCardFormProps, Record<string, unknown> {
  /**
   * Title of card
   */
  cardTitle?: string;
  /**
   * Optional string to pass for cancel button
   */
  cancelBtnLabel?: string;
  /**
   * Optional string to pass for delete button
   */
  deleteBtnLabel?: string;
  /**
   * Optional string to pass for edit button
   */
  editBtnLabel?: string;
  /**
   * Location of viewing
   */
  isEditState?: boolean;
  /**
   * Default boolean to determine whether viewing is enabled on site
   */
  enableOnSite?: string;
  /**
   * Label for enable on site toggle
   */
  enableOnSiteToggleLabel?: string;
  /**
   * Email value:
   */
  email?: string;
  /**
   * Label for email input:
   */
  emailLabel?: string;
  /**
   * EmailLink value
   */
  emailLink?: string;
  /**
   * Label for email Link input:
   */
  emailLinkLabel?: string;
  /**
   * Email toggle
   */
  emailOn?: string;
  /**
   * Label for email toggle
   */
  emailToggleLabel?: string;
  /**
   * Location of viewing
   */
  location?: string;
  /**
   * Location of viewing
   */
  locationLabel?: string;
  /**
   * Unique id for component
   */
  id: string;
  /**
   * Validation error message object
   */
  invalidFields?: {
    address1?: string | undefined;
    address1Url?: string | undefined;
    address2?: string | undefined;
    address3?: string | undefined;
    emailLabel?: string | undefined;
    emailOn?: string | undefined;
    emailToggleLabel?: string | undefined;
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
  };
  /**
   * Callback for when Viewings edits are cancelled
   */
  onCancel?: () => void | unknown;
  /**
   * Callback for when Viewings item is deleted
   */
  onDelete?: (id: string) => void | unknown;
  /**
   * Callback for when Viewings item is placed in an editable mode
   */
  onEdit?: () => void | unknown;
  /**
   * Callback for when form is saved/submitted
   */
  onSave?: (e: React.MouseEvent<HTMLElement>) => void | unknown;
  /**
   * Optional string to pass for edit button
   */
  saveBtnLabel?: string;
}

const baseClass = `${px}-viewings-list-card`;

const ViewingsListCard = ({
  address1,
  address1Label,
  addressUrl,
  addressUrlLabel,
  address2,
  address2Label,
  address3,
  address3Label,
  cancelBtnLabel = 'CANCEL',
  cardTitle = 'Add New Viewing',
  deleteBtnLabel = 'DELETE',
  editBtnLabel = 'EDIT',
  isEditState: editState,
  enableOnSite = 'false',
  enableOnSiteToggleLabel = 'Enabled on website',
  email,
  emailLabel = 'Email',
  emailLink,
  emailLinkLabel = 'Email Address',
  emailOn = 'false',
  emailToggleLabel = 'Include Email Address',
  id,
  invalidFields,
  location,
  locationLabel = 'Location',
  onCancel,
  onEdit,
  onDelete,
  onSave,
  previewDates,
  previewDatesLabel,
  previewHours1,
  previewHours1Label,
  previewHours2,
  previewHours2Label,
  previewLabel,
  previewLabelValue,
  previewOn,
  previewToggleLabel,
  saveBtnLabel = 'SAVE DETAILS',
  viewingLabel,
  viewingLabelValue,
  viewingDates,
  viewingDatesLabel,
  viewingHours1,
  viewingHours1Label,
  viewingHours2,
  viewingHours2Label,
}: ViewingsListCardProps) => {
  const [enableOnSiteState, setEnableOnSiteState] = React.useState(enableOnSite === 'true');
  const firstInput = React.useRef<HTMLInputElement>(null);
  // Focus on first input when in edit mode
  React.useEffect(() => {
    if (editState && firstInput.current) {
      firstInput.current.focus();
    }
  }, [editState]);

  // If invalid fields focus on the first input in invalid state
  React.useEffect(() => {
    if (invalidFields && firstInput.current) {
      firstInput.current
        .closest(`.${px}-viewings-list-card`)
        ?.querySelector<HTMLInputElement>(`.${px}-input--invalid input`)
        ?.focus();
    }
  }, [invalidFields]);

  const handleOnCancel = () => {
    if (typeof onCancel === 'function') onCancel();
  };

  const handleOnEdit = () => {
    if (typeof onEdit === 'function') onEdit();
  };

  const handleOnSave = (e: React.MouseEvent<HTMLElement>) => {
    if (typeof onSave === 'function') onSave(e);
  };

  return (
    <section
      data-testid={`viewings-list-card-${id}`}
      id={id}
      className={classnames(`${baseClass}`, { [`${baseClass}--edit-state`]: editState })}
    >
      <h3 className={`${baseClass}__title`}>{cardTitle}</h3>
      <input type="hidden" name="id" value={id} />
      <Input
        ref={firstInput}
        id={`location-${id}`}
        defaultValue={location}
        labelText={locationLabel}
        size="sm"
        name="location"
        invalid={!!invalidFields?.location}
        invalidText={invalidFields?.location}
        readOnly={!editState}
      />
      {editState ? (
        <ViewingsListCardForm
          address1={address1}
          address1Label={address1Label}
          addressUrl={addressUrl}
          addressUrlLabel={addressUrlLabel}
          address2={address2}
          address2Label={address2Label}
          address3={address3}
          address3Label={address3Label}
          email={email}
          emailLabel={emailLabel}
          emailLink={emailLink}
          emailLinkLabel={emailLinkLabel}
          emailOn={emailOn}
          emailToggleLabel={emailToggleLabel}
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
      ) : null}
      <Input
        id={`enableOnSite-${id}`}
        type="toggle"
        defaultChecked={enableOnSite === 'true'}
        labelText={enableOnSiteToggleLabel}
        size="md"
        inline
        value="true"
        name="enableOnSite"
        onChange={() => setEnableOnSiteState((oldState) => !oldState)}
        readOnly={!editState}
      />
      {!enableOnSiteState ? <input type="hidden" name="enableOnSite" value="false" /> : null}
      <hr />
      <div className={`${baseClass}__btn-group ${px}-button__group`}>
        {editState ? (
          <>
            <Button id={`vlc-save-btn-${id}`} variant={ButtonVariants.tertiary} type="submit" onClick={handleOnSave}>
              {saveBtnLabel}
            </Button>
            <Button
              id={`vlc-cancel-btn-${id}`}
              variant={ButtonVariants.tertiary}
              type="button"
              onClick={handleOnCancel}
            >
              {cancelBtnLabel}
            </Button>
          </>
        ) : (
          <>
            <Button id={`vlc-edit-btn-${id}`} variant={ButtonVariants.tertiary} type="button" onClick={handleOnEdit}>
              {editBtnLabel}
            </Button>
            <Button
              id={`vlc-delete-btn-${id}`}
              variant={ButtonVariants.tertiary}
              type="button"
              onClick={() => typeof onDelete === 'function' && onDelete(id)}
            >
              {deleteBtnLabel}
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default ViewingsListCard;
