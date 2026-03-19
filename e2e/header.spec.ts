import { test, expect } from '@playwright/test';

const HEADER_STORY = '/?path=/story/sitefurniture-header--playground';
const NAV_STORY = '/?path=/story/components-navigation--playground';

function storyContent(page: import('@playwright/test').Page) {
  return page.frameLocator('main iframe').first();
}

test.describe('Header – desktop', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('shows main nav and logo', async ({ page }) => {
    await page.goto(HEADER_STORY);
    const doc = storyContent(page);
    await expect(doc.getByRole('banner')).toBeVisible({ timeout: 15_000 });
    await expect(doc.getByTestId('header-logo')).toBeVisible();
    await expect(doc.getByTestId('seldon-main-nav')).toBeVisible();
  });

  test('Auctions submenu opens on hover', async ({ page }) => {
    await page.goto(HEADER_STORY);
    const doc = storyContent(page);
    const auctions = doc
      .getByRole('link', { name: /Auctions/i })
      .or(doc.getByRole('button', { name: /Auctions/i }))
      .first();
    await auctions.hover();
    await expect(doc.getByText('Upcoming').first()).toBeVisible({ timeout: 3000 });
    await expect(doc.getByText('Editions & Works on Paper').first()).toBeVisible();
  });

  test('Departments submenu opens on hover', async ({ page }) => {
    await page.goto(HEADER_STORY);
    const doc = storyContent(page);
    const departments = doc
      .getByRole('link', { name: /Departments/i })
      .or(doc.getByRole('button', { name: /Departments/i }))
      .first();
    await departments.hover();
    await expect(doc.getByText('Our Specialist Departments').first()).toBeVisible({ timeout: 3000 });
  });
});

test.describe('Header – mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('shows hamburger and opens menu', async ({ page }) => {
    await page.goto(HEADER_STORY);
    const doc = storyContent(page);
    await expect(doc.getByRole('button', { name: /Open Menu/i })).toBeVisible();
    await doc.getByRole('button', { name: /Open Menu/i }).click();
    await expect(doc.getByRole('button', { name: /Close Menu/i })).toBeVisible({ timeout: 3000 });
  });

  test('mobile menu shows nav and submenu expands', async ({ page }) => {
    await page.goto(HEADER_STORY);
    const doc = storyContent(page);
    await doc.getByRole('button', { name: /Open Menu/i }).click();
    await expect(doc.getByRole('button', { name: /Close Menu/i })).toBeVisible({ timeout: 3000 });
    const auctions = doc
      .getByRole('link', { name: /Auctions/i })
      .or(doc.getByRole('button', { name: /Auctions/i }))
      .first();
    await auctions.click();
    await expect(doc.getByText('Editions & Works on Paper').first()).toBeVisible({ timeout: 3000 });
  });
});

test.describe('Navigation – desktop', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('shows nav list and Auctions submenu on hover', async ({ page }) => {
    await page.goto(NAV_STORY);
    const doc = storyContent(page);
    await expect(doc.getByTestId('topmenu')).toBeVisible({ timeout: 15_000 });
    const auctions = doc
      .getByRole('link', { name: /Auctions/i })
      .or(doc.getByRole('button', { name: /Auctions/i }))
      .first();
    await auctions.hover();
    await expect(doc.getByText('Editions & Works on Paper').first()).toBeVisible({ timeout: 3000 });
  });
});
