import PhoneNumberInput from './PhoneNumberInput';
import { runCommonTests } from '../../utils/testUtils';
import { forwardRef } from 'react';

describe('PhoneNumberInput', () => {
  const ComponentWithRef = forwardRef<HTMLDivElement, React.ComponentProps<typeof PhoneNumberInput>>((props, ref) => (
    <PhoneNumberInput {...props} ref={ref} />
  ));
  ComponentWithRef.displayName = 'ComponentWithRef';
  runCommonTests(ComponentWithRef, 'PhoneNumberInput');
});
