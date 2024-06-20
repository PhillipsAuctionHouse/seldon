import { Meta } from '@storybook/react';
import ComponentName, { ComponentNameProps } from './ComponentName';

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
} satisfies Meta<typeof ComponentName>;

export default meta;
export const Playground = (props: ComponentNameProps) => <ComponentName {...props} />;

Playground.args = {
  children: 'Hi There',
};

Playground.argTypes = {};
