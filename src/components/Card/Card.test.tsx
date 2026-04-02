import { render, screen } from '@testing-library/react';

import { runCommonTests } from '../../utils/testUtils';
import Card from './Card';
import { CardVariants } from './types';

describe('Card', () => {
  runCommonTests(Card.Root, 'Card');

  it('renders the shared text content', () => {
    render(
      <Card.Root>
        <Card.Image alt="Custom Card Alt" src="https://example.com/image.jpg" />
        <Card.Content>
          <Card.Eyebrow>Modern & Contemporary Art</Card.Eyebrow>
          <Card.Title>Gallery Tour: Modern & Contemporary Art London</Card.Title>
          <Card.Cta href="https://example.com/article">Read more</Card.Cta>
          <Card.Badge>Happening Now</Card.Badge>
          <Card.Description>Additional editorial summary</Card.Description>
          <Card.Meta>
            <Card.MetaItem>New York</Card.MetaItem>
            <Card.MetaItem>18 Aug</Card.MetaItem>
          </Card.Meta>
        </Card.Content>
      </Card.Root>,
    );

    expect(screen.getByText('Modern & Contemporary Art')).toBeInTheDocument();
    expect(screen.getByText('Gallery Tour: Modern & Contemporary Art London')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Read more' })).toHaveAttribute('href', 'https://example.com/article');
    expect(screen.getByText('Happening Now')).toBeInTheDocument();
    expect(screen.getByText('Additional editorial summary')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('18 Aug')).toBeInTheDocument();
  });

  it('renders the image when imageSrc is provided', () => {
    render(
      <Card.Root>
        <Card.Image alt="Custom Card Alt" src="https://example.com/image.jpg" />
      </Card.Root>,
    );

    expect(screen.getByAltText('Custom Card Alt')).toBeInTheDocument();
  });

  it('applies the stacked variant class', () => {
    render(<Card.Root variant={CardVariants.stacked} />);

    expect(screen.getByTestId('card')).toHaveClass('seldon-card--stacked');
  });
});
