'use client';

import { useState } from 'react';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  major: string;
  year: string;
  experience: string;
  teamStatus: string;
  interests: string;
  dietaryRestrictions: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  major?: string;
  year?: string;
  experience?: string;
  teamStatus?: string;
}

export default function HackathonSignupForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    major: '',
    year: '',
    experience: '',
    teamStatus: 'solo',
    interests: '',
    dietaryRestrictions: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      const cleanPhone = formData.phoneNumber.replace(/[\s\-\(\)]/g, '');
      if (!phoneRegex.test(cleanPhone)) {
        newErrors.phoneNumber = 'Please enter a valid phone number';
      }
    }

    if (!formData.major.trim()) {
      newErrors.major = 'Major is required';
    }

    if (!formData.year) {
      newErrors.year = 'Year is required';
    }

    if (!formData.experience) {
      newErrors.experience = 'Experience level is required';
    }

    if (!formData.teamStatus) {
      newErrors.teamStatus = 'Team status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
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
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('major', formData.major);
      formDataToSend.append('year', formData.year);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('teamStatus', formData.teamStatus);
      formDataToSend.append('interests', formData.interests);
      formDataToSend.append('dietaryRestrictions', formData.dietaryRestrictions);

      const response = await fetch('/api/hackathon', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          major: '',
          year: '',
          experience: '',
          teamStatus: 'solo',
          interests: '',
          dietaryRestrictions: '',
        });
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
          Hackathon Registration Form
        </h2>
        <p className="text-[#5d4e37]/80 text-sm">
          All fields marked with * are required.
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <p className="font-medium">Hackathon registration submitted successfully!</p>
          <p className="text-sm mt-1">We'll review your registration and get back to you soon.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="font-medium">There was an error submitting your hackathon registration.</p>
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

        {/* Major */}
        <div>
          <label htmlFor="major" className="block text-sm font-medium text-[#5d4e37] mb-2">
            Major *
          </label>
          <input
            type="text"
            id="major"
            name="major"
            value={formData.major}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#cc785c] focus:border-transparent transition-colors ${
              errors.major ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Computer Science"
          />
          {errors.major && (
            <p className="mt-1 text-sm text-red-600">{errors.major}</p>
          )}
        </div>

        {/* Year */}
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-[#5d4e37] mb-2">
            Year *
          </label>
          <select
            id="year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#cc785c] focus:border-transparent transition-colors ${
              errors.year ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select your year</option>
            <option value="freshman">Freshman</option>
            <option value="sophomore">Sophomore</option>
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
            <option value="graduate">Graduate Student</option>
          </select>
          {errors.year && (
            <p className="mt-1 text-sm text-red-600">{errors.year}</p>
          )}
        </div>

        {/* Experience Level */}
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-[#5d4e37] mb-2">
            Coding Experience *
          </label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#cc785c] focus:border-transparent transition-colors ${
              errors.experience ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select your experience level</option>
            <option value="beginner">Beginner (0-1 years)</option>
            <option value="intermediate">Intermediate (1-3 years)</option>
            <option value="advanced">Advanced (3+ years)</option>
          </select>
          {errors.experience && (
            <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
          )}
        </div>

        {/* Team Status */}
        <div>
          <label htmlFor="teamStatus" className="block text-sm font-medium text-[#5d4e37] mb-2">
            Team Status *
          </label>
          <select
            id="teamStatus"
            name="teamStatus"
            value={formData.teamStatus}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#cc785c] focus:border-transparent transition-colors ${
              errors.teamStatus ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="solo">Looking for a team</option>
            <option value="has-team">I have a team</option>
          </select>
          {errors.teamStatus && (
            <p className="mt-1 text-sm text-red-600">{errors.teamStatus}</p>
          )}
        </div>

        {/* Interests */}
        <div>
          <label htmlFor="interests" className="block text-sm font-medium text-[#5d4e37] mb-2">
            What are you interested in building?
          </label>
          <textarea
            id="interests"
            name="interests"
            value={formData.interests}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#cc785c] focus:border-transparent transition-colors resize-none"
            placeholder="Tell us about your project ideas or interests..."
          />
        </div>

        {/* Dietary Restrictions */}
        <div>
          <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-[#5d4e37] mb-2">
            Dietary Restrictions
          </label>
          <input
            type="text"
            id="dietaryRestrictions"
            name="dietaryRestrictions"
            value={formData.dietaryRestrictions}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#cc785c] focus:border-transparent transition-colors"
            placeholder="Vegetarian, vegan, gluten-free, etc."
          />
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
              'Submit Hackathon Registration'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}