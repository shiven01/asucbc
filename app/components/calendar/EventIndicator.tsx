'use client';

import React from 'react';
import { CalendarEvent } from '@/types/calendar';
import { truncateEventSummary } from '@/lib/calendar/utils';

interface EventIndicatorProps {
  event: CalendarEvent;
  isFirst?: boolean;
  onClick?: (event: CalendarEvent) => void;
}

export default function EventIndicator({ event, isFirst = false, onClick }: EventIndicatorProps) {
  const truncatedSummary = truncateEventSummary(event.summary, 15);
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the day selection from triggering
    onClick?.(event);
  };
  
  return (
    <div
      className={`
        bg-[#f4f3ee] text-[#c15f3c] text-xs px-2 py-1 rounded
        truncate w-full text-center cursor-pointer
        hover:bg-[#e0ddd8] transition-colors
        ${isFirst ? 'font-medium' : 'opacity-90'}
      `}
      title={event.summary}
      onClick={handleClick}
    >
      {truncatedSummary}
    </div>
  );
}
