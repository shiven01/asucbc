"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiUser, FiBriefcase, FiMessageSquare, FiSend, FiAlertCircle, FiClock, FiCheck } from "react-icons/fi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Heading,
  Text,
  Label,
  Input,
  Textarea,
  Button,
  Card,
} from "../components/ui";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitStatus("idle");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const body = new FormData();
      body.append("name", formData.name.trim());
      body.append("email", formData.email.trim());
      body.append("company", formData.company.trim());
      body.append("subject", formData.subject.trim());
      body.append("message", formData.message.trim());

      const response = await fetch("/api/contact", {
        method: "POST",
        body,
      });

      if (response.ok) {
        setSubmitStatus("success");

        if (typeof window !== "undefined" && (window as any).umami) {
          (window as any).umami.track("Contact Form Submitted", {
            hasCompany: !!formData.company.trim(),
          });
        }

        setFormData(initialFormData);
      } else {
        setSubmitStatus("error");

        if (typeof window !== "undefined" && (window as any).umami) {
          (window as any).umami.track("Contact Form Error", {
            status: response.status,
          });
        }
      }
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100dvh] max-h-[100dvh] relative overflow-y-auto">
      <Header />

      <div className="font-sans relative">
        {/* Hero Section - VISIBLE IMMEDIATELY */}
        <section className="relative px-8 pt-20 pb-16 sm:px-20 sm:pt-32">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-text-accent)]/5 via-transparent to-[var(--theme-text-accent)]/10 pointer-events-none" />

          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6 mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--theme-text-accent)]/10 border border-[var(--theme-text-accent)]/20">
                <FiClock className="w-4 h-4 text-[var(--theme-text-accent)]" />
                <Text size="sm" className="font-medium text-[var(--theme-text-accent)]">
                  We respond within 48 hours
                </Text>
              </div>

              <Heading level="h1" animate={false} className="text-5xl sm:text-6xl lg:text-7xl">
                Let's Build{" "}
                <span className="text-[var(--theme-text-accent)]">Together</span>
              </Heading>

              <Text size="xl" variant="secondary" className="max-w-2xl mx-auto leading-relaxed">
                Ready to partner with ASU's top AI engineering talent? Share your project vision and let's create something exceptional.
              </Text>
            </motion.div>

            {/* Success State */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="mb-12"
              >
                <Card gradient className="p-12 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent pointer-events-none" />
                  <div className="relative z-10 space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center"
                    >
                      <FiCheck className="w-10 h-10 text-green-500" />
                    </motion.div>
                    <Heading level="h3" animate={false} className="text-3xl">
                      Message Sent Successfully!
                    </Heading>
                    <Text variant="secondary" size="lg">
                      Thank you for reaching out. We'll get back to you within 48 hours.
                    </Text>
                    <Button type="button" variant="secondary" size="lg" onClick={resetForm}>
                      Send Another Message
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Error State */}
            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-6 rounded-2xl border border-red-500/40 bg-red-500/10"
              >
                <div className="flex items-start gap-4">
                  <FiAlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <Text className="font-semibold text-red-200 mb-2">
                      Unable to send message
                    </Text>
                    <Text size="sm" className="text-red-300">
                      Please check your connection and try again, or email us directly at{" "}
                      <a
                        href="mailto:shivenshekar01@gmail.com"
                        className="underline font-semibold hover:text-red-100"
                      >
                        shivenshekar01@gmail.com
                      </a>
                    </Text>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Contact Form - VISIBLE IMMEDIATELY */}
            {submitStatus !== "success" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Card gradient className="p-8 sm:p-12">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div>
                        <Label htmlFor="name" required className="flex items-center gap-2 mb-3">
                          <FiUser className="w-4 h-4" />
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          error={errors.name}
                          fullWidth
                          autoFocus
                        />
                      </div>

                      {/* Email Field */}
                      <div>
                        <Label htmlFor="email" required className="flex items-center gap-2 mb-3">
                          <FiMail className="w-4 h-4" />
                          Email Address
                        </Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          error={errors.email}
                          fullWidth
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Company Field */}
                      <div>
                        <Label htmlFor="company" className="flex items-center gap-2 mb-3">
                          <FiBriefcase className="w-4 h-4" />
                          Company
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your company name"
                          fullWidth
                        />
                      </div>

                      {/* Subject Field */}
                      <div>
                        <Label htmlFor="subject" required className="flex items-center gap-2 mb-3">
                          <FiMessageSquare className="w-4 h-4" />
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Partnership inquiry"
                          error={errors.subject}
                          fullWidth
                        />
                      </div>
                    </div>

                    {/* Message Field */}
                    <div>
                      <Label htmlFor="message" required className="flex items-center gap-2 mb-3">
                        <FiMessageSquare className="w-4 h-4" />
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={8}
                        placeholder="Tell us about your project goals, timelines, technical requirements, and what success looks like for you..."
                        error={errors.message}
                        fullWidth
                      />
                    </div>

                    {/* Submit Section */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between pt-6 border-t border-[var(--theme-card-border)]">
                      <Text size="sm" variant="secondary" className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Secure & confidential
                      </Text>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          disabled={isSubmitting}
                          className="min-w-[200px]"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <svg
                                className="animate-spin h-5 w-5"
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
                              Sending...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <FiSend />
                              Send Message
                            </span>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </form>
                </Card>
              </motion.div>
            )}
          </div>
        </section>

        {/* Footer */}
        <div className="px-8 pb-20 sm:px-20">
          <div className="max-w-7xl mx-auto">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
