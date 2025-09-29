import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PageContentWrapper from './PageContentWrapper';
import { runCommonTests } from '../../utils/testUtils';

describe('PageContentWrapper', () => {
  runCommonTests(PageContentWrapper, 'PageContentWrapper');

  it('renders children correctly', () => {
    render(
      <PageContentWrapper>
        <span>She Won&#39;t Look At Me</span>
      </PageContentWrapper>,
    );
    expect(screen.getByText("She Won't Look At Me")).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <PageContentWrapper className="BetweenTheBars">
        <span>Needle In The Hay</span>
      </PageContentWrapper>,
    );
    const wrapper = screen.getByText('Needle In The Hay').parentElement;
    expect(wrapper?.className).toContain('BetweenTheBars');
  });

  it('passes additional props to the wrapper', () => {
    render(
      <PageContentWrapper data-testid="Angeles">
        <span>Miss Misery</span>
      </PageContentWrapper>,
    );
    expect(screen.getByTestId('Angeles')).toBeInTheDocument();
  });

  it('forwards ref to the div', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(
      <PageContentWrapper ref={ref}>
        <span>Say Yes</span>
      </PageContentWrapper>,
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });

  it('is accessible by role', () => {
    render(
      <PageContentWrapper aria-label="Fear City">
        <span>Son Of Sam</span>
      </PageContentWrapper>,
    );
    expect(screen.getByLabelText('Fear City')).toBeInTheDocument();
  });

  it('supports keyboard navigation', async () => {
    render(
      <PageContentWrapper tabIndex={0}>
        <span>Pretty (Ugly Before)</span>
      </PageContentWrapper>,
    );
    const wrapper = screen.getByText('Pretty (Ugly Before)').parentElement as HTMLElement;
    await userEvent.tab();
    expect(wrapper).toHaveFocus();
  });
});
