import { useState } from 'react';
import { render, screen, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { runCommonTests } from '../../utils/testUtils';
import TagsList from './Tags';

const useMockState = (tagsList: string[]) => {
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
    'Jean-Michel Basquiat',
    'Cecily Brown',
    'Roy Lichtenstein',
    'Amy Sherald',
    'Cy Twombly',
    'Andy Warhol',
  ];

  it('renders a list of tags', () => {
    render(<TagsList {...reqProps} tagsList={tagsListExample} onClear={vi.fn()} onRemove={vi.fn()} />);
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
      render(<TagsList {...reqProps} tagsList={mockState} onClear={() => setMockState([])} onRemove={vi.fn()} />);
      await userEvent.click(screen.getByTestId('test-id-clear-all-button'));
      expect(result.current.mockState).toEqual([]);
    });
    it('removes a single tag with x button click', async () => {
      const { result } = renderHook(() => useMockState(tagsListExample));
      const { mockState, setMockState } = result.current;
      render(
        <TagsList
          {...reqProps}
          tagsList={mockState}
          onClear={vi.fn()}
          onRemove={(tag) => {
            setMockState(mockState.filter((item) => item !== tag));
          }}
        />,
      );
      await userEvent.click(screen.getByTestId('test-id-item-5-close-button'));
      expect(result.current.mockState).toEqual([
        'Jean-Michel Basquiat',
        'Cecily Brown',
        'Roy Lichtenstein',
        'Amy Sherald',
        'Cy Twombly',
      ]);
    });
  });

  describe('test tags focus and keyboard press', () => {
    it('removes all tags with clear all button focus and enter key', async () => {
      const { result } = renderHook(() => useMockState(tagsListExample));
      const { mockState, setMockState } = result.current;
      render(<TagsList {...reqProps} tagsList={mockState} onClear={() => setMockState([])} onRemove={vi.fn()} />);
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
          tagsList={mockState}
          onClear={vi.fn()}
          onRemove={(tag) => {
            setMockState(mockState.filter((item) => item !== tag));
          }}
        />,
      );
      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Enter}');
      expect(result.current.mockState).toEqual([
        'Jean-Michel Basquiat',
        'Cecily Brown',
        'Roy Lichtenstein',
        'Amy Sherald',
        'Andy Warhol',
      ]);
    });
  });
});
