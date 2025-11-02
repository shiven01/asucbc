'use client';

import React, { useState } from 'react';
import { getMonthName } from '@/lib/calendar/utils';
import { Heading } from '../ui';

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

  const handleButtonClick = (action: () => void, buttonType: string) => {
    setActiveButton(buttonType);
    action();
    // Reset active state after a short delay
    setTimeout(() => setActiveButton(null), 200);
  };
  const monthName = getMonthName(currentDate.getMonth());

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Month Only */}
      <Heading level="h2" animate={false} className="min-w-[120px]">
        {monthName}
      </Heading>

      {/* Navigation Controls */}
      <div className="flex items-center gap-4">
        {/* Previous Month Button */}
        <button
          onClick={() => handleButtonClick(onPreviousMonth, 'prev')}
          disabled={isLoading}
          className={`p-2 rounded-full hover:bg-[var(--theme-text-accent)]/20 hover:scale-110 hover:shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${
            activeButton === 'prev' ? 'bg-[var(--theme-text-accent)] scale-110 shadow-md text-white' : ''
          }`}
          aria-label="Previous month"
        >
          <svg
            className={`w-5 h-5 ${activeButton === 'prev' ? 'text-white' : 'text-[var(--theme-text-primary)]'}`}
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
          onClick={() => handleButtonClick(onGoToToday, 'today')}
          disabled={isLoading}
          className={`px-4 py-2 text-sm font-medium hover:bg-[var(--theme-text-accent)]/20 hover:scale-105 hover:shadow-md rounded-full transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${
            activeButton === 'today' ? 'bg-[var(--theme-text-accent)] scale-105 shadow-md text-white' : 'text-[var(--theme-text-primary)]'
          }`}
        >
          Today
        </button>

        {/* Next Month Button */}
        <button
          onClick={() => handleButtonClick(onNextMonth, 'next')}
          disabled={isLoading}
          className={`p-2 rounded-full hover:bg-[var(--theme-text-accent)]/20 hover:scale-110 hover:shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${
            activeButton === 'next' ? 'bg-[var(--theme-text-accent)] scale-110 shadow-md text-white' : ''
          }`}
          aria-label="Next month"
        >
          <svg
            className={`w-5 h-5 ${activeButton === 'next' ? 'text-white' : 'text-[var(--theme-text-primary)]'}`}
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
