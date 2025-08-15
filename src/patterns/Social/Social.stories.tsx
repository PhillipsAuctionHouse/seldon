import type { Meta } from '@storybook/react';

import Social, { SocialProps } from './Social';
import { Icon } from '../../components/Icon';

const meta = {
  title: 'Patterns/Social',
  component: Social,
} satisfies Meta<typeof Social>;

export default meta;

const socialIcons = (
  <ul>
    <li>
      <a>
        <Icon icon="Instagram" height="1.75rem" width="1.75rem" color="$black" />
      </a>
    </li>
    <li>
      <a>
        <Icon icon="LinkedIn" height="1.75rem" width="1.75rem" color="$black" />
      </a>
    </li>
    <li>
      <a>
        <Icon icon="WeChat" height="1.75rem" width="1.75rem" color="$black" />
      </a>
    </li>
    <li>
      <a>
        <Icon icon="Red" height="1.75rem" width="1.75rem" color="$black" />
      </a>
    </li>
    <li>
      <a>
        <Icon icon="Facebook" height="1.75rem" width="1.75rem" color="$black" />
      </a>
    </li>
  </ul>
);

export const Playground = (props: SocialProps) => (
  <div className="social-story">
    <Social {...props} />
  </div>
);

Playground.args = {
  id: 'mySocialComponent',
  children: socialIcons,
};
