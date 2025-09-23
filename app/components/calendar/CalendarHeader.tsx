'use client';

import React, { useState } from 'react';
import { getMonthName } from '@/lib/calendar/utils';
import { useButtonTracking } from '@/lib/analytics';
import { FEATURE_FLAGS } from '@/lib/analytics';

interface CalendarHeaderProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onGoToToday: () => void;
  isLoading?: boolean;
}

export default function CalendarHeader({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onGoToToday,
  isLoading = false,
}: CalendarHeaderProps) {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const { trackCalendar } = useButtonTracking();

  const handleButtonClick = (action: () => void, buttonType: string, flagName: string) => {
    setActiveButton(buttonType);
    trackCalendar(flagName as any, {
      currentMonth: currentDate.getMonth(),
      currentYear: currentDate.getFullYear()
    });
    action();
    // Reset active state after a short delay
    setTimeout(() => setActiveButton(null), 200);
  };
  const monthName = getMonthName(currentDate.getMonth());

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Month Only */}
      <h2 className="text-2xl font-bold text-[#000000] min-w-[120px]">
        {monthName}
      </h2>

      {/* Navigation Controls */}
      <div className="flex items-center gap-4">
        {/* Previous Month Button */}
        <button
          onClick={() => handleButtonClick(onPreviousMonth, 'prev', FEATURE_FLAGS.CALENDAR.PREVIOUS_MONTH)}
          disabled={isLoading}
          className={`p-2 rounded-full hover:bg-[#b1ada1]/20 hover:scale-110 hover:shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${
            activeButton === 'prev' ? 'bg-[#cc785c] scale-110 shadow-md text-white' : ''
          }`}
          aria-label="Previous month"
        >
          <svg
            className="w-5 h-5 text-[#000000]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Today Button */}
        <button
          onClick={() => handleButtonClick(onGoToToday, 'today', FEATURE_FLAGS.CALENDAR.GO_TO_TODAY)}
          disabled={isLoading}
          className={`px-4 py-2 text-sm font-medium text-[#000000] hover:bg-[#b1ada1]/20 hover:scale-105 hover:shadow-md rounded-full transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${
            activeButton === 'today' ? 'bg-[#cc785c] scale-105 shadow-md text-white' : ''
          }`}
        >
          Today
        </button>

        {/* Next Month Button */}
        <button
          onClick={() => handleButtonClick(onNextMonth, 'next', FEATURE_FLAGS.CALENDAR.NEXT_MONTH)}
          disabled={isLoading}
          className={`p-2 rounded-full hover:bg-[#b1ada1]/20 hover:scale-110 hover:shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${
            activeButton === 'next' ? 'bg-[#cc785c] scale-110 shadow-md text-white' : ''
          }`}
          aria-label="Next month"
        >
          <svg
            className="w-5 h-5 text-[#000000]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
