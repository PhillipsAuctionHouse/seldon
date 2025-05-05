import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { runCommonTests } from '../../utils/testUtils';
import ComboBox, { ComboBoxProps } from './ComboBox';

const options = [{ value: '1999' }, { value: '2000' }, { value: '2001' }, { value: '2002' }];

describe('ComboBox', () => {
  runCommonTests(ComboBox, 'ComboBox');
  const reqProps = {
    labelText: 'My Test Label',
    id: 'test-id',
    options,
    setInputValue: () => vitest.fn(),
    inputValue: '',
  };

  it('will render a label value if passed', () => {
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

  it('should be able to select an option from the dropdown by clicking on it', async () => {
    const mockSetInputValue = vi.fn();
    render(<ComboBox {...{ ...reqProps, setInputValue: mockSetInputValue }} />);
    const trigger = screen.getAllByTestId('test-id-dropdown')[0];

    expect(trigger).toBeInTheDocument();
    await userEvent.click(trigger);

    const option = screen.getByText('2000');
    expect(option).toBeInTheDocument();
    await userEvent.click(option);

    expect(mockSetInputValue).toHaveBeenCalledWith('2000');
    expect(mockSetInputValue).toHaveBeenCalledTimes(1);
  });

  it('should be able to select an option from the dropdown by keyboard navigation', async () => {
    const mockSetInputValue = vi.fn();
    render(<ComboBox {...{ ...reqProps, setInputValue: mockSetInputValue }} />);
    const trigger = screen.getAllByTestId('test-id-dropdown')[0];

    await userEvent.click(trigger);

    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');

    expect(mockSetInputValue).toHaveBeenCalledWith('2002');
    expect(mockSetInputValue).toHaveBeenCalledTimes(1);
  });

  it('should display No Options when input does not match any options', async () => {
    const mockSetInputValue = vi.fn();
    render(<ComboBox {...{ ...reqProps, setInputValue: mockSetInputValue, inputValue: 'non-existent' }} />);
    const trigger = screen.getAllByTestId('test-id-dropdown')[0];

    await userEvent.click(trigger);
    const input = screen.getAllByTestId('test-id-input')[0];

    await userEvent.click(input);
    await userEvent.type(input, 'HI');

    expect(screen.queryByText('No Options.')).toBeInTheDocument();
  });

  it('should clear input value when the close button is clicked', async () => {
    const mockSetInputValue = vi.fn();
    render(
      <>
        <ComboBox {...{ ...reqProps, setInputValue: mockSetInputValue }} />
        <div data-testid="outside-element">Outside Element</div>
      </>,
    );
    const trigger = screen.getAllByTestId('test-id-dropdown')[0];

    await userEvent.click(trigger);
    const input = screen.getAllByTestId('test-id-input')[0];

    await userEvent.click(input);
    await userEvent.type(input, 'BYE');

    const outsideElement = screen.getByTestId('outside-element');
    await userEvent.click(outsideElement);

    expect(input).toHaveValue('');
  });

  it('should clear the input value when the close button is clicked', async () => {
    const ComboBoxWrapper = (props: ComboBoxProps) => {
      const [inputValue, setInputValue] = useState('');
      return <ComboBox {...props} inputValue={inputValue} setInputValue={setInputValue} />;
    };

    render(
      <ComboBoxWrapper
        labelText="Test Label"
        id="test-id"
        options={options}
        inputValue=""
        setInputValue={() => undefined}
      />,
    );

    const trigger = screen.getByTestId('test-id-dropdown');
    await userEvent.click(trigger);

    const input = screen.getByTestId('test-id-input');
    expect(input).toBeInTheDocument();

    await userEvent.type(input, '2001');
    expect(input).toHaveValue('2001');

    const closeButton = screen.getByTestId('test-id-item-close-button');
    await userEvent.click(closeButton);
    expect(input).toHaveValue('');
  });
});
