import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import profile from './src/config/profile.json'
import projectsData from './src/config/projects.json'

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

const projectRouteDescription =
  'Earlier builds, focused utilities, and production-minded experiments by Saurabh Maurya across web, mobile, developer tools, and data visualization.'
const projectRouteUrl = `${siteUrl}projects`
const projectRouteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Software Engineering Projects',
  description: projectRouteDescription,
  url: projectRouteUrl,
  author: {
    '@type': 'Person',
    name: personalInfo.name,
    url: siteUrl,
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: projectsData.projects
      .filter((project) => !project.featured && !project.beginner)
      .map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: project.title,
        url: project.githubUrl,
      })),
  },
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character]!)

const projectFallbackMarkup = `
  <main>
    <h1>Software Engineering Projects by ${escapeHtml(personalInfo.name)}</h1>
    <p>${escapeHtml(projectRouteDescription)}</p>
    <ul>
      ${projectsData.projects
        .filter((project) => !project.featured && !project.beginner)
        .map((project) => `<li><a href="${escapeHtml(project.githubUrl)}">${escapeHtml(project.title)}</a>: ${escapeHtml(project.description)}</li>`)
        .join('')}
    </ul>
  </main>
`

const homeFallbackMarkup = `
  <main>
    <h1>${escapeHtml(personalInfo.name)} — ${escapeHtml(personalInfo.professionalTitle)}</h1>
    <p>${escapeHtml(personalInfo.headline)}</p>
    <p>${escapeHtml(personalInfo.bio)}</p>
    <h2>Featured engineering work</h2>
    <ul>
      ${projectsData.projects
        .filter((project) => project.featured)
        .slice(0, 5)
        .map((project) => `<li><a href="${escapeHtml(project.githubUrl)}">${escapeHtml(project.title)}</a>: ${escapeHtml(project.description)}</li>`)
        .join('')}
    </ul>
    <p><a href="/projects">Explore all software engineering projects</a></p>
  </main>
`

const routeMetadata = ({
  html,
  title,
  description,
  canonicalUrl,
  structuredData,
  fallbackMarkup,
}: {
  html: string
  title: string
  description: string
  canonicalUrl: string
  structuredData: Record<string, unknown>
  fallbackMarkup: string
}) => html
  .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
  .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
  .replace(/(<meta name="description"\s+content=")[^"]*(" \/>)/, `$1${escapeHtml(description)}$2`)
  .replace(/(<meta property="og:url" content=")[^"]*(" \/>)/, `$1${canonicalUrl}$2`)
  .replace(/(<meta property="og:title" content=")[^"]*(" \/>)/, `$1${escapeHtml(title)}$2`)
  .replace(/(<meta property="og:description"\s+content=")[^"]*(" \/>)/, `$1${escapeHtml(description)}$2`)
  .replace(/(<meta name="twitter:url" content=")[^"]*(" \/>)/, `$1${canonicalUrl}$2`)
  .replace(/(<meta name="twitter:title" content=")[^"]*(" \/>)/, `$1${escapeHtml(title)}$2`)
  .replace(/(<meta name="twitter:description"\s+content=")[^"]*(" \/>)/, `$1${escapeHtml(description)}$2`)
  .replace(
    /<script type="application\/ld\+json">\s*[\s\S]*?\s*<\/script>/,
    `<script type="application/ld+json">\n    ${JSON.stringify(structuredData)}\n  </script>`
  )
  .replace('<div id="root"></div>', `<div id="root">${fallbackMarkup}</div>`)

const staticRouteMetadata = () => ({
  name: 'static-route-metadata',
  closeBundle() {
    const outputDir = path.resolve('dist')
    const rootHtml = fs.readFileSync(path.join(outputDir, 'index.html'), 'utf8')
    const staticHomeHtml = rootHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${homeFallbackMarkup}</div>`
    )
    const projectHtml = routeMetadata({
      html: rootHtml,
      title: `Software Engineering Projects | ${personalInfo.name}`,
      description: projectRouteDescription,
      canonicalUrl: projectRouteUrl,
      structuredData: projectRouteStructuredData,
      fallbackMarkup: projectFallbackMarkup,
    })

    fs.mkdirSync(path.join(outputDir, 'projects'), { recursive: true })
    fs.writeFileSync(path.join(outputDir, 'index.html'), staticHomeHtml)
    fs.writeFileSync(path.join(outputDir, 'projects', 'index.html'), projectHtml)
  },
})

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
    staticRouteMetadata(),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    port: 3000,
  },
})
