import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('ui-spinner accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/primitives/spinner/spinner.test.html');
  });

  test('passes axe WCAG 2.1 AA audit', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('has role="status" and aria-label for screen readers', async ({
    page,
  }) => {
    const spinner = page.locator('ui-spinner');
    await expect(spinner).toHaveAttribute('role', 'status');
    await expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });
});
