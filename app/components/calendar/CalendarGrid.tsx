'use client';

import React from 'react';
import { CalendarMonth, CalendarEvent } from '@/types/calendar';
import { getDayNames } from '@/lib/calendar/utils';
import CalendarDay from './CalendarDay';
import { useButtonTracking } from '@/lib/analytics';
import { FEATURE_FLAGS } from '@/lib/analytics';

interface CalendarGridProps {
  calendarMonth: CalendarMonth;
  onSelectDate: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  isLoading?: boolean;
  allEvents?: CalendarEvent[]; // All events to pass to CalendarDay components
}

export default function CalendarGrid({
  calendarMonth,
  onSelectDate,
  onEventClick,
  isLoading = false,
  allEvents = [],
}: CalendarGridProps) {
  const dayNames = getDayNames(true);
  const { trackCalendar } = useButtonTracking();

  const handleDateSelect = (date: Date) => {
    trackCalendar(FEATURE_FLAGS.CALENDAR.DATE_SELECTION, {
      selectedDate: date.toISOString(),
      month: date.getMonth(),
      year: date.getFullYear()
    });
    onSelectDate(date);
  };

  const handleEventClick = (event: CalendarEvent) => {
    trackCalendar(FEATURE_FLAGS.CALENDAR.EVENT_CLICK, {
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.start.toISOString()
    });
    onEventClick?.(event);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        {/* Day headers skeleton */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {dayNames.map((day, index) => (
            <div
              key={index}
              className="h-8 flex items-center justify-start pl-4"
            >
              <div className="h-4 w-8 bg-[#b1ada1]/30 rounded"></div>
            </div>
          ))}
        </div>
        
        {/* Calendar grid skeleton */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 42 }).map((_, index) => (
            <div
              key={index}
              className="h-20 bg-[#b1ada1]/20 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Day of week headers */}
      <div className="grid grid-cols-7 gap-1">
        {dayNames.map((day, index) => (
          <div
            key={index}
            className="h-8 flex items-center justify-start text-sm font-medium text-[#b1ada1] pl-4"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarMonth.days.map((day, index) => (
          <CalendarDay
            key={`${day.date.getFullYear()}-${day.date.getMonth()}-${day.date.getDate()}-${index}`}
            day={day}
            onSelect={() => handleDateSelect(day.date)}
            onEventClick={handleEventClick}
            allEvents={allEvents}
          />
        ))}
      </div>
    </div>
  );
}
