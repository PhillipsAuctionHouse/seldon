import classnames from 'classnames';
import * as React from 'react';

import { px, noOp } from '../../utils';
import ViewingsListCard, { ViewingsListCardProps } from './ViewingsListCard';
import Button from '../Button/Button';

export interface ViewingsListProps {
  id?: string;
  title?: string;
  viewings?: ViewingsListCardProps[];
  onDelete?: (id: string) => void;
  onSave?: (e: React.MouseEvent<HTMLElement>) => void;
}

const ViewingsList = ({ id, onDelete = noOp, onSave = noOp, title, viewings = [] }: ViewingsListProps) => {
  const [viewingList, setViewingsList] = React.useState(viewings);
  const [hasUnsavedData, setHasUnsavedData] = React.useState('');
  const random = Math.floor(Math.random() * 100) + Date.now();
  console.log('ID VALUE:', id);
  React.useEffect(() => {
    console.log('UPDate:', viewings);
    setViewingsList(viewings);
  }, [viewings]);

  const handleOnDelete = (id: string) => {
    setHasUnsavedData('');
    onDelete(id);
  };

  const handleOnSave = (e: React.MouseEvent<HTMLElement>) => {
    setHasUnsavedData('');
    onSave(e);
  };

  const handleOnCancel = () => {
    setHasUnsavedData('');
    setViewingsList(viewings);
  };

  return (
    <div className={classnames(`${px}-viewings-list`)}>
      <h2 className={classnames(`${px}-viewings-list__title`)}>{title}</h2>
      {viewingList?.map((item) => (
        <ViewingsListCard
          key={`${item.id}`}
          {...item}
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
            const uuid = `${random}-${prevList.length}`;
            setHasUnsavedData(uuid);
            return [...prevList, { id: uuid }];
          })
        }
      >
        ADD VIEWING
      </Button>
    </div>
  );
};

export default ViewingsList;
