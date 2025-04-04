import { render, screen } from '@testing-library/react';
import Divider, { DividerProps } from './Divider';
import { runCommonTests } from '../../utils/testUtils';

describe('Divider', () => {
  runCommonTests(Divider, 'Divider');
  const renderDivider = (props: DividerProps) => {
    render(<Divider {...props} />);
  };

  it('renders with data-testid attribute', () => {
    renderDivider({ id: 'test-id' });
    expect(screen.getByTestId('divider-test-id')).toBeInTheDocument();
  });
});
