import { render, screen } from '@testing-library/react';
import TabsComponent from './TabsContainer';
import TabsContent from './TabsContent';

describe('Tabs', () => {
  const tabs = [
    { label: 'Overview', value: 'overview' },
    { label: 'Browse lots', value: 'browse' },
  ];

  it('renders tabs', () => {
    const { getAllByRole } = render(<TabsComponent tabs={tabs} />);
    const tabsList = getAllByRole('tablist');
    expect(tabsList.length).toBe(1);
  });
  test('renders the tabs and displays default content', () => {
    render(
      <TabsComponent tabs={tabs} defaultValue="overview">
        <TabsContent value="overview">Overview content</TabsContent>
        <TabsContent value="browse">Browse lots content</TabsContent>
      </TabsComponent>,
    );
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Browse lots')).toBeInTheDocument();

    // Verify default tab content is visible
    expect(screen.getByText('Overview content')).toBeVisible();
  });
});
