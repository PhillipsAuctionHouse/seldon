import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import Select from './Select';
import { px } from '../../utils';
import { SelectVariants } from './types';

const getCommonProps = () => ({
  labelText: 'My Test Label',
  id: 'test-id',
});

const getOptions = () => (
  <>
    <option>option one</option>
    <option>option two</option>
  </>
);

describe('A Select', () => {
  describe('value rendering', () => {
    it.each([
      { defaultValue: 'option two', expected: 'option two' },
      { defaultValue: 'option one', expected: 'option one' },
    ])('renders default value $defaultValue', ({ defaultValue, expected }) => {
      const testRef = React.createRef<HTMLSelectElement>();
      render(
        <Select ref={testRef} {...getCommonProps()} defaultValue={defaultValue}>
          {getOptions()}
        </Select>,
      );
      expect(testRef.current?.value).toEqual(expected);
    });
  });

  describe('interactivity', () => {
    it.each([
      { prop: {}, shouldChange: true },
      { prop: { disabled: true }, shouldChange: false },
      { prop: { readOnly: true }, shouldChange: false },
    ])('is interactive: $shouldChange when props are $prop', async ({ prop, shouldChange }) => {
      const testRef = React.createRef<HTMLSelectElement>();
      const mockedOnChange = vi.fn();
      render(
        <Select ref={testRef} {...getCommonProps()} defaultValue="option two" onChange={mockedOnChange} {...prop}>
          {getOptions()}
        </Select>,
      );

      await userEvent.selectOptions(screen.getByTestId('test-id'), ['option one']);
      if (shouldChange) {
        await waitFor(() => expect(mockedOnChange).toHaveBeenCalled());
        expect(testRef.current?.value).toEqual('option one');
      } else {
        await waitFor(() => expect(mockedOnChange).not.toHaveBeenCalled());
        expect(testRef.current?.value).toEqual('option two');
      }
    });
  });

  it('should apply --tertiary class when variant is tertiary', () => {
    render(
      <Select id="test-select-tertiary" labelText="Test Label" variant={SelectVariants.tertiary}>
        {getOptions()}
      </Select>,
    );
    const selectElement = screen.getByTestId('test-select-tertiary');
    expect(selectElement).toHaveClass(`${px}-input__select--tertiary`);
  });

  it('should render labelText as a ReactNode', () => {
    render(
      <Select
        id="test-select-label"
        labelText={
          <div>
            Test Label<span>Test Span</span>
          </div>
        }
      >
        {getOptions()}
      </Select>,
    );
    expect(screen.getByTestId('test-select-label-label')).toBeInTheDocument();
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Test Span')).toBeInTheDocument();
  });
});
