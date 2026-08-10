import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import profile from './src/config/profile.json'

const { personalInfo, experience, interests, skillCategories } = profile
const siteUrl = `${personalInfo.portfolio.replace(/\/$/, '')}/`
const socialImage = `${siteUrl}og-image.png`
const seoDescription = `${personalInfo.name} is a ${personalInfo.professionalTitle} focused on distributed systems, metadata, caching, and production-ready applications.`
const structuredProfile = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personalInfo.name,
  jobTitle: personalInfo.professionalTitle,
  description: personalInfo.bio,
  url: siteUrl,
  mainEntityOfPage: { '@type': 'WebPage', '@id': siteUrl },
  image: socialImage,
  email: `mailto:${personalInfo.email}`,
  worksFor: { '@type': 'Organization', name: experience[0].company },
  sameAs: [personalInfo.github, personalInfo.leetcode, personalInfo.codeforces, personalInfo.linkedin, personalInfo.twitter],
  knowsAbout: [...interests, ...skillCategories.flatMap((category) => category.skills)],
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
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      workbox: {
        runtimeCaching: [
          {
            // Cache Google Fonts
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Cache API responses with NetworkFirst strategy
            urlPattern: /^https:\/\/.*\.render\.com\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 5 // 5 minutes
              }
            }
          }
        ],
        globPatterns: ['**/*.{js,css,html,ico,svg,woff2}']
      },
      manifest: {
        name: `${personalInfo.name} - Portfolio`,
        short_name: 'Portfolio',
        description: `${personalInfo.professionalTitle} portfolio with offline support`,
        theme_color: '#3b82f6',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      devOptions: {
        enabled: true,
        suppressWarnings: true,
      },
    })
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    port: 3000,
  },
})
