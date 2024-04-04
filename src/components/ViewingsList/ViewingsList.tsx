import * as React from 'react';
import classnames from 'classnames';

import { px } from '../../utils';
import ViewingsListCard, { ViewingsListCardProps } from './ViewingsListCard';
import Button from '../Button/Button';

export interface I18nObject {
  address1Label?: string;
  addressUrlLabel?: string;
  address2Label?: string;
  address3Label?: string;
  addViewingsBtnLabel?: string;
  cancelBtnLabel?: string;
  deleteBtnLabel?: string;
  editBtnLabel?: string;
  enableOnSiteToggleLabel?: string;
  emailLabel?: string;
  emailLink?: string;
  emailLinkLabel?: string;
  emailToggleLabel?: string;
  locationLabel?: string;
  previewDatesLabel?: string;
  previewHours1Label?: string;
  previewHours2Label?: string;
  previewLabel?: string;
  previewToggleLabel?: string;
  saveBtnLabel?: string;
  viewingLabel?: string;
  viewingDatesLabel?: string;
  viewingHours1Label?: string;
  viewingHours2Label?: string;
}

export interface ViewingsListProps {
  /**
   * String for Viewing cards that gets nuber appended. EX: 'Title {x}`
   */
  cardTitle?: string;
  /**
   * Unique id for component
   */
  id?: string;
  /**
   * Optional strings to pass for the form and button labels
   */
  i18n?: I18nObject;
  /**
   * Title for Viewings list
   */
  title?: string;
  /**
   * Array of viewings objects
   */
  viewings?: ViewingsListCardProps[] | [];
  /**
   * Method for removing a viewing from the list
   */
  onAdd?: (id: string) => void;
  /**
   * Method for removing a viewing from the list
   */
  onDelete?: (id: string) => void;
  /**
   * Method used to persist changes to a particular view
   */
  onSave: (e: React.MouseEvent<HTMLElement>) => boolean;
}

const getRandomNum = () => Math.floor(Math.random() * 100) + Date.now();

const ViewingsList = ({
  cardTitle = 'Viewing Details',
  id,
  i18n = {},
  onAdd,
  onDelete,
  onSave,
  title,
  viewings,
}: ViewingsListProps) => {
  const [viewingList, setViewingsList] = React.useState(viewings);
  const [hasUnsavedData, setHasUnsavedData] = React.useState('');
  const [oldState, setOldState] = React.useState<ViewingsListCardProps | string>();
  React.useEffect(() => {
    setViewingsList(viewings);
  }, [viewings]);
  const { addViewingsBtnLabel = 'ADD VIEWINGS' } = i18n;
  const handleOnAdd = () => {
    const uuid = `${getRandomNum()}${viewingList ? '-' + viewingList.length : ''}`;
    setHasUnsavedData(uuid);
    setOldState(uuid);
    if (onAdd) onAdd(uuid);
  };

  const handleOnDelete = (viewingId: string) => {
    setHasUnsavedData('');
    typeof onDelete === 'function' && onDelete(viewingId);
  };

  const handleOnEdit = (viewingId: string) => {
    setHasUnsavedData(viewingId);
    setOldState(viewingList?.find((view) => view.id === viewingId));
  };

  const handleOnSave = (e: React.MouseEvent<HTMLElement>) => {
    if (onSave(e)) {
      setHasUnsavedData('');
    }
  };

  const handleOnCancel = () => {
    if (typeof oldState === 'string') {
      typeof onDelete === 'function' && onDelete(oldState);
    } else if (hasUnsavedData === oldState?.id) {
      setViewingsList((prevViewings) => prevViewings?.map((el) => (el.id === oldState.id ? oldState : el)));
    }
    setHasUnsavedData('');
  };

  return (
    <div className={classnames(`${px}-viewings-list`)} id={id} key={hasUnsavedData}>
      <h2 className={classnames(`${px}-viewings-list__title`)}>{title}</h2>
      {viewingList?.map((item, index) => (
        <ViewingsListCard
          key={`${item.id}`}
          {...item}
          {...i18n}
          cardTitle={!item.location ? undefined : `${cardTitle} ${index + 1}`}
          editState={hasUnsavedData === item.id}
          onCancel={handleOnCancel}
          onDelete={handleOnDelete}
          onEdit={() => handleOnEdit(item.id)}
          onSave={handleOnSave}
        />
      ))}
      <Button id={`viewings-list-add-btn-${id || getRandomNum()}`} size="sm" onClick={handleOnAdd}>
        {addViewingsBtnLabel}
      </Button>
    </div>
  );
};

export default ViewingsList;
