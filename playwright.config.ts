import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for accessibility + interaction tests.
 *
 * Co-located with the components: each component folder has a
 * <name>.test.ts (assertions) and <name>.test.html (fixture page).
 * Playwright navigates to the fixture, which imports the component
 * via Vite's module resolution.
 *
 * The Vite webServer spins up on port 5180 (avoids 5173 which the
 * docs dev server uses). Fixtures are served as static HTML from the
 * package root; the component TS is transformed on the fly by Vite.
 */
export default defineConfig({
  testDir: './',
  testMatch: '**/*.test.ts',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in source */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter */
  reporter: 'list',

  /* Shared settings for all the projects below */
  use: {
    baseURL: 'http://localhost:5180',
    trace: 'on-first-retry',
  },

  /* Serve the package root via Vite so fixtures can import components.
   * Vite 7 dropped --root as a CLI flag; running vite from the package
   * dir (which Playwright does) serves the current directory by default. */
  webServer: {
    command: 'npx vite --port 5180',
    port: 5180,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
