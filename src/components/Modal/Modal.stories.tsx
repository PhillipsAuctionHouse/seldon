import type { Meta } from '@storybook/react';
import { Playground as PlaygroundSplitPanel } from '../SplitPanel/SplitPanel.stories';

import Modal from './Modal';
import { useState } from 'react';
import Button from '../Button/Button';
import Drawer from '../Drawer/Drawer';

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
      <Modal isOpen={isOpen} onClose={onClose}>
        <img src="https://www.dev.phillips.com/Content/homepage/wechat_qr_mobile.png" alt="placeholder" />
      </Modal>
    </>
  );
};

Playground.args = {
  id: 'myModalComponent',
};

export const ModalFromDrawer = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Button onClick={openDrawer}>Open Drawer</Button>
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        <div style={{ padding: '24px' }}>
          <h2>Drawer Content</h2>
          <Button onClick={openModal}>Open Modal</Button>
        </div>
      </Drawer>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div style={{ padding: '24px' }}>
          <h2>Modal Content</h2>
          <p>Test the focus trap by tabbing through the elements.</p>
          <input type="text" placeholder="Input field 1" />
          <input type="text" placeholder="Input field 2" />
          <Button onClick={closeModal}>Close Modal</Button>
        </div>
      </Modal>
    </>
  );
};
