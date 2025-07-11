import { Meta } from '@storybook/react';
import ProgressWizard, { ProgressWizardProps } from './ProgressWizard';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/ProgressWizard',
  component: ProgressWizard,
} satisfies Meta<typeof ProgressWizard>;

export default meta;
export const Playground = (_props: ProgressWizardProps) => (
  <ProgressWizard steps={4}>
    <form>
      <label>
      Step 1:
      <input type="text" placeholder="Enter Step 1 data" />
      </label>
    </form>
    <form>
      <label>
      Step 2:
      <input type="text" placeholder="Enter Step 2 data" />
      </label>
    </form>
    <form>
      <label>
      Step 3:
      <input type="text" placeholder="Enter Step 3 data" />
      </label>
    </form>
    <form>
      <label>
      Step 4:
      <input type="text" placeholder="Enter Step 4 data" />
      </label>
    </form>
  </ProgressWizard>
);

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  children: 'Hi There',
};

Playground.argTypes = {};
