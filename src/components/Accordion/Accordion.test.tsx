import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion, AccordionItem, AccordionItemProps, AccordionItemVariant } from './';
import { runCommonTests } from '../../utils/testUtils';
import { getAccordionVariantProps } from './utils';
import { px } from '../../utils';

describe('Accordion', () => {
  runCommonTests(Accordion, 'Accordion');

  describe('Icons', () => {
    const renderAccordionItem = (props: Omit<AccordionItemProps, 'id'>) => {
      render(
        <Accordion id="icon-test">
          <AccordionItem {...props} id="accordion-item-0">
            {props.children}
          </AccordionItem>
        </Accordion>,
      );
    };

    describe('Plus/Minus icon toggle', () => {
      beforeEach(() => {
        renderAccordionItem({
          isLocked: false,
          variant: AccordionItemVariant.lg,
          label: 'Consignment',
          children: <div>Lorem ipsum</div>,
        });
      });

      it('should contain the plus icon initially', () => {
        expect(screen.queryByTestId(/icon-add/)).toBeInTheDocument();
      });

      it('should toggle to minus icon on click', async () => {
        await userEvent.click(screen.getByTestId('accordion-item-0-trigger'));
        await waitFor(() => expect(screen.queryByTestId(/icon-subtract/)).toBeInTheDocument());
      });
    });

    describe('Lock icon', () => {
      beforeEach(() => {
        renderAccordionItem({
          isLocked: true,
          variant: AccordionItemVariant.lg,
          label: 'Submissions',
          children: <div className={`${px}-sign-up-link`}>Sign Up</div>,
        });
      });

      it('should contain the lock icon', () => {
        expect(screen.queryByTestId(/icon-lock/)).toBeInTheDocument();
      });

      it('should show lock icon content after click', async () => {
        await userEvent.click(screen.getByTestId('accordion-item-0-trigger'));
        await waitFor(() => expect(screen.queryByTestId(/icon-lock/)).toBeInTheDocument());
        const lockedContentElement = screen.getByText('Sign Up');
        expect(lockedContentElement).toHaveClass(`${px}-sign-up-link`);
      });
    });
  });

  describe('Variants', () => {
    it('singleCollapsible variant should only allow one item to be open at a time', async () => {
      render(
        <Accordion variant="singleCollapsible">
          <AccordionItem variant={AccordionItemVariant.sm} label="Provenance" id="accordion-item-0">
            <div>Lorem ipsum</div>
          </AccordionItem>
          <AccordionItem variant={AccordionItemVariant.sm} label="Exhibitied" id="accordion-item-1">
            <div>Log In</div>
          </AccordionItem>
        </Accordion>,
      );

      const accordionItemTriggers = screen.queryAllByTestId(/accordion-item-\d-trigger/);
      expect(accordionItemTriggers).toHaveLength(2);
      accordionItemTriggers.forEach((trigger) => expect(trigger).toHaveAttribute('aria-expanded', 'false'));

      await userEvent.click(screen.getByTestId('accordion-item-0-trigger'));
      expect(screen.getByTestId('accordion-item-0-trigger')).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByTestId('accordion-item-1-trigger')).toHaveAttribute('aria-expanded', 'false');

      await userEvent.click(screen.getByTestId('accordion-item-1-trigger'));
      expect(screen.getByTestId('accordion-item-1-trigger')).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByTestId('accordion-item-0-trigger')).toHaveAttribute('aria-expanded', 'false');
    });

    it('should contain the contents and expand once the label is clicked', async () => {
      const { container } = render(
        <Accordion>
          <AccordionItem isLocked={false} variant={AccordionItemVariant.sm} label="Provenance" id="accordion-item-0">
            <div>Lorem ipsum</div>
          </AccordionItem>
          <AccordionItem isLocked={true} variant={AccordionItemVariant.sm} label="Exhibitied" id="accordion-item-1">
            <div>Log In</div>
          </AccordionItem>
        </Accordion>,
      );

      expect(container.querySelectorAll(`.${px}-accordion-item[data-state="open"]`)).toHaveLength(0);
      expect(container.querySelectorAll(`.${px}-accordion-item[data-state="closed"]`)).toHaveLength(2);

      await userEvent.click(screen.getByTestId('accordion-item-0-trigger'));
      expect(container.querySelectorAll(`.${px}-accordion-item[data-state="open"]`)).toHaveLength(1);
      expect(container.querySelectorAll(`.${px}-accordion-item[data-state="closed"]`)).toHaveLength(1);

      await userEvent.click(screen.getByTestId('accordion-item-1-trigger'));
      expect(container.querySelectorAll(`.${px}-accordion-item[data-state="open"]`)).toHaveLength(2);
      expect(container.querySelectorAll(`.${px}-accordion-item[data-state="closed"]`)).toHaveLength(0);
    });
  });

  describe('getAccordionVariantProps', () => {
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
});
