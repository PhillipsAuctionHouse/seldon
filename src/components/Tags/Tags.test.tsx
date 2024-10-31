import { useState } from 'react';
import { render, screen, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { runCommonTests } from '../../utils/testUtils';
import TagsList, { Tags, TagsProps } from './Tags';

const useMockState = (tagsList: TagsProps[]) => {
  const [mockState, setMockState] = useState(tagsList);
  return {
    mockState,
    setMockState,
  };
};

describe('Tags', () => {
  runCommonTests(TagsList, 'TagsList');

  const reqProps = { id: 'test-id' };
  const tagsListExample = [
    {
      id: "tag-1",
      index: 0,
      label: 'Jean-Michel Basquiat',
      onRemove: () => { }
    },
    {
      id: "tag-2",
      index: 1,
      label: 'Cecily Brown',
      onRemove: () => { }
    },
    {
      id: "tag-3",
      index: 2,
      label: 'Roy Lichtenstein',
      onRemove: () => { }
    },
    {
      id: "tag-4",
      index: 3,
      label: 'Amy Sherald',
      onRemove: () => { }
    },
    {
      id: "tag-5",
      index: 4,
      label: 'Cy Twombly',
      onRemove: () => { }
    },
    {
      id: "tag-6",
      index: 5,
      label: 'Andy Warhol',
      onRemove: () => { }
    },
  ];

  it('renders a list of tags', () => {
    render(<TagsList {...reqProps} onClear={vi.fn()}>
      {tagsListExample.map((item) => (
        <Tags
          key={item.label}
          id={item.id}
          label={item.label}
          onRemove={vi.fn()}
        >
        </Tags>
      ))}
    </TagsList>);
    expect(screen.getByText('Jean-Michel Basquiat')).toBeInTheDocument();
    expect(screen.getByText('Cecily Brown')).toBeInTheDocument();
    expect(screen.getByText('Roy Lichtenstein')).toBeInTheDocument();
    expect(screen.getByText('Amy Sherald')).toBeInTheDocument();
    expect(screen.getByText('Cy Twombly')).toBeInTheDocument();
    expect(screen.getByText('Andy Warhol')).toBeInTheDocument();
  });

  describe('test tags button click', () => {
    it('removes all tags with clear all button click', async () => {
      const { result } = renderHook(() => useMockState(tagsListExample));
      const { mockState, setMockState } = result.current;
      render(<TagsList {...reqProps} onClear={() => setMockState([])}>
        {mockState.map((item) => (
          <Tags
            key={item.label}
            id={item.id}
            label={item.label}
            onRemove={vi.fn()}
          >
          </Tags>
        ))}
      </TagsList>);
      await userEvent.click(screen.getByTestId('test-id-clear-all-button'));
      expect(result.current.mockState).toEqual([]);
    });
    it('removes a single tag with x button click', async () => {
      const { result } = renderHook(() => useMockState(tagsListExample));
      const { mockState, setMockState } = result.current;
      render(
        <TagsList
          {...reqProps}
          onClear={vi.fn()}
        >
          {mockState.map((item) => (
            <Tags
              key={item.label}
              id={item.id}
              label={item.label}
              onRemove={(tag) => {
                setMockState(mockState.filter((item) => item.label !== tag));
              }}
            >
            </Tags>
          ))}
        </TagsList>,
      );
      await userEvent.click(screen.getByTestId('tag-6-item-close-button'));
      expect(result.current.mockState).toHaveLength(5)
      expect(result.current.mockState[0].label).toBe("Jean-Michel Basquiat")
      expect(result.current.mockState[1].label).toBe("Cecily Brown")
      expect(result.current.mockState[2].label).toBe("Roy Lichtenstein")
      expect(result.current.mockState[3].label).toBe("Amy Sherald")
      expect(result.current.mockState[4].label).toBe("Cy Twombly")
    });
  });

  describe('test tags focus and keyboard press', () => {
    it('removes all tags with clear all button focus and enter key', async () => {
      const { result } = renderHook(() => useMockState(tagsListExample));
      const { mockState, setMockState } = result.current;
      render(<TagsList {...reqProps} onClear={() => setMockState([])}>
        {mockState.map((item) => (
          <Tags
            key={item.label}
            id={item.id}
            label={item.label}
            onRemove={vi.fn()}
          >
          </Tags>
        ))}
      </TagsList>);
      const clearAllButton = screen.getByTestId('test-id-clear-all-button');
      await clearAllButton.focus();
      await userEvent.keyboard('{Enter}');
      expect(result.current.mockState).toEqual([]);
    });
    it('removes a single tags with tab focus and enter key', async () => {
      const { result } = renderHook(() => useMockState(tagsListExample));
      const { mockState, setMockState } = result.current;
      render(
        <TagsList
          {...reqProps}
          onClear={vi.fn()}
        >
          {mockState.map((item) => (
            <Tags
              key={item.label}
              id={item.id}
              label={item.label}
              onRemove={(tag) => {
                setMockState(mockState.filter((item) => item.label !== tag));
              }}
            >
            </Tags>
          ))}
        </TagsList>,
      );
      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Enter}');
      expect(result.current.mockState).toHaveLength(5)
      expect(result.current.mockState[0].label).toBe("Jean-Michel Basquiat")
      expect(result.current.mockState[1].label).toBe("Cecily Brown")
      expect(result.current.mockState[2].label).toBe("Roy Lichtenstein")
      expect(result.current.mockState[3].label).toBe("Amy Sherald")
      expect(result.current.mockState[4].label).toBe("Andy Warhol")
    });
  });
});
