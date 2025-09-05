'use client';

import React from 'react';
import { CalendarEvent } from '@/types/calendar';
import { truncateEventSummary } from '@/lib/calendar/utils';

interface EventIndicatorProps {
  event: CalendarEvent;
  isFirst?: boolean;
}

export default function EventIndicator({ event, isFirst = false }: EventIndicatorProps) {
  const truncatedSummary = truncateEventSummary(event.summary, 15);
  
  return (
    <div
      className={`
        bg-[#c15f3c] text-white text-xs px-2 py-1 rounded
        truncate w-full text-center
        ${isFirst ? 'font-medium' : 'opacity-90'}
      `}
      title={event.summary}
    >
      {truncatedSummary}
    </div>
  );
}
