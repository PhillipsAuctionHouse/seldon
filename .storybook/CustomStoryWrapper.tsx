import React from 'react';
import { Decorator } from '@storybook/react';
import { SeldonProvider } from '../src/providers/SeldonProvider/SeldonProvider';

const CustomStoryWrapper: Decorator = (Story) => (
  <SeldonProvider>
    <Story />
  </SeldonProvider>
);

export default CustomStoryWrapper;
