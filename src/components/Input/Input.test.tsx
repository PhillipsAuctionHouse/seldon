import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import Input, { InputProps } from './Input';
import { px } from '../../utils';

// NOTE: When using default value on controlled input we pass to the state hook and not the input
const TestInput = React.forwardRef(
  ({ defaultValue, ...props }: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [value, setValue] = React.useState<string | undefined>((defaultValue as string) ?? '');
    const handleOnChange = function (e: React.ChangeEvent<HTMLInputElement>) {
      setValue(e?.currentTarget?.value);
    };
    return <Input ref={ref} {...props} value={value} onChange={handleOnChange} />;
  },
);

TestInput.displayName = 'TestInput';

const reqProps = { labelText: 'My Test Label', id: 'test-id' };

describe('An Input', () => {
  it('renders checkbox input type', () => {
    render(<Input {...reqProps} type="checkbox" />);
    expect(screen.getByTestId('test-id')).toHaveAttribute('type', 'checkbox');
  });

  it('renders radio input type', () => {
    render(<Input {...reqProps} type="radio" />);
    expect(screen.getByTestId('test-id')).toHaveAttribute('type', 'radio');
  });

  it('renders inputAdornment for all supported input types', () => {
    const types = [
      'text',
      'number',
      'password',
      'email',
      'tel',
      'url',
      'search',
      'date',
      'datetime-local',
      'month',
      'time',
      'week',
    ];
    types.forEach((type) => {
      render(
        <Input
          id={`adorned-input-${type}`}
          labelText="Adorned Input"
          inputAdornment={<span data-testid={`custom-adornment-${type}`}>Adornment</span>}
          type={type}
        />,
      );
      expect(screen.getByTestId(`adornment-adorned-input-${type}`)).toBeInTheDocument();
      expect(screen.getByTestId(`custom-adornment-${type}`)).toBeInTheDocument();
    });
  });

  it('renders skeleton for checkboxes', () => {
    render(<Input labelText="Text Input" id="Input-2" name="stringInput" isSkeletonLoading type="checkbox" />);
    expect(screen.getByTestId('Input-2')).toHaveClass(`${px}-skeleton`);
  });

  it('renders skeleton for radio buttons', () => {
    render(<Input labelText="Text Input" id="Input-3" name="stringInput" isSkeletonLoading type="radio" />);
    expect(screen.getByTestId('Input-3')).toHaveClass(`${px}-skeleton`);
  });

  it('will render a default value if passed', () => {
    const testRef = React.createRef<HTMLInputElement>();
    render(<Input ref={testRef} {...reqProps} defaultValue="Default Value" />);
    expect(testRef?.current?.value).toEqual('Default Value');
  });

  it('will remain uncontrolled input even with a default Value', async () => {
    const testRef = React.createRef<HTMLInputElement>();
    render(<Input ref={testRef} {...reqProps} defaultValue="Default Value" />);
    await userEvent.type(screen.getByTestId('test-id'), 's');
    await waitFor(() => expect(testRef?.current?.value).toEqual('Default Values'));
  });

  it('will update the value when used as controlled input', async () => {
    const testRef = React.createRef<HTMLInputElement>();
    render(<TestInput ref={testRef} {...reqProps} />);
    await userEvent.type(screen.getByTestId('test-id'), 'Controlled Value');
    await waitFor(() => expect(testRef?.current?.value).toEqual('Controlled Value'));
  });

  it('will update the value when used as controlled input and given a defaultValue', async () => {
    const testRef = React.createRef<HTMLInputElement>();
    render(<TestInput ref={testRef} {...reqProps} defaultValue="Default Value" />);
    await userEvent.type(screen.getByTestId('test-id'), 's');
    await waitFor(() => expect(testRef?.current?.value).toEqual('Default Values'));
  });

  it('will render a valdation message when set as invalid', () => {
    const { rerender } = render(<Input {...reqProps} invalidText="Your input is invalid" />);
    expect(screen.queryByText(/Your input is invalid/)).not.toBeInTheDocument();
    rerender(<Input {...reqProps} invalid invalidText="Your input is invalid" />);
    expect(screen.queryByText(/Your input is invalid/)).toBeInTheDocument();
  });

  it('will render a warning message when set as warn', () => {
    const { rerender } = render(<Input {...reqProps} warnText="Your input is in warning state" />);
    expect(screen.queryByText(/Your input is in warning state/)).not.toBeInTheDocument();
    rerender(<Input {...reqProps} warn warnText="Your input is in warning state" />);
    expect(screen.queryByText(/Your input is in warning state/)).toBeInTheDocument();
  });

  it('will render a react node as the warnText or invalidText', () => {
    const warnText = (
      <div>
        <h1 data-testid="span">The</h1>
        <p>End Is Near!</p>
      </div>
    );
    const invalidText = (
      <div>
        <h1 data-testid="span">This</h1>
        <p>Is Not Valid!</p>
      </div>
    );
    const { rerender } = render(<Input {...reqProps} warn warnText={warnText} />);
    expect(screen.queryByText(/The/)).toBeInTheDocument();
    rerender(<Input {...reqProps} invalid invalidText={invalidText} />);
    expect(screen.queryByText(/This/)).toBeInTheDocument();
  });

  it('will only render a warning message when input is not invalid', () => {
    const { rerender } = render(
      <Input {...reqProps} invalidText="invalid" warn warnText="Your input is in warning state" />,
    );
    expect(screen.queryByText(/Your input is in warning state/)).toBeInTheDocument();
    rerender(<Input {...reqProps} invalid invalidText="invalid" warn warnText="Your input is in warning state" />);
    expect(screen.queryByText(/Your input is in warning state/)).not.toBeInTheDocument();
    expect(screen.queryByText(/invalid/)).toBeInTheDocument();
  });

  it('will not render a warning message or invalid message when input is disabled or readonly', () => {
    const { rerender } = render(
      <Input {...reqProps} disabled invalid invalidText="invalid" warn warnText="Your input is in warning state" />,
    );
    expect(screen.queryByText(/Your input is in warning state/)).not.toBeInTheDocument();
    expect(screen.queryByText(/invalid/)).not.toBeInTheDocument();
    rerender(
      <Input {...reqProps} readOnly invalid invalidText="invalid" warn warnText="Your input is in warning state" />,
    );
    expect(screen.queryByText(/Your input is in warning state/)).not.toBeInTheDocument();
    expect(screen.queryByText(/invalid/)).not.toBeInTheDocument();
  });

  it('will fire the onClick handler when clicked', async () => {
    const mockedOnClick = vi.fn();
    render(<Input {...reqProps} onClick={mockedOnClick} />);
    await userEvent.click(screen.getByTestId('test-id'));
    await waitFor(() => expect(mockedOnClick.mock.calls).toHaveLength(1));
  });

  it('will change the input value', async () => {
    render(<Input {...reqProps} />);
    await userEvent.click(screen.getByTestId('test-id'));
    await userEvent.keyboard('s');
    expect(screen.getByTestId('test-id')).toHaveValue('s');
  });

  it('will not fire the onClick handler when disabled', async () => {
    const mockedOnClick = vi.fn();
    render(<Input {...reqProps} onClick={mockedOnClick} disabled />);
    await userEvent.click(screen.getByTestId('test-id'));
    expect(mockedOnClick).not.toHaveBeenCalled();
  });

  it('will not change the input when readOnly', async () => {
    render(<Input {...reqProps} readOnly />);
    await userEvent.click(screen.getByTestId('test-id'));
    await userEvent.keyboard('s');
    expect(screen.getByTestId('test-id')).not.toHaveValue('s');
  });

  it('should render labelText as a ReactNode', () => {
    render(
      <Input
        id="test-select-label"
        labelText={
          <div>
            <p>
              Test paragraph<span>Test Span</span>
            </p>
          </div>
        }
      />,
    );

    const labelElement = screen.getByTestId('label-test-select-label');
    expect(labelElement).toBeInTheDocument();

    const wrapperElement = screen.getByText('Test paragraph');
    expect(wrapperElement).toBeInTheDocument();

    const spanElement = screen.getByText('Test Span');
    expect(spanElement).toBeInTheDocument();
  });

  it('should render with skeleton class name', () => {
    render(<Input labelText="Text Input" id="Input-1" name="stringInput" isSkeletonLoading />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass(`${px}-skeleton`);
  });

  it('should not render with skeleton class name', () => {
    render(<Input labelText="Text Input" id="Input-1" name="stringInput" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).not.toHaveClass(`${px}-skeleton`);
  });

  it('renders inputAdornment when provided', () => {
    render(
      <Input
        id="adorned-input"
        labelText="Adorned Input"
        inputAdornment={<span data-testid="custom-adornment">Adornment</span>}
      />,
    );
    expect(screen.getByTestId('adornment-adorned-input')).toBeInTheDocument();
    expect(screen.getByTestId('custom-adornment')).toBeInTheDocument();
  });
});
