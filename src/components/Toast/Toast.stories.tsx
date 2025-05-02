import { Meta } from '@storybook/react';
import Toast from './Toast';
import { ToastProvider } from './ToastContextProvider';
import Button from '../Button/Button';
import { useToast } from './useToast';
import { ButtonVariants } from '../Button/types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Toast',
  component: Toast,
  decorators: [(Story) => <ToastProvider>{Story()}</ToastProvider>],
} satisfies Meta<typeof Toast>;

export default meta;
export const Playground = () => {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '10px' }}></div>
    </div>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  children: 'Hi There',
};

Playground.argTypes = {};
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
        Click here for text only toast
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
        Click here for text toast with action
      </Button>
    </div>
  );
};

export const Interactive = () => <ToastDemo />;
