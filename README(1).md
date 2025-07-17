# Saurabh Maurya - Portfolio Website

A modern, interactive portfolio website showcasing my skills, projects, and professional experience. Built with React, TypeScript, and modern web technologies.

## 🚀 Features

- **Modern Design**: Clean and professional design with gradient accents and smooth animations
- **Responsive**: Fully responsive design that works perfectly on all devices
- **Interactive Elements**: Smooth animations powered by Framer Motion
- **Real-Time GitHub Stats**: Live GitHub statistics and repository information
- **AI Career Assistant**: Interactive AI bot for career analysis and insights
- **Resume Viewer**: Built-in PDF resume viewer with modal interface
- **Contact Form**: Functional contact form with validation and email integration
- **Project Showcase**: Detailed project cards with live demos and GitHub links
- **Skills Visualization**: Interactive skills section with progress indicators
- **SEO Optimized**: Meta tags and semantic HTML for better search engine visibility

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Backend**: Node.js (for AI assistant and email functionality)
- **Email Service**: Nodemailer with Gmail SMTP
- **AI Integration**: Custom AI career analysis system

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/srbmaury/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (create `.env` file):
```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
```

4. Start the development server:
```bash
npm run dev
```

5. Start the backend server (in a separate terminal):
```bash
node server.js
```

6. Open your browser and visit `http://localhost:5173`

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
- Categorized skills (Frontend, Backend, Tools, etc.)
- Animated skill cards with hover effects

### **Projects Section**
- Project cards with screenshots
- Live demo and GitHub links
- Technology tags for each project
- Responsive grid layout

### **GitHub Statistics**
- Real-time GitHub data via API
- User profile information
- Top repositories with stars and forks
- Repository topics and languages
- Live statistics updates

### **AI Career Assistant**
- Interactive chat interface
- Job description analysis
- Skills matching and recommendations
- Real-time career insights

### **Contact Section**
- Functional contact form
- Email integration with Nodemailer
- Form validation and error handling
- Social media links

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
   - Configure email settings

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

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables
4. Set up your domain

### Backend Deployment

For the AI assistant and email functionality:

1. Deploy `server.js` to a Node.js hosting service (Railway, Render, etc.)
2. Update the API endpoints in the frontend
3. Configure environment variables

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password
PORT=3001
```

## 📝 API Endpoints

The backend server provides these endpoints:

- `POST /api/contact` - Contact form submission
- `POST /api/analyze-career` - AI career analysis
- `GET /api/health` - Health check

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- GitHub API for real-time statistics

---

Made with ❤️ by Saurabh Maurya using React and TypeScript
