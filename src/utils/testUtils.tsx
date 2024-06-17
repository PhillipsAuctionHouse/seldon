import { render, screen } from '@testing-library/react';
import { HTMLAttributes, ReactElement } from 'react';
import { px } from '.';
export const runCommonTests = (
  Component: (props: HTMLAttributes<HTMLElement>) => ReactElement,
  componentName: string,
) => {
  it('renders id', () => {
    render(<Component id="componentid">Component with ID</Component>);
    expect(screen.getByText('Component with ID')).toHaveAttribute('id', 'componentid');
  });
  it('renders base component className and classname prop', () => {
    render(<Component className="componentclass">Component with class</Component>);
    const renderedComponent = screen.getByText('Component with class');
    expect(renderedComponent).toHaveClass(`${px}-${componentName.toLowerCase()}`);
    expect(renderedComponent).toHaveClass('componentclass');
  });
  it('renders test id', () => {
    render(<Component id="componentid">Component with class</Component>);
    expect(screen.getByTestId(`${componentName.toLowerCase()}-componentid`)).toBeInTheDocument();
  });
};
