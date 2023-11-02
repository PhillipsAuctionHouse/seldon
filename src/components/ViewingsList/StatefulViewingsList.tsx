import * as React from 'react';

import ViewingsList, { ViewingsListProps } from './ViewingsList';
import { ViewingsListCardProps } from './ViewingsListCard';

export interface StatefulViewingsListProps extends Omit<ViewingsListProps, 'onSave'> {
  defaultViewing?: ViewingsListCardProps[];
  validate?: ((e: ViewingsListCardProps) => object | undefined) | (() => object);
  /**
   * Method used to persist changes to a particular view
   */
  onSave: (
    e: React.MouseEvent<HTMLElement>,
    cb: React.Dispatch<React.SetStateAction<ViewingsListCardProps[]>>,
    validateCb: (e: ViewingsListCardProps) => object | undefined,
  ) => boolean;
}

const StatefulViewingsList = ({
  defaultViewing,
  validate = () => undefined,
  onSave,
  ...props
}: StatefulViewingsListProps) => {
  const [viewings, setViewings] = React.useState<ViewingsListCardProps[]>(defaultViewing as ViewingsListCardProps[]);
  const handleOnDelete = (id: string) => {
    setViewings((prevViewings) => prevViewings?.filter((el) => el.id !== id));
    // persist to database
  };

  return (
    <ViewingsList
      {...props}
      viewings={viewings}
      onDelete={handleOnDelete}
      onSave={(e) => onSave(e, setViewings, validate)}
    />
  );
};

export default StatefulViewingsList;
