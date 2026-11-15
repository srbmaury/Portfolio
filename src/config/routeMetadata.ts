import profile from './profile.json'
import projectsData from './projects.json'

const { personalInfo, experience, interests, skillCategories } = profile
const siteUrl = `${personalInfo.portfolio.replace(/\/$/, '')}/`
const socialImage = `${siteUrl}og-image.png`
const seoDescription = `${personalInfo.name} is a ${personalInfo.professionalTitle} focused on distributed systems, developer tools, performance engineering, and AI-powered products.`
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
  'Developer tools, web applications, mobile projects, and earlier work by Saurabh Maurya.'
const projectRouteUrl = `${siteUrl}projects`
const projectPublicUrl = (project: { liveUrl?: string; githubUrl?: string }) => project.liveUrl || project.githubUrl || ''
export const getFeaturedProjects = (hideBeginner: boolean) =>
  projectsData.projects
    .filter(project => project.featured && (!hideBeginner || !project.beginner))
    .sort((a, b) => (a.featuredOrder ?? Number.MAX_SAFE_INTEGER) - (b.featuredOrder ?? Number.MAX_SAFE_INTEGER))

export const getArchiveProjects = (hideBeginner: boolean) =>
  projectsData.projects.filter(project => !project.featured && (!hideBeginner || !project.beginner))

export const getProjectMetadata = (hideBeginner: boolean) => ({
  title: `Software Engineering Projects | ${personalInfo.name}`,
  description: projectRouteDescription,
  canonicalUrl: projectRouteUrl,
  structuredData: {
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
      itemListElement: getArchiveProjects(hideBeginner)
        .map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: project.title,
          url: projectPublicUrl(project),
        })),
    },
  },
})

export const homeMetadata = {
  title: `${personalInfo.name} | ${personalInfo.headline}`,
  description: seoDescription,
  canonicalUrl: siteUrl,
  structuredData: structuredProfile,
}

export { socialImage, projectPublicUrl }
