import { render } from '@testing-library/react';
import * as React from 'react';

import Input from '../Input/Input';

describe('Toggle', () => {
  const reqProps = { labelText: 'My Test Label', id: 'test-id' };
  it('will render a default value if passed', () => {
    const testRef = React.createRef<HTMLInputElement>();
    render(<Input ref={testRef} {...reqProps} defaultChecked={true} type="toggle" />);
    expect(testRef?.current?.checked).toEqual(true);
  });
});
