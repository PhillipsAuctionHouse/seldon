import { Video, type VideoProps } from './';
import { runCommonTests } from '../../utils/testUtils';
import { render, screen } from '@testing-library/react';

describe('Video', () => {
  runCommonTests(Video, 'Video');

  const testProps = {
    height: 400,
    videoSource: 'https://www.example.com',
  };

  const renderVideo = (props: VideoProps) => {
    render(<Video {...props} />);
  };

  it('should render a div with an iframe', () => {
    renderVideo({ ...testProps });

    const div = screen.getByTestId('video');
    expect(div).toBeInTheDocument();

    const iframe = div.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
  });

  it('should render an iframe with the correct src', () => {
    renderVideo({ ...testProps });

    const iframe = screen.getByTestId('video-iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', testProps.videoSource);
  });

  it('should render a div with the correct height', () => {
    renderVideo({ ...testProps });

    const div = screen.getByTestId('video');
    expect(div).toBeInTheDocument();
    expect(div.style.height).toBe(`${testProps.height}px`);
  });

  it('should render a div with the correct aspect ratio', () => {
    const aspectRatio = 3 / 2;

    renderVideo({ ...testProps, aspectRatio });

    const div = screen.getByTestId('video');
    expect(div).toBeInTheDocument();
    expect(div.style.getPropertyValue('--aspect-ratio')).toBe(`${aspectRatio}`);
  });
});
