import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import Input, { InputProps } from './Input';
import { px } from '../../utils';

const reqProps = { labelText: 'My Test Label', id: 'test-id' };

const TestInput = React.forwardRef(
  ({ defaultValue, ...props }: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [value, setValue] = React.useState<string | undefined>((defaultValue as string) ?? '');
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e?.currentTarget?.value);
    return <Input ref={ref} {...props} value={value} onChange={handleOnChange} />;
  },
);

TestInput.displayName = 'TestInput';

describe('Input', () => {
  describe('input types', () => {
    it.each([['checkbox'], ['radio']])('renders %s input type', (type) => {
      render(<Input {...reqProps} type={type} />);
      expect(screen.getByTestId('test-id')).toHaveAttribute('type', type);
    });

    it.each([['checkbox'], ['radio']])('renders skeleton for %s', (type) => {
      render(<Input labelText="Text Input" id="Input-2" name="stringInput" isSkeletonLoading type={type} />);
      expect(screen.getByTestId('Input-2')).toHaveClass(`${px}-skeleton`);
    });
  });

  describe('inputAdornment', () => {
    it.each([
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
    ])('renders inputAdornment for %s type', (type) => {
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

  describe('controlled and uncontrolled', () => {
    it('renders default value if passed', () => {
      const testRef = React.createRef<HTMLInputElement>();
      render(<Input ref={testRef} {...reqProps} defaultValue="Default Value" />);
      expect(testRef?.current?.value).toEqual('Default Value');
    });

    it('remains uncontrolled input even with defaultValue', async () => {
      const testRef = React.createRef<HTMLInputElement>();
      render(<Input ref={testRef} {...reqProps} defaultValue="Default Value" />);
      await userEvent.type(screen.getByTestId('test-id'), 's');
      await waitFor(() => expect(testRef?.current?.value).toEqual('Default Values'));
    });

    it('updates value when used as controlled input', async () => {
      const testRef = React.createRef<HTMLInputElement>();
      render(<TestInput ref={testRef} {...reqProps} />);
      await userEvent.type(screen.getByTestId('test-id'), 'Controlled Value');
      await waitFor(() => expect(testRef?.current?.value).toEqual('Controlled Value'));
    });

    it('updates value when used as controlled input with defaultValue', async () => {
      const testRef = React.createRef<HTMLInputElement>();
      render(<TestInput ref={testRef} {...reqProps} defaultValue="Default Value" />);
      await userEvent.type(screen.getByTestId('test-id'), 's');
      await waitFor(() => expect(testRef?.current?.value).toEqual('Default Values'));
    });
  });

  describe('validation and warning', () => {
    it('renders validation message when invalid', () => {
      const { rerender } = render(<Input {...reqProps} invalidText="Your input is invalid" />);
      expect(screen.queryByText(/Your input is invalid/)).not.toBeInTheDocument();
      rerender(<Input {...reqProps} invalid invalidText="Your input is invalid" />);
      expect(screen.queryByText(/Your input is invalid/)).toBeInTheDocument();
    });

    it('renders warning message when warn', () => {
      const { rerender } = render(<Input {...reqProps} warnText="Your input is in warning state" />);
      expect(screen.queryByText(/Your input is in warning state/)).not.toBeInTheDocument();
      rerender(<Input {...reqProps} warn warnText="Your input is in warning state" />);
      expect(screen.queryByText(/Your input is in warning state/)).toBeInTheDocument();
    });

    it('renders ReactNode as warnText or invalidText', () => {
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

    it('only renders warning when not invalid', () => {
      const { rerender } = render(
        <Input {...reqProps} invalidText="invalid" warn warnText="Your input is in warning state" />,
      );
      expect(screen.queryByText(/Your input is in warning state/)).toBeInTheDocument();
      rerender(<Input {...reqProps} invalid invalidText="invalid" warn warnText="Your input is in warning state" />);
      expect(screen.queryByText(/Your input is in warning state/)).not.toBeInTheDocument();
      expect(screen.queryByText(/invalid/)).toBeInTheDocument();
    });

    it('does not render warning or invalid message when disabled or readonly', () => {
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
  });

  describe('user interactions', () => {
    it('fires onClick handler when clicked', async () => {
      const mockedOnClick = vi.fn();
      render(<Input {...reqProps} onClick={mockedOnClick} />);
      await userEvent.click(screen.getByTestId('test-id'));
      await waitFor(() => expect(mockedOnClick.mock.calls).toHaveLength(1));
    });

    it('changes input value', async () => {
      render(<Input {...reqProps} />);
      await userEvent.click(screen.getByTestId('test-id'));
      await userEvent.keyboard('s');
      expect(screen.getByTestId('test-id')).toHaveValue('s');
    });

    it('does not fire onClick handler when disabled', async () => {
      const mockedOnClick = vi.fn();
      render(<Input {...reqProps} onClick={mockedOnClick} disabled />);
      await userEvent.click(screen.getByTestId('test-id'));
      expect(mockedOnClick).not.toHaveBeenCalled();
    });

    it('does not change input when readOnly', async () => {
      render(<Input {...reqProps} readOnly />);
      await userEvent.click(screen.getByTestId('test-id'));
      await userEvent.keyboard('s');
      expect(screen.getByTestId('test-id')).not.toHaveValue('s');
    });
  });

  describe('labelText', () => {
    it('renders labelText as ReactNode', () => {
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
  });

  describe('skeleton class name', () => {
    it('renders with skeleton class name', () => {
      render(<Input labelText="Text Input" id="Input-1" name="stringInput" isSkeletonLoading />);
      const inputElement = screen.getByRole('textbox');
      expect(inputElement).toHaveClass(`${px}-skeleton`);
    });

    it('does not render with skeleton class name', () => {
      render(<Input labelText="Text Input" id="Input-1" name="stringInput" />);
      const inputElement = screen.getByRole('textbox');
      expect(inputElement).not.toHaveClass(`${px}-skeleton`);
    });
  });
});
