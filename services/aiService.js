import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

export async function generateAIResponse(prompt) {
  const errors = [];

  if (openai) {
    try {
      console.log('[AI] OpenAI attempt...');

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'You are Saurabh Maurya portfolio career assistant. Answer only questions about Saurabh, his career, skills, projects, education, achievements, and contact details.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const response = completion.choices[0]?.message?.content;
      if (response) return response;

      throw new Error('No OpenAI response');
    } catch (err) {
      errors.push(`OpenAI: ${err.message}`);
      console.warn('[AI] OpenAI failed, trying Gemini fallback');
    }
  } else {
    errors.push('OpenAI: OPENAI_API_KEY is not configured');
  }

  if (genAI) {
    try {
      console.log('[AI] Gemini attempt...');

      const model = genAI.getGenerativeModel({
        model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
      });

      const result = await model.generateContent(prompt);
      const response = result.response.text();
      if (response) return response;

      throw new Error('No Gemini response');
    } catch (err) {
      errors.push(`Gemini: ${err.message}`);
    }
  } else {
    errors.push('Gemini: GEMINI_API_KEY is not configured');
  }

  throw new Error(
    `No AI provider could generate a response. ${errors.join('; ')}`
  );
}
