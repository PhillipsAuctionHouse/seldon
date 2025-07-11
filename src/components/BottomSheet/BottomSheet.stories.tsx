import { useArgs } from '@storybook/preview-api';
import type { Meta } from '@storybook/react';
import { useRef } from 'react';
import Subscribe from '../../patterns/Subscribe/Subscribe';
import Button from '../Button/Button';
import BottomSheet, { BottomSheetProps } from './BottomSheet';

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
};

export default meta;
export const Playground = (props: BottomSheetProps) => {
  const [, updateArgs] = useArgs();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClose = () => {
    // Refocus on button after close for keyboard navigation
    buttonRef.current?.focus();
    updateArgs({ ...props, isOpen: false });
  };

  const onOpen = () => {
    updateArgs({ ...props, isOpen: true });
  };

  return (
    <>
      <Button className={`modal-story__button`} onClick={onOpen} ref={buttonRef}>
        Open Bottom Sheet
      </Button>

      <BottomSheet isOpen={props.isOpen} onClose={onClose}>
        <Subscribe
          id="subscribe-drawer"
          autoFocus
          blurb="Receive exclusive content about our auctions, exhibitions, and special events."
        />
      </BottomSheet>
    </>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  children: 'Hi There',
  isOpen: false,
};

Playground.argTypes = {};
