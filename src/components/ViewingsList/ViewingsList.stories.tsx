import type { Meta } from '@storybook/react';
import * as React from 'react';

import ViewingsList, { ViewingsListProps } from './ViewingsList';
import { ViewingsListCardProps } from './ViewingsListCard';

const meta = {
  title: 'Components/ViewingsList',
  component: ViewingsList,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'string' },
    id: { control: 'string' },
    onSave: {
      control: 'action',
    },
  },
} satisfies Meta<typeof ViewingsList>;

export default meta;

const StatefulViewingsList = (props: ViewingsListProps) => {
  const [viewings, setViewings] = React.useState<ViewingsListCardProps[]>([]);
  const handleOnDelete = (id: string) => {
    setViewings((prevViewings) => prevViewings.filter((el) => el.id !== id));
  };
  const handleOnSave = (e: React.MouseEvent<HTMLElement>) => {
    // e.preventDefault();
    const targ = e?.target as HTMLElement;
    const inputs = targ.closest('.phillips-viewings-list-card')?.querySelectorAll('input');
    // const form = targ?.closest('form');
    // const data = form && new FormData(form as HTMLFormElement)
    // const formJson = data && Object.fromEntries(data.entries());
    // const newId = Array.from(inputs as ArrayLike<HTMLInputElement>)?.filter(input => input.name === 'id')[0].value;
    // const existingEl = viewings.find(viewing => viewing.id ===  newId )

    const el: ViewingsListCardProps = { id: '' };
    inputs?.forEach((input) => {
      el[input.name] = input.value;
    });
    console.log(el);
    setViewings((prevViewings) => {
      const unique = prevViewings.filter((view) => {
        return view.id !== el.id;
      });
      const returnValue = [...unique, el as ViewingsListCardProps];
      return returnValue;
    });
  };
  return <ViewingsList {...props} viewings={viewings} onDelete={handleOnDelete} onSave={handleOnSave} />;
};

export const Playground = (props: ViewingsListProps) => <StatefulViewingsList {...props} />;

Playground.args = {
  title: 'Tour Viewing(s) on Overview Tab',
  id: 'myViewingsListId',
};
