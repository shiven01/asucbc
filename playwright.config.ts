import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI for more stable results if needed */
  workers: process.env.CI ? 4 : undefined,

  reporter: process.env.CI
    ? [['html', {}], ['github', {}]]  // HTML for artifacts, github for CI annotations
    : 'list',  // Simple list output for local development
  
  use: {
    baseURL: process.env.VERCEL_URL || 'http://localhost:3000',
    
    trace: 'on-first-retry',
    
    // Only collect screenshots/videos locally; traces are sufficient for CI debugging
    ...(process.env.CI ? {} : {
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
    }),
  },

  /* Configure projects for major browsers with device emulation */
  projects: [
    {
      name: 'Desktop Chrome',
      use: { 
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'iPhone 14',
      use: { 
        ...devices['iPhone 14'],
      },
    },
  ],

});

