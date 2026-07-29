import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('ui-card accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/primitives/card/card.test.html');
  });

  test('passes axe WCAG 2.1 AA audit', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('has role="group" for semantic grouping', async ({ page }) => {
    const card = page.locator('ui-card');
    await expect(card).toHaveAttribute('role', 'group');
  });

  test('renders all slots', async ({ page }) => {
    await expect(page.locator('[slot="header"]')).toHaveText('Card title');
    await expect(page.locator('[slot="body"]')).toContainText('Card content');
    await expect(page.locator('[slot="footer"]')).toHaveText('Footer text');
  });
});
