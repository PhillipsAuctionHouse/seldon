import React from 'react';
import { Decorator } from '@storybook/react';
import { SeldonProvider } from '../src/providers/SeldonProvider';

const CustomStoryWrapper: Decorator = (Story) => (
  <SeldonProvider>
    <Story />
  </SeldonProvider>
);

export default CustomStoryWrapper;
