'use client';

import React from 'react';
import { getCalendarSubscriptionUrl } from '@/lib/google/calendar';
import { useHalloweenTheme } from '../HalloweenThemeProvider';
import { useBatParticles } from '../../hooks/useBatParticles';

interface CalendarActionsProps {
  calendarId: string;
  selectedDate?: Date | null;
}

export default function CalendarActions({ calendarId, selectedDate }: CalendarActionsProps) {
  const subscriptionUrl = getCalendarSubscriptionUrl(calendarId);
  const { isHalloween } = useHalloweenTheme();
  const { containerRef, particlesRef, createParticles } = useBatParticles();

  const handleAddToCalendar = () => {
    window.open(subscriptionUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex justify-end">
      <div ref={containerRef} className="relative z-10">
        <div
          ref={particlesRef}
          className="absolute inset-0 pointer-events-none overflow-visible z-0"
        />
        <button
          onClick={handleAddToCalendar}
          onMouseEnter={isHalloween ? createParticles : undefined}
          className={`
            relative z-10 flex items-center gap-2 px-4 py-2
            bg-[#cc785c] text-white
            rounded-lg hover:bg-white hover:text-[#cc785c] hover:scale-105 hover:shadow-lg
            transition-all duration-300 ease-in-out
            font-medium text-sm border border-transparent hover:border-[#cc785c]
            ${isHalloween ? 'active:scale-90' : ''}
          `}
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
    </div>
  );
}
