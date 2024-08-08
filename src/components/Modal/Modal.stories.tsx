import type { Meta } from '@storybook/react';
import { Playground as PlaygroundSplitPanel } from '../SplitPanel/SplitPanel.stories';

import Modal from './Modal';
import { useState } from 'react';
import Button from '../Button/Button';

const meta = {
  title: 'Components/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;

export const Playground = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button className={`modal-story__button`} onClick={onOpen}>
        Open Modal
      </Button>

      <PlaygroundSplitPanel />
      <Modal isOpen={isOpen} onClose={onClose} appElementSelector="body">
        <img src="https://www.dev.phillips.com/Content/homepage/wechat_qr_mobile.png" alt="placeholder" />
      </Modal>
    </>
  );
};

Playground.args = {
  id: 'myModalComponent',
};
