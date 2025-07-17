# Deployment Guide for Render

This guide will help you deploy your portfolio to Render.

## Prerequisites

1. A Render account (free tier available)
2. Your portfolio code pushed to a Git repository (GitHub, GitLab, etc.)
3. A Gemini API key for the career analysis feature

## Deployment Steps

### Option 1: Deploy as a Single Web Service (Recommended)

1. **Connect your repository to Render:**
   - Go to [render.com](https://render.com) and sign up/login
   - Click "New +" and select "Web Service"
   - Connect your Git repository
   - Choose the repository containing your portfolio

2. **Configure the service:**
   - **Name:** `portfolio` (or your preferred name)
   - **Environment:** `Node`
   - **Region:** Choose closest to your target audience
   - **Branch:** `main` (or your default branch)
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Free

3. **Set Environment Variables:**
   - Click on "Environment" tab
   - Add the following environment variable:
     - **Key:** `GEMINI_API_KEY`
     - **Value:** Your Gemini API key from Google AI Studio
   - Click "Save Changes"

4. **Deploy:**
   - Click "Create Web Service"
   - Render will automatically build and deploy your application
   - Wait for the build to complete (usually 2-5 minutes)

### Option 2: Deploy as Separate Services (Advanced)

If you prefer to deploy frontend and backend separately:

1. **Backend Service:**
   - Create a new Web Service
   - Use the same repository
   - Build Command: `npm install`
   - Start Command: `npm run server`
   - Set the `GEMINI_API_KEY` environment variable

2. **Frontend Service:**
   - Create a new Static Site
   - Use the same repository
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Add rewrite rule: `/*` → `/index.html`

## Environment Variables

Make sure to set these environment variables in Render:

- `GEMINI_API_KEY`: Your Google Gemini API key
- `NODE_ENV`: Set to `production` (Render sets this automatically)

## Getting Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Add it to your Render environment variables

## Custom Domain (Optional)

1. In your Render service dashboard, go to "Settings"
2. Click "Custom Domains"
3. Add your domain and follow the DNS configuration instructions

## Troubleshooting

### Common Issues:

1. **Build fails:**
   - Check the build logs in Render dashboard
   - Ensure all dependencies are in `package.json`
   - Verify TypeScript compilation

2. **API calls fail:**
   - Check if `GEMINI_API_KEY` is set correctly
   - Verify the API endpoint is accessible
   - Check CORS configuration

3. **Static files not loading:**
   - Ensure the build creates a `dist` folder
   - Check if the static file serving is configured correctly

### Useful Commands:

```bash
# Test build locally
npm run build

# Test server locally
npm start

# Check if dist folder exists
ls -la dist/
```

## Monitoring

- Use Render's built-in logs to monitor your application
- Set up alerts for service downtime
- Monitor API usage and costs

## Cost Optimization

- Free tier includes 750 hours/month
- Static sites are always free
- Consider upgrading only if you need more resources

Your portfolio should now be live at `https://your-service-name.onrender.com`! 