import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import careerRoutes from './routes/career.js';
import githubRoutes from './routes/github.js';

dotenv.config();

const app = express();
app.set('trust proxy', 1);

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://saurabh-maurya-portfolio.netlify.app',
  ...(process.env.CLIENT_ORIGIN || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    },
  })
);
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
const distIndex = path.join(distDir, 'index.html');

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', careerRoutes);
app.use('/api', githubRoutes);

app.get('*', (req, res) => {
  if (!fs.existsSync(distIndex)) {
    return res.send('No build found');
  }
  res.sendFile(distIndex);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
