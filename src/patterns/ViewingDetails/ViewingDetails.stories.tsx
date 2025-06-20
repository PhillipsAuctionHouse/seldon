import { Meta } from '@storybook/react/*';

import ViewingDetails, { ViewingDetailsProps } from './ViewingDetails';
import { viewingDetailsProps, viewingDetailsWithChildrenProps } from './ViewingDetailsMock';

export default {
  title: 'Patterns/ViewingDetails',
  component: ViewingDetails,
} satisfies Meta<typeof ViewingDetails>;

export const Playground = (props: ViewingDetailsProps) => (
  <ViewingDetails key={`${props.id}`} {...props} style={{ maxWidth: '480px' }} />
);

Playground.args = {
  ...viewingDetailsProps,
};

export const WithChildren = (props: ViewingDetailsProps) => (
  <ViewingDetails key={`${props.id}`} {...props} style={{ maxWidth: '480px' }} />
);

WithChildren.args = {
  ...viewingDetailsWithChildrenProps,
};
