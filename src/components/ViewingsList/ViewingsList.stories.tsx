import type { Meta } from '@storybook/react';

import StatefulViewingsList, { StatefulViewingsListProps } from './StatefulViewingsList';
import { defaultViewing, i18n, handleOnSave, validate } from './utils';

const meta = {
  title: 'Components/ViewingsList',
  component: StatefulViewingsList,

  argTypes: {
    defaultViewing: {
      control: 'object',
    },
    title: {
      control: { type: 'text' },
    },
    id: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof StatefulViewingsList>;

export default meta;

export const Playground = (props: StatefulViewingsListProps) => (
  <StatefulViewingsList {...props} validate={validate} onSave={handleOnSave} />
);

Playground.args = {
  cardTitle: 'Viewing Details',
  id: 'myViewingsListId',
  title: 'Tour Viewing(s) on Overview Tab',
};

export const WithViewing = (props: StatefulViewingsListProps) => (
  <StatefulViewingsList {...props} validate={validate} onSave={handleOnSave} />
);

WithViewing.args = {
  cardTitle: 'Viewing Details',
  defaultViewing,
  id: 'myViewingsListId',
  title: 'Tour Viewing(s) on Overview Tab',
};

export const WithTranslatedStrings = (props: StatefulViewingsListProps) => (
  <StatefulViewingsList {...props} validate={validate} onSave={handleOnSave} />
);

WithTranslatedStrings.args = {
  cardTitle: 'Viewing Details',
  defaultViewing,
  id: 'myViewingsListId',
  i18n,
  title: 'Tour Viewing(s) on Overview Tab',
};
