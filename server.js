import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/analyze-career', async (req, res) => {
  try {
    const { jobDescription, resume } = req.body;

    if (!jobDescription || !resume) {
      return res.status(400).json({ error: 'Job description and resume are required' });
    }

    // Create the prompt for Gemini
    const prompt = `
You are an expert career advisor and resume analyst. Analyze the following job description against the candidate's resume and provide a comprehensive assessment.

CANDIDATE RESUME:
Name: ${resume.name || 'Not provided'}
Title: ${resume.title || 'Not provided'}
Location: ${resume.location || 'Not provided'}
Email: ${resume.email || 'Not provided'}
GitHub: ${resume.github || 'Not provided'}

Experience:
${resume.experience ? resume.experience.map(exp => `
- ${exp.role || 'Role'} at ${exp.company || 'Company'} (${exp.duration || 'Duration'})
  ${exp.highlights ? exp.highlights.map(highlight => `  • ${highlight}`).join('\n') : '  • No highlights provided'}
`).join('\n') : 'No experience provided'}

Skills: ${resume.skills ? resume.skills.join(', ') : 'No skills provided'}

Education: ${resume.education || 'Not provided'}

JOB DESCRIPTION:
${jobDescription}

Please provide a detailed analysis including:

1. **Fit Score (0-100)** - Rate how well the candidate matches this role
2. **Overall Assessment** - Brief summary of fit
3. **Strengths** - What makes the candidate a good fit
4. **Skill Gaps** - Areas where the candidate may need improvement
5. **Experience Relevance** - How their experience applies to this role
6. **Recommendations** - Specific advice for the candidate
7. **Next Steps** - What the candidate should focus on

Format your response in a clear, professional manner that would be helpful for a job seeker.
`;

    // Generate response using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();

    res.json({ analysis });
  } catch (error) {
    console.error('Error analyzing career:', error);
    res.status(500).json({ 
      error: 'Failed to analyze career',
      details: error.message 
    });
  }
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 