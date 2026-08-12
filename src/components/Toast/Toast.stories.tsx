import { type CSSProperties, useEffect } from 'react';
import { Meta } from '@storybook/react-vite';
import Toast from './Toast';
import Button from '../Button/Button';
import { useToast } from './useToast';
import { ButtonVariants } from '../Button/types';
import { Text } from '../Text';

const meta = {
  title: 'Components/Toast',
  component: Toast,
} satisfies Meta<typeof Toast>;

export default meta;

/** Containing block so `position: fixed` toast viewports stay inside the story frame (incl. Docs). */
const storyFrameStyle: CSSProperties = {
  position: 'relative',
  height: 280,
  overflow: 'hidden',
  transform: 'translateZ(0)',
};

const toastDemoStyle: CSSProperties = {
  padding: 20,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
  height: '100%',
  boxSizing: 'border-box',
};

const sharedA11yParameters = {
  a11y: {
    config: {
      rules: [
        { id: 'aria-allowed-role', enabled: false },
        { id: 'aria-hidden-focus', enabled: false },
        { id: 'list', enabled: false },
      ],
    },
  },
};

const ToastDemo = () => {
  const toast = useToast();

  return (
    <div style={toastDemoStyle}>
      <Button onClick={() => toast('Oops! Something went wrong')}>Click for basic toast</Button>
      <Button
        onClick={() =>
          toast({
            title: 'Yay! Your action was successful',
            duration: Infinity,
            actionElement: (
              <Button variant={ButtonVariants.tertiary} onClick={() => alert('Action clicked!')}>
                Click for more
              </Button>
            ),
            actionAltText: 'Click for more',
          })
        }
      >
        Click for toast with action
      </Button>
    </div>
  );
};

const OffsetDemo = () => {
  const { show, setOffset } = useToast();

  // Global Storybook wrapper already provides ToastProvider; set initial inset via setOffset.
  useEffect(() => {
    setOffset({ x: 8, y: 8 });
  }, [setOffset]);

  return (
    <div style={toastDemoStyle}>
      <Button onClick={() => show('Toast with viewport offset')}>Show toast</Button>
      <Button
        onClick={() => {
          setOffset({ x: 24, y: 24 });
          show({ title: 'Offset updated at runtime', duration: Infinity });
        }}
      >
        Update offset + toast
      </Button>
    </div>
  );
};

export const Playground = () => (
  <div style={storyFrameStyle}>
    <Toast
      title={<Text>Basic Toast</Text>}
      open={true}
      defaultOpen={true}
      onOpenChange={() => void 0}
      closeButtonLabel="Close"
    />
    <Toast
      title={<Text>Toast with Action</Text>}
      open={true}
      defaultOpen={true}
      onOpenChange={() => void 0}
      actionAltText="Click for more"
      actionElement={
        <Button
          onClick={() => {
            alert('View Details clicked!');
          }}
          variant={ButtonVariants.link}
        >
          View Details
        </Button>
      }
      closeButtonLabel="Close"
    />
  </div>
);

Playground.parameters = {
  docs: {
    description: {
      story: 'Static Toast examples. Use Interactive to trigger toasts via `useToast`.',
    },
  },
  ...sharedA11yParameters,
};

export const Interactive = () => (
  <div style={storyFrameStyle}>
    <ToastDemo />
  </div>
);

Interactive.parameters = {
  ...sharedA11yParameters,
};

export const WithOffset = () => (
  <div style={storyFrameStyle}>
    <OffsetDemo />
  </div>
);

WithOffset.parameters = {
  docs: {
    description: {
      story:
        'Pass `offset` to your app `ToastProvider` for a mount-time inset, or call `setOffset` / `useToast().setOffset` when page state changes. This story uses the Storybook root provider and demos runtime updates.',
    },
  },
  ...sharedA11yParameters,
};
