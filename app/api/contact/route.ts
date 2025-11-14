import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const requiredEnvVars = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
];

const ensureEnv = () => {
  for (const key of requiredEnvVars) {
    if (!process.env[key]) {
      throw new Error(`Missing SMTP configuration: ${key}`);
    }
  }
};

const createTransporter = () => {
  ensureEnv();

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

const sanitize = (value: FormDataEntryValue | null) =>
  typeof value === "string" ? value.trim() : "";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = sanitize(formData.get("name"));
    const email = sanitize(formData.get("email"));
    const company = sanitize(formData.get("company"));
    const subject = sanitize(formData.get("subject"));
    const message = sanitize(formData.get("message"));

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `Industry Inquiry: ${subject}`,
      text: `New contact request from ${name} (${email})\n\nCompany: ${
        company || "N/A"
      }\nSubject: ${subject}\n\nMessage:\n${message}\n\nSubmitted at: ${new Date().toISOString()}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Message sent" }, { status: 200 });
  } catch (error) {
    console.error("Contact form error", error);

    if (
      error instanceof Error &&
      error.message.toLowerCase().includes("missing smtp configuration")
    ) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

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
