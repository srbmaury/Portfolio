# CareerBot Setup Guide

## Overview
Your portfolio now includes an AI Career Assistant that analyzes job roles against your resume data and provides detailed fit analysis.

## Current Features
- ✅ **Floating Chat Button** - Always accessible on your portfolio
- ✅ **Job Analysis** - Analyzes job descriptions against your skills
- ✅ **Fit Scoring** - Provides 0-100 fit scores with color coding
- ✅ **Detailed Feedback** - Strengths, gaps, and recommendations
- ✅ **Beautiful UI** - Modern chat interface with animations

## Integration Options

### Option 1: OpenAI Integration (Recommended)

#### Step 1: Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Go to "API Keys" section
4. Create a new API key
5. Copy the key (starts with `sk-`)

#### Step 2: Create Environment Variables
Create a `.env` file in your project root:
```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

#### Step 3: Update CareerBot Component
Replace the `analyzeJobFit` function in `src/components/CareerBot.tsx`:

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for client-side usage
});

const analyzeJobFit = async (jobDescription: string): Promise<JobAnalysis> => {
  try {
    const prompt = `
    Analyze the following job description against this candidate's profile:
    
    CANDIDATE PROFILE:
    Name: ${resumeData.name}
    Title: ${resumeData.title}
    Experience: ${JSON.stringify(resumeData.experience)}
    Skills: ${JSON.stringify(resumeData.skills)}
    Projects: ${resumeData.projects.join(', ')}
    Education: ${resumeData.education}
    
    JOB DESCRIPTION:
    ${jobDescription}
    
    Please provide a detailed analysis in JSON format with the following structure:
    {
      "fitScore": number (0-100),
      "strengths": ["strength1", "strength2", "strength3"],
      "gaps": ["gap1", "gap2", "gap3"],
      "recommendations": ["rec1", "rec2", "rec3"],
      "overallAssessment": "detailed assessment text"
    }
    
    Focus on:
    - Technical skill alignment
    - Experience relevance
    - Project portfolio match
    - Growth potential
    - Specific recommendations
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert career advisor and technical recruiter. Provide honest, detailed analysis of job fit."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const response = completion.choices[0].message.content;
    return JSON.parse(response || '{}');
  } catch (error) {
    console.error('OpenAI API Error:', error);
    // Fallback to current mock analysis
    return analyzeJobFitMock(jobDescription);
  }
};
```

### Option 2: Hugging Face Integration

#### Step 1: Get Hugging Face API Key
1. Go to [Hugging Face](https://huggingface.co/)
2. Create an account
3. Go to Settings → Access Tokens
4. Create a new token

#### Step 2: Install Hugging Face Client
```bash
npm install @huggingface/inference
```

#### Step 3: Update CareerBot
```typescript
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(import.meta.env.VITE_HF_API_KEY);

const analyzeJobFit = async (jobDescription: string): Promise<JobAnalysis> => {
  // Use Hugging Face models for analysis
  // Implementation depends on the specific model you choose
};
```

### Option 3: Local LLM (Advanced)

#### Using Ollama or Similar Local Models
```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull a model
ollama pull llama2

# Run locally
ollama serve
```

## Environment Setup

### For Development
1. Create `.env.local` file:
```env
VITE_OPENAI_API_KEY=your_api_key_here
```

### For Production
1. Set environment variables in your hosting platform
2. For Vercel: Add in Project Settings → Environment Variables
3. For Netlify: Add in Site Settings → Environment Variables

## Security Considerations

### API Key Security
- ✅ **Environment Variables** - Never hardcode API keys
- ✅ **Client-Side Usage** - OpenAI allows browser usage with proper setup
- ✅ **Rate Limiting** - Implement request throttling
- ✅ **Error Handling** - Graceful fallbacks for API failures

### Alternative: Backend Proxy
For better security, create a backend API:

```javascript
// server.js (Node.js/Express)
const express = require('express');
const OpenAI = require('openai');

const app = express();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/analyze-job', async (req, res) => {
  try {
    const { jobDescription } = req.body;
    // OpenAI analysis logic here
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: 'Analysis failed' });
  }
});
```

## Customization Options

### Update Resume Data
Edit the `resumeData` object in `CareerBot.tsx` to match your current profile.

### Custom Analysis Logic
Modify the analysis algorithm to focus on specific aspects:
- Industry-specific keywords
- Company culture fit
- Salary expectations
- Remote work preferences

### UI Customization
- Change colors in the gradient classes
- Modify the chat interface layout
- Add custom animations
- Include company logos or branding

## Testing

### Test Job Descriptions
Try these sample job descriptions:

1. **Frontend Developer**
```
We're looking for a React developer with 2+ years experience in JavaScript, HTML, CSS. Experience with Node.js and MongoDB preferred.
```

2. **Full Stack Engineer**
```
Senior full stack engineer needed. Must know Python, Java, AWS, Docker, and have experience with microservices architecture.
```

3. **DevOps Engineer**
```
DevOps engineer with experience in CI/CD, Kubernetes, monitoring tools like Prometheus and Grafana.
```

## Cost Considerations

### OpenAI Pricing (GPT-3.5-turbo)
- ~$0.002 per 1K tokens
- Typical analysis: ~500-1000 tokens
- Cost per analysis: ~$0.001-0.002

### Monthly Estimates
- 100 analyses/month: ~$0.10-0.20
- 1000 analyses/month: ~$1-2

## Troubleshooting

### Common Issues
1. **API Key Not Working** - Check environment variable setup
2. **CORS Errors** - Ensure proper API configuration
3. **Rate Limiting** - Implement request throttling
4. **Model Not Available** - Check OpenAI model availability

### Debug Mode
Add console logs to track API calls:
```typescript
console.log('Analyzing job:', jobDescription);
console.log('API Response:', response);
```

## Next Steps

1. **Choose Integration Method** - OpenAI recommended for best results
2. **Set Up API Keys** - Follow the setup guide above
3. **Test Thoroughly** - Try various job descriptions
4. **Deploy** - Your portfolio is ready to go live!
5. **Monitor Usage** - Track API usage and costs

Your CareerBot will help visitors understand how well they fit for different roles and provide valuable insights for career decisions! 🚀 