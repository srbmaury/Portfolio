# 🚀 Saurabh Maurya - Portfolio Website

<div align="center">

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-06B6D4?style=for-the-badge&logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=nodedotjs)

A modern, interactive portfolio website built with React, TypeScript, and powered by AI for career analysis.

[🌐 Live Demo](https://portfolio-038c.onrender.com) • [📧 Contact](mailto:srbmaury@gmail.com)

</div>

---

## ✨ Features

- **Modern Design**: Clean, responsive design with smooth animations
- **AI Career Assistant**: Interactive AI bot powered by Google Gemini
- **Real-Time GitHub Stats**: Live repository statistics and profile data
- **Project Showcase**: Detailed project cards with live demos
- **Interactive Terminal**: Command-based navigation interface
- **Contact Form**: Functional contact form with EmailJS integration
- **Resume Viewer**: Built-in PDF resume viewer
- **Theme Toggle**: Dark/light mode switching
- **Loading Screen**: Elegant loading animation
- **Matrix Rain**: Cool visual effect in terminal

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **AI**: Google Gemini AI
- **Services**: EmailJS, GitHub API
- **Deployment**: Render

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Google Gemini API key

### Installation

1. **Clone and install:**
```bash
git clone https://github.com/srbmaury/portfolio.git
cd portfolio
npm install
```

2. **Set up environment:**
```bash
touch .env
```

Add to `.env`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
NODE_ENV=development
```

3. **Run the application:**
```bash
npm run dev:full  # Both frontend and backend
```

4. **Open**: http://localhost:3001

---

## 🎨 Components

- **Hero**: Animated introduction with call-to-action buttons
- **About**: Professional photo, work experience timeline
- **Skills**: Categorized skills (Fundamentals, Languages & Frameworks, Backend & Cloud, Databases & Testing)
- **Projects**: Project cards with screenshots, live demos, and GitHub links
- **GitHub Stats**: Real-time repository data and user statistics
- **AI Career Bot**: Job description analysis and career insights
- **Contact**: Functional contact form with social media links
- **Terminal**: Interactive terminal with matrix rain effect

---

## 🚀 Deployment

### Render (Recommended)

1. Push code to GitHub
2. Create Web Service on [render.com](https://render.com)
3. Connect repository
4. Set build command: `npm install && npm run build`
5. Set start command: `npm start`
6. Add environment variable: `GEMINI_API_KEY`
7. Deploy!

---

## 🔧 Customization

Update these files with your information:

- **Hero**: `src/components/Hero.tsx` - Name, title, description
- **About**: `src/components/About.tsx` - Experience, photo, story
- **Skills**: `src/components/Skills.tsx` - Skill categories and items
- **Projects**: `src/config/projects.json` - Project details and links
- **GitHub**: `App.tsx` - Update username
- **Contact**: `src/components/Contact.tsx` - Contact info and EmailJS settings

---

## 🛠️ Scripts

```bash
npm run dev          # Frontend only
npm run start        # Backend only (or production server)
npm run dev:full     # Both frontend and backend
npm run build        # Production build
npm run lint         # ESLint
```

---

## 🔐 Environment Variables

- `GEMINI_API_KEY` (required): Google Gemini API key
- `GEMINI_MODEL` (required): gemini-3-flash-preview
- `PORT` (optional): Server port (default: 3001)
- `NODE_ENV` (optional): Environment (development/production)

---

## 📝 API Endpoints

- `POST /api/analyze-career` - AI career analysis

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 🙏 Acknowledgments

- [Lucide](https://lucide.dev/) - Icons
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Google Gemini](https://ai.google.dev/) - AI
- [EmailJS](https://www.emailjs.com/) - Contact form

---

<div align="center">

**Made with ❤️ by Saurabh Maurya**

</div>
