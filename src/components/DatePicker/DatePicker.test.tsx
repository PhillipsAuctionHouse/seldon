import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import * as React from 'react';

import DatePicker from "./DatePicker";

describe('A DatePicker', () => {
  const reqProps = {labelText: 'My Test Label', id: "test-id"}

  it('will render a default value if passed', () => {
    const testRef = React.createRef<HTMLInputElement>();
    render(<DatePicker ref={testRef} {...reqProps} defaultValue={[new Date('2023-06-01T08:30'), new Date('2023-06-05T08:30')]}/>)
    expect(testRef?.current?.value).toEqual('2023-06-01 to 2023-06-05');
  });
});