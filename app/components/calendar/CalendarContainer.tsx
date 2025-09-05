'use client';

import React, { useState, useEffect } from 'react';
import { CalendarState, CalendarEvent } from '@/types/calendar';
import { createCalendarMonth, getEventsForDate } from '@/lib/calendar/utils';
import { getEventsForMonth } from '@/lib/google/calendar';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import CalendarActions from './CalendarActions';

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
        const monthEvents = await getEventsForMonth(
          calendarState.currentDate.getFullYear(),
          calendarState.currentDate.getMonth()
        );
        setEvents(monthEvents);
      } catch (error) {
        console.error('Error loading events:', error);
        setCalendarState(prev => ({ 
          ...prev, 
          error: 'Failed to load calendar events' 
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

  const navigation = {
    goToPreviousMonth: handlePreviousMonth,
    goToNextMonth: handleNextMonth,
    goToToday: handleGoToToday,
    selectDate: handleSelectDate,
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
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
        isLoading={calendarState.isLoading}
      />
      
      <CalendarActions
        calendarId="asu.edu_primary"
        selectedDate={calendarState.selectedDate}
      />
      
      {calendarState.error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{calendarState.error}</p>
        </div>
      )}
    </div>
  );
}
