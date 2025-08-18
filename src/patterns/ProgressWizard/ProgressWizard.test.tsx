import ProgressWizard from './ProgressWizard';
import { runCommonTests } from '../../utils/testUtils';
import { forwardRef } from 'react';

describe('ProgressWizard', () => {
  const ComponentWithRef = forwardRef<HTMLDivElement, React.ComponentProps<typeof ProgressWizard>>((props, ref) => (
    <ProgressWizard {...props} ref={ref} />
  ));
  ComponentWithRef.displayName = 'ComponentWithRef';
  runCommonTests(ComponentWithRef, 'ProgressWizard');
});
