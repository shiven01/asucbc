"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Heading, Text, Label, Input, Textarea, Button, Card } from "../components/ui";
import { motion } from "framer-motion";

interface FormData {
    name: string;
    email: string;
    company: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 60,
            damping: 20,
            mass: 0.5,
        },
    },
};

const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 60,
            damping: 20,
            mass: 0.5,
            delay: 0.2,
        },
    },
};

export default function ContactPage() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChangeEvent = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmitEvent = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true)
        setSubmitStatus("idle")

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitStatus("success")
                if (typeof window !== "undefined" && (window as any).umami) {
                    (window as any).umami.track("Contact Form Submitted");
                }
                setFormData({
                    name: "",
                    email: "",
                    company: "",
                    subject: "",
                    message: "",
                });
            } else {
                setSubmitStatus("error");
                if (typeof window !== "undefined" && (window as any).umami) {
                    (window as any).umami.track("Contact Form Error", { status: response.status });
                }
            }
        } catch (error) {
            console.error("Form submission error", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return(
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="font-sans flex-1 pt-8 px-4 pb-8 sm:pt-12 sm:px-8 md:p-20">
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        variants={headerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Heading level="h1" animate={false} className="mb-4">
                            Get In <span className="text-[var(--theme-text-accent)]">Touch</span>
                        </Heading>
                        <Text size="lg" variant="secondary" className="max-w-2xl mx-auto">
                            Have a project in mind or questions about partnering with us? We'd love to hear from you
                        </Text>
                    </motion.div>
                </div>

                {/* Form */}
                <motion.div
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Card gradient animated={false} className="shadow-xl">
                        <form onSubmit={handleSubmitEvent} className="space-y-6">
                            {/* If Success */}
                            {submitStatus === "success" && (
                                <div className="p-4 bg-green-100 border-green-400 text-green-700 rounded-lg">
                                    <p className="font-medium">Thank you for your interest!</p>
                                    <p className="text-sm mt-1">
                                        We've received your message and will get back to you soon.
                                    </p>
                                </div>
                            )}

                            {/* If Error */}
                            { submitStatus === "error" && (
                                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                    <p className="font-medium">
                                        There was an error in submitting your message.
                                    </p>
                                    <p className="text-sm mt-1">
                                        Please try again or contact us directly at {" "}
                                        <a
                                            href="mailto:shivenshankar01@gmail.com"
                                            className="underline font-semibold"
                                        >
                                            shivenshankar01@gmail.com
                                        </a>
                                    </p>
                                </div>
                            )}

                            {/* Form Inputs Section */}
                            <div>
                                <Label htmlFor="name" required>
                                    Name
                                </Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChangeEvent}
                                    placeholder="Your Full Name"
                                    fullWidth
                                    error={errors.name}
                                />
                            </div>

                            <div>
                                <Label htmlFor="email" required>
                                    Email
                                </Label>
                                <Input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChangeEvent}
                                    placeholder="Your Email Address"
                                    fullWidth
                                    error={errors.email}
                                />
                            </div>

                            <div>
                                <Label htmlFor="company" required>
                                    Company/Organization
                                </Label>
                                <Input
                                    type="text"
                                    id="company"
                                    name="compary"
                                    value={formData.company}
                                    onChange={handleInputChangeEvent}
                                    placeholder="Your company or organization (optional)"
                                    fullWidth
                                />
                            </div>

                            <div>
                                <Label htmlFor="subject" required>
                                    Subject
                                </Label>
                                <Input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChangeEvent}
                                    placeholder="Topic of Inquiry"
                                    fullWidth
                                    error={errors.subject}
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
                                    onChange={handleInputChangeEvent}
                                    placeholder="Tell us about your project or inquiry..."
                                    rows={6}
                                    fullWidth
                                    error={errors.message}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    fullWidth
                                    disabled={isSubmitting}
                                    className={isSubmitting ? "!bg-gray-400" : "" }
                                >
                                    { isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            Sending...
                                        </span>
                                    ) : (
                                        "Send Message"
                                    )}
                                </Button>
                            </div>
                        </form>

                        {/* Contact Info */}
                        <div className="text-center mt-8 pt-8 border-t border-[var(--theme-card-border)]">
                            <Text size="base" variant="secondary" className="mb-2">
                                Or email us directly at
                            </Text>
                            <a
                                href="mailto:shivenshekar01@gmail.com"
                                className="text-[var(--theme-text-accent)] hover:underline font-semibold"
                                data-umami-event="Contact Email Click"
                                data-umami-event-location="Contact Form"
                            >
                                shivenshekar01@gmail.com
                            </a>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}


