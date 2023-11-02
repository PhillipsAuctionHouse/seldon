import classnames from 'classnames';
import * as React from 'react';

import { px } from '../../utils';
import ViewingsListCard, { ViewingsListCardProps } from './ViewingsListCard';
import Button from '../Button/Button';

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
  onDelete?: (id: string) => void;
  /**
   * Method used to persist changes to a particular view
   */
  onSave: (e: React.MouseEvent<HTMLElement>) => boolean;
}

const ViewingsList = ({
  cardTitle = 'Viewing Details',
  id,
  onDelete,
  onSave,
  title,
  viewings,
}: ViewingsListProps) => {
  const [viewingList, setViewingsList] = React.useState(viewings);
  const [hasUnsavedData, setHasUnsavedData] = React.useState('');
  const random = Math.floor(Math.random() * 100) + Date.now();
  React.useEffect(() => {
    setViewingsList(viewings);
  }, [viewings]);

  const handleOnDelete = (viewingId: string) => {
    setHasUnsavedData('');
    typeof onDelete === 'function' && onDelete(viewingId);
  };

  const handleOnSave = (e: React.MouseEvent<HTMLElement>) => {
    if (onSave(e)) {
      setHasUnsavedData('');
    }
  };

  const handleOnCancel = () => {
    setHasUnsavedData('');
    setViewingsList(viewings);
  };

  return (
    <div className={classnames(`${px}-viewings-list`)} id={id}>
      <h2 className={classnames(`${px}-viewings-list__title`)}>{title}</h2>
      {viewingList?.map((item, index) => (
        <ViewingsListCard
          key={`${item.id}`}
          {...item}
          cardTitle={!item.location ? undefined : `${cardTitle} ${index + 1}`}
          onCancel={handleOnCancel}
          onDelete={handleOnDelete}
          onEdit={() => setHasUnsavedData(item.id)}
          onSave={handleOnSave}
          hasUnsavedData={hasUnsavedData === item.id}
        />
      ))}
      <Button
        id={`viewings-list-add-btn-${id || random}`}
        size="sm"
        onClick={() =>
          setViewingsList((prevList) => {
            const uuid = `${random}${prevList ? '-' + prevList.length : ''}`;
            setHasUnsavedData(uuid);
            if (prevList) {
              return [...prevList, { id: uuid }];
            }
            return [{ id: uuid }]
          })
        }
      >
        ADD VIEWING
      </Button>
    </div>
  );
};

export default ViewingsList;
