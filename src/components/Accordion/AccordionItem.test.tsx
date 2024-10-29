import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AccordionItem, { AccordionItemProps } from './AccordionItem';
import { AccordionItemVariant } from './types';

const defaultProps = {
  id: 'accordion-item-1',
  label: 'Accordion Item 1',
};

import { px } from '../../utils';
import Accordion from './Accordion';

const AccordionItemWithAccordion = (props: AccordionItemProps) => {
  const combinedProps = { ...defaultProps, ...props };
  return (
    <Accordion>
      <AccordionItem {...combinedProps}>Content</AccordionItem>
    </Accordion>
  );
};

describe('AccordionItem', () => {
  it('renders the AccordionItem with default props', () => {
    render(<AccordionItemWithAccordion {...defaultProps}>Content</AccordionItemWithAccordion>);
    expect(screen.getByTestId('accordion-item-1-trigger')).toBeInTheDocument();
    expect(screen.getByText('Accordion Item 1')).toBeInTheDocument();
  });
  it('renders the accordion item with custom class', () => {
    render(
      <AccordionItemWithAccordion {...defaultProps} className="custom-class">
        Content
      </AccordionItemWithAccordion>,
    );
    expect(screen.getByTestId('accordion').firstChild).toHaveClass('custom-class');
  });
  it('renders the AccordionItem with large variant', () => {
    render(
      <AccordionItemWithAccordion {...defaultProps} variant={AccordionItemVariant.lg}>
        Content
      </AccordionItemWithAccordion>,
    );
    expect(screen.getByTestId('accordion-item-1-trigger')).toHaveClass(`${px}-accordion-item-label--large`);
  });

  it('renders the AccordionItem with locked state', () => {
    render(
      <AccordionItemWithAccordion {...defaultProps} isLocked>
        Content
      </AccordionItemWithAccordion>,
    );
    expect(screen.getByTestId('accordion-item-1-lockedIcon')).toBeInTheDocument();
  });

  it('renders the AccordionItem without border bottom when isLastItem is true', () => {
    render(
      <AccordionItemWithAccordion {...defaultProps} isLastItem>
        Content
      </AccordionItemWithAccordion>,
    );
    expect(screen.getByTestId('accordion-item-1-trigger').parentElement).not.toHaveClass(
      'Accordion-item__border-bottom',
    );
  });

  it('toggles the AccordionItem content on click', async () => {
    render(<AccordionItemWithAccordion {...defaultProps}>Content</AccordionItemWithAccordion>);
    const trigger = screen.getByTestId('accordion-item-1-trigger');
    await userEvent.click(trigger);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
