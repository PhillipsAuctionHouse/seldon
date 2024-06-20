import { render, screen } from '@testing-library/react';

import HeroBanner from './HeroBanner';
import { runCommonTests } from '../../utils/testUtils';

describe('HeroBanner', () => {
  runCommonTests(HeroBanner, 'HeroBanner');

  it('is selectable by the test id', () => {
    const { rerender } = render(<HeroBanner headerText="This is my text" />);
    expect(screen.getByTestId(/hero-banner/)).toBeInTheDocument();
    rerender(<HeroBanner headerText="This is my text" id="testbanner" />);
    expect(screen.getByTestId('hero-banner-testbanner')).toBeInTheDocument();
  });

  it('Renders the header when headerText is passed in', () => {
    render(<HeroBanner headerText="This is my text" />);
    // Should normally not be testing implementation details. Should try to focus test on the user interaction and rendering UI that the user sees e.g. toBeInTheDocument
    expect(screen.getByText(/This is my text/).nodeName).toEqual('H1');
    expect(screen.getByText(/This is my text/)).toBeInTheDocument();
  });

  it('Renders subHeadText as part of the header', () => {
    render(<HeroBanner headerText="This is my text" subHeadText="Subtext text" />);
    expect(screen.getByText(/This is my text/).innerHTML.includes('Subtext text')).toBeTruthy();
  });

  it('Renders prehead and/or date when passed in', () => {
    const { container, rerender } = render(<HeroBanner headerText="This is my text" />);
    expect(container.querySelectorAll('p').length).toEqual(0);
    rerender(<HeroBanner headerText="This is my text" prehead="Pretext text" />);
    expect(screen.getByText(/Pretext text/)).toBeInTheDocument();
    rerender(<HeroBanner headerText="This is my text" prehead="Pretext text" date="March 13th" />);
    expect(screen.getByText(/Pretext text/).parentElement?.innerHTML.includes('March 13th')).toBeTruthy();

    rerender(<HeroBanner headerText="This is my text" date="March 13th" />);
    expect(screen.getByText(/March 13th/)).toBeInTheDocument();
  });

  it('Renders association when passed in', () => {
    const { container, rerender } = render(<HeroBanner headerText="This is my text" />);
    expect(container.querySelectorAll('p').length).toEqual(0);
    rerender(<HeroBanner headerText="This is my text" association="Association text" />);
    expect(screen.getByText(/Association text/)).toBeInTheDocument();
  });
});
