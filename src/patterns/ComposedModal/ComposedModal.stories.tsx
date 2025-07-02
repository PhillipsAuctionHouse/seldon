import { Meta } from '@storybook/react/*';
import { useState } from 'react';
import Link from '../../components/Link/Link';
import ViewingDetails from '../ViewingDetails/ViewingDetails';
import { viewingDetailsProps } from '../ViewingDetails/ViewingDetailsMock';
import ComposedModal, { ComposedModalProps } from './ComposedModal';

export default {
  title: 'Patterns/ComposedModal',
  component: ComposedModal,
} satisfies Meta<typeof ComposedModal>;

const args = {
  id: 'ComposedModalId',
  title: 'Viewing Details',
  viewingDetailsProps: viewingDetailsProps,
};

export const Playground = (props: ComposedModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Link style={{ cursor: 'pointer' }} onClick={onOpen}>
        Viewing Details
      </Link>

      <ComposedModal
        key={`${props.id}`}
        {...props}
        isOpen={isOpen}
        onClose={onClose}
        secondaryButton={{
          buttonLabel: 'Register to Bid',
        }}
        primaryButton={{
          buttonLabel: 'Browse',
        }}
      >
        <ViewingDetails {...viewingDetailsProps} />
      </ComposedModal>
    </>
  );
};

Playground.args = {
  ...args,
};

export const ComposedModalScroll = (props: ComposedModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Link style={{ cursor: 'pointer' }} onClick={onOpen}>
        Viewing Long Content
      </Link>

      <ComposedModal key={`${props.id}`} {...props} isOpen={isOpen} onClose={onClose} maxHeightValue="40vh">
        <div style={{ maxWidth: '40rem', padding: '0 2rem' }}>{'Lorem ipsum '.repeat(150)}</div>
      </ComposedModal>
    </>
  );
};

ComposedModalScroll.args = {
  id: 'ComposedModalScrollId',
  title: 'ComposedModal Scroll',
};

export const ComposedModalSingleButton = (props: ComposedModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Link style={{ cursor: 'pointer' }} onClick={onOpen}>
        Single CTA
      </Link>

      <ComposedModal
        key={`${props.id}`}
        {...props}
        isOpen={isOpen}
        onClose={onClose}
        primaryButton={{
          buttonLabel: 'Browse',
        }}
      >
        <ViewingDetails {...viewingDetailsProps} />
      </ComposedModal>
    </>
  );
};

ComposedModalSingleButton.args = {
  id: 'ComposedModalSingleButtonId',
  title: 'ComposedModal Single Button',
};
