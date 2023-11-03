import * as React from 'react';

import ViewingsList from './ViewingsList';
import { ViewingsListCardProps } from './ViewingsListCard';

export interface StatefulViewingsListProps extends  Record<string, unknown>{
  /**
   * Existing viewings to populate the list
   */
  defaultViewing?: ViewingsListCardProps[];
  /**
   * Optional validations script to be ran when Viewing list is updated and saved
   */
  validate?: ((e: ViewingsListCardProps) => object | undefined) | (() => object);
  /**
   * Method for removing a viewing from the list
   */
  onDelete?: (id: string) => void;
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
  onDelete = () => undefined,
  onSave,
  ...props
}: StatefulViewingsListProps) => {
  const [viewings, setViewings] = React.useState<ViewingsListCardProps[]>(defaultViewing as ViewingsListCardProps[]);
  const handleOnDelete = (id: string) => {
    setViewings((prevViewings) => prevViewings?.filter((el) => el.id !== id));
    // persist to database
    onDelete(id);
  };

  const handleOnAdd = (id: string) => {
    setViewings((prevViewings) => {
      if (prevViewings) {
        return [...prevViewings, { id }];
      }
      return [{ id }];
    })
  }

  return (
    <ViewingsList
      {...props}
      viewings={viewings}
      onDelete={handleOnDelete}
      onAdd={handleOnAdd}
      onSave={(e) => onSave(e, setViewings, validate)}
    />
  );
};

export default StatefulViewingsList;
