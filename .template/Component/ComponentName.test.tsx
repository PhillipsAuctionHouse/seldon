import ComponentName from './ComponentName';
import { runCommonTests } from '../utils/testUtils';
import { forwardRef } from 'react';

describe('ComponentName', () => {
  const ComponentWithRef = forwardRef<HTMLDivElement, React.ComponentProps<typeof ComponentName>>((props, ref) => (
    <ComponentName {...props} ref={ref} />
  ));
  ComponentWithRef.displayName = 'ComponentWithRef';
  runCommonTests(ComponentWithRef, 'ComponentName');
});
