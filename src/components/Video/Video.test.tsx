import { Video, type VideoProps } from './';
import { runCommonTests } from '../../utils/testUtils';
import { render, screen } from '@testing-library/react';

describe('Video', () => {
  runCommonTests(Video, 'Video');

  const videoSource = 'https://www.example.com';

  const renderVideo = (props: VideoProps) => {
    render(<Video {...props} />);
  };

  it('should render a div with an iframe', () => {
    renderVideo({ videoSource });

    const div = screen.getByTestId('video');
    expect(div).toBeInTheDocument();

    const iframe = div.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
  });

  it('should render an iframe with the correct src', () => {
    renderVideo({ videoSource });

    const iframe = screen.getByTestId('video-iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', videoSource);
  });

  it('should render a div with the correct aspect ratio and height', () => {
    const aspectRatio = 3 / 2;
    const height = 400;

    renderVideo({ aspectRatio, height, videoSource });

    const div = screen.getByTestId('video');
    expect(div).toBeInTheDocument();
    // expect#toHaveStyle doesn't work with aspectRatio - https://github.com/testing-library/jest-dom/issues/452
    expect(div?.style?.aspectRatio).toBe(`${aspectRatio}`);
    expect(div?.style?.height).toBe(`${height}px`);
  });
});
