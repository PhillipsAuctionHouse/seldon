import { Meta, StoryObj } from '@storybook/react';
import Accordion from './Accordion';
import { px } from '../../utils';
import classNames from 'classnames';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AccordionLarge: Story = {
  args: {
    items: [
      {
        isLocked: false,
        variation: 'lg',
        label: 'What information do I need to provide to submit a consignment?',
        content: (
          <div style={{ color: 'white', backgroundColor: '#d0d0d0', padding: 20 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </div>
        ),
      },
      {
        isLocked: false,
        variation: 'lg',
        label: 'How long does it take to receive an estimate?',
        content: (
          <div style={{ color: 'white', backgroundColor: '#d0d0d0', padding: 20 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </div>
        ),
      },
      {
        isLocked: true,
        variation: 'lg',
        label: 'Do you accept artist submissions?',
      },
    ],
  },
};

export const AccordionSmall: Story = {
  args: {
    items: [
      {
        isLocked: true,
        isLockedVariation: true,
        variation: 'sm',
        label: 'Condition Report',
        lockedContent: (
          <div
            className={classNames(`${px}-accordionItem__label_text`)}
            style={{ color: '#4A90E2', cursor: 'pointer' }}
          >
            Login or Signup
          </div>
        ),
      },
      {
        isLocked: false,
        variation: 'sm',
        label: 'Provenance',
        content: (
          <div style={{ color: 'white', backgroundColor: '#d0d0d0', padding: 20 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </div>
        ),
      },
      {
        isLocked: false,
        variation: 'sm',
        label: 'Exhibitied',
        content: (
          <div style={{ color: 'white', backgroundColor: '#d0d0d0', padding: 20 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </div>
        ),
      },
    ],
  },
};
