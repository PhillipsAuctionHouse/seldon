import figma from '@figma/code-connect';
import Search from './Search';
import type { SearchResult } from './SearchResults/SearchResults';

const FIGMA_URL =
  'https://www.figma.com/design/wRbSaO9MngnSedlDSQka3Y/Design-System--Component-Library?node-id=2267-8446';

// Figma variants:
//   Device: 'SM' | 'MD + LG' — responsive breakpoint. Seldon's Search is
//     already responsive via CSS; no Device prop exists in code, so Device
//     is intentionally not mapped.
//   State:  'Static' | 'Engaged' | 'Suggested' — visual states. Figma's
//     vocabulary doesn't map 1:1 to code's `state` union
//     ('loading' | 'submitting' | 'invalid' | 'idle'). We instead reflect
//     the state through the props that produce each visual outcome:
//       Static     → no autocomplete results
//       Engaged    → no autocomplete results (focus is DOM state, not a prop)
//       Suggested  → sample `searchResults` renders the autocomplete panel
const suggestedResults: SearchResult[] = [
  { id: '1', label: 'Suggested result 1', url: '/results/1' },
  { id: '2', label: 'Suggested result 2', url: '/results/2' },
];

figma.connect(Search, FIGMA_URL, {
  props: {
    searchResults: figma.enum('State', {
      Static: undefined,
      Engaged: undefined,
      Suggested: suggestedResults,
    }),
  },
  example: ({ searchResults }) => <Search searchResults={searchResults} />,
});
