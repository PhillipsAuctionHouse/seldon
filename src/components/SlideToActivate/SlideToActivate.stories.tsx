import type { Meta } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { Text, TextVariants } from '../Text';
import SlideToActivate from './SlideToActivate';
import { actionArgTypes, playgroundArgTypes } from './SlideToActivate.stories.argTypes';
import { SlideToActivateInteractiveDemo } from './SlideToActivate.stories.demo';
import {
  SlideToActivateBorderRadii,
  SlideToActivateDirections,
  SlideToActivateSizes,
  type SlideToActivateConfig,
  type SlideToActivateProps,
} from './types';
import './_slideToActivate.stories.scss';

const meta = {
  title: 'Components/SlideToActivate',
  component: SlideToActivate,
} satisfies Meta<typeof SlideToActivate>;

export default meta;

const WIDTH_EXAMPLES = [180, 240, 320, 480] as const;

type PlaygroundArgs = Omit<SlideToActivateProps, 'config'> & SlideToActivateConfig;

export const Playground = ({
  textVariant,
  size,
  borderRadius,
  direction,
  thumbIcon,
  thumbWidth,
  pendingIndicator,
  trackClassName,
  thumbClassName,
  ...rest
}: PlaygroundArgs) => (
  <SlideToActivateInteractiveDemo
    {...rest}
    config={{
      textVariant,
      size,
      borderRadius,
      direction,
      thumbIcon,
      thumbWidth,
      pendingIndicator,
      trackClassName,
      thumbClassName,
    }}
  >
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
  labelText: 'Slide to bid $10,000',
  textVariant: TextVariants.labelMedium,
  direction: SlideToActivateDirections.ltr,
  size: SlideToActivateSizes.default,
  borderRadius: SlideToActivateBorderRadii.sharp,
  isDisabled: false,
  isComplete: false,
  showThumbWhenDisabled: true,
  successAnnouncement: 'Activated.',
  errorAnnouncement: 'Action failed. Please try again.',
  keyboardHint: 'Press Space or Enter to activate. Press Escape to cancel.',
};

Playground.parameters = {
  chromatic: { disableSnapshot: true },
};

Playground.argTypes = playgroundArgTypes;

export const WithThumbIconHeldState = (props: SlideToActivateProps) => (
  <div className="slide-to-activate-story-held-demo">
    <SlideToActivateInteractiveDemo {...props} />
    <Text className="slide-to-activate-story__hint" variant={TextVariants.bodySmall}>
      Press and hold the thumb — `__thumb-icon--held` / `__thumb--held` styles apply while dragging.
    </Text>
  </div>
);

WithThumbIconHeldState.argTypes = actionArgTypes;

export const PillThumb = (props: SlideToActivateProps) => (
  <SlideToActivateInteractiveDemo
    {...props}
    config={{ thumbWidth: 72, borderRadius: SlideToActivateBorderRadii.pill }}
  />
);

PillThumb.argTypes = actionArgTypes;

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
        <SlideToActivateInteractiveDemo {...props} labelText="Swipe to confirm" />
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

Widths.argTypes = actionArgTypes;

export const DisabledStates = (props: SlideToActivateProps) => (
  <div className="slide-to-activate-story-disabled-states">
    <div className="slide-to-activate-story">
      <SlideToActivate {...props} labelText="Bidding closed" isDisabled />
    </div>
    <div className="slide-to-activate-story">
      <SlideToActivate {...props} labelText="Unavailable" isDisabled showThumbWhenDisabled={false} />
    </div>
    <div className="slide-to-activate-story">
      <SlideToActivate {...props} labelText="Bid placed" isDisabled isComplete />
    </div>
  </div>
);

export const AsyncActivation = (props: SlideToActivateProps) => (
  <SlideToActivateInteractiveDemo
    {...props}
    initialLabel="Swipe to place bid"
    pendingLabel="Placing bid…"
    activatedLabel="Bid placed"
    onActivation={async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 2800);
      });
      await props.onActivation?.();
    }}
  />
);

AsyncActivation.argTypes = actionArgTypes;

export const Rtl = (props: SlideToActivateProps) => (
  <SlideToActivateInteractiveDemo {...props} config={{ direction: SlideToActivateDirections.rtl }} />
);

Rtl.argTypes = actionArgTypes;

export const Small = (props: SlideToActivateProps) => (
  <SlideToActivateInteractiveDemo {...props} config={{ size: SlideToActivateSizes.small }} />
);

Small.argTypes = actionArgTypes;

export const CustomStyling = (props: SlideToActivateProps) => (
  <div className="slide-to-activate-story-custom-styling">
    <div className="slide-to-activate-story-branded">
      <SlideToActivateInteractiveDemo
        {...props}
        labelText="Slide to unlock"
        activatedLabel="Unlocked"
        config={{ borderRadius: SlideToActivateBorderRadii.pill }}
      />
    </div>
    <div className="slide-to-activate-story-compact">
      <SlideToActivateInteractiveDemo {...props} labelText="Confirm" />
    </div>
  </div>
);

CustomStyling.argTypes = actionArgTypes;
