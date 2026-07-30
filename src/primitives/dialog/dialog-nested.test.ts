import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('ui-dialog nested dialogs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/primitives/dialog/dialog-nested.test.html');
    await page.locator('#parent-dialog').waitFor({ state: 'attached' });
  });

  test('passes axe WCAG 2.1 AA audit with both dialogs open', async ({
    page,
  }) => {
    await page.locator('#parent-trigger').click();
    await page.locator('#child-trigger').click();
    await expect(page.locator('#child-dialog')).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('the nested dialog is marked data-nested', async ({ page }) => {
    await expect(page.locator('#child-dialog')).toHaveAttribute('data-nested');
    await expect(page.locator('#parent-dialog')).not.toHaveAttribute(
      'data-nested',
    );
  });

  test('opening a child reflects the count onto the parent', async ({
    page,
  }) => {
    await page.locator('#parent-trigger').click();
    await expect(page.locator('#parent-dialog')).not.toHaveAttribute(
      'data-nested-dialog-open',
    );

    await page.locator('#child-trigger').click();
    await expect(page.locator('#child-dialog')).toBeVisible();
    await expect(page.locator('#parent-dialog')).toHaveAttribute(
      'data-nested-dialog-open',
    );
    const count = await page
      .locator('#parent-dialog')
      .evaluate((el) =>
        getComputedStyle(el).getPropertyValue('--nested-dialogs').trim(),
      );
    expect(count).toBe('1');
  });

  test('closing the child leaves the parent open and clears the count', async ({
    page,
  }) => {
    await page.locator('#parent-trigger').click();
    await page.locator('#child-trigger').click();
    await page.locator('#child-close').click();

    await expect(page.locator('#child-dialog')).toHaveJSProperty('open', false);
    await expect(page.locator('#parent-dialog')).toHaveJSProperty('open', true);
    await expect(page.locator('#parent-dialog')).not.toHaveAttribute(
      'data-nested-dialog-open',
    );
  });

  test('Escape closes only the topmost (child) dialog', async ({ page }) => {
    await page.locator('#parent-trigger').click();
    await page.locator('#child-trigger').click();
    await expect(page.locator('#child-dialog')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.locator('#child-dialog')).toHaveJSProperty('open', false);
    await expect(page.locator('#parent-dialog')).toHaveJSProperty('open', true);
  });
});
