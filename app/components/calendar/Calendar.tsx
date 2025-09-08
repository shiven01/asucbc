'use client';

import { useState, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin from '@fullcalendar/interaction';
import EventModal from './EventModal';
import { CalendarEvent } from '@/types/calendar';
import styles from './calendar.module.css';

export default function Calendar() {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventClick = useCallback((clickInfo: any) => {
    const event = clickInfo.event;
    const eventData: CalendarEvent = {
      id: event.id,
      summary: event.title,
      description: event.extendedProps?.description,
      start: {
        dateTime: event.start?.toISOString() || '',
        date: event.allDay ? event.start?.toISOString().split('T')[0] : undefined,
        timeZone: 'America/Phoenix'
      },
      end: {
        dateTime: event.end?.toISOString(),
        date: event.allDay ? event.end?.toISOString().split('T')[0] : undefined,
        timeZone: 'America/Phoenix'
      },
      location: event.extendedProps?.location,
      htmlLink: event.url,
      status: 'confirmed'
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
        eventTextColor="#5d4e37"
        eventBackgroundColor="#d4c4a8"
        eventBorderColor="#c4b59a"
        dayHeaderFormat={{ weekday: 'short' }}
        buttonText={{
          today: 'Today',
          month: 'Month',
          week: 'Week',
          day: 'Day'
        }}
        />
      </div>
      
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onAddToCalendar={addToCalendar}
      />
    </div>
  );
}
