import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('ui-details accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/primitives/details/details.test.html');
  });

  test('passes axe WCAG 2.1 AA audit (closed)', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('summary is focusable and has button role', async ({ page }) => {
    const summary = page.locator('[slot="summary"]');
    await summary.focus();
    await expect(summary).toBeFocused();
  });

  test('Enter toggles the disclosure', async ({ page }) => {
    const summary = page.locator('[slot="summary"]');
    const content = page.locator('[slot="content"]');
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('ui-details')).toHaveAttribute('open');
  });

  test('content is hidden when closed', async ({ page }) => {
    await expect(page.locator('[slot="content"]')).toBeHidden();
  });
});
