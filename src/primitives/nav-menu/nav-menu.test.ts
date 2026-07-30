import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('ui-nav-menu accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/primitives/nav-menu/nav-menu.test.html');
  });

  test('passes axe WCAG 2.1 AA audit (closed state)', async ({ page }) => {
    // Wait for the component to settle before auditing — the panel's
    // mouseleave timer can fire during analysis and destroy the context.
    await page.locator('ui-nav-menu').waitFor({ state: 'attached' });
    await expect(page.locator('[data-target="products"]')).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('Tab moves focus between triggers', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-target="products"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('[data-target="pricing"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('[data-target="docs"]')).toBeFocused();
  });

  test('hovering a trigger opens its panel', async ({ page }) => {
    await page.locator('[data-target="products"]').hover();
    await expect(page.locator('[data-id="products"]')).toBeVisible();
  });

  test('Enter opens the panel for the focused trigger', async ({ page }) => {
    await page.locator('[data-target="products"]').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-id="products"]')).toBeVisible();
  });

  test('Escape closes the panel and returns focus to the trigger', async ({
    page,
  }) => {
    await page.locator('[data-target="products"]').hover();
    await expect(page.locator('[data-id="products"]')).toBeVisible();

    // Focus the trigger first so Escape is dispatched from within the
    // component (the keydown listener is on the host).
    await page.locator('[data-target="products"]').focus();
    await page.keyboard.press('Escape');

    // _scheduleClose uses a setTimeout (closeDelay + 200ms) before fully
    // closing. Wait for the panel to lose the .open class, then check focus.
    await expect(page.locator('.nav-panel')).not.toHaveClass(/open/, {
      timeout: 5000,
    });
    // Give the browser a tick to settle focus after the timeout callbacks.
    await page.waitForTimeout(250);
    await expect(page.locator('[data-target="products"]')).toBeFocused();
  });

  test('trigger has aria-expanded reflecting panel state', async ({
    page,
  }) => {
    const trigger = page.locator('[data-target="products"]');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await trigger.hover();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
});
