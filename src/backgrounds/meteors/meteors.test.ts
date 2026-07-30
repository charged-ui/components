import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('ui-bg-meteors accessibility', () => {
  test('passes axe WCAG 2.1 AA audit', async ({ page }) => {
    await page.goto('/src/backgrounds/meteors/meteors.test.html');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('meteor animation is hidden from screen readers', async ({ page }) => {
    await page.goto('/src/backgrounds/meteors/meteors.test.html');
    const wrapper = page.locator('.meteor').locator('..');
    await expect(wrapper.first()).toHaveAttribute('aria-hidden', 'true');
  });
});
