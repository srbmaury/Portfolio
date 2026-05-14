import express from 'express';
import fs from 'fs';
import { rateLimitMiddleware } from '../middleware/rateLimit.js';
import {
  getCareerCachedResponse,
  setCareerCachedResponse,
} from '../services/cacheService.js';
import { generateAIResponse } from '../services/aiService.js';

const router = express.Router();

const knowledgeBase = JSON.parse(
  fs.readFileSync(
    new URL('../src/config/knowledgeBase.json', import.meta.url)
  )
);

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
      .replace('{{KNOWLEDGE_BASE}}', JSON.stringify(knowledgeBase, null, 2))
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
