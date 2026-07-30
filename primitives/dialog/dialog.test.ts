import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('ui-dialog accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/primitives/dialog/dialog.test.html');
    await page.locator('ui-dialog').waitFor({ state: 'attached' });
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

  test('trigger exposes dialog button semantics', async ({ page }) => {
    const trigger = page.locator('#trigger');
    await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('the native dialog is labelled and described by its slotted content', async ({
    page,
  }) => {
    const dialog = page.locator('#panel');
    await expect(dialog).toHaveAttribute('aria-labelledby', /.+/);
    await expect(dialog).toHaveAttribute('aria-describedby', /.+/);
    const labelledby = await dialog.getAttribute('aria-labelledby');
    expect(await page.locator(`#${labelledby}`).textContent()).toContain(
      'Delete project',
    );
  });

  test('clicking the trigger opens the modal and reflects state', async ({
    page,
  }) => {
    await page.locator('#trigger').click();
    await expect(page.locator('ui-dialog')).toHaveAttribute('open');
    await expect(page.locator('#panel')).toBeVisible();
    await expect(page.locator('#trigger')).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    // Native modal semantics come from showModal().
    await expect(page.locator('#panel')).toHaveJSProperty('open', true);
  });

  test('initial focus lands on the [autofocus] control', async ({ page }) => {
    await page.locator('#trigger').click();
    await expect(page.locator('#confirm')).toBeFocused();
  });

  test('Escape closes the dialog and returns focus to the trigger', async ({
    page,
  }) => {
    await page.locator('#trigger').click();
    await expect(page.locator('#panel')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('ui-dialog')).not.toHaveAttribute('open');
    await expect(page.locator('#trigger')).toBeFocused();
  });

  test('the [slot="close"] button closes the dialog', async ({ page }) => {
    await page.locator('#trigger').click();
    await page.locator('#close-x').click();
    await expect(page.locator('ui-dialog')).not.toHaveAttribute('open');
  });

  test('a [data-dialog-close] control closes the dialog', async ({ page }) => {
    await page.locator('#trigger').click();
    await page.locator('#cancel').click();
    await expect(page.locator('ui-dialog')).not.toHaveAttribute('open');
  });

  test('light-dismiss closes on a backdrop click', async ({ page }) => {
    await page.locator('#trigger').click();
    await expect(page.locator('#panel')).toBeVisible();
    // Click the top-left corner of the viewport — the backdrop, well outside
    // the centered dialog box.
    await page.mouse.click(5, 5);
    await expect(page.locator('ui-dialog')).not.toHaveAttribute('open');
  });

  test('a click inside the dialog does not dismiss it', async ({ page }) => {
    await page.locator('#trigger').click();
    await page.locator('#body').click();
    await expect(page.locator('ui-dialog')).toHaveAttribute('open');
  });

  test('emits ui-dialog-open and ui-dialog-close with a reason', async ({
    page,
  }) => {
    await page.evaluate(() => {
      (window as unknown as { events: string[] }).events = [];
      const el = document.querySelector('ui-dialog')!;
      el.addEventListener('ui-dialog-open', () =>
        (window as unknown as { events: string[] }).events.push('open'),
      );
      el.addEventListener('ui-dialog-close', (e) =>
        (window as unknown as { events: string[] }).events.push(
          'close:' + (e as CustomEvent).detail.reason,
        ),
      );
    });
    await page.locator('#trigger').click();
    await page.locator('#cancel').click();
    await expect(page.locator('ui-dialog')).not.toHaveAttribute('open');
    const events = await page.evaluate(
      () => (window as unknown as { events: string[] }).events,
    );
    expect(events).toEqual(['open', 'close:close-button']);
  });

  test('preventing ui-dialog-request-close keeps the dialog open', async ({
    page,
  }) => {
    await page.evaluate(() => {
      const el = document.querySelector('ui-dialog')!;
      el.addEventListener('ui-dialog-request-close', (e) => e.preventDefault());
    });
    await page.locator('#trigger').click();
    await page.keyboard.press('Escape');
    await expect(page.locator('ui-dialog')).toHaveAttribute('open');
    await expect(page.locator('#panel')).toBeVisible();
  });

  test('setting the open attribute opens it (controlled)', async ({ page }) => {
    await page.evaluate(() =>
      document.querySelector('ui-dialog')!.setAttribute('open', ''),
    );
    await expect(page.locator('#panel')).toBeVisible();
    await expect(page.locator('#panel')).toHaveJSProperty('open', true);
  });

  test('light-dismiss reports a close reason of "backdrop"', async ({
    page,
  }) => {
    await page.evaluate(() => {
      (window as unknown as { reasons: string[] }).reasons = [];
      const el = document.querySelector('ui-dialog')!;
      el.addEventListener('ui-dialog-close', (e) =>
        (window as unknown as { reasons: string[] }).reasons.push(
          (e as CustomEvent).detail.reason,
        ),
      );
    });
    await page.locator('#trigger').click();
    await expect(page.locator('#panel')).toBeVisible();
    await page.mouse.click(5, 5); /* the backdrop, outside the dialog box */
    await expect(page.locator('ui-dialog')).not.toHaveAttribute('open');
    const reasons = await page.evaluate(
      () => (window as unknown as { reasons: string[] }).reasons,
    );
    expect(reasons).toEqual(['backdrop']);
  });

  test('without light-dismiss, a backdrop click does not close the dialog', async ({
    page,
  }) => {
    /* This fixture ships with light-dismiss; turn it off to test the default
       "required choice" behaviour. */
    await page.evaluate(() =>
      document.querySelector('ui-dialog')!.removeAttribute('light-dismiss'),
    );
    await page.locator('#trigger').click();
    await expect(page.locator('#panel')).toBeVisible();
    await page.mouse.click(
      5,
      5,
    ); /* backdrop click — inert without light-dismiss */
    await expect(page.locator('ui-dialog')).toHaveAttribute('open');
    await expect(page.locator('#panel')).toBeVisible();
  });

  test('a non-primary-button click on the backdrop does not dismiss', async ({
    page,
  }) => {
    await page.locator('#trigger').click();
    await expect(page.locator('#panel')).toBeVisible();
    /* A real right-click fires `contextmenu`, not `click`, so it can't exercise
       the primary-button guard. Dispatch a synthetic `click` with button: 2 and
       coords outside the dialog — without the guard this would dismiss. */
    await page.evaluate(() => {
      const dialog = document.getElementById('panel')!;
      dialog.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          button: 2,
          clientX: 1,
          clientY: 1,
        }),
      );
    });
    await expect(page.locator('ui-dialog')).toHaveAttribute('open');
    await expect(page.locator('#panel')).toBeVisible();
  });
});
