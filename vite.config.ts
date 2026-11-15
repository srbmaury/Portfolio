import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import profile from './src/config/profile.json'
import projectsData from './src/config/projects.json'

import { getArchiveProjects, getProjectMetadata, homeMetadata, projectPublicUrl, socialImage } from './src/config/routeMetadata'

const { personalInfo, experience } = profile

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character]!)

const projectFallbackMarkup = (hideBeginner: boolean) => `
  <main>
    <h1>Software Engineering Projects by ${escapeHtml(personalInfo.name)}</h1>
    <p>${escapeHtml(getProjectMetadata(hideBeginner).description)}</p>
    <ul>
      ${getArchiveProjects(hideBeginner)
        .map((project) => `<li><a href="${escapeHtml(projectPublicUrl(project))}">${escapeHtml(project.title)}</a>: ${escapeHtml(project.description)}</li>`)
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
        .map((project) => `<li><a href="${escapeHtml(projectPublicUrl(project))}">${escapeHtml(project.title)}</a>: ${escapeHtml(project.description)}</li>`)
        .join('')}
    </ul>
    <p><a href="/projects">Browse the project archive</a></p>
  </main>
`

const noScriptFallback = (markup: string) => `<noscript>${markup}</noscript>`

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
    /<script id="route-structured-data" type="application\/ld\+json">\s*[\s\S]*?\s*<\/script>/,
    `<script id="route-structured-data" type="application/ld+json">\n    ${JSON.stringify(structuredData)}\n  </script>`
  )
  .replace('<div id="root"></div>', `<div id="root">${noScriptFallback(fallbackMarkup)}</div>`)

const staticRouteMetadata = (hideBeginner: boolean) => ({
  name: 'static-route-metadata',
  closeBundle() {
    const outputDir = path.resolve('dist')
    const rootHtml = fs.readFileSync(path.join(outputDir, 'index.html'), 'utf8')
    const staticHomeHtml = rootHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${noScriptFallback(homeFallbackMarkup)}</div>`
    )
    const projectHtml = routeMetadata({
      html: rootHtml,
      ...getProjectMetadata(hideBeginner),
      fallbackMarkup: projectFallbackMarkup(hideBeginner),
    })

    fs.writeFileSync(path.join(outputDir, 'index.html'), staticHomeHtml)
    fs.mkdirSync(path.join(outputDir, '_pages'), { recursive: true })
    fs.writeFileSync(path.join(outputDir, '_pages', 'projects.html'), projectHtml)
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
      .replaceAll('__PROFILE_URL__', homeMetadata.canonicalUrl)
      .replaceAll('__PROFILE_DESCRIPTION__', homeMetadata.description)
      .replaceAll('__PROFILE_IMAGE__', socialImage)
      .replace('__PROFILE_STRUCTURED_DATA__', JSON.stringify(homeMetadata.structuredData))
  },
})

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    profileMetadata(),
    react(),
    staticRouteMetadata(loadEnv(mode, process.cwd()).VITE_HIDE_BEGINNER_PROJECTS === 'true'),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    port: 3000,
  },
}))
