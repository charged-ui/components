import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('ui-logo accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/primitives/logo/logo.test.html');
  });

  test('passes axe WCAG 2.1 AA audit', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('renders without errors', async ({ page }) => {
    await expect(page.locator('ui-logo')).toBeVisible();
  });
});
