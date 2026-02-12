import { Meta } from '@storybook/react-vite';
import Detail, { DetailProps } from './Detail';
import { DetailVariants } from './types';

const meta = {
  title: 'Components/Detail',
  component: Detail,
} satisfies Meta<typeof Detail>;

export default meta;
export const Playground = (props: DetailProps) => <Detail {...props} />;

Playground.args = {
  label: 'Label',
  value: 'Value',
};

Playground.argTypes = {};

export const Small = (props: DetailProps) => <Detail {...props} variant={DetailVariants.sm} />;
Small.args = {
  ...Playground.args,
  variant: DetailVariants.sm,
};

export const Medium = (props: DetailProps) => <Detail {...props} variant={DetailVariants.md} />;
Medium.args = {
  ...Playground.args,
  variant: DetailVariants.md,
};

export const Large = (props: DetailProps) => <Detail {...props} variant={DetailVariants.lg} />;
Large.args = {
  ...Playground.args,
  variant: DetailVariants.lg,
};

export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
    <div>
      <h3 style={{ marginBottom: '12px' }}>Small Variant (sm)</h3>
      <Detail label="Artist" value="Andy Warhol" variant={DetailVariants.sm} />
    </div>
    <div>
      <h3 style={{ marginBottom: '12px' }}>Medium Variant (md)</h3>
      <Detail label="Artist" value="Andy Warhol" variant={DetailVariants.md} />
    </div>
    <div>
      <h3 style={{ marginBottom: '12px' }}>Large Variant (lg)</h3>
      <Detail label="Artist" value="Andy Warhol" variant={DetailVariants.lg} />
    </div>
  </div>
);

export const WithSubLabel = (props: DetailProps) => <Detail {...props} variant={DetailVariants.md} />;
WithSubLabel.args = {
  ...Playground.args,
  variant: DetailVariants.md,
};
