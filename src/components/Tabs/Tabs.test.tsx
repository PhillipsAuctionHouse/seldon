import { render, screen, fireEvent } from '@testing-library/react';
import TabsContainer from './TabsContainer';
import TabsContent from './TabsContent';

describe('Tabs', () => {
  const tabs = [
    { label: 'Overview', value: 'overview' },
    { label: 'Browse lots', value: 'browse' },
  ];

  it('renders tabs', () => {
    const { getAllByRole } = render(<TabsContainer tabs={tabs} />);
    const tabsList = getAllByRole('tablist');
    expect(tabsList.length).toBe(1);
  });
  test('renders the tabs and displays default content', () => {
    render(
      <TabsContainer tabs={tabs} defaultValue="overview">
        <TabsContent value="overview">Overview content</TabsContent>
        <TabsContent value="browse">Browse lots content</TabsContent>
      </TabsContainer>,
    );
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Browse lots')).toBeInTheDocument();

    // Verify default tab content is visible
    expect(screen.getByText('Overview content')).toBeVisible();
  });
  test('displays correct content when a different tab is selected', () => {
    render(
      <TabsContainer tabs={tabs} defaultValue="overview">
        <TabsContent value="overview">Overview content</TabsContent>
        <TabsContent value="browse">Browse lots content</TabsContent>
      </TabsContainer>,
    );

    fireEvent.click(screen.getByRole('tab', { name: /Overview/i }));

    expect(screen.getByText('Overview content')).toBeVisible();
  });
  test('calls onTabClick when a tab is clicked', () => {
    let clickedTabValue = '';

    const onTabClickMock = (value: string) => {
      clickedTabValue = value; // Store the clicked tab value
    };

    render(
      <TabsContainer tabs={tabs} defaultValue="browse" onTabClick={onTabClickMock}>
        <TabsContent value="overview">Overview content</TabsContent>
        <TabsContent value="browse">Browse lots content</TabsContent>
      </TabsContainer>,
    );

    fireEvent.click(screen.getByRole('tab', { name: /Overview/i }));
    expect(clickedTabValue).toBe('overview'); // Validate that the clicked tab value is correct
  });
});
