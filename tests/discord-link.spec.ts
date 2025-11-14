import { test, expect } from '@playwright/test';

test.describe('Discord Invite Link', () => {
  test('Discord invite link should exist and be valid', async ({ page, context }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded and interactive
    await page.waitForLoadState('networkidle');
    
    // Find the Discord invite link/button
    // Looking for a link that contains "discord" in its text (case insensitive)
    const discordLink = page.getByRole('link', { name: /discord/i });
    
    // Assert that the Discord link/button exists on the page
    await expect(discordLink).toBeVisible({
      timeout: 10000,
    });
    
    // Get the href attribute to verify it's the correct Discord invite link
    const href = await discordLink.first().getAttribute('href');
    expect(href).toBe('https://discord.gg/PRh8F2XebB');
    
    // Click the Discord link and wait for navigation
    // This will open Discord in the same context
    const [newPage] = await Promise.all([
      context.waitForEvent('page', { timeout: 15000 }),
      discordLink.first().click(),
    ]);
    
    // Wait for the Discord page to load
    await newPage.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    // Check for the "Invite Invalid" error message
    // Discord shows this as a heading with the text "Invite Invalid"
    const inviteInvalidHeading = newPage.getByRole('heading', { name: /invite invalid/i });
    
    // Also check for the error message text
    const inviteInvalidText = newPage.getByText(/this invite may be expired/i);
    
    // Assert that the "Invite Invalid" error is NOT present
    // This means the invite link is valid
    await expect(inviteInvalidHeading).not.toBeVisible({ timeout: 5000 });
    await expect(inviteInvalidText).not.toBeVisible({ timeout: 5000 });
    
    // If we reach here, the invite link is valid
    // Close the new page
    await newPage.close();
  });
});


