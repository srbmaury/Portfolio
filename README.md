# Modern Portfolio Website

A beautiful, responsive portfolio website built with React, TypeScript, Vite, and Tailwind CSS. Features smooth animations, modern design, and excellent user experience.

## 🚀 Features

- **Modern Design**: Clean and professional design with gradient accents
- **Responsive**: Fully responsive design that works on all devices
- **Smooth Animations**: Powered by Framer Motion for engaging interactions
- **Fast Performance**: Built with Vite for lightning-fast development and builds
- **TypeScript**: Full TypeScript support for better development experience
- **Contact Form**: Functional contact form with validation
- **SEO Optimized**: Meta tags and semantic HTML for better search engine visibility

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🎨 Customization

### Personal Information

Update the following files with your personal information:

1. **Hero Section** (`src/components/Hero.tsx`):
   - Change "Your Name" to your actual name
   - Update the title and description
   - Modify the call-to-action buttons

2. **About Section** (`src/components/About.tsx`):
   - Update personal information (birthday, location, email, phone)
   - Replace the placeholder image with your actual photo
   - Modify the "My Story" section
   - Update your work experience

3. **Skills Section** (`src/components/Skills.tsx`):
   - Adjust skill levels and categories
   - Add or remove skills based on your expertise
   - Update the "Other Skills" section

4. **Projects Section** (`src/components/Projects.tsx`):
   - Replace project data with your actual projects
   - Update project images, descriptions, and links
   - Modify technologies used for each project

5. **Contact Section** (`src/components/Contact.tsx`):
   - Update contact information (email, phone, location)
   - Add your social media links
   - Configure the contact form (you'll need to add backend functionality)

6. **Footer** (`src/components/Footer.tsx`):
   - Update the copyright information
   - Modify contact details

### Styling

The website uses CSS custom properties for easy theming. You can modify the colors in `src/index.css`:

```css
:root {
  --primary-color: #3b82f6;    /* Main blue color */
  --secondary-color: #1e40af;  /* Darker blue */
  --accent-color: #06b6d4;     /* Cyan accent */
  /* ... other variables */
}
```

### Images

1. Replace the placeholder images in the About section with your actual photo
2. Add project screenshots to the Projects section
3. Update the favicon in the `public` folder

## 📱 Responsive Design

The website is fully responsive and includes:
- Mobile-first design approach
- Responsive navigation with hamburger menu
- Adaptive layouts for different screen sizes
- Touch-friendly interactions

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure your domain

### Other Platforms

The built files in the `dist` folder can be deployed to any static hosting service.

## 📝 Contact Form

The contact form is currently set up with a mock submission. To make it functional:

1. Set up a backend service (e.g., Netlify Functions, Vercel Functions, or your own API)
2. Update the `handleSubmit` function in `src/components/Contact.tsx`
3. Add proper error handling and success notifications

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

Made with ❤️ using React and TypeScript
