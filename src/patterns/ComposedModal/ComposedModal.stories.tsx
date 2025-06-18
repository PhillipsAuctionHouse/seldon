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
        appElementSelector="body"
        shouldFocusAfterRender={false}
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

      <ComposedModal
        key={`${props.id}`}
        {...props}
        isOpen={isOpen}
        onClose={onClose}
        appElementSelector="body"
        maxHeightValue="40vh"
        shouldFocusAfterRender={false}
      >
        <div style={{ maxWidth: '40rem', padding: '0 2rem' }}>{'Lorem ipsum '.repeat(150)}</div>
      </ComposedModal>
    </>
  );
};

ComposedModalScroll.args = {
  id: 'ComposedModalScrollId',
  title: 'ComposedModal Scroll',
};
