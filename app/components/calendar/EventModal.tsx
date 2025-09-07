'use client';

import React from 'react';
import { CalendarEvent } from '@/types/calendar';

interface EventModalProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventModal({ event, isOpen, onClose }: EventModalProps) {
  if (!isOpen || !event) return null;

  const formatEventTime = (event: CalendarEvent) => {
    const start = event.start.dateTime || event.start.date;
    const end = event.end.dateTime || event.end.date;
    
    if (!start) return 'Time not specified';
    
    const startDate = new Date(start);
    const endDate = new Date(end || start);
    
    // Format date
    const dateStr = startDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    
    // Format time if it's not an all-day event
    if (event.start.dateTime && event.end.dateTime) {
      const startTime = startDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      const endTime = endDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      return `${dateStr}, ${startTime} - ${endTime}`;
    } else {
      return dateStr;
    }
  };

  const formatLocation = (location?: string) => {
    return location || 'Location not specified';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Event title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 pr-8">
          {event.summary}
        </h2>
        
        {/* Event details */}
        <div className="space-y-3">
          {/* Time */}
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-700">{formatEventTime(event)}</span>
          </div>
          
          {/* Location */}
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-gray-700">{formatLocation(event.location)}</span>
          </div>
        </div>
        
        {/* Description */}
        <div className="mt-6">
          <p className="text-gray-500 text-sm">
            {event.description || 'No description available'}
          </p>
        </div>
        
        {/* Action buttons */}
        {event.htmlLink && (
          <div className="mt-6 flex justify-end space-x-3">
            <a
              href={event.htmlLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#c15f3c] text-white rounded-lg hover:bg-[#c15f3c]/90 transition-colors text-sm font-medium"
            >
              View in Google Calendar
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
