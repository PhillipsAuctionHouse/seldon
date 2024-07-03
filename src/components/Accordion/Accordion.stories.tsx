import { Meta, StoryObj } from '@storybook/react';
import Accordion from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const largeTextBlock = (
  <div style={{ color: 'white', backgroundColor: '#d0d0d0', padding: 20 }}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </div>
);

export const AccordionLarge: Story = {
  args: {
    items: [
      {
        isLocked: false,
        variation: 'lg',
        label: 'What information do I need to provide to submit a consignment?',
        children: largeTextBlock,
      },
      {
        isLocked: false,
        variation: 'lg',
        label: 'How long does it take to receive an estimate?',
        children: largeTextBlock,
      },
      {
        isLocked: true,
        variation: 'lg',
        label: 'Do you accept artist submissions?',
      },
    ],
  },
};

const smTextBlock = (
  <div style={{ color: 'white', backgroundColor: '#d0d0d0', padding: 20 }}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
    dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
    enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
    consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </div>
);

export const AccordionSmall: Story = {
  args: {
    items: [
      {
        isLocked: true,
        isLockedVariation: true,
        variation: 'sm',
        label: 'Condition Report',
        children: (
          <div style={{ color: '#4A90E2', cursor: 'pointer', fontWeight: '500', fontSize: '20px' }}>
            LOGIN OR SIGNUP
          </div>
        ),
      },
      {
        isLocked: false,
        variation: 'sm',
        label: 'Provenance',
        children: smTextBlock,
      },
      {
        isLocked: false,
        variation: 'sm',
        label: 'Exhibitied',
        children: smTextBlock,
        hasTransition: true,
      },
    ],
  },
};
