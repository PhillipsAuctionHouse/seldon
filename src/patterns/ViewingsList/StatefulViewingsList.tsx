import * as React from 'react';

import ViewingsList from './ViewingsList';
import { ViewingsListCardProps } from './ViewingsListCard';
import { I18nObject } from './ViewingsList';

export interface StatefulViewingsListProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Existing viewings to populate the list
   */
  defaultViewing?: ViewingsListCardProps[];
  /**
   * Optional strings to pass for the form and button labels
   */
  i18n?: I18nObject;
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

const StatefulViewingsList = React.forwardRef<HTMLDivElement, StatefulViewingsListProps>(
  ({ defaultViewing, i18n, validate = () => undefined, onDelete = () => undefined, onSave, ...props }, ref) => {
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
      });
    };

    return (
      <ViewingsList
        ref={ref}
        {...props}
        i18n={i18n}
        viewings={viewings}
        onDelete={handleOnDelete}
        onAdd={handleOnAdd}
        onSave={(e) => onSave(e, setViewings, validate)}
      />
    );
  },
);

StatefulViewingsList.displayName = 'StatefulViewingsList';

export default StatefulViewingsList;
