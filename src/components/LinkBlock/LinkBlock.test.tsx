import { render, screen } from '@testing-library/react';
import LinkBlock from './LinkBlock';
import Link, { LinkProps } from '../Link/Link';
import { LinkVariants } from '../Link/types';
import { getLinkVariantClassName } from '../Link/utils';
import { runCommonTests } from '../../utils/testUtils';
import { forwardRef } from 'react';

const linkProps = {
  href: 'https://example.com',
  target: '_blank',
  children: 'My Link',
  element: Link,
};

describe('LinkBlock', () => {
  const ComponentWithRef = forwardRef<HTMLDivElement, React.ComponentProps<typeof LinkBlock>>((props, ref) => (
    <LinkBlock {...props} linkProps={linkProps} ref={ref} />
  ));
  ComponentWithRef.displayName = 'ComponentWithRef';
  runCommonTests(ComponentWithRef, 'LinkBlock');

  it('renders with data-testid when id prop is passed', () => {
    const id = 'test-id';
    render(<LinkBlock linkProps={linkProps} description="This is a link block" id={id} />);

    expect(screen.queryByTestId('link-block-test-id')).toBeInTheDocument();
  });

  it('renders the link and description correctly', () => {
    render(<LinkBlock linkProps={linkProps} description="This is a link block" />);

    const linkElement = screen.getByRole('link', { name: 'My Link' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveClass(getLinkVariantClassName(LinkVariants.link ?? 'link'));
    expect(linkElement).toHaveAttribute('href', 'https://example.com');
    expect(linkElement).toHaveAttribute('target', '_blank');

    const descriptionElement = screen.getByText('This is a link block');
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders a custom link and description correctly', () => {
    const CustomLink = ({ children, ...props }: LinkProps) => {
      const { href } = props;
      return <a href={href}>{<>Custom Link: {children}</>}</a>;
    };

    const linkProps = {
      href: 'https://customlink.com',
      children: 'Link',
      element: CustomLink,
    };

    render(<LinkBlock linkProps={linkProps} description="This is a custom link block" />);

    const linkElement = screen.getByRole('link', { name: 'Custom Link: Link' });
    expect(linkElement).toBeInTheDocument();
  });
});
