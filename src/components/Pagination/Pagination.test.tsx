// import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { runCommonTests } from '../../utils/testUtils';

import Pagination from './Pagination';

describe('A Pagination', () => {
  runCommonTests(Pagination, 'Pagination');

  //   const reqProps = { id: 'test-id' };

  //   it('will render a value if passed', () => {
  //     render(
  //       <Pagination {...reqProps} value="Lot 2">
  //         <option>Lot 1</option>
  //         <option>Lot 2</option>
  //         <option>Lot 3</option>
  //       </Pagination>,
  //     );
  //     const selectValue = (screen.getByTestId('test-id-select-button') as HTMLSelectElement).value;
  //     expect(selectValue).toEqual('Lot 2');
  //   });

  //   it('will not be interactive if no children', async () => {
  //     const mockedOnClick = vi.fn();
  //     const mockedOnChange = vi.fn();
  //     const { rerender } = render(
  //       <Pagination {...reqProps} value="option two" onChange={mockedOnChange} onClick={mockedOnClick}>
  //         <option>option one</option>
  //         <option>option two</option>
  //       </Pagination>,
  //     );

  //     await userEvent.selectOptions(screen.getByTestId('test-id-select-button'), ['option one']);
  //     await waitFor(() => expect(mockedOnClick.mock.calls).toHaveLength(2));
  //     await waitFor(() => expect(mockedOnChange.mock.calls).toHaveLength(2));

  //     vi.clearAllMocks();

  //     rerender(<Pagination {...reqProps} onChange={mockedOnChange}></Pagination>);
  //     const selectValue = (screen.getByTestId('test-id-select-button') as HTMLSelectElement).value;
  //     expect(selectValue).toEqual('Lot');
  //     await waitFor(() => expect(mockedOnChange.mock.calls).toHaveLength(0));
  //   });

  //   it('will cycle to last elment if user clicks Previous button on first element, and will cycle to first elment if user clicks Next button on last element', async () => {
  //     const { rerender } = render(
  //       <Pagination {...reqProps} value="1">
  //         <option>1</option>
  //         <option>2</option>
  //         <option>3</option>
  //         <option>4</option>
  //         <option>5</option>
  //       </Pagination>,
  //     );
  //     await userEvent.click(screen.getByTestId('test-id-previous-button'));
  //     const prevSelectValue = (screen.getByTestId('test-id-select-button') as HTMLSelectElement).value;
  //     expect(prevSelectValue).toEqual('5');

  //     vi.clearAllMocks();
  //     rerender(
  //       <Pagination {...reqProps} value="5">
  //         <option>1</option>
  //         <option>2</option>
  //         <option>3</option>
  //         <option>4</option>
  //         <option>5</option>
  //       </Pagination>,
  //     );
  //     await userEvent.click(screen.getByTestId('test-id-next-button'));
  //     const nextSelectValue = (screen.getByTestId('test-id-select-button') as HTMLSelectElement).value;
  //     expect(nextSelectValue).toEqual('1');
  //   });

  //   it('will trigger onChange if the user selects new option on dropdown, Previous button and, or Next button', async () => {
  //     const mockedOnChange = vi.fn();
  //     render(
  //       <Pagination {...reqProps} value="Lot 2" onChange={mockedOnChange}>
  //         <option>Lot 1</option>
  //         <option>Lot 2</option>
  //         <option>Lot 3</option>
  //       </Pagination>,
  //     );
  //     await userEvent.click(screen.getByTestId('test-id-previous-button'));
  //     await userEvent.selectOptions(screen.getByTestId('test-id-select-button'), ['Lot 3']);
  //     await waitFor(() => expect(mockedOnChange.mock.calls).toHaveLength(3));
  //   });
});
