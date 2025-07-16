# Gemini AI Setup Guide for CareerBot

This guide will help you set up Google's Gemini AI for the CareerBot feature in your portfolio.

## Prerequisites

- Google Cloud account
- Node.js and npm installed

## Step 1: Get Gemini API Key

1. **Go to Google AI Studio**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account

2. **Create API Key**
   - Click "Create API Key" button
   - Copy the generated API key (it starts with "AIza...")
   - Keep this key secure and don't share it publicly

## Step 2: Install Dependencies

Run the following command to install the required packages:

```bash
npm install
```

This will install:
- `@google/generative-ai` - Google's official Gemini AI SDK
- `express` - Web server framework
- `cors` - Cross-origin resource sharing middleware
- `concurrently` - Run multiple commands simultaneously

## Step 3: Set Environment Variables

Create a `.env` file in your project root:

```bash
# .env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
```

Replace `your_gemini_api_key_here` with the API key you obtained in Step 1. The PORT is optional and defaults to 3001.

## Step 4: Load Environment Variables

Update the `server.js` file to load environment variables:

```javascript
import dotenv from 'dotenv';
dotenv.config();

// ... rest of the server code
```

And install dotenv:

```bash
npm install dotenv
```

## Step 5: Run the Application

### Option 1: Run Frontend and Backend Separately

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run server
```

### Option 2: Run Both Together

```bash
npm run dev:full
```

## Step 6: Test the CareerBot

1. Open your portfolio in the browser (usually `http://localhost:5173`)
2. Click the chat bot icon in the bottom-right corner
3. Paste a job description and click send
4. The bot should analyze the job against your resume using Gemini AI

## Example Job Description to Test

Try this sample job description:

```
Senior Full Stack Engineer

We're looking for a Senior Full Stack Engineer to join our team. You'll be responsible for:

Requirements:
- 3+ years of experience with React, TypeScript, and Node.js
- Experience with cloud platforms (AWS, GCP, or Azure)
- Knowledge of microservices architecture
- Experience with CI/CD pipelines
- Strong problem-solving skills
- Experience with databases (PostgreSQL, MongoDB)

Responsibilities:
- Develop and maintain scalable web applications
- Collaborate with cross-functional teams
- Implement best practices for code quality
- Mentor junior developers
- Participate in code reviews
```

## Troubleshooting

### Common Issues

1. **"Failed to analyze career" error**
   - Check if your Gemini API key is correct
   - Ensure the server is running on port 3001
   - Check browser console for CORS errors

2. **"API key not found" error**
   - Make sure you've created the `.env` file
   - Verify the environment variable name is `GEMINI_API_KEY`
   - Restart the server after adding the environment variable

3. **CORS errors**
   - The server is configured with CORS enabled
   - Make sure you're accessing the frontend from `http://localhost:5173`

### API Limits

- Gemini API has rate limits and usage quotas
- Free tier includes 15 requests per minute
- Monitor your usage in the Google AI Studio dashboard

## Security Notes

- Never commit your API key to version control
- Add `.env` to your `.gitignore` file
- Use environment variables for production deployments
- Consider implementing rate limiting for production use

## Production Deployment

For production deployment:

1. Set up environment variables on your hosting platform
2. Update the API endpoint URL in `CareerBot.tsx` to point to your production server
3. Implement proper error handling and rate limiting
4. Consider using a reverse proxy for better security

## Alternative Setup (Without Backend)

If you prefer not to run a separate backend server, you can:

1. Use Vite's proxy feature in `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://your-backend-url.com',
        changeOrigin: true,
      },
    },
  },
})
```

2. Deploy the backend separately and update the API URL accordingly

## Support

If you encounter issues:

1. Check the Google AI Studio documentation
2. Verify your API key is active and has sufficient quota
3. Check the server logs for detailed error messages
4. Ensure all dependencies are properly installed 