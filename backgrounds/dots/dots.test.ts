import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('ui-bg-dots accessibility', () => {
  test('passes axe WCAG 2.1 AA audit', async ({ page }) => {
    await page.goto('/backgrounds/dots/dots.test.html');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('decorative pattern is hidden from screen readers', async ({
    page,
  }) => {
    await page.goto('/backgrounds/dots/dots.test.html');
    await expect(page.locator('.ui-bg-dots-pattern')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });
});
