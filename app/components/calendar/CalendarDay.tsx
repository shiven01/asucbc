'use client';

import React from 'react';
import { CalendarDay as CalendarDayType } from '@/types/calendar';
import { truncateEventSummary } from '@/lib/calendar/utils';
import EventIndicator from './EventIndicator';

interface CalendarDayProps {
  day: CalendarDayType;
  onSelect: () => void;
}

export default function CalendarDay({ day, onSelect }: CalendarDayProps) {
  const dayNumber = day.date.getDate();
  const isCurrentMonth = day.isCurrentMonth;
  const isToday = day.isToday;
  const isSelected = day.isSelected;
  const hasEvents = day.hasEvents;

  const baseClasses = `
    h-20 p-2 rounded-lg cursor-pointer transition-all duration-200
    flex flex-col items-center justify-start
    hover:bg-[#b1ada1]/10
    ${isCurrentMonth ? 'text-[#000000]' : 'text-[#b1ada1]'}
    ${isToday ? 'bg-[#c15f3c]/10' : ''}
    ${isSelected ? 'ring-2 ring-[#c15f3c] bg-[#c15f3c]/5' : ''}
  `;

  return (
    <div
      className={baseClasses}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-label={`${day.date.toLocaleDateString()}${hasEvents ? `, ${day.events.length} events` : ''}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      {/* Day number */}
      <div className="text-sm font-medium mb-1">
        {dayNumber}
      </div>

      {/* Events */}
      <div className="flex-1 w-full space-y-1">
        {day.events.slice(0, 2).map((event, index) => (
          <EventIndicator
            key={`${event.id}-${index}`}
            event={event}
            isFirst={index === 0}
          />
        ))}
        {day.events.length > 2 && (
          <div className="text-xs text-[#b1ada1] text-center">
            +{day.events.length - 2} more
          </div>
        )}
      </div>

      {/* Special indicators for specific days */}
      {dayNumber === 27 && (
        <div className="absolute bottom-1 right-1 text-[#b1ada1] text-xs">
          +
        </div>
      )}
      {dayNumber === 28 && (
        <div className="absolute bottom-1 right-1 text-[#b1ada1] text-xs">
          *
        </div>
      )}
    </div>
  );
}
