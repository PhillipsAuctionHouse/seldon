import { Meta } from '@storybook/react';
import Toast from './Toast';
import { ToastProvider } from './ToastContextProvider';
import Button from '../Button/Button';
import { useToast } from './useToast';
import { ButtonVariants } from '../Button/types';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  decorators: [(Story) => <ToastProvider>{Story()}</ToastProvider>],
} satisfies Meta<typeof Toast>;

export default meta;

export const Playground = () => {
  return (
    <div
      style={{
        height: '20vh',
      }}
    >
      <Toast title="Basic Toast" open={true} defaultOpen={true} onOpenChange={() => void 0} />

      <Toast
        title="Toast with Action"
        open={true}
        defaultOpen={true}
        onOpenChange={() => void 0}
        action={
          <Button
            onClick={() => {
              alert('View Details clicked!');
            }}
            variant={ButtonVariants.link}
          >
            View Details
          </Button>
        }
      />
    </div>
  );
};

Playground.parameters = {
  docs: {
    description: {
      story:
        'This is a static example of the Toast component. For a complete example, check the Interactive section.',
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
      <Button
        onClick={() =>
          toast({
            title: 'Oops! Something went wrong',
          })
        }
      >
        Click for basic toast
      </Button>
      <Button
        onClick={() =>
          toast({
            title: 'Yay! Your action was successful',

            action: (
              <Button variant={ButtonVariants.link} onClick={() => alert('Action clicked!')}>
                Click for more
              </Button>
            ),
          })
        }
      >
        Click for toast with action
      </Button>
    </div>
  );
};

export const Interactive = () => <ToastDemo />;
