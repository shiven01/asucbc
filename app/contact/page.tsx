"use client";

import { useState } from "react";
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
  Container,
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
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const validate = () => {
    const newErrors: ContactFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    const trimmedEmail = formData.email.trim();

    if (!trimmedEmail) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Enter a valid email address";
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

    if (!validate()) {
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
        setFormData(initialFormData);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Contact form submission failed", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100dvh] relative overflow-x-hidden">
      <Header />
      <main className="py-12 sm:py-16">
        <Container size="md" animate>
          <div className="mb-10 text-center space-y-4">
            <Heading level="h1" animate={false}>
              Contact Our Team
            </Heading>
            <Text size="lg" variant="secondary">
              Share your project requirements, sponsorship ideas, or partnership
              questions and we'll respond within two business days.
            </Text>
          </div>

          {submitStatus === "success" && (
            <Card gradient className="mb-8 text-center">
              <Heading level="h3" animate={false} className="mb-2">
                Message received!
              </Heading>
              <Text variant="secondary" className="mb-4">
                Thanks for reaching out. We'll follow up shortly.
              </Text>
              <Button type="button" variant="secondary" onClick={resetForm}>
                Send another message
              </Button>
            </Card>
          )}

          {submitStatus === "error" && (
            <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              We couldn't send your message. Please verify your connection or try
              again later.
            </div>
          )}

          <Card animated={false} gradient>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" required>
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  error={errors.name}
                  fullWidth
                />
              </div>

              <div>
                <Label htmlFor="email" required>
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="fullname@asu.edu"
                  error={errors.email}
                  fullWidth
                />
              </div>

              <div>
                <Label htmlFor="company">Company or Organization</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Anthropic"
                  fullWidth
                />
              </div>

              <div>
                <Label htmlFor="subject" required>
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Let's collaborate"
                  error={errors.subject}
                  fullWidth
                />
              </div>

              <div>
                <Label htmlFor="message" required>
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us about your project goals, timelines, and what success looks like."
                  error={errors.message}
                  fullWidth
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Text size="xs" variant="secondary">
                  We never share your information. Messages are sent securely via
                  our SMTP provider.
                </Text>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send message"}
                </Button>
              </div>
            </form>
          </Card>
        </Container>
        <div className="mt-16">
          <Footer />
        </div>
      </main>
    </div>
  );
}
