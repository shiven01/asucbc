import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter for sending emails
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
    const email = formData.get('email') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const major = formData.get('major') as string;
    const year = formData.get('year') as string;
    const experience = formData.get('experience') as string;
    const teamStatus = formData.get('teamStatus') as string;
    const interests = formData.get('interests') as string;
    const dietaryRestrictions = formData.get('dietaryRestrictions') as string;

    // Validate required fields
    if (!fullName || !email || !phoneNumber || !major || !year || !experience || !teamStatus) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
New Hackathon Registration Received

Personal Information:
- Name: ${fullName}
- Email: ${email}
- Phone: ${phoneNumber}
- Major: ${major}
- Year: ${year}
- Coding Experience: ${experience}
- Team Status: ${teamStatus === 'solo' ? 'Looking for a team' : 'Has a team'}

Additional Information:
- Interests/Project Ideas: ${interests || 'Not provided'}
- Dietary Restrictions: ${dietaryRestrictions || 'None'}

Registration submitted on: ${new Date().toLocaleString()}
    `;

    // Send email
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.RECIPIENT_EMAIL || 'shivenshekar01@gmail.com',
      subject: `🎃 New Hackathon Registration: ${fullName}`,
      text: emailContent,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Hackathon registration submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing hackathon registration:', error);
    
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

