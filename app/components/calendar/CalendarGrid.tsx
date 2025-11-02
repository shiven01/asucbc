'use client';

import React from 'react';
import { CalendarMonth, CalendarEvent } from '@/types/calendar';
import { getDayNames } from '@/lib/calendar/utils';
import CalendarDay from './CalendarDay';

interface CalendarGridProps {
  calendarMonth: CalendarMonth;
  onSelectDate: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  isLoading?: boolean;
  allEvents?: CalendarEvent[]; // All events to pass to CalendarDay components
  upcomingEventIds?: Set<string>; // IDs of events that should show details
}

export default function CalendarGrid({
  calendarMonth,
  onSelectDate,
  onEventClick,
  isLoading = false,
  allEvents = [],
  upcomingEventIds = new Set(),
}: CalendarGridProps) {
  const dayNames = getDayNames(true);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        {/* Day headers skeleton */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {dayNames.map((day, index) => (
            <div
              key={index}
              className="h-8 flex items-center justify-start"
            >
              <div className="h-4 w-8 bg-[var(--theme-text-primary)]/20 rounded"></div>
            </div>
          ))}
        </div>

        {/* Calendar grid skeleton */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 42 }).map((_, index) => (
            <div
              key={index}
              className="h-20 bg-[var(--theme-text-primary)]/10 rounded-lg"
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
            className="h-8 flex items-center justify-start text-sm font-medium text-[var(--theme-text-primary)]/60"
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
            onSelect={() => onSelectDate(day.date)}
            onEventClick={onEventClick}
            allEvents={allEvents}
            upcomingEventIds={upcomingEventIds}
          />
        ))}
      </div>
    </div>
  );
}
