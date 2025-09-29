# Careers Page Setup Guide

## 🎉 Implementation Complete!

The job application form has been successfully implemented with the following features:

### ✅ What's Been Created

1. **Careers Page** (`/app/careers/page.tsx`)
   - Professional layout matching your site design
   - Responsive design for mobile and desktop

2. **Job Application Form** (`/app/components/JobApplicationForm.tsx`)
   - All required fields with proper validation
   - File upload for resumes (PDF, DOC, DOCX, max 5MB)
   - Client-side validation with error messages
   - Loading states and success/error feedback

3. **API Route** (`/app/api/careers/route.ts`)
   - Handles form submissions
   - Validates file uploads and form data
   - Sends emails with resume attachments

4. **Updated Navigation**
   - Header component now links to `/careers`
   - Both desktop and mobile navigation updated

### 📧 Email Setup Required

To enable email functionality, you need to configure SMTP settings:

1. **Copy environment file:**
   ```bash
   cp env.example .env.local
   ```

2. **Configure SMTP in `.env.local`:**
   ```env
   # For Gmail (recommended for testing)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password  # Use App Password, not regular password
   
   # Email address to receive applications
   RECIPIENT_EMAIL=careers@asucbc.com
   ```

3. **Gmail App Password Setup:**
   - Enable 2-Factor Authentication on your Gmail account
   - Go to Google Account Settings > Security > App passwords
   - Generate an app password for "Mail"
   - Use this password in `SMTP_PASS`

### 🚀 Alternative Email Services

If you prefer other services:

**SendGrid:**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
```

**Outlook/Hotmail:**
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your_email@outlook.com
SMTP_PASS=your_password
```

### 📝 Form Features

- **Required Fields:** Full Name, Degree/Major/Graduation, Email, Phone, Resume, Duty Agreement
- **Optional Field:** Pronunciation Guide
- **File Validation:** 5MB limit, PDF/DOC/DOCX only
- **Phone Validation:** Accepts US and international formats
- **Email Validation:** Standard email format validation
- **Interview Questions:** Displayed as disclaimer before submit button

### 🔧 Testing

1. Start the development server: `pnpm dev`
2. Navigate to `/careers` in your browser
3. Fill out the form and test submission
4. Check your email for the application (once SMTP is configured)

### 🎨 Design

The form maintains consistency with your existing design:
- Uses your color scheme (`#cc785c`, `#ffffff`, `#f4f3ee`)
- Responsive layout that works on all devices
- Professional styling with proper spacing and typography
- Loading states and user feedback

### 🛡️ Security Features

- Server-side validation
- File type and size restrictions
- Email sanitization
- Error handling for missing SMTP configuration

The careers page is now ready for use! Just configure the email settings and you're good to go.
