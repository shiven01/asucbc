/**
 * Feature flag tracking utilities for Vercel Web Analytics
 * This module provides utilities to track button clicks and other interactions
 * with feature flags for better analytics insights.
 */

import { track } from '@vercel/analytics';

// Define feature flag names for different sections of the app
export const FEATURE_FLAGS = {
  // Navigation flags
  NAVIGATION: {
    ABOUT: 'nav-about',
    TEAM: 'nav-team', 
    JOIN_US: 'nav-join-us',
    MOBILE_MENU_TOGGLE: 'nav-mobile-menu-toggle',
  },
  
  // Join card flags
  JOIN_CARD: {
    DISCORD: 'join-discord',
    BENEFITS: 'join-benefits',
  },
  
  // Calendar flags
  CALENDAR: {
    ADD_TO_CALENDAR: 'calendar-add-to-calendar',
    PREVIOUS_MONTH: 'calendar-previous-month',
    NEXT_MONTH: 'calendar-next-month',
    GO_TO_TODAY: 'calendar-go-to-today',
    DATE_SELECTION: 'calendar-date-selection',
    EVENT_CLICK: 'calendar-event-click',
  },
  
  // Footer flags
  FOOTER: {
    GITHUB_PROFILE: 'footer-github-profile',
  },
  
  // Logo/Home flags
  LOGO: {
    HOME_CLICK: 'logo-home-click',
  },
} as const;

// Type for all feature flag names
export type FeatureFlagName = 
  | typeof FEATURE_FLAGS.NAVIGATION[keyof typeof FEATURE_FLAGS.NAVIGATION]
  | typeof FEATURE_FLAGS.JOIN_CARD[keyof typeof FEATURE_FLAGS.JOIN_CARD]
  | typeof FEATURE_FLAGS.CALENDAR[keyof typeof FEATURE_FLAGS.CALENDAR]
  | typeof FEATURE_FLAGS.FOOTER[keyof typeof FEATURE_FLAGS.FOOTER]
  | typeof FEATURE_FLAGS.LOGO[keyof typeof FEATURE_FLAGS.LOGO];

/**
 * Track a button click with feature flag information
 * @param flagName - The feature flag name to track
 * @param eventName - Custom event name (optional, defaults to 'Button Click')
 * @param additionalData - Additional data to include in the event
 */
export function trackButtonClick(
  flagName: FeatureFlagName,
  eventName: string = 'Button Click',
  additionalData?: Record<string, any>
) {
  try {
    track(eventName, {
      button: flagName,
      ...additionalData,
    }, {
      flags: [flagName]
    });
  } catch (error) {
    console.error('Failed to track button click:', error);
  }
}

/**
 * Track navigation clicks
 */
export function trackNavigationClick(flagName: FeatureFlagName, additionalData?: Record<string, any>) {
  trackButtonClick(flagName, 'Navigation Click', additionalData);
}

/**
 * Track calendar interactions
 */
export function trackCalendarInteraction(flagName: FeatureFlagName, additionalData?: Record<string, any>) {
  trackButtonClick(flagName, 'Calendar Interaction', additionalData);
}

/**
 * Track join card interactions
 */
export function trackJoinCardInteraction(flagName: FeatureFlagName, additionalData?: Record<string, any>) {
  trackButtonClick(flagName, 'Join Card Interaction', additionalData);
}

/**
 * Track footer interactions
 */
export function trackFooterInteraction(flagName: FeatureFlagName, additionalData?: Record<string, any>) {
  trackButtonClick(flagName, 'Footer Interaction', additionalData);
}

/**
 * Track logo/home interactions
 */
export function trackLogoClick(flagName: FeatureFlagName, additionalData?: Record<string, any>) {
  trackButtonClick(flagName, 'Logo Click', additionalData);
}
