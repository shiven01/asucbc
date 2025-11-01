"use client";

import { useState, useEffect } from "react";
import { useBatParticles } from "../hooks/useBatParticles";

interface FormData {
  track: string;
  isAsuOnlineStudent: boolean;
  firstName: string;
  lastName: string;
  schoolEmail: string;
  year: string;
  hackathonsParticipated: number;
  experienceLevel: string;
  dietaryRestrictions: string;
}

interface FormErrors {
  track?: string;
  isAsuOnlineStudent?: string;
  firstName?: string;
  lastName?: string;
  schoolEmail?: string;
  year?: string;
  hackathonsParticipated?: string;
  experienceLevel?: string;
}

export default function HackathonSignupForm() {
  const [formData, setFormData] = useState<FormData>({
    track: '',
    isAsuOnlineStudent: false,
    firstName: '',
    lastName: '',
    schoolEmail: '',
    year: '',
    hackathonsParticipated: 0,
    experienceLevel: "",
    dietaryRestrictions: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Halloween theme and bat particles

  // Reset success state after 5 seconds to allow another submission
  useEffect(() => {
    if (submitStatus === "success") {
      const timer = setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.track) {
      newErrors.track = "Please select a track";
    }

    if (formData.isAsuOnlineStudent === undefined || formData.isAsuOnlineStudent === null) {
      newErrors.isAsuOnlineStudent = 'Please confirm if you are an ASU Online student';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.schoolEmail.trim()) {
      newErrors.schoolEmail = "School email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.schoolEmail)) {
      newErrors.schoolEmail = "Please enter a valid email address";
    }

    if (!formData.year) {
      newErrors.year = "Year is required";
    }

    if (formData.hackathonsParticipated < 0) {
      newErrors.hackathonsParticipated =
        "Please enter a valid number of hackathons";
    }

    if (!formData.experienceLevel) {
      newErrors.experienceLevel = "Experience level is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Handle number input for hackathonsParticipated
    if (name === "hackathonsParticipated") {
      const numValue = parseInt(value) || 0;
      setFormData((prev) => ({ ...prev, [name]: numValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('track', formData.track);
      formDataToSend.append('isAsuOnlineStudent', formData.isAsuOnlineStudent.toString());
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('schoolEmail', formData.schoolEmail);
      formDataToSend.append('year', formData.year);
      formDataToSend.append('hackathonsParticipated', formData.hackathonsParticipated.toString());
      formDataToSend.append('experienceLevel', formData.experienceLevel);
      formDataToSend.append('dietaryRestrictions', formData.dietaryRestrictions);

      const response = await fetch('/api/hackathon', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          track: '',
          isAsuOnlineStudent: false,
          firstName: '',
          lastName: '',
          schoolEmail: '',
          year: '',
          hackathonsParticipated: 0,
          experienceLevel: "",
          dietaryRestrictions: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
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

      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <p className="font-medium">
            Hackathon registration submitted successfully!
          </p>
          <p className="text-sm mt-1">
            We'll review your registration and get back to you soon.
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="font-medium">
            There was an error submitting your hackathon registration.
          </p>
          <p className="text-sm mt-1">
            Please try again or contact us directly.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Track selection */}
        <div>
          <label className="block text-sm font-medium text-[#5d4e37] mb-2">
            Track *
          </label>
          <div className="grid grid-cols-2 gap-3">
            {["Engineering", "Comprehensive Business Case Competition"].map(
              (option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setFormData((p) => ({ ...p, track: option }));
                    if (errors.track) {
                      setErrors((prev) => ({ ...prev, track: undefined }));
                    }
                  }}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                    formData.track === option
                      ? "bg-[#cc785c] text-white border-transparent"
                      : "bg-white text-[#5d4e37] border-gray-300 hover:border-[#cc785c]"
                  }`}
                >
                  {option}
                </button>
              )
            )}
          </div>
          {errors.track && (
            <p className="mt-1 text-sm text-red-600">{errors.track}</p>
          )}
        </div>

        {/* ASU Online Student Confirmation */}
        <div>
          <label className="block text-sm font-medium text-[#5d4e37] mb-2">
            Are you an ASU Online Student? *
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: true, label: 'Yes' },
              { value: false, label: 'No' }
            ].map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => {
                  setFormData((p) => ({ ...p, isAsuOnlineStudent: option.value }));
                  if (errors.isAsuOnlineStudent) {
                    setErrors((prev) => ({ ...prev, isAsuOnlineStudent: undefined }));
                  }
                }}
                className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                  formData.isAsuOnlineStudent === option.value
                    ? 'bg-[#cc785c] text-white border-transparent'
                    : 'bg-white text-[#5d4e37] border-gray-300 hover:border-[#cc785c]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          {errors.isAsuOnlineStudent && (
            <p className="mt-1 text-sm text-red-600">{errors.isAsuOnlineStudent}</p>
          )}
          <p className="mt-1 text-xs text-[#5d4e37]/60">
            We will be verifying each one individually for proof later
          </p>
        </div>

        {/* First Name */}
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-[#5d4e37] mb-2"
          >
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#cc785c] focus:border-transparent transition-colors ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-[#5d4e37] mb-2"
          >
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#cc785c] focus:border-transparent transition-colors ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>

        {/* School Email */}
        <div>
          <label
            htmlFor="schoolEmail"
            className="block text-sm font-medium text-[#5d4e37] mb-2"
          >
            School Email *
          </label>
          <input
            type="email"
            id="schoolEmail"
            name="schoolEmail"
            value={formData.schoolEmail}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#cc785c] focus:border-transparent transition-colors ${
              errors.schoolEmail ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="your.email@asu.edu"
          />
          {errors.schoolEmail && (
            <p className="mt-1 text-sm text-red-600">{errors.schoolEmail}</p>
          )}
        </div>

        {/* Year */}
        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-[#5d4e37] mb-2"
          >
            Year *
          </label>
          <select
            id="year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#cc785c] focus:border-transparent transition-colors ${
              errors.year ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select your year</option>
            <option value="freshman">Freshman</option>
            <option value="sophomore">Sophomore</option>
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
            <option value="masters">Masters</option>
          </select>
          {errors.year && (
            <p className="mt-1 text-sm text-red-600">{errors.year}</p>
          )}
        </div>

        {/* Number of Hackathons Participated */}
        <div>
          <label
            htmlFor="hackathonsParticipated"
            className="block text-sm font-medium text-[#5d4e37] mb-2"
          >
            How many hackathons have you participated in before? *
          </label>
          <input
            type="number"
            id="hackathonsParticipated"
            name="hackathonsParticipated"
            value={formData.hackathonsParticipated}
            onChange={handleInputChange}
            min="0"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#cc785c] focus:border-transparent transition-colors ${
              errors.hackathonsParticipated
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="0"
          />
          {errors.hackathonsParticipated && (
            <p className="mt-1 text-sm text-red-600">
              {errors.hackathonsParticipated}
            </p>
          )}
        </div>

        {/* Experience Level */}
        <div>
          <label
            htmlFor="experienceLevel"
            className="block text-sm font-medium text-[#5d4e37] mb-2"
          >
            Field of Study Experience Level *
          </label>
          <select
            id="experienceLevel"
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#cc785c] focus:border-transparent transition-colors ${
              errors.experienceLevel ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select your experience level</option>
            <option value="0-1">0-1 years</option>
            <option value="1-2">1-2 years</option>
            <option value="2-4">2-4 years</option>
            <option value="4+">4+ years</option>
          </select>
          {errors.experienceLevel && (
            <p className="mt-1 text-sm text-red-600">
              {errors.experienceLevel}
            </p>
          )}
        </div>

        {/* Dietary Restrictions */}
        <div>
          <label
            htmlFor="dietaryRestrictions"
            className="block text-sm font-medium text-[#5d4e37] mb-2"
          >
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
            disabled={isSubmitting || submitStatus === "success"}
            className={`w-full py-4 px-6 rounded-lg font-medium text-white transition-all duration-200 relative z-10 ${
              submitStatus === "success"
                ? "bg-green-600 cursor-default"
                : isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#cc785c] hover:bg-[#5d4e37] hover:scale-105 hover:shadow-lg"
            }`}
          >
            {submitStatus === "success" ? (
              <span className="flex items-center justify-center">
                <svg
                  className="mr-3 h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Registration Complete!
              </span>
            ) : isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Hackathon Registration"
            )}
          </button>
        </div>
      </form>

      {/* Contact Info */}
      <div className="text-center mt-8">
        <p className="text-[#5d4e37]/80 mb-2">
          Questions? Contact us at{" "}
          <a
            href="mailto:shivenshekar01@gmail.com"
            className="text-[#5d4e37] hover:underline font-semibold"
          >
            shivenshekar01@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
