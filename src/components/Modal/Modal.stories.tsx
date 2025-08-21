import type { Meta } from '@storybook/react';
import { Playground as PlaygroundSplitPanel } from '../SplitPanel/SplitPanel.stories';

import { useState } from 'react';
import Button from '../Button/Button';
import Drawer from '../Drawer/Drawer';
import { TextVariants } from '../Text';
import Text from '../Text/Text';
import Modal from './Modal';
import { Icon } from '../Icon';

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
      <Button onClick={openDrawer} className={`modal-story__button`}>
        Open Drawer
      </Button>
      <PlaygroundSplitPanel />
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        <div className={`modal-story__drawer`}>
          <Text variant={TextVariants.heading2} className={`modal-story__drawer-heading`}>
            Drawer Content
          </Text>
          <Text variant={TextVariants.labelMd}>Use the button below to launch a modal directly from the drawer.</Text>
          <Button onClick={openModal}>Open Modal</Button>
        </div>
      </Drawer>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className={`modal-story__modal`}>
          <Text variant={TextVariants.heading2} className={`modal-story__modal-heading`}>
            Modal Content
          </Text>
          <Text variant={TextVariants.labelMd}>Test the focus trap by tabbing through the elements.</Text>
          <input type="text" placeholder="Input field 1" />
          <input type="text" placeholder="Input field 2" />
          <Button onClick={closeModal}>Close Modal</Button>
        </div>
      </Modal>
    </>
  );
};

export const CustomCloseIcon = () => {
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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeIcon={<Icon icon="ChevronLeft" height={32} width={32} color="currentColor" />}
        closeIconPosition="left"
      >
        <img src="https://www.dev.phillips.com/Content/homepage/wechat_qr_mobile.png" alt="placeholder" />
      </Modal>
    </>
  );
};
