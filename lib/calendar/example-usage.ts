// Example usage of the simplified read-only calendar types

import { CalendarEvent, CalendarMetadata } from '@/types/calendar';
import { fetchCalendarEvents, fetchCalendarMetadata } from '@/lib/calendar/google';

/**
 * Example: How to use the simplified calendar system
 */
export async function exampleCalendarUsage() {
  // 1. Check calendar permissions
  const metadata = await fetchCalendarMetadata();
  
  if (!metadata) {
    console.log('Calendar not found or API key not configured');
    return;
  }
  
  console.log(`Calendar: ${metadata.summary}`);
  console.log(`Can read events: ${metadata.canReadEvents}`);
  
  // 2. Fetch events (only if we have permission)
  if (metadata.canReadEvents) {
    const events = await fetchCalendarEvents();
    console.log(`Found ${events.length} events`);
    
    events.forEach(event => {
      console.log(`- ${event.summary} on ${event.start.dateTime || event.start.date}`);
    });
  } else {
    console.log('Insufficient permissions to read events');
  }
}

/**
 * Example: Creating a simple calendar event for display
 */
export function createExampleEvent(): CalendarEvent {
  return {
    id: 'example-event-1',
    summary: 'ASU CBC Meeting',
    description: 'Weekly club meeting',
    start: {
      dateTime: '2024-01-15T18:00:00-07:00',
      timeZone: 'America/Phoenix',
    },
    end: {
      dateTime: '2024-01-15T19:00:00-07:00',
      timeZone: 'America/Phoenix',
    },
    location: 'ASU Tempe Campus',
    status: 'confirmed',
    htmlLink: 'https://calendar.google.com/event?eid=example',
    created: '2024-01-01T00:00:00Z',
    updated: '2024-01-01T00:00:00Z',
  };
}

/**
 * Example: Creating calendar metadata
 */
export function createExampleMetadata(): CalendarMetadata {
  return {
    id: 'asu.edu_primary',
    summary: 'ASU CBC Calendar',
    description: 'Arizona State University Claude Builder Club Events',
    location: 'Arizona State University',
    timeZone: 'America/Phoenix',
    canReadEvents: true, // We have permission to read events
  };
}
