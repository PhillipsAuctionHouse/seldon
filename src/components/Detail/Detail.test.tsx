import Detail from './Detail';
import { runCommonTests } from '../../utils/testUtils';
import { render, screen } from '@testing-library/react';

import { px } from '../../utils';

describe('Detail', () => {
  runCommonTests(Detail, 'Detail');

  it('should render the label and value', () => {
    render(<Detail label="Label" value="Value" />);
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
  });

  it('will add a no-wrap class if hasWrap is set to false', () => {
    render(<Detail label="Label" value="Value" hasWrap={false} />);
    expect(screen.getByText('Label').parentElement).toHaveClass(`${px}-detail__label--no-wrap`);
  });
});
