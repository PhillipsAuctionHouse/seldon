import { Meta } from '@storybook/react';
import Drawer, { DrawerProps } from './Drawer';
import Button from '../Button/Button';
import { Playground as PlaygroundSplitPanel } from '../SplitPanel/SplitPanel.stories';
import Subscribe from '../../patterns/Subscribe/Subscribe';
import { useArgs } from '@storybook/preview-api';
import { useRef } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Drawer',
  component: Drawer,
} satisfies Meta<typeof Drawer>;

const argTypes = {
  isOpen: {
    control: 'boolean',
    description: 'Whether the drawer is open or not',
    defaultValue: false,
    table: { type: { summary: 'boolean' } },
  },
  onClose: {
    action: 'onClose',
    description: 'Callback when the drawer is closed',
    table: { type: { summary: '() => void' } },
  },
  children: {
    control: 'text',
    description: 'The content of the drawer',
    table: { type: { summary: 'React.ReactNode' } },
  },
  headerText: {
    control: 'text',
    description:
      'A string to be displayed center at the top of the drawer, up with the close button. Its presence also triggers the horizontal rule below the header to be rendered.',
    table: { type: { summary: 'string' } },
  },
  title: {
    control: 'text',
    description:
      'Used as the accessibility label for the drawer, used for screen readers. Defaults to the headerText if provided, otherwise an empty string. Supplying this prop also reduces the content padding from 32px to 16px, which aligns with the design.',
    table: { type: { summary: 'string' } },
  },
  drawerOpenSide: {
    control: { type: 'select' },
    options: ['left', 'right', 'bottom'],
    description: 'Which side the drawer opens from: left, right, or bottom',
    defaultValue: 'right',
    table: { type: { summary: `'left' | 'right' | 'bottom'` } },
  },
  extraPaddingLevel: {
    control: { type: 'select' },
    options: [undefined, 0, 1, 2],
    description: 'Extra padding around the content. 0, 1, 2, or undefined (defaults to 2).',
    defaultValue: undefined,
    table: { type: { summary: '0 | 1 | 2 | undefined' } },
  },
  className: {
    control: 'text',
    description: 'Custom class name for the Drawer',
    table: { type: { summary: 'string' } },
  },
  id: {
    control: 'text',
    description: 'ID for the Drawer root element',
    table: { type: { summary: 'string' } },
  },
};

export default meta;
export const Playground = (props: DrawerProps) => {
  const [, updateArgs] = useArgs();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClose = () => {
    buttonRef.current?.focus();
    updateArgs({ ...props, isOpen: false });
  };

  const onOpen = () => {
    updateArgs({ ...props, isOpen: true });
  };

  return (
    <>
      <Button className="modal-story__button" onClick={onOpen} ref={buttonRef}>
        Open Modal
      </Button>

      <PlaygroundSplitPanel />
      <Drawer
        isOpen={props.isOpen}
        onClose={props.onClose ?? onClose}
        headerText={props.headerText}
        title={props.title}
        className={props.className}
        drawerOpenSide={props.drawerOpenSide}
        extraPaddingLevel={props.extraPaddingLevel}
      >
        <Subscribe
          id="subscribe-drawer"
          autoFocus
          blurb="Receive exclusive content about our auctions, exhibitions, and special events."
        />
      </Drawer>
    </>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  children: 'Hi There',
  isOpen: false,
  headerText: 'Drawer title',
  title: undefined,
  drawerOpenSide: 'right',
  extraPaddingLevel: 2,
};

Playground.argTypes = argTypes;
