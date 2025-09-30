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
    const appLink = formData.get('appLink') as string;
    const fileCount = parseInt(formData.get('fileCount') as string);

    // Validate required fields
    if (!fullName || !email || !phoneNumber || !appLink || !fileCount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for localhost URLs
    let isLocalhost = false;
    try {
      const url = new URL(appLink);
      isLocalhost = url.hostname === 'localhost' || 
                   url.hostname === '127.0.0.1' || 
                   url.hostname.startsWith('192.168.') || 
                   url.hostname.startsWith('10.') || 
                   url.hostname.startsWith('172.');
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Validate file uploads
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const allowedVideoTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/quicktime'];
    const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];
    
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const maxFiles = 5;
    const maxTotalSize = 50 * 1024 * 1024; // 50MB

    if (fileCount > maxFiles) {
      return NextResponse.json(
        { error: `Maximum ${maxFiles} files allowed` },
        { status: 400 }
      );
    }

    const attachments = [];
    let totalSize = 0;

    for (let i = 0; i < fileCount; i++) {
      const file = formData.get(`file_${i}`) as File;
      
      if (!file) {
        return NextResponse.json(
          { error: `File ${i + 1} is missing` },
          { status: 400 }
        );
      }

      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: 'Invalid file type. Only images (JPG, PNG, GIF, WebP) and videos (MP4, MOV, AVI) are allowed.' },
          { status: 400 }
        );
      }

      // Validate file size
      if (file.size > maxFileSize) {
        return NextResponse.json(
          { error: 'File too large. Each file must be smaller than 10MB.' },
          { status: 400 }
        );
      }

      totalSize += file.size;
      
      // Convert file to buffer for email attachment
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: fileBuffer,
      });
    }

    if (totalSize > maxTotalSize) {
      return NextResponse.json(
        { error: 'Total file size too large. Must be smaller than 50MB.' },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
New App Submission Received

Personal Information:
- Name: ${fullName}
- Email: ${email}
- Phone: ${phoneNumber}
- App Link: ${appLink}
${isLocalhost ? '- ⚠️ LOCALHOST DETECTED! really bro...' : ''}

Files attached: ${fileCount} files
Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB

Submission submitted on: ${new Date().toLocaleString()}
    `;

    // Send email
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
      subject: `New App Submission: ${fullName}${isLocalhost ? ' (LOCALHOST ALERT!)' : ''}`,
      text: emailContent,
      attachments: attachments,
    };

    await transporter.sendMail(mailOptions);

    // If localhost detected, send a special "really bro" email
    if (isLocalhost) {
      const reallyBroEmail = {
        from: process.env.SMTP_USER,
        to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
        subject: '🚨 LOCALHOST DETECTION - really bro...',
        text: `
Someone tried to submit a localhost app link! 

Details:
- Name: ${fullName}
- Email: ${email}
- Phone: ${phoneNumber}
- App Link: ${appLink}

really bro... 😂

Time: ${new Date().toLocaleString()}
        `,
      };
      
      await transporter.sendMail(reallyBroEmail);
    }

    return NextResponse.json(
      { message: 'App submission received successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing app submission:', error);
    
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
