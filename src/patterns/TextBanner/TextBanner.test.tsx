import TextBanner from './TextBanner';
import { runCommonTests } from '../../utils/testUtils';
import { forwardRef } from 'react';
import { render } from '@testing-library/react';

describe('TextBanner', () => {
  const ComponentWithRef = forwardRef<HTMLDivElement, React.ComponentProps<typeof TextBanner>>((props, ref) => (
    <TextBanner {...props} ref={ref} />
  ));
  ComponentWithRef.displayName = 'ComponentWithRef';
  runCommonTests(ComponentWithRef, 'TextBanner');

  it('Renders the header when headerText is passed in', () => {
    const { getByText } = render(<TextBanner headerText="This is my text" />);
    expect(getByText(/This is my text/)?.parentElement?.nodeName).toEqual('H1');
    expect(getByText(/This is my text/)).toBeInTheDocument();
  });

  it('Renders the description when description is passed in', () => {
    const { getByText } = render(<TextBanner headerText="This is my text" description="This is my description" />);
    expect(getByText(/This is my description/)?.parentElement?.nodeName).toEqual('SPAN');
    expect(getByText(/This is my description/)).toBeInTheDocument();
  });
});
