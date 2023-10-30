import type { Meta } from '@storybook/react';
import ViewingsListCard, { ViewingsListCardProps } from './ViewingsListCard';

const meta = {
  title: 'Components/ViewingsListCard',
  component: ViewingsListCard,
  tags: ['autodocs'],
  argTypes: {
    cardTitle: { control: 'string' },
    enableOnSite: { control: 'boolean' },
    onDelete: {
      control: 'action',
    },
    onSave: {
      control: 'action',
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
    const form = targ?.closest('form');
    const data = form && new FormData(form as HTMLFormElement);
    const formJson = data && Object.fromEntries(data.entries());
    console.log(formJson);
    const inputs = targ.parentNode?.querySelectorAll('input');
    inputs?.forEach((input) => console.log(`${input.name}:${input.value}`));
  },
};

export const ViewingsListCardStory = (props: ViewingsListCardProps) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      const data = new FormData(e.target as HTMLFormElement);
      const formJson = Object.fromEntries(data.entries());
      console.log('THIS IS E:', formJson);
    }}
  >
    <ViewingsListCard key={`${props.location}${props.previewOn}${props.defaultEditState}`} {...props} />
  </form>
);
ViewingsListCardStory.args = {
  ...args,
  defaultEditState: true,
};

export const Playground = (props: ViewingsListCardProps) => (
  <ViewingsListCard key={`${props.enableOnSite}${props.previewOn}`} {...props} />
);

Playground.args = {
  ...args,
};
