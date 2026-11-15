import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import profile from './src/config/profile.json' with { type: 'json' };

import careerRoutes from './routes/career.js';
import githubRoutes from './routes/github.js';

dotenv.config();

const app = express();
app.set('trust proxy', 1);

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  new URL(profile.personalInfo.portfolio).origin,
  'https://saurabh-maurya-portfolio.netlify.app',
  ...(process.env.CLIENT_ORIGIN || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
];

app.use('/api', cors({
  origin(origin, callback) {
    callback(null, !origin || allowedOrigins.includes(origin));
  },
}));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
const distIndex = path.join(distDir, 'index.html');

app.get('/projects.html', (_req, res) => res.redirect(301, '/projects'));
app.get('/projects', (_req, res, next) => {
  const archive = path.join(distDir, '_pages', 'projects.html');
  if (!fs.existsSync(archive)) return next();
  return res.sendFile(archive);
});

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', careerRoutes);
app.use('/api', githubRoutes);

app.get('/', (_req, res) => {
  if (!fs.existsSync(distIndex)) return res.status(404).send('No build found');
  return res.sendFile(distIndex);
});

app.use('/api', (_req, res) => res.status(404).json({ error: 'Endpoint not found' }));
app.use((_req, res) => {
  const notFound = path.join(distDir, '404.html');
  if (!fs.existsSync(notFound)) return res.status(404).send('Page not found');
  return res.status(404).sendFile(notFound);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
