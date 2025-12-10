// Calendar utility functions for ASU CBC Calendar System

import { CalendarDay, CalendarMonth, CalendarEvent } from '@/types/calendar';

/**
 * Get the number of days in a month
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
 */
export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

/**
 * Get month name
 */
export function getMonthName(month: number): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month];
}

/**
 * Get day names
 */
export function getDayNames(abbreviated: boolean = true): string[] {
  if (abbreviated) {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
}

/**
 * Create a calendar month with all days
 */
export function createCalendarMonth(
  year: number,
  month: number,
  selectedDate: Date | null = null,
  events: CalendarEvent[] = []
): CalendarMonth {
  const firstDayOfWeek = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const today = new Date();
  
  const days: CalendarDay[] = [];
  
  // Add days from previous month
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
  
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(prevYear, prevMonth, daysInPrevMonth - i);
    const dayEvents = getEventsForDate(date, events);
    
    days.push({
      date,
      isCurrentMonth: false,
      isToday: isToday(date),
      isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
      events: dayEvents,
      hasEvents: dayEvents.length > 0,
    });
  }
  
  // Add days from current month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayEvents = getEventsForDate(date, events);
    
    days.push({
      date,
      isCurrentMonth: true,
      isToday: isToday(date),
      isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
      events: dayEvents,
      hasEvents: dayEvents.length > 0,
    });
  }
  
  // Add days from next month to fill the grid
  const totalCells = 42; // 6 weeks × 7 days
  const remainingCells = totalCells - days.length;
  
  for (let day = 1; day <= remainingCells; day++) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    const date = new Date(nextYear, nextMonth, day);
    const dayEvents = getEventsForDate(date, events);
    
    days.push({
      date,
      isCurrentMonth: false,
      isToday: isToday(date),
      isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
      events: dayEvents,
      hasEvents: dayEvents.length > 0,
    });
  }
  
  return {
    year,
    month,
    days,
    firstDayOfWeek,
    daysInMonth,
  };
}

/**
 * Get events for a specific date
 */
export function getEventsForDate(date: Date, events: CalendarEvent[]): CalendarEvent[] {
  return events.filter(event => {
    const eventDate = event.start.dateTime 
      ? new Date(event.start.dateTime)
      : new Date(event.start.date!);
    
    return isSameDay(eventDate, date);
  });
}

/**
 * Truncate event summary for display
 */
export function truncateEventSummary(summary: string, maxLength: number = 20): string {
  if (summary.length <= maxLength) {
    return summary;
  }
  return summary.substring(0, maxLength - 3) + '...';
}


