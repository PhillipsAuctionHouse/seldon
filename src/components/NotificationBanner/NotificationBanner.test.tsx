import NotificationBanner from './NotificationBanner';
import { runCommonTests } from '../../utils/testUtils';
import { forwardRef } from 'react';

describe('NotificationBanner', () => {
  const ComponentWithRef = forwardRef<HTMLDivElement, React.ComponentProps<typeof NotificationBanner>>((props, ref) => (
    <NotificationBanner {...props} ref={ref} />
  ));
  ComponentWithRef.displayName = 'ComponentWithRef';
  runCommonTests(ComponentWithRef, 'NotificationBanner');
});
