import { Meta } from '@storybook/react';
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

export const Playground = () => {
  return (
    <div
      style={{
        height: '20vh',
      }}
    >
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
};

Playground.parameters = {
  docs: {
    description: {
      story: 'This is a static example of the Toast component. For a complete example, check the Interactive section.',
    },
  },
};

const ToastDemo = () => {
  const toast = useToast();

  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
      }}
    >
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

export const Interactive = () => <ToastDemo />;
