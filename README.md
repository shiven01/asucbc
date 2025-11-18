This is a [Next.js](https://nextjs.org) project with Google Calendar integration featuring a dark-themed monthly calendar view.

## Features

- 📅 Monthly calendar grid view with FullCalendar
- 🌙 Dark theme with custom styling
- 📱 Responsive design for mobile and desktop
- 🔗 Google Calendar integration (read-only)
- 📋 Event details modal with "Add to Calendar" functionality
- 🎯 Current day highlighting with red border
- 📊 Event pills/badges on calendar dates

## Google Calendar Setup

### 1. Create Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Google Calendar API Configuration
NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY=your_api_key_here
NEXT_PUBLIC_GOOGLE_CALENDAR_ID=your_calendar_id@group.calendar.google.com
```

### 2. Get Google Calendar API Key

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Calendar API
4. Create credentials (API Key)
5. Restrict the API key to Google Calendar API for security

### 3. Get Calendar ID

1. Go to [Google Calendar](https://calendar.google.com/)
2. Find your calendar in the left sidebar
3. Click the three dots next to your calendar name
4. Select "Settings and sharing"
5. Scroll down to "Integrate calendar"
6. Copy the "Calendar ID" (format: `your-calendar-id@group.calendar.google.com`)

### 4. Make Calendar Public (Optional)

If you want to share the calendar publicly:
1. In calendar settings, scroll to "Access permissions"
2. Check "Make available to public"
3. Set permission to "See all event details"

## Getting Started

First, install dependencies and run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The calendar will automatically load events from your configured Google Calendar.

## Industry & Contact Form Configuration

The industry partnership and contact forms rely on SMTP to deliver submissions. Configure the following environment variables (see `env.example`):

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`
- `RECIPIENT_EMAIL` (defaults to `SMTP_USER` if omitted)
- `CONTACT_DISCORD_WEBHOOK_URL` *(optional)* — post each submission to a Discord channel so teammates without inbox access can stay informed.

With the webhook configured, every form entry is delivered both via email and Discord.

## Developer Tools

### Component Showcase (`/devs`)

For developers working on the UI, visit the `/devs` page to view all available UI components in action:

```
http://localhost:3000/devs
```

This page provides a live showcase of the entire UI component library, including:
- Buttons (all variants and sizes)
- Typography (Headings, Text, Labels)
- Form inputs (Input, Textarea)
- Cards with various configurations
- Badges and Tags
- Links and Dividers
- Loading Skeletons
- Interactive examples

The `/devs` page is a hidden route (not in the navigation) that serves as a visual reference and testing ground for all UI components. See the [UI Component README](./app/components/ui/README.md) for detailed documentation.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
