import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
const knowledgeBase = JSON.parse(fs.readFileSync(new URL('./src/config/knowledgeBase.json', import.meta.url)));

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

// Cache and Rate Limiting
const responseCache = new Map(); // Stores ALL questions asked: { questionHash: { response, timestamp } }
const rateLimitMap = new Map(); // Tracks requests per IP: { ip: { count, resetTime } }

const CACHE_TTL = 60 * 60 * 1000; // 1 hour cache - any identical question within 1 hour returns cached response
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour window
const RATE_LIMIT_MAX_REQUESTS = 10; // Max 10 requests per hour per IP

// Helper function to generate cache key
// Normalizes questions so "What is Saurabh's role?" and "what is saurabh's role?"
// are treated as the same question and return cached response
function generateCacheKey(question) {
  return question.toLowerCase().trim().replace(/\s+/g, ' ');
}

// Rate limiting middleware
function rateLimitMiddleware(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }

  const rateLimitData = rateLimitMap.get(ip);

  // Reset if window has passed
  if (now > rateLimitData.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }

  // Check if limit exceeded
  if (rateLimitData.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfter = Math.ceil((rateLimitData.resetTime - now) / 1000);
    return res.status(429).json({
      error: 'Too many requests. Please try again later.',
      retryAfter: retryAfter
    });
  }

  // Increment count
  rateLimitData.count++;
  rateLimitMap.set(ip, rateLimitData);
  next();
}

// Clean up old cache entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of responseCache.entries()) {
    if (now - value.timestamp > CACHE_TTL) {
      responseCache.delete(key);
    }
  }
}, 10 * 60 * 1000); // Clean every 10 minutes

// Initialize AI clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate AI response with OpenAI first, fallback to Gemini
 * @param {string} prompt - The prompt to send to the AI
 * @returns {Promise<string>} The AI response
 */
async function generateAIResponse(prompt) {
  // Try OpenAI first
  try {
    console.log('[AI] Attempting to use OpenAI...');
    const modelName = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const completion = await openai.chat.completions.create({
      model: modelName,
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant that provides accurate and informative responses."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content;
    if (response) {
      console.log('[AI] OpenAI response successful');
      return response;
    }
    throw new Error('No response from OpenAI');
  } catch (openaiError) {
    console.log('[AI] OpenAI failed, falling back to Gemini...', openaiError.message);

    // Fallback to Gemini
    try {
      const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log('[AI] Gemini response successful');
      return text;
    } catch (geminiError) {
      console.error('[AI] Both OpenAI and Gemini failed');
      throw new Error(`AI generation failed. OpenAI: ${openaiError.message}, Gemini: ${geminiError.message}`);
    }
  }
}

app.post('/api/analyze-career', rateLimitMiddleware, async (req, res) => {
  try {
    const { jobDescription, resume, question, conversationContext, regenerate } = req.body;

    // Determine if this is a job analysis or general question
    const isGeneralQuestion = question && !jobDescription;

    if (!isGeneralQuestion && (!jobDescription || !resume)) {
      return res.status(400).json({ error: 'Job description and resume, or a question is required' });
    }

    // Check cache for general questions (skip cache if regenerating)
    if (isGeneralQuestion && !regenerate) {
      const cacheKey = generateCacheKey(question);
      const cachedResponse = responseCache.get(cacheKey);

      if (cachedResponse && (Date.now() - cachedResponse.timestamp < CACHE_TTL)) {
        console.log('[Cache] Returning cached response for:', question.substring(0, 50) + '...');
        return res.json({ analysis: cachedResponse.response, cached: true });
      }
    }

    let prompt;

    if (isGeneralQuestion) {
      // General conversation about Saurabh's profile, projects, and expertise
      prompt = `You are a helpful AI assistant representing Saurabh Maurya, a Full Stack Engineer. You have complete knowledge about his experience, projects, skills, education, and background. Answer the user's question in a friendly, conversational manner while being accurate and informative.

    SAURABH'S PROFILE:
    ${JSON.stringify(knowledgeBase, null, 2)}

    User's Question: ${question}

    ${conversationContext ? `Previous conversation context:\n${conversationContext}\n\n` : ''}

    IMPORTANT - SCOPE RESTRICTION:
    You can ONLY answer questions about:
    - Saurabh's work experience, roles, and companies he worked at
    - His technical projects and what he built
    - His technical skills, programming languages, frameworks, and tools he uses
    - His education and academic background
    - How to contact or connect with him
    - His career journey, achievements, and professional background

    You MUST REJECT and politely decline questions about:
    - Writing code, generating programs, or providing code solutions
    - General knowledge questions (politics, current events, geography, science, etc.)
    - Advice on other topics unrelated to Saurabh's profile
    - Technical tutorials or how-to guides
    - Anything not directly related to Saurabh Maurya's professional profile

    If the question is out of scope, respond with:
    "I'm here specifically to answer questions about Saurabh's professional experience, projects, and skills. I can't help with [brief description of what they asked]. Feel free to ask me about his work at Salesforce, his projects like YAML Visualizer or MERN Chat, or his technical expertise!"

    Guidelines:
    - Be friendly and conversational
    - Always refer to Saurabh in third person (use "Saurabh", "he", "his") - NEVER use first person ("I", "my", "me")
    - Provide specific examples from his projects and experience
    - If the question is about projects, mention relevant technologies and achievements
    - If asked about skills, provide concrete examples of how those skills were applied
    - If you don't have specific information, suggest contacting Saurabh directly
    - Keep responses concise but informative (2-3 paragraphs max)
    - Format responses using MARKDOWN for better readability:
      * Use **bold** for important terms and technologies
      * Use [text](url) format for links to projects
      * Use bullet points (- or *) for lists
      * Use ### for section headings if needed
      * Use \`code\` for technical terms or code snippets
    - When mentioning project URLs, use proper markdown links: [Project Name](https://url.com)
    - Structure your response with clear formatting to make it easy to read`;
    } else {
      // Original job analysis functionality
      prompt = `
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

IMPORTANT: Format your response using MARKDOWN for better readability:
- Use **bold** for section headings and important terms
- Use bullet points (- or *) for lists
- Use ### for main section titles
- Structure the response clearly with proper spacing
- Make it easy to scan and read
`;
    }

    // Generate response using OpenAI (with Gemini fallback)
    const analysis = await generateAIResponse(prompt);

    // Cache the response for general questions
    if (isGeneralQuestion && question) {
      const cacheKey = generateCacheKey(question);
      responseCache.set(cacheKey, {
        response: analysis,
        timestamp: Date.now()
      });
      console.log('[Cache] Stored response for:', question.substring(0, 50) + '...');
    }

    res.json({ analysis });
  } catch (error) {
    console.error('Error analyzing career:', error);
    res.status(500).json({
      error: 'Failed to process request',
      details: error.message
    });
  }
});

// Health check endpoint for waking up the server
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Server is awake and ready'
  });
});

// Handle React routing, return all requests to React app
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 