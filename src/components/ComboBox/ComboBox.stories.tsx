import { Meta } from '@storybook/react';
import React from 'react';
import Button from '../Button/Button';
import { Drawer } from '../Drawer';
import ComboBox, { ComboBoxProps } from './ComboBox';

const meta = {
  title: 'Components/ComboBox',
  component: ComboBox,
} satisfies Meta<typeof ComboBox>;

export default meta;

const birthdays = Array.from({ length: 2025 - 1926 + 1 }, (_, i) => {
  const year = 1926 + i;
  return {
    value: `${year}`,
  };
});
export const Playground = (props: ComboBoxProps) => {
  const [inputValue, setInputValue] = React.useState('');
  return (
    <div style={{ height: '70px', width: '400px' }}>
      <ComboBox {...props} inputValue={inputValue} setInputValue={setInputValue} />
    </div>
  );
};

Playground.args = {
  options: birthdays,
  id: 'birthdays-combo-box',
  labelText: 'Birth Year',
};

Playground.argTypes = {};

export const ComboBoxInDrawer = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [drawerInputValue, setDrawerInputValue] = React.useState('');
  const [outsideInputValue, setOutsideInputValue] = React.useState('');
  const drawerContentRef = React.useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3>ComboBox Outside Drawer</h3>
        <div style={{ width: '300px' }}>
          <ComboBox
            options={birthdays}
            id="outside-birthdays-combo-box"
            labelText="Birth Year (Outside)"
            inputValue={outsideInputValue}
            setInputValue={setOutsideInputValue}
          />
        </div>
      </div>

      <Button onClick={() => setIsOpen(true)}>Open Drawer with ComboBox</Button>

      <Drawer
        title="Select Birth Year"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setDrawerInputValue('');
        }}
      >
        <div style={{ padding: '20px', width: '300px' }} ref={drawerContentRef}>
          <ComboBox
            options={birthdays}
            id="drawer-birthdays-combo-box"
            labelText="Birth Year (In Drawer)"
            inputValue={drawerInputValue}
            setInputValue={setDrawerInputValue}
            popoverContainerRef={drawerContentRef}
          />
        </div>
      </Drawer>
    </div>
  );
};
