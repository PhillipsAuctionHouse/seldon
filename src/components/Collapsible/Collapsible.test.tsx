import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './';
import { runCommonTests } from '../../utils/testUtils';

describe('Collapsible', () => {
  runCommonTests(Collapsible, 'Collapsible');

  it('should expand and collapse content when trigger is clicked', async () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Collapsible content</CollapsibleContent>
      </Collapsible>,
    );

    const trigger = screen.getByText('Toggle');

    expect(screen.queryByText('Collapsible content')).not.toBeInTheDocument();

    await userEvent.click(trigger);
    await waitFor(() => expect(screen.queryByText('Collapsible content')).toBeVisible());

    await userEvent.click(trigger);
    await waitFor(() => expect(screen.queryByText('Collapsible content')).not.toBeInTheDocument());
  });

  it('should be initially open when defaultOpen prop is true', () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Collapsible content</CollapsibleContent>
      </Collapsible>,
    );

    const content = screen.getByText('Collapsible content');
    expect(content).toBeVisible();
  });

  it('should be controlled when open prop is provided', async () => {
    const { rerender } = render(
      <Collapsible open={false}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Collapsible content</CollapsibleContent>
      </Collapsible>,
    );

    const trigger = screen.getByText('Toggle');

    expect(screen.queryByText('Collapsible content')).not.toBeInTheDocument();

    await userEvent.click(trigger);
    expect(screen.queryByText('Collapsible content')).not.toBeInTheDocument(); // Should not change because it's controlled

    rerender(
      <Collapsible open={true}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Collapsible content</CollapsibleContent>
      </Collapsible>,
    );

    expect(screen.queryByText('Collapsible content')).toBeVisible();
  });

  it('should not expand when disabled', async () => {
    render(
      <Collapsible disabled>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Collapsible content</CollapsibleContent>
      </Collapsible>,
    );

    const trigger = screen.getByText('Toggle');

    expect(screen.queryByText('Collapsible content')).not.toBeInTheDocument();

    await userEvent.click(trigger);
    expect(screen.queryByText('Collapsible content')).not.toBeInTheDocument();
  });
});
