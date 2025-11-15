import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create a transporter for sending emails
const createTransporter = () => {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    throw new Error("SMTP configuration missing");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Extract form data
    const { name, email, company, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
New Contact Form Submission

Contact Information:
- Name: ${name}
- Email: ${email}
- Company/Organization: ${company || "Not provided"}

Subject: ${subject}

Message:
${message}

Submission received on: ${new Date().toLocaleString()}
    `;

    // Send email
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
      subject: `Contact Form: ${subject}`,
      text: emailContent,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    // Track submission with umami if webhook is available
    if (typeof window !== "undefined" && (window as any).umami) {
      (window as any).umami.track("Contact Form Submitted", {
        hasCompany: !!company,
      });
    }

    return NextResponse.json(
      { message: "Contact form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);

    // If SMTP is not configured, return a more helpful error
    if (
      error instanceof Error &&
      error.message.includes("SMTP configuration missing")
    ) {
      return NextResponse.json(
        {
          error:
            "Email service not configured. Please contact the administrator.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
