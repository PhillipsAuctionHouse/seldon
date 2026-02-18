import { Meta } from '@storybook/react-vite';
import { useState } from 'react';
import { LinkVariants } from '../Link';
import NavigationItem from '../Navigation/NavigationItem/NavigationItem';
import Accordion, { AccordionProps } from './Accordion';
import AccordionItem, { AccordionItemProps } from './AccordionItem';
import { AccordionItemVariant, AccordionVariants } from './types';
import Button from '../Button/Button';
import { Text } from '../Text';

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

const smallTextBlock = (
  <div>
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
    children: <Text>LOGIN OR SIGNUP</Text>,
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

export const Default = ({ transitionTimeInMs, ...props }: AccordionProps & AccordionItemProps) => (
  <Accordion {...props}>
    {smallTextItems.map((item, index, arr) => (
      <AccordionItem
        {...item}
        isLastItem={index === arr?.length - 1}
        key={`accordion-key-${item?.label}`}
        id={`accordion-item-${index}`}
        transitionTimeInMs={transitionTimeInMs}
      >
        {item?.children}
      </AccordionItem>
    ))}
  </Accordion>
);

export const AccordionSmall = ({ transitionTimeInMs, ...props }: AccordionProps & AccordionItemProps) => (
  <Accordion {...props}>
    {smallTextItems.map((item, index, arr) => (
      <AccordionItem
        {...item}
        isLastItem={index === arr?.length - 1}
        key={`accordion-key-${item?.label}`}
        id={`accordion-item-${index}`}
        transitionTimeInMs={transitionTimeInMs}
        variant={AccordionItemVariant.sm}
      >
        {item?.children}
      </AccordionItem>
    ))}
  </Accordion>
);

export const AccordionSubmenu = ({ transitionTimeInMs, ...props }: AccordionProps & AccordionItemProps) => {
  const [currentLanguage, setCurrentLanguage] = useState('English');
  return (
    <Accordion {...props} id="accordion-item-submenu">
      <AccordionItem
        id="languageselector"
        label={<NavigationItem label={currentLanguage}></NavigationItem>}
        transitionTimeInMs={transitionTimeInMs}
      >
        <div style={{ paddingLeft: 'var(--spacing-sm)' }}>
          <NavigationItem
            label="English"
            onClick={() => setCurrentLanguage('English')}
            navType={LinkVariants.linkLarge}
          ></NavigationItem>
          <NavigationItem
            label="Chinese"
            onClick={() => setCurrentLanguage('Chinese')}
            navType={LinkVariants.linkLarge}
          ></NavigationItem>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export const ControlledAccordion = ({ items, ...props }: AccordionProps & { items: AccordionItemProps[] }) => {
  const [expandedAccordionItems, setExpandedAccordionItems] = useState<string[] | undefined>();

  const middleAccordionItemId = 'accordion-item-1';
  return (
    <div>
      <Button
        onClick={() =>
          setExpandedAccordionItems(
            expandedAccordionItems?.includes(middleAccordionItemId)
              ? expandedAccordionItems?.filter((item) => item !== middleAccordionItemId)
              : [...(expandedAccordionItems ?? []), middleAccordionItemId],
          )
        }
      >{`${expandedAccordionItems?.includes(middleAccordionItemId) ? 'Collapse' : 'Expand'} middle accordion item`}</Button>
      <Accordion {...props} value={expandedAccordionItems} onValueChanged={setExpandedAccordionItems}>
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
    </div>
  );
};
