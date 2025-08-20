import TextBanner from './TextBanner';
import { runCommonTests } from '../../utils/testUtils';
import { forwardRef } from 'react';

describe('TextBanner', () => {
  const ComponentWithRef = forwardRef<HTMLDivElement, React.ComponentProps<typeof TextBanner>>((props, ref) => (
    <TextBanner {...props} ref={ref} />
  ));
  ComponentWithRef.displayName = 'ComponentWithRef';
  runCommonTests(ComponentWithRef, 'TextBanner');
});
