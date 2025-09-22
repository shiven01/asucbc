'use client';

import React, { useState, useEffect } from 'react';
import { CalendarState, CalendarEvent } from '@/types/calendar';
import { createCalendarMonth, getEventsForDate } from '@/lib/calendar/utils';
import { getEventsForMonth } from '@/lib/google/calendar';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import CalendarActions from './CalendarActions';
import EventModal from './EventModal';

interface CalendarContainerProps {
  className?: string;
}

export default function CalendarContainer({ className = '' }: CalendarContainerProps) {
  const [calendarState, setCalendarState] = useState<CalendarState>({
    currentDate: new Date(),
    selectedDate: null,
    view: 'month',
    isLoading: true,
    error: null,
  });

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(
    createCalendarMonth(
      calendarState.currentDate.getFullYear(),
      calendarState.currentDate.getMonth(),
      calendarState.selectedDate,
      events
    )
  );

  // Load events when month changes
  useEffect(() => {
    const loadEvents = async () => {
      setCalendarState(prev => ({ ...prev, isLoading: true, error: null }));
      
      try {
        console.log('Loading events for month:', calendarState.currentDate.getFullYear(), calendarState.currentDate.getMonth());
        console.log('API Key exists:', !!process.env.GOOGLE_CALENDAR_API_KEY);
        console.log('Calendar ID:', process.env.GOOGLE_CALENDAR_ID);
        
        const monthEvents = await getEventsForMonth(
          calendarState.currentDate.getFullYear(),
          calendarState.currentDate.getMonth()
        );
        
        console.log('Loaded events:', monthEvents.length, monthEvents);
        setEvents(monthEvents);
      } catch (error) {
        console.error('Error loading events:', error);
        setCalendarState(prev => ({ 
          ...prev, 
          error: `Failed to load calendar events: ${error instanceof Error ? error.message : 'Unknown error'}` 
        }));
      } finally {
        setCalendarState(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadEvents();
  }, [calendarState.currentDate]);

  // Update calendar month when events or selected date changes
  useEffect(() => {
    const newCalendarMonth = createCalendarMonth(
      calendarState.currentDate.getFullYear(),
      calendarState.currentDate.getMonth(),
      calendarState.selectedDate,
      events
    );
    setCalendarMonth(newCalendarMonth);
  }, [calendarState.currentDate, calendarState.selectedDate, events]);

  const handlePreviousMonth = () => {
    const newDate = new Date(calendarState.currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCalendarState(prev => ({ ...prev, currentDate: newDate }));
  };

  const handleNextMonth = () => {
    const newDate = new Date(calendarState.currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCalendarState(prev => ({ ...prev, currentDate: newDate }));
  };

  const handleGoToToday = () => {
    const today = new Date();
    setCalendarState(prev => ({ 
      ...prev, 
      currentDate: today,
      selectedDate: today 
    }));
  };

  const handleSelectDate = (date: Date) => {
    setCalendarState(prev => ({ ...prev, selectedDate: date }));
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const navigation = {
    goToPreviousMonth: handlePreviousMonth,
    goToNextMonth: handleNextMonth,
    goToToday: handleGoToToday,
    selectDate: handleSelectDate,
  };

  return (
    <div className={`bg-[#f4f3ee] rounded-lg shadow-lg p-3 sm:p-4 md:p-6 ${className}`}>
      <CalendarHeader
        currentDate={calendarState.currentDate}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onGoToToday={handleGoToToday}
        isLoading={calendarState.isLoading}
      />
      
      <CalendarGrid
        calendarMonth={calendarMonth}
        onSelectDate={handleSelectDate}
        onEventClick={handleEventClick}
        isLoading={calendarState.isLoading}
        allEvents={events}
      />
      
      <CalendarActions
        calendarId={process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || "asu.edu_primary"}
        selectedDate={calendarState.selectedDate}
      />
      
      {calendarState.error && (
        <div className="mt-4 p-3 bg-red-900 border border-red-700 rounded-md">
          <p className="text-sm text-red-300">{calendarState.error}</p>
        </div>
      )}
      
      {/* Event Modal */}
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
