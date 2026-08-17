# 🚀 Saurabh Maurya - Portfolio

<div align="center">

<div align="center">
    
  [![Portfolio](https://img.shields.io/badge/Visit-Portfolio-blue?style=for-the-badge)](https://srbmaury.com/)
  
</div>

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=nodedotjs)

**Modern portfolio showcasing full-stack development, scalable systems, and an intelligent career assistant**

</div>

---

## 👨‍💻 About

Software Engineer at **Salesforce** specializing in scalable systems, observability, and full-stack development. Passionate about performance optimization, clean architecture, and solving complex engineering problems.


---

## ✨ Portfolio Features

### 🤖 Intelligent Career Assistant
Interactive chatbot trained on my experience and projects:
- Context-aware responses about skills, projects, and experience  
- Powered by OpenAI (with Gemini fallback)
- Regenerate responses for better answers
- Response caching and rate limiting (10 questions/hour)
- Expandable full-screen mode for in-depth conversations
- Rich markdown support with streaming effect  

### 🎨 Modern Design
- Dark/Light mode with persistent preferences  
- Fully responsive across desktop, tablet, and mobile  
- Smooth animations and interactive UI  
- Optional custom cursor for desktop visitors

### 📊 Project Showcase
- **Ecommerce Search Engine** — ML-based product search with personalized ranking and A/B testing  
- **Companion AI** — AI interview prep with voice input, code editor, and auto-feedback  
- **ExitSense** — Android app that detects when you're leaving home without GPS  
- **YAML Data Visualizer** — Interactive tree diagrams with D3.js, real-time collaboration, and versioning
- **Developer Knowledge Base** — Notion-style knowledge platform with AI-powered answer generation  
- **Hackathon Portal** — Full-stack event platform with RBAC and AI-based evaluation

### 📈 GitHub Integration
- Live GitHub statistics via API  
- Direct repository links  
- Contribution activity tracking  

---

## 🛠️ Technical Skills

The portfolio renders its current, balanced skill taxonomy from [`src/config/profile.json`](src/config/profile.json), which is also the source used by the career assistant.

## ⚙️ Configuration

Copy `.env.example` to `.env` for local development, then configure the values relevant to the features you use. Variables prefixed with `VITE_` are embedded at build time, so update them in your hosting provider and redeploy after changing them.

### Netlify frontend + Render API

The frontend is static on Netlify and the Express API is deployed separately on Render. The included [`public/_redirects`](public/_redirects) file rewrites direct visits to client-side routes such as `/projects` to `index.html`, preventing Netlify 404s for visitors and search crawlers. [`public/404.html`](public/404.html) provides a noindex fallback for genuinely missing static files. Set `VITE_API_BASE_URL` in **Netlify** to the public Render API origin (without a trailing slash), then redeploy. Set `CLIENT_ORIGIN` in **Render** to a comma-separated list including `https://srbmaury.com` and the Netlify site URL. Keep `OPENAI_API_KEY`, `GEMINI_API_KEY`, `GITHUB_TOKEN`, and Upstash credentials on Render only—never set them as `VITE_` variables.

| Variable | Purpose |
| --- | --- |
| `VITE_SHOW_RESUME` | Set to `true` to replace the hero projects CTA with the resume viewer. |
| `VITE_RESUME_URL` | Public embed URL for the resume. For Google Drive, use the file's `/preview` URL. |
| `VITE_SHOW_TERMINAL` | Set to `true` to show the interactive terminal. |
| `VITE_HIDE_BEGINNER_PROJECTS` | Set to `true` to hide beginner projects from the archive and terminal. |
| `VITE_HIDE_CUSTOM_CURSOR` | Set to `true` to hide the custom cursor. |
| `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` | EmailJS credentials used by the contact form. |
| `VITE_TO_EMAIL`, `VITE_TO_NAME` | Recipient details passed to the EmailJS template. |
| `VITE_API_BASE_URL` | Required when Netlify and the Express API use different origins; set it to the public Render API URL. |
| `OPENAI_API_KEY`, `GEMINI_API_KEY` | Server-side AI provider credentials for the career assistant. |
| `GITHUB_TOKEN`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Optional server-side GitHub and Redis configuration. |
| `CLIENT_ORIGIN`, `PORT` | Backend CORS origin and listening port. |

---

## ⚡ Why This Portfolio Stands Out

- Intelligent assistant trained on real project data (not a generic chatbot)  
- Strong focus on performance, scalability, and system design  
- Built with production-grade architecture and best practices  

---

## 🏆 Achievements

- JEE Advanced AIR **4997** and JEE Main AIR **2669**
- Codeforces Specialist (**Peak Rating: 1586**)
- LeetCode Knight (**Max Rating: 1931**)  
- Ranked **862 globally** in Google Kick Start 2022  

---

## 📬 Get In Touch

- **Email:** [contact@srbmaury.com](mailto:contact@srbmaury.com)  
- **GitHub:** [@srbmaury](https://github.com/srbmaury)  
- **Location:** Hyderabad, India

🚀 **Try the portfolio and interact with the career assistant, or reach out for opportunities!**

---

<div align="center">

**Built with React, TypeScript, and AI**

Made with ❤️ by [Saurabh Maurya](https://github.com/srbmaury)

</div>
