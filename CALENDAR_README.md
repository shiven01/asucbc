# ASU CBC Calendar System

A modern, responsive calendar system integrated with Google Calendar API for the Arizona State University Claude Builder Club.

## 🚀 Phase 1 Complete: Foundation & Architecture

### 🎯 **Read-Only Calendar Display**
This is a **read-only** calendar system that displays events from Google Calendar. All calendar modifications are done directly in Google Calendar by the owner.

### ✅ What's Implemented

1. **Project Structure**
   - `/types/calendar.ts` - Complete TypeScript definitions
   - `/lib/calendar/utils.ts` - Calendar utility functions
   - `/lib/google/calendar.ts` - Google Calendar API integration
   - `/app/components/calendar/` - Reusable calendar components

2. **Core Components**
   - `CalendarContainer` - Main wrapper with state management
   - `CalendarHeader` - Month/year navigation + "Today" button
   - `CalendarGrid` - 7×6 grid with proper date calculations
   - `CalendarDay` - Individual day cells with event indicators
   - `EventIndicator` - Blue highlight + truncated event text
   - `CalendarActions` - "Add to Calendar" subscription button

3. **Features**
   - Month navigation (previous/next)
   - "Today" button for quick navigation
   - Date selection with visual feedback
   - Event display with truncation
   - Loading states and error handling
   - Responsive design matching ASU CBC theme

### 🎨 Design System

The calendar uses your existing color scheme:
- **Background**: `#f4f3ee` (warm off-white)
- **Primary**: `#c15f3c` (warm orange) - used for events and selected states
- **Secondary**: `#b1ada1` (muted gray) - used for inactive elements
- **Foreground**: `#000000` (black) - main text color

### 🔧 Setup Instructions

1. **Environment Variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your Google Calendar API credentials:
   ```env
   GOOGLE_CALENDAR_API_KEY=your_api_key_here
   GOOGLE_CALENDAR_ID=asu.edu_primary
   ```

2. **Google Calendar API Setup**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable the Google Calendar API
   - Create credentials (API Key)
   - Add the API key to your `.env.local` file

3. **Run the Application**
   ```bash
   pnpm dev
   ```

### 📱 Current Layout

The calendar replaces the right half of your main page, maintaining the beautiful ASU CBC branding on the left while providing a functional calendar on the right.

### 🔄 Next Steps (Phase 2)

1. **Google Calendar Integration**
   - Set up service account for organization access
   - Implement real-time event synchronization
   - Add error handling for API failures

2. **Enhanced Features**
   - Event details on hover/click
   - Multiple calendar support
   - Event creation/editing
   - Calendar subscription management

### 🛠️ Technical Details

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom color scheme
- **State Management**: React hooks (useState, useEffect)
- **API Integration**: Google Calendar API v3
- **TypeScript**: Fully typed for better development experience

### 🎯 Key Features Implemented

- ✅ Month navigation with smooth transitions
- ✅ Date selection with visual feedback
- ✅ Event indicators with truncation
- ✅ "Today" button for quick navigation
- ✅ "Add to Calendar" subscription button
- ✅ Loading states and error handling
- ✅ Responsive design
- ✅ Accessibility features (ARIA labels, keyboard navigation)

The calendar is now ready for Phase 2 Google Calendar integration!
