/**
 * Custom hook for tracking button clicks with feature flags
 * Provides a simple interface for components to track user interactions
 */

import { useCallback } from 'react';
import { 
  trackButtonClick, 
  trackNavigationClick, 
  trackCalendarInteraction, 
  trackJoinCardInteraction, 
  trackFooterInteraction, 
  trackLogoClick,
  FeatureFlagName 
} from './feature-flags';

export function useButtonTracking() {
  const trackClick = useCallback((
    flagName: FeatureFlagName,
    eventName?: string,
    additionalData?: Record<string, any>
  ) => {
    trackButtonClick(flagName, eventName, additionalData);
  }, []);

  const trackNavigation = useCallback((
    flagName: FeatureFlagName,
    additionalData?: Record<string, any>
  ) => {
    trackNavigationClick(flagName, additionalData);
  }, []);

  const trackCalendar = useCallback((
    flagName: FeatureFlagName,
    additionalData?: Record<string, any>
  ) => {
    trackCalendarInteraction(flagName, additionalData);
  }, []);

  const trackJoinCard = useCallback((
    flagName: FeatureFlagName,
    additionalData?: Record<string, any>
  ) => {
    trackJoinCardInteraction(flagName, additionalData);
  }, []);

  const trackFooter = useCallback((
    flagName: FeatureFlagName,
    additionalData?: Record<string, any>
  ) => {
    trackFooterInteraction(flagName, additionalData);
  }, []);

  const trackLogo = useCallback((
    flagName: FeatureFlagName,
    additionalData?: Record<string, any>
  ) => {
    trackLogoClick(flagName, additionalData);
  }, []);

  return {
    trackClick,
    trackNavigation,
    trackCalendar,
    trackJoinCard,
    trackFooter,
    trackLogo,
  };
}
