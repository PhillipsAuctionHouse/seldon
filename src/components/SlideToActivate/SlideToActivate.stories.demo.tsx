import { useEffect, useState, type ReactNode } from 'react';
import Button from '../Button/Button';
import { ButtonSizes, ButtonVariants } from '../Button/types';
import { Text, TextVariants } from '../Text';
import SlideToActivate from './SlideToActivate';
import { type SlideToActivateProps } from './types';

export const SlideToActivateInteractiveDemo = ({
  children,
  initialLabel = 'Swipe to confirm',
  pendingLabel = 'Working…',
  activatedLabel = 'Activated',
  ...props
}: SlideToActivateProps & {
  children?: ReactNode;
  initialLabel?: string;
  pendingLabel?: string;
  activatedLabel?: string;
}) => {
  const idleLabel = props.labelText ?? initialLabel;
  const [labelText, setLabelText] = useState(idleLabel);
  const [isActivated, setIsActivated] = useState(false);
  const [progress, setProgress] = useState(0);
  const [instanceKey, setInstanceKey] = useState(0);

  useEffect(() => {
    if (!isActivated) {
      setLabelText(idleLabel);
    }
  }, [idleLabel, isActivated]);

  const reset = () => {
    setLabelText(idleLabel);
    setIsActivated(false);
    setProgress(0);
    setInstanceKey((key) => key + 1);
  };

  return (
    <div className="slide-to-activate-story">
      <SlideToActivate
        key={instanceKey}
        {...props}
        labelText={labelText}
        isDisabled={Boolean(props.isDisabled)}
        isComplete={Boolean(props.isComplete) || isActivated}
        onProgress={(nextProgress) => {
          setProgress(nextProgress);
          props.onProgress?.(nextProgress);
        }}
        onActivation={async () => {
          setLabelText(pendingLabel);
          await props.onActivation?.();
          await new Promise((resolve) => {
            setTimeout(resolve, 600);
          });
          setLabelText(activatedLabel);
          await new Promise<void>((resolve) => {
            requestAnimationFrame(() => resolve());
          });
          setIsActivated(true);
          setProgress(1);
        }}
      />
      {isActivated ? (
        <Button
          className="slide-to-activate-story__reset"
          variant={ButtonVariants.secondary}
          size={ButtonSizes.small}
          onClick={reset}
        >
          Reset
        </Button>
      ) : (
        <Text className="slide-to-activate-story__hint" variant={TextVariants.bodySmall}>
          Drag or swipe the thumb — {(progress * 100).toFixed(0)}%
        </Text>
      )}
      {children}
    </div>
  );
};
