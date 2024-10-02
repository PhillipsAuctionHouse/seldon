import { render, screen } from '@testing-library/react';
import { ElementType } from 'react';
import { px } from '.';
import { kebabCase } from 'change-case';
export const runCommonTests = (Component: ElementType, componentName: string, props?: object) => {
  it('renders id', () => {
    render(<Component id="componentid" {...props} />);
    expect(screen.getAllByTestId(/componentid/)?.[0]).toHaveAttribute('id', 'componentid');
  });
  it('renders base component className and classname prop', () => {
    render(<Component id="componentid" className="componentclass" {...props} />);
    const renderedComponent = screen.getAllByTestId(/componentid/)?.[0];
    expect(renderedComponent).toHaveClass(`${px}-${kebabCase(componentName)}`);
    expect(renderedComponent).toHaveClass('componentclass');
  });
  it('renders test id', () => {
    render(<Component id="componentid" {...props} />);
    expect(screen.getAllByTestId(`${kebabCase(componentName)}-componentid`)?.[0]).toBeInTheDocument();
  });
};
