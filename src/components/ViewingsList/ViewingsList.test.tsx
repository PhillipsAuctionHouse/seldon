import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import StatefulViewingsList from './StatefulViewingsList';
import { defaultViewing, validate, handleOnSave } from './utils';
import { ViewingsListCardProps } from './ViewingsListCard';

describe('ViewingsList', () => {
  const reqProps = { title: 'Tour Viewing(s) on Overview Tab', id: 'test-id', validate, onSave: handleOnSave };
  it('renders a list of ViewingsList cards when passed an array of viewing list objects', async () => {
    render(<StatefulViewingsList {...reqProps} defaultViewing={defaultViewing} />);
    expect(screen.getByText(/One title/)).toBeInTheDocument();
    expect(screen.getByTestId<HTMLInputElement>('enableOnSite-test-id').value).toEqual('true');
  });

  it('will create a new ViewingsListCard when I click "Add Viewing" and persist when I save', async () => {
    const user = userEvent.setup();
    render(<StatefulViewingsList {...reqProps} defaultViewing={defaultViewing} />);
    expect(screen.queryByText(/Viewing Details 2/)).not.toBeInTheDocument();
    await user.click(screen.getByText(/ADD VIEWING/));
    await user.keyboard('France');
    await user.click(screen.getByText(/SAVE DETAILS/));
    expect(screen.getByText(/Viewing Details 2/)).toBeInTheDocument();
  });

  it('will delete a new ViewingsListCard when I click "DELETE"', async () => {
    const user = userEvent.setup();
    render(<StatefulViewingsList {...reqProps} defaultViewing={defaultViewing} />);
    expect(screen.getByText(/Viewing Details 1/)).toBeInTheDocument();
    await user.click(screen.getByText(/DELETE/));
    expect(screen.queryByText(/Viewing Details 1/)).not.toBeInTheDocument();
  });

  it('will show preview fields when preview toggle is on', async () => {
    const user = userEvent.setup();
    render(<StatefulViewingsList {...reqProps} defaultViewing={defaultViewing} />);
    await user.click(screen.getByText(/EDIT/));
    const firstPreviewItem = screen.getByTestId<HTMLInputElement>('previewLabel-test-id').parentElement;
    expect(firstPreviewItem?.classList?.contains('phillips-input--hidden')).toBeFalsy();
    await user.click(screen.getByTestId('previewOn-test-id').previousSibling as Element);
    expect(firstPreviewItem?.classList?.contains('phillips-input--hidden')).toBeTruthy();
  });

  it('will validate when passed a validation function', async () => {
    const user = userEvent.setup();
    render(<StatefulViewingsList {...reqProps} />);
    await user.click(screen.getByText(/ADD VIEWING/));
    await user.keyboard('london');
    await user.click(screen.getByText(/SAVE DETAILS/));
    expect(screen.getByText(/Can't be london!/)).toBeInTheDocument();
  });

  it('will cancel changes made to veiwing when I click "CANCEL" and persist when I click "SAVE', async () => {
    const user = userEvent.setup();
    render(
      <StatefulViewingsList
        title="Tour Viewing(s) on Overview Tab"
        defaultViewing={defaultViewing}
        onSave={handleOnSave}
      />,
    );
    await user.click(screen.getByText(/EDIT/));
    await user.keyboard('{backspace}{backspace}{backspace}');
    await user.click(screen.getByText(/CANCEL/));
    expect(screen.getByText(/One title/)).toBeInTheDocument();
    await user.click(screen.getByText(/EDIT/));
    await user.keyboard('{backspace}{backspace}{backspace}');
    await user.click(screen.getByText(/SAVE DETAILS/));
    expect(screen.getByText(/One ti/)).toBeInTheDocument();
  });

  it('will save all values of the form and return them as part of the "handleOnSave" callback', async () => {
    const user = userEvent.setup();
    const mockedHandleOnSave = jest.fn().mockImplementation((e, cb) => {
      const targ = e?.target as HTMLElement;
      const inputs = targ.closest('.phillips-viewings-list-card')?.querySelectorAll('input');

      const el: ViewingsListCardProps = { id: '' };
      inputs?.forEach((input) => {
        el[input.name] = input.value;
      });
      cb((prevViewings: ViewingsListCardProps[]) => {
        let returnValue: ViewingsListCardProps[] = [];
        if (prevViewings) {
          const unique = prevViewings.filter((view) => {
            return view?.id !== el.id;
          });
          returnValue = [...unique, el as ViewingsListCardProps];
        } else {
          returnValue = [el as ViewingsListCardProps];
        }

        return returnValue;
      });
      return el;
    });
    render(<StatefulViewingsList title="Tour Viewing(s) on Overview Tab" id="test-id" onSave={mockedHandleOnSave} />);
    await user.click(screen.getByText(/ADD VIEWING/));

    await user.keyboard('One title');
    await user.click(screen.getByTestId(/^(previewOn-)[a-zA-z0-9]+/).previousSibling as Element);
    await user.click(screen.getByTestId(/^(previewLabel-)[a-zA-z0-9]+/));
    await user.keyboard('Opening Night');
    await user.click(screen.getByTestId(/^(previewDates-)[a-zA-z0-9]+/));
    await user.keyboard('3-6 November');
    await user.click(screen.getByTestId(/^(previewHours1-)[a-zA-z0-9]+/));
    await user.keyboard('8am - 9pm');
    await user.click(screen.getByTestId(/^(previewHours2-)[a-zA-z0-9]+/));
    await user.keyboard('After closing');
    await user.click(screen.getByTestId(/^(viewingLabel-)[a-zA-z0-9]+/));
    await user.keyboard('Open to the public');
    await user.click(screen.getByTestId(/^(viewingDates-)[a-zA-z0-9]+/));
    await user.keyboard('3-6 December');
    await user.click(screen.getByTestId(/^(viewingHours1-)[a-zA-z0-9]+/));
    await user.keyboard('7am - 8pm');
    await user.click(screen.getByTestId(/^(viewingHours2-)[a-zA-z0-9]+/));
    await user.keyboard('9:30pm - 10pm');
    await user.click(screen.getByTestId(/^(address1-)[a-zA-z0-9]+/));
    await user.keyboard('432 PARK AVE');
    await user.click(screen.getByTestId(/^(address2-)[a-zA-z0-9]+/));
    await user.keyboard('Coral Springs, FL 07677');
    await user.click(screen.getByTestId(/^(address3-)[a-zA-z0-9]+/));
    await user.keyboard('United States');
    await user.click(screen.getByTestId(/^(addressUrl-)[a-zA-z0-9]+/));
    await user.keyboard('HTTP://WWW.WEBSITE.COM');
    await user.click(screen.getByTestId(/^(enableOnSite-)[a-zA-z0-9]+/).previousSibling as Element);

    await user.click(screen.getByText(/SAVE DETAILS/));
    expect(mockedHandleOnSave).toReturnWith(
      expect.objectContaining({
        address1: '432 PARK AVE',
        address2: 'Coral Springs, FL 07677',
        address3: 'United States',
        addressUrl: 'HTTP://WWW.WEBSITE.COM',
        enableOnSite: 'true',
        location: 'One title',
        previewDates: '3-6 November',
        previewHours1: '8am - 9pm',
        previewHours2: 'After closing',
        previewLabelValue: 'Opening Night',
        previewOn: 'true',
        viewingDates: '3-6 December',
        viewingHours1: '7am - 8pm',
        viewingHours2: '9:30pm - 10pm',
        viewingLabelValue: 'Open to the public',
      }),
    );
  });
});
