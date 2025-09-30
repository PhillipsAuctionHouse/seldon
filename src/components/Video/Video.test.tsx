import { Video, type VideoProps } from './';
import { runCommonTests } from '../../utils/testUtils';
import { render, screen } from '@testing-library/react';

describe('Video', () => {
  runCommonTests(Video, 'Video');

  const renderVideo = (props: VideoProps) => {
    render(<Video {...props} />);
  };

  it.each([
    { videoSource: 'https://www.example.com', aspectRatio: 16 / 9 },
    { videoSource: 'https://www.youtube.com/embed/abc', aspectRatio: 4 / 3 },
    { videoSource: 'https://vimeo.com/123', aspectRatio: 1 },
  ])('should render a div with an iframe for source %s', ({ videoSource, aspectRatio }) => {
    renderVideo({ videoSource, aspectRatio });

    const div = screen.getByTestId('video');
    expect(div).toBeInTheDocument();

    const iframe = div.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
  });

  it.each([
    { videoSource: 'https://www.example.com' },
    { videoSource: 'https://www.youtube.com/embed/abc' },
    { videoSource: 'https://vimeo.com/123' },
  ])('should render an iframe with the correct src for source %s', ({ videoSource }) => {
    renderVideo({ videoSource });

    const iframe = screen.getByTestId('video-iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', videoSource);
  });

  it.each([{ aspectRatio: 16 / 9 }, { aspectRatio: 4 / 3 }, { aspectRatio: 1 }])(
    'should render a div with the correct aspect ratio %s',
    ({ aspectRatio }) => {
      renderVideo({ videoSource: 'https://www.example.com', aspectRatio });

      const div = screen.getByTestId('video');
      expect(div).toBeInTheDocument();
      expect(div.style.getPropertyValue('--aspect-ratio')).toBe(`${aspectRatio}`);
    },
  );
});
