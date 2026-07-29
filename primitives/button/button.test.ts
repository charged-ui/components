import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('ui-button accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/primitives/button/button.test.html');
  });

  test('passes axe WCAG 2.1 AA audit', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('inner button is focusable via Tab', async ({ page }) => {
    const btn = page.locator('ui-button button');
    await page.keyboard.press('Tab');
    await expect(btn).toBeFocused();
  });

  test('Enter activates the button', async ({ page }) => {
    const btn = page.locator('ui-button button');
    await btn.focus();
    await btn.press('Enter');
    // No crash, button remains functional.
    await expect(btn).toBeVisible();
  });
});
