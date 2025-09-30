'use client';

import { useState, useRef } from 'react';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  appLink: string;
  files: File[];
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  appLink?: string;
  files?: string;
}

export default function AppSubmissionForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    appLink: '',
    files: [],
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

    if (!formData.appLink.trim()) {
      newErrors.appLink = 'App link is required';
    } else {
      // Validate URL format
      try {
        const url = new URL(formData.appLink);
        // Check if it's localhost
        if (url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname.startsWith('192.168.') || url.hostname.startsWith('10.') || url.hostname.startsWith('172.')) {
          newErrors.appLink = 'really bro...';
        }
      } catch {
        newErrors.appLink = 'Please enter a valid URL';
      }
    }

    if (formData.files.length === 0) {
      newErrors.files = 'At least one file (video or image) is required';
    } else {
      // Validate file types and sizes
      const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      const allowedVideoTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/quicktime'];
      const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];
      
      const maxFileSize = 10 * 1024 * 1024; // 10MB
      const maxFiles = 5;
      const maxTotalSize = 50 * 1024 * 1024; // 50MB

      if (formData.files.length > maxFiles) {
        newErrors.files = `Maximum ${maxFiles} files allowed`;
      }

      let totalSize = 0;
      for (const file of formData.files) {
        if (!allowedTypes.includes(file.type)) {
          newErrors.files = 'Only images (JPG, PNG, GIF, WebP) and videos (MP4, MOV, AVI) are allowed';
          break;
        }
        if (file.size > maxFileSize) {
          newErrors.files = 'Each file must be smaller than 10MB';
          break;
        }
        totalSize += file.size;
      }

      if (totalSize > maxTotalSize) {
        newErrors.files = 'Total file size must be smaller than 50MB';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, files }));
    
    // Clear error when user selects files
    if (errors.files) {
      setErrors(prev => ({ ...prev, files: undefined }));
    }
  };

  const removeFile = (index: number) => {
    const newFiles = formData.files.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, files: newFiles }));
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
      formDataToSend.append('appLink', formData.appLink);
      
      // Add files
      formData.files.forEach((file, index) => {
        formDataToSend.append(`file_${index}`, file);
      });
      formDataToSend.append('fileCount', formData.files.length.toString());

      const response = await fetch('/api/app-submission', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          appLink: '',
          files: [],
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#5d4e37] mb-4">
          App Submission Form
        </h2>
        <p className="text-[#5d4e37]/80 text-sm">
          All fields marked with * are required. Show us your amazing app!
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <p className="font-medium">App submission received successfully!</p>
          <p className="text-sm mt-1">We'll review your submission and get back to you soon.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="font-medium">There was an error submitting your app.</p>
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

        {/* App Link */}
        <div>
          <label htmlFor="appLink" className="block text-sm font-medium text-[#5d4e37] mb-2">
            App Link *
          </label>
          <input
            type="url"
            id="appLink"
            name="appLink"
            value={formData.appLink}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#cc785c] focus:border-transparent transition-colors ${
              errors.appLink ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="https://your-awesome-app.com"
          />
          {errors.appLink && (
            <p className="mt-1 text-sm text-red-600">
              {errors.appLink === 'really bro...' ? (
                <span className="font-semibold text-orange-600">really bro...</span>
              ) : (
                errors.appLink
              )}
            </p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <label htmlFor="files" className="block text-sm font-medium text-[#5d4e37] mb-2">
            Video & Images *
          </label>
          <input
            type="file"
            id="files"
            name="files"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,video/*"
            multiple
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#cc785c] focus:border-transparent transition-colors ${
              errors.files ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <p className="mt-1 text-xs text-[#5d4e37]/60">
            Accepted formats: Images (JPG, PNG, GIF, WebP) and Videos (MP4, MOV, AVI). Max 5 files, 10MB each, 50MB total.
          </p>
          {errors.files && (
            <p className="mt-1 text-sm text-red-600">{errors.files}</p>
          )}

          {/* File List */}
          {formData.files.length > 0 && (
            <div className="mt-3 space-y-2">
              <p className="text-sm font-medium text-[#5d4e37]">Selected files:</p>
              {formData.files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-[#5d4e37]">{file.name}</span>
                    <span className="text-xs text-gray-500">({formatFileSize(file.size)})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
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
              'Submit App'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
