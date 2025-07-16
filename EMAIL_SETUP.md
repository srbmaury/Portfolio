# Email Integration Setup Guide

## Option 1: EmailJS (Recommended - No Backend Required)

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account
2. Verify your email address

### Step 2: Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" or "Outlook" (or any email provider)
4. Connect your email account (srbmaury@gmail.com)
5. Note down the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```html
Subject: New Contact Form Message from {{from_name}}

Hello {{to_name}},

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

Best regards,
Your Portfolio Contact Form
```

4. Save the template and note down the **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key
1. Go to "Account" → "API Keys"
2. Copy your **Public Key** (e.g., `user_def456`)

### Step 5: Update Contact Component
Replace the placeholder values in `src/components/Contact.tsx`:

```javascript
// Replace these values with your actual EmailJS credentials
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your public key
const result = await emailjs.send(
  'YOUR_SERVICE_ID', // Replace with your service ID
  'YOUR_TEMPLATE_ID', // Replace with your template ID
  // ... rest of the code
);
```

### Step 6: Test the Integration
1. Start your development server: `npm run dev`
2. Go to the contact form
3. Fill out and submit the form
4. Check your email (srbmaury@gmail.com) for the test message

## Option 2: Backend API (Advanced)

If you prefer a backend solution, you can create a simple API endpoint:

### Using Node.js + Express + Nodemailer:

```javascript
// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: 'srbmaury@gmail.com',
      pass: 'your-app-password' // Use Gmail App Password
    }
  });
  
  const mailOptions = {
    from: email,
    to: 'srbmaury@gmail.com',
    subject: `Portfolio Contact: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };
  
  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
```

## Option 3: Formspree (Alternative - No Setup)

You can also use Formspree as an alternative to EmailJS:

1. Go to [Formspree.io](https://formspree.io/)
2. Create a free account
3. Create a new form
4. Replace the form action with your Formspree endpoint
5. No JavaScript required - works with regular HTML forms

## Security Notes

- Never expose API keys in client-side code for production
- Use environment variables for sensitive data
- Consider rate limiting for the contact form
- Validate form inputs on both client and server side

## Free Tier Limits

- **EmailJS**: 200 emails/month (free tier)
- **Formspree**: 50 submissions/month (free tier)
- **Custom Backend**: No limits (but requires hosting)

## Recommended Approach

For a portfolio website, **EmailJS** is the best choice because:
- ✅ No backend required
- ✅ Easy to set up
- ✅ Free tier is sufficient
- ✅ Reliable delivery
- ✅ Professional templates 