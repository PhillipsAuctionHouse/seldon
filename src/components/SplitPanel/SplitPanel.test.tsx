import { render, screen } from '@testing-library/react';

import SplitPanel from './SplitPanel';
import { runCommonTests } from '../../utils/testUtils';
import { px } from '../../utils';

describe('SplitPanel', () => {
  runCommonTests(SplitPanel, 'SplitPanel');

  it('is selectable by the test id', () => {
    render(<SplitPanel id="SplitPanel-test" />);
    expect(screen.queryByTestId(/SplitPanel-test/)).toBeInTheDocument();
  });

  it('it will replace element with one provided as prop', () => {
    render(<SplitPanel element="span" />);
    expect(screen.queryByTestId(/split-panel/)?.nodeName).toEqual('SPAN');
  });

  it('it will render the contents of the left and right component', () => {
    render(
      <SplitPanel>
        <div>Left</div>
        <div>Right</div>
      </SplitPanel>,
    );
    expect(screen.queryByText(/Left/)).toBeInTheDocument();
    expect(screen.queryByText(/Right/)).toBeInTheDocument();
  });

  it('it will add a class if hasBorder is false', () => {
    render(<SplitPanel hasBorder={false} />);
    expect(screen.queryByTestId(/split-panel/)).toHaveClass(`${px}-split-panel--borderless`);
  });
});
