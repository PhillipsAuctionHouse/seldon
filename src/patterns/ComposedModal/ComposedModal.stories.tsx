import { Meta } from '@storybook/react/*';
import { useState } from 'react';
import Link from '../../components/Link/Link';
import ViewingDetails from '../ViewingDetails/ViewingDetails';
import ComposedModal, { ComposedModalProps } from './ComposedModal';

export default {
  title: 'Patterns/ComposedModal',
  component: ComposedModal,
} satisfies Meta<typeof ComposedModal>;

const viewingDetailsProps = {
  variant: 'ViewingDetails',
  label: 'Viewings',
  sessionTimesLabel: 'Session Times',
  sessionTimes: [
    {
      sessionLabel: 'Session I, lots 1-103',
      sessionTime: 'Saturday, 10 May, 2025, 2pm',
    },
    {
      sessionLabel: 'Session II, lots 104-199',
      sessionTime: 'Saturday, 11 May, 2025, 3pm',
    },
  ],
  viewingTimes: [
    '7-11 May, 2025',
    'Wednesday - Friday, 10:00AM - 7PM',
    'Saturday, 09:00AM - 10:00PM',
    'Sunday, 09:00AM - 1:00PM',
  ],
  disclaimer: 'Optional Disclaimer text',
  location: '30 Berkeley Square, London, United Kingdom, W1J 6EX',
  mapLink: 'https://www.google.com/maps/place/30+Berkeley+Square,+London,+United+Kingdom/@51.509865,-0.14189,17z',
};
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
