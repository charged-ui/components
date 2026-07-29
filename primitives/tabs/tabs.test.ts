import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('ui-tabs accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/primitives/tabs/tabs.test.html');
  });

  test('passes axe WCAG 2.1 AA audit', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('first tab is focusable and has correct ARIA', async ({ page }) => {
    const firstTab = page.locator('[slot="tab"]').first();
    await firstTab.focus();
    await expect(firstTab).toBeFocused();
    await expect(firstTab).toHaveAttribute('role', 'tab');
    await expect(firstTab).toHaveAttribute('aria-selected', 'true');
  });

  test('ArrowRight moves focus to next tab', async ({ page }) => {
    const tabs = page.locator('[slot="tab"]');
    await tabs.first().focus();
    await page.keyboard.press('ArrowRight');
    await expect(tabs.nth(1)).toBeFocused();
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  });

  test('ArrowLeft wraps to last tab', async ({ page }) => {
    const tabs = page.locator('[slot="tab"]');
    await tabs.first().focus();
    await page.keyboard.press('ArrowLeft');
    await expect(tabs.last()).toBeFocused();
  });

  test('only selected panel is visible', async ({ page }) => {
    const panels = page.locator('[slot="panel"]');
    await expect(panels.first()).toBeVisible();
    await expect(panels.nth(1)).toBeHidden();
  });
});
