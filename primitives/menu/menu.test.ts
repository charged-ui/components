import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('ui-menu accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/primitives/menu/menu.test.html');
    await page.locator('ui-menu').waitFor({ state: 'attached' });
  });

  test('passes axe WCAG 2.1 AA audit (closed state)', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('passes axe WCAG 2.1 AA audit (open state)', async ({ page }) => {
    await page.locator('#trigger').click();
    await expect(page.locator('#panel')).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('trigger exposes menu button semantics', async ({ page }) => {
    const trigger = page.locator('#trigger');
    await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toHaveAttribute('aria-controls', 'panel');
  });

  test('click toggles open and aria-expanded reflects state', async ({
    page,
  }) => {
    const trigger = page.locator('#trigger');
    await trigger.click();
    await expect(page.locator('ui-menu')).toHaveAttribute('open');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await trigger.click();
    await expect(page.locator('ui-menu')).not.toHaveAttribute('open');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('ArrowDown from the trigger opens the menu and focuses the first item', async ({
    page,
  }) => {
    await page.locator('#trigger').focus();
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('#panel')).toBeVisible();
    // The first enabled item should now hold focus (roving tabindex).
    await expect(page.locator('ui-menu-item').first()).toBeFocused();
  });

  test('ArrowDown moves between enabled items and skips disabled', async ({
    page,
  }) => {
    // Opening via click focuses the first item (ARIA APG menu-button pattern).
    await page.locator('#trigger').click();
    await expect(page.locator('ui-menu-item').first()).toBeFocused();

    await page.keyboard.press('ArrowDown'); // first → second
    await expect(page.locator('ui-menu-item').nth(1)).toBeFocused();
    await page.keyboard.press('ArrowDown'); // second → skips disabled → Sign out
    await expect(page.locator('#signout')).toBeFocused();
    await page.keyboard.press('ArrowDown'); // wraps to first
    await expect(page.locator('ui-menu-item').first()).toBeFocused();
  });

  test('ArrowUp moves backward between enabled items', async ({ page }) => {
    await page.locator('#trigger').click();
    await expect(page.locator('ui-menu-item').first()).toBeFocused();
    await page.keyboard.press('ArrowUp'); // wraps from first → last (Sign out)
    await expect(page.locator('#signout')).toBeFocused();
    await page.keyboard.press('ArrowUp'); // last → second
    await expect(page.locator('ui-menu-item').nth(1)).toBeFocused();
  });

  test('Home and End jump to the first and last item', async ({ page }) => {
    await page.locator('#trigger').click();
    // Opening focuses the first item (async, via rAF after showPopover);
    // wait for it before driving Home/End, else the key hits the trigger.
    await expect(page.locator('ui-menu-item').first()).toBeFocused();
    await page.keyboard.press('End');
    await expect(page.locator('#signout')).toBeFocused();
    await page.keyboard.press('Home');
    await expect(page.locator('ui-menu-item').first()).toBeFocused();
  });

  test('Enter activates an item and closes the menu', async ({ page }) => {
    await page.locator('#trigger').click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(page.locator('ui-menu')).not.toHaveAttribute('open');
  });

  test('Escape closes the menu and returns focus to the trigger', async ({
    page,
  }) => {
    await page.locator('#trigger').click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Escape');
    await expect(page.locator('ui-menu')).not.toHaveAttribute('open');
    await expect(page.locator('#trigger')).toBeFocused();
  });

  test('outside click closes the menu', async ({ page }) => {
    await page.locator('#trigger').click();
    await expect(page.locator('#panel')).toBeVisible();
    // Click empty space in the body, outside the menu.
    await page.mouse.click(10, 400);
    await expect(page.locator('ui-menu')).not.toHaveAttribute('open');
  });

  test('only one item is in the tab order (roving tabindex)', async ({
    page,
  }) => {
    await page.locator('#trigger').click();
    const tabbable = page.locator('ui-menu-item[tabindex="0"]');
    await expect(tabbable).toHaveCount(1);
  });
});
