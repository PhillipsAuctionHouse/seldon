import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import { runCommonTests } from '../../utils/testUtils';

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
    expect(screen.queryByTestId(/accordion-item-0-plusIcon/)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('accordion-item-0-trigger'));
    await waitFor(() => expect(screen.queryByTestId(/accordion-item-0-minusIcon/)).toBeInTheDocument());
  });

  it('should contain the lock icon and lock icon content', async () => {
    render(
      <Accordion>
        {[
          {
            isLocked: true,
            variation: 'lg',
            label: 'Submissions',
            children: <div className="phillips-sign-up-link">Sign Up</div>,
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
    expect(screen.queryByTestId('accordion-item-0-lockedIcon')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('accordion-item-0-trigger'));
    await waitFor(() => expect(screen.queryByTestId('accordion-item-0-lockedIcon')).toBeInTheDocument());
    const lockedContentElement = screen.getByText('Sign Up');
    expect(lockedContentElement).toHaveClass('phillips-sign-up-link');
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
    expect(screen.queryByTestId(/accordion-item-0-plusIcon/)).toBeInTheDocument();
    expect(screen.queryByTestId(/accordion-item-1-lockedIcon/)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('accordion-item-0-trigger'));
    await waitFor(() => {
      expect(container.getElementsByClassName('phillips-accordion-item--expanded').length).toBe(1);
    });
  });
});
