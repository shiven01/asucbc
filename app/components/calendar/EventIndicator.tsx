'use client';

import React from 'react';
import { CalendarEvent } from '@/types/calendar';
import { truncateEventSummary } from '@/lib/calendar/utils';

interface EventIndicatorProps {
  event: CalendarEvent;
  onClick?: (event: CalendarEvent) => void;
}

export default function EventIndicator({ event, onClick }: EventIndicatorProps) {
  const truncatedSummary = truncateEventSummary(event.summary, 15);
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the day selection from triggering
    onClick?.(event);
  };
  
  return (
    <div
      className={`
        bg-[#cc785c] text-[#000000] text-xs px-2 py-1 rounded
        truncate w-full text-center cursor-pointer
        hover:bg-[#b56a4f] transition-colors
        font-medium
      `}
      title={event.summary}
      onClick={handleClick}
    >
      {truncatedSummary}
    </div>
  );
}
