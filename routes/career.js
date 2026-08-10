import express from 'express';
import fs from 'fs';
import { rateLimitMiddleware } from '../middleware/rateLimit.js';
import {
  getCareerCachedResponse,
  setCareerCachedResponse,
} from '../services/cacheService.js';
import { generateAIResponse } from '../services/aiService.js';

const router = express.Router();

const profile = JSON.parse(
  fs.readFileSync(
    new URL('../src/config/profile.json', import.meta.url)
  )
);

const projects = JSON.parse(
  fs.readFileSync(
    new URL('../src/config/projects.json', import.meta.url)
  )
);

// The chatbot context is composed from the same records rendered by the site.
const portfolioContext = {
  ...profile,
  projects: projects.projects.map(
    ({
      title,
      description,
      technologies,
      highlights,
      liveUrl,
      githubUrl,
      featured,
    }) => ({
      title,
      description,
      technologies,
      highlights,
      liveUrl,
      githubUrl,
      featured,
    })
  ),
};

const careerPromptConfig = JSON.parse(
  fs.readFileSync(
    new URL('../src/config/careerPrompt.json', import.meta.url)
  )
);

const careerPromptTemplate =
  careerPromptConfig.careerPrompt || careerPromptConfig.prompt;

function generateCacheKey(question, conversationContext) {
  return JSON.stringify({
    question: question.toLowerCase().trim().replace(/\s+/g, ' '),
    conversationContext: conversationContext.trim(),
  });
}

router.post('/analyze-career', rateLimitMiddleware, async (req, res) => {
  try {
    const { question = '', conversationContext = '', regenerate = false } =
      req.body;

    if (!question.trim()) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const cacheKey = generateCacheKey(question, conversationContext);

    if (!regenerate) {
      const cached = await getCareerCachedResponse(cacheKey);
      if (cached) {
        return res.json({
          analysis: cached.response,
          cached: true,
        });
      }
    }

    if (!careerPromptTemplate) {
      throw new Error('Career prompt template is missing');
    }

    const prompt = careerPromptTemplate
      .replaceAll('{{PROFILE_NAME}}', profile.personalInfo.name)
      .replaceAll('{{PROFILE_TITLE}}', profile.personalInfo.professionalTitle)
      .replace('{{KNOWLEDGE_BASE}}', JSON.stringify(portfolioContext, null, 2))
      .replace('{{QUESTION}}', question)
      .replace(
        '{{CONVERSATION_CONTEXT}}',
        conversationContext
          ? `Previous conversation context:\n${conversationContext}`
          : ''
      );

    const analysis = await generateAIResponse(prompt);

    await setCareerCachedResponse(cacheKey, analysis);

    res.json({ analysis, cached: false });
  } catch (err) {
    res.status(500).json({
      error: 'Failed to process request',
      details: err.message,
    });
  }
});

export default router;
