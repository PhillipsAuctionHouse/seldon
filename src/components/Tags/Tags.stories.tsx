import type { Meta } from '@storybook/react-vite';
import { useState } from 'react';

import TagsList, { Tag, TagsListProps } from './Tags';

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
    id: 'tag-1',
    index: 0,
    label: 'Jean-Michel Basquiat',
  },
  {
    id: 'tag-2',
    index: 1,
    label: 'Cecily Brown',
  },
  {
    id: 'tag-3',
    index: 2,
    label: 'Roy Lichtenstein',
  },
  {
    id: 'tag-4',
    index: 3,
    label: 'Amy Sherald',
  },
  {
    id: 'tag-5',
    index: 4,
    label: 'Cy Twombly',
  },
  {
    id: 'tag-6',
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
        aria-label={`Applied these filters: ${tagsList.map((item) => item.label).join(', ')}`}
        onClear={() => {
          setTagsList([]);
        }}
      >
        {tagsList.map((item) => (
          <Tag
            key={item.label}
            id={item.id}
            label={item.label}
            onRemove={(tag) => {
              setTagsList(tagsList.filter((item) => item.label !== tag));
            }}
          ></Tag>
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
