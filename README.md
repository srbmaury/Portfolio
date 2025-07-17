# Saurabh Maurya - Portfolio Website

A modern, interactive portfolio website showcasing my skills, projects, and professional experience. Built with React, TypeScript, and powered by AI for career analysis.

## 🚀 Features

- **Modern Design**: Clean and professional design with gradient accents and smooth animations
- **Responsive**: Fully responsive design that works perfectly on all devices
- **Interactive Elements**: Smooth animations powered by Framer Motion
- **Real-Time GitHub Stats**: Live GitHub statistics and repository information
- **AI Career Assistant**: Interactive AI bot powered by Google Gemini for career analysis and insights
- **Resume Viewer**: Built-in PDF resume viewer with modal interface
- **Contact Form**: Functional contact form with EmailJS integration
- **Project Showcase**: Detailed project cards with live demos and GitHub links
- **Skills Visualization**: Interactive skills section with progress indicators
- **SEO Optimized**: Meta tags and semantic HTML for better search engine visibility
- **Production Ready**: Configured for deployment on Render with single-service architecture

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Backend**: Node.js, Express
- **AI Integration**: Google Gemini AI for career analysis
- **Email Service**: EmailJS for contact form
- **Deployment**: Render (single service deployment)

## 📦 Quick Start

### Prerequisites
- Node.js 20+ 
- npm or yarn
- Google Gemini API key (for AI career assistant)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/srbmaury/portfolio.git
cd portfolio
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp env.example .env
```
Edit `.env` and add your Gemini API key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=3001
NODE_ENV=development
```

4. **Run the application:**
```bash
# Option 1: Run both frontend and backend together (recommended)
npm run dev:full

# Option 2: Run separately
npm run dev          # Frontend only (port 5173)
npm run server       # Backend only (port 3001)
```

5. **Open your browser:**
- Full app: http://localhost:3001
- Frontend only: http://localhost:5173

## 🎨 Key Components

### **Hero Section**
- Animated introduction with gradient text effects
- Call-to-action buttons for contact and resume viewing
- Smooth scroll indicators

### **About Section**
- Professional photo with fallback placeholder
- Work experience timeline
- Personal story and background
- Resume viewer integration

### **Skills Section**
- Interactive skill progress bars
- Categorized skills (Fundamentals, Languages & Frameworks, Backend & Cloud, Databases & Testing)
- Animated skill cards with hover effects

### **Projects Section**
- Project cards with screenshots
- Live demo and GitHub links
- Technology tags for each project
- Responsive grid layout
- Featured projects highlighting

### **GitHub Statistics**
- Real-time GitHub data via API
- User profile information
- Top repositories with stars and forks
- Repository topics and languages
- Live statistics updates

### **AI Career Assistant** 🤖
- Interactive chat interface
- Job description analysis using Google Gemini AI
- Skills matching and recommendations
- Real-time career insights
- Clean, readable responses (no markdown formatting)

### **Contact Section**
- Functional contact form with EmailJS
- Form validation and error handling
- Social media links
- Professional contact information

## 🚀 Deployment

### Render (Recommended)

This project is configured for single-service deployment on Render:

1. **Push your code to GitHub**
2. **Go to [render.com](https://render.com)** and create a new Web Service
3. **Connect your repository**
4. **Configure the service:**
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. **Set environment variables:**
   - `GEMINI_API_KEY`: Your Google Gemini API key
6. **Deploy!**

Your portfolio will be live at `https://your-service-name.onrender.com`

### Alternative Deployments

- **Vercel**: For frontend-only deployment (without AI features)
- **Netlify**: For static site hosting
- **Railway**: Alternative to Render for full-stack deployment

## 🔧 Customization

### Personal Information

Update the following files with your information:

1. **Hero Section** (`src/components/Hero.tsx`):
   - Update name, title, and description
   - Modify call-to-action buttons

2. **About Section** (`src/components/About.tsx`):
   - Update work experience and timeline
   - Replace profile image
   - Modify personal story

3. **Skills Section** (`src/components/Skills.tsx`):
   - Adjust skill levels and categories
   - Add or remove skills

4. **Projects Section** (`src/components/Projects.tsx`):
   - Replace with your actual projects
   - Update project images and descriptions
   - Modify technologies used

5. **GitHub Stats** (`src/components/GitHubStats.tsx`):
   - Update username in `App.tsx`
   - Customize displayed information

6. **Contact Section** (`src/components/Contact.tsx`):
   - Update contact information
   - Configure EmailJS settings

7. **AI Career Assistant** (`src/components/CareerBot.tsx`):
   - Update resume data in the API call
   - Customize the AI prompt if needed

### Environment Configuration

The app automatically detects environment (development vs production) and adjusts API endpoints accordingly:

- **Development**: Uses `http://localhost:3001` for API calls
- **Production**: Uses the same domain as the frontend

### Styling

The website uses CSS custom properties for easy theming. Modify colors in `src/index.css`:

```css
:root {
  --primary-color: #3b82f6;    /* Main blue color */
  --secondary-color: #1e40af;  /* Darker blue */
  --accent-color: #06b6d4;     /* Cyan accent */
  /* ... other variables */
}
```

### Images

1. Replace profile image in `public/images/profile.jpg`
2. Add project screenshots to `public/images/`
3. Update favicon in the `public` folder

## 📱 Responsive Design

- Mobile-first design approach
- Responsive navigation with hamburger menu
- Adaptive layouts for all screen sizes
- Touch-friendly interactions
- Optimized for tablets and mobile devices

## 🔐 Environment Variables

### Required
- `GEMINI_API_KEY`: Google Gemini API key for AI career assistant

### Optional
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)

## 📝 API Endpoints

The backend server provides these endpoints:

- `POST /api/analyze-career` - AI career analysis using Google Gemini
- `GET /api/health` - Health check endpoint

## 🛠️ Development Scripts

```bash
npm run dev          # Start Vite dev server (frontend only)
npm run server       # Start Node.js server (backend only)
npm run dev:full     # Start both frontend and backend together
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

## 🐛 Troubleshooting

### Common Issues

1. **AI Career Assistant not working:**
   - Check if `GEMINI_API_KEY` is set correctly
   - Verify the API key is valid and has quota remaining
   - Check server logs for detailed error messages

2. **Build fails:**
   - Ensure Node.js version is 20+
   - Clear `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`

3. **Port conflicts:**
   - Change `PORT` in `.env` file
   - Kill processes using the port: `lsof -ti:3001 | xargs kill -9`

### Getting Help

- Check the `DEPLOYMENT.md` file for detailed deployment instructions
- Review server logs for error details
- Test API endpoints directly with curl or Postman

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- AI powered by [Google Gemini](https://ai.google.dev/)
- GitHub API for real-time statistics
- EmailJS for contact form functionality

---

Made with ❤️ by Saurabh Maurya using React, TypeScript, and AI
