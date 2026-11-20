import type { Meta } from '@storybook/react-vite';
import { Playground as PlaygroundSplitPanel } from '../SplitPanel/SplitPanel.stories';

import { useState } from 'react';
import Button from '../Button/Button';
import Drawer from '../Drawer/Drawer';
import { TextVariants } from '../Text';
import Text from '../Text/Text';
import Modal from './Modal';
import { Icon } from '../Icon';
import { CountryPicker } from '../../patterns/CountryPicker';
import { type Country, toConfig } from '../../patterns/CountryPicker/types';
import { px } from '../../utils';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';

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
          <Text variant={TextVariants.string2}>Use the button below to launch a modal directly from the drawer.</Text>
          <Button onClick={openModal}>Open Modal</Button>
        </div>
      </Drawer>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className={`modal-story__modal`}>
          <Text variant={TextVariants.heading2} className={`modal-story__modal-heading`}>
            Modal Content
          </Text>
          <Text variant={TextVariants.string2}>Test the focus trap by tabbing through the elements.</Text>
          <input type="text" placeholder="Input field 1" />
          <input type="text" placeholder="Input field 2" />
          <Button onClick={closeModal}>Close Modal</Button>
        </div>
      </Modal>
    </>
  );
};

// A modal opened from inside another modal, as CountryPicker does from an
// address form. Only the top modal should be bright: the nested modal's overlay
// must sit above the parent so the parent's title, close button and footer are
// dimmed and can't be mistaken for part of the picker.
export const ModalFromModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState<Country['name'] | undefined>(undefined);

  return (
    <>
      <Button className={`modal-story__button`} onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="New Shipping Address">
        <div className={`modal-story__modal modal-story__modal--tall`}>
          <Text variant={TextVariants.heading2} className={`modal-story__modal-heading`}>
            New Shipping Address
          </Text>
          <input type="text" placeholder="Label (Optional)" />
          <CountryPicker
            triggerLabelText="Country"
            triggerDisplayValue={country ?? ''}
            modalTitle="Select a Country"
            searchInputLabel="Search for a country"
            searchInputPlaceholder="Search for a country"
            selectButtonLabel="Select"
            hasTriggerError={false}
            triggerErrorMsg=""
            {...toConfig(false, country, setCountry)}
          />
          <input type="text" placeholder="Address line 1" />
          <Button onClick={() => setIsOpen(false)}>Create address</Button>
        </div>
      </Modal>
    </>
  );
};

ModalFromModal.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  await userEvent.click(within(canvasElement).getByRole('button', { name: 'Open Modal' }));
  await userEvent.click(await screen.findByRole('button', { name: 'Country' }));

  await waitFor(() => expect(screen.getAllByRole('dialog', { hidden: true })).toHaveLength(2));
  const [parentModal] = screen.getAllByRole('dialog', { hidden: true });
  const overlays = document.querySelectorAll<HTMLElement>(`.${px}-modal__overlay`);
  const pickerOverlay = overlays[overlays.length - 1];

  // The picker's overlay comes after the parent modal and on at least its layer,
  // so it paints over the parent rather than underneath it
  await expect(parentModal.compareDocumentPosition(pickerOverlay) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  await expect(Number(getComputedStyle(pickerOverlay).zIndex)).toBeGreaterThanOrEqual(
    Number(getComputedStyle(parentModal).zIndex),
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
