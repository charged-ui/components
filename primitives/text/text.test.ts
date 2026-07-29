import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('ui-text accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/primitives/text/text.test.html');
  });

  test('passes axe WCAG 2.1 AA audit', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('renders slotted text content', async ({ page }) => {
    await expect(page.locator('ui-text')).toContainText('Some body text');
  });
});
