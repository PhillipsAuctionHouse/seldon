import { Meta } from '@storybook/react';
import Drawer, { DrawerProps } from './Drawer';
import Button from '../Button/Button';
import { Playground as PlaygroundSplitPanel } from '../SplitPanel/SplitPanel.stories';
import Subscribe from '../Subscribe/Subscribe';
import { useArgs } from '@storybook/preview-api';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Drawer',
  component: Drawer,
} satisfies Meta<typeof Drawer>;

export default meta;
export const Playground = (props: DrawerProps) => {
  const [, updateArgs] = useArgs();

  const onClose = () => {
    updateArgs({ ...props, isOpen: false });
  };

  const onOpen = () => {
    updateArgs({ ...props, isOpen: true });
  };

  return (
    <>
      <Button className={`modal-story__button`} onClick={onOpen}>
        Open Modal
      </Button>

      <PlaygroundSplitPanel />
      <Drawer isOpen={props.isOpen} onClose={onClose}>
        <Subscribe />
      </Drawer>
    </>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  children: 'Hi There',
  isOpen: false,
};

Playground.argTypes = {};
