import type { Meta } from '@storybook/react-vite';
import { useState, type CSSProperties } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Icon } from '../Icon';
import { Text, TextVariants } from '../Text';
import SlideToActivate from './SlideToActivate';
import { SlideToActivateInteractiveDemo } from './SlideToActivateInteractiveDemo';
import {
  SlideToActivateBorderRadii,
  SlideToActivateDisabledReasons,
  SlideToActivateDirections,
  SlideToActivateSizes,
  type SlideToActivateProps,
} from './types';
import './_slideToActivate.stories.scss';

const meta = {
  title: 'Components/SlideToActivate',
  component: SlideToActivate,
} satisfies Meta<typeof SlideToActivate>;

export default meta;

const chevronIcon = <Icon icon="ChevronRight" height={20} width={20} color="currentColor" />;

const WIDTH_EXAMPLES = [180, 240, 320, 480] as const;

const argTypes = {
  onActivation: {
    action: 'onActivation',
  },
  onError: {
    action: 'onError',
  },
  onProgress: {
    action: 'onProgress',
  },
};

export const Playground = (props: SlideToActivateProps) => (
  <SlideToActivateInteractiveDemo {...props} thumbIcon={props.thumbIcon ?? chevronIcon}>
    <Text className="slide-to-activate-story__hint">
      Note: Inputs do not work in some stories unless there is content between the interactive elements and the iframe
      edge.
      <br />
      <br />
      That is what this text is for.
    </Text>
  </SlideToActivateInteractiveDemo>
);

Playground.args = {
  labelText: 'Swipe to confirm',
};

Playground.parameters = {
  chromatic: { disableSnapshot: true },
};

Playground.argTypes = argTypes;

export const WithThumbIconHeldState = (props: SlideToActivateProps) => (
  <div className="slide-to-activate-story-held-demo">
    <SlideToActivateInteractiveDemo {...props} thumbIcon={chevronIcon} />
    <Text className="slide-to-activate-story__hint" variant={TextVariants.bodySmall}>
      Press and hold the thumb — `__thumb-icon--held` / `__thumb--held` styles apply while dragging.
    </Text>
  </div>
);

WithThumbIconHeldState.argTypes = argTypes;

export const PillThumb = (props: SlideToActivateProps) => (
  <SlideToActivateInteractiveDemo
    {...props}
    thumbWidth={72}
    borderRadius={SlideToActivateBorderRadii.threeXl}
    thumbIcon={chevronIcon}
  />
);

PillThumb.argTypes = argTypes;

export const Widths = (props: SlideToActivateProps) => (
  <div className="slide-to-activate-story-widths">
    {WIDTH_EXAMPLES.map((width) => (
      <div
        key={width}
        className="slide-to-activate-story-widths__item"
        style={
          {
            '--slide-demo-width': `${width}px`,
            // 320px = default label size; scale proportionally on either side.
            '--slide-demo-label-scale': width / 320,
          } as CSSProperties
        }
      >
        <Text className="slide-to-activate-story__hint" variant={TextVariants.bodySmall}>
          {width}px
        </Text>
        <SlideToActivateInteractiveDemo {...props} labelText="Swipe to confirm" thumbIcon={chevronIcon} />
      </div>
    ))}
    <Text className="slide-to-activate-story__hint">
      Note: Inputs do not work in some stories unless there is content between the interactive elements and the iframe
      edge.
      <br />
      <br />
      That is what this text is for.
    </Text>
  </div>
);

Widths.argTypes = argTypes;

export const DisabledStates = (props: SlideToActivateProps) => (
  <div className="slide-to-activate-story-disabled-states">
    <div className="slide-to-activate-story">
      <SlideToActivate
        {...props}
        labelText="Bidding closed"
        isDisabled
        disabledReason={SlideToActivateDisabledReasons.blocked}
        thumbIcon={chevronIcon}
      />
    </div>
    <div className="slide-to-activate-story">
      <SlideToActivate
        {...props}
        labelText="Unavailable"
        isDisabled
        disabledReason={SlideToActivateDisabledReasons.blocked}
        showThumbWhenDisabled={false}
      />
    </div>
    <div className="slide-to-activate-story">
      <SlideToActivate
        {...props}
        labelText="Bid placed"
        isDisabled
        disabledReason={SlideToActivateDisabledReasons.complete}
      />
    </div>
  </div>
);

export const AsyncActivation = (props: SlideToActivateProps) => (
  <SlideToActivateInteractiveDemo
    {...props}
    initialLabel="Swipe to place bid"
    pendingLabel="Placing bid…"
    activatedLabel="Bid placed"
    thumbIcon={chevronIcon}
    onActivation={async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 2800);
      });
      await props.onActivation?.();
    }}
  />
);

AsyncActivation.argTypes = argTypes;

// First interaction test in this file — drives the pointer-drag path (unlike the unit tests,
// which only cover keyboard activation under mocked reduced motion). Drag, not keyboard: the
// keyboard charge/finish ramp is driven by requestAnimationFrame, which browsers throttle or
// pause entirely in a backgrounded/off-screen test tab, so it can stall until something
// happens to bring the page back into view. Pointer drag updates progress synchronously off
// real pointermove events with no rAF in the loop, so it isn't subject to that throttling.
AsyncActivation.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  const thumb = canvas.getByRole('button', { name: 'Swipe to place bid' });
  const thumbRect = thumb.getBoundingClientRect();
  const y = thumbRect.top + thumbRect.height / 2;

  await userEvent.pointer([
    { keys: '[MouseLeft>]', target: thumb, coords: { x: thumbRect.left + thumbRect.width / 2, y } },
    { coords: { x: thumbRect.left + 400, y } },
    { keys: '[/MouseLeft]' },
  ]);

  await waitFor(() => expect(canvas.getByTestId('slide-to-activate')).toHaveAttribute('data-status', 'pending'));
};

export const Rtl = (props: SlideToActivateProps) => (
  <SlideToActivateInteractiveDemo {...props} direction={SlideToActivateDirections.rtl} thumbIcon={chevronIcon} />
);

Rtl.argTypes = argTypes;

export const Small = (props: SlideToActivateProps) => (
  <SlideToActivateInteractiveDemo {...props} size={SlideToActivateSizes.small} thumbIcon={chevronIcon} />
);

Small.argTypes = argTypes;

export const CustomStyling = (props: SlideToActivateProps) => {
  const [opacity, setOpacity] = useState(0.25);
  return (
    <div className="slide-to-activate-story-custom-styling">
      <div className="slide-to-activate-story-branded">
        <SlideToActivateInteractiveDemo
          {...props}
          labelText="Slide to unlock"
          activatedLabel="Unlocked"
          borderRadius={SlideToActivateBorderRadii.threeXl}
          thumbIcon={chevronIcon}
        />
      </div>
      <div className="slide-to-activate-story-compact">
        <SlideToActivateInteractiveDemo
          {...props}
          labelText="Confirm"
          thumbIcon={chevronIcon}
          style={{ opacity }}
          onProgress={(p) => {
            setOpacity(0.5 + p * 0.75);
          }}
        />
      </div>
    </div>
  );
};

CustomStyling.argTypes = argTypes;
