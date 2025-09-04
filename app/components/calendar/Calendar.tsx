'use client';

import { useState, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin from '@fullcalendar/interaction';
// Remove unused import
import EventModal from './EventModal';
import styles from './calendar.module.css';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
  location?: string;
  description?: string;
  url?: string;
}

export default function Calendar() {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventClick = useCallback((clickInfo: any) => {
    const event = clickInfo.event;
    const eventData: CalendarEvent = {
      id: event.id,
      title: event.title,
      start: event.start?.toISOString() || '',
      end: event.end?.toISOString(),
      allDay: event.allDay,
      location: event.extendedProps?.location,
      description: event.extendedProps?.description,
      url: event.url
    };
    
    setSelectedEvent(eventData);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  }, []);

  const addToCalendar = useCallback(() => {
    const calendarId = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID;
    if (calendarId) {
      const encodedCalendarId = encodeURIComponent(calendarId);
      window.open(`https://calendar.google.com/calendar/u/0/r?cid=${encodedCalendarId}`, '_blank');
    }
  }, []);

  return (
    <div className={styles['calendar-container']}>
      <div className={styles['dark-calendar']}>
        <FullCalendar
        plugins={[dayGridPlugin, googleCalendarPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        googleCalendarApiKey={process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY}
        events={{
          googleCalendarId: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID,
          className: 'google-calendar-event'
        }}
        eventClick={handleEventClick}
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'today next'
        }}
        height="auto"
        aspectRatio={1.8}
        dayMaxEvents={3}
        moreLinkClick="popover"
        eventDisplay="block"
        eventTextColor="#f4f3ee"
        eventBackgroundColor="#c15f3c"
        eventBorderColor="#c15f3c"
        dayHeaderFormat={{ weekday: 'short' }}
        buttonText={{
          today: 'Today',
          month: 'Month',
          week: 'Week',
          day: 'Day'
        }}
        />
      </div>
      
      {isModalOpen && selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={handleModalClose}
          onAddToCalendar={addToCalendar}
        />
      )}
    </div>
  );
}
