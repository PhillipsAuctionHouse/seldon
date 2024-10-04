import Detail from './Detail';
import { runCommonTests } from '../../utils/testUtils';
import { render } from '@testing-library/react';

describe('Detail', () => {
  runCommonTests(Detail, 'Detail');

  it('should render the label and value', () => {
    const { getByRole } = render(<Detail label="Label" value="Value" />);
    expect(getByRole('term')).toHaveTextContent('Label');
    expect(getByRole('definition')).toHaveTextContent('Value');
  });
});
