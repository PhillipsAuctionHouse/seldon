import { Meta } from '@storybook/react/*';
import { useState } from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import ViewingDetails from '../../patterns/ViewingDetails/ViewingDetails';
import { viewingDetailsProps } from '../../patterns/ViewingDetails/ViewingDetailsMock';
import { px } from '../../utils';
import Link from '../Link/Link';
import ComposedModal, { ComposedModalProps } from './ComposedModal';

export default {
  title: 'Components/ComposedModal',
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
        secondaryButton={
          <Button
            className={`${px}-sale-card__cta_button`}
            onClick={() => console.log('Primary button clicked')}
            variant={ButtonVariants.primary}
            style={{ padding: '16px 48px', width: '100%', whiteSpace: 'nowrap' }}
          >
            Join Sale room
          </Button>
        }
        primaryButton={
          <Button
            className={`${px}-sale-card__cta_button`}
            onClick={() => console.log('Secondary button clicked')}
            variant={ButtonVariants.secondary}
            style={{ padding: '16px 48px', width: '100%', whiteSpace: 'nowrap' }}
          >
            Register to bid
          </Button>
        }
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
        <div>{'Lorem ipsum '.repeat(150)}</div>
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
        primaryButton={
          <Button
            className={`${px}-sale-card__cta_button`}
            onClick={() => console.log('Primary button clicked')}
            variant={ButtonVariants.primary}
            style={{ padding: '16px 48px', width: '100%', whiteSpace: 'nowrap' }}
          >
            Join Sale room
          </Button>
        }
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
