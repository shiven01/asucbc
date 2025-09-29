'use client';

import { useState, useRef } from 'react';

interface FormData {
  fullName: string;
  pronunciation: string;
  degreeMajor: string;
  email: string;
  phoneNumber: string;
  dutyAgreement: boolean;
  resume: File | null;
}

interface FormErrors {
  fullName?: string;
  degreeMajor?: string;
  email?: string;
  phoneNumber?: string;
  dutyAgreement?: string;
  resume?: string;
}

export default function JobApplicationForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    pronunciation: '',
    degreeMajor: '',
    email: '',
    phoneNumber: '',
    dutyAgreement: false,
    resume: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.degreeMajor.trim()) {
      newErrors.degreeMajor = 'Degree, major, and graduation date are required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else {
      // Flexible phone validation for US and international numbers
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      const cleanPhone = formData.phoneNumber.replace(/[\s\-\(\)]/g, '');
      if (!phoneRegex.test(cleanPhone)) {
        newErrors.phoneNumber = 'Please enter a valid phone number';
      }
    }

    if (!formData.dutyAgreement) {
      newErrors.dutyAgreement = 'You must agree to the duty statement';
    }

    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    } else if (formData.resume.size > 5 * 1024 * 1024) { // 5MB limit
      newErrors.resume = 'Resume file must be smaller than 5MB';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, resume: file }));
    
    // Clear error when user selects a file
    if (errors.resume) {
      setErrors(prev => ({ ...prev, resume: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('pronunciation', formData.pronunciation);
      formDataToSend.append('degreeMajor', formData.degreeMajor);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('dutyAgreement', formData.dutyAgreement.toString());
      
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }

      const response = await fetch('/api/careers', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          pronunciation: '',
          degreeMajor: '',
          email: '',
          phoneNumber: '',
          dutyAgreement: false,
          resume: null,
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#5d4e37] mb-4">
          Job Application Form
        </h2>
        <p className="text-[#5d4e37]/80 text-sm">
          All fields marked with * are required.
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <p className="font-medium">Application submitted successfully!</p>
          <p className="text-sm mt-1">We'll review your application and get back to you soon.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="font-medium">There was an error submitting your application.</p>
          <p className="text-sm mt-1">Please try again or contact us directly.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-[#5d4e37] mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#cc785c] focus:border-transparent transition-colors ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
          )}
        </div>

        {/* Pronunciation */}
        <div>
          <label htmlFor="pronunciation" className="block text-sm font-medium text-[#5d4e37] mb-2">
            Pronunciation Guide
          </label>
          <input
            type="text"
            id="pronunciation"
            name="pronunciation"
            value={formData.pronunciation}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#cc785c] focus:border-transparent transition-colors"
            placeholder="How to pronounce your name (optional)"
          />
        </div>

        {/* Degree, Major, Graduation Date */}
        <div>
          <label htmlFor="degreeMajor" className="block text-sm font-medium text-[#5d4e37] mb-2">
            Degree, Major, Graduation Date *
          </label>
          <input
            type="text"
            id="degreeMajor"
            name="degreeMajor"
            value={formData.degreeMajor}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#cc785c] focus:border-transparent transition-colors ${
              errors.degreeMajor ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., BS Computer Science, May 2025"
          />
          {errors.degreeMajor && (
            <p className="mt-1 text-sm text-red-600">{errors.degreeMajor}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#5d4e37] mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#cc785c] focus:border-transparent transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="your.email@asu.edu"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#5d4e37] mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#cc785c] focus:border-transparent transition-colors ${
              errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Resume Upload */}
        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-[#5d4e37] mb-2">
            Resume *
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#cc785c] focus:border-transparent transition-colors ${
              errors.resume ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <p className="mt-1 text-xs text-[#5d4e37]/60">
            Accepted formats: PDF, DOC, DOCX (max 5MB)
          </p>
          {errors.resume && (
            <p className="mt-1 text-sm text-red-600">{errors.resume}</p>
          )}
        </div>

        {/* Duty Agreement Checkbox */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="dutyAgreement"
            name="dutyAgreement"
            checked={formData.dutyAgreement}
            onChange={handleInputChange}
            className={`mt-1 h-4 w-4 text-[#cc785c] focus:ring-[#cc785c] border-gray-300 rounded ${
              errors.dutyAgreement ? 'border-red-500' : ''
            }`}
          />
          <label htmlFor="dutyAgreement" className="text-sm text-[#5d4e37]">
            <span className="font-medium">*</span> Clicking this means that I understand I have a duty towards the long-term expansion and stability of the Claude Builder club.
          </label>
        </div>
        {errors.dutyAgreement && (
          <p className="mt-1 text-sm text-red-600 ml-7">{errors.dutyAgreement}</p>
        )}

        {/* Interview Questions Section */}
        <div className="mt-8 p-6 bg-[#f4f3ee] rounded-lg border-l-4 border-[#cc785c]">
          <h3 className="text-lg font-semibold text-[#5d4e37] mb-4">
            Interview Questions
          </h3>
          <p className="text-sm text-[#5d4e37]/80 mb-4">
            Please be prepared to discuss the following questions during your interview (this will be a casual conversation, no need to prepare STAR responses):
          </p>
          <ul className="space-y-2 text-sm text-[#5d4e37]">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#cc785c] rounded-full mt-2 mr-3 flex-shrink-0"></span>
              How do you deal with an unfortunate situation as an officer?
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#cc785c] rounded-full mt-2 mr-3 flex-shrink-0"></span>
              What are you interested in? (be prepared with details)
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-[#cc785c] rounded-full mt-2 mr-3 flex-shrink-0"></span>
              What can you do for the club that others can't?
            </li>
          </ul>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-lg font-medium text-white transition-all duration-200 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#cc785c] hover:bg-[#5d4e37] hover:scale-105 hover:shadow-lg'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Application'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
