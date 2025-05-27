import React from 'react';
import { Decorator } from '@storybook/react';
import { SeldonProvider } from '../src/providers/SeldonProvider/SeldonProvider';
import { ToastProvider } from '../src/components/Toast/ToastContextProvider';

const CustomStoryWrapper: Decorator = (Story) => (
  <SeldonProvider>
    <ToastProvider>
      <Story />
    </ToastProvider>
  </SeldonProvider>
);

export default CustomStoryWrapper;
