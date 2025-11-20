import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Validate required SMTP environment variables
const requiredEnvVars = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"];

const validateEnv = () => {
  for (const key of requiredEnvVars) {
    if (!process.env[key]) {
      throw new Error(`Missing SMTP configuration: ${key}`);
    }
  }
};

// Create nodemailer transporter
const createTransporter = () => {
  validateEnv();

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Sanitize form inputs
const sanitize = (value: FormDataEntryValue | null): string =>
  typeof value === "string" ? value.trim() : "";

// Send Discord webhook notification
const sendDiscordNotification = async (submission: {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  submittedAt: string;
}) => {
  const webhookUrl = process.env.CONTACT_DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.log("Discord webhook not configured, skipping notification");
    return;
  }

  // Truncate message if too long for Discord embed
  const truncate = (text: string, max = 1800) =>
    text.length > max ? `${text.slice(0, max - 1)}…` : text;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: "📬 New Industry Contact Inquiry",
        embeds: [
          {
            title: submission.subject || "Industry Partnership Inquiry",
            color: 16749901, // #ff914d in decimal (matches accent color)
            description: truncate(submission.message || "No message provided."),
            fields: [
              { name: "Name", value: submission.name, inline: true },
              { name: "Email", value: submission.email, inline: true },
              {
                name: "Company",
                value: submission.company || "N/A",
                inline: true,
              },
            ],
            timestamp: submission.submittedAt,
            thumbnail: {
              url: "https://asucbc.vercel.app/staff/claude.svg",
            },
            footer: {
              text: "ASU Claude Builder Club - Contact Form",
            },
          },
        ],
      }),
    });
    console.log("Discord notification sent successfully");
  } catch (error) {
    console.error("Discord webhook error:", error);
    // Don't fail the request if Discord webhook fails
  }
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract and sanitize form fields
    const name = sanitize(formData.get("name"));
    const email = sanitize(formData.get("email"));
    const company = sanitize(formData.get("company"));
    const subject = sanitize(formData.get("subject"));
    const message = sanitize(formData.get("message"));

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toISOString();

    const submission = {
      name,
      email,
      company,
      subject,
      message,
      submittedAt,
    };

    // Send email via SMTP
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `[Industry Inquiry] ${subject}`,
      text: `
New Industry Contact Form Submission

Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:        ${name}
Email:       ${email}
Company:     ${company || "Not provided"}

Subject:
${subject}

Message:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted at: ${new Date(submittedAt).toLocaleString()}
      `.trim(),
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", mailOptions.to);

    // Send Discord notification (non-blocking)
    await sendDiscordNotification(submission);

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    // Provide helpful error message for SMTP configuration issues
    if (
      error instanceof Error &&
      error.message.toLowerCase().includes("missing smtp configuration")
    ) {
      return NextResponse.json(
        {
          error:
            "Email service is not configured. Please contact the administrator.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

// Handle CORS preflight requests
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
