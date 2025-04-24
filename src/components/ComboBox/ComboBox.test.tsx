import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ComboBox from './ComboBox';
import { runCommonTests } from '../../utils/testUtils';

const options = [
  { label: '1999', value: '1999' },
  { label: '2000', value: '2000' },
  { label: '2001', value: '2001' },
  { label: '2002', value: '2002' },
];

describe('ComboBox', () => {
  runCommonTests(ComboBox, 'ComboBox');
  const reqProps = { label: 'My Test Label', id: 'test-id', options, setInputValue: () => vitest.fn(), inputValue: '' };

  it('will render a default value if passed', () => {
    render(<ComboBox {...reqProps} />);
    const label = screen.getAllByTestId('test-id-label');
    expect(label[0]).toBeInTheDocument();
  });

  it('should render the dropdown list after clicking the trigger', async () => {
    render(<ComboBox {...reqProps} />);
    const trigger = screen.getAllByTestId('test-id-dropdown')[0];

    expect(trigger).toBeInTheDocument();
    await userEvent.click(trigger);

    expect(screen.getByText('1999')).toBeInTheDocument();
    expect(screen.getByText('2000')).toBeInTheDocument();
    expect(screen.getByText('2001')).toBeInTheDocument();
    expect(screen.getByText('2002')).toBeInTheDocument();
    expect(screen.queryByText('No Options')).not.toBeInTheDocument();
  });

  // it should be able to select an option from the dropdown by clicking on it

  // it should be able to select an option from the dropdown by keyboard navigation

  // it should display No Options when input does not match any options

  // it should remove all input if the option is not found

  // it should clear the input value when the close button is clicked

  // it should close the dropdown when an option is selected

  // it should close the dropdown when clicking outside of it

  // it should close the dropdown when the escape key is pressed while focused on the input
});
