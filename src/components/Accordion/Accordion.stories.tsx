import { Meta } from '@storybook/react';
import Accordion, { AccordionProps } from './Accordion';
import AccordionItem from './AccordionItem';
import { AccordionItemVariant, AccordionVariants } from './types';
import NavigationItem from '../Navigation/NavigationItem/NavigationItem';
import { LinkVariants } from '../Link';
import { useState } from 'react';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,

  argTypes: {
    variant: {
      options: Object.values(AccordionVariants),
      control: {
        type: 'select',
      },
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;

const largeTextBlock = (
  <div style={{ color: 'white', backgroundColor: '#d0d0d0', padding: 20 }}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </div>
);
const largeTextItems = [
  {
    isLocked: false,
    variant: AccordionItemVariant.lg,
    label: 'What information do I need to provide to submit a consignment?',
    children: largeTextBlock,
  },
  {
    isLocked: false,
    variant: AccordionItemVariant.lg,
    label: 'How long does it take to receive an estimate?',
    children: largeTextBlock,
  },
  {
    isLocked: true,
    variant: AccordionItemVariant.lg,
    label: 'Do you accept artist submissions?',
  },
];

export const AccordionLarge = (props: AccordionProps) => (
  <Accordion {...props}>
    {largeTextItems.map((item, index, arr) => (
      <AccordionItem
        {...item}
        isLastItem={index === arr?.length - 1}
        key={`accordion-key-${item?.label}`}
        id={`accordion-item-${index}`}
      >
        {item?.children}
      </AccordionItem>
    ))}
  </Accordion>
);

const smallTextBlock = (
  <div style={{ color: 'white', backgroundColor: '#d0d0d0', padding: 20 }}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
    dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
    enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
    consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </div>
);
const smallTextItems = [
  {
    isLocked: true,
    label: 'Condition Report',
    children: (
      <div style={{ color: '#4A90E2', cursor: 'pointer', fontWeight: '500', fontSize: '20px' }}>LOGIN OR SIGNUP</div>
    ),
  },
  {
    isLocked: false,
    label: 'Provenance',
    children: smallTextBlock,
    hasTransition: true,
  },
  {
    isLocked: false,
    label: 'Exhibited',
    children: smallTextBlock,
    hasTransition: true,
  },
];

export const AccordionSmall = (props: AccordionProps) => (
  <Accordion {...props}>
    {smallTextItems.map((item, index, arr) => (
      <AccordionItem
        {...item}
        isLastItem={index === arr?.length - 1}
        key={`accordion-key-${item?.label}`}
        id={`accordion-item-${index}`}
      >
        {item?.children}
      </AccordionItem>
    ))}
  </Accordion>
);

export const AccordionSubmenu = (props: AccordionProps) => {
  const [currentLanguage, setCurrentLanguage] = useState('English');
  return (
    <Accordion {...props} id="accordion-item-submenu">
      <AccordionItem id="languageselector" label={<NavigationItem label={currentLanguage}></NavigationItem>}>
        <div style={{ paddingLeft: 'var(--spacing-sm)' }}>
          <NavigationItem
            label="English"
            onClick={() => setCurrentLanguage('English')}
            navType={LinkVariants.snwFlyoutLink}
          ></NavigationItem>
          <NavigationItem
            label="Chinese"
            onClick={() => setCurrentLanguage('Chinese')}
            navType={LinkVariants.snwFlyoutLink}
          ></NavigationItem>
        </div>
      </AccordionItem>
    </Accordion>
  );
};
