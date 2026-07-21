import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SlideToActivateInteractiveDemo } from './SlideToActivateInteractiveDemo';

describe('SlideToActivateInteractiveDemo', () => {
  it('renders the initial label', () => {
    render(<SlideToActivateInteractiveDemo labelText="Swipe to confirm" />);
    expect(screen.getByText('Swipe to confirm')).toBeInTheDocument();
    expect(screen.getByText(/Drag or swipe the thumb/)).toBeInTheDocument();
  });

  it('shows the drag hint with a live progress percentage', () => {
    render(<SlideToActivateInteractiveDemo labelText="Swipe to confirm" />);
    expect(screen.getByText('Drag or swipe the thumb — 0%')).toBeInTheDocument();
  });

  it('goes idle → pending → activated, then resets on click', async () => {
    const user = userEvent.setup();
    render(
      <SlideToActivateInteractiveDemo
        labelText="Swipe to confirm"
        pendingLabel="Placing bid"
        activatedLabel="Bid placed"
      />,
    );

    screen.getByRole('button', { name: 'Swipe to confirm' }).focus();
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(screen.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'pending');
    });
    // Two matches while pending: the visible label and the visually-hidden status announcement.
    expect(screen.getByRole('status')).toHaveTextContent('Placing bid');

    const resetButton = await screen.findByRole('button', { name: 'Reset' }, { timeout: 2000 });
    expect(screen.getByText('Bid placed')).toBeInTheDocument();
    expect(screen.queryByText(/Drag or swipe the thumb/)).not.toBeInTheDocument();

    await user.click(resetButton);

    expect(screen.getByText('Swipe to confirm')).toBeInTheDocument();
    expect(screen.getByText('Drag or swipe the thumb — 0%')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Reset' })).not.toBeInTheDocument();
  });

  it('forwards onActivation and onProgress to the consumer', async () => {
    const user = userEvent.setup();
    const onActivation = vi.fn(() => Promise.resolve());
    const onProgress = vi.fn();
    render(
      <SlideToActivateInteractiveDemo
        labelText="Swipe to confirm"
        onActivation={onActivation}
        onProgress={onProgress}
      />,
    );

    screen.getByRole('button', { name: 'Swipe to confirm' }).focus();
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(onActivation).toHaveBeenCalledTimes(1);
    });
    expect(onProgress).toHaveBeenCalledWith(1);
  });

  it('falls back to initialLabel when labelText is omitted', () => {
    // @ts-expect-error labelText is required by SlideToActivateProps, but the demo defends
    // against omission (e.g. a Storybook control left blank) by falling back to initialLabel.
    render(<SlideToActivateInteractiveDemo initialLabel="Custom initial label" />);
    expect(screen.getByText('Custom initial label')).toBeInTheDocument();
  });

  it('renders extra children passed through', () => {
    render(
      <SlideToActivateInteractiveDemo labelText="Swipe to confirm">
        <span>Extra demo content</span>
      </SlideToActivateInteractiveDemo>,
    );
    expect(screen.getByText('Extra demo content')).toBeInTheDocument();
  });
});
