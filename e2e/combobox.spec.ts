import { test, expect } from '@playwright/test';

// L3-16596: real pointer events let React re-render between window mousedown listeners,
// which jsdom/user-event dispatchEvent cannot reproduce.
const STORY = '/?path=/story/components-combobox--multiple-combo-boxes';

test('closes the open ComboBox on the first outside click when another ComboBox has a value', async ({ page }) => {
  await page.goto(STORY);
  const doc = page.frameLocator('main iframe').first();

  await doc.getByTestId('birth-year-combo-box-dropdown').click();
  const content = doc.locator('#birth-year-combo-box-content');
  await expect(content).toBeVisible();

  await doc.getByTestId('outside-target').click();
  await expect(content).toHaveCount(0);
});
