import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Accordion from './Accordion';
import { runCommonTests } from '../../utils/testUtils';

describe('Accordion', () => {
  runCommonTests(Accordion, 'Accordion');

  it('should contain the plus icon and toggles to minus icons on click', async () => {
    render(
      <Accordion
        items={[
          {
            locked: false,
            variation: 'lg',
            label: 'Consignment',
            content: <div>Lorem ipsum</div>,
          },
        ]}
        id="large-accordion"
      />,
    );
    expect(screen.queryByTestId(/accordion-item-0-plusIcon/)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('accordion-item-0'));
    await waitFor(() => expect(screen.queryByTestId(/accordion-item-0-minusIcon/)).toBeInTheDocument());
  });

  it('should contain the lock icon and lock icon content', async () => {
    render(
      <Accordion
        items={[
          {
            locked: true,
            variation: 'lg',
            label: 'Submissions',
            content: <div className="phillips-sign-up-link">Sign Up</div>,
          },
        ]}
        id="large-accordion"
      />,
    );
    expect(screen.queryByTestId(/accordion-item-0-lockedIcon/)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('accordion-item-0'));
    await waitFor(() => expect(screen.queryByTestId(/accordion-item-0-lockedIcon/)).toBeInTheDocument());
    const lockedContentElement = screen.getByText('Sign Up');
    expect(lockedContentElement).toHaveClass('phillips-sign-up-link');
  });

  it('should contain the contents and expand once the label is clicked', async () => {
    const { container } = render(
      <Accordion
        items={[
          {
            locked: false,
            variation: 'sm',
            label: 'Provenance',
            content: <div>Lorem ipsum</div>,
          },
          {
            locked: true,
            variation: 'sm',
            label: 'Exhibitied',
            content: <div>Log In</div>,
          },
        ]}
        id="small-accordion"
      />,
    );
    expect(screen.queryByTestId(/accordion-item-0-plusIcon/)).toBeInTheDocument();
    expect(screen.queryByTestId(/accordion-item-1-lockedIcon/)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('accordion-item-0'));
    await waitFor(() => {
      expect(container.getElementsByClassName('phillips-accordionItem__expanded').length).toBe(1);
    });
  });
});
