import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('ui-bg-ripple accessibility', () => {
  test('passes axe WCAG 2.1 AA audit', async ({ page }) => {
    await page.goto('/src/backgrounds/ripple/ripple.test.html');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('ripple container is hidden from screen readers', async ({ page }) => {
    await page.goto('/src/backgrounds/ripple/ripple.test.html');
    await expect(page.locator('.ripple-container')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });
});
