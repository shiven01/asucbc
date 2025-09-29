import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter for sending emails
// For Vercel deployment, you'll need to set up environment variables
const createTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('SMTP configuration missing');
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form data
    const fullName = formData.get('fullName') as string;
    const pronunciation = formData.get('pronunciation') as string;
    const degreeMajor = formData.get('degreeMajor') as string;
    const email = formData.get('email') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const dutyAgreement = formData.get('dutyAgreement') as string;
    const resumeFile = formData.get('resume') as File;

    // Validate required fields
    if (!fullName || !degreeMajor || !email || !phoneNumber || !dutyAgreement || !resumeFile) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    if (resumeFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Resume file too large (max 5MB)' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(resumeFile.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload PDF, DOC, or DOCX files only.' },
        { status: 400 }
      );
    }

    // Convert file to buffer for email attachment
    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());

    // Create email content
    const emailContent = `
New Officer Application Received

Personal Information:
- Name: ${fullName}
- Pronunciation: ${pronunciation || 'Not provided'}
- Degree/Major/Graduation: ${degreeMajor}
- Email: ${email}
- Phone: ${phoneNumber}
- Duty Agreement: ${dutyAgreement === 'true' ? 'Agreed' : 'Not agreed'}

Resume attached: ${resumeFile.name}
File size: ${(resumeFile.size / 1024 / 1024).toFixed(2)} MB

Application submitted on: ${new Date().toLocaleString()}
    `;

    // Send email
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER, // Fallback to sender if no recipient specified
      subject: `New Officer Application: ${fullName}`,
      text: emailContent,
      attachments: [
        {
          filename: resumeFile.name,
          content: resumeBuffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Officer application submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing application:', error);
    
    // If SMTP is not configured, return a more helpful error
    if (error instanceof Error && error.message.includes('SMTP configuration missing')) {
      return NextResponse.json(
        { error: 'Email service not configured. Please contact the administrator.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
