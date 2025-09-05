'use client';

import React from 'react';
import { getCalendarSubscriptionUrl } from '@/lib/google/calendar';

interface CalendarActionsProps {
  calendarId: string;
  selectedDate?: Date | null;
}

export default function CalendarActions({ calendarId, selectedDate }: CalendarActionsProps) {
  const subscriptionUrl = getCalendarSubscriptionUrl(calendarId);

  const handleAddToCalendar = () => {
    window.open(subscriptionUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mt-6 flex justify-end">
      <button
        onClick={handleAddToCalendar}
        className="
          flex items-center gap-2 px-4 py-2 
          bg-[#c15f3c] text-white 
          rounded-lg hover:bg-[#a04d2f] 
          transition-colors duration-200
          font-medium text-sm
        "
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        Add to Calendar
      </button>
    </div>
  );
}
