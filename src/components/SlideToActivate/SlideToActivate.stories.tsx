import type { Meta } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { Icon } from '../Icon';
import { Text, TextVariants } from '../Text';
import SlideToActivate from './SlideToActivate';
import { SlideToActivateInteractiveDemo } from './SlideToActivate.stories.demo';
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
    borderRadius={SlideToActivateBorderRadii.pill}
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

export const Rtl = (props: SlideToActivateProps) => (
  <SlideToActivateInteractiveDemo {...props} direction={SlideToActivateDirections.rtl} thumbIcon={chevronIcon} />
);

Rtl.argTypes = argTypes;

export const Small = (props: SlideToActivateProps) => (
  <SlideToActivateInteractiveDemo {...props} size={SlideToActivateSizes.small} thumbIcon={chevronIcon} />
);

Small.argTypes = argTypes;

export const CustomStyling = (props: SlideToActivateProps) => (
  <div className="slide-to-activate-story-custom-styling">
    <div className="slide-to-activate-story-branded">
      <SlideToActivateInteractiveDemo
        {...props}
        labelText="Slide to unlock"
        activatedLabel="Unlocked"
        borderRadius={SlideToActivateBorderRadii.pill}
        thumbIcon={chevronIcon}
      />
    </div>
    <div className="slide-to-activate-story-compact">
      <SlideToActivateInteractiveDemo {...props} labelText="Confirm" thumbIcon={chevronIcon} />
    </div>
  </div>
);

CustomStyling.argTypes = argTypes;
