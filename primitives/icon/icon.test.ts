import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('ui-icon accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/primitives/icon/icon.test.html');
  });

  test('passes axe WCAG 2.1 AA audit', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('has role="img" and aria-label for screen readers', async ({ page }) => {
    const icon = page.locator('ui-icon');
    await expect(icon).toHaveAttribute('role', 'img');
    await expect(icon).toHaveAttribute('aria-label', 'check-circle');
  });
});
