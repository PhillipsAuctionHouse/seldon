// import { useState } from 'react';
// import { render, screen, waitFor, renderHook } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { runCommonTests } from '../../utils/testUtils';
import TagsList from './Tags';

describe('Tags', () => {
  runCommonTests(TagsList, 'TagsList');

  // const reqProps = { id: 'test-id' };
  // const tagsListExample = ["Jean-Michel Basquiat", "Cecily Brown", "Roy Lichtenstein", "Amy Sherald", "Cy Twombly", "Andy Warhol"]

  // it('renders a list of tags', () => {
  //     render(
  //         <TagsList
  //             {...reqProps}
  //             tagsList={tagsListExample}
  //             onClear={vi.fn()}
  //             onRemove={vi.fn()}
  //         />,
  //     );
  //     expect(screen.getByRole('button', { name: '"Jean-Michel Basquiat' })).toBeInTheDocument();
  // });
});
