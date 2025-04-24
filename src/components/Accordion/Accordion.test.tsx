import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion, AccordionItem } from './';
import { runCommonTests } from '../../utils/testUtils';
import { getAccordionVariantProps } from './utils';
import { px } from '../../utils';

describe('Accordion', () => {
  runCommonTests(Accordion, 'Accordion');

  it('should contain the plus icon and toggles to minus icons on click', async () => {
    render(
      <Accordion id="large">
        {[
          {
            isLocked: false,
            variation: 'lg',
            label: 'Consignment',
            children: <div>Lorem ipsum</div>,
          },
        ].map((item, index, arr) => (
          <AccordionItem
            {...item}
            isLastItem={index === arr?.length - 1}
            key={`accordion-key-${item?.label}`}
            id={`accordion-item-${index}`}
          >
            {item?.children}
          </AccordionItem>
        ))}
      </Accordion>,
    );
    expect(screen.queryByTestId(/icon-add/)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('accordion-item-0-trigger'));
    await waitFor(() => expect(screen.queryByTestId(/icon-subtract/)).toBeInTheDocument());
  });

  it('should contain the lock icon and lock icon content', async () => {
    render(
      <Accordion>
        {[
          {
            isLocked: true,
            variation: 'lg',
            label: 'Submissions',
            children: <div className={`${px}-sign-up-link`}>Sign Up</div>,
          },
        ].map((item, index, arr) => (
          <AccordionItem
            {...item}
            isLastItem={index === arr?.length - 1}
            key={`accordion-key-${item?.label}`}
            id={`accordion-item-${index}`}
          >
            {item?.children}
          </AccordionItem>
        ))}
      </Accordion>,
    );
    expect(screen.queryByTestId(/icon-lock/)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('accordion-item-0-trigger'));
    await waitFor(() => expect(screen.queryByTestId(/icon-lock/)).toBeInTheDocument());
    const lockedContentElement = screen.getByText('Sign Up');
    expect(lockedContentElement).toHaveClass(`${px}-sign-up-link`);
  });
  it('singleCollapsible variant should only allow one item to be open at a time', async () => {
    render(
      <Accordion variant="singleCollapsible">
        {[
          {
            variation: 'sm',
            label: 'Provenance',
            children: <div>Lorem ipsum</div>,
          },
          {
            variation: 'sm',
            label: 'Exhibitied',
            children: <div>Log In</div>,
          },
        ].map((item, index, arr) => (
          <AccordionItem
            {...item}
            isLastItem={index === arr?.length - 1}
            key={`accordion-key-${item?.label}`}
            id={`accordion-item-${index}`}
          >
            {item?.children}
          </AccordionItem>
        ))}
      </Accordion>,
    );

    // Should have 2 closed items
    const accordionItemTriggers = screen.queryAllByTestId(/accordion-item-\d-trigger/);
    expect(accordionItemTriggers).toHaveLength(2);
    accordionItemTriggers.map((trigger) => expect(trigger).toHaveAttribute('aria-expanded', 'false'));

    // After clicking first item, we should have 1 open and 1 closed item
    await userEvent.click(screen.getByTestId('accordion-item-0-trigger'));
    expect(screen.getByTestId('accordion-item-0-trigger')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('accordion-item-1-trigger')).toHaveAttribute('aria-expanded', 'false');

    // After clicking second item, we should have 1 open and 1 closed item
    await userEvent.click(screen.getByTestId('accordion-item-1-trigger'));
    expect(screen.getByTestId('accordion-item-1-trigger')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('accordion-item-0-trigger')).toHaveAttribute('aria-expanded', 'false');
  });

  it('should contain the contents and expand once the label is clicked', async () => {
    const { container } = render(
      <Accordion>
        {[
          {
            isLocked: false,
            variation: 'sm',
            label: 'Provenance',
            children: <div>Lorem ipsum</div>,
          },
          {
            isLocked: true,
            variation: 'sm',
            label: 'Exhibitied',
            children: <div>Log In</div>,
          },
        ].map((item, index, arr) => (
          <AccordionItem
            {...item}
            isLastItem={index === arr?.length - 1}
            key={`accordion-key-${item?.label}`}
            id={`accordion-item-${index}`}
          >
            {item?.children}
          </AccordionItem>
        ))}
      </Accordion>,
    );

    // Should have 2 closed items
    expect(container.querySelectorAll(`.${px}-accordion-item[data-state="open"]`)).toHaveLength(0);
    expect(container.querySelectorAll(`.${px}-accordion-item[data-state="closed"]`)).toHaveLength(2);

    // After clicking first item, we should have 1 open and 1 closed item
    await userEvent.click(screen.getByTestId('accordion-item-0-trigger'));
    expect(container.querySelectorAll(`.${px}-accordion-item[data-state="open"]`)).toHaveLength(1);
    expect(container.querySelectorAll(`.${px}-accordion-item[data-state="closed"]`)).toHaveLength(1);

    // After clicking second item, we should have both items open and none closed
    await userEvent.click(screen.getByTestId('accordion-item-1-trigger'));
    expect(container.querySelectorAll(`.${px}-accordion-item[data-state="open"]`)).toHaveLength(2);
    expect(container.querySelectorAll(`.${px}-accordion-item[data-state="closed"]`)).toHaveLength(0);
  });

  it('should get the correct variant props for the "singleCollapsible" variant', () => {
    const variantProps = getAccordionVariantProps('singleCollapsible');

    expect(variantProps.type).toBe('single');
  });

  it('should get the correct variant props for the "singleNonCollapsible" variant', () => {
    const variantProps = getAccordionVariantProps('singleNonCollapsible');

    expect(variantProps.type).toBe('single');
  });

  it('should get the correct variant props for the "multiple" variant', () => {
    const variantProps = getAccordionVariantProps('multiple');

    expect(variantProps.type).toBe('multiple');
  });

  it('should default to the variant props for "multiple" if no variant is passed in', () => {
    const variantProps = getAccordionVariantProps();

    expect(variantProps.type).toBe('multiple');
  });
});
