import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('ui-alert accessibility', () => {
  test('passes axe WCAG 2.1 AA audit', async ({ page }) => {
    await page.goto('/primitives/alert/alert.test.html');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('renders heading and message slots', async ({ page }) => {
    await page.goto('/primitives/alert/alert.test.html');

    await expect(page.locator('[slot="heading"]')).toHaveText('Deployed');
    await expect(page.locator('[slot="message"]')).toContainText(
      'Your components work here',
    );
  });

  test('announces as an alert to screen readers', async ({ page }) => {
    await page.goto('/primitives/alert/alert.test.html');

    const alert = page.locator('ui-alert');
    const role = await alert.getAttribute('role');
    const ariaLive = await alert.getAttribute('aria-live');

    expect(role).toBe('alert');
    expect(ariaLive).toBeTruthy();
  });
});
