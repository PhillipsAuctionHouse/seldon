import type { Meta } from '@storybook/react';
import ViewingsListCard, { ViewingsListCardProps } from './ViewingsListCard';
import { px } from '../../utils';

const meta = {
  title: 'Patterns/ViewingsListCard',
  component: ViewingsListCard,

  parameters: {
    controls: { sort: 'alpha', expanded: true },
  },
  argTypes: {
    enableOnSite: {
      options: ['true', 'false'],
      control: {
        type: 'select',
      },
    },
    previewOn: {
      options: ['true', 'false'],
      control: {
        type: 'select',
      },
    },
  },
} satisfies Meta<typeof ViewingsListCard>;

export default meta;

const args = {
  cardTitle: 'Form Title',
  id: 'Form',
  location: 'London',
  locationLabel: 'Tour Location',
  onSave: (e: React.MouseEvent<HTMLElement>) => {
    const targ = e?.target as HTMLElement;
    const inputs = targ.closest(`.${px}-viewings-list-card`)?.querySelectorAll('input');
    inputs?.forEach((input) => console.log('onClick Submission: ', `${input.name}: ${input.value}`));
  },
};

export const ViewingsListCardStory = (props: ViewingsListCardProps) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      const data = new FormData(e.target as HTMLFormElement);
      const formJson = Object.fromEntries(data.entries());
      console.log('Form Submission:', formJson);
    }}
  >
    <ViewingsListCard
      key={`${props.enableOnSite}${props.location}${props.previewOn}`}
      {...props}
      enableOnSite={props.enableOnSite ? 'true' : 'false'}
    />
  </form>
);
ViewingsListCardStory.args = {
  ...args,
  id: 'storyid',
};

export const Playground = (props: ViewingsListCardProps) => (
  <ViewingsListCard key={`${props.enableOnSite}${props.location}${props.previewOn}`} {...props} />
);

Playground.args = {
  ...args,
};
