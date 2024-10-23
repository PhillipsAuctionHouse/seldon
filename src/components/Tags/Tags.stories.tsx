import type { Meta } from '@storybook/react';
import { useState } from 'react';

import TagsList, { TagsListProps } from './Tags';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Components/Tags',
    component: TagsList,
} satisfies Meta<typeof TagsList>;

export default meta;

interface StoryProps extends TagsListProps {
    playgroundWidth: string;
}

const tagsListExample = ["Jean-Michel Basquiat", "Cecily Brown", "Roy Lichtenstein", "Amy Sherald", "Cy Twombly", "Andy Warhol"]

const argTypes = {
    onClear: {
        action: 'onClear',
    },
    playgroundWidth: {
        control: { type: 'range', min: 700 },
    },
};
export const Playground = ({ playgroundWidth, ...args }: StoryProps) => {
    // Parent component is in charge of the state management
    const [tagsList, setTagsList] = useState(tagsListExample);

    return (
        <div style={{ width: playgroundWidth, margin: '1rem' }}>
            <TagsList
                {...args}
                id="TagsList"
                tagsList={tagsList}
                onClear={() => {
                    setTagsList([])
                }}
                onRemove={(tag) => {
                    setTagsList(tagsList.filter(item => item !== tag))
                }}
            ></TagsList>
        </div>
    );
};

Playground.args = {
    playgroundWidth: 700,
    className: 'tags-test-class',
};

Playground.argTypes = argTypes;
