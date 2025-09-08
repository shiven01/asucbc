'use client';

import React, { useEffect } from 'react';
import { CalendarEvent } from '@/types/calendar';

interface EventModalProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCalendar?: () => void;
}

export default function EventModal({ event, isOpen, onClose, onAddToCalendar }: EventModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, isOpen]);

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
      <div className="relative bg-[#c15f3c] border-2 border-[#f4f3ee] rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#f4f3ee] bg-[#f4f3ee] rounded-t-lg">
          <h2 className="text-xl font-semibold text-[#c15f3c]">
            Event Details
          </h2>
          <button
            onClick={onClose}
            className="text-[#c15f3c] hover:text-[#a04d2f] transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Event Title */}
          <div>
            <h3 className="text-lg font-medium text-[#f4f3ee] mb-2">
              {event.summary}
            </h3>
          </div>
          
          {/* Date and Time */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-[#f4f3ee]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-white/70">
                {formatEventTime(event)}
              </span>
            </div>
          </div>
          
          {/* Location */}
          {event.location && (
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-[#f4f3ee] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-white/70">
                {formatLocation(event.location)}
              </span>
            </div>
          )}
          
          {/* Description */}
          {event.description && (
            <div>
              <h4 className="text-sm font-medium text-[#f4f3ee] mb-2">Description</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                {event.description}
              </p>
            </div>
          )}
          
          {/* External Link */}
          {event.htmlLink && (
            <div>
              <a
                href={event.htmlLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f4f3ee] hover:text-[#e0ddd8] transition-colors text-sm"
              >
                View in Google Calendar →
              </a>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-[#f4f3ee]">
          {onAddToCalendar && (
            <button
              onClick={onAddToCalendar}
              className="bg-[#f4f3ee] hover:bg-[#e0ddd8] text-[#c15f3c] px-4 py-2 rounded-md transition-colors text-sm font-medium"
            >
              Add to Calendar
            </button>
          )}
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
