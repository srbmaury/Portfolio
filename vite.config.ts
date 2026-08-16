import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import profile from './src/config/profile.json'

const { personalInfo, experience, interests, skillCategories } = profile
const siteUrl = `${personalInfo.portfolio.replace(/\/$/, '')}/`
const socialImage = `${siteUrl}og-image.png`
const seoDescription = `${personalInfo.name} is a ${personalInfo.professionalTitle} focused on distributed systems, metadata, caching, and production-ready applications.`
const structuredProfile = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: `${personalInfo.name} Portfolio`,
      url: siteUrl,
      description: seoDescription,
      inLanguage: 'en',
    },
    {
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: personalInfo.name,
        jobTitle: personalInfo.professionalTitle,
        description: personalInfo.bio,
        url: siteUrl,
        image: socialImage,
        email: `mailto:${personalInfo.email}`,
        worksFor: { '@type': 'Organization', name: experience[0].company },
        sameAs: [personalInfo.github, personalInfo.leetcode, personalInfo.codeforces, personalInfo.linkedin, personalInfo.twitter],
        knowsAbout: [...interests, ...skillCategories.flatMap((category) => category.skills)],
      },
    },
  ],
}

const profileMetadata = () => ({
  name: 'profile-metadata',
  transformIndexHtml(html: string) {
    return html
      .replaceAll('__PROFILE_NAME__', personalInfo.name)
      .replaceAll('__PROFILE_TITLE__', personalInfo.professionalTitle)
      .replaceAll('__PROFILE_COMPANY__', experience[0].company)
      .replaceAll('__PROFILE_HEADLINE__', personalInfo.headline)
      .replaceAll('__PROFILE_EMAIL__', personalInfo.email)
      .replaceAll('__PROFILE_URL__', siteUrl)
      .replaceAll('__PROFILE_DESCRIPTION__', seoDescription)
      .replaceAll('__PROFILE_IMAGE__', socialImage)
      .replace('__PROFILE_STRUCTURED_DATA__', JSON.stringify(structuredProfile))
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    profileMetadata(),
    react(),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    port: 3000,
  },
})
