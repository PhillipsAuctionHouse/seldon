import type { Meta } from '@storybook/react';
import Button, { ButtonProps } from './Button';
import { ButtonVariants, ButtonSizes } from './types';
import { Icon } from '../Icon';
import { Loader } from '../..';
import './_button.stories.scss';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Button',
  component: Button,

  argTypes: {
    variant: {
      options: Object.values(ButtonVariants),
      control: {
        type: 'select',
      },
    },
    size: {
      options: Object.values(ButtonSizes),
      control: {
        type: 'select',
      },
    },
    linkSize: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
    },
    isIconLast: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;

export const Default = (props: ButtonProps) => <Button {...props}>This is the title</Button>;

export const ButtonDisabled = (props: ButtonProps) => (
  <Button {...props} isDisabled>
    This is the title
  </Button>
);

export const ButtonWithIcon = (props: ButtonProps) => (
  <Button {...props}>
    {!props.isIconLast ? <Icon icon="Add" /> : null}
    This is the title
    {props.isIconLast ? <Icon icon="Add" /> : null}
  </Button>
);

export const ButtonWithIconDisabled = (props: ButtonProps) => (
  <Button {...props} isDisabled>
    {!props.isIconLast ? <Icon icon="Add" /> : null}
    This is the title
    {props.isIconLast ? <Icon icon="Add" /> : null}
  </Button>
);

export const ButtonAsLink = (props: ButtonProps) => (
  <Button {...props} href="https://www.phillips.com" target="_blank">
    Visit Phillips
  </Button>
);

ButtonAsLink.args = {
  variant: ButtonVariants.tertiary,
};

export const ButtonAsLinkWithPrefetch = (props: ButtonProps) => (
  <Button {...props} href="https://www.phillips.com" target="_blank" prefetch="intent">
    Visit Phillips
  </Button>
);

ButtonAsLinkWithPrefetch.args = {
  variant: ButtonVariants.tertiary,
  size: 'md',
};

export const ButtonWithSkeleton = (props: ButtonProps) => (
  <div style={{ display: 'flex', gap: '1rem' }}>
    <Button {...props} isSkeletonLoading>
      Visit Phillips
    </Button>
    <Button {...props}>Visit Phillips</Button>
  </div>
);

export const SmallButtonVariants = () => (
  <div style={{ display: 'flex', gap: '1rem' }}>
    <Button size={ButtonSizes.small} variant={ButtonVariants.primary}>
      Primary Small
    </Button>
  </div>
);

export const SmallButtonWithIcons = () => (
  <div style={{ display: 'flex', gap: '1rem' }}>
    <Button size={ButtonSizes.small} variant={ButtonVariants.primary}>
      <Icon icon="Add" />
      With Icon
    </Button>
    <Button size={ButtonSizes.small} variant={ButtonVariants.secondary} isIconLast>
      Icon Last
      <Icon icon="ArrowRight" />
    </Button>
  </div>
);

export const AllVariantsGrid = () => {
  const variants = [
    { variant: ButtonVariants.primary, name: 'Primary' },
    { variant: ButtonVariants.secondary, name: 'Secondary' },
    { variant: ButtonVariants.ghost, name: 'Ghost' },
    { variant: ButtonVariants.tertiary, name: 'Tertiary' },
  ];

  const sizes = [
    { size: ButtonSizes.default, name: 'Default' },
    { size: ButtonSizes.small, name: 'Small' },
  ];

  return (
    <div className="all-variants-grid">
      {/* Header row */}
      <div className="all-variants-grid__header">
        <div className="all-variants-grid__header-cell">Variant</div>
        <div className="all-variants-grid__header-cell">Static</div>
        <div className="all-variants-grid__header-cell">Hover</div>
        <div className="all-variants-grid__header-cell">Focus</div>
        <div className="all-variants-grid__header-cell">Loading</div>
        <div className="all-variants-grid__header-cell">Disabled</div>
      </div>

      {/* Grid rows for each variant and size combination */}
      {variants.map(({ variant, name: variantName }) =>
        sizes.map(({ size, name: sizeName }) => {
          const buttonText = size === ButtonSizes.small ? 'Clear' : 'Register To Bid';

          return (
            <div key={`${variant}-${size}`} className="all-variants-grid__row">
              <div className="all-variants-grid__label-cell">
                {variantName} {sizeName}
              </div>

              {/* Static */}
              <div className="all-variants-grid__button-cell">
                <Button variant={variant} size={size}>
                  {buttonText}
                </Button>
              </div>

              {/* Hover */}
              <div className="all-variants-grid__button-cell">
                <Button className="pseudo-hover" variant={variant} size={size}>
                  {buttonText}
                </Button>
              </div>

              {/* Focus */}
              <div className="all-variants-grid__button-cell">
                <Button className="pseudo-focus" variant={variant} size={size}>
                  {buttonText}
                </Button>
              </div>

              {/* Loading */}
              <div className="all-variants-grid__button-cell">
                <Button variant={variant} size={size} isDisabled>
                  <Loader />
                </Button>
              </div>

              {/* Disabled */}
              <div className="all-variants-grid__button-cell">
                <Button variant={variant} size={size} isDisabled>
                  {buttonText}
                </Button>
              </div>
            </div>
          );
        }),
      )}
    </div>
  );
};

AllVariantsGrid.parameters = {
  pseudo: {
    hover: ['.pseudo-hover'],
    focus: ['.pseudo-focus'],
    focusVisible: ['.pseudo-focus'],
  },
};

ButtonAsLinkWithPrefetch.args = {
  variant: ButtonVariants.tertiary,
  size: 'md',
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Playground = {
  args: {
    children: 'Button',
    variant: ButtonVariants.primary,
    isSkeletonLoading: false,
  },
  argTypes: {
    isSkeletonLoading: { control: 'boolean' },
  },
};
