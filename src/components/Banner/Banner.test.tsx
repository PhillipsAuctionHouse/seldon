import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { runCommonTests } from '../../utils/testUtils';
import Banner from './Banner';
import { BannerImageSize, BannerVariants } from './types';

describe('Banner', () => {
  runCommonTests(Banner.Root, 'Banner');

  it('composes media, separator, and content with text slots', () => {
    render(
      <Banner.Root data-testid="banner">
        <Banner.Media>
          <span>Media slot</span>
        </Banner.Media>
        <Banner.Separator />
        <Banner.Content>
          <Banner.Eyebrow>Eyebrow</Banner.Eyebrow>
          <Banner.Title>Title</Banner.Title>
          <Banner.Description>Description</Banner.Description>
          <Banner.Cta>Read more</Banner.Cta>
        </Banner.Content>
      </Banner.Root>,
    );

    expect(screen.getByText('Media slot')).toBeInTheDocument();
    expect(screen.getByText('Eyebrow')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Title' })).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Read more')).toBeInTheDocument();
  });

  it('applies the inline variant class', () => {
    render(
      <Banner.Root variant={BannerVariants.inline}>
        <Banner.Content>
          <Banner.Title>T</Banner.Title>
        </Banner.Content>
      </Banner.Root>,
    );

    expect(screen.getByRole('article')).toHaveClass('seldon-banner--inline');
  });

  it('does not apply inline class when variant is omitted', () => {
    render(
      <Banner.Root>
        <Banner.Content>
          <Banner.Title>T</Banner.Title>
        </Banner.Content>
      </Banner.Root>,
    );

    expect(screen.getByRole('article')).not.toHaveClass('seldon-banner--inline');
  });

  it('applies 1-2 media basis when Banner.Image uses imageSize Half', async () => {
    render(
      <Banner.Root>
        <Banner.Media data-testid="banner-media">
          <Banner.Image imageSize={BannerImageSize.Half} src="/x.jpg" alt="test" />
        </Banner.Media>
      </Banner.Root>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('banner-media')).toHaveClass('seldon-banner__media--1-2');
    });
  });

  it('defaults to 1-3 media basis', async () => {
    render(
      <Banner.Root>
        <Banner.Media data-testid="banner-media">
          <Banner.Image src="/x.jpg" alt="test" />
        </Banner.Media>
      </Banner.Root>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('banner-media')).toHaveClass('seldon-banner__media--1-3');
    });
  });

  it('renders a 16/9 frame via Banner.MediaFrame', () => {
    render(
      <Banner.Root>
        <Banner.Media>
          <Banner.MediaFrame data-testid="frame">
            <Banner.MediaImg src="/x.jpg" alt="test" />
          </Banner.MediaFrame>
        </Banner.Media>
      </Banner.Root>,
    );

    expect(screen.getByTestId('frame')).toHaveClass('seldon-banner__media-frame');
    expect(screen.getByAltText('test')).toHaveClass('seldon-banner__media-img');
  });
});
