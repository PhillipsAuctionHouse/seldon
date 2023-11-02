import type { Meta } from '@storybook/react';

import ViewingsList, { ViewingsListProps } from './ViewingsList';
import StatefulViewingsList from './StatefulViewingsList';
import { defaultViewing, handleOnSave, validate } from './utils';

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

export const Playground = (props: ViewingsListProps) => (
  <StatefulViewingsList {...props}  validate={validate} onSave={handleOnSave} />
);

Playground.args = {
  title: 'Tour Viewing(s) on Overview Tab',
  id: 'myViewingsListId',
  cardTitle: 'Viewing Details',
};

export const WithViewing = (props: ViewingsListProps) => (
  <StatefulViewingsList {...props}  validate={validate} onSave={handleOnSave} defaultViewing={defaultViewing}/>
);

WithViewing.args = {
  title: 'Tour Viewing(s) on Overview Tab',
  id: 'myViewingsListId',
  cardTitle: 'Viewing Details',
};
