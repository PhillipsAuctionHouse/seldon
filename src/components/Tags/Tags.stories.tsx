import type { Meta } from '@storybook/react';
import { useState } from 'react';

import TagsList, { Tags, TagsListProps } from './Tags';

const meta = {
  title: 'Components/Tags',
  component: TagsList,
} satisfies Meta<typeof TagsList>;

export default meta;

interface StoryProps extends TagsListProps {
  playgroundWidth: string;
}

const tagsListExample = [
  {
    id: "tagsList",
    index: 0,
    label: 'Jean-Michel Basquiat',
  },
  {
    id: "tagsList",
    index: 1,
    label: 'Cecily Brown',
  },
  {
    id: "tagsList",
    index: 2,
    label: 'Roy Lichtenstein',
  },
  {
    id: "tagsList",
    index: 3,
    label: 'Amy Sherald',
  },
  {
    id: "tagsList",
    index: 4,
    label: 'Cy Twombly',
  },
  {
    id: "tagsList",
    index: 5,
    label: 'Andy Warhol',
  },
];

const argTypes = {
  onClear: {
    action: 'onClear',
  },
  playgroundWidth: {
    control: { type: 'range', min: 700 },
  },
};
export const Playground = ({ playgroundWidth, ...args }: StoryProps) => {
  const [tagsList, setTagsList] = useState(tagsListExample);

  return (
    <div style={{ width: playgroundWidth, margin: '1rem' }}>
      <TagsList
        {...args}
        id="tagsList"
        onClear={() => {
          setTagsList([]);
        }}
        onRemove={(tag) => {
          setTagsList(tagsList.filter((item) => item.label !== tag));
        }}
      >
        {tagsList.map((item, index) => (
          <Tags
            key={item.label}
            id="tagsList"
            index={index}
            label={item.label}
            onRemove={(tag) => {
              setTagsList(tagsList.filter((item) => item.label !== tag));
            }}
          >
          </Tags>
        ))}
      </TagsList>
    </div>
  );
};

Playground.args = {
  playgroundWidth: 700,
  className: 'tags-test-class',
};

Playground.argTypes = argTypes;
