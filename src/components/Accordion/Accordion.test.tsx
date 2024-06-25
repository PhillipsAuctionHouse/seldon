import { render, screen } from '@testing-library/react';
import Accordion from './Accordion';
import { runCommonTests } from '../../utils/testUtils';

describe('Accordion', () => {
  runCommonTests(Accordion, 'Accordion');

  it('should contain the plus icon and toggles to minus icons', () => {
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
    console.log(screen);
    // expect(screen.queryByTestId(/large-accordion/)).toBeInTheDocument();
  });

  // it should contain the lock icon and lock icon content
  // {
  //   locked: true,
  //   variation: 'lg',
  //   label: 'Submissions',
  //   content: (
  //     <div>Sign Up</div>
  //   ),
  // }

  // it should contain the contents and displayed once the label is clicked
});
