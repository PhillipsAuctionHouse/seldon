import Icon from './Icon';
import { render } from '@testing-library/react';

const vars = vi.hoisted(() => '$pure-black: COLOR_DEFAULT;\n$test-color: COLOR_RED;\n');
vi.mock('#scss/_vars.scss?raw', () => ({ default: vars }));

describe('Icon', () => {
  it('should render the icon', () => {
    const { getByTestId } = render(<Icon icon="AccountCircle" />);
    expect(getByTestId('icon-account-circle')).toBeInTheDocument();
  });

  it('should render the icon with the proper test id', () => {
    const { getByTestId } = render(<Icon icon="Calendar" />);
    expect(getByTestId('icon-calendar')).toBeInTheDocument();
  });

  it('should apply correct height and width styles based on props', () => {
    const { getByTestId } = render(<Icon icon="AccountCircle" height={32} width={32} color="$pure-black" />);
    const icon = getByTestId('icon-account-circle');
    expect(icon).toHaveAttribute('height', '32');
    expect(icon).toHaveAttribute('width', '32');
  });

  it('should apply correct color style based on prop', () => {
    const { getByTestId } = render(<Icon icon="AccountCircle" height={32} width={32} color="$test-color" />);
    const icon = getByTestId('icon-account-circle');
    expect(icon).toHaveAttribute('fill', 'COLOR_RED');
  });

  it('should apply default color if color prop is not found in vars', () => {
    const { getByTestId } = render(<Icon icon="AccountCircle" height={32} width={32} color="$fake-color" />);
    const icon = getByTestId('icon-account-circle');
    expect(icon).toHaveAttribute('fill', '$fake-color');
  });

  it('should return null if icon does not exist', () => {
    // @ts-expect-error icon prop must match existing icon names
    const { container } = render(<Icon icon="FakeIcon" />);
    expect(container.firstChild).toBeNull();
  });
});
