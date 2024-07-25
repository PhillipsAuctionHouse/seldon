import LinkBlock, { LinkBlockProps } from '../LinkBlock/LinkBlock';
import { render, screen } from '@testing-library/react';
import LinkList from './LinkList';
import { runCommonTests } from '../../utils/testUtils';

const LinkBlocks: React.ReactElement<LinkBlockProps, typeof LinkBlock>[] = [
  <LinkBlock
    key="linkblock1"
    linkProps={{
      href: '/modern-and-contemporary-art',
      children: 'Modern & Contemporary Art',
    }}
    description="Works by Modern Masters (1860s – 1970) & Contemporary Artists (1970 – Now)"
  ></LinkBlock>,
  <LinkBlock
    key="linkblock2"
    linkProps={{
      href: '/jewels',
      children: 'Jewels',
    }}
    description="Exceptional, Rare & Timeless Jewels from Distinguished Collections"
  ></LinkBlock>,
  <LinkBlock
    key="linkblock3"
    linkProps={{
      href: '/paintings',
      children: 'Paintings',
    }}
    description="Beautiful Paintings from Renowned Artists"
  ></LinkBlock>,
];

describe('LinkList component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  runCommonTests((props) => <LinkList {...props}>{LinkBlocks}</LinkList>, 'LinkList');

  it('check testid', () => {
    render(<LinkList id="test">{LinkBlocks}</LinkList>);

    const linkList = screen.getByTestId('link-list-test');
    expect(linkList).toBeInTheDocument();
  });
  it('renders a list of LinkBlock components', () => {
    render(<LinkList>{LinkBlocks}</LinkList>);

    const linkList = screen.getByRole('list');
    expect(linkList).toBeInTheDocument();

    const linkItems = screen.getAllByRole('listitem');
    expect(linkItems).toHaveLength(LinkBlocks.length);

    const links = screen.getAllByRole('link');

    links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', LinkBlocks[index].props.linkProps.href);
    });
  });
});
