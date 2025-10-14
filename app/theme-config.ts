/**
 * Theme Configuration
 * Controls Halloween theme switching via environment variable
 */

export const isHalloweenTheme = process.env.NEXT_PUBLIC_HALLOWEEN_THEME === 'true';
export const showHackathonPromo = process.env.NEXT_PUBLIC_SHOW_HACKATHON === 'true';

export const themeConfig = {
  isHalloween: isHalloweenTheme,
  showHackathon: showHackathonPromo,
} as const;

