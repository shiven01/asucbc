/**
 * Theme Configuration
 * Controls Halloween theme switching via environment variable
 *
 * Note: This is only used internally by HalloweenThemeProvider.
 * For accessing the Halloween theme state in components, use the
 * useHalloweenTheme() hook instead.
 */

export const showHackathonPromo = process.env.NEXT_PUBLIC_SHOW_HACKATHON === 'true';

