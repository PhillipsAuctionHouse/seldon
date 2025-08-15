import { Meta } from '@storybook/react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './';
import Button from '../Button/Button';
import { ButtonVariants } from '../Button/types';

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
  argTypes: {
    defaultOpen: { control: 'boolean' },
    open: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onOpenChange: { action: 'onOpenChange' },
  },
} satisfies Meta<typeof Collapsible>;

export default meta;

const sampleContent = (
  <div style={{ padding: '10px', backgroundColor: 'white', marginTop: '10px' }}>
    This is the collapsible content. It can be expanded or collapsed.
  </div>
);

export const Default = (args: React.ComponentProps<typeof Collapsible>) => (
  <Collapsible {...args}>
    <CollapsibleTrigger>Toggle</CollapsibleTrigger>
    <CollapsibleContent>{sampleContent}</CollapsibleContent>
  </Collapsible>
);

export const InitiallyOpen = (args: React.ComponentProps<typeof Collapsible>) => (
  <Collapsible {...args}>
    <CollapsibleTrigger asChild>
      <Button>Toggle</Button>
    </CollapsibleTrigger>
    <CollapsibleContent>{sampleContent}</CollapsibleContent>
  </Collapsible>
);

InitiallyOpen.args = {
  defaultOpen: true,
};

export const CustomTrigger = (args: React.ComponentProps<typeof Collapsible>) => (
  <Collapsible {...args}>
    <CollapsibleTrigger asChild>
      <Button variant={ButtonVariants.secondary}>Custom Trigger</Button>
    </CollapsibleTrigger>
    <CollapsibleContent>{sampleContent}</CollapsibleContent>
  </Collapsible>
);
