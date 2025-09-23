# Feature Flag Tracking with Vercel Web Analytics

This project implements comprehensive button click tracking using Vercel Web Analytics with feature flags. This allows you to see which buttons users are clicking on in your Vercel Analytics dashboard.

## How It Works

The implementation uses Vercel's feature flag integration with Web Analytics to track user interactions. Each button click is tracked with a specific feature flag that appears in your Vercel Analytics dashboard.

## Implementation Details

### 1. Analytics Infrastructure

- **Location**: `lib/analytics/`
- **Files**:
  - `feature-flags.ts` - Defines all feature flags and tracking functions
  - `useButtonTracking.ts` - React hook for easy component integration
  - `index.ts` - Centralized exports

### 2. Feature Flags Defined

The following feature flags are tracked:

#### Navigation
- `nav-about` - About page link clicks
- `nav-team` - Team page link clicks  
- `nav-join-us` - Join Us button clicks
- `nav-mobile-menu-toggle` - Mobile menu toggle

#### Join Card
- `join-discord` - Discord join button clicks
- `join-benefits` - Benefits signup button clicks

#### Calendar
- `calendar-add-to-calendar` - Add to Calendar button clicks
- `calendar-previous-month` - Previous month navigation
- `calendar-next-month` - Next month navigation
- `calendar-go-to-today` - Go to Today button clicks
- `calendar-date-selection` - Date selection clicks
- `calendar-event-click` - Event click interactions

#### Footer
- `footer-github-profile` - GitHub profile link clicks

#### Logo
- `logo-home-click` - Logo/home link clicks

### 3. Components Updated

All interactive components have been updated with tracking:

- **Header.tsx** - Navigation links, mobile menu, logo
- **JoinCard.tsx** - Discord and benefits buttons
- **CalendarContainer.tsx** - Calendar interactions
- **CalendarHeader.tsx** - Month navigation buttons
- **CalendarGrid.tsx** - Date selection and event clicks
- **CalendarActions.tsx** - Add to Calendar button
- **Footer.tsx** - GitHub profile links

### 4. Usage in Components

Components use the `useButtonTracking` hook:

```typescript
import { useButtonTracking } from '@/lib/analytics';
import { FEATURE_FLAGS } from '@/lib/analytics';

function MyComponent() {
  const { trackNavigation, trackCalendar } = useButtonTracking();
  
  const handleClick = () => {
    trackNavigation(FEATURE_FLAGS.NAVIGATION.ABOUT);
    // ... rest of click handler
  };
}
```

## Viewing Analytics

1. Go to your Vercel dashboard
2. Navigate to your project
3. Go to the "Analytics" tab
4. Look for the "Feature Flags" section
5. You'll see all tracked button interactions with their feature flag names

## Benefits

- **Detailed Insights**: See exactly which buttons users click most
- **User Behavior**: Understand user interaction patterns
- **A/B Testing**: Use feature flags to test different button designs
- **Conversion Tracking**: Track conversion funnels through button clicks
- **Mobile vs Desktop**: Track interactions across different device types

## Data Structure

Each tracked event includes:
- **Event Name**: Descriptive name (e.g., "Button Click", "Navigation Click")
- **Button**: Feature flag name (e.g., "nav-about")
- **Additional Data**: Context-specific information (e.g., source: 'mobile')
- **Flags**: Array containing the feature flag name

## Privacy

All tracking respects user privacy and follows Vercel's privacy guidelines. No personal data is collected, only interaction patterns.

## Troubleshooting

If tracking isn't working:

1. Ensure Vercel Analytics is properly configured in `app/layout.tsx`
2. Check that feature flags are properly defined in `lib/analytics/feature-flags.ts`
3. Verify components are using the tracking hooks correctly
4. Check browser console for any JavaScript errors
5. Ensure you're viewing the correct project in Vercel Analytics dashboard
